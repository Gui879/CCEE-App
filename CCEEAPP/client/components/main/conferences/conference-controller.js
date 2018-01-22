(function(window,angular,undefined){
    angular.module('app')
    .controller('conferenceCtrl',['$scope','$state','$http','userSvc','$stateParams','Excel','$timeout',function($scope,$state,$http,userSvc,$stateParams,Excel,$timeout){
        
        var config = {
            headers: {
                'auth-token': userSvc.token
            }
        }
        
        var id = $stateParams.id;
        $scope.name = $stateParams.name;
        console.log($stateParams);
        
        var requestData ={
            'id' : id
        };
         $http.post('/secure/api/user/conference_participants',requestData,config).then(function(response){
            $scope.atendeeList = response.data.data
        }, function(err){
            console.log(err);
        });
        
        $scope.exportHref=Excel.tableToExcel("#tableToExport",'WireWorkbenchDataExport');
        
        $scope.selectedAtendee={};
        
        $scope.editAtendee = function(atendee){
            $scope.selectedAtendee= atendee;
        }
        $scope.getTemplate = function(atendee){
            if ($scope.selectedAtendee.id === atendee.id){
                return 'edit';
            }else{
                return 'display';
            }
        };
        var changesList =[];
        $scope.saveAtendee = function(idx){
            $scope.atendeeList[idx] = $scope.selectedAtendee;
            changesList.push($scope.selectedAtendee);
            $scope.reset();
        }
        $scope.reset = function(idx){
            $scope.selectedAtendee={};
        }
        
        $scope.submit = function(){
            console.log(changesList);
            if(changesList.length>0){
                for(i = 0; i < changesList.length;i++){
                    var data = changesList[i];
                   console.log(data); $http.post('/secure/api/user/edit_conference',data,config).then(function(response){
                        console.log("Worked!");
                    } , function(err){
                        console.error(err);
                    });    
                }
            }
            changesList = [];
        };  
        
         $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;},100); // trigger download
        }
        
    }]);  
})(window,window.angular);