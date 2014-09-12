
(function($){"use strict";$.fn.pin=function(options){var scrollY=0,elements=[],disabled=false,$window=$(window);options=options||{};var recalculateLimits=function(){for(var i=0,len=elements.length;i<len;i++){var $this=elements[i];if(options.minWidth&&$window.width()<=options.minWidth){if($this.parent().is(".pin-wrapper")){$this.unwrap();}
$this.css({width:"",left:"",top:"",position:""});if(options.activeClass){$this.removeClass(options.activeClass);}
disabled=true;continue;}else{disabled=false;}
var $container=options.containerSelector?$this.closest(options.containerSelector):$(document.body);var offset=$this.offset();var containerOffset=$container.offset();var parentOffset=$this.offsetParent().offset();if(!$this.parent().is(".pin-wrapper")){$this.wrap("<div class='pin-wrapper'>");}
var pad=$.extend({top:0,bottom:0},options.padding||{});$this.data("pin",{pad:pad,from:(options.containerSelector?containerOffset.top:offset.top)-pad.top,to:containerOffset.top+$container.height()-$this.outerHeight()-pad.bottom,end:containerOffset.top+$container.height(),parentTop:parentOffset.top});$this.parent().css("height",$this.outerHeight());}};var onScroll=function(){if(disabled){return;}
scrollY=$window.scrollTop();var elmts=[];for(var i=0,len=elements.length;i<len;i++){var $this=$(elements[i]),data=$this.data("pin");if(!data){continue;}
elmts.push($this);var from=data.from,to=data.to;if(from+$this.outerHeight()>data.end){$this.css('position','');continue;}
if(from<scrollY&&to>scrollY){!($this.css("position")=="fixed")&&$this.css({top:data.pad.top}).css("position","fixed");if(options.activeClass){$this.addClass(options.activeClass);}}else if(scrollY>=to){$this.css({left:"",top:to-data.parentTop+data.pad.top}).css("position","absolute");if(options.activeClass){$this.addClass(options.activeClass);}}else{$this.css({position:"",top:"",left:""});if(options.activeClass){$this.removeClass(options.activeClass);}}}
elements=elmts;};var update=function(){recalculateLimits();onScroll();};this.each(function(){var $this=$(this),data=$(this).data('pin')||{};if(data&&data.update){return;}
elements.push($this);$("img",this).one("load",recalculateLimits);data.update=update;$(this).data('pin',data);});$window.scroll(onScroll);$window.resize(function(){recalculateLimits();});recalculateLimits();$window.load(update);return this;};})(jQuery);;
$(function(){frontvpg.modalMessage="modal-message";frontvpg.modalRelaunch="modal-relaunch";frontvpg.modalRelaunchSuccess="modal-relaunch-success";frontvpg.nb_new_pax=0;frontvpg.isFirstPaxAdding=(typeof isFirstPax!=="undefined")?isFirstPax:0;$(document).find('form .section-passenger select[name*="pax\[new\]"]').each(function(){regex=/pax\[new\]\[(\d+)\]\[\w+\]/g;var res=regex.exec($(this).attr('name'));frontvpg.nb_new_pax=Math.max(frontvpg.nb_new_pax,res[1]);});$(document).find('#updatePax form .section-passenger select').each(function(){regex=/(\w+)\-(\d+)\-(\d+)/g;var res=regex.exec($(this).attr('name'));frontvpg.nb_new_pax=Math.max(frontvpg.nb_new_pax,res[1]);});frontvpg.radioSelection={};frontvpg.hashModalUsed.push(frontvpg.modalMessage,frontvpg.modalRelaunch,frontvpg.modalRelaunchSuccess);frontvpg.buildSurveyRadioQuestions=function(){$('.survey_question_radio_set').each(function(){var marksHtml='';$(this).find('input').each(function(radioKey,radioValue){var text=$(this).attr('data-label');var radioHtml=$(this)[0].outerHTML+'<label for="'+$(this).attr('id')+'">'+text+'</label>';var className=(radioKey%2)?'odd':'even';marksHtml+='<div class="'+className+'">'+radioHtml+'</div>';});$(this).html(marksHtml);});}
frontvpg.manageCategoriesFields=function(){var categoryField=$(document.getElementById('contact-form-categories'));var subCategory=$(document.getElementById("contact-form-sub-category"));var haveSubCategory=false;if(typeof subCategoryList!=='undefined'&&!jQuery.isEmptyObject(subCategoryList))
{var categorieValue=categoryField.val();if(categorieValue&&typeof subCategoryList[categorieValue]!=='undefined')
{if(typeof subCategoryList[categorieValue]!=='string')
{subCategory.show();subCategory.parents('.form-container').show();haveSubCategory=true;1
frontvpg.generateSubCategorySelect(categorieValue);if(subCategorieValue&&typeof subCategorieValue!=="undefined")
{subCategory.find('option[value='+subCategorieValue+']').prop('selected',true);$(document.getElementById('category-text')).html(subCategoryList[categorieValue][subCategorieValue].text).show();}}
else
{subCategory.hide();$(document.getElementById('category-text')).html(subCategoryList[categorieValue]).show();}}
categoryField.on("change",function(event){currentCatValue=categoryField.val();subCategory.find('option').remove();$(document.getElementById('category-text')).html('');for(var key in subCategoryList)
{if(subCategoryList.hasOwnProperty(key)&&key==currentCatValue&&typeof subCategoryList[key]!=='string')
{subCategory.show();subCategory.parents('.form-container').show();haveSubCategory=true;frontvpg.generateSubCategorySelect(key);}
else
{subCategory.parents('.form-container').show();$(document.getElementById('category-text')).hide();if(!haveSubCategory){if(currentCatValue)
{subCategory.hide();$(document.getElementById('category-text')).show();$(document.getElementById('category-text')).html(subCategoryList[currentCatValue]);}
subCategory.parents('.form-container').hide();}}}
if(haveSubCategory)
{haveSubCategory=false;var isFirstSubCategory=Object.keys(subCategoryList[currentCatValue])[0];$(document.getElementById('category-text')).html(subCategoryList[currentCatValue][isFirstSubCategory].text).show();}});$('#contact-form-sub-category').on("change",function(event){var valueSub=$(this).val();$('#contact-form-sub-category').parents('.form-container').show();$(document.getElementById('category-text')).html(subCategoryList[categoryField.val()][valueSub].text);});}}
frontvpg.generateSubCategorySelect=function(categoryId){if(typeof categoryId!=='undefined')
{for(var keySub in subCategoryList[categoryId])
{var opt=document.createElement("option");opt.value=keySub;opt.text=subCategoryList[categoryId][keySub].label;$(document.getElementById("contact-form-sub-category")).append(opt);}}}
frontvpg.buildSurveyRadioMarks=function(){var marksLabel='<div class="mark-label" id="mark-label-1">Très insatisfaisant</div>';marksLabel+='<div class="mark-label" id="mark-label-2">Insatisfaisant</div>';marksLabel+='<div class="mark-label" id="mark-label-3">Moyennement satisfaisant</div>';marksLabel+='<div class="mark-label" id="mark-label-4">Satisfaisant</div>';marksLabel+='<div class="mark-label" id="mark-label-5">Très satisfaisant</div>';$('.marks').each(function(){var marksHtml='';$(this).find('input').each(function(radioKey,radioValue){var radioHtml=$(this)[0].outerHTML;var circleHtml='<span class="circle-mark inactive">'+(radioKey+1)+'</span>'+radioHtml;marksHtml+='<div class="mark">'+circleHtml+'</div>';});var html=marksHtml+marksLabel;$(this).html(html);});}
frontvpg.buildSurveyRadioQuestions();frontvpg.buildSurveyRadioMarks();frontvpg.showMarkLabel=function($element,radioValue){$element.parents('.fsit_set_many').find('.mark-label').hide();$element.parents('.fsit_set_many').find('#mark-label-'+radioValue).show();}
frontvpg.resetMarks=function($element){$element.parents('.fsit_set_many').eq(0).find('.circle-mark').each(function(){$(this).removeClass('active').addClass('inactive');});}
frontvpg.initLinkCopyClipboard=function(){if(typeof ZeroClipboard!=='undefined'){ZeroClipboard.setMoviePath("/ZeroClipboard.swf");var clip=new ZeroClipboard.Client();clip.setHandCursor(true);clip.glue($("#buttonLinkToShare")[0]);clip.setText($("#linkValue").val());}};frontvpg.manageMultipleSelectField=function(container){var selectContainer=$("select[name^='"+container+"']");var values=new Array();if(typeof selectContainer!=="undefined")
{selectContainer.each(function(){values.push($(this).val());});var hiddenField=$("input[name~='"+container+"-data']");hiddenField.val(values.join('/'));$(document).on('change',selectContainer,function(){frontvpg.manageMultipleSelectField(container);});}};frontvpg.manageUpdateDateOrders=function(){$('.pikalendar').each(function(){var picker=new Pikaday({onSelect:function(date){if(this.getDate()!=null){this.value=picker.toString();var $section=$(this.el).parents('section.tooltip-calendar');var $form=$(this.el).parents('form');var returnValue=formatDate("dd/mm/yy",this.getDate());var dateInput=formatDate("yymmdd",this.getDate());var numbNight=(typeof dayOfDeparture!=="undefined")?nbNights:0;if($section.hasClass('isDeparture')){$form.find('input[name="dateDeparture"]').val(dateInput);var arrivalDateField=$('.date-form-container #isArrivalDate');if(typeof isHiddenReturnField!=="undefined"&&isHiddenReturnField){var currentDate=this.getDate();currentDate.setDate((currentDate.getDate())+parseInt(numbNight));arrivalDateField.text(formatDate("dd/mm/yy",currentDate));$form.find('input[name="dateArrival"]').val(formatDate("yymmdd",currentDate));frontvpg.dateArrivalUpdated=true;}}else{$form.find('input[name="dateArrival"]').val(dateInput);}
$section.find(".calendar-button input").val(returnValue);$('.open').removeClass('open');frontvpg.filterMultiDateChange(this);}},onDraw:function(){var d=new Date();var currentMonthYear=d.getMonth()+'-'+d.getFullYear();var pikaMonthYear=$('.pika-select-month').val()+'-'+$('.pika-select-year').val();if($('.pika-select-year').val()<d.getFullYear()||(d.getFullYear()==$('.pika-select-year').val()&&$('.pika-select-month').val()<d.getMonth()))
{$('.pika-button').each(function(){$(this).attr("disabled","disabled");});}else if(currentMonthYear==pikaMonthYear){var currentDay=d.getDate();$('.pika-button').each(function(){if($(this).text()<currentDay){$(this).attr("disabled","disabled");}});}
if(typeof isHiddenReturnField!='undefined'&&typeof dayOfDeparture!=="undefined"){frontvpg.manageDateDisplaying(this._y,this._m);}
$('.tooltipDate').find('button.pika-prev').addClass('icon-arrow-left-t1').text('');$('.tooltipDate').find('button.pika-next').addClass('icon-arrow-right-t1').text('');var $section=$(this.el).parents('section.tooltip-calendar');var $form=$(this.el).parents('form');var defaultValue='';if($section.hasClass('isDeparture')){defaultValue=$form.find('input[name="dateDeparture"]').val();if(typeof isHiddenReturnField!=="undefined"&&isHiddenReturnField&&typeof frontvpg.dateArrivalUpdated=="undefined"){$form.find('input[name="dateArrival"]').val(defaultValue);}}else{defaultValue=$form.find('input[name="dateArrival"]').val();}
if(defaultValue!=''&&$.isNumeric(defaultValue)){var defaultDepartureDate=new Date(parseDate(defaultValue).getTime());$(this.el).parents('section.tooltip-calendar').find('input.datepicker-input').val(formatDate('d/mm/yy',defaultDepartureDate));}}});this.parentNode.insertBefore(picker.el,this.nextSibling);});$('.tooltip-departure-slider').remove();$(document.getElementById('updateDate')).on('click','.tooltip-link',function(event){event.preventDefault();event.stopPropagation();$('.tooltipDate').removeClass('open');$(this).find('.tooltipDate').addClass('open');outsideDateClick();});}
function parseDate(str){var y=str.substr(0,4),m=str.substr(4,2),d=str.substr(6,2);return new Date(y+'-'+m+'-'+d);}
frontvpg.manageDateDisplaying=function(year,month)
{var calendar=$('#tooltip-departure');calendar.find('td button').attr('disabled','disabled');var currentSelection=new Date(year,month,1);var d=new Date();if(currentSelection.getTime()>d.getTime()||(currentSelection.getMonth()==d.getMonth())){calendar.find('td:nth-child('+dayOfDeparture+') button').attr('disabled',false);}
calendar.find('td.is-today').parent('tr').prev('tr').find('button').attr('disabled','disabled')}
frontvpg.filterMultiDateChange=function(picker){var dateStart=picker.getDate();var dateEnd=picker.getDate();if(dateStart!=null&&dateEnd!=null){dateStart.setDate(dateStart.getDate());dateEnd.setDate(dateEnd.getDate());}}
outsideDateClick=function(){var alertResults=function(){$('.open').removeClass('open');};$('.tooltipDate').outsideEvent(alertResults);}
frontvpg.initReferralMobile=function(){if(!frontvpg.targets.desktop){if(!$('.memberInfo').hasClass('hasDropdownList')){$('.memberInfo').addClass('hasDropdownList');$('.section-mobile').css('display','none');$('.hasDropdownList').find('i').attr('class','icon-arrow-down-t1');$('.hasDropdownList').off('click').on('click',function(event){event.preventDefault();event.stopPropagation();var current_icon=$(this).find('i');var iconStatus=current_icon.attr('data-open');$(this).parent('.basicRow').find('.section-mobile').slideUp();if(!$(this).parent('.basicRow').find('.section-mobile').is(':visible')){$(this).parent('.basicRow').find('.section-mobile').slideDown();iconStatus=current_icon.attr('data-close');}
current_icon.attr('class',iconStatus);});}}else{$('.hasDropdownList').unbind('click');$('.memberInfo').removeClass('hasDropdownList');$('.section-mobile').css('display','none');}}
$(document.getElementById('button-more-friends')).on('click',function(){$(document.getElementById('sponsoringEmailForm')).find('.form-container').slideDown();$(this).remove();});$(document).ready(function(){frontvpg.manageCategoriesFields();frontvpg.manageMultipleSelectField('payment-form-card-expiration');$(document.getElementById('ccCleanup')).on('click',function(event){$.get("/account/deleteOneClickPayment",function(data){if(data.error==0){$(document.getElementById('one_click_payment')).html('Vous n\'avez pas encore renseigné de carte, vous pourrez le faire lors de votre prochain achat.');}});});frontvpg.manageUpdateDateOrders();$(document).on('cssmodal:show',function(event){var activeElement=CSSModal.activeElement;if($(activeElement).attr('id')==frontvpg.modalMessage){$(document.getElementById(frontvpg.modalMessage)).addClass('open-modal');$(document.getElementById('feedback-form-message')).val('');}}).on('cssmodal:hide',function(event){var activeElement=CSSModal.activeElement;if($(activeElement).attr('id')==frontvpg.modalMessage){$(document.getElementById(frontvpg.modalMessage)).removeClass('open-modal')}});$('.mark').each(function(){var radio=$(this).find('input');var radioValue=radio.val()-10;if(radio.is(':checked')){$(this).find('.circle-mark').removeClass('inactive').addClass('active');frontvpg.showMarkLabel($(this),radioValue);}});$('.mark').on("mouseenter mouseleave",function(event){switch(event.type){case'mouseenter':if(!frontvpg.targets.mobile){var radio=$(this).find('input');var radioValue=radio.val()-10;frontvpg.showMarkLabel($(this),radioValue);frontvpg.resetMarks($(this));$(this).find('.circle-mark').addClass('active');}
break;case'mouseleave':if(!frontvpg.targets.mobile){var radio=$(this).parent().find('input');var radioSetName=radio.attr('name');var checkedRadio=$('input[name="'+radioSetName+'"]:checked');var radioValue=checkedRadio.val()-10;if(checkedRadio.length>0){frontvpg.showMarkLabel($(this),radioValue);}else{$(this).parents('.fsit_set_many').find('.mark-label').hide();}
frontvpg.resetMarks($(this));checkedRadio.parent('.mark').find('.circle-mark').addClass('active');}
break;default:break;}});$('.circle-mark').on("click",function(event){var radio=$(this).parent().find('input');var radioValue=radio.val()-10;var radioSetName=radio.attr('name');frontvpg.showMarkLabel($(this),radioValue);frontvpg.resetMarks($(this));$('input:radio[name="'+radioSetName+'"]').eq(radioValue-1).prop('checked',true);$(this).addClass('active');});$('#contact .email-form').on("click",function(event){event.preventDefault();$(document.getElementsByName('ContactForm')).show();var emailForm=$(document.getElementById('container-email-box'));var $header=$(document.getElementById('header'));var formService=$(this).attr('data-type');if(typeof(services)!='undefined'&&typeof(services[formService])!='undefined'){var first=services[formService][0];$("select#subject option").filter(function(){$(document.getElementById('subject_selected')).val(first);return $(this).val()==first;}).prop('selected',true);}
if(emailForm.is(':hidden')){emailForm.stop().slideDown('slow',function(){$('html, body').animate({scrollTop:emailForm.find('form').offset().top-$header.height()},'slow');});location.href='#container-email-box-anchor';}else{$('html, body').animate({scrollTop:emailForm.find('form').offset().top-$header.height()},'slow');}});$(document.getElementById('email-close-popup')).on("click",function(event){event.preventDefault();$('.container-email-box').slideUp();});$(document.getElementById('social_fbshare')).on('click',function(event){event.preventDefault();window.open(urlShareFacebook,'sharer','toolbar=0,status=0,width=626,height=436');});$('a.add-new-passenger').click(function(e){e.preventDefault();$clone=$(".section-passenger-clone").clone(true);$clone.css('display','block').attr('class','section-passenger');frontvpg.nb_new_pax++;$clone.find('input,select').each(function(){regex=/(pax\[new\]\[)(\d+)(\]\[\w+\])/g;var name=$(this).attr('name');var res=name.replace(regex,'$1'+frontvpg.nb_new_pax+'$3');$(this).attr('name',res);});$('section.section-add-passenger').before($clone);});$('#updatePax .add_new_pax').click(function(e){if(frontvpg.isFirstPaxAdding){frontvpg.isFirstPaxAdding=false;$('#updatePax section#add_new_pax .btn_update, #updatePax #newPassengerContainer').show();$('#updatePax section#add_new_pax .cancelButton').show();}else{e.preventDefault();$clone=$(".section-passenger-clone").clone(true);$clone.css('display','block').removeClass('section-passenger-clone').addClass('newContentForm');frontvpg.nb_new_pax++;$clone.find('input,select').each(function(){regex=/(\w+)\-(\d+)\-(\d+)/g;var name=$(this).attr('name');var res=name.replace(regex,'$1-'+frontvpg.nb_new_pax+'-$3');$(this).attr('name',res);});$clone.insertAfter($('section.newPassengerForm section.newContentForm').last());var currentNUmberOfNewPax=parseInt($(document.getElementById('numberOfNewPaxForm')).val());$(document.getElementById('numberOfNewPaxForm')).val(currentNUmberOfNewPax+1);}});$('body').on('click','a.delete-passenger',function(e){e.preventDefault();$(this).parents(".section-passenger").remove();});$(document).on('change','select#facebook_lists',function(){if($(this).val()){getFriends($(this).val());}else{getFriends();}});$(document).on('change','div#facebook_friends div.cell_friend input',function(){if($('div#facebook_friends div.cell_friend input:checked').length){$('#modal-share-fb #facebookPartOne .facebookPartOneSubmit').removeClass('disabled');}});$(document.getElementById('social-network')).find('a.share').on('click',function(event){event.preventDefault();frontvpg.eventSocialNetwork(this);});frontvpg.initLinkCopyClipboard();$('.open-relaunch').each(function(){$(this).on('click',function(event){$('#view-email').hide();$('.referral_emails').attr('disabled','disabled');$('.referral_emails').hide();$email=$(this).attr('data-email');$(document.getElementById($email)).removeAttr('disabled').show();});});$('#relaunch_all').on('click',function(){$('#view-email').show();$('.referral_emails').attr('disabled','disabled');$('.referral_emails').hide();$('.referral_emails').removeAttr('disabled');inputs=document.getElementsByTagName("input");for(index=0;index<3;++index){$(document.getElementById(inputs[index].id)).show();}});$('#view-email').on('click',function(){$('.referral_emails').show();$('#view-email').hide();});$(document).on('cssmodal:show',function(event){$(window).unbind('hashchange',frontvpg.myHashChange);event.preventDefault();event.stopPropagation();var activeElement=CSSModal.activeElement;if($(activeElement).attr('id')==frontvpg.modalMessage){$(document.getElementById('feedback-form-message')).val('');window.location.hash=frontvpg.modalMessage;frontvpg.openModal=true;}
if($(activeElement).attr('id')==frontvpg.modalRelaunch){$(document.getElementById('relaunch_message_text')).val('');$('#relaunch-email-error').html('');window.location.hash=frontvpg.modalRelaunch;frontvpg.openModal=true;}
if(jQuery.inArray(activeElement.id,frontvpg.hashModalUsed)!=-1&&frontvpg.openModal){$(activeElement).addClass('open-modal');}else{window.location.hash=frontvpg.preventHashTag;}}).on('cssmodal:hide',function(event){var activeElement=CSSModal.activeElement;if($(activeElement).attr('id')==frontvpg.modalMessage){$(document.getElementById(frontvpg.modalMessage)).removeClass('open-modal')
if(frontvpg.isShowingPopup){frontvpg.isShowingPopup=false;window.location.href="{{ orderUrl }}";}}
if($(activeElement).attr('id')==frontvpg.modalRelaunch){$(document.getElementById(frontvpg.modalRelaunch)).removeClass('open-modal')
if(frontvpg.isShowingPopup){frontvpg.isShowingPopup=false;}}});$("#relaunchEmailForm").submit(function(){var textareaValue=$('#relaunch_message_text').val();$('#message').val(textareaValue);$.ajax({type:"POST",dataType:"json",url:"{{ sponsoringRelaunchEmail }}",data:$("#relaunchEmailForm").serialize(),success:function(data)
{if(!data.mailSent){$('#relaunch-email-error').html(data.errorList);}else{$('#relaunch-email-error').html('');if(data.mailSent){$('#modal-relaunch-success').find('.modal-content .relaunch-title').html(data.successMessage);window.location.hash=frontvpg.modalRelaunchSuccess;frontvpg.openModal=true;}}}});return false;});if($('.open-details').length!=0){$('.open-details').on('click',function(){var id=$(this).parent().data('id');if($(this).find('i').hasClass('icon-more')){if(frontvpg.targets.tablet){$('tr.'+id).css('display','block');}else{$('tr.'+id).show();}
$(this).find('i').removeClass('icon-more').addClass('icon-less');}else{if(frontvpg.targets.tablet){$('tr.'+id).css('display','none');}else{$('tr.'+id).hide();}
$(this).find('i').removeClass('icon-less').addClass('icon-more');}});}
$('#updatePax section#list_pax a.updateAction').on('click',function(event){event.preventDefault();$(this).parent('form').submit();});$(document.getElementById('modification-choice')).on('change',function(){var url='';if($(this).val()=='1'||$(this).val()=='2'){url=$('option:selected',this).attr('data-url');$('.back').hide();$('.passengers-modification').css('display','none');$('.date-modification').css('display','inline-block');$('.choice').show();}else{$('.date-modification').hide();$('.passengers-modification').hide();$('.choice').hide();$('.back').show();}
$('#orders.modification .btn.accept').attr('href',url);});$('.delete_pax').on('click',function(){var nb_checkbox=$('.delete_pax').length;var nb_checked=$('.delete_pax:checked').length;if(nb_checked<nb_checkbox){$('.delete_pax').attr("disabled",false);$('.errorMessagePaxMin').hide();if($(this).is(":checked")){$(this).parents('li').find('div.paxInfo').addClass('throughPax');$(this).parents('section').find('.btn_delete_pax').show();var aPaxChecked=[];$('.delete_pax:checked').each(function(){aPaxChecked.push($(this).attr('name'));});$('#deletedPaxs').val(aPaxChecked.join(','));}else{$(this).parents('li').find('div.paxInfo').removeClass('throughPax');$(this).parents('section').find('.btn_delete_pax').hide();}}else{$('.errorMessagePaxMin').show();$(this).attr("disabled","disabled");$(this).attr("checked",false);}});var hash=window.location.hash;if(hash.search('passport-')!=-1){var idResa=hash.replace('#passport-','');idResa=idResa.replace(/[A-Z]*/g,'');idResa=idResa.substr(2);idResa=idResa.replace(/^0+/,'');$("tr[data-id='booking-"+idResa+"']").find('.open-details').click();$('html, body').animate({scrollTop:$("#pax-"+idResa+"-form").offset().top},2000);}
if(hash.search('flight-')!=-1){var idResa=hash.replace('#flight-','');idResa=idResa.replace(/[A-Z]*/g,'');idResa=idResa.substr(2);idResa=idResa.replace(/^0+/,'');$("tr[data-id='booking-"+idResa+"']").find('.open-details').click();$('html, body').animate({scrollTop:$("#transport-"+idResa+"-form").offset().top},2000);}
if(typeof openBooking!="undefined"&&openBooking.length>0){$("tr[data-id='booking-"+openBooking+"']").find('.open-details').click();}
frontvpg.handleTrackingSurveyPage();});$(document.getElementById('header')).pin({containerSelector:$(document.body)});frontvpg.initReferralMobile();$(window).on('resize',function(){frontvpg.initReferralMobile();});});;