

	'use strict';


	var RETURN = 13,
	    TAB    = 9,
	    ESCAPE = 27,
	    UP     = 38,
	    DOWN   = 40,
	    SPACE  = 32;

	var optionSelector      = '.option',
	    displayAreaSelector = '.display-area',
	    optionListSelector  = '.option-list',
	    optionGroupSelector = '.option-group';


	function SelectionBox(selectEl, options){

		if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {

			//  only work on desktop
			//  use native for mobile devices

			this.defaults = {
				            ariaEnabled : true,
				           renderOption : function (text) { return text; },
				      renderDisplayArea : function(text, value) { return text; },
				         hideFoundation : true,
				    optionListMaxHeight : 150
			};

			this.config = $.extend({}, this.defaults, options || {});

			this.$select = $(selectEl);
			this.select = this.$select[0];

			if(!this.select) {
				throw {
					name : 'NO_SELECT_ELEMENT',
					message : 'You need to supply an existing select element'
				};
			}
			this.id = this.$select.attr('id');
			this.$el = this.render(this.select);

			if(this.config.hideFoundation) {
				this.$select.hide();
			}
			this.$el.insertAfter(this.$select);
			this.$el.show();

			this.bindHandlers();
		}
	}

	SelectionBox.prototype = {

		//  only function that is intended to be called from outside
		//  re-renders option list
		update : function() {
			var $optionList = $(optionListSelector, this.$el);
			//  clear out contents
			$optionList[0].innerHTML = '';
			this._renderOptions($optionList);
		},

		bindHandlers : function () {

			var self = this;

			// handle events on display area
			this.$el.on('click', displayAreaSelector, $.proxy(this._displayClickHandler, this));
			this.$el.on('keyup', displayAreaSelector, $.proxy(this._displayKeyUpHandler, this));

			//  handle events on options
			this.$el.on('click', optionSelector, $.proxy(this._optionClickHandler, this));
			this.$el.on('keyup', optionSelector, $.proxy(this._optionKeyUpHandler, this));

			//  effectively disable keydown and keypress
			this.$el.on('keydown keypress', optionSelector, function (event) {
				event.preventDefault();
			});
			// attach window event handler
			$(window).click(function (event) {
				if(!$.contains(self.$el[0], event.target)) {
					self._closeOptionList();
				}
			});
			//  handle change events on foundation select
			this.$select.on('change', this._handleFoundationSelectChange.bind(this));

			//  handle mutation events on original select box
			var observer = new MutationObserver(function(mutations) {
				self.update();
			});
			// configuration of the observer:
			var config = { childList: true };
      // pass in the target node, as well as the observer options
      observer.observe(this.select, config);
		},

		//  handlers

		_displayClickHandler : function () {
			if(!this.select.disabled) {
				var $optionList = $(optionListSelector, this.$el);
				if(this.$el.attr('data-state') == 'closed') {
					this._openOptionList();
				} else {
					this._closeOptionList();
				}
			}
		},

		_displayKeyUpHandler : function (event) {
			if(!this.select.disabled) {
				switch(event.which) {
				case  UP:
				case DOWN :
					this._openOptionList();
					break;
				default :
					//  do something else
				}
			}
		},

		_optionClickHandler : function (event) {
			var optionEl = event.currentTarget;
			if(!$(optionEl).hasClass('__disabled') && !$(optionEl).parent().hasClass('__disabled')) {
				this._selectValue(optionEl);
			}
		},

		_optionKeyUpHandler : function (event) {
			var option = event.currentTarget;

			switch(event.which) {
			case  UP:
				this._focusOnPreviousOption(option);
				break;
			case DOWN :
				this._focusOnNextOption(option);
				break;
			case SPACE :
			case RETURN :
				this._selectValue(option);
				break;
			case ESCAPE :
				this._closeOptionList();
				$(displayAreaSelector, this.$el).focus();
				break;
			default :
				//  do nothing.
			}
		},

		_handleFoundationSelectChange : function(event) {
			this._changeSelected(this._getCurrentSelected(), this._getOptionByIndex(event.target.selectedIndex));
		},

		//  end of handlers

		//  set value on foundation select
		//  this component will update via it's listener on the foundation select.
		_selectValue : function(optionEl) {

			var $newSelected = $(optionEl);
			var value = $newSelected.attr('data-value') || $newSelected.text();

			//  set value back on original select
			this.$select[0].value = value;
			this.$select.change();
		},

		//  performs actual change on this component, e.g changing aria values etc.
		_changeSelected : function($currentSelected, $newSelected) {

			if(this.config.ariaEnabled) {
				$currentSelected.attr('aria-selected', false);
				$newSelected.attr('aria-selected', true)
			}

			$currentSelected.removeClass('__selected');
			$newSelected.addClass('__selected');

			$(displayAreaSelector, this.$el).remove();
			this.$el.prepend(this._renderDisplayArea());
			var $displayArea = $(displayAreaSelector, this.$el).focus();

			this._closeOptionList();
		},

		_openOptionList : function () {
			var $optionList = $(optionListSelector, this.$el);
			var $displayArea = $(displayAreaSelector, this.$el);
			this.$el.attr('data-state', 'open');

			if(this.config.ariaEnabled) {
				$optionList.attr('aria-hidden', false);
			}

			this._positionOptionList($displayArea, $optionList);

			//  focus on currently selected option
			var selectedIndex = this.select.selectedIndex;
			$(optionSelector, this.$el).eq(selectedIndex).focus();
		},

		_closeOptionList : function () {
			var $optionList = $(optionListSelector, this.$el);
			if(this.config.ariaEnabled) {
				$optionList.attr('aria-hidden', true);
			}
			this.$el.attr('data-state', 'closed');
		},

		_focusOnPreviousOption : function(option) {
			var $option = $(option);
			var $prevOption = $(option).prev(optionSelector);
			if($prevOption.length) {
				//  if there is a previous option and it isn't disabled, focus on it. Otherwise recursively call this function
				if($prevOption.hasClass('__disabled')) {
					this._focusOnPreviousOption($prevOption);
				} else {
					$prevOption.focus();
				}
			} else if($(option).parent(optionGroupSelector).length) {
				//  if option is in a group, try a previous group
				var $parent = $(option).parent(optionGroupSelector);
				var $prevGroup = this._getPrevGroup($parent);
				if($prevGroup) {
					$prevOption = $prevGroup.find(optionSelector).last();
					if($prevOption.length){
						if(!$prevOption.hasClass('__disabled')) {
							$prevOption.focus();
						} else {
							this._focusOnPreviousOption($prevOption);
						}
					}
				}
			};
		},

		_focusOnNextOption : function(option) {
			var $option = $(option); // wrap option in $
			var $nextOption = $option.next(optionSelector);
			if($nextOption.length) {
				if($nextOption.hasClass('__disabled')) {
					this._focusOnNextOption($nextOption);
				} else {
					$nextOption.focus();
				}
			} else if($option.parent(optionGroupSelector).length) {
				var $parent = $option.parent(optionGroupSelector);
				var $nextGroup = this._getNextGroup($parent);
				if($nextGroup) {
					$nextOption = $nextGroup.find(optionSelector).first();
					if($nextOption.length) {
						if(!$nextOption.hasClass('__disabled')) {
							$nextOption.focus();
						} else {
							this._focusOnNextOption($nextOption);
						}
					} // no
				}
			};
		},

		_getPrevGroup : function(group) {
			var $group = $(group);
			var $prevGroup = $group.prev(optionGroupSelector);
			if($prevGroup.length) {
				if($prevGroup.hasClass('__disabled')) {
					// skip this group
					return this._getPrevGroup($prevGroup);
				} else {
					return $prevGroup;
				}

			} else {
				return false;
			}
		},

		_getNextGroup : function(group) {
			var $group = $(group);
			var $nextGroup = $group.next(optionGroupSelector);
			if($nextGroup.length) {
				if($nextGroup.hasClass('__disabled')) {
					// skip this group
					return this._getNextGroup($nextGroup);
				} else {
					return $nextGroup;
				}

			} else {
				return false;
			}
		},

		//  render functions
		render : function (select) {
			var self = this;
			var ariaEnabled = this.config.ariaEnabled;

			var $el = $('<div>', {
				       class : 'selection-box',
				          id : this.select.id + '-selection-box',
				'data-state' : 'closed'
			});

			if(select.disabled) {
				$el.addClass('__disabled');
			}

			var $displayArea = this._renderDisplayArea(select.disabled);

			var $optionList = $('<div>', {
				          'class' : 'option-list',
				             'id' : this._generateId('option-list'),
				            'role': 'listbox',
				    'aria-hidden' : true,
				'aria-labelledby' : this._generateId('display-area')
			});

			$el.append($displayArea);
			$el.append($optionList);

			this._renderOptions($optionList);

			return $el;
		},

		_shouldOpenAboveDisplayArea : function (displayAreaDimensions, optionListDimensions) {

			//  default is to display option list below the display area.
			//  if there is not sufficient space, then we should display it above the display area.
			var spaceBelowDisplayArea = window.innerHeight - (displayAreaDimensions.height + displayAreaDimensions.top)
			return this.config.optionListMaxHeight > spaceBelowDisplayArea;

		},

		_positionOptionList : function ($displayArea, $optionList) {

			var displayAreaDimensions = _getElementDimensions($displayArea[0]);
			if (this._shouldOpenAboveDisplayArea(displayAreaDimensions)) {
				$optionList.removeClass('below').addClass('above');
			} else {
				$optionList.removeClass('above').addClass('below');
			}
			$optionList.css('max-height', this.config.optionListMaxHeight);
		},

		_renderOptions : function($optionList) {
			var self = this;
			var select = this.select;
			var ariaEnabled = this.config.ariaEnabled;

			if(_hasGroups(select)) {
				var groups = _toArray(select.querySelectorAll('optgroup'));
				groups.forEach(function(optionGroup) {
					$optionList.append(self._renderOptionGroup(optionGroup, ariaEnabled));
				});
			} else {
				var options = _toArray(select.querySelectorAll('option'));
				options.forEach(function(option) {
					$optionList.append(self._renderOption(option, select.disabled, ariaEnabled));
				});
			}
		},

		_renderDisplayArea : function (disabled) {

			var selectedOption = this._getSelectedOptionFromFoundationSelect()[0];

			var $displayArea = $('<div>', {
				    'class' : 'display-area',
				 'tabindex' : disabled ? null : 0,
				       'id' : this._generateId('display-area')
			});

			var text = _getSelectedTextFromOption(selectedOption);
			var value = selectedOption.value;
			$displayArea.html(this.config.renderDisplayArea(text, value));

			if(this.config.ariaEnabled) {

				$displayArea.attr({
					         'role' : 'button',
					'aria-haspopup' : true,
					    'aria-owns' : this._generateId('option-list')
				});  
			}
			return $displayArea;
		},

		_renderOptionGroup : function (optionGroup, ariaEnabled) {
			var self = this;
			var $optionGroup = $('<div>', {
				      class : 'option-group'
			});

			$optionGroup.append(_renderOptionGroupLabel(optionGroup.label, this.config.prefix));

			if(optionGroup.disabled) {
				$optionGroup.addClass('__disabled');
			}
			_toArray(optionGroup.querySelectorAll('option')).forEach(function (option){
				$optionGroup.append(self._renderOption(option, optionGroup.disabled, ariaEnabled));
			});

			return $optionGroup;
		},

		_renderOption : function(option, parentDisabled, ariaEnabled) {

			var $option =  $('<div>', {
				     'class' : 'option',
				  'tabindex' : (option.disabled || parentDisabled) ? null : -1,
				'data-value' : option.value || option.innerHTML
			});

			var text = option.label || option.innerHTML;

			$option.html(this.config.renderOption(text));

			if(ariaEnabled) {
				$option.attr({
					         'role' : 'option',
					'aria-selected' : option.selected 
				});
			}

			if(option.selected) {
				$option.addClass('__selected');
			}

			if(option.disabled || parentDisabled) {
				$option.addClass('__disabled');
			}
			return $option;
		},

		_getOptionByIndex : function (index) {
			return this.$el.find(optionSelector).eq(index);
		},

		_getCurrentSelected : function () {
			return $('.__selected', this.$el);
		},

		_generateId : function (suffix) {
			return this.id + '-' + suffix;
		},

		// foundation select functions

		_getSelectedOptionFromFoundationSelect : function () {
			return $('option:selected', this.select);
		}
	};

	//  stateless functions

	function _renderOptionGroupLabel(label, prefix) {
		return $('<div>', { 
			class : 'option-group-label',
			 text : label 
		});
	}

	//  foundation select utility functions

	function _getSelectedTextFromOption(option) {
		return option.label || option.innerHTML;
	}

	function _hasGroups(select) {
		return select.querySelectorAll('optgroup').length > 0;
	}

	function _hasOptGroups(selectEl) {
		return !!$('optgroup', selectEl).length;
	}

	// other utils
	function _toArray(arrayLike){
		return Array.prototype.slice.call(arrayLike);
	}

	function _getElementDimensions(el) {
    return el.getBoundingClientRect();
  }


