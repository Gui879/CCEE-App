(function(window,angular,undefined){
    angular.module('app')
    .controller('mainCtrl',['$scope','$state','$http','userSvc','dataSvc',function($scope,$state,$http,userSvc,dataSvc){
        $scope.booleanshow=false;
        $scope.isShown=false;
        $scope.name=undefined;
        $scope.conferenceList = [];
        $scope.selectedConference;
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
        if($scope.selectedConference){
           
            var params = {
                'id': $scope.selectedConference.id,
                'name':$scope.selectedConference.title_it
            }
        }else{
            $state.go("main.notChoosen");
        }
        
        
        $scope.go = function(string){
            
            $state.go(string,params);
        }
        
        $scope.selectConference = function(conference){
            
            $scope.selectedConference = conference;
             
            params ={
                'id':$scope.selectedConference.id,
                'name':$scope.selectedConference.title_it
            }
            console.log(params);
            dataSvc.set(conference);
            $state.go("main.conference",params);
            $scope.booleanshow=false;
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