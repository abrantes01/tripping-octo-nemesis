$(document).ready(function() {

  // Email sharing
  $('.dream-content .email').click(function() {
    var id = $(this).attr('data-dreamid');
    popupShare('share_sale_'+id);
  });

  if($('#c_live').length > 0 || $('span.member-badges').length > 0) {
    var basecount = 0;
    var basetitle = $('title').html();
    $.ajax({
      url: '/dream/get_activity',
      dataType: 'json',
      success:function(jsonData) {
          basecount = jsonData.vpLive;
          if($('span.member-badges').length > 0 && jsonData.badges>0){
            $('span.member-badges').parent().removeClass('cacher');
            $('span.member-badges').html(jsonData.badges);
            // set for the myfavorites
            $("#notif_count").html(jsonData.badges).parent().removeClass('cacher');
          }
          if($('#c_live').length > 0 && $('#c_live').html() && basecount > 0) {
            setInterval("dreamCount('"+basecount+"','"+basetitle+"')" , 60000);
          }
      }
    });

  }

  //Popup Dream
  $(document).on('click', 'p.dream-number', function() {
    if ($(this).attr('data-nbdream') > 0) {
      $this = $("#popupDream_content");
      SimpleModal($this);
      sale_id = $(this).parent().parent().attr('data-id');
      $this.load("/dream/sale_members/"+sale_id , function() {
        $this.css("display","none");
        //Calcul de la dimension du contenu qui a été chargé
        var popupWidth = $this.width();
        var popupHeight = $this.height();
        //Redimensionnement et positionnement de la popup
        $this.parent().parent().css("width",popupWidth);
        $this.parent().parent().css("height",popupHeight);
        $this.parent().parent().css("margin-top",-popupHeight/2);
        $this.parent().parent().css("margin-left",-popupWidth/2);
        $this.fadeIn("slow");
        $("a.modalCloseImg").show();
      });
    }
  });

  //Popup add dream
  $(document).on('click', 'a.dream_add', function() {
    // FACEBOOK sharing + dream popup dislaying
    if($('#dream_sharefb:checked').val()=="on"){
        // Facebook is enabled
        FB.getLoginStatus(function(response) {
            if (response.status !== 'connected') {
                // User is not logged in or APP not accepted yet
                FB.login(function(response) {
                    // Facebook loggin + APP acceptation dialogs
                    if (response.authResponse || VPG.settings.dream_allow_without_facebook=='true') {
                      doClickOnDreamAdd();
                    }
                }, {scope: 'email,publish_actions'});
            }else{
              doClickOnDreamAdd();
            }
        });
    }else{
      doClickOnDreamAdd();
    }
  });

  function doClickOnDreamAdd(){
    $dreamAdd = $('a.dream_add');
    $dreamAddLoad = $('span#dream_add_load');
    if($('form#dream_form textarea').val() == '' || $('form#dream_form textarea').val() == newdream_title ) {
      $('form#dream_form textarea').val('');
    }
    if($('#theme_iframe').length == 0 && $('form#dream_form textarea').val().length > 400) {
      return false;
    }
    if($('#dream_picture_id').val() == '') {
      $('#dream_picture_id').val($('#theme_iframe').contents().find('#uploaded_picture_id').html());
    }
    var memberID = $dreamAdd.prev().find("input[name=dream_member]").val();
    var albumID = $dreamAdd.prev().find("input[name=dream_board]").attr("value");
    var form = $dreamAdd.parent().find('form');
    var id = $dreamAdd.parent().find("input[name=dream_sale]").attr("value");
    $.ajax({
      type: 'POST',
      url: '/dream/ajax_update_dream',
      data: $dreamAdd.parent().find('form').serialize(),
      beforeSend: function(data) {
        $dreamAdd.hide();
        $dreamAddLoad.show();
        $('span#dream_add_load').css('display', 'inline-block');
      },
      success:function(data) {
          if(data != -1) {
            if($('.feed').length == 1) {
              $('div.dream-content[data-id="'+id+'"] a.btn-adddream').addClass("dreamBtndisabled").attr('title',btnAddDreamTitleAlreadyDreamt);
            }
            else {
              $("a.btn-adddream").addClass("dreamBtndisabled").attr('title',btnAddDreamTitleAlreadyDreamt);
            }
            if(form.find('#dream_sharefb').is(':checked')){
              addEAEvent('FavPopUp-Facebook-checkbox-checked');
              if ( typeof _gaq !== "undefined"  ) {
                _gaq.push(['_trackEvent','FavoritesPopUp','FacebookChecked', id]);
              }
            }
            else {
              if ( typeof _gaq !== "undefined"  ) {
                _gaq.push(['_trackEvent','FavoritesPopUp','FacebookUnchecked', id]);
              }
            }
            if(form.find('#dream_reminder').is(':checked')){
              addEAEvent('FavPopUp-Reminder-checkbox-checked');
              if ( typeof _gaq !== "undefined"  ) {
                _gaq.push(['_trackEvent','FavoritesPopUp','ReminderChecked', id]);
              }
            }
            else {
              if ( typeof _gaq !== "undefined"  ) {
                 _gaq.push(['_trackEvent','FavoritesPopUp','ReminderUnchecked', id]);
              }
            }
            $.modal.close();
            callFb(data);
          }
      }
    });
    return false;
  }

  //Hover Popup see dream
  $(document).on('mouseover mouseout', "#popupDream_content a.dreamer", function(event) {
    if (event.type == 'mouseover') {
      $(this).find('span.dreamer-tabs').show();
    } else {
      $(this).find('span.dreamer-tabs').hide();
    }
  });

  //Action clic on albums list in popup add dream
  $(document).on('click','ul.create-board.first', function() {
    $(this).removeClass("first").addClass("second");
    $(this).find('span.arrow').addClass("up");
    $(this).css("height","auto").children().slideDown().css('box-shadow','2px');
  });
  $(document).on('click','ul.create-board.first span.arrow', function() {
    $('ul.create-board.first').click();
  });
  $(document).on('click','ul.create-board.second span.arrow', function() {
    $('ul.create-board li.selected').click();
  });
  $(document).on('mouseover mouseout','ul.create-board li', function(event) {
    if (event.type == 'mouseover' && $('ul.create-board form.create-board').is(':visible')) {
      $(this).css("background-color","#D8D8D8");
    } else {
      $(this).css("background-color","#fff");
    }
  });
  $(document).on('click','ul.create-board.second li', function() {
    $(this).parent().removeClass("second").addClass("first");
    $(this).parent().find('span.arrow').removeClass("up");
    $(this).parent().find('li.selected').removeClass("selected");
    $(this).addClass("selected");
    $(this).parent().find('form input.create-board').removeClass('selected').val(VPG.settings.dream_addboard_text);
    $(this).parent().find('li, form, a').css("display","none");
    $(this).parent().find('li.selected').show();
    $('form#dream_form input[name=dream_board]').attr('value', $this.parent().find('li.selected').attr('data-value'));
  });
  //Action btn Add Board in popup add dream
  $(document).on('click','.board_create', function() {
    $this = $(this);
      $.ajax({
          type: 'POST',
          url: '/dream/ajax_update_board',
          data: $(this).parent().find('form').serialize(),
          success:function(data) {
              if(data == -1) {

              } else {
                  addEAEvent('FavPopUp-Create-list');
                  boardPopupAdded($this, data, $this.parent().find('input[name=board_title]').val());
              }
          }
      });
      return false;
  });

  $(document).mouseup(function (e)
  {
    var container = $('ul.create-board');

    if ($('ul.create-board.second').length > 0 && container.has(e.target).length === 0)
    {
      $('ul.create-board.second li:first').click();
    }
  });

  //counter textarea
  var nombreMaxChar = VPG.settings.max_length;
  $('p.textarea_compteur').text(nombreMaxChar + " " + VPG.settings.textarea_max_char);

});


