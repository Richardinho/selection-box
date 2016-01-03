

    'use strict';


    var RETURN = 13,
        TAB    = 9,
        ESCAPE = 27,
        UP     = 38,
        DOWN   = 40;

    var desktop = true;

    function normalizeDataSource(dataSource) {
        var hasSelected = false;
        var normalized = dataSource.map(function(option) {
            hasSelected |= !!option.selected;
            return { 
                value : option.value || option.text || option,
                text : option.text || option,
                disabled : !!option.disabled,
                selected : !!option.selected
                };  

        });
        if(!hasSelected) {
            normalized[0].selected = true;
        }
        return normalized;
    }

    function _hasOptGroups(selectEl) {
        return !!$('optgroup', selectEl).length;
    }

    function getSelectedValue(dataSource) {
        var selectedValue = dataSource[0].text || dataSource[0]; // defaultValue is first option
        
        dataSource.forEach(function(option) {
            if(option.selected) {
                selectedValue = option.text;
            }   
        });
        return selectedValue;
    }

    function createSelectModel(selectEl, dataSource) {

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

        if(dataSource) {
            //  for the moment we don't support opt groups with datasources
            model.hasOptGroups = false;
            model.options = normalizeDataSource(dataSource);
            model.selectedValue = getSelectedValue(dataSource);

        } else {
            if(_hasOptGroups(selectEl)) {

                model.hasOptGroups = true;
                model.groups = $.map($('optgroup', selectEl).get(), createGroupModel);
                model.selectedValue = 'blah';

            } else {
                model.hasOptGroups = false;
                model.options = $.map($('option', selectEl).get(), createOptionModel);
                model.selectedValue = 'blah';
            }
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
            value : optionEl.value,
            text : optionEl.label || $(optionEl).text(),
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

            var model = createSelectModel(selectEl[0], dataSource);
            this.model = model;

            this.$select = $(selectEl);

            this.render(model);
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
            if(!$(optionEl).hasClass('disabled') && !$(optionEl).parent().hasClass('disabled')) {
                this._selectValue(optionEl);
            }
        },

        _selectValue : function(optionEl) {

            var value = $(optionEl).attr('data-value') || optionEl.innerHTML;
            this.$select[0].value = value;

            $('.selected-value', this.$el).text(optionEl.innerHTML);

            this._closeOptionList();

            $('.selected-value', this.$el).focus();

        },

        _displayClickHandler : function () {
            if(!this.model.disabled) {
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
            if(!this.model.disabled) {
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

        update : function (dataSource) {



        },


        render : function (model) {
            var self = this;

            this.$el = $('<div>', {
                class : 'select-wrapper'
            });

            if(model.disabled) {
                this.$el.addClass('disabled');
            }

            var $displayArea = this._renderDisplayArea();
            var $optionList = $('<div class="option-list hidden">');


            this.$el.append($displayArea);
            this.$el.append($optionList);


            $displayArea.text(model.selectedValue);

            if(model.hasOptGroups) {
                model.groups.forEach(function(optionGroup) {
                    $optionList.append(_renderOptionGroup(optionGroup));
                });

            } else {
                model.options.forEach(function(option) {
                    $optionList.append(_renderOption(option, model.disabled));
                });
            }

            this.$select.hide();
            this.$el.insertAfter(this.$select);

            this.$el.show();

        },

        _renderDisplayArea : function () {

            return $('<div>', { 
                'class'     : 'selected-value', 
                'data-role' : 'display-area',
                'tabindex'  : this.model.disabled ? null : 0 
                 });

        }
    };

    function _renderOptionGroup (optionGroup) {
        var $optionGroupRepresentation = $('<div>', {
            class : 'option-group'
        });
        if(optionGroup.label) {
            $optionGroupRepresentation.append(_renderOptionGroupLabel(optionGroup.label));
        }
        if(optionGroup.disabled) {
            $optionGroupRepresentation.addClass('disabled');
        }
        optionGroup.options.forEach(function (option){

            $optionGroupRepresentation.append(_renderOption(option, optionGroup.disabled));
        });

        return $optionGroupRepresentation;
    }


    function _renderOption(option, parentDisabled) {

        var $option =  $('<a>', {
            'class'     : 'option',
            'data-role' : 'option',
            'tabindex'  : (option.disabled || parentDisabled) ? null : -1,
            'text'      :  option.text,
            'data-value': option.value 
        });

        if(option.disabled || parentDisabled) {
            $option.addClass('disabled');
        }



        return $option;

    }

    function _renderOptionGroupLabel(label) {

        return $('<div>', { class : 'option-group-label', text : label });
    }




    window.SelectionBox = SelectionBox;
