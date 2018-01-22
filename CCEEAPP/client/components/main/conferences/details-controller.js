angular.module('app')
.controller('detailsCtrl',['$scope','$http','userSvc','dataSvc',function($scope,$http,userSvc,dataSvc){
    
    
    var config = {
            headers: {
                'auth-token': userSvc.token
            }
        };
    
    var localconference=dataSvc.getConference();
    
    var formatDate = function(){
         var date = new Date($scope.conference.start_date);
            $scope.startdate.year = date.getFullYear();
            $scope.startdate.month = date.getMonth()+1;
            $scope.startdate.day = date.getDay();
        var date = new Date($scope.conference.end_date);
            $scope.enddate.year = date.getFullYear();
            $scope.enddate.month = date.getMonth()+1;
            $scope.enddate.day = date.getDay();
    }
    
    $scope.conference;
    $scope.readonly = true;
    $scope.startdate={
        "year": 0,
        "month":0,
        "day":0
    }
    
    $scope.enddate={
        "year": 0,
        "month":0,
        "day":0
    }
    
    
    $scope.edit = function(){
        $scope.readonly = false;
    }
    
    $scope.save = function(){
        //Save to Database
    }
    
    $scope.cancel = function(){
        //Cancel changes
        $scope.conference=localconference;
        formatDate();
        $scope.readonly=true;
    }
    
    $scope.conferenceDetails = function(){
        var requestData ={
            "id":dataSvc.getConference().id
        }
        $http.post('/secure/api/user/conference_details',requestData,config).then(function(response){
            $scope.conference=response.data.data[0];
            //format start-date
            formatDate();
            //save conference for cancel
            localconference = $scope.conference;
            console.log($scope.conference);
        },function(err){
            
        });
    };
    
    if(localconference){
        $scope.conferenceDetails();
    }
    
    
   
}])