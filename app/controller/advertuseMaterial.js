
const Controller = require('egg').Controller;

class AdvertuseMaterialController extends Controller {

  async create() {
    const ctx = this.ctx;
    try{
     const data = ctx.request.body;
     const material = await ctx.model.Material.findAll({
       where:{id:data.material_id},
       raw:true
     })
     if(material.length === 0){
      ctx.body = { code: 0, message: '添加失败，没有此物料'};
      return
     }
     const AdvertiseMaterial = await ctx.model.AdvertuseMaterial.findAll({
       where:{ advertise_id:data.advertise_id,material_id:data.material_id},
       raw:true
     })
     if(AdvertiseMaterial.length != 0){
       ctx.body = { code: 0, message: '添加失败，已有此物料'};
       return
     }
     await ctx.model.AdvertuseMaterial.create(data)
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
        await ctx.model.AdvertuseMaterial.update({sort: index},{where:{id:data._id}});
       })
       ctx.body = { code: 200, msg: '修改成功'};
     }catch(err){
        ctx.body = { code: 0, msg: err};
     }
   }
   async update() {
    const ctx = this.ctx;
    try{
      console.log(ctx.params.id,99)
      const id = ctx.params.id;
      const AdvertuseMaterial = await ctx.model.AdvertuseMaterial.findByPk(id);
      if (!AdvertuseMaterial) {
        ctx.body = ({
          code:404,
          message:"找不到该条数据"
        });
        return;
      }
      const data = ctx.request.body;
      const AdvertuseMaterials = await ctx.model.AdvertuseMaterial.findAll({
        where:{material_id:data.material_id},
        raw:true
      });
     if(AdvertuseMaterials.length != 0){
      ctx.body = { code: 0, message: "已有此物料"};
      return
     }
      await AdvertuseMaterial.update(data);
      ctx.body = { code: 200, message: '修改成功'};
    }catch(err){
      ctx.body = { code: 0, message: err};
    }
  }
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const AdvertuseMaterial = await ctx.model.AdvertuseMaterial.findByPk(id);
    if (!AdvertuseMaterial) {
      ctx.body = ({
        code:404,
        message:"找不到该条数据"
      });
      return;
    }
      await AdvertuseMaterial.destroy();
      ctx.body = ({
        code:200,
        message:"删除成功"
      });
  }
}
module.exports = AdvertuseMaterialController;