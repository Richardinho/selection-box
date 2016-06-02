describe('_focusOnPreviousOption(): ordinary select box', function () {
	var _focusOnPreviousOption, root, optionA,  optionB, optionC, optionD, optionE, context, spyOnFocus, focusedEl;

	beforeEach(function () {

		root = document.createElement('div');
		document.body.appendChild(root);

		_focusOnPreviousOption = SelectionBox.prototype._focusOnPreviousOption;
			context = {
				_focusOnPreviousOption : _focusOnPreviousOption,
				_focusOn : function () {}
			};
			spyOnFocus = spyOn(context, '_focusOn');

			root.innerHTML = createSelectionBoxHTML();

			optionA = document.getElementById('a');
			optionB = document.getElementById('b');
			optionC = document.getElementById('c');
			optionD = document.getElementById('d');
			optionE = document.getElementById('e');
	});

	afterEach(function () {
		document.body.removeChild(root);
	});

	describe('When there is a previous option', function () {
		it('should focus on previous option', function (){
			_focusOnPreviousOption.call(context, optionB);
			focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
			expect(focusedEl).toBe(optionA);
		});
	});
	describe('When there is a NOT previous option', function () {
		it('should remain on current option', function (){
			_focusOnPreviousOption.call(context, optionA);
			expect(spyOnFocus).not.toHaveBeenCalled();
		});
	});
	describe('when previous option is disabled', function (){
		it('should call previous enabled option', function (){
			_focusOnPreviousOption.call(context, optionD);
			focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
			expect(focusedEl).toBe(optionB);
		});
	});

	function createSelectionBoxHTML() {
		return [
			'<div id="alpha">',
				'<div class="display-area">alpha</div>',
				'<div class="option-list">',
					'<div id="a" class="option">alpha</div>',
					'<div id="b" class="option">beta</div>',
					'<div id="c" class="option __disabled">gamma</div>',
					'<div id="d" class="option">delta</div>',
					'<div id="e" class="option">epsilon</div>',
				'</div>',
			'</div>'
		].join('');
	}
});