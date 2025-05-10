const Joi = require("joi");

const getTask = {
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
  };

  const createTask={
    body:Joi.object().keys({
      description:Joi.string(),
      title:Joi.string().required(),
      dueDate:Joi.date().greater('now').required(),
      effortToComplete:Joi.number(),
    }),
  }

  const updateTask={
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
    body:Joi.object().keys({
      description:Joi.string(),
      title:Joi.string(),
      effortToComplete:Joi.number(),
      dueDate:Joi.date().greater('now'),
      // status:Joi.string().valid('todo','inProgress','done')
    }),
  }

  const deleteTask = {
    params: Joi.object().keys({
      taskId:Joi.number(),
    }),
  };

  module.exports={
    getTask,deleteTask,createTask,updateTask
  }