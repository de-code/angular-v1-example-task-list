import TaskService from './task-service.js';
import ExampleData from './example-data.js';

export default angular.module('app.task.service', [])
  .service("taskService", TaskService)
  .value("tasksExampleData", ExampleData);
