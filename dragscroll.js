/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */

function fixTouches(e) {
    if(e.touches) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
    }
}

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
    var mousemove = 'mousemove touchmove';
    var mouseup = 'mouseup touchend';
    var mousedown = 'mousedown touchstart';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            mouseup.split(' ').forEach(function(ev) {
                _window[removeEventListener](ev, el.mu, 0);
            });
            mousemove.split(' ').forEach(function(ev) {
                _window[removeEventListener](ev, el.mm, 0);
            });
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                mousedown.split(' ').forEach(function(ev) {
                    (cont = el.container || el)[addEventListener](
                        ev,
                        cont.md = function(e) {
                            fixTouches(e);
                            if (!el.hasAttribute('nochilddrag') ||
                                _document.elementFromPoint(
                                    e.pageX, e.pageY
                                ) == cont
                            ) {
                                pushed = 1;
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;

                                e.preventDefault();
                            }
                        }, 0
                    );
                });

                mouseup.split(' ').forEach(function(ev) {
                    _window[addEventListener](
                        ev, cont.mu = function() {pushed = 0;}, 0
                    );
                });
                mousemove.split(' ').forEach(function(ev) {
                    _window[addEventListener](
                        ev,
                        cont.mm = function(e) {
                            fixTouches(e);
                            if (pushed) {
                                (scroller = el.scroller||el).scrollLeft -=
                                    newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                scroller.scrollTop -=
                                    newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                if (el == _document.body) {
                                    (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                    scroller.scrollTop -= newScrollY;
                                }
                            }
                        }, 0
                    );
                });
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

