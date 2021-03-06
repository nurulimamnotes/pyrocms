(function($) {
	$(function(){

		// Generate a slug from the title
		pyro.generate_slug('input[name="title"]', 'input[name="slug"]');

		// add another page chunk
		$('a.add-chunk').live('click', function(e){
			e.preventDefault();
	
			// The date in hexdec
			key = Number(new Date()).toString(16).substr(-5, 5);
			
			$('#page-content > fieldset > ul li:last').before('<li class="page-chunk">' +
				'<div class="float-left">'+
				'<input type="text" name="chunk_slug[' + key + ']" value="' + key + '"/>' +
				'<select name="chunk_type[' + key + ']">' +
				'<option value="html">html</option>' +
				'<option value="markdown">markdown</option>' +
				'<option value="wysiwyg-simple">wysiwyg-simple</option>' +
				'<option selected="selected" value="wysiwyg-advanced">wysiwyg-advanced</option>' +
				'</select>' +
				'</div><div class="float-right">' +
				'<a href="javascript:void(0)" class="remove-chunk">Remove</a>' +
				'</div><br style="clear:both" />' +
				'<textarea id="' + key + '" class="wysiwyg-advanced" rows="20" style="width:100%" name="chunk_body[' + key + ']"></textarea>' +
				'</li>');
			
			// initialize the editor using the view from fragments/wysiwyg.php
			pyro.init_ckeditor();
			
			// Update Chosen
			pyro.chosen();
		});
		
		$('a.remove-chunk').live('click', function(e) {
			e.preventDefault();
			
			$(this).closest('li.page-chunk').slideUp('slow', function(){ $(this).remove(); });
		});
		
		$('select[name^=chunk_type]').live('change', function() {
			chunk = $(this).closest('li.page-chunk');
			textarea = $('textarea', chunk);
			
			// Destroy existing WYSIWYG instance
			if (textarea.hasClass('wysiwyg-simple') || textarea.hasClass('wysiwyg-advanced')) 
			{
				textarea.removeClass('wysiwyg-simple');
				textarea.removeClass('wysiwyg-advanced');
					
				var instance = CKEDITOR.instances[textarea.attr('id')];
			    instance && instance.destroy();
			}
		
			// Set up the new instance
			textarea.addClass(this.value);
			
			pyro.init_ckeditor();
		});
		
	});
	
})(jQuery);