const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { taskService } = require("../services");
const httpStatus = require("http-status");
const multer = require("multer");
const xlsx = require("xlsx");
const Task = require("../models/task.model");
const pick = require("../utils/pick");

const getTaskById = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.user, req.params.taskId);
  // console.log(task);
  if (!task) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Task with id ${req.params.taskId} is Not found/belongs to user ${req.user.email}`
    );
  }
  res.status(httpStatus.OK).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  // console.log("getTasks", req.user);
  const tasks = await taskService.getTasks(req.user);
  res.status(httpStatus.OK).send(tasks);
});

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.creteTask(req.user, req.body);
  if (!task) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${req.params.taskId} is Not found for user ${req.user.email}`
    );
  }
  res.status(httpStatus.CREATED).send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(
    req.user,
    req.params.taskId,
    req.body
  );
  if (!task) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${req.params.taskId} is Not found for user ${req.user.email}`
    );
  }
  res.status(httpStatus.OK).send(task); // here we can use NO_Content also 204
});
const deleteTask = catchAsync(async (req, res) => {
  const info = await taskService.deleteTaskById(req.user, req.params.taskId);
  if (info) {
    res.status(httpStatus.OK).send({ deleted: info });
  } else
    throw new ApiError(httpStatus.NOT_FOUND, `${req.params.taskId} Not Found'`);
});
const exportTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getTasks(req.user);
  if (!tasks.tasks) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Tasks not found for user ${req.user.email}`
    );
  }
  // console.log(tasks.tasks, "tasks");
  const data = tasks?.tasks?.map((t) => t.toJSON());
  const tasksToExport = data?.map((task) => {
    return {
      title: task?.title,
      description: task?.description,
      effortToComplete: task?.effortToComplete,
      dueDate: task?.dueDate,
    };
  });
  // console.table(tasksToExport);
  // console.log(data);
  const worksheet = xlsx.utils.json_to_sheet(tasksToExport);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, worksheet, `${req?.user?.name}'s Tasks`);
  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  console.log("Buffer size:", buffer.length);
  res.setHeader("Content-Disposition", 'attachment; filename="tasks.xlsx"');
  res.send(buffer);
});

const importTasks = catchAsync(async (req, res) => {
  console.log(req.file, "req.file");
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No file uploaded");
  }
  const wb = xlsx.readFile(req.file.path);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const tasks = xlsx.utils.sheet_to_json(sheet);

  const userId = req.user.id;
  console.log(req.user.id, "tasks");
  const tasksStaus = await Promise.all(
    tasks.map(
      async (task) =>
        await taskService.creteTask(req.user, {
          title: task?.title,
          description: task?.description,
          effortToComplete: task?.effortToComplete,
          dueDate: task?.dueDate,
          UserId: task?.userId || userId,
        })
    )
  );
  console.log(tasksStaus, "tasksStaus");

  res.status(201).json({ message: "Tasks imported" });
});

const upload = multer({ dest: "uploads/" }).single("file");
module.exports = {
  getTaskById,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  exportTasks,importTasks,upload,
};

exports.upload = multer({ dest: "uploads/" }).single("file");
