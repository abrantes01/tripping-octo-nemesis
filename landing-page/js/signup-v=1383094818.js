var tooltipOpts = {
    trigger: 'now',
    clickAnywhereToClose: false,
    closeWhenOthersOpen: false,
    strokeWidth: 0,
    cornerRadius: 0,
    spikeLength: 9,
    spikeGirth: 28,
    fill: '#6e6565',
    positions: ['left'],
    width: 210,
    overlap: -5
};

var tooltipOptsError = $.extend({}, tooltipOpts, {
    strokeWidth: 2,
    strokeStyle: '#960443',
    spikeGirth: 26,
    showTip: function(box) {
        $(box).show().find('div.bt-content').addClass('error');
    }
});

var tooltipsPosition = new Array();

$(function() {
  $('div#signup a#submit').click(function() {
    $('div#signup form input').each(function() {
      if ($(this).val() == $(this).attr('placeholder')) $(this).val('');
    });
    $('div#signup form').submit();
    return false;
  });
  var browserInfos = detect_browser(Array('browserName','majorVersion'));
  if(browserInfos['browserName'] == 'Microsoft Internet Explorer' && browserInfos['majorVersion'] == '7.0'){
    $('input[placeholder]').each(function(){
      var input = $(this);
      if (input.val() == '') {
        $(input).val(input.attr('placeholder'));
      }
      $(input).focus(function(){
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      });
      $(input).blur(function(){
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.val(input.attr('placeholder'));
        }
      });
    });
  };

  $('div#signup div#part2 select[name="mbre_knowus"]').change(function() {
    showSponsor();
  });
  showSponsor();
  $('div#signup div#part2 input#mbre-naissance').focus(function() { $(this).parent().find('label').remove(); });

  //Tracking Facebook
  $(document).on('click',"#facebook", function() {
    if ( typeof _gaq !== "undefined"  ) {
        _gaq.push(['_trackEvent', 'FacebookConnect', 'Subscription ', '']);
    }
  });

});

function showSponsor() {
  var $this = $('div#signup div#part2 select[name="mbre_knowus"]');
  if ($this.val() == 'wordofmouth') {
    $('div#signup div#part2 #sponsor').css('display', 'block');
    $('div.bt-wrapper').each(function(index) {
      if (tooltipsPosition.length != $('div.bt-wrapper').length) {
        tooltipsPosition[index] = $(this).css('top');
      }
      $(this).css('top', parseInt($(this).css('top')) + parseInt($('div#signup div#part2 li#sponsor').css('height')) + 6);
    });
    $('input[name=mbre_friend]').blur();
  } else {
    $('div.bt-wrapper').each(function(index) {
      $(this).css('top', tooltipsPosition[index]);
    });
    $('div#signup div#part2 #sponsor').css('display', 'none');
    $('div.bt-wrapper:eq(2)').css('display', 'none');
    $('input[name=mbre_friend]').val('').removeClass('error');
  }
}