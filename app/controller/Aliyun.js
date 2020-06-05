const Controller = require('egg').Controller

class AliyunController extends Controller {
  async sendCode(){
    const {ctx} = this;
    try{
      const phone = ctx.request.body.phone;
      let code = await this.code();
      const created_at = new Date();
      if(!phone){
        ctx.body = {code:0,message:"缺少参数"}
        return
      }
      const sms = await ctx.model.Sms.findAll({
        where:{phone},
        raw:true
      })
   
      if(sms.length == 0){
      const sms =  await ctx.model.Sms.create({phone,code,created_at})
      let id = sms.dataValues.id
      await this.setTimeouts(id)
      }else{
        let id = sms[0].id;
       await this.updateCode(id);
       await this.setTimeouts(id);
      }
      // await this.send(phone,code);
      ctx.body = {code:200,message:"发送成功"}
    }catch(err){
      console.log(err)
    }
  }
  async updateCode(id){//修改验证码
    const ctx = this.ctx;
    try{
      const code = await this.code();
      const updated_at = new Date();
      const smscode = await ctx.model.Sms.findByPk(id);
      await smscode.update({code,updated_at})
      ctx.body = {code:200,message:"修改成功"}
    }catch(err){
      console.log(err)
      ctx.body = {code:0,message:"服务器错误"}
    }
  }

  async code (){//随机验证码
    let code = '';
    for(let i=0;i<6;i++){
      let radom = Math.floor(Math.random()*10);
　　　　code += radom;
    }
    return code
  }
  async setTimeouts (id){//60秒后修改验证码
    setTimeout(()=>{
      this.updateCode(id);
     },60000)
  }
  // async send(phone,code){//阿里云发送短信
  //   const {ctx} = this;
  //   try{
  //     const smsResult = await ctx.service.aliyun.sendSMS(phone,code)
  //     if(smsResult.Message == "OK"){
  //       ctx.body = {code: 200, message: '短信发送成功'}
  //     }else{
  //       ctx.body = {code: 0, message: '短信发送失败'}
  //     }
  //     ctx.body = {code:200,message:code}
  //   }catch(err){
  //     console.log(err)
  //     ctx.body = {code: 0, message: '服务器错误'}
  //   }
  // }
}

module.exports =  AliyunController;