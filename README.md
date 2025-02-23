# better_bind_polyfill
Polyfill for `Function.prototype.bind()` (Tested in IE 5-8)<br>
Shim for `Function: name` (Tested in IE 9-11)

To use:
```
<script src="Function.min.js"></script>
```

This polyfills `Function.prototype.bind()` in IE 5-8 as well any other browser that supports ES3+ but is lacking support for `Function.prototype.bind()`

The shim for `Function: name` works in IE because IE does not natively support `Function: name`. Old browsers that supported `Function: name` natively but didn't conform to ES6 cannot be shimmed because `Function: name` was neither configurable nor writable. It also can't be shimmed in IE 5-8 as there was no getter support on prototypes (but boundFunc.name is still assigned to "bound funcName" or just "bound " if the target function's name cannot be retrieved.)

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
f.name// "bound "
f.length// 0
```

## Caveats

Unlike real bound functions, functions created with this polyfill have a prototype property. But since it matches the prototype property of the target function at the time of its creation, it responds to instanceof checks in the same way as the target function would. If the target function does not have a prototype property, then the bound function's prototype property will be undefined.

Also unlike real bound functions, functions created with this polyfill when used with .call(object) or .apply(object) will trigger the `new` operator if the passed object is empty and its constructor property matches the target function (or obj.constructor==Object if the target function does not have a prototype property.)

So for example:

```
var S = String.bind()
, s = new S// constructs new String object
S.call(s)// should be "", but since s.constructor==String, polyfill creates another String object
```

But since there is never any reason to use .call() or .apply() with a bound function, most of the time that doen't matter.
