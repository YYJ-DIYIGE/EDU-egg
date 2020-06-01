const qiniu = require('qiniu');
const Controller = require('egg').Controller;

class qiniuController extends Controller {
  async qiniu() {
    const {ctx,app} = this;
    try{
      const accessKey = app.config.qiniu.accessKey;
      const secretKey = app.config.qiniu.secretKey;
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options ={
        scope: "qinuyyj"
      }
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken= putPolicy.uploadToken(mac);
      ctx.body = {
        token: uploadToken,
        domain: "qa86u62w8.bkt.clouddn.com"
      }
    }catch(e){
      console.log(e)
      ctx.body = ({ code: 0, message: 'server error'})
    }
    
  }
}
module.exports = qiniuController;