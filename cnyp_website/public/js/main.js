

$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a .class1, footer a[href='#myPage']").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      $('.navbar-brand').html('Chotanagpur Youth Pune');
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
           $('.navbar-brand').html('CYP');
          $(this).addClass("slide");
        }
    });
  });
})