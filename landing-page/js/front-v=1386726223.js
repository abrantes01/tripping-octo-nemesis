/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var fologs={},VPG = VPG || {'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {}};
var toolTipSettings={
  positions:['bottom'],
  spikeLength:8,
  spikeGirth: 21,
  strokeStyle:"#D8CBBE",
  strokeWidth: 0,
  fill:"#fff",
  shadow:true,
  shadowOffsetX:1,
  shadowOffsetY: 1,
  shadowColor:'#ccc',
  shadowBlur:3,
  offsetParent:'body',
  hoverIntentOpts:{
    interval:0,
    timout:0
  },
  cornerRadius: 0,
  cssStyles: {'width': '170px', 'line-height': '15px', 'text-align': 'center', 'font-size': '11px', 'color': '#969696', 'font-family': 'Helvetica,Arial', 'padding':'15px'},
  overlap: -5,
  constantOverlap:[12,18]
};

function getCookie( name ) {
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
    return null;
  }
  if ( start == -1 ) return null;
  var end = document.cookie.indexOf( ';', len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function initLogMessage(m){
    fologs[m]=new Date().getTime();
}

function addLogMessage(m){
    try{
      if(fologs[m]) console.debug(m+" ("+(new Date().getTime()-fologs[m])+")");
      else  console.debug(m);
    }catch(e){ }
    delete fologs[m];
}

// fix for some graphical weird behaviors when using the browser back button
jQuery(window).bind("unload", function() {});

$(function(){

    // Catégories
    $('#categories a').bind('click',function(e,d){
      $('#categories a, #categories span.title').removeClass('selected');
      $('#categories li').removeClass('selected');
      if($(this).parents('#categories-sub-menu').length==1) {
        $(this).parents('#categories-sub-menu').siblings('a').addClass('selected');
        $(this).parents('#categories-sub-menu').siblings('span.title').addClass('selected');
      }
      $(this).addClass('selected');
      $(this).parent().addClass('selected');
      if(!d || !d.noHash){
          resetForm();
          updateHash();
      }
      return false;
    });

    // Handling vertical-menu actions
    $verticalMenu = $('#page-container #cat-vertical-menu');
    if($verticalMenu.length==1) {
      $(".sub-menu span.title").click(function(){
        return false;
      });

      // displays sub-menu when clicking on a parent link which is embeding it
      $('.sub-menu').hover( function(){
        $('#categories-sub-menu').slideDown('fast');
      },function(){
        $('#categories-sub-menu').slideUp('fast');
      });

      // shows the arrow above each menu link
      $('#page-container #cat-vertical-menu span.arrow').each(function(k, v) {
        $(this).css('left', ($(this).parent().width()/2)-($(this).width()/2));
      });
      // hides sub-menu when clicking on another link from the menu
      $verticalMenu.find('#categories li a').click(function(){
        if ($('li.sub-menu-item').is(':visible')){
          $verticalMenu.find('#categories-sub-menu').slideUp('fast');
        }
      });
    }

  //Gestion des erreurs ajax
  $('body').ajaxError(function(e, jqxhr, settings, exception){
    if(jqxhr.status==401) location.href=VPG.settings.basePath;
  });

  //Menu header
  var f=function(o){
    if($(o).is(':visible')){
      $('#menu-arrow').parent().addClass('open');
      $(o).addClass('menu-user-visible');
      addEAButton('Link-Logo-Header');
    } else {
      $('#menu-arrow').parent().removeClass('open');
      $(o).removeClass('menu-user-visible');
    }
  }
  $('#menu-arrow').click(function() {
      $('#menu-user').toggle(400,function(){f(this);});
  })
  $(document).click(function(){
     if($('#menu-user').is('.menu-user-visible')) $('#menu-user').hide(400,function(){f(this);});
  });

  //Arrow Back to Top
  var scroll={'homepage':{'index':1}, 'dream':{'index':1}, 'sale':{'index':1, 'catalogue':1, preview:1}};
  if(scroll[VPG.settings.realUrlRoute] && scroll[VPG.settings.realUrlRoute][VPG.settings.realUrlMethod]){
    $(window).scroll(function(){
      toggleArrow();
    });
    $('div.back-to-top').click(function(){
      $("html, body").animate({scrollTop:0}, 'slow');
      addEAButton('Showroom-Arrow-BackToTop');
    });
    if(typeof VPG.smartBanEnabled != 'undefined' && VPG.smartBanEnabled==false){
      $(window).scroll();
    }
    $(window).resize(function() {
      toggleArrow();
    });
  }

  function toggleArrow() {
    $scrollTop = $(this).scrollTop()
    if ($(window).width() > 1160 && $scrollTop >= 800) {
      $("body").find('div.back-to-top').fadeIn('slow', function() {
        $(this).css('display','inline');
      });
    }
    else if ($(window).width() <= 1160 || $scrollTop < 800) {
      $("body").find('div.back-to-top').fadeOut('slow', function() {
        $(this).css('display','none');
      });
    }
  }

  // Remplacement des ploacehorder pour rendre compatible tout navigateur
  initPlaceholders();

  //Sticky Nav
  var stickyNav={'homepage':{'index':1}};
  if(stickyNav[VPG.settings.realUrlRoute] && stickyNav[VPG.settings.realUrlRoute][VPG.settings.realUrlMethod]){
    if(VPG.settings.stickyNavEnabled){
      if($(window).scrollTop() != 0){
        $('#cat-vertical-menu').removeClass('bigHeader');
        $('#cat-vertical-menu').addClass('littleHeader');
      }
      $(window).scroll(function() {
        if($(window).scrollTop() < 36){
          $('#cat-vertical-menu').removeClass('littleHeader');
          $('#cat-vertical-menu').addClass('bigHeader');
        }
        else {
          $('#cat-vertical-menu').removeClass('bigHeader');
          $('#cat-vertical-menu').addClass('littleHeader');
        }
      });
    }
  }

});

function initPlaceholders(){
  if (VPG.settings.media != 'mobile') {
    var killPlaceholderTimer=false;
    setTimeout(function() {
      $('input[placeholder]').not('.masked_date')
      .keydown(function(){
        $(this).next('label').remove();
      })
      .focus(function(){
        var passwords=$('input[type=password]',this.form).not(this);
        if(passwords.length){
          killPlaceholderTimer=false;
          placeholderTimer=setInterval(function(){
            if(killPlaceholderTimer){
              clearInterval(placeholderTimer);
              return;
            }
            passwords.each(function(){
              if(this.value) $(this).next('label').remove();
            });
          },100);
        }
      })
      .blur(function(){
        killPlaceholderTimer=true;
        var $this = $(this);
        if((placehorder=$this.attr('placeholder'))){
          $this.attr('placeholder','');
          $this.data('placeholder',placehorder);
        }
        if ($this.val() == '' || $this.val() == $this.data('placeholder')) {
          var label=$this.next('label');
          if(!label.length){
            if (!$this.parent().hasClass('placeholder_wrapper')) {
              $(this).wrap('<span class="placeholder_wrapper" style="position:relative;" />');
            }
            label=$('<label class="placeholder">'+$this.data('placeholder')+'</label>').insertAfter(this);
          }
          var pos=$this.position();
          label.removeClass('focus').css({
            left:pos.left,
            width:$this.width(),
            height:$this.height(),
            marginBottom:$this.css('bottom'),
            marginLeft:$this.css('margin-left'),
            marginRight:$this.css('margin-right')
          }).mouseup(function(){
              $(this).addClass('focus').prev('input').focus();
            });
        }
      }).blur();
    },100);
  }
}

/*
 * Use this function to detect browser informations
 * @param requestedParams Array
 *   An array with all properties which you need on the page
 *   parameters can be : browserName, fullVersion, majorVersion, appName or userAgent
 * @return browserInfos Array
 *   An Array with your requested parameters.
 */
function detect_browser(requestedParams) {
  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName  = navigator.appName;
  var fullVersion  = ''+parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion,10);
  var nameOffset,verOffset,ix;
  var browserInfos = Array();

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
   browserName = "Opera";
   fullVersion = nAgt.substring(verOffset+6);
   if ((verOffset=nAgt.indexOf("Version"))!=-1)
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
   browserName = "Microsoft Internet Explorer";
   fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
   browserName = "Chrome";
   fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
   browserName = "Safari";
   fullVersion = nAgt.substring(verOffset+7);
   if ((verOffset=nAgt.indexOf("Version"))!=-1)
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
   browserName = "Firefox";
   fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
            (verOffset=nAgt.lastIndexOf('/')) )
  {
   browserName = nAgt.substring(nameOffset,verOffset);
   fullVersion = nAgt.substring(verOffset+1);
   if (browserName.toLowerCase()==browserName.toUpperCase()) {
    browserName = navigator.appName;
   }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1)
     fullVersion=fullVersion.substring(0,ix);
  if ((ix=fullVersion.indexOf(" "))!=-1)
     fullVersion=fullVersion.substring(0,ix);

  majorVersion = parseInt(''+fullVersion,10);
  if (isNaN(majorVersion)) {
   fullVersion  = ''+parseFloat(navigator.appVersion);
   majorVersion = parseInt(navigator.appVersion,10);
  }

  $.each(requestedParams, function(key,param) {
    switch(param){
      case 'browserName':
        browserInfos[param] = browserName;
        break;
      case 'fullVersion':
        browserInfos[param] = fullVersion;
        break;
      case 'majorVersion':
        browserInfos[param] = majorVersion;
        break;
      case 'appName':
        browserInfos[param] = navigator.appName;
        break;
      case 'userAgent':
        browserInfos[param] = navigator.userAgent;
        break;
    }
  });
  return browserInfos;
}

