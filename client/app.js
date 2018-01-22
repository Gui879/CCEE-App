(function(window,angular,undefined){
    angular.module('app',['ui.router','ngAnimate'])
    .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider){
        $stateProvider
        
        .state('home',{
            url:'/',
            templateUrl:'/client/components/home/home.html',
            controller:'homeCtrl'
        })
        .state('main',{
            abstract:true,
            url:'/main',
            templateUrl:'/client/components/main/main.html',
            controller: 'mainCtrl'
        })
        
        .state('main.conferences',{
            url:'/conferences',
            templateUrl: '/client/components/main/conferences/conferences.html',
            controller:'conferencesCtrl'
        })
        .state('main.notChoosen',{
            url:'/choose',
            templateUrl: '/client/components/main/conferences/notChoosen.html'
        })
        
        .state('main.conference',{
            url:'/:id',
            templateUrl:'/client/components/main/conferences/details.html',
            controller:'detailsCtrl',
        })
        
        .state('main.participants',{
            url:'/:id',
            templateUrl:'/client/components/main/conferences/conference.html',
            controller:'conferenceCtrl',
            params: {
                'id': null,
                'name':null
            },
        })
        
        .state('main.form',{
            url:'/:id',
            templateUrl:'/client/components/main/conferences/paticipationForm/participationForm.html',
            controller:'participationFormCtrl',
            params: {
                'id': null,
                'name':null
            },
        })
        
        .state('main.meetingcreation',{
            url:'/createmeeting',
            templateUrl:'/client/components/main/createmeeting.html',
            controller:'createMeetingCtrl'
        })
        
        .state('main.toBeInvited',{
            url:'/toBeInvited',
            templateUrl:'/client/components/main/conferences/toBeInvited/toBeInvited.html',
            controller:'toBeInvitedCtrl'
        })
        
        $urlRouterProvider.otherwise('/');
    }])
})(window,window.angular)