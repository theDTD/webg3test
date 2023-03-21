var myApp = angular.module('myApp', []);

myApp.controller('MarketingPageCtrl', ['$scope', function($scope) {
    $(document).ready(function() {
        $("#siteloader").load($scope.path, function(){
            $(".hideOnLoad").show();
        });
    });
}]);