// FACEBOOK
function showDreamPopup(sale_id, picture_id, picture_path){
  if(picture_id || (sale_id == 0 && picture_id== 0)){
      addDreamFromDream(sale_id, picture_id);
  }else{
      addDreamFromSale(sale_id, picture_path);
  }
}

function initFbFromDream(sale_id, picture_id){
    showDreamPopup(sale_id, picture_id, false);
}

function initFbFromSale(sale_id, picture_path){
    showDreamPopup(sale_id, false, picture_path);
}

function callFb(dream_id){
    if(VPG.settings.nl_dreamfbpush=='true'){
      FB.getLoginStatus(function(response) {
        if (response.status !== 'connected') {
          FB.login(function(response) {
              if (response.authResponse) {
                  FB.api('/me/voyageprive_live:dream?trip='+VPG.settings.basePath+'dream/shareWithfacebook/'+dream_id, 'post', function(response) {
                      if (!response || response.error) {
                          //alert('An error occured when posting to Facebook timeline');
                          console.log(response.error);
                      }
                  });
              }
          }, {scope: 'email,publish_actions'});
        } else {
          FB.api('/me/voyageprive_live:dream?trip='+VPG.settings.basePath+'dream/shareWithfacebook/'+dream_id, 'post', function(response) {
              if (!response || response.error) {
                  //alert('An error occured when posting to Facebook timeline');
                  console.log(response.error);
              }
          });
        }
       });
    }
}

