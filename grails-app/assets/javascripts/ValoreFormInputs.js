(function ($) {
$.fn.valoreDropdown = function(options) {

	var defaults = {
		onSelect: function(data){
		}
	};

	var options = $.extend( {}, defaults, options );

	$(this).addClass('dropdownLoaded');

	$(this).each(function() {

	    var $this = $(this);
	    var numberOfOptions = $this.children('option').length;

	    $this.wrap('<div class="dropDown ' + $this.attr('class') + '"></div>');
	    $this.after('<div class="styledSelect"></div>');

	    // Cache the styled div
	    var $styledSelect = $this.next('div.styledSelect');

	    $styledSelect.text($this.find(":selected").text()); //$this.children('option').eq(0).text());

	    var $list = $('<ul />', {
	        'class': 'options'
	    }).insertAfter($styledSelect);

	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }

	    var $listItems = $list.children('li');

	    $styledSelect.click(function (e) {
	        e.stopPropagation();
	        var $dropdown = $(this).parent();
	       /* $('div.styledSelect.active').each(function () {
	            $(this).removeClass('active').next('ul.options').hide();
	        });
	        $(this).toggleClass('active').next('ul.options').toggle();*/

	        if($dropdown.hasClass('active')){
	        	$dropdown.removeClass('active');//.next('ul.options').hide();
	        }else{
	        	$dropdown.toggleClass('active');//.next('ul.options').toggle();
	        }
	    });

	    $listItems.click(function (e) {
	        e.stopPropagation();

	        $styledSelect.text($(this).text()).parent().removeClass('active');
	        $this.val($(this).attr('rel'));
	        var $selectedOp = $this.find('option:selected');
	        options.onSelect.call(this, $selectedOp.data(), $selectedOp.val());
	    });

	    $(document).click(function () {
	        $styledSelect.parent().removeClass('active');
	        //$list.hide();
	    });

	});

	// Set up the default options.
  $.fn.valoreDropdown.defaults = {
    onSelect : null
  };

};
}(jQuery));