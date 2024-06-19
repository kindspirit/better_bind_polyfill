// bind.js
//
// A polyfill for Function.prototype.bind() for IE 5-8
// Allows binding to functions that are host objects such as alert()
// e.g.
// var helloworld = Function.prototype.bind.call(alert, null, 'Hello World');
// helloworld();// alerts "Hello World"
// This should work on any ES3+ browser but it has only been tested on IE


!function(Object,PROTOTYPE$,LENGTH$,FUNCTION$,FUNCTION_PROTO){
	'use strict'; // Remove this from minified code
	FUNCTION_PROTO = Function[PROTOTYPE$];
	
	// The following polyfills Function.prototype.bind() in IE 5-8
	FUNCTION_PROTO.bind = FUNCTION_PROTO.bind || function(thisArg) {// call this bind after minifying
		var p = []// parameters array
		,	SLICE = p.slice// Shortcut to Array.prototype.slice()
		,	BOUND_ARGS = SLICE.call(arguments, 1)// Create array of bound args, minus thisArg
		,	TARGET_FUNCTION = this// Target function
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#length
		,	i = TARGET_FUNCTION[LENGTH$] - BOUND_ARGS[LENGTH$]//Length of target minus number of bound args

		try {
			// Since typeof doesn't return "function" on host objects in IE 5-8
			// skip typeof check by throwing when target is a host object.
			// But only apply the above to host objects that don't have a
			// toString method as that is what indicates that it's a function.
			TARGET_FUNCTION.toString || Object[PROTOTYPE$].propertyIsEnumerable.call(TARGET_FUNCTION);
			// i does nothing. setting TARGET_FUNCTION to 0 makes it throw below
			typeof TARGET_FUNCTION==FUNCTION$? i: TARGET_FUNCTION = 0;
		}
		catch(e) {
		}
		if (!TARGET_FUNCTION) {
			throw TypeError('Bind must be called on a '+FUNCTION$);
		}
		// Make sure i is a non-negative integer and not NaN
		// You'll end up with 0 length on host objects which is the same in IE9+
		// but differs in modern browsers that produce the correct length
		i>0? i: i=0;// Fewer characters than `if (!(i>0)) i=0;`
		
		// Populate parameters to give function correct length as described
		// above. I used e prefix in params because it compresses well.
		while (i--) {
			p[i] = 't'+i;
		}
		// For minification reasons, I reused p variable to refer to the bound function
		// This also frees up memory since reference to the p array is no longer needed
		// For smaller file size, manuall replace Function with eval after minification.
		p = Function('f', 'return function(' + p.join() + '){return f.apply(this, arguments)}')(function() {
			var ARGS = BOUND_ARGS.concat(SLICE.call(arguments))// put all args into an array
			,	THIS = this
			// An instanceof check can help estimate if target function was called
			// with new. But it will throw if TARGET_FUNCTION has non-object prototype
			// So this first checks that TARGET_FUNCTION's prototype is an object and
			// if not checks that this.constructor===Object which is true when called
			// with new on a function with no prototype object.
			// This estimates whether bound function was called with new operator.
			,	IS_CALLED_WITH_NEW = Object(TARGET_FUNCTION[PROTOTYPE$])===TARGET_FUNCTION[PROTOTYPE$]? THIS instanceof TARGET_FUNCTION: THIS && THIS.constructor===Object
			,	i = IS_CALLED_WITH_NEW && ARGS[LENGTH$]// falsy if not called with new
			,	params = []
			while (i--) {
				params[i] = 'ARGS['+i+']'
			}
			return IS_CALLED_WITH_NEW? Function('TARGET_FUNCTION, ARGS','return new TARGET_FUNCTION('+params.join()+')')(TARGET_FUNCTION, ARGS): FUNCTION_PROTO.apply.call(TARGET_FUNCTION, thisArg, ARGS);
		});
		p[PROTOTYPE$] = TARGET_FUNCTION[PROTOTYPE$];// Mimic native bind so that new p instanceof p === true
		return p;
	}
}(Object,'prototype','length','function');// Object is in the same realm calling the function so we're good
