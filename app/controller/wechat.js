
const Controller = require('egg').Controller;
const axios = require("axios");
class WechatController extends Controller {
  async wechat() {
    const {ctx,app} = this;
    try{
      const CODE =  ctx.request.body.code;
      const data = await this._wechat(CODE);
      if(!data.unionid){
        ctx.body = {code:0,message:"code过期，请刷新二维码重新扫码"}
        return
      }
      const user = await ctx.model.Users.findAll({
        where:{
          unionid:data.unionid
        },
        raw: true
      })
      if(user.length != 0){
        const userinfo = user[0];
        const visit_at = new Date();
        await ctx.model.Users.update({visit_at: visit_at},{where:{unionid:data.unionid}});
        const token = app.jwt.sign({name:user[0].name,sex:user[0].sex,id:user[0].id},app.config.jwt.secret,{
          expiresIn: '1days'
        });
        ctx.body = {code:200,message:"登录成功",data:{token,userinfo}}
        return
      }
     const userinfo = await this.created(data)
      ctx.body = {code:200,data:userinfo}
    }catch(err){
      ctx.body = ({ code: 0, message:err})
    }
  }

  async created(data){
    try {
      if(data.name && data.unionid){
        const user = await this.ctx.model.Users.create(data);
        const userinfo = user.dataValues;
        const token = app.jwt.sign({name:userinfo.name,sex:userinfo.sex,id:userinfo.id},app.config.jwt.secret,{
          expiresIn: '1days'
        });
        return {userinfo,token}
      }
     return {code:0,message:"创建失败"}
    } catch (error) {
      console.log(error)
      return { code: 0, message:"服务器错误"}
    }
  }

  async bind(){
    const {ctx} = this;
   try{
    const id = ctx.params.id;
    const CODE =  ctx.request.body.code;
    const data = await this._wechat(CODE);
    const unionid = data.unionid;
    if(!unionid){
      ctx.body = {code:0,message:"code过期，请刷新二维码重新扫码"}
      return
    }
    await ctx.model.Users.destroy({where:{unionid}})
    await ctx.model.Users.update({unionid:unionid},{where:{id:id}})
    const users = await ctx.model.Users.findAll({
      where:{id},
      raw: true
    })
    const userinfo = users[0];
    ctx.body = {code:200,userinfo}
   }catch(err){
    ctx.body = {code:0,message:"服务器错误!"}
   }
  }
  async unbound(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      await ctx.model.Users.update({unionid:null},{where:{id:id}})
      const users = await ctx.model.Users.findAll({
        where:{id},
        raw: true
      })
      const userinfo = users[0];
      ctx.body = {code:200,userinfo}
    }catch(err){
      ctx.body = {code:0,message:"服务器错误!"}
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Users = await ctx.model.Users.findByPk(id);
    if (!Users) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await Users.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
  async _wechat(CODE){
    const {app} = this;
    try{
      const APPID = app.config.wechat.appid;
      const SECRET = app.config.wechat.secret;
      const accessToken = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${CODE}&grant_type=authorization_code`;
      const data =  await axios.get(accessToken).then(res =>{
        const access = res.data
        const userinfoURL = `https://api.weixin.qq.com/sns/userinfo?access_token=${access.access_token}&openid=${access.openid}&lang=zh_CN`
      return  axios.get(userinfoURL)
        .then(res =>{
          const params = {
            name: res.data.nickname,
            unionid: res.data.unionid,
            sex:res.data.sex,
            avatar_url: res.data.headimgurl,
            section_key: 'true',
            visit_at: new Date(),
            created_at: new Date(),
          }
          return params
        })
      })
      return data
    }catch(err){
     return {code:0,message:"服务器错误!"}
    }
  }
}
module.exports = WechatController;