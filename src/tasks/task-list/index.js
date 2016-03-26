import TaskServiceModule from '../task-service/index.js';
import taskListComponent from './task-list-component.js';
import taskListItemComponent from './task-list-item-component.js';
import taskListItemAddComponent from './task-list-item-add-component.js';

export default angular.module('app.task-list', [TaskServiceModule.name])
  .component("taskList", taskListComponent)
  .component("taskListItem", taskListItemComponent)
  .component("taskListItemAdd", taskListItemAddComponent);
