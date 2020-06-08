const Controller = require('egg').Controller;

class UsersContorller extends Controller {
  async login(){
    const {ctx,app} = this;
    try{
      const phone = ctx.request.body.phone;
      const code = ctx.request.body.code;
      const smsCode = await ctx.model.Sms.findAll({
        where:{
          phone,
          code
        },
        raw: true
      })
      if(smsCode.length == 0){
        ctx.body = {code:0,message:"验证码过期"}
        return
      }
      const user = await ctx.model.Users.findAll({
        where:{
          phone
        },
        raw: true
      })
      if(user.length != 0){
        const userinfo = user[0];
        const visit_at = new Date();
        await ctx.model.Users.update({visit_at: visit_at},{where:{phone:phone}});
        const token = app.jwt.sign({name:userinfo.name,phone:userinfo.phone,created_at:userinfo.created_at},app.config.jwt.secret,{
          expiresIn: '1days'
        });
        ctx.body = {code:200,message:"登录成功",data:{token,userinfo}}
        return
      }
      const data =  await this.create(phone)
      ctx.body = {code:200,message:"登录成功",data}
    }catch(err){
      console.log(err)
      ctx.body = {code:0,message:"服务器错误"}
    }
  }
  async create(phone) {
    const {ctx,app} = this;
    try{
      const created_at = new Date;
      const visit_at = new Date;
      const name = phone;
      const user = await ctx.model.Users.create({phone,created_at,visit_at,name});
      const token = app.jwt.sign({name:name,phone:phone,created_at:created_at},app.config.jwt.secret,{
        expiresIn: '1days'
      });
      const userinfo = user._previousDataValues;
      ctx.body = {code:200,message:"创建成功"}
      return {userinfo, token}
    }catch(err){
      console.log(err)
      ctx.body = {code:0,message:"服务器错误"}
    }
  }
}

module.exports = UsersContorller;