
const Controller = require('egg').Controller;

class SectionsController extends Controller {

  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     await ctx.model.Sections.create(data)
     ctx.body = { code: 200, msg: '创建成功'};
    }catch(err){
     ctx.body = { code: 0, msg: err};
    }
   }

   async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const SectionsEdit = await ctx.model.Sections.findByPk(id);
      ctx.body = { code: 200, SectionsEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
   async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Sections = await ctx.model.Sections.findByPk(id);
      if (!Sections) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Sections.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Sections = await ctx.model.Sections.findByPk(id);
    if (!Sections) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await Sections.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = SectionsController ;