module.exports = options =>{
  return async function jwt(ctx,next){
    const token = ctx.request.header.authorization
    if(ctx.request.url === '/manageLogin' || ctx.request.method === "GET"){
      await next();
    }
   else if(token){
      try{
        const authArr = ctx.app.jwt.verify(token,ctx.app.jwt.secret);
        let phone = authArr.phone;
        let role_id = authArr.role_id;
        let name = authArr.nickname;
        let manage = await ctx.model.Manage.findAll({
          where:{
            phone,role_id,name
          }
        });
        if(manage){
          await next()
        }else{
          ctx.status = 401;
          ctx.body = '错误的账号密码'
          return
        }
      }catch (error){
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };

      }
    }else{
      ctx.status = 401;
      ctx.body = {
        message: '没有登录',
      };
    }
  }
}