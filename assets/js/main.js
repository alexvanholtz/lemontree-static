(function(){
  'use strict';

  var currentScroll = 0;

  // On page load, shrink header if scrolled down the page
  shrinkHeaderWhenNeeded();

  // On page load, add device classes
  addDeviceClasses();

  //Check for the window width on resize - add/remove mobile class at breakpoint
  $(window).resize(debounce(function(e) {
    addDeviceClasses();
  }, 250));

  //Add classes to shrink header on scroll
  $(window).scroll(debounce(function(e) {
    shrinkHeaderWhenNeeded();
  }, 250));

  // Click events for full screen menu
  $('.js-trigger-fs-menu').on('click', function(e){
    e.preventDefault();
    currentScroll = $(document).scrollTop();

    $(document).scrollTop(0);    
    $('.fs-menu').show(); 
    $('.wrapper').hide(); 
    $('body').addClass('yellow');
    $('body').addClass('menu-is-open');
    
  });  

  $('.js-trigger-fs-menu-close').on('click', function(e){
    e.preventDefault();
    
    $('.fs-menu').hide(); 
    $('.wrapper').show(); 
    $('body').removeClass('yellow');
    $('body').removeClass('menu-is-open');

    $(document).scrollTop(currentScroll);
  });  

  function shrinkHeaderWhenNeeded(){

    if ($(document).scrollTop() > 1 ) {
      $('.header').addClass('header--shrink');
      $('body').addClass('has-shrunken-header');
      $('.body-content').addClass('body-content--shrink');
      $('.cta-bar').hide();

    } else {
      if(!$('body').hasClass('menu-is-open')){
        $('body').removeClass('has-shrunken-header');        
        $('.header').removeClass('header--shrink');
        $('.body-content').removeClass('body-content--shrink');  
        if ($('body').hasClass('desktop')) {
          $('.cta-bar').show();            
        }
      }
    }

  }

  function addDeviceClasses(){

    if(window.innerWidth > 550 && window.innerWidth < 768){
      $('body').addClass('tablet');
      $('body').removeClass('mobile');
      $('body').removeClass('desktop'); 
      $('.cta-bar').hide();                  

    }else if (window.innerWidth <= 550){
      $('body').addClass('mobile');
      $('body').removeClass('desktop');
      $('body').removeClass('tablet'); 
      $('.cta-bar').hide();            

    }else {
      $('body').addClass('desktop');
      $('body').removeClass('mobile');
      $('body').removeClass('tablet');
      $('.cta-bar').show();            
    }

  }

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