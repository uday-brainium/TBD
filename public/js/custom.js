var ww = $(window).width();

$(window).resize(function() {

    //sayHellow();
    navAppear();
});

$(".hamburger").on('click', function() {
    $(this).toggleClass('close');
    $(".navigation").fadeToggle();

    if ($(this).hasClass("close")) {
        $(".navigation").css({
            'display': 'flex'
        });
    } else {
        $(".navigation").css({
            'display': 'none'
        });
    }
});


function navAppear() {
    if ($(window).width() < 767) {
        if ($(".navigation").is(":visible") == true) {
            $(".navigation").hide();
        }
    } else {
        $(".navigation").show().css({
            'display': 'flex'
        });
    }
}

touchHideMobile()

function touchHideMobile() {
    $('.navigation, .hamburger').on('touchstart click', function(e) {
        e.stopImmediatePropagation();
    });

    $(document).on('touchstart click', function(e) {
        if (
            e.target.className !== "navigation" &&
            e.target.className !== "hamburger"
        ) {
            $(".navigation").hide();
            $(".hamburger").removeClass("close");

        }

    });
}
