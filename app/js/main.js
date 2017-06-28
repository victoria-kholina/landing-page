jQuery(document).ready(function(){
    
    $(window).resize(getDropdown); 
    getDropdown();  
    
    var mySwiper = new Swiper ('.swiper-container', {
        loop: false,
      pagination: '.swiper-pagination',
      paginationClickable: true,
    
      paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 5
        
//  Uncomment for autoplay slider
//        autoplay: 3000,
//        autoplayDisableOnInteraction: false
    }); 
    
    
    $('.buy-now-btn').hover(
        function() {
            $(this).parents("table").find("thead tr:first-child").css("background","#44c0c2");
        }, 
        function() {
            $(this).parents("table").find("thead tr:first-child").css("background","#485460");
        }
     );
    
    $(".main-menu li a").click(function () {
        var elemClick = $(this).attr("href");  
        var elemPos = $(elemClick).offset().top;
        $("body,html").animate({scrollTop: elemPos }, 800);
        return false;
      });
    
    function getDropdown(){
        var divMenu = $('.mobile-menu');
        var winWidth = $(window).width();
        if (winWidth<768){ 
            if(divMenu.hasClass("hidden")){
                divMenu.removeClass("hidden").addClass("visible");
                $(".main-menu").removeClass("horizontal-menu").addClass("vertical-menu").hide();
                $(".mobile-menu button").on("click", function(){
                    $(".main-menu").slideToggle();
                    divMenu.find("span").toggleClass("closed opened");
                    });      
            };
        } else {
            if($(".main-menu").hasClass("vertical-menu") || divMenu.hasClass("visible")){
                $(".main-menu").removeClass("vertical-menu").addClass("horizontal-menu").show();
                divMenu.removeClass("visible").addClass("hidden");
            }
        };
    };
    
        //FORM VALIDATION
    
    function showErrorMessage(input, textErr){
        var errMessage = input.parents("form").find(".error-message");
            errMessage.text(textErr).css({"margin-bottom": "10px", "font-size": "0.8em", "text-align": "left"});
            errMessage.animate({'paddingLeft':'10px'},400).animate({'paddingLeft':'5px'},400); 
    }
	
    function hideErrorMessage(inpt){
        if(inpt.hasClass("error")){
            inpt.removeClass('error'); 
            inpt.parents("form").find(".error-message").empty();
        }	
    }
    
    $('.footer-form').unbind().blur( function(){
        var name = $(this).attr('name');
        var value = $(this).val();
              
        switch(name) {
             case 'user-name': 
                var regExpName = /^[a-zA-Zа-яА-Я]+$/;
                
                        if(value=="" || regExpName.test(value)) { //empty input we will check on form submit
                               $(this).addClass('not-error');
                                hideErrorMessage($(this)); 
                        } else {
                                $(this).removeClass('not-error').addClass('error');
                                 showErrorMessage($(this), "*Please, enter your name including only letters");
                         }
            break;
            
            case 'user-email': 
                var regExpEmail = /^([a-z0-9_.-]+)@([a-z0-9_.-])+\.[a-z0-9]+\.*[a-z]*/;
                
                        if(value=="" || regExpEmail.test(value)) {
		                      $(this).addClass('not-error');
                                hideErrorMessage($(this));
                        } else {
                                $(this).removeClass('not-error').addClass('error');
                                showErrorMessage($(this), "*Email is not valid. Please enter a valid email");
                        }
            break;
            
            case 'user-message':
                
                        if(value == "") {
                                $(this).removeClass('not-error').addClass('error');
                                showErrorMessage($(this), "*Not all fields are filled");
                        } else {
                             $(this).addClass('not-error');
                            hideErrorMessage($(this));
                        }
            break;
                          
        };//end switch
    });// end blur
    
    
    //FORM SUBMIT 
      
    $('#form1').submit(function () { 
        var entryField = $(this).find(".footer-form");
        
        entryField.each(function () {
            if ($(this).val() == "") {
                $(this).removeClass('not-error').addClass('error');
                $(this).trigger("focus");
                showErrorMessage($(this), "*Not all fields are filled");
            }
        });
        
        if(entryField.hasClass("error")){ 
                $(".error").trigger("focus");
                showErrorMessage($(this), "*Not all fields are filled");
            } else {
                alert("OK");
            }
        
    return false;
        
    }); //end submit

});//end jQuery
                    