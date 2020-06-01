
const Controller = require('egg').Controller;

class PermissionsController extends Controller {
  async permissions(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Roles = await ctx.model.Roles.findAll({
        where:{
          id
        },
        raw: true
      })
     const permissions = JSON.parse(Roles[0].permission_slug)
     ctx.body = permissions
    }catch{
      ctx.body = {code:0,msg:'不知道'}
    }
  }
}
module.exports = PermissionsController;