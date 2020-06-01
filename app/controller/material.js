const Controller = require('egg').Controller;


class ProjectsController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      ctx.body = await ctx.model.Material.findAll()
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Material.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Material = await ctx.model.Material.findByPk(id);
      ctx.body = { code: 200, Material};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Material = await ctx.model.Material.findByPk(id);
      if (!Material) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Material.update(data);
      ctx.body = { code: 200, msg: '修改成功', Material};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
   try{
    const id = ctx.params.id;
    const Material = await ctx.model.Material.findByPk(id);
    if (!Material) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    await ctx.model.AdvertuseMaterial.destroy({
     where:{material_id:id}
   })
      await Material.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
   }catch(err){
     console.log(err)
     ctx.body = {code:0, message:err}
   }
  }
}

module.exports = ProjectsController;