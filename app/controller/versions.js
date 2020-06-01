
const Controller = require('egg').Controller;

class VersionsController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const project_id =  ctx.params.id
      ctx.body  = await ctx.model.Versions.findAll({
        where:{
          project_id
        },
        order: [
            ['sort', 'ASC']
        ]
      })
    }catch(err){
      ctx.body = ({ code: 0, message:err})
    }
  }
  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     await ctx.model.Versions.create(data);
     ctx.body = { code: 200, msg: '创建成功'};
    }catch(err){
     ctx.body = { code: 0, msg: err};
    }
   }
   async sort(){
    const ctx = this.ctx;
     try{
       const data = ctx.request.body;
        data.map(async (data,index) =>{
        await ctx.model.Versions.update({sort: index},{where:{id: data.id}});
       })
       ctx.body = { code: 200, msg: '修改成功'};
     }catch(err){
      ctx.body = { code: 0, msg: err};
     }
   }
   async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Versions = await ctx.model.Versions.findByPk(id);
      if (!Versions) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Versions.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Versions = await ctx.model.Versions.findByPk(id);
    if (!Versions) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const stories = await ctx.model.Stories.findAll({
      where:{versions_id:id}
    })
    if(stories.length != 0){
      ctx.body = ({
        code:401,
        message:"请先删除故事"
      });
      return
    }
      await Versions.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = VersionsController;