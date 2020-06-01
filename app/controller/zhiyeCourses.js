
const Controller = require('egg').Controller;

class TasksController extends Controller {

  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     const Course = await ctx.model.ZhiyeCourse.findAll({
       where:{ course_id:data.course_id,path_id:data.path_id},
       raw:true
     })
     if(Course.length != 0){
       ctx.body = { code: 0, message: '添加失败，该路径已有此课程'};
       return
     }
     await ctx.model.ZhiyeCourse.create(data)
     ctx.body = { code: 200, message: '添加成功'};
    }catch(err){
     ctx.body = { code: 0, message: err};
    }
   }
   async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const ZhiyeCourse = await ctx.model.ZhiyeCourse.findByPk(id);
      if (!ZhiyeCourse) {
        ctx.body = ({
          code:404,
          message:"找不到该条数据"
        });
        return;
      }
      const data = ctx.request.body;
      const Courses_id = await ctx.model.ZhiyeCourse.findAll({
        where:{course_id:data.course_id}
      });
     if(Courses_id){
      ctx.body = { code: 0, message: "已有此课程"};
      return
     }
      await ZhiyeCourse.update(data);
      ctx.body = { code: 200, message: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const ZhiyeCourse = await ctx.model.ZhiyeCourse.findByPk(id);
    if (!ZhiyeCourse) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await ZhiyeCourse.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = TasksController;