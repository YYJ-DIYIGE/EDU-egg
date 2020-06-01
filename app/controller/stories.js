
const Controller = require('egg').Controller;

class StoriesController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const versions_id =  Number(ctx.query.versions_id);
      const Stories  = await ctx.model.Stories.findAll({
        where:{
          versions_id
        },
        raw:true,
        order: [
            ['sort', 'ASC']
        ]
      })
    let story_id = Stories.map(data => data.id);
    const tasks =  await Promise.all ( story_id.map( async (data)=>{
    return  await ctx.model.Tasks.findAll({
         where:{story_id:data},
         raw:true,
        order: [
              ['sort', 'ASC']
        ]
       })
     }))
     const  Storie = [];
     Stories.forEach((item,index)=>{
      item.tasks = [];
      Storie[index] = item
       tasks[index].forEach(data =>{
         if(data.story_id == Stories[index].id){
          Storie[index].tasks.push(data)
         }
       })
     })
     ctx.body = ({
      code:200,
      Storie
    })
    }catch(e){
      console.log(e)
      ctx.body = ({ code: 0, message: 'server error'})
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     await ctx.model.Stories.create(data);
     ctx.body = { code: 200, msg: '添加成功'};
    }catch(err){
     ctx.body = { code: 0, msg: err};
    }
   }

   async sort(){
    const ctx = this.ctx;
     try{
       const data = ctx.request.body;
        data.map(async (data,index) =>{
        await ctx.model.Stories.update({sort: index},{where:{id:data.id}});
       })
       data.map(data=>{
         if(data.tasks.length != 0){
          data.tasks.map(async(data,index)=>{
            await ctx.model.Tasks.update({sort: index},{where:{id:data.id}})
         })
         }
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
      const Stories = await ctx.model.Stories.findByPk(id);
      if (!Stories) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Stories.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Stories = await ctx.model.Stories.findByPk(id);
    if (!Stories) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const tasks = await ctx.model.Tasks.findAll({
      where:{story_id:id}
    })
    if(tasks.length != 0){
      ctx.body = ({
        code:401,
        message:"请先删除任务"
      });
      return
    }
      await Stories.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = StoriesController;