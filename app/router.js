'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/manageLogin', controller.manage.login);
  router.get('/permissions_slug/:id', controller.permissions.permissions);
  router.get('/qiniu-uploadtoken', controller.qiniu.qiniu);
  router.get("/company",controller.company.index);
  router.post("/company",controller.company.create);
  router.get("/company/:id",controller.company.Editshow);
  router.put("/company/:id",controller.company.update);
  router.delete("/company/:id",controller.company.delete);

  router.get("/project", controller.projects.index);
  router.post("/project",controller.projects.create);
  router.get("/project/:id",controller.projects.Editshow)
  router.put("/project/:id",controller.projects.update);
  router.delete("/project/:id",controller.projects.delete);

  router.get("/versions/:id",controller.versions.index);
  router.post("/versions",controller.versions.create);
  router.put("/versions/sort",controller.versions.sort);
  router.put("/versions/:id",controller.versions.update);
  router.delete("/versions/:id",controller.versions.delete);

  router.get("/stories",controller.stories.index);
  router.post("/stories",controller.stories.create);
  router.put("/stories/sort",controller.stories.sort);
  router.put("/stories/:id",controller.stories.update);
  router.delete("/stories/:id",controller.stories.delete);

  router.post("/tasks", controller.tasks.create);
  router.delete("/tasks/:id",controller.tasks.delete);
  router.get("/tasks/:id",controller.tasks.Editshow)
  router.put("/tasks/:id",controller.tasks.update);

  router.get("/course", controller.courses.index);
  router.post("/course",controller.courses.create);
  router.get("/course/:id",controller.courses.Editshow)
  router.put("/course/:id",controller.courses.update);
  router.delete("/course/:id",controller.courses.delete);

  router.get("/chapters",controller.chapters.index)
  router.post("/chapters",controller.chapters.create);
  router.put("/chapters/sort",controller.chapters.sort);
  router.put("/chapters/:id",controller.chapters.update);
  router.delete("/chapters/:id",controller.chapters.delete);

  router.post("/sections", controller.sections.create);
  router.delete("/sections/:id",controller.sections.delete);
  router.get("/sections/:id",controller.sections.Editshow);
  router.put("/sections/:id",controller.sections.update);

  router.get("/zhiye", controller.zhiye.index);
  router.post("/zhiye",controller.zhiye.create);
  router.get("/zhiye/:id",controller.zhiye.Editshow)
  router.put("/zhiye/:id",controller.zhiye.update);
  router.delete("/zhiye/:id",controller.zhiye.delete);

  router.get("/zhiyePath",controller.zhiyePath.index)
  router.post("/zhiyePath",controller.zhiyePath.create);
  router.put("/zhiyePath/sort",controller.zhiyePath.sort);
  router.put("/zhiyePath/:id",controller.zhiyePath.update);
  router.get("/zhiyePath/:id",controller.zhiyePath.editShow);
  router.delete("/zhiyePath/:id",controller.zhiyePath.delete);

  router.post("/zhiyeCourses", controller.zhiyeCourses.create);
  router.delete("/zhiyeCourses/:id",controller.zhiyeCourses.delete);
  router.put("/zhiyeCourses/:id",controller.zhiyeCourses.update);

  router.get("/stacks",controller.stacks.index);
  router.post("/stacks",controller.stacks.create);
  router.get("/stacks/:id",controller.stacks.Editshow);
  router.put("/stacks/:id",controller.stacks.update);
  router.delete("/stacks/:id",controller.stacks.delete);

  router.get('/subject',controller.subject.index);
  router.post("/subject",controller.subject.create);
  router.put("/subject/:id",controller.subject.update);
  router.get("/subject/:id",controller.subject.Editshow);
  router.delete("/subject/:id",controller.subject.delete);

  router.get("/admin/permission",controller.roles.permission);
  router.post("/admin/role",controller.roles.create);
  router.get("/admin/role",controller.roles.index);
  router.get("/admin/role/:id",controller.roles.Editshow);
  router.put("/admin/role/:id",controller.roles.update);
  router.delete("/admin/role/:id",controller.roles.delete);

  router.get("/admin/manage",controller.manage.index);
  router.post("/admin/manage",controller.manage.create);
  router.get("/admin/manage/:id",controller.manage.Editshow);
  router.put("/admin/manage/:id",controller.manage.update);
  router.delete("/admin/manage/:id",controller.manage.destroy);

  router.get("/material", controller.material.index);
  router.post("/material", controller.material.create);
  router.get("/material/:id", controller.material.Editshow);
  router.put("/material/:id", controller.material.update);
  router.delete("/material/:id", controller.material.delete);

  router.get("/advertise", controller.advertise.index);
  router.post("/advertise", controller.advertise.create);
  router.get("/advertise/:id", controller.advertise.Editshow);
  router.put("/advertise/:id", controller.advertise.update);
  router.delete("/advertise/:id", controller.advertise.delete);

  router.post("/advertise/material", controller.advertuseMaterial.create);
  router.put("/advertise/material/:id", controller.advertuseMaterial.update);
  router.delete("/advertise/material/:id", controller.advertuseMaterial.delete);
  router.post('/advertise/material/sort', controller.advertuseMaterial.sort);
};
