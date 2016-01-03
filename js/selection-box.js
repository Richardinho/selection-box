

    'use strict';


    var RETURN = 13,
        TAB    = 9,
        ESCAPE = 27,
        UP     = 38,
        DOWN   = 40;


    function SelectionBox(selectEl){

        if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
        
            //  only work on desktop
            //  use native for mobile devices

            this.config = {
                showAria : true
            };

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


        bindHandlers : function () {

            var self = this;
            this.$el.on('click', '[data-role=option]', $.proxy(this._optionClickHandler, this))
            this.$el.on('click', '[data-role=display-area]', $.proxy(this._displayClickHandler, this));
            this.$el.on('keyup', '[data-role=display-area]', $.proxy(this._displayKeyUpHandler, this));
            this.$el.on('keyup', '.option', $.proxy(this._optionKeyUpHandler, this));

            //  effectively disable keydown and keypress
            this.$el.on('keydown keypress', '.option', function () {
                event.preventDefault();
            })
            var self = this;
            $(window).click(function (event) {
                if(!$.contains(self.$el[0], event.target)) {
                    self._closeOptionList();
                }
            })

            this.$select.on('change', this._handleSelectElementChange.bind(this));
        },

        _handleSelectElementChange : function(event) {
            this._changeSelected(this._getCurrentSelected(), this._getOptionByIndex(event.target.selectedIndex));
        },

        _changeSelected : function($currentSelected, $newSelected) {

            if(this.config.showAria) {
                $currentSelected.attr('aria-selected', false);
                $newSelected.attr('aria-selected', true)
            }

            $currentSelected.removeClass('selected');
            $newSelected.addClass('selected');
        
            var $displayArea = $('.selected-value', this.$el);

            $displayArea.text($newSelected.text()).focus();

            this._closeOptionList();

        },

        _getOptionByIndex : function (index) {

            return this.$el.find('.option').eq(index);

        },

        _getCurrentSelected : function () {

            return $('.option.selected', this.$el);
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
                case RETURN :
                    this._selectValue(option);
                    break;
                case ESCAPE :
                    this._closeOptionList();
                    $('.selected-value', this.$el).focus();
                    break;
                default :
                    //  do nothing.
            }
        },

        _focusOnPreviousOption : function(option) {
            if($(option).prev('.option').length) {
                $(option).prev('.option').focus();
            } else if($(option).parent('.option-group').length) {
                var $parent = $(option).parent('.option-group');
                if($parent.prev('.option-group').find('.option').length) {
                    $parent.prev('.option-group').find('.option').last().focus();
                    
                }
            };
        },

        _focusOnNextOption : function(option) {
            if($(option).next('.option').length) {
                $(option).next('.option').focus();
            } else if($(option).parent('.option-group').length) {
                var $parent = $(option).parent('.option-group');
                if($parent.next('.option-group').find('.option').length) {
                    $parent.next('.option-group').find('.option').first().focus();

                }
            };
        },

        _optionClickHandler : function (event) {
            var optionEl = event.currentTarget;
            if(!$(optionEl).hasClass('disabled') && !$(optionEl).parent().hasClass('disabled')) {
                this._selectValue(optionEl);
                
            }
        },

        _selectValue : function(optionEl) {

            var $newSelected = $(optionEl);
            var value = $newSelected.attr('data-value') || $newSelected.text();

            //  set value back on original select
            this.$select[0].value = value;
            this.$select.change();

        },

        _displayClickHandler : function () {
            if(!this.select.disabled) {
                $('.option-list', this.$el).toggleClass('hidden');
            }
        },

        _openOptionList : function () {
            $('.option-list', this.$el).removeClass('hidden');
            //  focus on currently selected option
            var selectedIndex = this.$select[0].selectedIndex;
            $('.option-list .option', this.$el).eq(selectedIndex).focus();
        },

        _closeOptionList : function () {
            $('.option-list', this.$el).addClass('hidden');
        },

        _displayKeyUpHandler : function (event) {
            if(!this.select.disabled) {
                switch(event.which) {
                    case  UP:
                    case DOWN :
                        this._openOptionList();
                        break;
                    default :
                        console.log('something else');
                }
            }
        },


        _generateId : function (suffix) {

            return this.id + '-' + suffix;
        },

        update : function() {
           
            var $optionList = this.$el.find('.option-list');
            //  clear out contents
            $optionList[0].innerHTML = '';
            this._renderOptions($optionList);

        },


        render : function (select) {
            var self = this;

            var ariaEnabled = this.config.showAria;

            var $el = $('<div>', {
                class : 'select-wrapper'
            });

            if(select.disabled) {
                $el.addClass('disabled');
            }

            var $displayArea = this._renderDisplayArea(select.disabled);
            $displayArea.text(select.value);

            var $optionList = $('<div>', {
                class : 'option-list hidden',
                id : this._generateId('option-list')
            });


            $el.append($displayArea);


            $el.append($optionList);


            this._renderOptions($optionList);

            return $el;

        },

        _renderOptions : function($optionList) {

            var select = this.select;
            var ariaEnabled = this.config.showAria;

            if(_hasGroups(select)) {
                var groups = _toArray(select.querySelectorAll('optgroup'));
                groups.forEach(function(optionGroup) {
                    $optionList.append(_renderOptionGroup(optionGroup, ariaEnabled));
                });

            } else {
                var options = _toArray(select.querySelectorAll('option'));
                options.forEach(function(option) {
                    $optionList.append(_renderOption(option, select.disabled, ariaEnabled));
                });
            }
        },

        _renderDisplayArea : function (disabled) {

            var $displayArea = $('<div>', { 
                'class'     : 'selected-value', 
                'data-role' : 'display-area',
                'tabindex'  : disabled ? null : 0 
             });

             if(this.config.showAria) {

                $displayArea.attr({
                    'role'        : 'button',
                    'aria-haspopup' : true,
                    'aria-owns'   : this._generateId('option-list')
                });  

             }

             return $displayArea;

        }
    };

    function _toArray(nodeList){
        return Array.prototype.slice.call(nodeList);
    }

    function _renderOptionGroup (optionGroup, ariaEnabled) {
        var $optionGroupRepresentation = $('<div>', {
            class : 'option-group'
        });
        
        $optionGroupRepresentation.append(_renderOptionGroupLabel(optionGroup.label));

        if(optionGroup.disabled) {
            $optionGroupRepresentation.addClass('disabled');
        }
        _toArray(optionGroup.querySelectorAll('option')).forEach(function (option){

            $optionGroupRepresentation.append(_renderOption(option, optionGroup.disabled, ariaEnabled));
        });

        return $optionGroupRepresentation;
    }

    function _hasGroups(select) {
        return select.querySelectorAll('optgroup').length > 0;
    }

    function _renderOption(option, parentDisabled, ariaEnabled) {

        var $option =  $('<a>', {
            'class'     : 'option',
            'data-role' : 'option',
            'tabindex'  : (option.disabled || parentDisabled) ? null : -1,
            'text'      :  option.label || option.innerHTML,
            'data-value': option.value || option.innerHTML
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
    }

    function _renderOptionGroupLabel(label) {
        return $('<div>', { class : 'option-group-label', text : label });
    }

    function _hasOptGroups(selectEl) {
        return !!$('optgroup', selectEl).length;
    }

    
