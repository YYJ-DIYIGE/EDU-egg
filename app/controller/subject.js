const Controller = require('egg').Controller;


class SubjectController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      const page = ctx.query.page;
      const row = ctx.query.row;
      const Subject =  await ctx.model.Subject.findAll({
        raw:true
      })
      const total = Subject.length;
      const SubjectPage = await ctx.model.Subject.findAll({
        limit: parseInt(row),
        offset:(page - 1)* row,
        raw:true
      })
      const stacks_id = SubjectPage.map(data => data.stack_id);
      const stacks = await Promise.all(stacks_id.map(async(data)=>{
        return await ctx.model.Stacks.findAll({
          where:{id:data},
          raw:true
        })
      }))
      const Subjectes = []
      SubjectPage.forEach((data,index)=>{
        data.stacks = ''
        Subjectes[index] = data
        stacks[index].forEach(data =>{
          if(data.id == Subject[index].stack_id){
            Subjectes[index].stacks = data.name
          }
        })
      })
      ctx.body = {code:200,SubjectPage,total}
    }catch(e){
      console.log(e)
    }
    
  }

  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    data.option =  JSON.stringify(data.option)
    await ctx.model.Subject.create(data);
    ctx.body = { code: 200, message: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, message: err};
   }
  }
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      console.log(id,111)
      const SubjectEdit = await ctx.model.Subject.findAll({
        where:{id},
        raw:true
      });
      SubjectEdit[0].option = JSON.parse(SubjectEdit[0].option)
      const Subject = SubjectEdit[0]
      console.log(Subject,999)
      ctx.body = { code: 200, Subject};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Subject = await ctx.model.Subject.findByPk(id);
      if (!Subject) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      data.option =  JSON.stringify(data.option)
      await Subject.update(data);
      ctx.body = { code: 200, message: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Subject = await ctx.model.Subject.findByPk(id);
      if (!Subject) {
        ctx.body = { code: 404, message: '找不到该数据'};
        return;
      }

      await Subject.destroy();
      ctx.body = { code: 200, message: '删除成功'};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }
}

module.exports = SubjectController;