# better_bind_polyfill
Polyfill for `Function.prototype.bind()` (Tested in IE 5-8, Opera 9.5-10, Chrome 1-15, Firefox 2-4)<br>
Shim for `Function: name` (Tested in IE 9-11, Opera 9.5-10)

To use:
```
<script src="Function.min.js"></script>
```

This polyfills `Function.prototype.bind()` in ES3 compatible browsers lacking support for `Function.prototype.bind()`

The shim for `Function: name` works in Internet Explorer (IE) and Opera 10 because they do not natively support `Function: name`. Old browsers that natively supported `Function: name` such as Firefox, Safari and Chrome but didn't conform to ES6 cannot be shimmed because `Function: name` was neither configurable nor writable. It also can't be shimmed in IE 5-8 as there was no getter support on prototypes (but boundFunc.name is still set to "bound funcName" or just "bound " if the target function doesn't have a name.)

Examples:
```
var f = Date.bind(null, '2007', '2');//creates bound function `f`
f.name// "bound Date" (conforms to ES6 function naming)
new f// creates object with Date constructor and year set to 2007
new f instanceof f// true
new f instanceof Date// true
f.length// 5
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
f.name// "bound alert"
f.length// 0
```

## Caveats

Unlike real bound functions, functions created with this polyfill have a prototype property. But since at the time of its creation the bound function's prototype property is set to the prototype property of the target function, it responds to `instanceof` checks in the same way as a real bound function would.

Also unlike real bound functions, functions created with this polyfill when used with .call(object) or .apply(object) will internally trigger the `new` operator if the passed object is empty and its constructor property matches the target function (or obj.constructor==Object if the target function does not have a prototype property.)

So for example:

```
var S = String.bind()
, s = new S// constructs new String object
S.call(s)// should be "", but since s.constructor==String, polyfill creates another String object
```

But since there is usually never any reason to use .call() or .apply() with a bound function, the above example is an edge case you would typically never find anywhere. So it's just something to be aware of, not worry about.
