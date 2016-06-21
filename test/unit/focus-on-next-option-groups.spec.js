describe('_focusOnNextOption(): select box with groups', function () {
	var _focusOnNextOption,
	    focusedEl,
	    context,
	    spyOnFocus,
	    optionA,
	    optionB,
	    optionC,
	    optionD,
	    optionE,
	    optionF,
	    optionG,
	    optionH,
	    optionI,
	    optionJ,
	    optionK,
	    optionL,
	    optionM;

	beforeEach(function () {
		root = document.createElement('div');
		document.body.appendChild(root);
		_focusOnNextOption = SelectionBox.prototype._focusOnNextOption;
		_getNextGroup = SelectionBox.prototype._getNextGroup;
		root.innerHTML = getHtml();
		context = {
			_focusOnNextOption : _focusOnNextOption,
			_focusOn : function () {},
			_getNextGroup : _getNextGroup
		};

		spyOnFocus = spyOn(context, '_focusOn');

		optionA = document.getElementById('a');
		optionB = document.getElementById('b');
		optionC = document.getElementById('c');
		optionD = document.getElementById('d');
		optionE = document.getElementById('e');
		optionF = document.getElementById('f');
		optionG = document.getElementById('g');
		optionH = document.getElementById('h');
		optionI = document.getElementById('i');
		optionJ = document.getElementById('j');
		optionK = document.getElementById('k');
		optionL = document.getElementById('l');
		optionM = document.getElementById('m');
	});

	afterEach(function () {
		document.body.removeChild(root);
	});

	describe('When there is a next option', function () {
		it('should focus on next option', function() {
			_focusOnNextOption.call(context, optionA);
			focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
			expect(focusedEl).toBe(optionB);
		});
	});
	describe('when on last option', function () {
		it('should remain on current option', function () {
			_focusOnNextOption.call(context, optionM);
			expect(spyOnFocus).not.toHaveBeenCalled();
		});
	});
	describe('when on last option in group', function () {
		it('should focus on next option in next group', function () {
			_focusOnNextOption.call(context, optionI);
			focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
			expect(focusedEl).toBe(optionJ);
		});
		describe('when next option is disabled', function () {
			it('should skip to next enabled option', function () {
				_focusOnNextOption.call(context, optionE);
  			focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
  			expect(focusedEl).toBe(optionG);
			});
		});
		describe('when next group is disabled', function () {
			it('should skip to next enabled option', function () {
				_focusOnNextOption.call(context, optionJ);
				focusedEl = spyOnFocus.calls.argsFor(0)[0][0];
				expect(focusedEl).toBe(optionK);
			});
		});
	});

	function getHtml() {

		return [
			'<div id="flags-selection-box" class="selection-box" >',
			'  <div class="display-area">',
			'    <div data-country="France">France</div>',
			'  </div>',
			'  <div class="option-list below">',
			'    <div class="option-group">',
			'      <div class="option-group-label">Europe</div>',
			'      <div id="a" class="option" data-value="UK">',
			'        <div class="country-option">',
			'          <span class="country-name">United Kingdom</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="b" class="option" data-value="France">',
			'        <div class="country-option">',
			'          <span class="country-name">France</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="c" class="option __disabled" data-value="Germany">',
			'        <div class="country-option">',
			'          <span class="country-name">Germany</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="d" class="option" data-value="Spain">',
			'        <div class="country-option">',
			'          <span class="country-name">Spain</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="e" class="option" data-value="Italy">',
			'        <div class="country-option">',
			'          <span class="country-name">Italy</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'    </div>',
			'    <div class="option-group">',
			'      <div class="option-group-label">Africa</div>',
			'      <div id="f" class="option __disabled" data-value="South Africa">',
			'        <div class="country-option">',
			'          <span class="country-name">South Africa</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="g" class="option" data-value="Egypt">',
			'        <div class="country-option">',
			'          <span class="country-name">Egypt</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="h" class="option" data-value="Libya">',
			'        <div class="country-option">',
			'          <span class="country-name">Libya</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="i" class="option" data-value="Sudan">',
			'        <div class="country-option">',
			'          <span class="country-name">Sudan</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'    </div>',
			'    <div class="option-group">',
			'      <div class="option-group-label">Americas</div>',
			'      <div id="j" class="option" data-value="USA">',
			'        <div class="country-option">',
			'          <span class="country-name">USA</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'    </div>',
			'    <div class="option-group __disabled">',
			'      <div class="option-group-label">Americas</div>',
			'      <div id="j2" class="option"></div>',
			'      <div id="j3" class="option"></div>',
			'    </div>',
			'    <div class="option-group">',
			'      <div id="k" class="option" data-value="Brazil">',
			'        <div class="country-option">',
			'          <span class="country-name">Brazil</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="l" class="option" data-value="Argentina">',
			'        <div class="country-option">',
			'          <span class="country-name">Argentina</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'      <div id="m" class="option" data-value="Columbia">',
			'        <div class="country-option">',
			'          <span class="country-name">Columbia</span>',
			'          <span class="country-flag"></span>',
			'        </div>',
			'      </div>',
			'    </div>',
			'  </div>',
			'</div>'].join('');
	}
});