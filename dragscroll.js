/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.5
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
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var touchstart = 'touchstart';
    var touchend = 'touchend';
    var touchmove = 'touchmove';
    var touchcancel = 'touchcancel';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;

    var dragged = [];

    var off = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el[removeEventListener](mousedown, el.md, 0);
            el[removeEventListener](touchstart, el.tmd, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
            _window[removeEventListener](touchmove, el.tmm, 0);
            _window[removeEventListener](touchend, el.tmu, 0);
            _window[removeEventListener](touchcancel, el.tmc, 0);
        }
      }

    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el[removeEventListener](mousedown, el.md, 0);
            el[removeEventListener](touchstart, el.tmd, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
            _window[removeEventListener](touchmove, el.tmm, 0);
            _window[removeEventListener](touchend, el.tmu, 0);
            _window[removeEventListener](touchcancel, el.tmc, 0);
        }

        dragged = _document.getElementsByClassName('dragscroll');
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed){
                el[addEventListener](
                    mousedown,
                    el.md = function(e) {
                        pushed = 1;
                        lastClientX = e.clientX;
                        lastClientY = e.clientY;

                        e.preventDefault();
                        e.stopPropagation();
                    }, 0
                );
                el[addEventListener](
                    touchstart,
                    el.tmd = function(e) {
                        pushed = 1;
                        lastClientX = e.touches[0].clientX;
                        lastClientY = e.touches[0].clientY;

                        e.preventDefault();
                        e.stopPropagation();
                    }, 0
                );

                 _window[addEventListener](
                     mouseup, el.mu = function() {pushed = 0;}, 0
                 );
                 _window[addEventListener](
                     touchend, el.tmu = function() {pushed = 0;}, 0
                 );
                 _window[addEventListener](
                     touchcancel, el.tmc = function() {pushed = 0;}, 0
                 );

                _window[addEventListener](
                    mousemove,
                    el.mm = function(e, scroller) {
                        if (pushed) {
                          var top = (- lastClientY + (lastClientY=e.clientY));
                          var left = (- lastClientX + (lastClientX=e.clientX));

                          for(var i = 0; i < dragged.length; i++) {
                            scroller = dragged[i].scroller||dragged[i];
                            scroller.scrollLeft -= left;
                            scroller.scrollTop -= top;
                          }
                        }
                    }, 0
                );
                _window[addEventListener](
                    touchmove,
                    el.tmm = function(e, scroller) {
                      if (pushed) {
                          var top = (- lastClientY + (lastClientY=e.touches[0].clientY));
                          var left = (- lastClientX + (lastClientX=e.touches[0].clientX));

                          for(var i = 0; i < dragged.length; i++) {
                            scroller = dragged[i].scroller||dragged[i];
                            scroller.scrollLeft -= left;
                            scroller.scrollTop -= top;
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
    exports.off = off;
}));

