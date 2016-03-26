import angular from 'angular';
import taskListModule from './task-list/index.js';


export default angular.module('app.tasks', [taskListModule.name]);
