const Controller = require('egg').Controller;


class RolesController extends Controller {
  async permission() {
    const ctx = this.ctx;
    try{
      let PermissionGroups =  await ctx.model.PermissionGroups.findAll({
        raw:true
      })
      let  Permission = await ctx.model.Permission.findAll({
        raw:true
      })
      const permissionGroup = [];
      PermissionGroups.forEach((item,index)=>{
        item.permissions = []
        permissionGroup[index] = item
        Permission.forEach(data =>{
          if(data.group_id == item.id){
            permissionGroup[index].permissions.push(data)
          }
        })
      })
      ctx.body = { code: 200,permissionGroup};
    }catch(e){
      console.log(e)
    }
    
  }
  async index(){
    const ctx = this.ctx;
    try{
      ctx.body = await ctx.model.Roles.findAll()
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    data.permission_slug =  JSON.stringify(data.permission_slug)
    await ctx.model.Roles.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const RolesEdit = await ctx.model.Roles.findAll({
        where:{id},
        raw:true
      });
      RolesEdit[0].permission_slug = JSON.parse(RolesEdit[0].permission_slug)
      const RolesShow =  RolesEdit[0]
      ctx.body = { code: 200,RolesShow};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Roles = await ctx.model.Roles.findByPk(id);
      if (!Roles) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      data.permission_slug =  JSON.stringify(data.permission_slug)
      await Roles.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Roles = await ctx.model.Roles.findByPk(id);
    if (!Roles) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await Roles.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}

module.exports = RolesController;