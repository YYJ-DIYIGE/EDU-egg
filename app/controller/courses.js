const Controller = require('egg').Controller;


class ProjectsController extends Controller {
  async index() {
    try{
      const ctx = this.ctx;
      ctx.body = await ctx.model.Courses.findAll()
    }catch(e){
      console.log(e)
    }
  }
  async latest() {
    try{
      const ctx = this.ctx;
      const course = await ctx.model.Courses.findAll({
        raw:true,
        order: [
            ['created_time', 'DESC']
        ],
        limit: 4
      })
      console.log(course)
      ctx.body = course
    }catch(err){
      console.log(err)
    }
  } 

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    console.log(ctx.request.body)
    await ctx.model.Courses.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const CoursesEdit = await ctx.model.Courses.findByPk(id);
      ctx.body = { code: 200, CoursesEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Courses = await ctx.model.Courses.findByPk(id);
      if (!Courses) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Courses.update(data);
      ctx.body = { code: 200, msg: '修改成功', Courses};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Courses = await ctx.model.Courses.findByPk(id);
    if (!Courses) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const Chapters = await ctx.model.Chapters.findAll({
      where:{course_id:id}
    })
    if(Chapters.length != 0){
      ctx.body = ({
        code: 401,
        message:"请先删除章节内容"
      });
      return
    }
    await ctx.model.ZhiyeCourse.destroy({where:{
      course_id:id
    }})
      await Courses.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}

module.exports = ProjectsController;