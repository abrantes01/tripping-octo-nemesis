var facebookPopup;
var facebookPopupLink;

$(document).ready(function() {

    if ($('#facebook-popup').length == 0 || $('#backgroundPopup').length == 0) return;

     // create popup instance
    facebookPopup = new Popup({
        node    : $('#facebook-popup'),
        overlay : $('#backgroundPopup')
    });

    // show popup
    $('a.show-facebook-popup').bind('click', function(event) {
        facebookPopup.show(null, 200);
    });

    // hide popup
    $('a.hide-facebook-popup').bind('click', function(event) {
        facebookPopup.hide(false, null, 200);
    });
    facebookPopup.overlay.bind('click', function(event) {
        facebookPopup.hide(false, null, 200);

    });


    facebookPopupLink = new Popup({
        node    : $('#facebook-popup-link'),
        overlay : $('#backgroundPopup')
    });

    // show popup
    $('.show-facebook-popup-link').bind('click', function(event) {
        facebookPopupLink.show(null, 200);
    });

    // hide popup
    $('.hide-facebook-popup-link').bind('click', function(event) {
        facebookPopupLink.hide(false, null, 200);
        //location.reload(true)
    });

    facebookPopupLink.overlay.bind('click', function(event) {
        facebookPopupLink.hide(false, null, 200);
        //location.reload(true)
        //FB.logout(function(response) {});
    });

    $("#facebook-login-assoc").bind('click', function (event){
        if($('#facebook-login-assoc').data('fbconnected')){
          location.href=VPG.settings.basePath+"login/checkFBAccount/1";
        }else{
          facebookPopupLink.show(null, 200);
        }
        return false;
    })
});


function showFacebookLink () {
    facebookPopupLink.show(null, 200);
}

function checkFBAccount(){
  FB.getLoginStatus(function(response){
    if (response.authResponse) {
      location.href=VPG.settings.basePath+"login/checkFBAccount";
    }else{
      FB.login(function(response) {
        if (response.authResponse) {
          location.href=VPG.settings.basePath+"login/checkFBAccount";
        }
      }, {scope:'email,user_birthday,user_location,read_friendlists'});
    }
  });
}

function linkFBAccount(){
  FB.getLoginStatus(function(response){
    if (response.authResponse) {
      _linkFBAccount();
    }else{
      FB.login(function(response) {
        if (response.authResponse) {
          _linkFBAccount();
        }
      }, {scope:'email,user_birthday,user_location,read_friendlists'});
    }
  });
}

function _linkFBAccount(){
  $.getJSON(VPG.settings.basePath+"compte/linkFBAccount",function(data){
    if(data.state=="error"){
      $('#fberror').show();
    }else{
      $('#fberror,#fbnotlinked,#facebook-account div.fblink').hide();
      $('#fblinked').show();
    }
  });
}

function unlinkFBAccount(){
  $.getJSON(VPG.settings.basePath+"compte/unlinkFBAccount",function(data){
    $('#fberror,#fblinked').hide();
    $('#fbnotlinked,#facebook-account .fblink').show();
  });
}