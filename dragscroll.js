/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.1
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this,
function (exports) {
    // better compression
    var _window = window;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mouseout = 'mouseout';
    var mousedown = 'mousedown';
    var addEventListener = 'addEventListener';
    var removeEventListener = 'removeEventListener';


    /**
     * Returns the actual scrolling element
     * 
     * @param {Element} elem to get scroller for
     * 
     * @returns {Element} scroller
     */
    var get_scroller = function(elem) {
        var scroller = elem;

        if (elem.className.indexOf('intence') != -1 &&
            typeof elem.scroller != 'undefined') {
            scroller = elem.scroller;
        }

        return scroller;
    };

    /**
     * Initializes the dragscroll events for the element
     * 
     * @param {Element} elem
     */
    var drag = function(elem){
        var lastClientX, lastClientY;
        var dragging = false;

        elem.on = function(e) {
            dragging = true;
            lastClientX = e.clientX;
            lastClientY = e.clientY;

            e.preventDefault();
            e.stopPropagation();
        };

        elem.off = function() {
            dragging = false;
        };

        elem.drag = function(e) {
            var scroller = get_scroller(elem);

            if (dragging) {
                scroller.scrollLeft -= (e.clientX - lastClientX);
                scroller.scrollTop -= (e.clientY - lastClientY);

                lastClientX = e.clientX;
                lastClientY = e.clientY;
            }
        };

        elem[addEventListener](mousedown, elem.on, false);
        elem[addEventListener](mouseout, elem.off, false);
        _window[addEventListener](mouseup, elem.off, false);
        _window[addEventListener](mousemove, elem.drag, false);
        
        return elem;
    };

    
    /**
     * Removes dragscroll events for the element
     * 
     * @param {Element} elem
     */
    var undrag = function(elem) {
        elem[removeEventListener](mousedown, elem.on, false);
        elem[removeEventListener](mouseout, elem.off, false);
        _window[removeEventListener](mouseup, elem.off, false);
        _window[removeEventListener](mousemove, elem.drag, false);
    };


    // dragged elements
    var dragged = [];

    /**
     * Runs through all dragged elements, removes dragscroll events
     */
    var destroyDrag = function() {
        for (var i = 0, len = dragged.length; i < len; i++) {
            undrag(dragged[i]);
        }
        dragged = [];
    };
    
    
    /**
     * Runs through all elements having the dragscroll class,
     * initializes the events
     */
    var createDrag = function() {
        var elems = document.getElementsByClassName('dragscroll');
        for (var i = 0, len = elems.length; i < len; i++) {
            dragged.push(drag(elems[i]));
        }
    };
      
    

    /**
     * Updates the dragscroll for the elments
     */
    var reset = function() {
        destroyDrag();
        createDrag();
    };
    


    if (document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, false);
    }

    exports.reset = reset;
}));
