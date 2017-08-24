/*
    version 2.0.0 of Selection Box
*/

"use strict";

function SelectionBox(el) {

    this.model = {
        open : false,
        focusOn: 2,
        options : [
            { value : 'usa',    label : 'United States of America, In God We Trust', selected : false },
            { value : 'mexico', label : 'Mexico',                                    selected : true  },
            { value : 'uk',     label : 'United Kingdom',                            selected : false },
        ]
    };

    this.el = el;

}

SelectionBox.prototype = {

    onKeyDown : function (event) {

        event.preventDefault();
        const key = this.getKeyFromEvent(event);
    },

    getKeyFromEvent : function (event) {

        return 'a';

    },

    handleClick : function (event) {

        // work out where event happened
        var target = event.target;

        if (target.classList.contains('sb__main')) {

            event.stopPropagation();

            if (this.isOpen) {
                var event = new CustomEvent("hide", {});
            } else {
                var event = new CustomEvent("show", {});
            }
            this.el.dispatchEvent(event);
        }
    },

    onShow : function (event) {
        this.isOpen = true;
        // maybe call user provided callback here. e.g. for analytics
        this.el.querySelector('.sb__options').style.display = 'block';
    },

    onHide : function (event) {
        this.isOpen = false;
        // maybe call user provided callback here. e.g. for analytics
        this.el.querySelector('.sb__options').style.display = 'none';
    },

    onSelect : function (event) {


    },

    render : function () {


    },

    start : function () {

        this.el.addEventListener('click', this.handleClick.bind(this));

        this.el.addEventListener('show', this.onShow.bind(this));
        this.el.addEventListener('hide', this.onHide.bind(this));

        this.el.addEventListener('keydown', this.onKeyDown.bind(this));
    }
};