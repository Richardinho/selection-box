

    'use strict';


    var RETURN = 13,
        TAB    = 9,
        ESCAPE = 27,
        UP     = 38,
        DOWN   = 40,
        SPACE  = 32;

    var optionSelector = '[data-role=option]',
        displayAreaSelector = '[data-role=display-area]',
        optionListSelector = '[data-role=option-list]',
        optionGroupSelector = '[data-role=option-group]';


    function SelectionBox(selectEl, options){

        if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
        
            //  only work on desktop
            //  use native for mobile devices

            this.defaults = {
                showAria : true,
                prefix   : 'sb'
            };

            this.config = $.extend({}, this.defaults, options || {});

            this.$select = $(selectEl);
            this.select = this.$select[0];
            this.id = this.$select.attr('id');
            this.$el = this.render(this.select);
           
            //this.$select.hide();
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
            this.$el.on('click', optionSelector, $.proxy(this._optionClickHandler, this))
            this.$el.on('keyup', optionSelector, $.proxy(this._optionKeyUpHandler, this));

            //  effectively disable keydown and keypress
            this.$el.on('keydown keypress', optionSelector, function () {
                event.preventDefault();
            })
            // attach window event handler
            $(window).click(function (event) {
                if(!$.contains(self.$el[0], event.target)) {
                    self._closeOptionList();
                }
            })
            //  handle change events on foundation select
            this.$select.on('change', this._handleFoundationSelectChange.bind(this));
        },

        //  handlers

        _displayClickHandler : function () {
            if(!this.select.disabled) {
                $(optionListSelector, this.$el).toggleClass('hidden');
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
            if(!$(optionEl).hasClass('disabled') && !$(optionEl).parent().hasClass('disabled')) {
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

            if(this.config.showAria) {
                $currentSelected.attr('aria-selected', false);
                $newSelected.attr('aria-selected', true)
            }

            $currentSelected.removeClass('selected');
            $newSelected.addClass('selected');
        
            var $displayArea = $(displayAreaSelector, this.$el);

            $displayArea.text($newSelected.text()).focus();

            this._closeOptionList();

        },

        _openOptionList : function () {
            $(optionListSelector, this.$el).removeClass('hidden');

            //  focus on currently selected option
            var selectedIndex = this.select.selectedIndex;
            $(optionSelector, this.$el).eq(selectedIndex).focus();
        },

        _closeOptionList : function () {
            $(optionListSelector, this.$el).addClass('hidden');
        },

        _focusOnPreviousOption : function(option) {
            if($(option).prev(optionSelector).length) {
                $(option).prev(optionSelector).focus();
            } else if($(option).parent(optionGroupSelector).length) {
                var $parent = $(option).parent(optionGroupSelector);
                if($parent.prev(optionGroupSelector).find(optionSelector).length) {
                    $parent.prev(optionGroupSelector).find(optionSelector).last().focus();
                    
                }
            };
        },

        _focusOnNextOption : function(option) {
            if($(option).next(optionSelector).length) {
                $(option).next(optionSelector).focus();
            } else if($(option).parent(optionGroupSelector).length) {
                var $parent = $(option).parent(optionGroupSelector);
                if($parent.next(optionGroupSelector).find(optionSelector).length) {
                    $parent.next(optionGroupSelector).find(optionSelector).first().focus();

                }
            };
        },

        //  render functions
        render : function (select) {
            var self = this;

            var ariaEnabled = this.config.showAria;

            var $el = $('<div>', {
                class : 'select-wrapper',
                id : this.config.prefix + '-' + this.select.id
            });

            if(select.disabled) {
                $el.addClass('disabled');
            }

            var $displayArea = this._renderDisplayArea(select.disabled);

            var $selectedOption = this._getSelectedOptionFromFoundationSelect();

            $displayArea.text(_getSelectedTextFromOption($selectedOption[0]));

            var $optionList = $('<div>', {
                          'class' : 'option-list hidden',
                      'data-role' : 'option-list',
                             'id' : this._generateId('option-list'),
                            'role': 'listbox',
                    'aria-hidden' : true, //todo make dynamic
                'aria-labelledby' : this._generateId('display-area')
            });


            $el.append($displayArea);


            $el.append($optionList);


            this._renderOptions($optionList);

            return $el;

        },

        _renderOptions : function($optionList) {
            var self = this;
            var select = this.select;
            var ariaEnabled = this.config.showAria;

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

            var $displayArea = $('<div>', { 
                    'class' : 'selected-value', 
                'data-role' : 'display-area',
                 'tabindex' : disabled ? null : 0,
                       'id' : this._generateId('display-area')
             });

             if(this.config.showAria) {

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
                      class : 'option-group',
                'data-role' : 'option-group'
            });
            

            $optionGroup.append(_renderOptionGroupLabel(optionGroup.label));

            if(optionGroup.disabled) {
                $optionGroup.addClass('disabled');
            }
            _toArray(optionGroup.querySelectorAll('option')).forEach(function (option){

                $optionGroup.append(self._renderOption(option, optionGroup.disabled, ariaEnabled));
            });

            return $optionGroup;
        },

        _renderOption : function(option, parentDisabled, ariaEnabled) {

            var $option =  $('<a>', {
                     'class' : 'option',
                 'data-role' : 'option',
                  'tabindex' : (option.disabled || parentDisabled) ? null : -1,
                      'text' :  option.label || option.innerHTML,
                'data-value' : option.value || option.innerHTML
            });

            if(ariaEnabled) {
                $option.attr({
                             'role' : 'option',
                    'aria-selected' : option.selected 
                });
            }

            if(option.selected) {
                $option.addClass('selected');
            }

            if(option.disabled || parentDisabled) {
                $option.addClass('disabled');
            }
            return $option;
        },

        _getOptionByIndex : function (index) {
            return this.$el.find(optionSelector).eq(index);
        },

        _getCurrentSelected : function () {
            return $('.selected', this.$el);
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

    function _renderOptionGroupLabel(label) {
        return $('<div>', { class : 'option-group-label', text : label });
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

    
