var myApp = angular.module('app', ['ngRoute']);


myApp.config(function ($routeProvider) {
    
    $routeProvider.when(
        '/Article', {
            templateUrl: 'view/Article.ejs',
            controller: 'ArticleController'
        }).when('/Home', {
        templateUrl: 'view/Home.ejs',
        controller: 'HomeController'
    }).when('/Details', {
        templateUrl: 'view/Details.ejs',
        controller: 'DetailsController'
    }).when('/Order', {
        templateUrl : 'view/Order.ejs',
        controller : 'OrderController'
    }).when('/Index', {
        templateUrl : 'view/Index.ejs',
        controller : 'IndexController'
    }).when('/User', {
        templateUrl : 'view/User.ejs',
        controller : 'UserController'
    }).when('/SignIn', {
        templateUrl : 'view/SignIn.ejs',
        controller : 'SignInController'
    }).when('/', {
        templateUrl : 'view/Poc.html',
        controller : 'PocController'
    }).when('/Search',
		{
        templateUrl : 'view/Search.ejs',
        controller : 'SearchController'
    }
    ).when('/POC',
		{
        templateUrl : 'view/Poc.ejs',
        controller : 'PocController'
    }
    );
            
});

myApp.service('PoCDataSerice', function ($q, $http) {
    
    var defer = $q.defer();
    
    this.GetPOCData = function () {
        
        return $http.get('/poc/GetData').success(function (res) {
            debugger;
            if (res != null) {
                defer.resolve(res);
                return defer.promise;
            }
                    
        }).error(function (error) {
            debugger;
            return defer.reject(error);
                    
        });
    }
            
});

myApp.controller('PocController', function ($scope, PoCDataSerice) {
    debugger;
    PoCDataSerice.GetPOCData().then(function (data) {
        debugger;
        var objCount = [];
        var objException = [];
        angular.forEach(data.data, function (value, key) {
            objCount.push(value.count);
            objException.push(value.value);
        });
        
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: objException,
                datasets: [{
                        label: '# of Votes',
                        data: objCount,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        debugger;
                
    }, function (error) {    
        debugger;
    });
            
});
