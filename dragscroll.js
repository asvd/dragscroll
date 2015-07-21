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
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;

    var ticking = false;
    var current = {x:0, y:0};
    var last = {x:0, y:0};
    var velocity = {x:0, y:0};
    var timestamp;
    var animation = 0;

    function start_ticker(){
        ticking = true;
        tick();
    }

    function stop_ticker(){
        clearTimeout(ticking);
        ticking = false;
        timestamp = Date.now();
        animation = requestAnimationFrame(autoScroll);
    }

    function tick(){
        if(ticking){
            ticking = setTimeout(tick, 100);
            velocity.x = last.x - current.x;
            velocity.y = last.y - current.y;
            last.x = current.x;
            last.y = current.y;
        }
    }

    var timeConstant = 125; // ms

    function scroll(x,y){
        window.scrollBy(x, y);
    }
    function autoScroll() {
        var elapsed, delta = {x:0, y:0}, dampening;
        target = {x: -0, y: -0};

        if (velocity.x || velocity.y) {
            elapsed = Date.now() - timestamp;
            dampening = 1.5 * Math.exp(-elapsed / timeConstant)
            delta.x = -velocity.x * dampening;
            delta.y = -velocity.y * dampening;
            if (delta.x > 10 || delta.x < -10) {
                scroll(delta.x, delta.y);
                requestAnimationFrame(autoScroll);
            }
        }
    }

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        dragged = _document.getElementsByClassName('dragscroll');
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed){
                el[addEventListener](
                    mousedown,
                    el.md = function(e) {
                        cancelAnimationFrame(animation);
                        document.body.classList.add("down");
                        pushed = 1;
                        lastClientX = e.clientX;
                        lastClientY = e.clientY;

                        start_ticker();

                        e.preventDefault();
                        e.stopPropagation();
                    }, 0
                );

                 _window[addEventListener](
                     mouseup, el.mu = function() {
                        document.body.classList.remove("down");
                        stop_ticker();
                        pushed = 0;
                     }, 0
                 );

                _window[addEventListener](
                    mousemove,
                    el.mm = function(e, scroller) {
                        scroller = el.scroller || el;
                        if (pushed) {
                             scrollX = lastClientX - (lastClientX=e.clientX);
                             scrollY = lastClientY - (lastClientY=e.clientY);
                             scroll(scrollX, scrollY);
                             current.x += scrollX;
                             current.y += scrollY;
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

