const Controller = require('egg').Controller;


class ProjectsController extends Controller {
  async index() {
    try{
      const ctx = this.ctx;
      ctx.body = await ctx.model.Projects.findAll()
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Projects.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{     
      const id = ctx.params.id;
      const ProjectsEdit = await ctx.model.Projects.findByPk(id);
      ctx.body = { code: 200, ProjectsEdit};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Projects = await ctx.model.Projects.findByPk(id);
      if (!Projects) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Projects.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Projects = await ctx.model.Projects.findByPk(id);
    if (!Projects) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const Versions = await ctx.model.Versions.findAll({
      where:{project_id:id}
    })
    if(Versions.length != 0){
      ctx.body = ({
        code: 401,
        message:"请先删除版本内容"
      });
      return
    }
      await Projects.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}

module.exports = ProjectsController;