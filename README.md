# better_bind_polyfill
Polyfill for `Function.prototype.bind()` (Tested in IE 5-8)
Shim for `Function: name` (Tested in IE 9-11)

To use:
```
<script src="Function.min.js"></script>
```

This polyfills `Function.prototype.bind()` in IE 5-8 as well any other browser that supports ES3+ but is lacking support for `Function.prototype.bind()`

Examples:
```
var f = Date.bind(null, '2007', '2');//creates bound function
f.length===Date.length // true
f.name==="bound Date"// true (conforms to ES6 function naming)
new f;// creates object with Date constructor and year set to 2007
new f instanceof f;// true
```

Polyfill Object.hasOwn():
```
Object.hasOwn = Object.hasOwn || Function.prototype.call.bind({}.hasOwnProperty);
Object.hasOwn([], 'length');// true
```


Host functions in IE 5-8 such as `window.alert` do not inherit from Function.prototype. So to make this work on host functions in IE 5-8, use the following syntax:
```
f = Function.prototype.bind.call(alert, null, "Hello world");
f();// alerts "Hello world"
```
