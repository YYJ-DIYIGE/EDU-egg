const Core = require('@alicloud/pop-core');
const Service = require("egg").Service;

class AlismsService extends Service {
  async sendSMS(phone,code){
    const client = await this._client();
    const params = await this._params(phone, code);
    const requestOption = await this._requestOption();
    try{
      const ret = await this._send(client, params, requestOption)
      return JSON.parse(ret);
    }catch(err){
      console.log(err)
      this.ctx.errorHandle(err)
    }
  }
  async _client() {
    return new Core({
        accessKeyId:  this.config.aliyun.accessKeyId,
        accessKeySecret: this.config.aliyun.secretAccessKey,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });
}

  async _params(phone,code) {
    return {
      "RegionId": "cn-hangzhou",
      "PhoneNumbers": `${phone}`,
      "SignName": "扎克斯",
      "TemplateCode": "SMS_173660228",
      "TemplateParam": `{\"code\":${code}}`
    }
  }

  async _requestOption() {
    return {
        method: 'POST'
    }
  }
  async _send(client, params, requestOption) {
    return new Promise((resolve, reject) => {
        client.request('SendSms', params, requestOption).then((result) => {
            resolve(JSON.stringify(result))
        }, (ex) => {
            reject(ex)
        })
    })
  }
}

module.exports = AlismsService