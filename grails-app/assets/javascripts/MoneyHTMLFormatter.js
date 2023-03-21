(function($){
    var moneyFormat, defaultOptions, __bind;

    __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };

    // Plugin default options.
    defaultOptions = {

    };

    moneyFormat = (function(options) {
        function moneyFormat(handler, options) {
            this.handler = handler;

            // Extend default options.
            $.extend(true, this, defaultOptions, options);

            // Bind methods.
            this.init = __bind(this.init, this);
        };

        return moneyFormat;
    })();

    $.fn.moneyFormat = function(options) {

        // Create a moneyFormat instance if not available.
        if (!this.moneyFormatInstance) {
            this.moneyFormatInstance = new moneyFormat(this, options || {});
        } else {
            this.moneyFormatInstance.update(options || {});
        }

        return this.each(function() {

            var elem = $(this);
            var text = elem.html();
            var indexOfDollar = text.indexOf('$');
            var indexOfDecimal = text.indexOf('.');

            if (indexOfDollar < 0 && indexOfDecimal < 0) {
                elem.html(text);
            }
            else {
                var html = '<span>$</span>' + text.substring(indexOfDollar + 1, indexOfDecimal) + '<span>.' + text.substring(indexOfDecimal + 1) + '</span>';
                elem.html(html);
            }

        });
    };
/*
    $.fn.digits = function(){
        return this.each(function(){
            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
        });
    };
*/
})(jQuery);