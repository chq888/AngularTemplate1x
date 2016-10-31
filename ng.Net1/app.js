(function () {
  'use strict';

  angular
    .module('app', ['ngRoute'])
    .factory('DiaryService', DiaryService)
    .controller('Diary.BaseAddEditController', DiaryBaseAddEditController)
    .controller('Diary.AddController', DiaryAddController)
    .controller('Diary.EditController', DiaryEditController);

  // DiaryService
  DiaryService.$inject = [];
  function DiaryService() {
    var service = {
      GetDiaryEntry: GetDiaryEntry
    };

    return service;

    function GetDiaryEntry() {
      // fake implementation to mimic http promise
      return {
        success: function (callback) {
          var data = { name: 'diary entry from DiaryService' };
          callback(data);
        }
      };
    }
  }

  // Diary.BaseAddEditController
  DiaryBaseAddEditController.$inject = ['vm', 'DiaryService'];
  function DiaryBaseAddEditController(vm, DiaryService) {
    vm.diaryEntry = { name: 'default diary entry from Diary.BaseAddEditController' };

    vm.saveDiaryEntry = function () {
      DiaryService.SaveDiaryEntry(vm.diaryEntry);
    };

    // add any other shared functionality here.
  }

  // Diary.AddController
  DiaryAddController.$inject = ['$controller'];
  function DiaryAddController($controller) {
    var vm = this;

    // instantiate base controller
    $controller('Diary.BaseAddEditController', { vm: vm });
  }

  // Diary.EditController
  DiaryEditController.$inject = ['$routeParams', 'DiaryService', '$controller'];
  function DiaryEditController($routeParams, DiaryService, $controller) {
    var vm = this;

    // instantiate base controller
    $controller('Diary.BaseAddEditController', { vm: vm });

    DiaryService.GetDiaryEntry($routeParams.id).success(function (data) {
      vm.diaryEntry = data;
    });
  }
})();