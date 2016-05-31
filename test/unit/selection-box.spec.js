describe('selection box', function () {

	var selectionBox,
	    root;

	beforeEach(function () {
		root = document.createElement('div');
		document.body.appendChild(root);
		var alpha = document.createElement('div');
		var beta = document.createElement('div');
		alpha.innerHTML = createSelectHTML();
		beta.innerHTML = createSelectWithOptgroupsHTML();
		root.appendChild(alpha);
		root.appendChild(beta);
	});

	afterEach(function () {
		document.body.removeChild(root);
	});

	describe('When selection box is created from ordinary select dropdown', function () {
		beforeEach(function () {
			selectionBox = new SelectionBox('#alpha');
		});
		it('should create selection box', function () {
			expect(!!document.getElementById('alpha-selection-box')).toBe(true);
		});
	});

	describe('_renderOption', function () {
		var _renderOption, mockSB, option;
		beforeEach(function () {
			_renderOption = SelectionBox.prototype._renderOption;
			mockSB = {
				config : {
					renderOption : function (text) {
						return text;
					}
				}
			};
			option = document.createElement('option');
			option.value = 'carrot';
			option.innerHTML = 'Carrot Cake'

		});
		describe('parent is enabled and aria is disabled', function () {
			it('should create div element representing an option', function () {
				var result = _renderOption.call(mockSB, option, false, false);
				expect(result.classList.contains('option')).toBe(true);
				expect(result.getAttribute('tabindex')).toBe('-1');
				expect(result.getAttribute('data-value')).toBe('carrot');
				expect(result.textContent).toBe('Carrot Cake');
			});
		});
		describe('option is disabled and aria is disabled', function () {
			beforeEach(function () {
				option.disabled = true;
			});
			it('should create div element representing an option', function () {
				var result = _renderOption.call(mockSB, option, false, false);
				expect(result.classList.contains('option')).toBe(true);
				expect(result.classList.contains('__disabled')).toBe(true);
				expect(result.getAttribute('tabindex')).toBe('null');
			});
		});
		describe('parent is disabled and aria is disabled', function () {
			it('should create div element representing an option', function () {
				var result = _renderOption.call(mockSB, option, true, false);
				expect(result.classList.contains('option')).toBe(true);
				expect(result.classList.contains('__disabled')).toBe(true);
				expect(result.getAttribute('tabindex')).toBe('null');
			});
		});
		describe('aria is enabled', function () {
			describe('option is selected', function () {
				beforeEach(function () {
					option.selected = true;
				});
				it('should create div element representing an option', function () {
					var result = _renderOption.call(mockSB, option, false, true);
					expect(result.classList.contains('__selected')).toBe(true);
					expect(result.getAttribute('role')).toBe('option');
					expect(result.getAttribute('aria-selected')).toBe('true');
				});
			});
			describe('option is not selected', function () {
				it('should create div element representing an option', function () {
					var result = _renderOption.call(mockSB, option, false, true);
					expect(result.classList.contains('__selected')).toBe(false);
					expect(result.getAttribute('role')).toBe('option');
					expect(result.getAttribute('aria-selected')).toBe('false');
				});
			});
		});
	});

	describe('_hasGroups()', function () {
		describe('when select box contains only options', function () {
			it('should return FALSE', function () {
				expect(_hasGroups(document.getElementById('alpha'))).toBe(false);
			});
		});
		describe('when select box contains groups', function () {
			it('should return TRUE', function () {
				expect(_hasGroups(document.getElementById('beta'))).toBe(true);
			});
		});
	});


	function createSelectHTML() {
		return [
			'<select id="alpha">',
				'<option>apple</option>',
			'</select>'
		].join('');
	}

	function createSelectWithOptgroupsHTML() {
		return [
			'<select id="beta">',
			'  <optgroup label="Swedish Cars">',
			'    <option value="volvo">Volvo</option>',
			'    <option value="saab">Saab</option>',
			'  </optgroup>',
			'  <optgroup label="German Cars">',
			'    <option value="mercedes">Mercedes</option>',
			'    <option value="audi">Audi</option>',
			'  </optgroup>',
			'</select>'
		].join('');
	}
});