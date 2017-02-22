dragscroll-zoom
==========

Dragscroll-Zoom is a micro JavaScript library (910 bytes minified) which
enables scrolling via holding the mouse button ("drag and drop" or
"click and hold" style, [online
demo](http://asvd.github.io/dragscroll/)). It has no dependencies and
is written in vanilla JavaScript (which means it works anywhere).  

And I added a zoom function. (It is getting better)  
I did not use jQuery. It is just pure Javascript

### Usage


Download the and unpack
[distribution](https://github.com/asvd/dragscroll/releases/download/v0.0.8/dragscroll-0.0.8.tar.gz),
or install it using [Bower](http://bower.io/):

```sh
$ bower install dragscroll-zoom
```

or npm:

```sh
$ npm install dragscroll-zoom
```

Load the `dragscroll.js` in a preferable way (that is an UMD module):

```html
<script src="path/to/dragscroll.js"></script>
```

Add the `dragscroll` class to a scrollable element:

```html
<button id="zoom-in" onclick="zoomIn();">확대</button>
<button id="zoom-out" onclick="zoomOut();">축소</button>
<div id="map" class="dragscroll">
    <img id="dragsimg" src="./../common/img/거제통영지도.jpg" />
</div>
```

That's it! Now you can scroll it by dragging. You can also add the
`dragscroll` class to the `<body>` element and drag the whole page.

Keep in mind that now it is not possible to select the content with
mouse, so apply the `cursor: default;` CSS style to prevent confusing
the users (or even `cursor: grab;` in case the content is not a text).

You can use `zoom-in()`,`zoom-out()` to zoom in and zoom out a `dragsimg`.

If you add or remove the `dragscroll` class dynamically, invoke
`dragscroll.reset()` to update the listeners.

You can also add the `nochilddrag` attribute to a scrollable element,
which will only enable drag-scrolling for an element itself, but not
for its subchildren. This can be usefull, if you want to enable the
scrolling the area by dragging its empty space, but keep the
opportunity to select the text (see
[example](http://asvd.github.io/jailed/demos/web/process/)).

-
TO DO
==========
* Edit image movement range
-

Follow me on instagram: https://www.instagram.com/cxymxa
