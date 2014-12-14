(function($){
	$.entwine('ss', function($){

		/* Provide character stats on MetaDescription & MetaTitle input fields */
		$('input#Form_EditForm_MetaTitle, textarea#Form_EditForm_MetaDescription').entwine({
			onkeyup: function(){
				this.updateStats();
			},
			onkeydown: function(e){
				/* prevent new line in description */
				if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
					e.preventDefault();
				}
				/* prevent multiple spaces */
				this.val(this.val().replace(/\s+/g, ' '));
			},
			onmatch: function(){
				if (!$('#' + this.attr('id') + 'Stats').length) {
					this.after('<span class="metastats" id="' + this.attr('id') + 'Stats' + '"></span>');
				}
				this.updateStats();
			},
			updateStats: function(){
				var v = this.val().trim();
				var chars = v.replace(/\s+/g, ' ').length;
				var length = this.data('length');
				if (length) {
					if (chars > length) {
						$('#' + this.attr('id') + 'Stats').addClass('over');
					} else {
						$('#' + this.attr('id') + 'Stats').removeClass('over');
					}
					var result = length - chars;
					$('#' + this.attr('id') + 'Stats').text(result);
				}
			}
		});

	});

})(jQuery);
