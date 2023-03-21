$(document).ready(function () {

    $('.moneyformat').moneyFormat();

    $('#MainContact').validate({
        rules: {
            'email': {
                email: true
            },
            'confirmEmail': {
                equalTo: "#email"
            }
        }
    });

    ////Drop Down for the product details section for mobile
    $('.dropdown-toggle').click(function(e){
        e.stopPropagation();
        var $this = $(this);
        var $target = $($this.data('target'));

        $($this).parent().parent().toggleClass('show');
        $this.find('.glyphicon').toggleClass('glyphicon-menu-right glyphicon-menu-down');
        $target.toggleClass('open');

        if ($('#DetailSummary').find('.readShowMore .summary').height() >= 98) {
            $('.toLess').show();
        }
    });

    //Rental hero dropdown
    //Instantiate the custom dropdown
    $('.ValoreDropdown-rental').valoreDropdown({
        onSelect: function(data){
            var listPrice = $('.listPrice').html().replace("$", "");
            var price = data.price.replace("$", "");
            var discount = 100 - Math.ceil(price / listPrice * 100);
            var sale = (listPrice - price).toFixed(2);

            $('#RentalDueDate').text(data.duedate);
            $('.RentalHeroPrice').html(formatMoneyHTML(price));
            $('#RentalHeroPrice').val(price);

            $('#discount').html(discount);
            $('#sale').html(sale);
        }
    });

    //Instantiate the custom marketplace qty dropdown
    $('.ValoreDropdown').valoreDropdown();

    $('#PurchaseRentNav').find('a').bind('click', function(){
        $('#ProductDetailsSection').removeClass('showcontact');
    });

    // Cancel contact form
    $('#contact_cancel').bind('click', function(e){
        e.preventDefault();
        $('#ProductDetailsSection').removeClass('showcontact');
    });

    $(document).on("click", ".read-more-toggle", function() {
        var $this = $(this);

        $this.parent().parent().toggleClass('open');

        if($this.parent().parent().hasClass('open')){
            $this.text('read less');
        } else {
            $this.text('read more');
        }

        return false;
    });

    if ($('#DetailSummary').find('.readShowMore .summary').height() >= 98) {
        $('.toLess').show();
    }

    loadReqTab();
    
    trackViewedProductEvent();

    $(document).on('submit', '.add-to-cart', function(e) {
        e.preventDefault();
        this.submit();
    });
});

function trackViewedProductEvent() {
    /*analytics.track('Viewed Product',{
        id: $('#isbn').html(),
        name: $('#product-name').html(),
        newPrice: Number($('.marketplace-total[data-tabtype=new]').data('price')),
        usedPrice: Number($('.marketplace-total[data-tabtype=used]').data('price')),
        rentalPrice: Number( $('.marketplace-total[data-tabtype=rental]').data('price')),
        alternatePrice: Number( $('.marketplace-total[data-tabtype=alternate]').data('price'))
    });*/
}

function formatMoneyHTML(string){
    var text = (string.indexOf('$') >= 0) ? string: "$" + string;
    var indexOfDollar = text.indexOf('$');
    var indexOfDecimal = text.indexOf('.');
    return '<span>$</span>' + text.substring(indexOfDollar + 1, indexOfDecimal) + '<span>.' + text.substring(indexOfDecimal + 1) + '</span>';
}

function contactForm(e) {
    e.preventDefault();
    e.stopPropagation();

    var mainContact = $('#MainContact'),
        $contactLink = $(e.currentTarget),
        type = $contactLink.data('type');

    $('#ContactRentalId').val($('#RentalListingId_'+type).val());
    $('#ContactSaleId').val($('#SaleListingId_'+type).val());
    $('#ContactProviderId').val($('#ProviderId_'+type).text());

    if (type === 'rental') {
        mainContact.attr('action', '/CustomerService.ContactSeller.SendRentalQuery.do');
    } else {
        mainContact.attr('action', '/CustomerService.ContactSeller.SendPurchaseQuery.do');
    }

    if($(window).width() >= 992) {
        var ctaHeight = $('#DetailsCTA').height();
        var rowHeight = $('#MainProductRow').height();
        var detailHeight = $('.details-wrapper').height();
        var hDiff = rowHeight - ctaHeight - detailHeight;

        mainContact.css('margin-top', -hDiff + 61);
    }

    var section = $('#ProductDetailsSection');
    var showing = section.hasClass('showcontact');
    section.toggleClass('showcontact');
    if (!showing)
        $(document).scrollTop($("#contactSellerFromAnc").offset().top);
}

function loadReqTab() {
    var reqTab = getHashValue('default');

    if (reqTab === null) {
        reqTab = getAmpValue('default');
        if (reqTab === null) {
            return;
        }
    }

    var $newTab = $("#tabLink-new"),
        $usedTab = $("#tabLink-used"),
        $rentalTab = $("#tabLink-rental"),
        $altTab = $("#tabLink-alternate"),
        $tab = null;

    if (reqTab === "buy") {
        $tab = getLowestTab([$newTab, $usedTab, $altTab]);
    } else if (reqTab === "new_and_used") {
        $tab = getLowestTab([$newTab, $usedTab]);
    } else if (reqTab === "rent") {
        $tab = $rentalTab;
    } else if (reqTab === "used") {
        $tab = $usedTab;
    } else if (reqTab === "new") {
        $tab = $newTab;
    } else if (reqTab === "alt") {
        $tab = $altTab;
    }

    if ($tab !== null && $tab.length) {
        $tab.trigger('click');
    }
}

function getLowestTab(tabs) {
    var $lowest = null;

    tabs.forEach(function($tab) {
        if ($tab.length && ($lowest === null || Number($tab.data('price')) < Number($lowest.data('price')))) {
            $lowest = $tab;
        }
    });

    return $lowest;
}

function getAmpValue(key) {
    var matches = location.pathname.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
}

function getHashValue(key) {
    var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
}
