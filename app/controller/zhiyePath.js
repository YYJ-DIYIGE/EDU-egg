
const Controller = require('egg').Controller;

class StoriesController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const zhiye_id =  Number(ctx.query.zhiye_id);
      const ZhiyePath  = await ctx.model.ZhiyePath.findAll({
        where:{
          zhiye_id
        },
        raw: true,
        order: [
            ['sort', 'ASC']
        ]
      })
    let path_id = ZhiyePath.map(data => data.id);
    const ZhiyeCourse = await ctx.model.ZhiyeCourse.findAll({
      where:{
        path_id
      },
      order: [
        ['sort', 'ASC']
      ]
    })
    const course_id = ZhiyeCourse.map(data => data.course_id);
    const Courses =  await Promise.all ( course_id.map( async (data)=>{
      return  await ctx.model.Courses.findAll({
         where:{id:data},
         raw:true
       })
     }))
     const ZhiyePaths = [];
     ZhiyePath.forEach((data,index) =>{
       data.Course = []
       ZhiyePaths[index] = data
       ZhiyeCourse.forEach((data,indes) =>{
         if(data.path_id == ZhiyePath[index].id){
          let  zhiyeCourses_id = data.id
          let course_id = data.course_id
          Courses[indes].forEach(data =>{
            if(data.id == course_id)
            data.zhiyeCourses_id = zhiyeCourses_id;
            ZhiyePaths[index].Course.push(data)
          })
         }
       })
     })
     ctx.body = ({
      code:200,
      ZhiyePaths
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
     await ctx.model.ZhiyePath.create(data);
     ctx.body = { code: 200, message: '添加成功'};
    }catch(err){
     ctx.body = { code: 0, message: err};
    }
   }

   async sort(){
    const ctx = this.ctx;
     try{
       const data = ctx.request.body;
        data.map(async (data,index) =>{
        await ctx.model.ZhiyePath.update({sort: index},{where:{id:data.id}});
       })
       data.map(data=>{
          if(data.Course.length != 0){
            data.Course.map(async (item,index)=>{
              await ctx.model.ZhiyeCourse.update({sort: index},{where:{id:item.zhiyeCourses_id}})
          })
         }
       })
       ctx.body = { code: 200, message: '修改成功'};
     }catch(err){
      ctx.body = { code: 0, message: err};
     }
   }
   async editShow(){
    const ctx = this.ctx;
     try{
       const id = ctx.params.id;
       const ZhiyePath = await ctx.model.ZhiyePath.findByPk(id);
       ctx.body = { code: 200, ZhiyePath};
     }catch(err){
      ctx.body = { code: 0, message: err};
     }
   }
   async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const ZhiyePath = await ctx.model.ZhiyePath.findByPk(id);
      if (!ZhiyePath) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await ZhiyePath.update(data);
      ctx.body = { code: 200, message: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const ZhiyePath = await ctx.model.ZhiyePath.findByPk(id);
    if (!ZhiyePath) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const ZhiyeCourse = await ctx.model.ZhiyeCourse.findAll({
      where:{path_id:id}
    })
    if(ZhiyeCourse.length != 0){
      ctx.body = ({
        code:401,
        message:"请先删除关联课程"
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