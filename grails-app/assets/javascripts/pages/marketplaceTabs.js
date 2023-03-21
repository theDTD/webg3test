var $MarketListTable = $('#MarketListTable');
var marketListingTemplate = null, summarySeparatorTemplate = null;
var marketListingSource = $("#marketlisting-template").html();
var summarySeparatorSource = $("#summary-separator-template").html();

$(document).ready(function () {
    if (typeof marketListingSource !== 'undefined')
        marketListingTemplate = Handlebars.compile(marketListingSource);
    if (typeof summarySeparatorSource !== 'undefined') {
        summarySeparatorTemplate = Handlebars.compile(summarySeparatorSource);
        //inital tab is summary tab
        getListings('summary');
    }

    /** JS for marketplace table **/

    Handlebars.registerHelper('capitalize', function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    Handlebars.registerHelper('lowercase', function(str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper("dollaramount", function(string, options) {
        return "$" + string;
    });

    Handlebars.registerHelper("moneyformat", function(string, options) {
        return formatMoneyHTML(string);
    });

    Handlebars.registerHelper('space', function(items, options) {
        return options.fn(items.join(', '));
    });

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for (var i = 1; i <= n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('maxn', function(max, value, options) {
        var accum = '';
        max = max < value ? max : value;
        for (var i = 1; i <= max; ++i)
            accum += options.fn(i);
        return accum;
    });

    Handlebars.registerHelper('eq', function(v1, v2, options) {
        if(v1 === v2) {
            return true;
        }
    });

    $('.marketplace-total').bind('click', function(){
        var tab = this.dataset.tabtype;
        $('.marketplace-tab[data-tabtype='+tab+']').click();
    });

    var offset = 0;
    //Select marketplace tabs
    $('.marketplace-tab').bind('click', function(e){
        $MarketListTable.empty();
        e.preventDefault();
        offset = 0;
        var $this = $(this);
        var productType = $this.data('tabtype');
        var copies = $this.data('quantity');
        var price = $this.data('price');
        $('.more-market-list').show();
        $('#rentals-info-link').hide();
        //Swap active tabs
        $('.seven-cols > div.active').removeClass('active');
        $this.parent().addClass('active');
        $('.hideOnSummary').show();

        //do ajax here
        getListings(productType, '&max=5');
        if(productType!=='summary') {
            if (productType === '') {
                $('#marketProductType').text('All');
            } else {
                $('#marketProductType').text(productType);
            }
            $('#marketCopies').text(copies);
            $('#marketCopiesPrice').text(price);
        }
    });

    $('.more-market-list').bind('click', function(e){
        offset+=5;
        var max = 5;
        e.preventDefault();
        var $this = $(this);
        var productType = $this.closest('.marketplacePrices').find('.active').children().data('tabtype');

        //do ajax here
        getListings(productType, '&offset=' + offset + '&max=' + max);
    });
    /** end JS for marketplace table **/
});

function getListings(productType, query) {
    var isbn = $('#isbn').html();

    if('summary' === productType){
        $('.hideOnSummary').hide();
        getSummaryListings();
        return;
    }
    $('.market-list-head').show();
    $.ajax({
        url: '/vb/product/listings/' + isbn + '?type=' + productType.toLowerCase() + (typeof query != "undefined" ? query : ""),
        dataType: 'json',
        success: function(data) {
            if (data.length < 5) {
                $('.more-market-list').hide();
            }
            if(productType == "Rental"){
                $('#rentals-info-link').show();
            }

            loadProducts(data, productType.toLowerCase()==="recommended" || productType==="");
            loadDropDowns();
        },
        error: function(xhr){
        }
    });
}

function getSummaryListings() {
    $('#rentals-info-link').hide();
    var isbn = $('#isbn').html();
    $MarketListTable.empty();

    $.ajax({
        url: '/vb/product/listingsSummary/' + isbn,
        dataType: 'json',
        success: function (data) {
            $('.market-list-head').hide();
            var tab;
            var html;
            if(data.recommended.length > 0){
                tab = $('#recommended-tab');
                html = summarySeparatorTemplate({'type':"Recommended",'quantity':tab.data('quantity'),'price':tab.data('price')});
                $MarketListTable.append(html);
                loadProducts(data.recommended, true);
            }
            if(data.rental.length > 0) {
                tab = $('#rental-tab');
                html = summarySeparatorTemplate({'type':"Rental",'quantity':tab.data('quantity'),'price':tab.data('price')});
                $MarketListTable.append(html);
                loadProducts(data.rental);
            }
            if(data.used.length > 0) {
                tab = $('#used-tab');
                html = summarySeparatorTemplate({'type':"Used",'quantity':tab.data('quantity'),'price':tab.data('price')});
                $MarketListTable.append(html);
                loadProducts(data.used);
            }
            if(data.new.length > 0) {
                tab = $('#new-tab');
                html = summarySeparatorTemplate({'type':"New",'quantity':tab.data('quantity'),'price':tab.data('price')});
                $MarketListTable.append(html);
                loadProducts(data.new);
            }
            if(data.alternate.length > 0) {
                tab = $('#alternate-tab');
                html = summarySeparatorTemplate({'type':"Alternate",'quantity':tab.data('quantity'),'price':tab.data('price')});
                $MarketListTable.append(html);
                loadProducts(data.alternate);
            }
            loadDropDowns();
            viewMore();
        },
        error: function (xhr) {
        }
    });
}


function loadProducts(data, showType) {
    for (var i=0; i < data.length; i++){
        var listing = data[i];
        if(listing.type === 'rental') {
            listing.displayPrice = listing.price.semester;
            listing.isRental = true;
            if (listing.rbbSaleId) {
                listing.uid = listing.rbbSaleId + '' + listing.id;
            } else {
                listing.uid = listing.id;
            }
        } else {
            listing.displayPrice = listing.price.sale;
            listing.isRental = false;
        }
        if(listing.type === 'alternate') {
            listing.isAlternate = true;
        } else {
            listing.isAlternate = false;
        }

        listing.showType = showType;

        var resulthtml = marketListingTemplate(listing);
        $MarketListTable.append(resulthtml);
        //$('.commaFormat').digits();
    }
}

function loadDropDowns() {

    $('.ValoreDropdown:not(.dropdownLoaded)').each(function() {
        var $this = $(this);
        $MarketListTable.find($this).valoreDropdown();
    });

    $('.ValoreDropdown-market:not(.dropdownLoaded)').each(function() {
        var $this = $(this);
        $MarketListTable.find($this).valoreDropdown({
            onSelect: function(data) {
                $('#MarketPrice' + data.target).html(formatMoneyHTML(data.price.toString()));
                $('#MarketDueDate' + data.target).text(data.duedate);
                $('#RentalPrice' + data.target).val(data.price);
            }
        });
    });
}

function viewMore() {

    $('.open-tab').bind('click', function(){
        $MarketListTable.empty();

        var curtab = $(this).attr("href");
        var productType = $(curtab).data('tabtype');
        var copies = $(curtab).data('quantity');
        var price = $(curtab).data('price');

        $('.seven-cols > div.active').removeClass('active');
        $(curtab).parent().addClass('active');
        $('.more-market-list').show();
        $('.hideOnSummary').show();

        getListings(productType, '&max=5');
        if(productType!=='summary') {
            if (productType === '') {
                $('#marketProductType').text('All');
            } else {
                $('#marketProductType').text(productType);
            }
            $('#marketCopies').text(copies);
            $('#marketCopiesPrice').text(price);
        }
    });
}