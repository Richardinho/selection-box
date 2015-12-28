

+function() {

    'use strict';

    function SelectionBox(selectEl){

        this.select = selectEl;
        this.$select = $(selectEl);

        this.render();
    }

    SelectionBox.prototype = {


        render : function () {
            var self = this;

            this.$el = $('<div>', {
                class : 'select-wrapper'
            });

            var $displayArea = $('<div>', { class : 'selected-value' });
            var $optionList = $('<div class="option-list">');

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

    function _renderOption(option) {

        return $('<div>', {
            class : 'option',
            text : option.innerHTML
        });

    }

    function _updateDisplayArea ($displayArea, $option) {
        var text = $option.attr('label') || $option.text();
        $displayArea.text(text);
    }

    function _renderOptionGroupLabel(label) {

        return $('<h2>', { class : 'option-group-label', text : label });
    }

    function _hasOptionGroups($select) {

        var childrenOfSelect = $select.children();
        return childrenOfSelect[0] ? (childrenOfSelect[0].nodeName === 'OPTGROUP') : false;
    }


    window.SelectionBox = SelectionBox;
}();