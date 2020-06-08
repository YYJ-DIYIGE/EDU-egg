'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.authLogin();
  router.post('/manageLogin',jwt, controller.manage.login);
  router.get('/permissions_slug/:id',jwt, controller.permissions.permissions);
  router.get('/qiniu-uploadtoken',jwt, controller.qiniu.qiniu);
  router.get("/company", jwt,controller.company.index);
  router.post("/company", jwt,controller.company.create);
  router.get("/company/:id", jwt,controller.company.Editshow);
  router.put("/company/:id", jwt,controller.company.update);
  router.delete("/company/:id", jwt,controller.company.delete);

  router.get("/project",jwt, controller.projects.index);
  router.post("/project",jwt, controller.projects.create);
  router.get("/project/:id",jwt, controller.projects.Editshow)
  router.put("/project/:id",jwt,controller.projects.update);
  router.delete("/project/:id",jwt,controller.projects.delete);

  router.get("/versions/:id",jwt,controller.versions.index);
  router.post("/versions",jwt,controller.versions.create);
  router.put("/versions/sort",jwt,controller.versions.sort);
  router.put("/versions/:id",jwt,controller.versions.update);
  router.delete("/versions/:id",jwt,controller.versions.delete);

  router.get("/stories",jwt,controller.stories.index);
  router.post("/stories",jwt,controller.stories.create);
  router.put("/stories/sort",jwt,controller.stories.sort);
  router.put("/stories/:id",jwt,controller.stories.update);
  router.delete("/stories/:id",jwt,controller.stories.delete);

  router.post("/tasks", jwt,controller.tasks.create);
  router.delete("/tasks/:id",jwt,controller.tasks.delete);
  router.get("/tasks/:id",jwt,controller.tasks.Editshow)
  router.put("/tasks/:id",jwt,controller.tasks.update);

  router.get("/course",jwt, controller.courses.index);
  router.post("/course",jwt,controller.courses.create);
  router.get("/course/:id",jwt,controller.courses.Editshow)
  router.put("/course/:id",jwt,controller.courses.update);
  router.delete("/course/:id",jwt,controller.courses.delete);

  router.get("/chapters",jwt,controller.chapters.index)
  router.post("/chapters",jwt,controller.chapters.create);
  router.put("/chapters/sort",jwt,controller.chapters.sort);
  router.put("/chapters/:id",jwt,controller.chapters.update);
  router.delete("/chapters/:id",jwt,controller.chapters.delete);

  router.post("/sections",jwt, controller.sections.create);
  router.delete("/sections/:id",jwt,controller.sections.delete);
  router.get("/sections/:id",jwt,controller.sections.Editshow);
  router.put("/sections/:id",jwt,controller.sections.update);

  router.get("/zhiye",jwt, controller.zhiye.index);
  router.post("/zhiye",jwt,controller.zhiye.create);
  router.get("/zhiye/:id",jwt,controller.zhiye.Editshow)
  router.put("/zhiye/:id",jwt,controller.zhiye.update);
  router.delete("/zhiye/:id",jwt,controller.zhiye.delete);

  router.get("/zhiyePath",jwt,controller.zhiyePath.index)
  router.post("/zhiyePath",jwt,controller.zhiyePath.create);
  router.put("/zhiyePath/sort",jwt,controller.zhiyePath.sort);
  router.put("/zhiyePath/:id",jwt,controller.zhiyePath.update);
  router.get("/zhiyePath/:id",jwt,controller.zhiyePath.editShow);
  router.delete("/zhiyePath/:id",jwt,controller.zhiyePath.delete);

  router.post("/zhiyeCourses",jwt, controller.zhiyeCourses.create);
  router.delete("/zhiyeCourses/:id",jwt,controller.zhiyeCourses.delete);
  router.put("/zhiyeCourses/:id",jwt,controller.zhiyeCourses.update);

  router.get("/stacks",jwt,controller.stacks.index);
  router.post("/stacks",jwt,controller.stacks.create);
  router.get("/stacks/:id",jwt,controller.stacks.Editshow);
  router.put("/stacks/:id",jwt,controller.stacks.update);
  router.delete("/stacks/:id",jwt,controller.stacks.delete);

  router.get('/subject',jwt,controller.subject.index);
  router.post("/subject",jwt,controller.subject.create);
  router.put("/subject/:id",jwt,controller.subject.update);
  router.get("/subject/:id",jwt,controller.subject.Editshow);
  router.delete("/subject/:id",jwt,controller.subject.delete);

  router.get("/admin/permission",jwt,controller.roles.permission);
  router.post("/admin/role",jwt,controller.roles.create);
  router.get("/admin/role",jwt,controller.roles.index);
  router.get("/admin/role/:id",jwt,controller.roles.Editshow);
  router.put("/admin/role/:id",jwt,controller.roles.update);
  router.delete("/admin/role/:id",jwt,controller.roles.delete);

  router.get("/admin/manage",jwt,controller.manage.index);
  router.post("/admin/manage",jwt,controller.manage.create);
  router.get("/admin/manage/:id",jwt,controller.manage.Editshow);
  router.put("/admin/manage/:id",jwt,controller.manage.update);
  router.delete("/admin/manage/:id",jwt,controller.manage.destroy);

  router.get("/material",jwt, controller.material.index);
  router.post("/material", jwt,controller.material.create);
  router.get("/material/:id",jwt, controller.material.Editshow);
  router.put("/material/:id",jwt, controller.material.update);
  router.delete("/material/:id", jwt,controller.material.delete);

  router.get("/advertise",jwt, controller.advertise.index);
  router.post("/advertise",jwt, controller.advertise.create);
  router.get("/advertise/:id",jwt, controller.advertise.Editshow);
  router.put("/advertise/:id",jwt, controller.advertise.update);
  router.delete("/advertise/:id",jwt, controller.advertise.delete);

  router.post("/advertise/material",jwt, controller.advertuseMaterial.create);
  router.put("/advertise/material/:id",jwt, controller.advertuseMaterial.update);
  router.delete("/advertise/material/:id",jwt, controller.advertuseMaterial.delete);
  router.post('/advertise/material/sort',jwt, controller.advertuseMaterial.sort);

  router.post("/api/sms/login",controller.users.login);
  router.post("/api/sms/send", controller.aliyun.sendCode);
  router.post("/api/wachat",controller.wechat.wechat);
};
