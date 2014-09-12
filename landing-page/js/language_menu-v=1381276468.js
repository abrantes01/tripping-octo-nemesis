$(function() {
  var posLeft = $('a#languages').position().left;
  var menuWidth = $('nav#languages_menu').width()-parseInt($('a#languages').css('padding-right'));
  $('nav#languages_menu').css('left',posLeft+'px');
  $('a#languages').click(function(e){
    e.stopPropagation();
    if(!$('nav#languages_menu').is(':visible')){
      openMenu(posLeft,menuWidth);
      $('nav#languages_menu').slideDown();
    }
    else {
      $('nav#languages_menu').slideUp(function(){
        closeMenu(posLeft);
      });
    }
  });
  $(document).click(function(){
    if($('nav#languages_menu').is(':visible')){
      $('nav#languages_menu').slideUp(function(){
        closeMenu(posLeft);
      });
    }
  });
});

function openMenu(posLeft,menuWidth){
  $('a#languages').css('width',menuWidth+'px').css('left',posLeft+'px').css('text-align','left').css('background-color','#4f4747');
}
function closeMenu(posLeft){
  $('a#languages').css('width','').css('left',posLeft+'px').css('text-align','right').css('background-color','');
}