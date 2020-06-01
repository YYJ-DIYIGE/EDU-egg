const Controller = require('egg').Controller;


class ManageController extends Controller {
  async login() {
    const {ctx,app} = this;
    try{
      const {phone,password} = ctx.request.body
      let manage = await ctx.model.Manage.findAll({
        where:{
          phone,password
        },
        raw:true
      });
      let manages = manage[0];
      let id = manages.id;
      let name  = manages.name;
      let role_id = manages.role_id;
      let userInfo = {
        id,
        name,
        role_id
      }
      if(!manages){
        ctx.body = { code: 404, msg: '登录失败，账号密码错误' };
        return
      }else{
      const token = app.jwt.sign({nickname:manages.name,phone:manages.phone,role_id:role_id},app.config.jwt.secret,{
        expiresIn: '1days'
      });
        ctx.body = { code: 201, msg: '登录成功',token,userInfo};
      }
    }catch(err){
      ctx.body = { code: 0, msg: err };
    }
  }
  async index(){
    const ctx = this.ctx;
    try{
      const Manages = await ctx.model.Manage.findAll({
        raw:true
      })
     const Role = await Promise.all(Manages.map(async(item)=>{
        return await ctx.model.Roles.findAll({
          where:{
            id:item.role_id
          },
          raw:true
        })
     }))
     Manages.forEach((item,index)=>{
       item.roles = '';
       Role[index].forEach(data =>{
         if(data.id == item.role_id){
           item.roles = data.name
         }
       })
     })
      ctx.body = Manages
    }catch(err){
      this.ctx.body={code:0,msg: err}
    }
  }

  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Manage = await ctx.model.Manage.findByPk(id);
      ctx.body = { code: 200,Manage};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
    const data = ctx.request.body;
    await ctx.model.Manage.create(data);
    ctx.body = {code:200,msg:"创建成功"};
    }catch(err){
      ctx.body = {code:0,msg: err}
    }
  }

  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Manage = await ctx.model.Manage.findByPk(id);
      if (!Manage) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Manage.update(data);
      ctx.body = {code:200,msg:"修改成功"};
    }catch(err){
      ctx.body = {code:0,msg: err}
    }
  }

  async destroy() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Manage = await ctx.model.Manage.findByPk(id);
      if (!Manage) {
        ctx.status = 404;
        return;
      }
      await Manage.destroy();
      ctx.body = {code:200,msg:"删除成功"};
    }catch{
      ctx.body = {code:0,msg: err}
    }
  }
}

module.exports = ManageController;