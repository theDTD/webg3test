var myApp = angular.module('myApp', []);

myApp.filter('unescape', function() {
    return function(input) {
        return $("<div/>").html(input).text();
    };
})

myApp.controller('PostsCtrl', ['$scope', '$http', function($scope, $http) {

    var id = $('#id').html();
    var totalReviews = $('#totalReviews').html();
    var url = $('[data-url]').data('url');
    x = 3;

    $http.get(url).
        success(function(data) {

            $scope.posts = data;

        }).
        error(function(data) {
            // log error
        });

    $scope.loadMore = function() {

        x+=3;

        $http.get(url +'?max='+ x).
            success(function(data) {
                $scope.posts = data;
                if(x >= totalReviews){
                    $('.loadMore').hide();
                }
            }).
            error(function(data) {
                // log error
            });
    };

    if(x >= totalReviews){
        $('.loadMore').hide();
    }
}]);

myApp.directive("readMoreDirective", function() {
    var readMoreDirective = {
        restrict: "A",
        link: function() {
            $('.review').each(function() {
                var maxHeight = 110;
                var height = $(this).height();

                if(height >= maxHeight) {
                    $(this).children().children('.toLess').show();
                }

                $('.dropdown-toggle').click(function(){
                    $('.review').each(function() {
                        var height = $(this).height();

                        if(height >= maxHeight) {
                            $(this).children().children('.toLess').show();
                        }
                    });
                });
            });
        }
    };

    return readMoreDirective;
});
