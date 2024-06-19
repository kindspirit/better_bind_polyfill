# better_bind_polyfill
Polyfill for `Function.prototype.bind()` and `Function: name`

This polyfills `Function.prototype.bind()` in IE 5-8. To make this work on host objects such as `window.alert`, use the following syntax:

```
boundFunc = Function.prototype.bind.call(alert, null, "Hello world");
boundFunc();// alerts "Hello world"
```

This also works with `new` operator:

```
boundFunc = Date.bind(null, '2007', '2');
new boundFunc;// creates Date object with the year set to 2007
```
