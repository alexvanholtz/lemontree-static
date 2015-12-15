(function(){
  'use strict';

    // toggles for testing nav
    // $('.fs-menu').show(); 
    // $('.wrapper').hide(); 

  $('.js-trigger-fs-menu').on('click', function(event){
    event.preventDefault();
    $('.fs-menu').show(); 
    $('.wrapper').hide(); 
    $('body').addClass('yellow');
  });  

  $('.js-trigger-fs-menu-close').on('click', function(event){
    event.preventDefault();
    $('.fs-menu').hide(); 
    $('.wrapper').show(); 
    $('body').removeClass('yellow');
  });

  //Debounce method to stop events from triggering unnecessarily 
  function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  }

})();