import tasksModule from './tasks/index.js';
import appComponent from './app-component.js';

var app = angular.module('app', [tasksModule.name])
  .component('tasksApp', appComponent);
