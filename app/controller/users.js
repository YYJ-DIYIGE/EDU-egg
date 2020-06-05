const Controller = require('egg').Controller;

class UsersContorller extends Controller {
  async login(){
    const ctx = this.ctx;
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
      console.log(smsCode,999)
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
        ctx.body = {code:200,message:"登录成功"}
      }else{
        await this.create(phone)
      }
      ctx.body = {code:200,message:"登录成功"}
    }catch(err){
      console.log(err)
      ctx.body = {code:0,message:"服务器错误"}
    }
  }
  async create(phone) {
    const ctx = this.ctx;
    try{
      const created_at = new Date;
      const visit_at = new Date;
      const name = phone;
      await ctx.model.Users.create({phone,created_at,visit_at,name});
      ctx.body = {code:200,message:"创建成功"}
    }catch(err){
      console.log(err)
      ctx.body = {code:0,message:"服务器错误"}
    }
  }
}

module.exports = UsersContorller;