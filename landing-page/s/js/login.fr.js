
var login={};var slideShowCreated=false;var firstImage=1;!function($){function shuffle(array){var currentIndex=array.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue;}
return array;}
function initFooter(){var footer=document.getElementById('footer');var form=$('.outer-form-container');var formPosBottom=form.offset().top+form.outerHeight();if(frontvpg.currentBreakPoint!='mobile'){var legend=document.getElementById('legend');var legendHeight=legend.offsetHeight;var footerHeight=footer.offsetHeight;var windowHeight=window.innerHeight?window.innerHeight:$(window).height();if((formPosBottom+legendHeight)<=windowHeight){$(legend).css({'bottom':'0px','top':''});$(footer).css({'bottom':-footerHeight+'px','top':''});}else{$(legend).css({'top':formPosBottom+'px','bottom':''});$(footer).css({'top':(formPosBottom+legendHeight)+'px','bottom':''});}}else{var background=document.getElementById('mobile-background');var backgroundHeight=background.offsetHeight;if(formPosBottom<=backgroundHeight){$(footer).css({'top':backgroundHeight+'px','bottom':''});}else{$(footer).css({'top':formPosBottom+'px','bottom':''});$(background).css({'top':(formPosBottom-backgroundHeight)+'px','bottom':''});}}}
function createSlideShow(shuffleMode){var firstBackground=backgrounds[0];backgrounds=backgrounds.slice(1);if((typeof shuffleMode=='undefined')||(suffleMode==true)){backgrounds=shuffle(backgrounds);}
if(firstImage==1){var arrFirstBack=[firstBackground];backgrounds=arrFirstBack.concat(backgrounds);}
$.vegas('slideshow',{delay:5000,backgrounds:backgrounds});}
function manageSlideShow(){if(frontvpg.currentBreakPoint!='mobile'){createSlideShow();slideShowCreated=true;$('#mobile-background').css('display','none');}else{if(slideShowCreated==true){$.vegas('pause');}
$('#mobile-background').css('display','block');}}
var rtime=new Date(1,1,2000,12,00,00);var timeout=false;var delta=200;function resizeend(){if(new Date()-rtime<delta){setTimeout(resizeend,delta);}else{timeout=false;manageSlideShow();initFooter();}}
$(window).load(function(){var slideShowCreated=false;if(frontvpg.currentBreakPoint!='mobile'){createSlideShow();slideShowCreated=true;}else{$('#mobile-background').css('display','block');}
initFooter();frontvpg.initPlaceholders();if($('#signup-form-birthdate').length){$('#signup-form-birthdate').mask('99/99/9999');}
frontvpg.manageToggleMenu($(document.getElementById('languages-menu-list')));frontvpg.manageToggleMenu($(document.getElementById('languages-menu')));$(window).resize(function(){rtime=new Date();if(timeout===false){timeout=true;setTimeout(resizeend,delta);}});$(function(){$(document.getElementById('login-container-form')).find('a.share').on('click',function(event){$(this).trigger('trackClick');event.preventDefault();frontvpg.eventSocialNetwork(this);});});})}(window.jQuery);
(function($){var $background=$("<img />").addClass("vegas-background"),$caption=$("<div></div>").addClass("vegas-caption"),$current=$(),$currentCaption=$(),paused=null,backgrounds=[],step=0,delay=5e3,walk=function(){},timer,methods={init:function(settings){var options={src:getBackground(),align:"center",valign:"center",fade:0,load:function(){},complete:function(){}};$.extend(options,$.vegas.defaults.background,settings);var $new=$background.clone();var $newCaption=$caption.clone();$new.css({position:"fixed",left:"0px",top:"0px"}).bind("load",function(){if($new==$current){return;}
$(window).bind("load resize.vegas",function(e){resize($new,options);});if($current.is("img")){$current.stop();$currentCaption.fadeOut((options.fade/2),function(){$(".vegas-caption").remove();$newCaption.hide().prependTo('#login-container-form .page-center .vegas-caption-container').empty().append(options.caption).fadeIn(options.fade);});$new.hide().insertAfter($current).fadeIn(options.fade,function(){$(".vegas-background").not(this).remove();$("body").trigger("vegascomplete",[this,step-1]);options.complete.apply($new,[step-1]);});}else{$newCaption.hide().prependTo('#login-container-form .page-center .vegas-caption-container').append(options.caption).fadeIn(options.fade);$new.hide().prependTo("body").fadeIn(options.fade,function(){$("body").trigger("vegascomplete",[this,step-1]);options.complete.apply(this,[step-1]);});}
$current=$new;$currentCaption=$newCaption;resize($current,options);$("body").trigger("vegasload",[$current.get(0),step-1]);options.load.apply($current.get(0),[step-1]);if(step){$("body").trigger("vegaswalk",[$current.get(0),step-1]);options.walk.apply($current.get(0),[step-1]);}}).attr("src",options.src);return $.vegas;},destroy:function(what){if(!what||what=="background"){$(".vegas-background").remove();$(window).unbind("*.vegas");$current=$();}
clearInterval(timer);return $.vegas;},slideshow:function(settings,keepPause){var options={step:step,delay:delay,preload:false,backgrounds:backgrounds,walk:walk};$.extend(options,$.vegas.defaults.slideshow,settings);if(options.backgrounds!=backgrounds){if(!settings.step){options.step=0;}
if(!settings.walk){options.walk=function(){};}
if(options.preload){$.vegas("preload",options.backgrounds);}}
backgrounds=options.backgrounds;delay=options.delay;step=options.step;walk=options.walk;clearInterval(timer);if(!backgrounds.length){return $.vegas;}
var doSlideshow=function(){if(step<0){step=backgrounds.length-1;}
if(step>=backgrounds.length||!backgrounds[step-1]){step=0;}
var settings=backgrounds[step++];settings.walk=options.walk;if(typeof settings.fade=="undefined"){settings.fade=options.fade;}
if(settings.fade>options.delay){settings.fade=options.delay;}
$.vegas(settings);};doSlideshow();if(!keepPause){paused=false;$("body").trigger("vegasstart",[$current.get(0),step-1]);}
if(!paused){timer=setInterval(doSlideshow,options.delay);}
return $.vegas;},jump:function(s){var from=step;if(step){$.vegas("slideshow",{step:s},true);$("body").trigger("vegasjump",[$current.get(0),step-1,from-1]);}
return $.vegas;},stop:function(){var from=step;step=0;paused=null;clearInterval(timer);$("body").trigger("vegasstop",[$current.get(0),from-1]);return $.vegas;},pause:function(){paused=true;clearInterval(timer);$("body").trigger("vegaspause",[$current.get(0),step-1]);return $.vegas;},get:function(what){if(what===null||what=="background"){return $current.get(0);}
if(what=="step"){return step-1;}
if(what=="paused"){return paused;}},preload:function(backgrounds){var cache=[];for(var i in backgrounds){if(backgrounds[i].src){var cacheImage=document.createElement("img");var cacheCaption=document.createElement("div");cacheImage.src=backgrounds[i].src;cacheCaption.innerHTML=backgrounds[i].caption;cache.push(cacheImage);cache.push(cacheCaption);}}
return $.vegas;}};function resize($img,settings){var options={align:"center",valign:"center"};$.extend(options,settings);if($img.height()===0){$img.load(function(){resize($(this),settings);});return;}
var vp=getViewportSize(),ww=vp.width,wh=vp.height,iw=$img.width(),ih=$img.height(),rw=wh/ww,ri=ih/iw,newWidth,newHeight,newLeft,newTop,properties;if(rw>ri){newWidth=wh/ri;newHeight=wh;}else{newWidth=ww;newHeight=ww*ri;}
properties={width:newWidth+"px",height:newHeight+"px",top:"auto",bottom:"auto",left:"auto",right:"auto"};if(!isNaN(parseInt(options.valign,10))){properties.top=0-(newHeight-wh)/100*parseInt(options.valign,10)+"px";}else if(options.valign=="top"){properties.top=0;}else if(options.valign=="bottom"){properties.bottom=0;}else{properties.top=(wh-newHeight)/2;}
if(!isNaN(parseInt(options.align,10))){properties.left=0-(newWidth-ww)/100*parseInt(options.align,10)+"px";}else if(options.align=="left"){properties.left=0;}else if(options.align=="right"){properties.right=0;}else{properties.left=(ww-newWidth)/2;}
$img.css(properties);}
function getBackground(){if($("body").css("backgroundImage")){return $("body").css("backgroundImage").replace(/url\("?(.*?)"?\)/i,"$1");}}
function getViewportSize(){var elmt=window,prop="inner";if(!("innerWidth"in window)){elmt=document.documentElement||document.body;prop="client";}
return{width:elmt[prop+"Width"],height:elmt[prop+"Height"]};}
$.vegas=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments);}else{$.error("Method "+method+" does not exist");}};$.vegas.defaults={background:{},slideshow:{}};})(jQuery);;
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);;