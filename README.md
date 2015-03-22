dragscroll
==========

Dragscroll is a tinye javascript library (978 bytes minified) for
drag-n-drop scrolling style
([demo](http://asvd.github.io/dragscroll/)).


### Installation


Download the
[distribution](https://github.com/asvd/dragscroll/releases/download/v0.0.1/dragscroll-0.0.1.tar.gz),
unpack it and load the `dragscroll.js` in a preferrable way. That is
an UMD module, thus for instance it may simply be loaded as a plain
JavaScript file using the `<script>` tag:

```html
<script src="dragscroll.js"></script>
```

Add the `dragscroll` class to a scrollable element:

```html
<div class=dragscroll>
    Big text goes here...
</div>
```

That's it! Now you can scroll it by dragging.

Keep in mind that now it is not possible to select the content with
mouse, so apply the `cursor: default;` CSS style to prevent confusing
the users (or event `cursor: grab;` in case the content is not a
text).