(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);
    if (!isChild) {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500);
    }
    else if (shouldRunHandlerOnce && $elements.length) {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }
    return $this;
}
}(jQuery));

function positionScrollAndPopup(idLink, idPopup, arrowPositionBottom)
{
  var heightPopup = $( idPopup ).outerHeight();
  var scrollLink = $(idLink).position().top;
  var heightLink = $(idLink).outerHeight();
  var windowPosTop = $(window).scrollTop();
  var remaining = scrollLink - windowPosTop;
  if(remaining < heightPopup)
  {
    var arrow = 0;
    if(arrowPositionBottom)
    {
      arrow = $( 'div.arrow' ).outerHeight();
    }
    var scroll = windowPosTop - (heightPopup - remaining) - arrow - heightLink;
    $( "html,body").scrollTop(scroll);
    var top = parseInt($( idPopup ).parent().css('top'));
    var newTop = top - (heightPopup - remaining) - arrow - heightLink;
    $( idPopup ).parent().css('top',newTop);
  }
}

/**
 * htmlspecialchars_decode
 *
 * https://github.com/kvz/phpjs/blob/master/functions/strings/htmlspecialchars_decode.js
 *
 * @param string
 * @param quote_style
 * @returns {XML}
 */
function htmlspecialchars_decode (string, quote_style) {
  // http://kevin.vanzonneveld.net
  // +   original by: Mirek Slugen
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Mateusz "loonquawl" Zalega
  // +      input by: ReverseSyntax
  // +      input by: Slawomir Kaniecki
  // +      input by: Scott Cariss
  // +      input by: Francois
  // +   bugfixed by: Onno Marsman
  // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Ratheous
  // +      input by: Mailfaker (http://www.weedem.fr/)
  // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
  // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
  // *     returns 1: '<p>this -> &quot;</p>'
  // *     example 2: htmlspecialchars_decode("&amp;quot;");
  // *     returns 2: '&quot;'
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}


/**
 * Add gtm google analytics event tracking
 *
 * @param categorie
 * @param action
 * @param label
 */
function addGtmGaEvent(categorie, action, label){
  if (typeof dataLayer !== "undefined"){

    // we decode htmlspecialchar to prevent calling  function error with (' and ")
    label = htmlspecialchars_decode(label,'ENT_QUOTES');

    //tracking GA click to edit
    dataLayer.push({
      "eventCategory": categorie,
      "eventAction": action,
      "eventLabel" : label,
      "event": "GAevent"
    });
  }
}

$(function(){
  $("a.buyGiftCardLink").click(function(){
    var action = "Header";
    if($(this).hasClass('footer'))
    {
      action = "Footer";
    }
    if (typeof _gaq != 'undefined') _gaq.push(['_trackEvent', 'Gift Card', action, '']);
    addEAEvent('GiftCard_' + action.toLowerCase() + '_button');
    $("#buyGiftcard").submit();
  })
});
