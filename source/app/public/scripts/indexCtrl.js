app.controller('indexCtrl', function($http, $scope, $rootScope){
  $scope.callHttp = function(str){
    $http.get(str)
    .success(function(data, status, headers, config) {
      $("#response").text(JSON.stringify(data));
    })
    .error(function(data, status, headers, config) {
      $("#response").text("ERR " + data);
    });
  }
  
  $scope.postHttp = function(str, formId){
    var json = $.param({
      getNumber: $("#" + formId + " > #getNum").val(),
      getAll: document.getElementById("all").checked,
      getLonger: document.getElementById("longer").checked
    });
    $http.post(str, json)
    .success(function(data) {
      $("#response").text(data);
    })
    .error(function(data, status, headers, config) {
      $("#response").text("ERR " + data);
    });
  }
});