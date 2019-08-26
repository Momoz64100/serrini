$(function () {
    $(window).on('load', function () {
        $('.sidebar-collapse a').click(function () {
            $('li').removeClass('active');
            $(this).closest('li').addClass('active');
        });

        $('.collapser a').click(function (event) {
            $('.collapser').toggleClass('active');
        });
    });
});

