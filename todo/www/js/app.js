// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.factory('Tasks', function($http) {
  var base = "http://localhost:3000";
  return {
    all: function() {
      return $http.get(base + "/task");
    },
    save: function(task) {
      return $http.post(base + "/task", {title: task.title});
    }
  }
})
.controller('TodoCtrl', function($scope, $ionicModal, Tasks) {
  Tasks.all()
    .success(function(tasks){
      $scope.tasks = tasks;
      console.log($scope.tasks);
    })
    .error(function(){
      $scope.tasks = [];
    })

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    Tasks.save(task)
      .success(function(task){
        console.log(task);
      })
      .error(function(){
        console.log("request error");
      });
  };

})