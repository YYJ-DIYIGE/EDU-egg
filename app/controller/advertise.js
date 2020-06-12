const Controller = require('egg').Controller;


class ProjectsController extends Controller {
  async index() {
    const ctx = this.ctx;
    try{
      ctx.body = await ctx.model.Advertise.findAll()
    }catch(e){
      console.log(e)
    }
    
  }
  async Allshow(){
    const ctx = this.ctx;
    try{
      const advertise = await ctx.model.Advertise.findAll({raw:true});
      const AdvertuseMaterial = await Promise.all(advertise.map(async (data,index)=>{
       return await ctx.model.AdvertuseMaterial.findAll({
          where:{advertise_id:data.id},
          raw:true
        })
      }))
      const Material =  await ctx.model.Material.findAll({raw:true});
      advertise.forEach((item,index)=>{
        item.material = []
        AdvertuseMaterial[index].forEach(data =>{
          if(item.id == data.advertise_id){
            let material_id = data.material_id
            Material.forEach((data) =>{
              if(data.id == material_id){
                item.material.push({
                  image_url:data.image_url,
                  link:data.link,
                  window:data.window
                })
              }
            })
          }
        })
      })
      ctx.body = advertise
    }catch(err){
      console.log(err)
    }
  }
  async create() {
    const ctx = this.ctx;
   try{
    const data = ctx.request.body;
    await ctx.model.Advertise.create(data);
    ctx.body = { code: 200, msg: '创建成功'};
   }catch(err){
    ctx.body = { code: 0, msg: err};
   }
  }
  
  async Editshow(){
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Advertise = await ctx.model.Advertise.findAll({
        where:{id},
        raw:true
      });
      const AdvertuseMaterial = await ctx.model.AdvertuseMaterial.findAll({
        where:{advertise_id: Advertise[0].id},
        raw:true,
        order: [
          ['sort', 'ASC']
        ]
      })
      const material_id = AdvertuseMaterial.map(data => data.material_id);
      const Material = await Promise.all(material_id.map(async (data) =>{
        return await ctx.model.Material.findAll({
          where:{id:data},
          raw:true
        })
      }))
      Advertise.forEach(item=>{
        item.material = [];
        AdvertuseMaterial.forEach((data,index) =>{
          if(item.id == data.advertise_id){
            let _id = data.id;
            let material_id = data.material_id
            Material[index].forEach(data =>{
              if(data.id == material_id){
                data._id = _id;
                item.material.push(data)
              }
            })
          }
        })
      })
      const form = Advertise[0]
      ctx.body = { code: 200, form};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }
  async update() {
    const ctx = this.ctx;
    try{
      const id = ctx.params.id;
      const Advertise = await ctx.model.Advertise.findByPk(id);
      if (!Advertise) {
        ctx.status = 404;
        return;
      }
      const data = ctx.request.body;
      await Advertise.update(data);
      ctx.body = { code: 200, msg: '修改成功', Advertise};
    }catch(err){
      ctx.body = { code: 0, msg: err};
    }
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    console.log(id,999)
    const Advertise = await ctx.model.Advertise.findByPk(id);
    if (!Advertise) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
    const Material = await ctx.model.AdvertuseMaterial.findAll({
      where:{advertise_id:id},
      raw:true
    })
    console.log(Material)
    if(Material.length != 0){
      ctx.body = ({
        code: 401,
        message:"请先删除关联物料"
      });
      return
    }
      await Advertise.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}

module.exports = ProjectsController;