(function(){
    
  angular.module('app', [])
  .controller('Ctrl', function($scope, $timeout, $http) {                    
      
      var API_ACCESS_KEY = 'AIzaSyDlWNjH4XsEHVkWceFtavf8e7Qq9fKgQwU';
      var ajaxUrl = 'https://fcm.googleapis.com/fcm/send';
      
      var token = '';
      ajaxUrl = 'https://onesignal.com/api/v1/notifications';
      var APP_ID = '1:941729484801:web:aabacc4af4907bc1203000'; 
      
      
      /*
        Here we add the tokens ids the cellphone
        SEE:
        https://firebase.google.com/docs/cloud-messaging/server
        https://firebase.google.com/docs/cloud-messaging/concept-options#senderid
      */
      var listIds = ['fXpRufJNqAE:APA91bG_kGbNu0HgQj6tePSGdwEGNbicoLPz_LqZ3UxFD-ATSfKMxICw0wXiU2pOK43agjanL7hb64PvM0QEPgHixwgaaT2RMOfdgb2xpS_QGWxz6K6Jn2q72KrbTUyzfQUPeVRYjvDg'];
      
      $scope.console = {};
      $scope.error = null;
      
      $scope.title = "this is title";
      $scope.message = "the description form to do a test.";
      
      
      $scope.send = function(){
                    
                    var btn = jQuery('#btnSend');
                    
                    var params = {
                      registration_ids: listIds,// or "to" param
                        data: {
                          body: $scope.message,
                          title: $scope.title
                        },
                        body: $scope.message,
                        title: $scope.title
                    };
                    
                    params = {
                app_id: APP_ID,
              included_segments: ["All"],
              data: {
                          body: $scope.message,
                          title: $scope.title
                    },
              contents: {"en": "Are you ok? Open the app"},
              headings: {"en": "Hello Carlos"}
            };
                    
                    btn.attr('disabled', true).text('Loading...');
            
                    
            jQuery.ajax({
              url: ajaxUrl,
              method: 'post',
              contentType: 'application/json',
              processData: false,
              dataType: 'json',
              headers: {
               // Authorization: 'key='+API_ACCESS_KEY
                Authorization: 'Basic '+token
              },
              data: JSON.stringify(params)
            }).done(function(result){
              btn.attr('disabled', false).text('Send');
              $timeout(function(){
                $scope.console = result;
              });
            }).fail(function(error){
              btn.attr('disabled', false).text('Send');
              $timeout(function(){
                $scope.error = error.responseText;
              });
            });
            
      };
      
  });
   
   
  })();
  