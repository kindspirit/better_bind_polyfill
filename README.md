# better_bind_polyfill
Polyfill for `Function.prototype.bind()` and `Function: name`

This polyfills `Function.prototype.bind()` in IE 5-8. To make this work on host objects such as `window.alert` using the following syntax:

    boundFunc = Function.prototype.bind.call(alert, null, "Hello world");
    boundFunc();// alerts "Hello world"

This also works with `new` operator:

    boundFunc = Date.bind(null, '2007');
    new boundFunc;// creates new Date object with current date in the year 2007

This will also shim `Function: name` in browsers that support both accessors and `Function.prototype.toString()`.

Finally this also monkey patches `Function.prototype.bind()` in ES5 browsers such as Firefox and Safari that otherwise give the name of the target function. The preferred behavior for ES5 bound functions is to return an anonymous function:

Without monkey patch:
    Array.bind().name// returns "Array"

With monkey patch:
    Array.bind().name// returns ""
