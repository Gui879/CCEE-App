angular.module("app")
.factory("dataSvc",function(){
    var svcconference=null;
    
    return {
        set:function(conference){
            svcconference =conference;
            return;
        },
        getConference:function(){
            return svcconference;
        }
    };




})