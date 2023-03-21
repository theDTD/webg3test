$(document).ready(function(){
    var $SearchInput = $("#search_input");

    function trackSegmentEventOnSelect(e, ui ) {
        e.preventDefault();
        // analytics.track('Product Search',{
        //     query: $SearchInput.val()
        // });
        setTimeout(function () {
            window.location.assign( ui.item.item_link );
        }, 500);
    }

    //Set up autocomplete
    if($SearchInput.length > 0){ //if search input exists on page
        $SearchInput.autocomplete({
            minLength: 4,
            delay: 275,
            source: function( request, response ) {
                $.ajax({
                    url: "/Search.SearchSuggest.do",
                    data: {
                        query: request.term,
                        department: $('#header_search_dept').val()
                    },
                    position: { of : "#ac-suggests" },
                    timeout: 2000,
                    success: function( data ) {
                        if(typeof data.suggestions == "undefined")return;
                        response( $.map( data.suggestions, function( item ) {
                            return {
                                label: item.product_name,
                                value: item.product_name,
                                item_link: item.item_link,
                                product_code: item.product_code,
                                contributor: item.contributor,
                                product_type: item.product_type,
                                image_link: item.image_link,
                                product_name: item.product_name
                            }
                        }));
                    },
                    error: function() {
                        $SearchInput.autocomplete('disable');
                    }
                });

                $( "#search_input").blur(function() {
                    $('#ac-suggests').hide();
                });

                $( "#search_input").focus(function() {
                    $('#ac-suggests').show();
                });

            },
            select: function( event, ui ) {
                if( analytics ) trackSegmentEventOnSelect(event,ui);
                else window.location.assign( ui.item.item_link );
                //window.location.assign( ui.item.item_link );
            },
            focus: function (event, ui) {
                event.preventDefault();
                $('#ac-suggests li.ui-state-focus').removeClass('ui-state-focus');
                $('#headersugg' + ui.item.product_code).addClass('ui-state-focus');
            },
            messages: {
                noResults: '',
                results: function(){}
            },
            appendTo: '#ac-suggests'
        }).off('blur').data('ui-autocomplete')._renderItem = function(ul, item) {

            var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'),
                pattern = '(' + this.element.val().replace(reEscape, '\\$1') + ')';
            var result = '<a href="' + item.item_link + '"><img src=' + item.image_link + ' width=\"40\" alt=\"\" \/>' + '<div class=\"title\">' + item.product_name.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + '<\/div>';
            if(item.contributor != null) {
                result += '<p class=\"auth\">' + item.contributor + '<\/p>';
            }
            if(item.product_type === 'book') {
                result += '<p>ISBN: ' + item.product_code + '<\/p><\/a>';
            }
            else {
                result += '<p>UPC: ' + item.product_code + '<\/p><\/a>';
            }

            return jQuery('<li id="headersugg' + item.product_code + '">').data('ui-autocomplete-item', item ).append(result).appendTo(ul);
        };
    }
    ///End Auto Complete


    $('#NavToggle').bind('click', function(e){
        e.preventDefault();

        $('#header-nav').toggleClass('active');
    });

    $('#header-nav-linklist').find('> li > a.has_sub').bind('click', function(e){
        e.preventDefault();

        $(this).parent().toggleClass('active');
    });

    $('#HeaderSearchClear').bind('click', function(e){
        e.preventDefault();
        $('#ac-suggests').removeClass('show');
    });

    $('#SearchToggle, #HeaderSearchClear').bind('click', function(e){
        e.preventDefault();
        $('#ac-suggests').toggle();
        var $searchForm = $('#HeaderSearchForm');
        $('#SiteNav').removeClass('open');
        $('#header-nav').removeClass('active');

        if($searchForm.hasClass('open')){
            var searchInput = $('#search_input');
            //searchInput.autocomplete("close");
            $('#WhiteModelOverlay').remove();
            $searchForm.removeClass('open');
            searchInput.val('').blur();
            $('#HeaderSearchClear').addClass('hide');
        }else{
            $('body').append('<div id="WhiteModelOverlay"></div>');
            $searchForm.addClass('open');
            $('#search_input').focus();
            $('#HeaderSearchClear').removeClass('hide');
        }
    });

    $('#search_input').bind('change paste keyup', function(){
        var $this = $(this);
        var $clear = $('#HeaderSearchClear');
        var show = ($this.val().length > 0);
        var hidden = $clear.hasClass('hide');

        if(show && hidden){
            $clear.removeClass('hide');
        }else if(!show && !hidden){
            $clear.addClass('hide');
        }
    });

});