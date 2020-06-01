const Controller = require('egg').Controller;


class StacksController extends Controller {
  async index() {
    try{
      const ctx = this.ctx;
      ctx.body = await ctx.model.Stacks.findAll()
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Stacks.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const StacksEdit = await ctx.model.Stacks.findByPk(id);
      ctx.body = { code: 200, StacksEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Stacks = await ctx.model.Stacks.findByPk(id);
      if (!Stacks) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Stacks.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Stacks = await ctx.model.Stacks.findByPk(id);
      if (!Stacks) {
        ctx.status = 404;
        return;
      }

      await Stacks.destroy();
      ctx.body = { code: 200, msg: '删除成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
}

module.exports = StacksController;