/* $("#preamble-btn-1").click(function(){
    $("#preamble-btn-2").css({
        "background":"blue",
        "font-size":"20px",
    });
})



$("#preamble-btn-2").click(function(){
    $("#preamble-btn-1").toggleClass("rotate")
}) */

$(".header-left").click(function(){
    $("#menu").toggleClass("active")
})

$(document).scroll(function(){
    let distance = $(document).scrollTop()
    let height = $(document).height()-$(window).height();
    let ratio = distance/height;

    $(".header-right").html(ratio)

   /* $("h1").css({
        "transform":"rotate(300deg)"
    }) */
})

$(".album-thumbs").flickity({
    wrapAround: true,
    pageDots: false
})