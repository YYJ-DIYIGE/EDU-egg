
const Controller = require('egg').Controller;

class TasksController extends Controller {

  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     await ctx.model.Tasks.create(data)
     ctx.body = { code: 200, msg: '创建成功'};
    }catch(err){
     ctx.body = { code: 0, msg: err};
    }
   }

   async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const TasksEdit = await ctx.model.Tasks.findByPk(id);
      ctx.body = { code: 200, TasksEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
   async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Tasks = await ctx.model.Tasks.findByPk(id);
      if (!Tasks) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Tasks.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Tasks = await ctx.model.Tasks.findByPk(id);
    if (!Tasks) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await Tasks.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = TasksController;