$(function () {
/*toggle active class ve faq*/
  $(".contact-faq-question p").on("click", function () {
    $(this).parent().toggleClass("active");
  });
});
