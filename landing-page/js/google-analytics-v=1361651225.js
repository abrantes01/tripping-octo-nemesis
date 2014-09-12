/*
* Google Analytics Tracking management
*/


$(function(){

  if(typeof _gaq != 'undefined'){

    var GACategory = {
      killerDeal : 'KillerDealSlideshow'
    }

    $vertMenu = $('div#cat-vertical-menu');
    $killerDeal = $('div#killer-deal-wrapper');
    $filters = $('div#filters');

    // Checks whether vertical menu is enabled or not
    if($vertMenu.length==1){
      // handle menu item clicking
      $vertMenu.find("a").click(function() {
        var catName = $(this).attr('id');
        if(catName!=undefined){
          _gaq.push(['_trackEvent', 'NavBar_'+VPG.settings.currentUrlRoute, 'click', catName]);
        }
      });
    }


    /**
     * KILLER DEAL EVENTS
     */
    if($killerDeal.length==1){

      // GoToSale
      $killerDeal.find('.nivo-imageLink').click(function(){
        var data = $(this).find('img').attr('id').split('_');
        var id   = data[1];
        _gaq.push(['_trackEvent', GACategory.killerDeal, 'GoToSale', id]);
      });

      // SubscribeToSale
      // @TODO

      // ArrowRight
      $killerDeal.find('.nivo-nextNav').click(function(){
        _gaq.push(['_trackEvent', GACategory.killerDeal, 'ArrowRight']);
      });

      // ArrowLeft
      $killerDeal.find('.nivo-nextNav').click(function(){
        _gaq.push(['_trackEvent', GACategory.killerDeal, 'ArrowLeft']);
      });

      // NavCircle
      // @TODO

    }


    // Checks whether filters is enabled or not
    if($filters.length==1){
      $filters.find("a#resetFilters").click(function() {
        _gaq.push(['_trackEvent', 'filters', 'click', 'reset']);
      });
    }

  }
});