
const Controller = require('egg').Controller;

class ChaptersController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const course_id =  Number(ctx.query.course_id);
      const Chapters  = await ctx.model.Chapters.findAll({
        where:{
          course_id
        },
        raw:true,
        order: [
            ['sort', 'ASC']
        ]
      })
    let chapter_id = Chapters.map(data => data.id);
    const sections =  await Promise.all ( chapter_id.map( async (data)=>{
       return  await ctx.model.Sections.findAll({
         where:{chapter_id:data},
         raw:true,
          order: [
            ['sort', 'ASC']
          ]
       })
     }))
     const  Chapter = [];
     Chapters.forEach((item,index)=>{
      item.sections = [];
       Chapter[index] = item
       sections[index].forEach(data =>{
         if(data.chapter_id == Chapters[index].id){
          Chapter[index].sections.push(data)
         }
       })
     })
     ctx.body = ({
      code:200,
      Chapter
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
     await ctx.model.Chapters.create(data);
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
        await ctx.model.Chapters.update({sort: index},{where:{id:data.id}});
       })
       data.map(data=>{
         if(data.sections.length != 0){
          data.sections.map(async(data,index)=>{
            await ctx.model.Sections.update({sort: index},{where:{id:data.id}})
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
      const Chapters = await ctx.model.Chapters.findByPk(id);
      if (!Chapters) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Chapters.update(data);
      ctx.body = { code: 200, msg: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const Chapters = await ctx.model.Chapters.findByPk(id);
    if (!Chapters) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const Sections = await ctx.model.Sections.findAll({
      where:{chapter_id:id}
    })
    if(Sections.length != 0){
      ctx.body = ({
        code:401,
        message:"请先删除节"
      });
      return
    }
      await Chapters.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = ChaptersController;