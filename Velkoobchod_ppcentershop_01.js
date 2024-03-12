$(function () {
/*toggle active class ve faq*/
  $(".contact-faq-question p").on("click", function () {
    $(this).parent().toggleClass("active");
  });
});

if (document.body.classList.contains("type-detail")) {
document.addEventListener("DOMContentLoaded", function (event) {
		function cardHeight() {
			if ($(".card-text").length > 1) {
				let cardHeight = 0;

				$(".card-text").css("min-height", "");

				$(".card-text").each(function () {
					var thisHeight = $(this).outerHeight();
					if (thisHeight > cardHeight) {
						cardHeight = thisHeight;
					}
				});
				$(".card-text").css("min-height", cardHeight);
			}
		}
		cardHeight();
		window.addEventListener("resize", cardHeight);
});
}
