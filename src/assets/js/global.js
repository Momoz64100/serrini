$(function () {
    $(window).on('load', function () {
        $('.sidebar-collapse a').click(function () {
            $('li').removeClass('active');
            $(this).closest('li').addClass('active');
        });

        $('.collapser a').click(function (event) {
            $('.collapser').toggleClass('active');
        });

        $('.check-link').click(function (event) {
            // $(this).toggleClass('active');
            // console.log($(this).cheked);            
        });
    });
});

