(function($){
	$.entwine('ss', function($) {

		/* Provide character stats on MetaDescription & MetaTitle input fields */
		$('input#Form_EditForm_MetaTitle, textarea#Form_EditForm_MetaDescription').entwine({
			onkeyup: function() {
				this.updateStats();
			},
			onkeydown: function(e) {
				/* prevent new line in description */
				if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
					e.preventDefault();
				}
			},
			onfocusout: function(e) {
				/* remove multiple spaces */
				this.val(this.val().replace(/\s+/g, ' '));
			},
			onmatch: function(){
				if (!$('#' + this.attr('id') + 'Stats').length) {
					this.after('<span class="metastats" id="' + this.attr('id') + 'Stats' + '"></span>');
				}
				this.updateStats();
			},
			updateStats: function() {
				var v = this.val().trim();
				var chars = v.replace(/\s+/g, ' ').length;
				var limit = this.data('length');
				var result = '';
				if (limit) {
					var limitExtended = this.data('length-extended');
					if (limitExtended) {
						var infoLabel = '';
						if (chars > limitExtended) {
							$('#' + this.attr('id') + 'Stats').removeClass('orange').addClass('red');
							infoLabel = '';
						} else if (chars > limit) {
							$('#' + this.attr('id') + 'Stats').removeClass('red').addClass('orange');
							infoLabel = ' (cut off by most search engines)';
						} else {
							$('#' + this.attr('id') + 'Stats').removeClass('red').removeClass('orange');
							infoLabel = '';
						}
						result = (limitExtended - chars) + infoLabel;
					} else {
						if (chars > limit) {
							$('#' + this.attr('id') + 'Stats').addClass('red');
						} else {
							$('#' + this.attr('id') + 'Stats').removeClass('red');
						}
						result = limit - chars;
					}
					$('#' + this.attr('id') + 'Stats').text(result);
				}
			}
		});

	});

})(jQuery);