// Facebook API initialization
window.fbAsyncInit = function() {
    FB.init({
        appId      : VPG.settings.facebook_app_id, // App ID
        channelUrl : '96e35967694d430840f9cd1fb11de1cb', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
};
$(window).load(function(){
     var js, id = 'facebook-jssdk'; if (document.getElementById(id)) {return;}
     js = document.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/"+VPG.settings.iso+"/all.js";
     document.getElementsByTagName('head')[0].appendChild(js);
});

function addDreamFromSale(sale_id, picture_path){
    $this = $("#popupAddDream_content")
    SimpleModal($this);
    if( navigator.userAgent.match(/iPad/i) )
    {
      $("#simplemodal-overlay").css('opacity','0');
      $("#simplemodal-container").css('box-shadow','0 0 100px 100px rgba(0, 0, 0, 0.5)');
    }
    $this.load("/dream/add/"+sale_id , function() {
      if ( typeof _gaq !== "undefined"  ) {
        _gaq.push(['_trackEvent','FavoritesPopUp','Appear', sale_id]);
      }
      addDreamSale($(this), picture_path);
    });
}

function addDreamFromDream(sale_id, picture_id){

  $this = $("#popupAddDream_content");
  SimpleModal($this);
  if( navigator.userAgent.match(/iPad/i) )
  {
    $("#simplemodal-overlay").css('opacity','0');
    $("#simplemodal-container").css('box-shadow','0 0 100px 100px rgba(0, 0, 0, 0.5)');
  }
  $this.load("/dream/add/"+sale_id+"/"+picture_id , function() {
      if ( typeof _gaq !== "undefined"  ) {
        _gaq.push(['_trackEvent','FavoritesPopUp','Appear', sale_id]);
      }
      addDream($(this));
  });

}

function addDreamSale($this, picture_path) {
  $("#popupAddDream_content").css("display","none");
  $('#popupAddDream_content .dream-carousel .dream-carousel-img img').last().load(function() {
    //Calcul de la dimension du contenu qui a été chargé
    var popupWidth = $("#popupAddDream_content").width();
    if(popupWidth < 400) {popupWidth = 400;}
    var popupHeight = $("#popupAddDream_content").height();
    if(popupHeight > 580) {popupHeight = 580;}
    //Redimensionnement et positionnement de la popup
    $("#popupAddDream_content").parent().parent().css("width",popupWidth);
    $("#popupAddDream_content").parent().parent().css("height",popupHeight);
    $("#popupAddDream_content").parent().parent().css("margin-top",-popupHeight/2);
    $("#popupAddDream_content").parent().parent().css("margin-left",-popupWidth/2);
    $("#popupAddDream_content").fadeIn("slow");

  $('form#dream_form input[name=dream_board]').attr('value', $('ul.create-board li.first').attr('data-value'));
  $("#popupAddDream_content textarea.board-comment").focus( function() {
    $(this).addClass('selected');
    if ($(this).val() == VPG.settings.dream_adddream_text) {
      $(this).val('');
    }
  });
  $("#popupAddDream_content input.create-board").focus( function() {
    $(this).addClass('selected');
    if ($(this).val() == VPG.settings.dream_addboard_text) {
      $(this).val('');
    }
  });

  if ($('#popupAddDream_content .dream-carousel').length != 0 ) {
    $('#popupAddDream_content .dream-carousel .dream-carousel-img img').each(function(i){
      if ( getFilename(this.src) == getFilename(picture_path) ) {
        $(this).addClass("selected");
      }
    });

  }
  carousel();
  });

}

/**
 * Get the filename of from a url
 * It's use to determine the filename of a image
 *  to check for differences
 * @param  string url Full url
 * @return string
 */
function getFilename(url)
{
  return url.substring(url.lastIndexOf('/')+1);
}

function carousel(){
  //carousel Dream
  var step = 1;                           //How many img you want to scroll on click of left and right button.
  var current = 0;                        //Index or Number of left most visible img in carousel.
  var maximum = $('#popupAddDream_content .dream-carousel .dream-carousel-img img').size();    //Total number of img in carousel.
  var visible = 1;                        //Number of visible img’s.
  var speed = 200;                        //Animation speed.
  var imgSize = 580;                      //Width of one img in pixels.
  var carousel_height = 330;              //Carousel DIV height.
  var carouselSize = imgSize * maximum;   //Width of carousel content.
  var divSize = imgSize * visible;        //Width of Carousel DIV.

  $('#popupAddDream_content .dream-carousel .dream-carousel-img').css("width", carouselSize+"px").css("left", -(current * imgSize)).css("position", "absolute");
  $('#popupAddDream_content .dream-carousel').css("width", divSize+"px").css("height", carousel_height+"px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative");

  var positionImgSelected = $('#popupAddDream_content .dream-carousel .dream-carousel-img img.selected').position().left;
  $('#popupAddDream_content .dream-carousel .dream-carousel-img').css("left", -(positionImgSelected)).css("top", "-16px");
  current = Math.round(positionImgSelected / imgSize);
  var pictureSelectedID = $('#popupAddDream_content .dream-carousel .dream-carousel-img img.selected').attr("id");
  $('#dream_form input[name=dream_picture]').attr("value",pictureSelectedID);
  $('#popupAddDream_content .dream-carousel-right').click(function() {
    if(current + step < 0 || current + step > maximum - visible) {
      $('#popupAddDream_content .dream-carousel .dream-carousel-img').animate({left:0}, speed, null);
      current=0;
    }
    else {
      current = current + step;
      $('#popupAddDream_content .dream-carousel .dream-carousel-img').animate({left: -(imgSize * current)}, speed, null);
    }
    var picture = $('#popupAddDream_content .dream-carousel .dream-carousel-img img.selected');
    $('#popupAddDream_content .dream-carousel .dream-carousel-img img.selected').removeClass('selected').next().addClass('selected');
    $('#dream_form input[name=dream_picture]').attr('value', picture.next().attr('id'));
    return false;
  });

  $('#popupAddDream_content .dream-carousel-left').click(function() {
    if(current - step < 0 || current - step > maximum - visible) {
      $('#popupAddDream_content .dream-carousel .dream-carousel-img').animate({left:-(carouselSize-imgSize)}, speed, null);
      current=maximum - step;
    }
    else {
      current = current - step;
      $('#popupAddDream_content .dream-carousel .dream-carousel-img').animate({left: -(imgSize * current)}, speed, null);
    }
    var picture = $('#popupAddDream_content .dream-carousel .dream-carousel-img img.selected');
    $(picture).removeClass('selected').prev().addClass('selected');
    $('#dream_form input[name=dream_picture]').attr('value', picture.prev().attr('id'));
    return false;
  });
}
function addDream($this) {
  $("#popupAddDream_content").css("display","none");
  if($("#theme_iframe").length > 0) {
    $("#popupAddDream_content").parent().parent().css("width",578);
    $("#popupAddDream_content").parent().parent().css("height",578);
    $("#popupAddDream_content").parent().parent().css("margin-top",-578/2);
    $("#popupAddDream_content").parent().parent().css("margin-left",-578/2);
    $("#popupAddDream_content").fadeIn("slow");
  } else {
    $('#popupAddDream_content img').load(function() {
      //Calcul de la dimension du contenu qui a été chargé
      var popupWidth = $("#popupAddDream_content").width();
      if(popupWidth < 400) {popupWidth = 400;}
      var popupHeight = $("#popupAddDream_content").height();
      if(popupHeight > 580) {popupHeight = 580;}
      //Redimensionnement et positionnement de la popup
      $("#popupAddDream_content").parent().parent().css("width",popupWidth);
      $("#popupAddDream_content").parent().parent().css("height",popupHeight);
      $("#popupAddDream_content").parent().parent().css("margin-top",-popupHeight/2);
      $("#popupAddDream_content").parent().parent().css("margin-left",-popupWidth/2);
      $("#popupAddDream_content").fadeIn("slow");
    });
  }
  $('form#dream_form input[name=dream_board]').attr('value', $('ul.create-board li.first').attr('data-value'));
  $("#popupAddDream_content textarea.board-comment").focus( function() {
    $(this).addClass('selected');
  if ($(this).val() == VPG.settings.dream_adddream_text) {
    $(this).val('');
  }
  });
  $("#popupAddDream_content input.create-board").focus( function() {
    $(this).addClass('selected');
    if ($(this).val() == VPG.settings.dream_addboard_text) {
      $(this).val('');
    }
  });
}
function SimpleModal($this) {
  $this.modal({overlayClose:true, onClose: function (dialog) {
    dialog.data.fadeOut('slow', function () {
        dialog.overlay.fadeOut(500, function () {
          $.modal.close();
          $("#popupAddDream_content input.create-board").removeClass('selected').val(VPG.settings.dream_addboard_text);
          $("#popupAddDream_content textarea.board-comment").removeClass('selected').val(VPG.settings.dream_adddream_text);
          $this.html('<img src="/images/dream/loader.gif" alt="loader"/>');
        });
    });
    $("a.modalCloseImg").hide();
  }});
  $("a.modalCloseImg").hide();
}
function boardPopupAdded($this, board_id, data) {
  $this.parent().removeClass("second").addClass("first");
  $this.parent().find('span.arrow').removeClass("up");
  $this.parent().find('li.selected').removeClass("selected");
  $this.parent().find('li.first').removeClass("first");
  $('<li class="selected first" data-value="'+board_id+'">'+data+'</li>').insertAfter('div.create-board-content span.arrow');
  $this.parent().find('form input.create-board').removeClass('selected').val(VPG.settings.dream_addboard_text);
  $this.parent().find('li, form, a').css("display","none");
  $this.parent().find('li.selected').show();
  $('form#dream_form input[name=dream_board]').attr('value', $this.parent().find('li.selected').attr('data-value'));
}

//function execute onkeyup textarea
function limited_nb_char(field) {
  nombreMaxChar = VPG.settings.max_length;
  if (field.value.length > nombreMaxChar)
  {
    field.value = field.value.substring(0, nombreMaxChar);
  }
  var nbrCharacter = nombreMaxChar - ($(field).val().length);
  var msg = nbrCharacter + " " + VPG.settings.textarea_char_left;
  $(field).prevAll('p.textarea_compteur').text(msg);
}

function dreamCount(basecount,basetitle) {
  $.ajax({
    url: '/dream/get_activity',
    dataType: 'json',
    success:function(jsonData) {
        var data = jsonData.vpLive;
        if(jsonData.badges>0){
          $('span.member-badges').parent().removeClass('cacher');
          $('span.member-badges').html(jsonData.badges);
        }
        var currentcount = $('#c_live #dream_count').html();
        if(jsonData.badges > currentcount && currentcount < 99) {
          if(jsonData.badges > 99) {
            $('#c_live #dream_count').html('99');
            // set for the myfavorites
            $("#notif_count").html('99');
            $('title').html('(99) '+basetitle);
          } else {
            $('#c_live #dream_count').html(jsonData.badges);
            // set for the myfavorites
            $("#notif_count").html(jsonData.badges);
            $('title').html('('+(jsonData.badges)+') '+basetitle);
          }

          // display the values
          $("#notif_count").parent().show();
          $('#c_live .count').show();
        }
    }
  });
}
