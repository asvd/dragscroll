dragscroll
==========

Dragscroll is a tiny javascript library (425 bytes minified) which
enables scrolling via holding the mouse button (drag-n-drop style,
[online demo](http://asvd.github.io/dragscroll/)).


### Usage


Download the
[distribution](https://github.com/asvd/dragscroll/releases/download/v0.0.2/dragscroll-0.0.2.tar.gz),
unpack it and load the `dragscroll.js` or `dragscroll_micro.js`:

```html
<script src="dragscroll.js"></script>
```

Add the `dragscroll` class to a scrollable element:

```html
<div class=dragscroll>
    Big text goes here...
</div>
```

That's it! Now you can scroll it by dragging. You can also add the
`dragscroll` class to the `<body>` element and drag the whole page.

Keep in mind that now it is not possible to select the content with
mouse, so apply the `cursor: default;` CSS style to prevent confusing
the users (or even `cursor: grab;` in case the content is not a text).


### Micro verison

Located in `dragscroll_micro.js`, its size is 425 bytes, and it just works.


### Full-featured verison

Located in `dragscroll.js`, has some additional features:

- that is an UMD module, so you can load it in a preferrable way;

- it can be loaded after the page load, the library will find the elements with the `dragscroll` class and setup the events for them (micro version does this on page load and should be included in the `<head>`);

- add or remove the `dragscroll` class dynamically (if you do it,
invoke `dragscroll.reset()` to update the listeners).


Have fun!
