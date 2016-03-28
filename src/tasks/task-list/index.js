import ngFocusIf from 'ng-focus-if';

import TaskServiceModule from '../task-service/index.js';
import taskListItemInputComponent from './task-list-item-input-component.js';
import taskListComponent from './task-list-component.js';
import taskListItemComponent from './task-list-item-component.js';
import taskListItemAddComponent from './task-list-item-add-component.js';

export default angular.module('app.task-list', [TaskServiceModule.name, ngFocusIf])
  .component("taskListItemInput", taskListItemInputComponent)
  .component("taskList", taskListComponent)
  .component("taskListItem", taskListItemComponent)
  .component("taskListItemAdd", taskListItemAddComponent);
