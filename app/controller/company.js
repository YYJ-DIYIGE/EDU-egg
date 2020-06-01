const Controller = require('egg').Controller;


class CompanyController extends Controller {
  async index() {
    try{
      const ctx = this.ctx;
      ctx.body = await ctx.model.Company.findAll()
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Company.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const CompanyEdit = await ctx.model.Company.findByPk(id);
      ctx.body = { code: 200, CompanyEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Company = await ctx.model.Company.findByPk(id);
      if (!Company) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Company.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Company = await ctx.model.Company.findByPk(id);
      if (!Company) {
        ctx.status = 404;
        return;
      }

      await Company.destroy();
      ctx.body = { code: 200, msg: '删除成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
}

module.exports = CompanyController;