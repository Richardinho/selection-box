+function($, global){
var utils = utils || {};


	//todo get rid of ie8 crap


	function modernListener(el, event, handler) {
		el.addEventListener(event, handler, false);
	}

	function modernRemoveListener(el, event, handler) {
		el.removeEventListener(event, handler, false);
	}

	function legacyListener(el, event, handler) {
		el.attachEvent('on'+ event, function(e) {
			e.target = e.srcElement;
			e.which = e.keyCode;
			handler(e);
		});
	}

	function legacyRemoveListener (el, event, handler) {
		el.detachEvent('on' + event, handler);
	}

	function modernStopPropagation(event) {
		event.stopPropagation();
	}
	function legacyStopPropagation(event) {
		event.cancelBubble = true;
	}

	function modernPreventDefault(event) {
		event.preventDefault();
	}

	function legacyPreventDefault(event) {
		event.returnValue = false;
	}

	//  init time branching
	if(typeof window.addEventListener === 'function') {
		utils.addListener = modernListener;
		utils.removeListener = modernRemoveListener;
		utils.stopPropagation = modernStopPropagation;
		utils.preventDefault = modernPreventDefault;
	} else {
		utils.addListener = legacyListener;
		utils.removeListener = legacyRemoveListener;
		utils.stopPropagation = legacyStopPropagation;
		utils.preventDefault = legacyPreventDefault;
	}

//  ie8 doesn't not support treating node list as a js object
//  so Array.prototype.slice.apply() will not work
	utils.toArray = function(nodes) {
		var arr = [];
		for (var i=0; i<nodes.length; i++){
			arr[i] = nodes[i];
		}
		return arr;
	};

	utils.getFirstElementChild = function(element) {
		if(element.firstElementChild) {
			return element.firstElementChild;
		} else {
			return findNextSiblingElement(element.firstChild);
		}
	};

	utils.getLastElementChild = function(element) {
		if(element.lastElementChild) {
			return element.lastElementChild;
		} else {
		//todo: browsers > 1e8 will still come here if there is no lastElementchild
			return findPreviousSiblingElement(element.lastChild);
		}
	};

	utils.getPreviousElementSibling = function(element) {
		if(element.previousElementSibling) {
			return element.previousElementSibling;
		} else {
			return findPreviousSiblingElement(element.previousSibling);
		}
	};

	utils.getNextElementSibling = function(element) {
		if(element.nextElementSibling) {
			return element.nextElementSibling;
		} else {
			return findNextSiblingElement(element.nextSibling);
		}
	};

	//  unit tested
	function searchAncestorElements (descendent, selector){
		var parent = descendent.parentNode;
		if(parent === null) { return false; }
		if(parent.matches && parent.matches(selector)) {
			return parent;
		} else {
			return searchAncestorElements(parent, selector);
		}
	}
	utils.searchAncestorElements = searchAncestorElements;


	/*
		Take element as starting point.
		search through dom up until limit for target

	*/
	function searchBetween(el, target, endElSelector) {
		var captured = [];
		if(el.matches(target)) {
			captured.push(el);
		}
		el = utils.getFirstElementChild(el);
		while(el && !el.matches(endElSelector) ) {
			captured = captured.concat(searchBetween(el, target, endElSelector));
			el = findNextSiblingElement(el.nextSibling);
		}
		return captured;
	}
	utils.searchBetween = searchBetween;

	//  unit tested
	utils.toLowerCase = function(obj) {
		return (obj + '').toLowerCase();
	};

	//  unit tested
	utils.toUpperCase = function(obj) {
		return (obj + '').toUpperCase();
	};

	utils.bindHandler = function (event, handler) {
		return function(element) {
			utils.addListener(element, event, handler);
		};
	};

	function findNextSiblingElement(node) {
		if(!node) {
			return false;
		} else if(node.nodeType == 1) {
			return node;
		} else {
			return findNextSiblingElement(node.nextSibling);
		}
	}
	utils.findNextSiblingElement = findNextSiblingElement;

	function findPreviousSiblingElement(node) {
		if(!node) {
			return false;
		} else if(node.nodeType == 1) {
			return node;
		} else {
			return findPreviousSiblingElement(node.previousSibling);
		}
	}
	utils.findPreviousSiblingElement = findPreviousSiblingElement;


	global.SelectionBox = SelectionBox;

}(jQuery, window);