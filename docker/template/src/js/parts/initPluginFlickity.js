import { $, wndW, wndH } from './_utility';

/* Flickity */
function initPluginFlickity() {
    if (typeof window.Flickity === 'undefined') {
        return;
    }

    const self = this;

    function addDefaultArrows($carousel) {
        $('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="nk-icon-arrow-left"></span></div>').on('click', () => {
            $carousel.flickity('previous');
        }).appendTo($carousel);

        $('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="nk-icon-arrow-right"></span></div>').on('click', () => {
            $carousel.flickity('next');
        }).appendTo($carousel);
    }

    function updateCustomArrows($carousel) {
        const data = $carousel.children('.nk-carousel-inner').data('flickity');
        const currIndex = data.selectedIndex;
        let nextIndex;
        let prevIndex;

        // get next and prev cells
        if (currIndex === 0) {
            nextIndex = 1;
            prevIndex = data.cells.length - 1;
        } else if (currIndex === data.cells.length - 1) {
            nextIndex = 0;
            prevIndex = data.cells.length - 2;
        } else {
            nextIndex = currIndex + 1;
            prevIndex = currIndex - 1;
        }
        const $nextCell = $(data.cells[nextIndex].element);
        const $prevCell = $(data.cells[prevIndex].element);
        const $currCell = $(data.cells[currIndex].element);

        // get name and sources
        const nextName = $nextCell.find('.nk-carousel-item-name').text();
        const prevName = $prevCell.find('.nk-carousel-item-name').text();
        const currName = $currCell.find('.nk-carousel-item-name').html();
        const currLinks = $currCell.find('.nk-carousel-item-links').html();

        // add info to buttons
        $carousel.find('.nk-carousel-next > .nk-carousel-arrow-name').html(nextName);
        $carousel.find('.nk-carousel-prev > .nk-carousel-arrow-name').html(prevName);
        $carousel.find('.nk-carousel-current > .nk-carousel-name').html(currName);
        $carousel.find('.nk-carousel-current > .nk-carousel-links').html(currLinks);
    }

    // prevent click event fire when drag carousel
    function noClickEventOnDrag($carousel) {
        $carousel.on('dragStart.flickity', function carouselOnDragStart() {
            $(this).find('.flickity-viewport').addClass('is-dragging');
        });
        $carousel.on('dragEnd.flickity', function carouselOnDragEnd() {
            $(this).find('.flickity-viewport').removeClass('is-dragging');
        });
    }

    // carousel 1
    const $carousel1 = $('.nk-carousel');
    if ($carousel1.length) {
        $carousel1.children('.nk-carousel-inner').each(function eachCarousel1() {
            $(this).flickity({
                pageDots: $(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                cellAlign: $(this).parent().attr('data-cell-align') || 'center',
            });
            if ($(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows($(this));
            }
            updateCustomArrows($(this).parent());
        }).on('select.flickity', function carousel1OnSelect() {
            updateCustomArrows($(this).parent());
        });
        $carousel1.on('click', '.nk-carousel-next', function carousel1NextOnClick() {
            $(this).parent().children('.nk-carousel-inner').flickity('next');
        });
        $carousel1.on('click', '.nk-carousel-prev', function carousel1PrevOnClick() {
            $(this).parent().children('.nk-carousel-inner').flickity('previous');
        });
        noClickEventOnDrag($carousel1.children('.nk-carousel-inner'));
    }

    // carousel 2
    $('.nk-carousel-2 > .nk-carousel-inner').each(function eachCarousel2() {
        $(this).flickity({
            pageDots: $(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            cellAlign: $(this).parent().attr('data-cell-align') || 'center',
        });
        if ($(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows($(this));
        }
        noClickEventOnDrag($(this));
    });

    // carousel 3
    const $carousel3 = $('.nk-carousel-3');
    // set height for items
    function setHeightCarousel3() {
        $carousel3.each(function eachCarousel3() {
            const $allImages = $(this).find('img');
            const size = $(this).attr('data-size') || 0.8;
            let resultH = wndH * size;
            const maxItemW = Math.min($(this).parent().width(), wndW) * size;
            $allImages.each(function eachCarousel3Images() {
                if (this.naturalWidth && this.naturalHeight && resultH * this.naturalWidth / this.naturalHeight > maxItemW) {
                    resultH = maxItemW * this.naturalHeight / this.naturalWidth;
                }
            });
            $allImages.css('height', resultH);
            $(this).children('.nk-carousel-inner').flickity('reposition');
        });
    }
    if ($carousel3.length) {
        $carousel3.children('.nk-carousel-inner').each(function eachCarousel3() {
            $(this).flickity({
                pageDots: $(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                cellAlign: $(this).parent().attr('data-cell-align') || 'center',
            });
            updateCustomArrows($(this).parent());
            if ($(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows($(this));
            }
        }).on('select.flickity', function carousel3OnSelect() {
            updateCustomArrows($(this).parent());
        });
        $carousel3.on('click', '.nk-carousel-next', function carousel3OnNextClick() {
            $(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('next');
        });
        $carousel3.on('click', '.nk-carousel-prev', function carousel3OnPrevClick() {
            $(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('previous');
        });
        setHeightCarousel3();
        self.debounceResize(setHeightCarousel3);
        noClickEventOnDrag($carousel3.children('.nk-carousel-inner'));
    }

    // update products carousel
    const $storeCarousel = $('.nk-carousel-1, .nk-carousel-2, .nk-carousel-3').filter('.nk-store');
    function updateStoreProducts() {
        $storeCarousel.each(function eachStoreCarousel() {
            let currentTallest = 0;
            let currentRowStart = 0;
            const rowDivs = [];
            let topPosition = 0;
            let currentDiv = 0;
            let $el;
            $(this).find('.nk-product').each(function eachProduct() {
                $el = $(this);
                $el.css('height', '');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].css('height', currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].css('height', currentTallest);
                }
            });
        });
    }
    if ($storeCarousel.length) {
        self.debounceResize(updateStoreProducts);
        updateStoreProducts();
    }

    // check for images loaded and call resize
    if (typeof $.fn.imagesLoaded !== 'undefined') {
        $('.nk-carousel, .nk-carousel-1, .nk-carousel-2, .nk-carousel-3').each(function eachCarousel() {
            if ($(this).find('img').length) {
                $(this).imagesLoaded({}, () => {
                    self.debounceResize();
                });
            }
        });
    }
}

export { initPluginFlickity };
