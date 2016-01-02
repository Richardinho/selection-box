

    'use strict';


    var RETURN = 13,
        TAB    = 9,
        ESCAPE = 27,
        UP     = 38,
        DOWN   = 40;

    var desktop = true;

    function _hasOptGroups(selectEl) {
        return !!$('optgroup', selectEl).length;
    }

    function createSelectModel(selectEl) {

        var model = {
            autofocus : selectEl.autofocus,
            disabled : selectEl.disabled,
            form : selectEl.form,
            multiple : selectEl.multiple,
            name : selectEl.name,
            required : selectEl.required,
            //  globals
            accesskey: '',
            dir : '',
            lang : '',
            tabindex : '',
            translate : ''
        };

        if(_hasOptGroups(selectEl)) {

            model.hasOptGroups = true;
            model.groups = $.map($('optgroup', selectEl).get(), createGroupModel);

        } else {
            model.hasOptGroups = false;
            model.options = $.map($('option', selectEl).get(), createOptionModel);
        }
        return model;
    }

    function createGroupModel(optionGroup) {

        return {
            label : optionGroup.label,
            disabled : optionGroup.disabled,
            options : $.map($('option', optionGroup).get(), createOptionModel)
            
        };
    }

    function createOptionModel(optionEl) {

        return { 
            label : optionEl.label,
            value : optionEl.value,
            text : $(optionEl).text(),
            disabled : optionEl.disabled,
            selected : optionEl.selected
            };
    }
    

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        desktop = false;
    }


    function SelectionBox(selectEl, dataSource){
        //  only work on desktop
        //  use native for mobile devices
        if(desktop) {

            this.$select = $(selectEl);

            this.render();
            this.bindHandlers();
        }
    }

    SelectionBox.prototype = {

        bindHandlers : function () {


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
            this._selectValue(optionEl);

        },

        _selectValue : function(optionEl) {

            var value = $(optionEl).attr('data-value') || optionEl.innerHTML;
            this.$select[0].value = value;

            _updateDisplayArea($('.selected-value', this.$el), $(optionEl));

            this._closeOptionList();

            $('.selected-value', this.$el).focus();

        },

        _displayClickHandler : function () {
           
            $('.option-list', this.$el).toggleClass('hidden');
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
            switch(event.which) {
                case  UP:
                case DOWN :
                    this._openOptionList();
                    break;
                default :
                    console.log('something else');
            }
        },

        render : function () {
            var self = this;

            this.$el = $('<div>', {
                class : 'select-wrapper'
            });

            var $displayArea = _renderDisplayArea();
            var $optionList = $('<div class="option-list hidden">');

            this.$el.append($displayArea);
            this.$el.append($optionList);

            var $selectedOption = this.$select.find('option:selected');

            _updateDisplayArea($displayArea, $selectedOption);

            if(_hasOptionGroups(this.$select)) {

                this.$select.children().each(function(index, optionGroup) {
                    $optionList.append(_renderOptionGroup(optionGroup));
                });

            } else {
                
                this.$select.children().each(function(index, option) {
                    $optionList.append(_renderOption(option));
                });
            }

            this.$select.hide();
            this.$el.insertAfter(this.$select);

            this.$el.show();

        },
    };

    function _renderOptionGroup (optionGroup) {
        var $optionGroupRepresentation = $('<div>', {
            class : 'option-group'
        });
        if(optionGroup.label) {
            $optionGroupRepresentation.append(_renderOptionGroupLabel(optionGroup.label));
        }
        $(optionGroup).children().each(function (index, option){
            $optionGroupRepresentation.append(_renderOption(option));
        });

        return $optionGroupRepresentation;
    }

    function _renderDisplayArea () {

        return $('<div>', { 
            'class'     : 'selected-value', 
            'data-role' : 'display-area',
            'tabindex'  : 0
             });

    }

    function _renderOption(option) {

        var $option =  $('<div>', {
            'class'     : 'option',
            'data-role' : 'option',
            'tabindex'  : -1,
            'text'      :  option.label || option.innerHTML
        });

        if(option.value) {
            $option.attr('data-value', option.value );
        }

        if(option.label) {
            $option.attr('label', option.label);
        }

        return $option;

    }

    function _updateDisplayArea ($displayArea, $option) {
        var text = $option.attr('label') || $option.text();
        $displayArea.text(text);
    }

    function _renderOptionGroupLabel(label) {

        return $('<div>', { class : 'option-group-label', text : label });
    }

    function _hasOptionGroups($select) {

        var childrenOfSelect = $select.children();
        return childrenOfSelect[0] ? (childrenOfSelect[0].nodeName === 'OPTGROUP') : false;
    }


    window.SelectionBox = SelectionBox;
