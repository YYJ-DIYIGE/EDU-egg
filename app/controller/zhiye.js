const Controller = require('egg').Controller;


class ProjectsController extends Controller {
  async index() {
    try{
      const ctx = this.ctx;
      ctx.body = await ctx.model.Zhiye.findAll()
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Zhiye.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const ZhiyeEdit = await ctx.model.Zhiye.findByPk(id);
      ctx.body = { code: 200, ZhiyeEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Zhiye = await ctx.model.Zhiye.findByPk(id);
      if (!Zhiye) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Zhiye.update(data);
      ctx.body = { code: 200, msg: '修改成功', Zhiye};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Zhiye = await ctx.model.Zhiye.findByPk(id);
    if (!Zhiye) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const ZhiyePath = await ctx.model.ZhiyePath.findAll({
      where:{zhiye_id:id}
    })
    if(ZhiyePath.length != 0){
      ctx.body = ({
        code: 401,
        message:"请先删除职业路径"
      });
      return
    }
      await Zhiye.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}

module.exports = ProjectsController;