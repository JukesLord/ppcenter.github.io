(function ($, window, document) {

    $(function () {

        $('.js-validator-msg').on('click', function () {
            $(this).remove();
        });
        /* if ($('#header #navigation .menu').length) {
             setTimeout(function () {
                 $('#header #navigation .menu').css('max-width', '100%');
             }, 2000);
         }*/

        if (typeof defaultProductsCount !== 'undefined') {
            if (defaultProductsCount !== false) {
                $('body').addClass('default-products-count');
            }
        }

        if (typeof mobileBreadcrumbs !== 'undefined') {
            if (mobileBreadcrumbs !== false) {
                $('body').addClass('mobile-breadcrumbs');
            }
        }

        if (typeof bannersOverlayDisable !== 'undefined') {
            if (bannersOverlayDisable !== false) {
                $('body').addClass('banners-overlay-disable');
            }
        }

        var navFunctions = function () {
            if ($(window).width() < 768) {
                setTimeout(function () {
                    $('.top-navigation-bar .container .nav-part').prepend($('#header .site-name'));
                }, 70);
            } else {
                if ($('.top-navigation-bar .container .nav-part .site-name').length) {
                    $('#header .header-top > div:first-child').prepend($('.top-navigation-bar .container .nav-part .site-name'));
                }

                $('#header .menu-helper li.ext').hover(function (e) {
                    e.stopImmediatePropagation();
                });
            }

            var navOffset = $('body').hasClass('admin-logged') ? 130 : 105;

            $(window).scroll(function () {
                var scrollFromTop = $(window).scrollTop();

                if ($(window).width() < 768) {
                    if (scrollFromTop > 32) {
                        $('body').addClass('headerScrolled');
                    } else {
                        $('body').removeClass('headerScrolled');
                    }
                } else {
                    if (scrollFromTop > navOffset + 1) {
                        $('#header').addClass('fixed-menu');
                        $('.top-navigation-bar').addClass('fixed-menu');
                        $('#header').css('top', -73);

                        if ($('body').hasClass('admin-logged')) {
                            $('.overall-wrapper').css('padding-top', navOffset - 15);
                        } else {
                            $('.overall-wrapper').css('padding-top', navOffset + 10);
                        }
                    } else {
                        $('#header').removeClass('fixed-menu');
                        $('.top-navigation-bar').removeClass('fixed-menu');
                        $('#header').css('top', 'inherit');
                        $('.overall-wrapper').css('padding-top', '0');
                    }
                }
            });

            if ($('.top-nav-button-login').length) {
                $('.header-top').append($('.top-nav-button-login'));
            }
            if ($('.top-nav-button-account').length) {
                $('.header-top').append($('.top-nav-button-account'));
            }


            if ($(window).width() >= 768) {
                if ($('.top-navigation-contacts').length) {
                    $('.top-navigation-contacts').insertAfter($('#header .header-top .site-name').parent());

                    if (!$('.top-navigation-contacts .contact-photo').length) {
                        $('.top-navigation-contacts').prepend($('<div class="contact-photo"></div>'));

                        if (!$('.top-navigation-contacts .project-phone').length) {
                            $('.top-navigation-contacts .project-email').addClass('show');
                        }

                        if (typeof(Storage) !== "undefined") {
                            if (sessionStorage.contactPhoto) {
                                $('.top-navigation-contacts .contact-photo').html(sessionStorage.contactPhoto);
                            }
                            else {
                                $('.top-navigation-contacts .contact-photo').load('/kosik/ .contact-box > img');
                                setTimeout(function () {
                                    var photoHtml = $('.top-navigation-contacts .contact-photo').html();
                                    sessionStorage.contactPhoto = photoHtml;
                                }, 800);
                            }
                        } else {
                            $('.top-navigation-contacts .contact-photo').load('/kosik/ .contact-box > img');
                        }
                    }
                }
            }
        };

        navFunctions();

        $(window).resize(function () {
            navFunctions();
        });

        if (typeof hideProductsQuantity === 'undefined') {
            var productsQuantity = function () {
                $('.products-block .product').each(function () {
                    var $thisProduct = $(this);
                    var $thisProductTools = $thisProduct.find('.p-tools');
                    var $thisProductForm = $thisProduct.find('form.pr-action');

                    if ($thisProductForm.length) {
                        if (!$thisProduct.find('form.pr-action .quantity').length) {
                            if ($thisProductForm.find('input[name="amount"]').length) {
                                $('<span class="quantity">' +
                                    '<span class="increase"></span><span class="decrease"></span></span>').prependTo($thisProductForm);
                                $thisProductForm.find('.quantity').prepend($thisProductForm.find('input[name="amount"]'));
                                $thisProductForm.find('input[name="amount"]').addClass('amount');
                                $thisProductForm.find('input[name="amount"]').attr('type', 'number');
                                $thisProductForm.find('input[name="amount"]').attr('data-max', '999');
                                $thisProductForm.find('input[name="amount"]').attr('data-min', '1');
                                $thisProductForm.find('input[name="amount"]').attr('min', '1');
                                $thisProductForm.find('input[name="amount"]').attr('max', '999');
                                $thisProductForm.find('input[name="amount"]').attr('data-testid', 'cartAmount');
                            } else {
                                $('<span class="quantity">' +
                                    '   <input type="number" value="1" name="amount" class="amount" autocomplete="off" data-decimals="0" data-max="999" data-min="1" step="any" min="1" max="999" data-testid="cartAmount" aria-label="Množství">' +
                                    '   <span class="increase"></span><span class="decrease"></span></span>').prependTo($thisProductForm);
                            }
                        }
                    } else {
                        if (!$thisProduct.find('.p-tools .quantity').length) {
                            if ($thisProductForm.find('input[name="amount"]').length) {
                                $('<span class="quantity">' +
                                    '<span class="increase"></span><span class="decrease"></span></span>').prependTo($thisProductForm);
                                $thisProductForm.find('.quantity').prepend($thisProductForm.find('input[name="amount"]'));
                                $thisProductForm.find('input[name="amount"]').addClass('amount');
                                $thisProductForm.find('input[name="amount"]').attr('type', 'number');
                                $thisProductForm.find('input[name="amount"]').attr('data-max', '999');
                                $thisProductForm.find('input[name="amount"]').attr('data-min', '1');
                                $thisProductForm.find('input[name="amount"]').attr('min', '1');
                                $thisProductForm.find('input[name="amount"]').attr('max', '999');
                                $thisProductForm.find('input[name="amount"]').attr('data-testid', 'cartAmount');
                                $thisProductForm.find('input[name="amount"]').attr('disabled', 'disabled')
                            } else {
                                $('<span class="quantity">' +
                                    '   <input type="number" value="1" name="amount" disabled class="amount" autocomplete="off" data-decimals="0" data-max="999" data-min="1" step="any" min="1" max="999" data-testid="cartAmount" aria-label="Množství">' +
                                    '   <span class="increase"></span><span class="decrease"></span></span>').prependTo($thisProductTools);
                            }

                            $thisProductTools.find('.quantity').click(function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        }
                    }

                });
            };

            productsQuantity();

            document.addEventListener('ShoptetDOMContentLoaded', function () {
                productsQuantity();
            });
        }

        if ($('.type-post span[itemprop="image"]').length) {
            var imageUrl = $('.type-post span[itemprop="image"] meta[itemprop="url"]').attr('content');
            var image = $('<div class="article-image"><img src="' + imageUrl + '" </div>');

            image.insertBefore('.news-item-detail > .text');
        }

        if ($('footer .instagram-widget').length) {
            $('.instagram-widget').parent().addClass('instagram-line');
            $('.instagram-line .instagram-follow-btn a').text('Sledujte nás na Instagramu');
            $('.instagram-widget').prepend($('.instagram-line .instagram-follow-btn'));
        }

        var captionWrap = function (element) {
            element.find('.extended-banner-title').wrap('<div class="banner-caption">');
            element.find('.banner-caption').append(element.find('.extended-banner-text'));
            element.find('.banner-caption').append(element.find('.extended-banner-link'));
        };

        if ($('.next-to-carousel-banners').length) {
            $('.next-to-carousel-banners').prepend('<div class="normal-banners-line"></div>');

            if ($('.next-to-carousel-banners').find('.benefit-banner').length) {
                $('.next-to-carousel-banners').parents('.banners-row').append('<div class="benefits-banners-line"></div>');

                $('.next-to-carousel-banners').find('.benefit-banner').each(function () {
                    $('.benefits-banners-line').append($(this).parents('.banner-wrapper'));
                });
            }

            $('.next-to-carousel-banners > .banner-wrapper').each(function () {
                $('.normal-banners-line').append($(this));

                var $thisItem = $(this);
                if ($(this).find('.extended-banner-title')) {
                    captionWrap($thisItem);
                }
            });
        }

        if ($('#carousel .item .extended-banner-title').length) {
            $('#carousel .item').each(function () {
                var $thisItem = $(this);
                if ($(this).find('.extended-banner-title')) {
                    captionWrap($thisItem);
                }
            });
        }

        if ($('.type-index .benefitBanner').length) {
            $('.banners-row').first().append($('.type-index .benefitBanner'));
        }

        $('.body-banners .banner-wrapper').each(function () {
            var $thisItem = $(this);
            if ($(this).find('.extended-banner-title')) {
                captionWrap($thisItem);
            }
        });

        $('.footer-banners .footer-banner').each(function () {
            var $thisItem = $(this);
            if ($(this).find('.extended-banner-title')) {
                captionWrap($thisItem);
            }
        });

        if ($('.footer-banners .footer-banner').length > 2) {
            $('.footer-banners').addClass('multiply');
        }

        $('#carousel .carousel-inner .item').each(function () {
            var thisItem = $(this);
            if ($(this).find('.extended-banner-title').text() == '') {
                thisItem.find('.banner-caption').addClass('empty');
            }
        });

        $('.next-to-carousel-banners .banner-wrapper').each(function () {
            var thisItem = $(this);
            if ($(this).find('.extended-banner-title').text() == '') {
                thisItem.find('.banner-caption').addClass('empty');
            }
        });

        if ($(window).width() > 1200) {
            if ($('.ordering-process #checkoutSidebar').length) {
                var topOffset = $('.ordering-process #checkoutSidebar').offset().top;

                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();

                    if (scrollTop > topOffset) {
                        $('.ordering-process #checkoutSidebar').addClass('fixed');
                    } else {
                        $('.ordering-process #checkoutSidebar').removeClass('fixed');
                    }
                });
            }
        }

        /*var couponCheck = function () {
            if ($('.cart-summary .discount-coupon').length) {
                $('.cart-summary .discount-coupon').parent().addClass('coupon-box');
            }
        };

        couponCheck();

        $(document).ajaxStop(couponCheck());*/

        var sortingFunction = function () {
            if ($('.category-header fieldset').length) {
                if ($(window).width() > 992) {
                    $('.category-header fieldset').hover(function () {
                        $(this).addClass('hovered');
                    });
                    $('.category-header fieldset').mouseleave(function () {
                        $(this).removeClass('hovered');
                    });
                } else {
                    $('.category-header fieldset').click(function () {
                        $(this).toggleClass('hovered');
                    });
                }
            }
        };

        sortingFunction();

        document.addEventListener('ShoptetDOMPageContentLoaded', function () {
            sortingFunction();
        });

        if ($('body.type-category').length || $('body.type-detail').length) {
            var cartSideBox = $('<div class="cart-sidebar-box"><h4></h4><div class="cart-sidebar-inner"></div></div>');
            $('aside .sidebar-inner:first-child').prepend(cartSideBox);
            $('aside .cart-sidebar-box h4').text($('#header .cart-count .sr-only').text());
            $('.cart-sidebar-box .cart-sidebar-inner').hide();
        }

        var cartSidebar = function () {
            if ($('body.type-category').length || $('body.type-detail').length) {
                if (!$('body.one-column-body').length) {
                    shoptet.global.showPopupWindow('cart', true);
                    $('.cart-sidebar-box .cart-sidebar-inner').prepend($('.popup-widget.cart-widget'));
                }
            }
        };

        if ($(window).width() > 768) {
            cartSidebar();

            $('.cart-sidebar-box .cart-sidebar-inner').fadeIn(750);

            /*document.addEventListener('ShoptetCartAddCartItem', function () {
                cartSidebar();
            });*/

            document.addEventListener('ShoptetCartUpdated', function () {
                cartSidebar();
            });
        }

        var sidebarFunctions = function () {
            if ($('body.type-category aside').length || $('body.type-detail aside').length) {
                var $sidebarBox = $('aside .cart-sidebar-box');
                var $sidebarInner = $('aside .sidebar-inner');
                var $sidebarBoxInner = $('aside .cart-sidebar-box .cart-sidebar-inner');
                var sidebarOffset = $sidebarBox.offset().top;

                $('.cart-sidebar-box h4').click(function () {
                    $sidebarBoxInner.slideToggle();
                    $(this).toggleClass('rotate');
                });

                $(window).scroll(function () {
                    var scrollFromTop = $(window).scrollTop();

                    if ($(window).width() > 768) {
                        if ((scrollFromTop + 43) > sidebarOffset) {
                            $sidebarBox.addClass('fixed');
                            $sidebarInner.css('padding-top', $sidebarBox.height() - 48);

                            setTimeout(function () {
                                $sidebarBox.addClass('showed');

                                return false;
                            }, 100);
                        } else {
                            $sidebarBox.removeClass('fixed');
                            $sidebarBox.removeClass('showed');
                            $sidebarInner.css('padding-top', 0);
                        }
                    }
                });
            }
        };

        sidebarFunctions();


        /* document.addEventListener('ShoptetCartAddCartItem', function() {
             // for example, you want to get heading of box
             // from /kosik/ (cart) page
             shoptet.ajax.makeAjaxRequest(
                 '/kosik/',
                 shoptet.ajax.requestTypes.get,
                 '',
                 {
                     'success': function(response) {
                         // get payload from request
                         var payload = response.getPayload();
                         // but payload is a string, we need to create HTML document from it
                         // let's use our helper function to do that
                         var cartContent = shoptet.common.createDocumentFromString(payload);
                         var helpBoxHeading = cartContent.querySelector('.checkout-box-wrapper h4').innerText;
                         if (helpBoxHeading) {
                             // do your stuff with this text
                             console.log(helpBoxHeading);
                         }
                     }
                 }
             );
         });*/

        /*  document.addEventListener('ShoptetCartAddCartItem', function () {
              /!*document.getElementById('new-filter-btn').addEventListener("click", function(e) {
                  shoptet.scripts.signalCustomEvent('ShoptetPageFilterValueChange', e.target);
              });*!/

             /!* shoptet.scripts.signalCustomEvent('ShoptetDOMCartContentLoaded', document);*!/
              shoptet.global.showPopupWindow('cart', true);
              $('body').removeClass('.cart-window-visible');
              cartSidebar();
          });*/


        if ($('#checkoutSidebar').length) {
            $('#checkoutSidebar').prepend($('.checkout-box'));
        }

        if ($('.products-related-header').length) {
            $('.p-detail').append($('.products-related-header'));
            $('.p-detail').append($('.products.products-related'));
        }

        var navFunction = function () {
            $('.top-navigation-bar .container').prepend('<div class="msg-part"></div>');
            $('.top-navigation-bar .container').append('<div class="nav-part"></div>');

            $('.top-navigation-bar .nav-part').append($('.top-navigation-menu'));
            $('.top-navigation-bar .nav-part').append($('.top-navigation-tools'));

            if ($('.site-msg.information').length) {
                $('.top-navigation-bar .msg-part').append($('.site-msg.information'));
            }

            if ($(window).width() < 768) {
                $('.top-navigation-bar .msg-part .information').insertBefore($('header'));
            }
        };

        navFunction();

        /*$(window).load(function () {
            setTimeout(function () {
                $(window).trigger("resize");
            }, 500);
        });*/

        if ($('#formNewsletterWidget').length) {
            $('#formNewsletterWidget').parents('.extended').addClass('newsletter');
        }

        /*if ($('.category-perex').length) {
            $('.category-perex').insertAfter($('.category-title'));
        }*/

        if ($('.variant-list').length) {
            $('.product-top .detail-parameters').appendTo($('.p-detail-info'));
        }

        if ($('.sidebar-inner .box-filters').length) {
            $('.sidebar-inner .box-filters .filters-wrapper').prepend('<h4>Filtry</h4>');

            if ($('html').attr('lang') !== 'cs') {
                if ($('html').attr('lang') === 'sk') {
                    $('.sidebar-inner .box-filters .filters-wrapper > h4').text('Filtre');
                } else {
                    $('.sidebar-inner .box-filters .filters-wrapper > h4').text('Filters');
                }


            }
        }

        if ($('.product .widget-parameter-wrapper').length) {
            $('.product .widget-parameter-wrapper').each(function () {
                var product = $(this).parent().parent();
                product.find('.p-in').append($(this));
            });
        }

        if ($('aside .box-poll').length) {
            $('.box-poll').before($('.box-poll').find('h4'));
        }

        if ($('aside .box-section1').length) {
            $('.box-section1').before($('.box-section1').find('h4'));
        }

        if ($(window).width() > 992) {
            if ($('.p-detail-inner').length) {
                $('.p-info-wrapper').prepend($('.p-detail-info'));
                $('.p-info-wrapper').prepend($('.p-detail-inner-header'));
            }
        } else {
            if ($('.p-image-wrapper').length) {
                $('.p-detail-inner-header h1').after($('.p-image-wrapper'));
            }
        }

        if (!$('.popup-widget.cart-widget .price-summary').length) {
            $('<div class="price-summary"><div class="price-wrapper"></div></div>').insertBefore($('.popup-widget.cart-widget .cart-widget-button'));

            if ($('#header .cart-count').hasClass('full')) {
                if (typeof(Storage) !== "undefined") {
                    if (sessionStorage.cartWindowPriceLabel && sessionStorage.cartWindowPriceLabel !== "") {
                        $('.popup-widget.cart-widget .price-summary .price-wrapper').html(sessionStorage.cartWindowPriceLabel);
                    }
                    else {
                        $('.popup-widget.cart-widget .price-summary .price-wrapper').load('/kosik/ .summary-wrapper .price-wrapper .price-label.price-primary');
                        setTimeout(function () {
                            var labelHtml = $('.popup-widget.cart-widget .price-summary .price-wrapper').html();
                            sessionStorage.cartWindowPriceLabel = labelHtml;
                        }, 800);
                    }
                } else {
                    $('.popup-widget.cart-widget .price-summary .price-wrapper').load('/kosik/ .summary-wrapper .price-wrapper .price-label.price-primary');
                }
            }
        }

        setTimeout(function () {
            var priceFromCart = $('#header .btn.cart-count .cart-price').text();

            if (priceFromCart !== 'undefined') {
                if ($('.popup-widget.cart-widget .price-summary .price-wrapper .price.price-primary').length) {
                    $('.popup-widget.cart-widget .price-summary .price-wrapper .price.price-primary').text(priceFromCart);
                } else {
                    $('<strong class="price price-primary">' + priceFromCart + '</strong>').insertAfter($('.popup-widget.cart-widget .price-summary .price-wrapper .price-label.price-primary'));
                }
            }

            document.addEventListener('ShoptetCartUpdated', function (e) {
                $('.popup-widget.cart-widget .price-summary .price-wrapper .price.price-primary').text($('#header .btn.cart-count .cart-price').text());
            });
        }, 300);

        $(window).load(function () {
            if (typeof hpCategoriesUrl !== 'undefined') {
                if (hpCategoriesUrl !== false) {
                    if ($('.in-index').length && (typeof hpCategoriesUrl !== 'undefined')) {
                        if (hpCategoriesUrl !== 'false' && hpCategoriesUrl !== '') {
                            if ($('#dklabBanplusUvod').length && $('#dklabBanplusIkony').length < 1) {
                                $('<div class="hp-categories"><div class="h4 homepage-group-title"></div><div class="hp-categories-posts"></div></div>').insertAfter($('#dklabBanplusUvod'));
                            } else if ($('#dklabBanplusIkony').length) {
                                $('<div class="hp-categories"><div class="h4 homepage-group-title"></div><div class="hp-categories-posts"></div></div>').insertAfter($('#dklabBanplusIkony'));
                            } else {
                                $('.content-wrapper-in .banners-row:first-child').append($('<div class="hp-categories"><div class="h4 homepage-group-title"></div><div class="hp-categories-posts"></div></div>'));
                            }

                            var initSlickCategories = function () {
                                setTimeout(function () {
                                    if (typeof hpCategoriesGrid === 'undefined') {
                                        $('.hp-categories-posts .news-wrapper').addClass('carousel');

                                        if ($('.hp-categories-posts .news-wrapper .news-item').length > 8) {
                                            $('.hp-categories-posts .news-wrapper').slick({
                                                slidesToShow: 4,
                                                slidesToScroll: 1,
                                                infinite: true,
                                                center: true,
                                                autoplay: true,
                                                dots: false,
                                                autoplaySpeed: 3000,
                                                responsive: [
                                                    {
                                                        breakpoint: 992,
                                                        settings: {
                                                            slidesToShow: 3,
                                                            slidesToScroll: 1,
                                                            dots: false
                                                        }
                                                    }, {
                                                        breakpoint: 768,
                                                        settings: {
                                                            slidesToShow: 2,
                                                            slidesToScroll: 1,
                                                            dots: false
                                                        }
                                                    }, {
                                                        breakpoint: 480,
                                                        settings: {
                                                            slidesToShow: 1,
                                                            slidesToScroll: 1,
                                                            dots: false
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                }, 200);
                            };

                            var loadAndInitSlick = function () {
                                $('.hp-categories-posts').load('/' + hpCategoriesUrl + '/ #content');

                                setTimeout(function () {
                                    var titleText = $('.hp-categories-posts h1').text();
                                    $('.hp-categories .h4').text(titleText);
                                    $('.hp-categories-posts h1').remove();

                                    initSlickCategories();
                                }, 500);
                            };
                            if (typeof hpCategoriesTestMode !== 'undefined') {
                                loadAndInitSlick()
                            } else {
                                if (typeof(Storage) !== "undefined") {
                                    if (sessionStorage.homeCategories) {
                                        $('.hp-categories').html(sessionStorage.homeCategories);
                                        setTimeout(function () {
                                            initSlickCategories();
                                        }, 600);
                                    }
                                    else {
                                        $('.hp-categories-posts').load('/' + hpCategoriesUrl + '/ #content');
                                        setTimeout(function () {
                                            var titleText = $('.hp-categories-posts h1').text();
                                            $('.hp-categories .h4').text(titleText);
                                            $('.hp-categories-posts h1').remove();

                                            setTimeout(function () {
                                                var contentHtml = $('.hp-categories').html();
                                                sessionStorage.homeCategories = contentHtml;
                                                initSlickCategories();
                                            }, 100);
                                        }, 800);
                                    }
                                }
                                else {
                                    loadAndInitSlick();
                                }
                            }


                        }
                    }
                }
            }
        });

        if ($('.type-category .products-block + .banner-category').length) {
            var moveLastProduct = function () {
                $('.type-category .products-block').eq(1).find('.product').first().insertAfter($('.type-category .products-block').first().find('.product').last());
            };

            if ($(window).width() > 1500) {
                if ($('.type-category .products-block').length > 1) {
                    moveLastProduct();
                    moveLastProduct();
                }
            }

            if ($(window).width() > 600 && $(window).width() < 992) {
                if ($('.type-category .products-block').length > 1) {
                    moveLastProduct();
                }
            }
        }

        if ($('.type-detail .price-final').length) {
            $('.availability-value').append('<div class="delivery-line"></div>');
            $('.delivery-line').prepend($('.delivery-time-label'));
            $('.delivery-line').append($('.delivery-time'));

            if ($('.shipping-options').length) {
                $('.delivery-line').append($('.shipping-options'));
            }

            if ($(window).width() > 768) {
                $('<div class="price-line"></div>').insertAfter('.p-detail-info');
            } else {
                $('.product-top').append('<div class="price-line"></div>');
            }
            $('.price-line').append($('.p-final-price-wrapper'));
            $('.price-line').append($('.add-to-cart'));
            $('.price-line').append($('.availability-value'));
        }

        if ($('html').attr('lang') === 'hu') {
            if ($('.type-detail .add-to-cart-button').length) {
                $('.type-detail .add-to-cart-button').text('Kosárba teszem');
            }
        }

        if (($('.type-index').length) || ($('.type-detail').length)) {
            $('.products-block.products').addClass('carousel');

            if ($('body').hasClass('multiple-columns-body')) {
                if ($('body').hasClass('default-products-count')) {
                    if ($('body').hasClass('columns-4')) {
                        var initSlick4 = function (element) {
                            element.slick({
                                slidesToShow: 4.5,
                                swipeToSlide: true,
                                infinite: false,
                                autoplay: true,
                                dots: false,
                                autoplaySpeed: 3000,
                                responsive: [
                                    {
                                        breakpoint: 1200,
                                        settings: {
                                            slidesToShow: 3.5,
                                        }
                                    },
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }, {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 3.5,
                                        }
                                    }, {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }
                                ]
                            });


                        };

                        if (typeof productsGrid === 'undefined') {
                            var initElement4 = $('.products.carousel');
                            initSlick4(initElement4);
                        }

                        $('.shp-tab-link').click(function () {
                            if ($('.tab-content').find('.products-alternative')) {
                                setTimeout(function () {
                                    var forInit = $('.products.carousel.products-alternative');
                                    forInit.slick('unslick');
                                    initSlick4(forInit);
                                    setTimeout(function () {
                                        $(window).trigger("resize");
                                    }, 50);
                                }, 200);
                            }
                        });
                    } else {
                        var initSlick3 = function (element) {
                            element.slick({
                                slidesToShow: 3.5,
                                swipeToSlide: true,
                                infinite: false,
                                autoplay: true,
                                dots: false,
                                autoplaySpeed: 3000,
                                responsive: [
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }, {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 3.5,
                                        }
                                    }, {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }
                                ]
                            });


                        };

                        if (typeof productsGrid === 'undefined') {
                            var initElement3 = $('.products.carousel');
                            initSlick3(initElement3);
                        }

                        $('.shp-tab-link').click(function () {
                            if ($('.tab-content').find('.products-alternative')) {
                                setTimeout(function () {
                                    var forInit = $('.products.carousel.products-alternative');
                                    forInit.slick('unslick');
                                    initSlick3(forInit);
                                    setTimeout(function () {
                                        $(window).trigger("resize");
                                    }, 50);
                                }, 200);
                            }
                        });
                    }
                } else {
                    var initNowSlick = function (element) {
                        element.slick({
                            slidesToShow: 5.5,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            infinite: false,
                            autoplay: true,
                            dots: false,
                            autoplaySpeed: 3000,
                            responsive: [
                                {
                                    breakpoint: 1500,
                                    settings: {
                                        slidesToShow: 4.5,
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 3.5,
                                    }
                                },
                                {
                                    breakpoint: 992,
                                    settings: {
                                        slidesToShow: 2.5,
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 3.5,
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 2.5,
                                    }
                                }
                            ]
                        });
                    };

                    if (typeof productsGrid === 'undefined') {
                        var initNowElement = $('.products.carousel');
                        initNowSlick(initNowElement);
                    }

                    $('.shp-tab-link').click(function () {
                        if ($('.tab-content').find('.products-alternative')) {
                            setTimeout(function () {
                                var forInit = $('.products.carousel.products-alternative');
                                forInit.slick('unslick');
                                initNowSlick(forInit);
                                setTimeout(function () {
                                    $(window).trigger("resize");
                                }, 50);
                            }, 200);
                        }
                    });
                }
            } else {
                if ($('body').hasClass('default-products-count')) {
                    if ($('body').hasClass('columns-4')) {
                        var initOneSlick4 = function (element) {
                            element.slick({
                                slidesToShow: 4.5,
                                swipeToSlide: true,
                                infinite: false,
                                autoplay: true,
                                dots: false,
                                autoplaySpeed: 3000,
                                responsive: [
                                    {
                                        breakpoint: 1200,
                                        settings: {
                                            slidesToShow: 3.5,
                                        }
                                    }, {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }
                                ]
                            });
                        };
                        if (typeof productsGrid === 'undefined') {
                            var initOneElement4 = $('.products.carousel');
                            initOneSlick4(initOneElement4);
                        }
                        $('.shp-tab-link').click(function () {
                            if ($('.tab-content').find('.products-alternative')) {
                                setTimeout(function () {
                                    var forInit = $('.products.carousel.products-alternative');
                                    forInit.slick('unslick');
                                    initOneSlick4(forInit);
                                    setTimeout(function () {
                                        $(window).trigger("resize");
                                    }, 50);
                                }, 200);
                            }
                        });

                    } else {
                        var initOneSlick3 = function (element) {
                            element.slick({
                                slidesToShow: 3.5,
                                swipeToSlide: true,
                                infinite: false,
                                autoplay: true,
                                dots: false,
                                autoplaySpeed: 3000,
                                responsive: [
                                    {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 2.5,
                                        }
                                    }
                                ]
                            });
                        };

                        if (typeof productsGrid === 'undefined') {
                            var initOneElement3 = $('.products.carousel');
                            initOneSlick3(initOneElement3);
                        }

                        $('.shp-tab-link').click(function () {
                            if ($('.tab-content').find('.products-alternative')) {
                                setTimeout(function () {
                                    var forInit = $('.products.carousel.products-alternative');
                                    forInit.slick('unslick');
                                    initOneSlick3(forInit);
                                    setTimeout(function () {
                                        $(window).trigger("resize");
                                    }, 50);
                                }, 200);
                            }
                        });
                    }
                } else {
                    var initOneSlick = function (element) {
                        element.slick({
                            slidesToShow: 5.5,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            infinite: false,
                            autoplay: true,
                            dots: false,
                            autoplaySpeed: 6000,
                            responsive: [
                                {
                                    breakpoint: 1500,
                                    settings: {
                                        slidesToShow: 4.5,
                                    }
                                },
                                {
                                    breakpoint: 1200,
                                    settings: {
                                        slidesToShow: 3.5,
                                    }
                                },
                                {
                                    breakpoint: 992,
                                    settings: {
                                        slidesToShow: 2.5,
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1.5,
                                    }
                                }
                            ]
                        });
                    };

                    if (typeof productsGrid === 'undefined') {
                        var initOneElement = $('.products.carousel');
                        initOneSlick(initOneElement);
                    }

                    $('.shp-tab-link').click(function () {
                        if ($('.tab-content').find('.products-alternative')) {
                            setTimeout(function () {
                                var forInit = $('.products.carousel.products-alternative');
                                forInit.slick('unslick');
                                initOneSlick(forInit);
                                setTimeout(function () {
                                    $(window).trigger("resize");
                                }, 50);
                            }, 200);
                        }
                    });
                }

                /*$('.shp-tab-link').click(function () {
                    if ($('.tab-content').find('.products-alternative')) {
                        setTimeout(function () {
                            var forInit = $('.products.carousel.products-alternative');
                            forInit.slick('unslick');
                            initNowSlick(forInit);
                            $(window).trigger("resize");
                        }, 200);
                    }

                    if ($(this).attr('href') === '#productsAlternative') {
                        console.log('fdfdf');
                    }
                });*/
            }

            $('.products.carousel').each(function () {
                $(this).on('afterChange', function (event, slick, currentSlide) {
                    $thisSlick = $(this);
                    if (slick.currentSlide === (slick.slideCount - (slick.options.slidesToShow - 0.5))) {
                        $thisSlick.slick("slickGoTo", 0);
                    }
                });
            });

            $('.slick-arrow').click(function () {
                if ($(this).hasClass('slick-disabled')) {
                    if ($(this).hasClass('slick-prev')) {
                        var slides = $(this).parent().find('.slick-slide').length;
                        $(this).parent().slick("slickGoTo", 4);
                    } else {
                        $(this).parent().slick("slickGoTo", 0);
                    }
                }
            });
        }

        if (typeof filtersInContent !== 'undefined') {
            if (filtersInContent !== false) {
                $('.sidebar .box-filters').insertAfter('#category-header');


                document.addEventListener('ShoptetDOMPageContentLoaded', function () {
                    $('.sidebar .box-filters').insertAfter('#category-header');
                });
            }
        }

        setTimeout(function () {
            if ($('body').find('#register-form').length) {
                $('#register-form #additionalInformation').find('input').each(function () {
                    $(this).addClass('no-js-validation');
                });
            }
        }, 500);

        if (typeof hpBlogUrl !== 'undefined') {
            if (hpBlogUrl !== false) {
                if ($('.in-index').length && (typeof hpBlogUrl !== 'undefined')) {
                    if (hpBlogUrl !== 'false' && hpBlogUrl !== '') {
                        var receptyWrap = $('<div class="recipes-section"><div class="container"></div></div>');

                        receptyWrap.insertBefore('footer');

                        $('.recipes-section .container').load('/' + hpBlogUrl + '/ .content-inner');
                    }
                }
            }
        }

        if (typeof hpRating !== 'undefined') {
            if (hpRating !== false) {
                if ($('.in-index').length && (typeof hpRating !== 'undefined')) {
                    if (hpRating !== 'false' && hpRating !== '') {
                        var ratingWrap = $('<div class="hp-ratings"><div class="container"></div></div>');

                        if ($('#dklab_instagram_widget').length) {
                            ratingWrap.insertBefore('#dklab_instagram_widget');
                        } else {
                            ratingWrap.insertBefore('footer');
                        }/**/


                        $('.hp-ratings .container').load('/hodnoceni-obchodu/ .votes-wrap', function () {
                            $('.hp-ratings .container .vote-wrap').each(function () {
                                $(this).find('.vote-content').prepend($(this).find('.vote-summary'));
                            });
                        });
                    }
                }
            }
        }

        setTimeout(function () {
            if ($(window).width() < 768) {
                if ($('#navigation .has-third-level').length) {
                    $('#navigation .has-third-level').each(function () {
                        var thisSection = $(this);
                        var mainSection = $(this).find('div > a');

                        mainSection.click(function (e) {
                            $('#navigation .submenu-arrow').click(function (e) {
                                if (thisSection.hasClass('clicked')) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();

                                    thisSection.toggleClass('clicked');
                                }
                            });

                            if (!thisSection.hasClass('clicked')) {
                                e.preventDefault();

                                thisSection.toggleClass('clicked');
                            }
                        });
                    });
                }
            }
        }, 1200);

        setTimeout(function () {
            if (!$('.recipes-section #newsWrapper').length) {
                $('.recipes-section').remove();
            }
        }, 2000);

        if ($('footer .contact-box').length) {
            var socials = $('<div class="contact-socials"></div>');
            socials.insertAfter($('footer .contact-box'));

            if ($('footer .contact-box .facebook').length) {
                $('footer .contact-socials').append($('footer .contact-box .facebook'));
            }
            if ($('footer .contact-box .instagram').length) {
                $('footer .contact-socials').append($('footer .contact-box .instagram'));
            }
            if ($('footer .contact-box .twitter').length) {
                $('footer .contact-socials').append($('footer .contact-box .twitter'));
            }
            if ($('footer .contact-box .youtube').length) {
                $('footer .contact-socials').append($('footer .contact-box .youtube'));
            }
            if ($('footer .contact-box .tiktok').length) {
                $('footer .contact-socials').append($('footer .contact-box .tiktok'));
            }
        }

        if ($('footer .site-name').length) {
            $('footer .site-name > a').wrap('<div class="inner-box"></div>');
            $('footer .custom-footer').prepend($('footer .site-name'));

            /*if ($('footer .contact-box').length) {
                $('footer .site-name .inner-box').append($('footer .contact-box').clone());
            }*/

            $('footer .site-name .inner-box').append($('.top-navigation-contacts > strong').clone());

            $('footer .site-name .inner-box').append($('<div class="contacts"></div>'));

            $('footer .site-name .inner-box .contacts').append($('.top-navigation-contacts .project-phone').clone());
            $('footer .site-name .inner-box .contacts').append($('.top-navigation-contacts .project-email').clone());
        }

        /* if ($('footer .extended').length) {
             $('footer .extended').insertBefore($('footer'));
         }*/

        if ($('footer .copyright').length) {
            $('<div class="back-to-top"><img src="https://cdn.myshoptet.com/usr/shoptet.tomashlad.eu/user/documents/extras/adamin/img/icons/arrow-left.svg" /> </div>').insertAfter($('footer .copyright'));

            $('.back-to-top').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
            });
        }

    });

}(window.jQuery, window, document));
