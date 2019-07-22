/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
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
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var mouseenter = 'mouseenter';
    var click = 'click';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;
    var moveThreshold = 4;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            el[removeEventListener](click, el.mc, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
            _document[removeEventListener](mouseenter, el.me, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, startX, startY, moved, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            moved = 0;
                            startX = lastClientX = e.clientX;
                            startY = lastClientY = e.clientY;
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }, 0
                );
                (cont = el.container || el)[addEventListener](
                  click,
                  cont.mc = function(e) {
                    if (moved) {
                      e.preventDefault();
                      e.stopPropagation();
                      moved = 0; pushed = 0;
                    }
                  }, 1
                );
                _window[addEventListener](
                    mouseup, cont.mu = function() {pushed = 0;}, 0
                );
                _document[addEventListener](
                  mouseenter, cont.me = function(e) {if (!e.buttonsPressed) pushed = 0;}, 0
                );
                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                          if (!moved &&
                            (Math.abs(e.clientX - startX) > moveThreshold ||
                             Math.abs(e.clientY - startY) > moveThreshold)) {
                               moved = true;
                             }
                          if (moved) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                          }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

