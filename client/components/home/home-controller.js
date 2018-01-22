(function(window, angular,undefined){
    angular.module('app')
    .controller('homeCtrl',['$scope','$http','$state','userSvc',function($scope,$http,$state,userSvc){
        $scope.resultMessage = undefined;
        $scope.createUser=function(user){
            $http.post('/api/user/create', user).then(function(response){
                $scope.resultMessage = response.data;
            },function(err){
                console.error(err);
            })
        }
            
            
            
            
        $scope.loginUser=function(user){
            $http.post('api/user/login',user).then(function(response){
                if(response.data.userData)
                userSvc.token = response.data.token;
                userSvc.user = response.data.userData; localStorage.setItem('token',JSON.stringify(userSvc.token));
                localStorage.setItem('user',JSON.stringify(userSvc.user));
                $state.go('main.notChoosen');
               
            },function(err){
                console.error(err);
            })
        }
    }])
})(window,window.angular)