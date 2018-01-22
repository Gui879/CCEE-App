(function(window,angular,undefined){
    angular.module('app')
    .controller('conferencesCtrl',['$scope','$state','$http','userSvc',function($scope,$state,$http,userSvc){
        
        $scope.name=undefined;
        $scope.conferenceList = [];
        
         var config = {
            headers: {
                'auth-token': userSvc.token
            }
        }
        getConferences = function(){
            var temp=[];
            $http.get('secure/api/user/get_conferences',config).then(function(response){
               $scope.conferenceList = response.data.data;
            } , function(err){
                    console.log(err);
            });
            
        }
        
        
        
        $scope.clearName = function(){
            $scope.nameFilter = "";
        }
        $scope.createConference = function(name){
            str = name.replace(/ /g,"_");
            var requestData = {
                'name' : str,
            };
            $http.post('secure/api/user/add_conference',requestData,config).then(function(response){
                $scope.statusMsg = 'Conference Created';
                getConferences();
            }, function(err){
                $scope.statusMsg = 'Error';
            });
        }
        
        $scope.deleteConference = function(id){
            var requestData = {
                'conference_id':id
            };
            $http.post('secure/api/user/delete_conference',requestData,config).then(function(response){
                getConferences();
            },function(err){
                console.log("err");
            });    
        }
        getConferences();
        
    }]);
})(window,window.angular)