angular.module('app')
.controller('toBeInvitedCtrl',['$scope','userSvc',function($scope,userSvc){
    
    var config = {
        headers: {
            'auth-token': userSvc.token
        }
    }
    

}])