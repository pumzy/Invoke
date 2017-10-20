/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {


}).call(this);
(function() {


}).call(this);
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=133)}([function(e,t,n){"use strict";e.exports=n(26)},function(e,t,n){"use strict";function r(e,t,n,r,a,i,s,u){if(o(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,a,i,s,u],f=0;l=new Error(t.replace(/%s/g,function(){return c[f++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var o=function(e){};o=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")},e.exports=r},function(e,t,n){"use strict";var r=n(13),o=r;!function(){var e=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0,a="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.error(a);try{throw new Error(a)}catch(e){}};o=function(t,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!t){for(var r=arguments.length,o=Array(r>2?r-2:0),a=2;a<r;a++)o[a-2]=arguments[a];e.apply(void 0,[n].concat(o))}}}(),e.exports=o},function(e,t,n){"use strict";function r(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(235),o=n(113),a=n(237);n.d(t,"Provider",function(){return r.b}),n.d(t,"createProvider",function(){return r.a}),n.d(t,"connectAdvanced",function(){return o.a}),n.d(t,"connect",function(){return a.a})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(258);n.d(t,"BrowserRouter",function(){return r.a});var o=n(271);n.d(t,"HashRouter",function(){return o.a});var a=n(123);n.d(t,"Link",function(){return a.a});var i=n(273);n.d(t,"MemoryRouter",function(){return i.a});var s=n(274);n.d(t,"NavLink",function(){return s.a});var u=n(275);n.d(t,"Prompt",function(){return u.a});var l=n(276);n.d(t,"Redirect",function(){return l.a});var c=n(277);n.d(t,"Route",function(){return c.a});var f=n(278);n.d(t,"Router",function(){return f.a});var p=n(279);n.d(t,"StaticRouter",function(){return p.a});var d=n(280);n.d(t,"Switch",function(){return d.a});var h=n(281);n.d(t,"matchPath",function(){return h.a});var m=n(282);n.d(t,"withRouter",function(){return m.a})},function(e,t,n){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,s,u=r(e),l=1;l<arguments.length;l++){n=Object(arguments[l]);for(var c in n)a.call(n,c)&&(u[c]=n[c]);if(o){s=o(n);for(var f=0;f<s.length;f++)i.call(n,s[f])&&(u[s[f]]=n[s[f]])}}return u}},function(e,t,n){"use strict";function r(e,t){return 1===e.nodeType&&e.getAttribute(h)===String(t)||8===e.nodeType&&e.nodeValue===" react-text: "+t+" "||8===e.nodeType&&e.nodeValue===" react-empty: "+t+" "}function o(e){for(var t;t=e._renderedComponent;)e=t;return e}function a(e,t){var n=o(e);n._hostNode=t,t[v]=n}function i(e){var t=e._hostNode;t&&(delete t[v],e._hostNode=null)}function s(e,t){if(!(e._flags&m.hasCachedChildNodes)){var n=e._renderedChildren,i=t.firstChild;e:for(var s in n)if(n.hasOwnProperty(s)){var u=n[s],l=o(u)._domID;if(0!==l){for(;null!==i;i=i.nextSibling)if(r(i,l)){a(u,i);continue e}d(!1,"Unable to find element with ID %s.",l)}}e._flags|=m.hasCachedChildNodes}}function u(e){if(e[v])return e[v];for(var t=[];!e[v];){if(t.push(e),!e.parentNode)return null;e=e.parentNode}for(var n,r;e&&(r=e[v]);e=t.pop())n=r,t.length&&s(r,e);return n}function l(e){var t=u(e);return null!=t&&t._hostNode===e?t:null}function c(e){if(void 0===e._hostNode&&d(!1,"getNodeFromInstance: Invalid argument."),e._hostNode)return e._hostNode;for(var t=[];!e._hostNode;)t.push(e),e._hostParent||d(!1,"React DOM tree root should always have a node reference."),e=e._hostParent;for(;t.length;e=t.pop())s(e,e._hostNode);return e._hostNode}var f=(n(3),n(21)),p=n(87),d=n(1),h=f.ID_ATTRIBUTE_NAME,m=p,v="__reactInternalInstance$"+Math.random().toString(36).slice(2),g={getClosestInstanceFromNode:u,getInstanceFromNode:l,getNodeFromInstance:c,precacheChildNodes:s,precacheNode:a,uncacheNode:i};e.exports=g},function(e,t,n){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen,isInWorker:!r};e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchOneUserByID=t.fetchOneUser=t.searchUsers=t.fetchRandomUsers=t.fetchAllUsers=t.fetchUsers=t.clearUsers=t.removeUser=t.receiveRandomUsers=t.receiveUsers=t.receiveUser=t.RANDOM_USERS=t.REMOVE_USER=t.RECEIVE_USER=t.CLEAR_USERS=t.RECEIVE_USERS=void 0;var r=n(285),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_USERS="RECEIVE_USERS"),s=t.CLEAR_USERS="CLEAR_USERS",u=t.RECEIVE_USER="RECEIVE_USER",l=t.REMOVE_USER="REMOVE_USER",c=t.RANDOM_USERS="RANDOM_USERS",f=t.receiveUser=function(e){return{type:u,user:e}},p=t.receiveUsers=function(e){return{type:i,users:e}},d=t.receiveRandomUsers=function(e){return{type:c,users:e}};t.removeUser=function(e){return{type:l,user:e}},t.clearUsers=function(e){return{type:s,user:e}},t.fetchUsers=function(){return function(e){return o.fetchUsers().then(function(t){return e(p(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.fetchAllUsers=function(){return function(e){return o.fetchAllUsers().then(function(t){return e(p(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.fetchRandomUsers=function(){return function(e){return o.fetchRandomUsers().then(function(t){return e(d(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.searchUsers=function(e){return function(t){return o.searchUsers(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchOneUser=function(e){return function(t){return o.fetchOneUser(e).then(function(e){return t(f(e))})}},t.fetchOneUserByID=function(e){return function(t){return o.fetchOneUserByID(e).then(function(e){return t(f(e))})}}},function(e,t,n){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,o=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r};e.exports=n(85)(o,!0)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteSong=t.fetchSongsByUserID=t.updateSongCount=t.updateSong=t.createSong=t.fetchSongByTitle=t.fetchOneSong=t.searchSongs=t.fetchLikedSongs=t.fetchChartSongs=t.fetchSongs=t.removeSongs=t.removeSong=t.receiveSongs=t.receiveSong=t.REMOVE_SONGS=t.REMOVE_SONG=t.RECEIVE_SONG=t.RECEIVE_SONGS=void 0;var r=n(125),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_SONGS="RECEIVE_SONGS"),s=t.RECEIVE_SONG="RECEIVE_SONG",u=t.REMOVE_SONG="REMOVE_SONG",l=t.REMOVE_SONGS="REMOVE_SONGS",c=t.receiveSong=function(e){return{type:s,song:e}},f=t.receiveSongs=function(e){return{type:i,songs:e}},p=t.removeSong=function(e){return{type:u,song:e}};t.removeSongs=function(){return{type:l}},t.fetchSongs=function(){return function(e){return o.fetchSongs().then(function(t){return e(f(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.fetchChartSongs=function(e,t){return function(n){return o.fetchChartSongs(e,t).then(function(e){return n(f(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.fetchLikedSongs=function(){return function(e){return o.fetchLikedSongs().then(function(t){return e(f(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.searchSongs=function(e){return function(t){return o.searchSongs(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchOneSong=function(e){return function(t){return o.fetchOneSong(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchSongByTitle=function(e){return function(t){return o.fetchSongByTitle(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.createSong=function(e){return function(t){return o.createSong(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.updateSong=function(e,t){return function(n){return o.updateSong(e,t).then(function(e){return n(c(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.updateSongCount=function(e){return function(t){return o.updateSongCount(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchSongsByUserID=function(e){return function(t){return o.fetchSongByUserID(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.deleteSong=function(e){return function(t){return o.deleteSong(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}}},function(e,t,n){"use strict";function r(e){var t=Function.prototype.toString,n=Object.prototype.hasOwnProperty,r=RegExp("^"+t.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");try{var o=t.call(e);return r.test(o)}catch(e){return!1}}function o(e){var t=l(e);if(t){var n=t.childIDs;c(e),n.forEach(o)}}function a(e,t,n){return"\n    in "+(e||"Unknown")+(t?" (at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+")":n?" (created by "+n+")":"")}function i(e){return null==e?"#empty":"string"==typeof e||"number"==typeof e?"#text":"string"==typeof e.type?e.type:e.type.displayName||e.type.name||"Unknown"}function s(e){var t,n=x.getDisplayName(e),r=x.getElement(e),o=x.getOwnerID(e);return o&&(t=x.getDisplayName(o)),g(r,"ReactComponentTreeHook: Missing React element for debugID %s when building stack",e),a(n,r&&r._source,t)}var u,l,c,f,p,d,h,m=(n(27),n(17)),v=n(1),g=n(2),y="function"==typeof Array.from&&"function"==typeof Map&&r(Map)&&null!=Map.prototype&&"function"==typeof Map.prototype.keys&&r(Map.prototype.keys)&&"function"==typeof Set&&r(Set)&&null!=Set.prototype&&"function"==typeof Set.prototype.keys&&r(Set.prototype.keys);if(y){var b=new Map,E=new Set;u=function(e,t){b.set(e,t)},l=function(e){return b.get(e)},c=function(e){b.delete(e)},f=function(){return Array.from(b.keys())},p=function(e){E.add(e)},d=function(e){E.delete(e)},h=function(){return Array.from(E.keys())}}else{var w={},_={},k=function(e){return"."+e},C=function(e){return parseInt(e.substr(1),10)};u=function(e,t){var n=k(e);w[n]=t},l=function(e){var t=k(e);return w[t]},c=function(e){var t=k(e);delete w[t]},f=function(){return Object.keys(w).map(C)},p=function(e){var t=k(e);_[t]=!0},d=function(e){var t=k(e);delete _[t]},h=function(){return Object.keys(_).map(C)}}var S=[],x={onSetChildren:function(e,t){var n=l(e);n||v(!1,"Item must have been set"),n.childIDs=t;for(var r=0;r<t.length;r++){var o=t[r],a=l(o);a||v(!1,"Expected hook events to fire for the child before its parent includes it in onSetChildren()."),null==a.childIDs&&"object"==typeof a.element&&null!=a.element&&v(!1,"Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren()."),a.isMounted||v(!1,"Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren()."),null==a.parentID&&(a.parentID=e),a.parentID!==e&&v(!1,"Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).",o,a.parentID,e)}},onBeforeMountComponent:function(e,t,n){u(e,{element:t,parentID:n,text:null,childIDs:[],isMounted:!1,updateCount:0})},onBeforeUpdateComponent:function(e,t){var n=l(e);n&&n.isMounted&&(n.element=t)},onMountComponent:function(e){var t=l(e);t||v(!1,"Item must have been set"),t.isMounted=!0,0===t.parentID&&p(e)},onUpdateComponent:function(e){var t=l(e);t&&t.isMounted&&t.updateCount++},onUnmountComponent:function(e){var t=l(e);if(t){t.isMounted=!1;0===t.parentID&&d(e)}S.push(e)},purgeUnmountedComponents:function(){if(!x._preventPurging){for(var e=0;e<S.length;e++){o(S[e])}S.length=0}},isMounted:function(e){var t=l(e);return!!t&&t.isMounted},getCurrentStackAddendum:function(e){var t="";if(e){var n=i(e),r=e._owner;t+=a(n,e._source,r&&r.getName())}var o=m.current,s=o&&o._debugID;return t+=x.getStackAddendumByID(s)},getStackAddendumByID:function(e){for(var t="";e;)t+=s(e),e=x.getParentID(e);return t},getChildIDs:function(e){var t=l(e);return t?t.childIDs:[]},getDisplayName:function(e){var t=x.getElement(e);return t?i(t):null},getElement:function(e){var t=l(e);return t?t.element:null},getOwnerID:function(e){var t=x.getElement(e);return t&&t._owner?t._owner._debugID:null},getParentID:function(e){var t=l(e);return t?t.parentID:null},getSource:function(e){var t=l(e),n=t?t.element:null;return null!=n?n._source:null},getText:function(e){var t=x.getElement(e);return"string"==typeof t?t:"number"==typeof t?""+t:null},getUpdateCount:function(e){var t=l(e);return t?t.updateCount:0},getRootIDs:h,getRegisteredIDs:f,pushNonStandardWarningStack:function(e,t){if("function"==typeof console.reactStack){var n=[],r=m.current,o=r&&r._debugID;try{for(e&&n.push({name:o?x.getDisplayName(o):null,fileName:t?t.fileName:null,lineNumber:t?t.lineNumber:null});o;){var a=x.getElement(o),i=x.getParentID(o),s=x.getOwnerID(o),u=s?x.getDisplayName(s):null,l=a&&a._source;n.push({name:u,fileName:l?l.fileName:null,lineNumber:l?l.lineNumber:null}),o=i}}catch(e){}console.reactStack(n)}},popNonStandardWarningStack:function(){"function"==typeof console.reactStackEnd&&console.reactStackEnd()}};e.exports=x},function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";var r=null;r=n(159),e.exports={debugTool:r}},function(e,t,n){"use strict";var r=n(262);n.d(t,"a",function(){return r.a});var o=n(264);n.d(t,"b",function(){return o.a});var a=n(265);n.d(t,"c",function(){return a.a});var i=n(122);n.d(t,"d",function(){return i.a});var s=n(74);n.d(t,"e",function(){return s.a});var u=n(268);n.d(t,"f",function(){return u.a});var l=n(269);n.d(t,"g",function(){return l.a});var c=n(75);n.d(t,"h",function(){return c.a});var f=n(270);n.d(t,"i",function(){return f.a})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.RECEIVE_AUDIO="RECEIVE_AUDIO",o=t.REMOVE_AUDIO="REMOVE_AUDIO",a=t.REMOVE_AUDIO_TOKEN="REMOVE_AUDIO_TOKEN",i=t.RECEIVE_AUDIO_TOKEN="RECEIVE_AUDIO_TOKEN",s=t.PROVIDE_AUDIO_PLAYBACK_TIME="PROVIDE_AUDIO_PLAYBACK_TIME",u=t.CHANGE_PLAYBACK_TIME="CHANGE_PLAYBACK_TIME",l=t.REQUEST_AUDIO_PLAYBACK_TIME="REQUEST_AUDIO_PLAYBACK_TIME";t.CLEAR_AUDIO_REQUEST="CLEAR_AUDIO_REQUEST",t.receiveAudio=function(e){return{type:r,audio:e}},t.receivePauseToken=function(){return{type:i,token:"PAUSED"}},t.receivePlayToken=function(){return{type:i,token:"PLAYING"}},t.removeAudio=function(){return{type:o}},t.removeAudioToken=function(){return{type:a}},t.provideAudioPlaybackTime=function(e){return{type:s,time:e}},t.requestAudioPlaybackTime=function(){return{type:l,request:"REQUEST-TIME"}},t.changePlaybackTime=function(e){return{type:u,token:"WAVEFORM-OVERRIDE",set:e}}},function(e,t,n){"use strict";var r={current:null};e.exports=r},function(e,t,n){"use strict";function r(){P.ReactReconcileTransaction&&w||v(!1,"ReactUpdates: must inject a reconcile transaction class and batching strategy")}function o(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=f.getPooled(),this.reconcileTransaction=P.ReactReconcileTransaction.getPooled(!0)}function a(e,t,n,o,a,i){return r(),w.batchedUpdates(e,t,n,o,a,i)}function i(e,t){return e._mountOrder-t._mountOrder}function s(e){var t=e.dirtyComponentsLength;t!==g.length&&v(!1,"Expected flush transaction's stored dirty-components length (%s) to match dirty-components array length (%s).",t,g.length),g.sort(i),y++;for(var n=0;n<t;n++){var r=g[n],o=r._pendingCallbacks;r._pendingCallbacks=null;var a;if(d.logTopLevelRenders){var s=r;r._currentElement.type.isReactTopLevelWrapper&&(s=r._renderedComponent),a="React update: "+s.getName(),console.time(a)}if(h.performUpdateIfNecessary(r,e.reconcileTransaction,y),a&&console.timeEnd(a),o)for(var u=0;u<o.length;u++)e.callbackQueue.enqueue(o[u],r.getPublicInstance())}}function u(e){if(r(),!w.isBatchingUpdates)return void w.batchedUpdates(u,e);g.push(e),null==e._updateBatchNumber&&(e._updateBatchNumber=y+1)}function l(e,t){w.isBatchingUpdates||v(!1,"ReactUpdates.asap: Can't enqueue an asap callback in a context whereupdates are not being batched."),b.enqueue(e,t),E=!0}var c=(n(3),n(6)),f=n(91),p=n(24),d=n(92),h=n(28),m=n(45),v=n(1),g=[],y=0,b=f.getPooled(),E=!1,w=null,_={initialize:function(){this.dirtyComponentsLength=g.length},close:function(){this.dirtyComponentsLength!==g.length?(g.splice(0,this.dirtyComponentsLength),S()):g.length=0}},k={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},C=[_,k];c(o.prototype,m,{getTransactionWrappers:function(){return C},destructor:function(){this.dirtyComponentsLength=null,f.release(this.callbackQueue),this.callbackQueue=null,P.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return m.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),p.addPoolingTo(o);var S=function(){for(;g.length||E;){if(g.length){var e=o.getPooled();e.perform(s,null,e),o.release(e)}if(E){E=!1;var t=b;b=f.getPooled(),t.notifyAll(),f.release(t)}}},x={injectReconcileTransaction:function(e){e||v(!1,"ReactUpdates: must provide a reconcile transaction class"),P.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){e||v(!1,"ReactUpdates: must provide a batching strategy"),"function"!=typeof e.batchedUpdates&&v(!1,"ReactUpdates: must provide a batchedUpdates() function"),"boolean"!=typeof e.isBatchingUpdates&&v(!1,"ReactUpdates: must provide an isBatchingUpdates boolean attribute"),w=e}},P={ReactReconcileTransaction:null,batchedUpdates:a,enqueueUpdate:u,flushBatchedUpdates:S,injection:x,asap:l};e.exports=P},function(e,t,n){"use strict";function r(e,t,n,r){delete this.nativeEvent,delete this.preventDefault,delete this.stopPropagation,this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n;var o=this.constructor.Interface;for(var a in o)if(o.hasOwnProperty(a)){delete this[a];var i=o[a];i?this[a]=i(n):"target"===a?this.target=r:this[a]=n[a]}var u=null!=n.defaultPrevented?n.defaultPrevented:!1===n.returnValue;return this.isDefaultPrevented=u?s.thatReturnsTrue:s.thatReturnsFalse,this.isPropagationStopped=s.thatReturnsFalse,this}function o(e,t){function n(e){return o(a?"setting the method":"setting the property","This is effectively a no-op"),e}function r(){return o(a?"accessing the method":"accessing the property",a?"This is a no-op function":"This is set to null"),t}function o(t,n){u(!1,"This synthetic event is reused for performance reasons. If you're seeing this, you're %s `%s` on a released/nullified synthetic event. %s. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-pooling for more information.",t,e,n)}var a="function"==typeof t;return{configurable:!0,set:n,get:r}}var a=n(6),i=n(24),s=n(13),u=n(2),l=!1,c="function"==typeof Proxy,f=["dispatchConfig","_targetInst","nativeEvent","isDefaultPrevented","isPropagationStopped","_dispatchListeners","_dispatchInstances"],p={type:null,target:null,currentTarget:s.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};a(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=s.thatReturnsTrue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=s.thatReturnsTrue)},persist:function(){this.isPersistent=s.thatReturnsTrue},isPersistent:s.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;for(var t in e)Object.defineProperty(this,t,o(t,e[t]));for(var n=0;n<f.length;n++)this[f[n]]=null;Object.defineProperty(this,"nativeEvent",o("nativeEvent",null)),Object.defineProperty(this,"preventDefault",o("preventDefault",s)),Object.defineProperty(this,"stopPropagation",o("stopPropagation",s))}}),r.Interface=p,c&&(r=new Proxy(r,{construct:function(e,t){return this.apply(e,Object.create(e.prototype),t)},apply:function(e,t,n){return new Proxy(e.apply(t,n),{set:function(e,t,n){return"isPersistent"===t||e.constructor.Interface.hasOwnProperty(t)||-1!==f.indexOf(t)||(u(l||e.isPersistent(),"This synthetic event is reused for performance reasons. If you're seeing this, you're adding a new property in the synthetic event object. The property is never released. See https://fb.me/react-event-pooling for more information."),l=!0),e[t]=n,!0}})}})),r.augmentClass=function(e,t){var n=this,r=function(){};r.prototype=n.prototype;var o=new r;a(o,e.prototype),e.prototype=o,e.prototype.constructor=e,e.Interface=a({},n.Interface,t),e.augmentClass=n.augmentClass,i.addPoolingTo(e,i.fourArgumentPooler)},i.addPoolingTo(r,i.fourArgumentPooler),e.exports=r},function(e,t,n){(function(e,r){var o;(function(){function a(e,t){return e.set(t[0],t[1]),e}function i(e,t){return e.add(t),e}function s(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function u(e,t,n,r){for(var o=-1,a=null==e?0:e.length;++o<a;){var i=e[o];t(r,i,n(i),e)}return r}function l(e,t){for(var n=-1,r=null==e?0:e.length;++n<r&&!1!==t(e[n],n,e););return e}function c(e,t){for(var n=null==e?0:e.length;n--&&!1!==t(e[n],n,e););return e}function f(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(!t(e[n],n,e))return!1;return!0}function p(e,t){for(var n=-1,r=null==e?0:e.length,o=0,a=[];++n<r;){var i=e[n];t(i,n,e)&&(a[o++]=i)}return a}function d(e,t){return!!(null==e?0:e.length)&&C(e,t,0)>-1}function h(e,t,n){for(var r=-1,o=null==e?0:e.length;++r<o;)if(n(t,e[r]))return!0;return!1}function m(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}function v(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}function g(e,t,n,r){var o=-1,a=null==e?0:e.length;for(r&&a&&(n=e[++o]);++o<a;)n=t(n,e[o],o,e);return n}function y(e,t,n,r){var o=null==e?0:e.length;for(r&&o&&(n=e[--o]);o--;)n=t(n,e[o],o,e);return n}function b(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}function E(e){return e.split("")}function w(e){return e.match(Bt)||[]}function _(e,t,n){var r;return n(e,function(e,n,o){if(t(e,n,o))return r=n,!1}),r}function k(e,t,n,r){for(var o=e.length,a=n+(r?1:-1);r?a--:++a<o;)if(t(e[a],a,e))return a;return-1}function C(e,t,n){return t===t?J(e,t,n):k(e,x,n)}function S(e,t,n,r){for(var o=n-1,a=e.length;++o<a;)if(r(e[o],t))return o;return-1}function x(e){return e!==e}function P(e,t){var n=null==e?0:e.length;return n?M(e,t)/n:Re}function T(e){return function(t){return null==t?oe:t[e]}}function O(e){return function(t){return null==e?oe:e[t]}}function N(e,t,n,r,o){return o(e,function(e,o,a){n=r?(r=!1,e):t(n,e,o,a)}),n}function I(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}function M(e,t){for(var n,r=-1,o=e.length;++r<o;){var a=t(e[r]);a!==oe&&(n=n===oe?a:n+a)}return n}function D(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}function A(e,t){return m(t,function(t){return[t,e[t]]})}function R(e){return function(t){return e(t)}}function j(e,t){return m(t,function(t){return e[t]})}function L(e,t){return e.has(t)}function U(e,t){for(var n=-1,r=e.length;++n<r&&C(t,e[n],0)>-1;);return n}function F(e,t){for(var n=e.length;n--&&C(t,e[n],0)>-1;);return n}function B(e,t){for(var n=e.length,r=0;n--;)e[n]===t&&++r;return r}function W(e){return"\\"+Tn[e]}function V(e,t){return null==e?oe:e[t]}function H(e){return bn.test(e)}function z(e){return En.test(e)}function q(e){for(var t,n=[];!(t=e.next()).done;)n.push(t.value);return n}function Y(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}function G(e,t){return function(n){return e(t(n))}}function Z(e,t){for(var n=-1,r=e.length,o=0,a=[];++n<r;){var i=e[n];i!==t&&i!==ce||(e[n]=ce,a[o++]=n)}return a}function $(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}function K(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=[e,e]}),n}function J(e,t,n){for(var r=n-1,o=e.length;++r<o;)if(e[r]===t)return r;return-1}function X(e,t,n){for(var r=n+1;r--;)if(e[r]===t)return r;return r}function Q(e){return H(e)?te(e):qn(e)}function ee(e){return H(e)?ne(e):E(e)}function te(e){for(var t=gn.lastIndex=0;gn.test(e);)++t;return t}function ne(e){return e.match(gn)||[]}function re(e){return e.match(yn)||[]}var oe,ae=200,ie="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",se="Expected a function",ue="__lodash_hash_undefined__",le=500,ce="__lodash_placeholder__",fe=1,pe=2,de=4,he=1,me=2,ve=1,ge=2,ye=4,be=8,Ee=16,we=32,_e=64,ke=128,Ce=256,Se=512,xe=30,Pe="...",Te=800,Oe=16,Ne=1,Ie=2,Me=1/0,De=9007199254740991,Ae=1.7976931348623157e308,Re=NaN,je=4294967295,Le=je-1,Ue=je>>>1,Fe=[["ary",ke],["bind",ve],["bindKey",ge],["curry",be],["curryRight",Ee],["flip",Se],["partial",we],["partialRight",_e],["rearg",Ce]],Be="[object Arguments]",We="[object Array]",Ve="[object AsyncFunction]",He="[object Boolean]",ze="[object Date]",qe="[object DOMException]",Ye="[object Error]",Ge="[object Function]",Ze="[object GeneratorFunction]",$e="[object Map]",Ke="[object Number]",Je="[object Null]",Xe="[object Object]",Qe="[object Proxy]",et="[object RegExp]",tt="[object Set]",nt="[object String]",rt="[object Symbol]",ot="[object Undefined]",at="[object WeakMap]",it="[object WeakSet]",st="[object ArrayBuffer]",ut="[object DataView]",lt="[object Float32Array]",ct="[object Float64Array]",ft="[object Int8Array]",pt="[object Int16Array]",dt="[object Int32Array]",ht="[object Uint8Array]",mt="[object Uint8ClampedArray]",vt="[object Uint16Array]",gt="[object Uint32Array]",yt=/\b__p \+= '';/g,bt=/\b(__p \+=) '' \+/g,Et=/(__e\(.*?\)|\b__t\)) \+\n'';/g,wt=/&(?:amp|lt|gt|quot|#39);/g,_t=/[&<>"']/g,kt=RegExp(wt.source),Ct=RegExp(_t.source),St=/<%-([\s\S]+?)%>/g,xt=/<%([\s\S]+?)%>/g,Pt=/<%=([\s\S]+?)%>/g,Tt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ot=/^\w*$/,Nt=/^\./,It=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Mt=/[\\^$.*+?()[\]{}|]/g,Dt=RegExp(Mt.source),At=/^\s+|\s+$/g,Rt=/^\s+/,jt=/\s+$/,Lt=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Ut=/\{\n\/\* \[wrapped with (.+)\] \*/,Ft=/,? & /,Bt=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Wt=/\\(\\)?/g,Vt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Ht=/\w*$/,zt=/^[-+]0x[0-9a-f]+$/i,qt=/^0b[01]+$/i,Yt=/^\[object .+?Constructor\]$/,Gt=/^0o[0-7]+$/i,Zt=/^(?:0|[1-9]\d*)$/,$t=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Kt=/($^)/,Jt=/['\n\r\u2028\u2029\\]/g,Xt="\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",Qt="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",en="["+Qt+"]",tn="["+Xt+"]",nn="[a-z\\xdf-\\xf6\\xf8-\\xff]",rn="[^\\ud800-\\udfff"+Qt+"\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",on="\\ud83c[\\udffb-\\udfff]",an="(?:\\ud83c[\\udde6-\\uddff]){2}",sn="[\\ud800-\\udbff][\\udc00-\\udfff]",un="[A-Z\\xc0-\\xd6\\xd8-\\xde]",ln="(?:"+nn+"|"+rn+")",cn="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",fn="(?:\\u200d(?:"+["[^\\ud800-\\udfff]",an,sn].join("|")+")[\\ufe0e\\ufe0f]?"+cn+")*",pn="[\\ufe0e\\ufe0f]?"+cn+fn,dn="(?:"+["[\\u2700-\\u27bf]",an,sn].join("|")+")"+pn,hn="(?:"+["[^\\ud800-\\udfff]"+tn+"?",tn,an,sn,"[\\ud800-\\udfff]"].join("|")+")",mn=RegExp("['’]","g"),vn=RegExp(tn,"g"),gn=RegExp(on+"(?="+on+")|"+hn+pn,"g"),yn=RegExp([un+"?"+nn+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[en,un,"$"].join("|")+")","(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[en,un+ln,"$"].join("|")+")",un+"?"+ln+"+(?:['’](?:d|ll|m|re|s|t|ve))?",un+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)","\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)","\\d+",dn].join("|"),"g"),bn=RegExp("[\\u200d\\ud800-\\udfff"+Xt+"\\ufe0e\\ufe0f]"),En=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,wn=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],_n=-1,kn={};kn[lt]=kn[ct]=kn[ft]=kn[pt]=kn[dt]=kn[ht]=kn[mt]=kn[vt]=kn[gt]=!0,kn[Be]=kn[We]=kn[st]=kn[He]=kn[ut]=kn[ze]=kn[Ye]=kn[Ge]=kn[$e]=kn[Ke]=kn[Xe]=kn[et]=kn[tt]=kn[nt]=kn[at]=!1;var Cn={};Cn[Be]=Cn[We]=Cn[st]=Cn[ut]=Cn[He]=Cn[ze]=Cn[lt]=Cn[ct]=Cn[ft]=Cn[pt]=Cn[dt]=Cn[$e]=Cn[Ke]=Cn[Xe]=Cn[et]=Cn[tt]=Cn[nt]=Cn[rt]=Cn[ht]=Cn[mt]=Cn[vt]=Cn[gt]=!0,Cn[Ye]=Cn[Ge]=Cn[at]=!1;var Sn={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"},xn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pn={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Tn={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},On=parseFloat,Nn=parseInt,In="object"==typeof e&&e&&e.Object===Object&&e,Mn="object"==typeof self&&self&&self.Object===Object&&self,Dn=In||Mn||Function("return this")(),An="object"==typeof t&&t&&!t.nodeType&&t,Rn=An&&"object"==typeof r&&r&&!r.nodeType&&r,jn=Rn&&Rn.exports===An,Ln=jn&&In.process,Un=function(){try{return Ln&&Ln.binding&&Ln.binding("util")}catch(e){}}(),Fn=Un&&Un.isArrayBuffer,Bn=Un&&Un.isDate,Wn=Un&&Un.isMap,Vn=Un&&Un.isRegExp,Hn=Un&&Un.isSet,zn=Un&&Un.isTypedArray,qn=T("length"),Yn=O(Sn),Gn=O(xn),Zn=O(Pn),$n=function e(t){function n(e){if(au(e)&&!gp(e)&&!(e instanceof E)){if(e instanceof o)return e;if(vc.call(e,"__wrapped__"))return ni(e)}return new o(e)}function r(){}function o(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=oe}function E(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=je,this.__views__=[]}function O(){var e=new E(this.__wrapped__);return e.__actions__=Uo(this.__actions__),e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=Uo(this.__iteratees__),e.__takeCount__=this.__takeCount__,e.__views__=Uo(this.__views__),e}function J(){if(this.__filtered__){var e=new E(this);e.__dir__=-1,e.__filtered__=!0}else e=this.clone(),e.__dir__*=-1;return e}function te(){var e=this.__wrapped__.value(),t=this.__dir__,n=gp(e),r=t<0,o=n?e.length:0,a=Pa(0,o,this.__views__),i=a.start,s=a.end,u=s-i,l=r?s:i-1,c=this.__iteratees__,f=c.length,p=0,d=Yc(u,this.__takeCount__);if(!n||!r&&o==u&&d==u)return bo(e,this.__actions__);var h=[];e:for(;u--&&p<d;){l+=t;for(var m=-1,v=e[l];++m<f;){var g=c[m],y=g.iteratee,b=g.type,E=y(v);if(b==Ie)v=E;else if(!E){if(b==Ne)continue e;break e}}h[p++]=v}return h}function ne(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function Bt(){this.__data__=nf?nf(null):{},this.size=0}function Xt(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}function Qt(e){var t=this.__data__;if(nf){var n=t[e];return n===ue?oe:n}return vc.call(t,e)?t[e]:oe}function en(e){var t=this.__data__;return nf?t[e]!==oe:vc.call(t,e)}function tn(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=nf&&t===oe?ue:t,this}function nn(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function rn(){this.__data__=[],this.size=0}function on(e){var t=this.__data__,n=Kn(t,e);return!(n<0)&&(n==t.length-1?t.pop():Nc.call(t,n,1),--this.size,!0)}function an(e){var t=this.__data__,n=Kn(t,e);return n<0?oe:t[n][1]}function sn(e){return Kn(this.__data__,e)>-1}function un(e,t){var n=this.__data__,r=Kn(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}function ln(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function cn(){this.size=0,this.__data__={hash:new ne,map:new(Xc||nn),string:new ne}}function fn(e){var t=ka(this,e).delete(e);return this.size-=t?1:0,t}function pn(e){return ka(this,e).get(e)}function dn(e){return ka(this,e).has(e)}function hn(e,t){var n=ka(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}function gn(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new ln;++t<n;)this.add(e[t])}function yn(e){return this.__data__.set(e,ue),this}function bn(e){return this.__data__.has(e)}function En(e){var t=this.__data__=new nn(e);this.size=t.size}function Sn(){this.__data__=new nn,this.size=0}function xn(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}function Pn(e){return this.__data__.get(e)}function Tn(e){return this.__data__.has(e)}function In(e,t){var n=this.__data__;if(n instanceof nn){var r=n.__data__;if(!Xc||r.length<ae-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new ln(r)}return n.set(e,t),this.size=n.size,this}function Mn(e,t){var n=gp(e),r=!n&&vp(e),o=!n&&!r&&bp(e),a=!n&&!r&&!o&&Cp(e),i=n||r||o||a,s=i?D(e.length,lc):[],u=s.length;for(var l in e)!t&&!vc.call(e,l)||i&&("length"==l||o&&("offset"==l||"parent"==l)||a&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||Ra(l,u))||s.push(l);return s}function An(e){var t=e.length;return t?e[Qr(0,t-1)]:oe}function Rn(e,t){return Xa(Uo(e),nr(t,0,e.length))}function Ln(e){return Xa(Uo(e))}function Un(e,t,n){(n===oe||qs(e[t],n))&&(n!==oe||t in e)||er(e,t,n)}function qn(e,t,n){var r=e[t];vc.call(e,t)&&qs(r,n)&&(n!==oe||t in e)||er(e,t,n)}function Kn(e,t){for(var n=e.length;n--;)if(qs(e[n][0],t))return n;return-1}function Jn(e,t,n,r){return mf(e,function(e,o,a){t(r,e,n(e),a)}),r}function Xn(e,t){return e&&Fo(t,Bu(t),e)}function Qn(e,t){return e&&Fo(t,Wu(t),e)}function er(e,t,n){"__proto__"==t&&Ac?Ac(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}function tr(e,t){for(var n=-1,r=t.length,o=nc(r),a=null==e;++n<r;)o[n]=a?oe:Lu(e,t[n]);return o}function nr(e,t,n){return e===e&&(n!==oe&&(e=e<=n?e:n),t!==oe&&(e=e>=t?e:t)),e}function rr(e,t,n,r,o,a){var i,s=t&fe,u=t&pe,c=t&de;if(n&&(i=o?n(e,r,o,a):n(e)),i!==oe)return i;if(!ou(e))return e;var f=gp(e);if(f){if(i=Na(e),!s)return Uo(e,i)}else{var p=Pf(e),d=p==Ge||p==Ze;if(bp(e))return xo(e,s);if(p==Xe||p==Be||d&&!o){if(i=u||d?{}:Ia(e),!s)return u?Wo(e,Qn(i,e)):Bo(e,Xn(i,e))}else{if(!Cn[p])return o?e:{};i=Ma(e,p,rr,s)}}a||(a=new En);var h=a.get(e);if(h)return h;a.set(e,i);var m=c?u?ba:ya:u?Wu:Bu,v=f?oe:m(e);return l(v||e,function(r,o){v&&(o=r,r=e[o]),qn(i,o,rr(r,t,n,o,e,a))}),i}function or(e){var t=Bu(e);return function(n){return ar(n,e,t)}}function ar(e,t,n){var r=n.length;if(null==e)return!r;for(e=sc(e);r--;){var o=n[r],a=t[o],i=e[o];if(i===oe&&!(o in e)||!a(i))return!1}return!0}function ir(e,t,n){if("function"!=typeof e)throw new cc(se);return Nf(function(){e.apply(oe,n)},t)}function sr(e,t,n,r){var o=-1,a=d,i=!0,s=e.length,u=[],l=t.length;if(!s)return u;n&&(t=m(t,R(n))),r?(a=h,i=!1):t.length>=ae&&(a=L,i=!1,t=new gn(t));e:for(;++o<s;){var c=e[o],f=null==n?c:n(c);if(c=r||0!==c?c:0,i&&f===f){for(var p=l;p--;)if(t[p]===f)continue e;u.push(c)}else a(t,f,r)||u.push(c)}return u}function ur(e,t){var n=!0;return mf(e,function(e,r,o){return n=!!t(e,r,o)}),n}function lr(e,t,n){for(var r=-1,o=e.length;++r<o;){var a=e[r],i=t(a);if(null!=i&&(s===oe?i===i&&!vu(i):n(i,s)))var s=i,u=a}return u}function cr(e,t,n,r){var o=e.length;for(n=_u(n),n<0&&(n=-n>o?0:o+n),r=r===oe||r>o?o:_u(r),r<0&&(r+=o),r=n>r?0:ku(r);n<r;)e[n++]=t;return e}function fr(e,t){var n=[];return mf(e,function(e,r,o){t(e,r,o)&&n.push(e)}),n}function pr(e,t,n,r,o){var a=-1,i=e.length;for(n||(n=Aa),o||(o=[]);++a<i;){var s=e[a];t>0&&n(s)?t>1?pr(s,t-1,n,r,o):v(o,s):r||(o[o.length]=s)}return o}function dr(e,t){return e&&gf(e,t,Bu)}function hr(e,t){return e&&yf(e,t,Bu)}function mr(e,t){return p(t,function(t){return tu(e[t])})}function vr(e,t){t=Co(t,e);for(var n=0,r=t.length;null!=e&&n<r;)e=e[Qa(t[n++])];return n&&n==r?e:oe}function gr(e,t,n){var r=t(e);return gp(e)?r:v(r,n(e))}function yr(e){return null==e?e===oe?ot:Je:Dc&&Dc in sc(e)?xa(e):Ya(e)}function br(e,t){return e>t}function Er(e,t){return null!=e&&vc.call(e,t)}function wr(e,t){return null!=e&&t in sc(e)}function _r(e,t,n){return e>=Yc(t,n)&&e<qc(t,n)}function kr(e,t,n){for(var r=n?h:d,o=e[0].length,a=e.length,i=a,s=nc(a),u=1/0,l=[];i--;){var c=e[i];i&&t&&(c=m(c,R(t))),u=Yc(c.length,u),s[i]=!n&&(t||o>=120&&c.length>=120)?new gn(i&&c):oe}c=e[0];var f=-1,p=s[0];e:for(;++f<o&&l.length<u;){var v=c[f],g=t?t(v):v;if(v=n||0!==v?v:0,!(p?L(p,g):r(l,g,n))){for(i=a;--i;){var y=s[i];if(!(y?L(y,g):r(e[i],g,n)))continue e}p&&p.push(g),l.push(v)}}return l}function Cr(e,t,n,r){return dr(e,function(e,o,a){t(r,n(e),o,a)}),r}function Sr(e,t,n){t=Co(t,e),e=Za(e,t);var r=null==e?e:e[Qa(wi(t))];return null==r?oe:s(r,e,n)}function xr(e){return au(e)&&yr(e)==Be}function Pr(e){return au(e)&&yr(e)==st}function Tr(e){return au(e)&&yr(e)==ze}function Or(e,t,n,r,o){return e===t||(null==e||null==t||!au(e)&&!au(t)?e!==e&&t!==t:Nr(e,t,n,r,Or,o))}function Nr(e,t,n,r,o,a){var i=gp(e),s=gp(t),u=i?We:Pf(e),l=s?We:Pf(t);u=u==Be?Xe:u,l=l==Be?Xe:l;var c=u==Xe,f=l==Xe,p=u==l;if(p&&bp(e)){if(!bp(t))return!1;i=!0,c=!1}if(p&&!c)return a||(a=new En),i||Cp(e)?ha(e,t,n,r,o,a):ma(e,t,u,n,r,o,a);if(!(n&he)){var d=c&&vc.call(e,"__wrapped__"),h=f&&vc.call(t,"__wrapped__");if(d||h){var m=d?e.value():e,v=h?t.value():t;return a||(a=new En),o(m,v,n,r,a)}}return!!p&&(a||(a=new En),va(e,t,n,r,o,a))}function Ir(e){return au(e)&&Pf(e)==$e}function Mr(e,t,n,r){var o=n.length,a=o,i=!r;if(null==e)return!a;for(e=sc(e);o--;){var s=n[o];if(i&&s[2]?s[1]!==e[s[0]]:!(s[0]in e))return!1}for(;++o<a;){s=n[o];var u=s[0],l=e[u],c=s[1];if(i&&s[2]){if(l===oe&&!(u in e))return!1}else{var f=new En;if(r)var p=r(l,c,u,e,t,f);if(!(p===oe?Or(c,l,he|me,r,f):p))return!1}}return!0}function Dr(e){return!(!ou(e)||Ba(e))&&(tu(e)?_c:Yt).test(ei(e))}function Ar(e){return au(e)&&yr(e)==et}function Rr(e){return au(e)&&Pf(e)==tt}function jr(e){return au(e)&&ru(e.length)&&!!kn[yr(e)]}function Lr(e){return"function"==typeof e?e:null==e?Nl:"object"==typeof e?gp(e)?Hr(e[0],e[1]):Vr(e):Ul(e)}function Ur(e){if(!Wa(e))return zc(e);var t=[];for(var n in sc(e))vc.call(e,n)&&"constructor"!=n&&t.push(n);return t}function Fr(e){if(!ou(e))return qa(e);var t=Wa(e),n=[];for(var r in e)("constructor"!=r||!t&&vc.call(e,r))&&n.push(r);return n}function Br(e,t){return e<t}function Wr(e,t){var n=-1,r=Ys(e)?nc(e.length):[];return mf(e,function(e,o,a){r[++n]=t(e,o,a)}),r}function Vr(e){var t=Ca(e);return 1==t.length&&t[0][2]?Ha(t[0][0],t[0][1]):function(n){return n===e||Mr(n,e,t)}}function Hr(e,t){return La(e)&&Va(t)?Ha(Qa(e),t):function(n){var r=Lu(n,e);return r===oe&&r===t?Fu(n,e):Or(t,r,he|me)}}function zr(e,t,n,r,o){e!==t&&gf(t,function(a,i){if(ou(a))o||(o=new En),qr(e,t,i,n,zr,r,o);else{var s=r?r(e[i],a,i+"",e,t,o):oe;s===oe&&(s=a),Un(e,i,s)}},Wu)}function qr(e,t,n,r,o,a,i){var s=e[n],u=t[n],l=i.get(u);if(l)return void Un(e,n,l);var c=a?a(s,u,n+"",e,t,i):oe,f=c===oe;if(f){var p=gp(u),d=!p&&bp(u),h=!p&&!d&&Cp(u);c=u,p||d||h?gp(s)?c=s:Gs(s)?c=Uo(s):d?(f=!1,c=xo(u,!0)):h?(f=!1,c=Do(u,!0)):c=[]:du(u)||vp(u)?(c=s,vp(s)?c=Su(s):(!ou(s)||r&&tu(s))&&(c=Ia(u))):f=!1}f&&(i.set(u,c),o(c,u,r,a,i),i.delete(u)),Un(e,n,c)}function Yr(e,t){var n=e.length;if(n)return t+=t<0?n:0,Ra(t,n)?e[t]:oe}function Gr(e,t,n){var r=-1;return t=m(t.length?t:[Nl],R(_a())),I(Wr(e,function(e,n,o){return{criteria:m(t,function(t){return t(e)}),index:++r,value:e}}),function(e,t){return Ro(e,t,n)})}function Zr(e,t){return $r(e,t,function(t,n){return Fu(e,n)})}function $r(e,t,n){for(var r=-1,o=t.length,a={};++r<o;){var i=t[r],s=vr(e,i);n(s,i)&&ao(a,Co(i,e),s)}return a}function Kr(e){return function(t){return vr(t,e)}}function Jr(e,t,n,r){var o=r?S:C,a=-1,i=t.length,s=e;for(e===t&&(t=Uo(t)),n&&(s=m(e,R(n)));++a<i;)for(var u=0,l=t[a],c=n?n(l):l;(u=o(s,c,u,r))>-1;)s!==e&&Nc.call(s,u,1),Nc.call(e,u,1);return e}function Xr(e,t){for(var n=e?t.length:0,r=n-1;n--;){var o=t[n];if(n==r||o!==a){var a=o;Ra(o)?Nc.call(e,o,1):vo(e,o)}}return e}function Qr(e,t){return e+Fc($c()*(t-e+1))}function eo(e,t,n,r){for(var o=-1,a=qc(Uc((t-e)/(n||1)),0),i=nc(a);a--;)i[r?a:++o]=e,e+=n;return i}function to(e,t){var n="";if(!e||t<1||t>De)return n;do{t%2&&(n+=e),(t=Fc(t/2))&&(e+=e)}while(t);return n}function no(e,t){return If(Ga(e,t,Nl),e+"")}function ro(e){return An(Qu(e))}function oo(e,t){var n=Qu(e);return Xa(n,nr(t,0,n.length))}function ao(e,t,n,r){if(!ou(e))return e;t=Co(t,e);for(var o=-1,a=t.length,i=a-1,s=e;null!=s&&++o<a;){var u=Qa(t[o]),l=n;if(o!=i){var c=s[u];l=r?r(c,u,s):oe,l===oe&&(l=ou(c)?c:Ra(t[o+1])?[]:{})}qn(s,u,l),s=s[u]}return e}function io(e){return Xa(Qu(e))}function so(e,t,n){var r=-1,o=e.length;t<0&&(t=-t>o?0:o+t),n=n>o?o:n,n<0&&(n+=o),o=t>n?0:n-t>>>0,t>>>=0;for(var a=nc(o);++r<o;)a[r]=e[r+t];return a}function uo(e,t){var n;return mf(e,function(e,r,o){return!(n=t(e,r,o))}),!!n}function lo(e,t,n){var r=0,o=null==e?r:e.length;if("number"==typeof t&&t===t&&o<=Ue){for(;r<o;){var a=r+o>>>1,i=e[a];null!==i&&!vu(i)&&(n?i<=t:i<t)?r=a+1:o=a}return o}return co(e,t,Nl,n)}function co(e,t,n,r){t=n(t);for(var o=0,a=null==e?0:e.length,i=t!==t,s=null===t,u=vu(t),l=t===oe;o<a;){var c=Fc((o+a)/2),f=n(e[c]),p=f!==oe,d=null===f,h=f===f,m=vu(f);if(i)var v=r||h;else v=l?h&&(r||p):s?h&&p&&(r||!d):u?h&&p&&!d&&(r||!m):!d&&!m&&(r?f<=t:f<t);v?o=c+1:a=c}return Yc(a,Le)}function fo(e,t){for(var n=-1,r=e.length,o=0,a=[];++n<r;){var i=e[n],s=t?t(i):i;if(!n||!qs(s,u)){var u=s;a[o++]=0===i?0:i}}return a}function po(e){return"number"==typeof e?e:vu(e)?Re:+e}function ho(e){if("string"==typeof e)return e;if(gp(e))return m(e,ho)+"";if(vu(e))return df?df.call(e):"";var t=e+"";return"0"==t&&1/e==-Me?"-0":t}function mo(e,t,n){var r=-1,o=d,a=e.length,i=!0,s=[],u=s;if(n)i=!1,o=h;else if(a>=ae){var l=t?null:kf(e);if(l)return $(l);i=!1,o=L,u=new gn}else u=t?[]:s;e:for(;++r<a;){var c=e[r],f=t?t(c):c;if(c=n||0!==c?c:0,i&&f===f){for(var p=u.length;p--;)if(u[p]===f)continue e;t&&u.push(f),s.push(c)}else o(u,f,n)||(u!==s&&u.push(f),s.push(c))}return s}function vo(e,t){return t=Co(t,e),null==(e=Za(e,t))||delete e[Qa(wi(t))]}function go(e,t,n,r){return ao(e,t,n(vr(e,t)),r)}function yo(e,t,n,r){for(var o=e.length,a=r?o:-1;(r?a--:++a<o)&&t(e[a],a,e););return n?so(e,r?0:a,r?a+1:o):so(e,r?a+1:0,r?o:a)}function bo(e,t){var n=e;return n instanceof E&&(n=n.value()),g(t,function(e,t){return t.func.apply(t.thisArg,v([e],t.args))},n)}function Eo(e,t,n){var r=e.length;if(r<2)return r?mo(e[0]):[];for(var o=-1,a=nc(r);++o<r;)for(var i=e[o],s=-1;++s<r;)s!=o&&(a[o]=sr(a[o]||i,e[s],t,n));return mo(pr(a,1),t,n)}function wo(e,t,n){for(var r=-1,o=e.length,a=t.length,i={};++r<o;){var s=r<a?t[r]:oe;n(i,e[r],s)}return i}function _o(e){return Gs(e)?e:[]}function ko(e){return"function"==typeof e?e:Nl}function Co(e,t){return gp(e)?e:La(e,t)?[e]:Mf(Pu(e))}function So(e,t,n){var r=e.length;return n=n===oe?r:n,!t&&n>=r?e:so(e,t,n)}function xo(e,t){if(t)return e.slice();var n=e.length,r=xc?xc(n):new e.constructor(n);return e.copy(r),r}function Po(e){var t=new e.constructor(e.byteLength);return new Sc(t).set(new Sc(e)),t}function To(e,t){var n=t?Po(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}function Oo(e,t,n){return g(t?n(Y(e),fe):Y(e),a,new e.constructor)}function No(e){var t=new e.constructor(e.source,Ht.exec(e));return t.lastIndex=e.lastIndex,t}function Io(e,t,n){return g(t?n($(e),fe):$(e),i,new e.constructor)}function Mo(e){return pf?sc(pf.call(e)):{}}function Do(e,t){var n=t?Po(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}function Ao(e,t){if(e!==t){var n=e!==oe,r=null===e,o=e===e,a=vu(e),i=t!==oe,s=null===t,u=t===t,l=vu(t);if(!s&&!l&&!a&&e>t||a&&i&&u&&!s&&!l||r&&i&&u||!n&&u||!o)return 1;if(!r&&!a&&!l&&e<t||l&&n&&o&&!r&&!a||s&&n&&o||!i&&o||!u)return-1}return 0}function Ro(e,t,n){for(var r=-1,o=e.criteria,a=t.criteria,i=o.length,s=n.length;++r<i;){var u=Ao(o[r],a[r]);if(u){if(r>=s)return u;return u*("desc"==n[r]?-1:1)}}return e.index-t.index}function jo(e,t,n,r){for(var o=-1,a=e.length,i=n.length,s=-1,u=t.length,l=qc(a-i,0),c=nc(u+l),f=!r;++s<u;)c[s]=t[s];for(;++o<i;)(f||o<a)&&(c[n[o]]=e[o]);for(;l--;)c[s++]=e[o++];return c}function Lo(e,t,n,r){for(var o=-1,a=e.length,i=-1,s=n.length,u=-1,l=t.length,c=qc(a-s,0),f=nc(c+l),p=!r;++o<c;)f[o]=e[o];for(var d=o;++u<l;)f[d+u]=t[u];for(;++i<s;)(p||o<a)&&(f[d+n[i]]=e[o++]);return f}function Uo(e,t){var n=-1,r=e.length;for(t||(t=nc(r));++n<r;)t[n]=e[n];return t}function Fo(e,t,n,r){var o=!n;n||(n={});for(var a=-1,i=t.length;++a<i;){var s=t[a],u=r?r(n[s],e[s],s,n,e):oe;u===oe&&(u=e[s]),o?er(n,s,u):qn(n,s,u)}return n}function Bo(e,t){return Fo(e,Sf(e),t)}function Wo(e,t){return Fo(e,xf(e),t)}function Vo(e,t){return function(n,r){var o=gp(n)?u:Jn,a=t?t():{};return o(n,e,_a(r,2),a)}}function Ho(e){return no(function(t,n){var r=-1,o=n.length,a=o>1?n[o-1]:oe,i=o>2?n[2]:oe;for(a=e.length>3&&"function"==typeof a?(o--,a):oe,i&&ja(n[0],n[1],i)&&(a=o<3?oe:a,o=1),t=sc(t);++r<o;){var s=n[r];s&&e(t,s,r,a)}return t})}function zo(e,t){return function(n,r){if(null==n)return n;if(!Ys(n))return e(n,r);for(var o=n.length,a=t?o:-1,i=sc(n);(t?a--:++a<o)&&!1!==r(i[a],a,i););return n}}function qo(e){return function(t,n,r){for(var o=-1,a=sc(t),i=r(t),s=i.length;s--;){var u=i[e?s:++o];if(!1===n(a[u],u,a))break}return t}}function Yo(e,t,n){function r(){return(this&&this!==Dn&&this instanceof r?a:e).apply(o?n:this,arguments)}var o=t&ve,a=$o(e);return r}function Go(e){return function(t){t=Pu(t);var n=H(t)?ee(t):oe,r=n?n[0]:t.charAt(0),o=n?So(n,1).join(""):t.slice(1);return r[e]()+o}}function Zo(e){return function(t){return g(Sl(al(t).replace(mn,"")),e,"")}}function $o(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=hf(e.prototype),r=e.apply(n,t);return ou(r)?r:n}}function Ko(e,t,n){function r(){for(var a=arguments.length,i=nc(a),u=a,l=wa(r);u--;)i[u]=arguments[u];var c=a<3&&i[0]!==l&&i[a-1]!==l?[]:Z(i,l);return(a-=c.length)<n?sa(e,t,Qo,r.placeholder,oe,i,c,oe,oe,n-a):s(this&&this!==Dn&&this instanceof r?o:e,this,i)}var o=$o(e);return r}function Jo(e){return function(t,n,r){var o=sc(t);if(!Ys(t)){var a=_a(n,3);t=Bu(t),n=function(e){return a(o[e],e,o)}}var i=e(t,n,r);return i>-1?o[a?t[i]:i]:oe}}function Xo(e){return ga(function(t){var n=t.length,r=n,a=o.prototype.thru;for(e&&t.reverse();r--;){var i=t[r];if("function"!=typeof i)throw new cc(se);if(a&&!s&&"wrapper"==Ea(i))var s=new o([],!0)}for(r=s?r:n;++r<n;){i=t[r];var u=Ea(i),l="wrapper"==u?Cf(i):oe;s=l&&Fa(l[0])&&l[1]==(ke|be|we|Ce)&&!l[4].length&&1==l[9]?s[Ea(l[0])].apply(s,l[3]):1==i.length&&Fa(i)?s[u]():s.thru(i)}return function(){var e=arguments,r=e[0];if(s&&1==e.length&&gp(r))return s.plant(r).value();for(var o=0,a=n?t[o].apply(this,e):r;++o<n;)a=t[o].call(this,a);return a}})}function Qo(e,t,n,r,o,a,i,s,u,l){function c(){for(var g=arguments.length,y=nc(g),b=g;b--;)y[b]=arguments[b];if(h)var E=wa(c),w=B(y,E);if(r&&(y=jo(y,r,o,h)),a&&(y=Lo(y,a,i,h)),g-=w,h&&g<l){var _=Z(y,E);return sa(e,t,Qo,c.placeholder,n,y,_,s,u,l-g)}var k=p?n:this,C=d?k[e]:e;return g=y.length,s?y=$a(y,s):m&&g>1&&y.reverse(),f&&u<g&&(y.length=u),this&&this!==Dn&&this instanceof c&&(C=v||$o(C)),C.apply(k,y)}var f=t&ke,p=t&ve,d=t&ge,h=t&(be|Ee),m=t&Se,v=d?oe:$o(e);return c}function ea(e,t){return function(n,r){return Cr(n,e,t(r),{})}}function ta(e,t){return function(n,r){var o;if(n===oe&&r===oe)return t;if(n!==oe&&(o=n),r!==oe){if(o===oe)return r;"string"==typeof n||"string"==typeof r?(n=ho(n),r=ho(r)):(n=po(n),r=po(r)),o=e(n,r)}return o}}function na(e){return ga(function(t){return t=m(t,R(_a())),no(function(n){var r=this;return e(t,function(e){return s(e,r,n)})})})}function ra(e,t){t=t===oe?" ":ho(t);var n=t.length;if(n<2)return n?to(t,e):t;var r=to(t,Uc(e/Q(t)));return H(t)?So(ee(r),0,e).join(""):r.slice(0,e)}function oa(e,t,n,r){function o(){for(var t=-1,u=arguments.length,l=-1,c=r.length,f=nc(c+u),p=this&&this!==Dn&&this instanceof o?i:e;++l<c;)f[l]=r[l];for(;u--;)f[l++]=arguments[++t];return s(p,a?n:this,f)}var a=t&ve,i=$o(e);return o}function aa(e){return function(t,n,r){return r&&"number"!=typeof r&&ja(t,n,r)&&(n=r=oe),t=wu(t),n===oe?(n=t,t=0):n=wu(n),r=r===oe?t<n?1:-1:wu(r),eo(t,n,r,e)}}function ia(e){return function(t,n){return"string"==typeof t&&"string"==typeof n||(t=Cu(t),n=Cu(n)),e(t,n)}}function sa(e,t,n,r,o,a,i,s,u,l){var c=t&be,f=c?i:oe,p=c?oe:i,d=c?a:oe,h=c?oe:a;t|=c?we:_e,(t&=~(c?_e:we))&ye||(t&=~(ve|ge));var m=[e,t,o,d,f,h,p,s,u,l],v=n.apply(oe,m);return Fa(e)&&Of(v,m),v.placeholder=r,Ka(v,e,t)}function ua(e){var t=ic[e];return function(e,n){if(e=Cu(e),n=null==n?0:Yc(_u(n),292)){var r=(Pu(e)+"e").split("e");return r=(Pu(t(r[0]+"e"+(+r[1]+n)))+"e").split("e"),+(r[0]+"e"+(+r[1]-n))}return t(e)}}function la(e){return function(t){var n=Pf(t);return n==$e?Y(t):n==tt?K(t):A(t,e(t))}}function ca(e,t,n,r,o,a,i,s){var u=t&ge;if(!u&&"function"!=typeof e)throw new cc(se);var l=r?r.length:0;if(l||(t&=~(we|_e),r=o=oe),i=i===oe?i:qc(_u(i),0),s=s===oe?s:_u(s),l-=o?o.length:0,t&_e){var c=r,f=o;r=o=oe}var p=u?oe:Cf(e),d=[e,t,n,r,o,c,f,a,i,s];if(p&&za(d,p),e=d[0],t=d[1],n=d[2],r=d[3],o=d[4],s=d[9]=d[9]===oe?u?0:e.length:qc(d[9]-l,0),!s&&t&(be|Ee)&&(t&=~(be|Ee)),t&&t!=ve)h=t==be||t==Ee?Ko(e,t,s):t!=we&&t!=(ve|we)||o.length?Qo.apply(oe,d):oa(e,t,n,r);else var h=Yo(e,t,n);return Ka((p?bf:Of)(h,d),e,t)}function fa(e,t,n,r){return e===oe||qs(e,dc[n])&&!vc.call(r,n)?t:e}function pa(e,t,n,r,o,a){return ou(e)&&ou(t)&&(a.set(t,e),zr(e,t,oe,pa,a),a.delete(t)),e}function da(e){return du(e)?oe:e}function ha(e,t,n,r,o,a){var i=n&he,s=e.length,u=t.length;if(s!=u&&!(i&&u>s))return!1;var l=a.get(e);if(l&&a.get(t))return l==t;var c=-1,f=!0,p=n&me?new gn:oe;for(a.set(e,t),a.set(t,e);++c<s;){var d=e[c],h=t[c];if(r)var m=i?r(h,d,c,t,e,a):r(d,h,c,e,t,a);if(m!==oe){if(m)continue;f=!1;break}if(p){if(!b(t,function(e,t){if(!L(p,t)&&(d===e||o(d,e,n,r,a)))return p.push(t)})){f=!1;break}}else if(d!==h&&!o(d,h,n,r,a)){f=!1;break}}return a.delete(e),a.delete(t),f}function ma(e,t,n,r,o,a,i){switch(n){case ut:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case st:return!(e.byteLength!=t.byteLength||!a(new Sc(e),new Sc(t)));case He:case ze:case Ke:return qs(+e,+t);case Ye:return e.name==t.name&&e.message==t.message;case et:case nt:return e==t+"";case $e:var s=Y;case tt:var u=r&he;if(s||(s=$),e.size!=t.size&&!u)return!1;var l=i.get(e);if(l)return l==t;r|=me,i.set(e,t);var c=ha(s(e),s(t),r,o,a,i);return i.delete(e),c;case rt:if(pf)return pf.call(e)==pf.call(t)}return!1}function va(e,t,n,r,o,a){var i=n&he,s=ya(e),u=s.length;if(u!=ya(t).length&&!i)return!1;for(var l=u;l--;){var c=s[l];if(!(i?c in t:vc.call(t,c)))return!1}var f=a.get(e);if(f&&a.get(t))return f==t;var p=!0;a.set(e,t),a.set(t,e);for(var d=i;++l<u;){c=s[l];var h=e[c],m=t[c];if(r)var v=i?r(m,h,c,t,e,a):r(h,m,c,e,t,a);if(!(v===oe?h===m||o(h,m,n,r,a):v)){p=!1;break}d||(d="constructor"==c)}if(p&&!d){var g=e.constructor,y=t.constructor;g!=y&&"constructor"in e&&"constructor"in t&&!("function"==typeof g&&g instanceof g&&"function"==typeof y&&y instanceof y)&&(p=!1)}return a.delete(e),a.delete(t),p}function ga(e){return If(Ga(e,oe,di),e+"")}function ya(e){return gr(e,Bu,Sf)}function ba(e){return gr(e,Wu,xf)}function Ea(e){for(var t=e.name+"",n=of[t],r=vc.call(of,t)?n.length:0;r--;){var o=n[r],a=o.func;if(null==a||a==e)return o.name}return t}function wa(e){return(vc.call(n,"placeholder")?n:e).placeholder}function _a(){var e=n.iteratee||Il;return e=e===Il?Lr:e,arguments.length?e(arguments[0],arguments[1]):e}function ka(e,t){var n=e.__data__;return Ua(t)?n["string"==typeof t?"string":"hash"]:n.map}function Ca(e){for(var t=Bu(e),n=t.length;n--;){var r=t[n],o=e[r];t[n]=[r,o,Va(o)]}return t}function Sa(e,t){var n=V(e,t);return Dr(n)?n:oe}function xa(e){var t=vc.call(e,Dc),n=e[Dc];try{e[Dc]=oe;var r=!0}catch(e){}var o=bc.call(e);return r&&(t?e[Dc]=n:delete e[Dc]),o}function Pa(e,t,n){for(var r=-1,o=n.length;++r<o;){var a=n[r],i=a.size;switch(a.type){case"drop":e+=i;break;case"dropRight":t-=i;break;case"take":t=Yc(t,e+i);break;case"takeRight":e=qc(e,t-i)}}return{start:e,end:t}}function Ta(e){var t=e.match(Ut);return t?t[1].split(Ft):[]}function Oa(e,t,n){t=Co(t,e);for(var r=-1,o=t.length,a=!1;++r<o;){var i=Qa(t[r]);if(!(a=null!=e&&n(e,i)))break;e=e[i]}return a||++r!=o?a:!!(o=null==e?0:e.length)&&ru(o)&&Ra(i,o)&&(gp(e)||vp(e))}function Na(e){var t=e.length,n=e.constructor(t);return t&&"string"==typeof e[0]&&vc.call(e,"index")&&(n.index=e.index,n.input=e.input),n}function Ia(e){return"function"!=typeof e.constructor||Wa(e)?{}:hf(Pc(e))}function Ma(e,t,n,r){var o=e.constructor;switch(t){case st:return Po(e);case He:case ze:return new o(+e);case ut:return To(e,r);case lt:case ct:case ft:case pt:case dt:case ht:case mt:case vt:case gt:return Do(e,r);case $e:return Oo(e,r,n);case Ke:case nt:return new o(e);case et:return No(e);case tt:return Io(e,r,n);case rt:return Mo(e)}}function Da(e,t){var n=t.length;if(!n)return e;var r=n-1;return t[r]=(n>1?"& ":"")+t[r],t=t.join(n>2?", ":" "),e.replace(Lt,"{\n/* [wrapped with "+t+"] */\n")}function Aa(e){return gp(e)||vp(e)||!!(Ic&&e&&e[Ic])}function Ra(e,t){return!!(t=null==t?De:t)&&("number"==typeof e||Zt.test(e))&&e>-1&&e%1==0&&e<t}function ja(e,t,n){if(!ou(n))return!1;var r=typeof t;return!!("number"==r?Ys(n)&&Ra(t,n.length):"string"==r&&t in n)&&qs(n[t],e)}function La(e,t){if(gp(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!vu(e))||(Ot.test(e)||!Tt.test(e)||null!=t&&e in sc(t))}function Ua(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}function Fa(e){var t=Ea(e),r=n[t];if("function"!=typeof r||!(t in E.prototype))return!1;if(e===r)return!0;var o=Cf(r);return!!o&&e===o[0]}function Ba(e){return!!yc&&yc in e}function Wa(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||dc)}function Va(e){return e===e&&!ou(e)}function Ha(e,t){return function(n){return null!=n&&(n[e]===t&&(t!==oe||e in sc(n)))}}function za(e,t){var n=e[1],r=t[1],o=n|r,a=o<(ve|ge|ke),i=r==ke&&n==be||r==ke&&n==Ce&&e[7].length<=t[8]||r==(ke|Ce)&&t[7].length<=t[8]&&n==be;if(!a&&!i)return e;r&ve&&(e[2]=t[2],o|=n&ve?0:ye);var s=t[3];if(s){var u=e[3];e[3]=u?jo(u,s,t[4]):s,e[4]=u?Z(e[3],ce):t[4]}return s=t[5],s&&(u=e[5],e[5]=u?Lo(u,s,t[6]):s,e[6]=u?Z(e[5],ce):t[6]),s=t[7],s&&(e[7]=s),r&ke&&(e[8]=null==e[8]?t[8]:Yc(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=o,e}function qa(e){var t=[];if(null!=e)for(var n in sc(e))t.push(n);return t}function Ya(e){return bc.call(e)}function Ga(e,t,n){return t=qc(t===oe?e.length-1:t,0),function(){for(var r=arguments,o=-1,a=qc(r.length-t,0),i=nc(a);++o<a;)i[o]=r[t+o];o=-1;for(var u=nc(t+1);++o<t;)u[o]=r[o];return u[t]=n(i),s(e,this,u)}}function Za(e,t){return t.length<2?e:vr(e,so(t,0,-1))}function $a(e,t){for(var n=e.length,r=Yc(t.length,n),o=Uo(e);r--;){var a=t[r];e[r]=Ra(a,n)?o[a]:oe}return e}function Ka(e,t,n){var r=t+"";return If(e,Da(r,ti(Ta(r),n)))}function Ja(e){var t=0,n=0;return function(){var r=Gc(),o=Oe-(r-n);if(n=r,o>0){if(++t>=Te)return arguments[0]}else t=0;return e.apply(oe,arguments)}}function Xa(e,t){var n=-1,r=e.length,o=r-1;for(t=t===oe?r:t;++n<t;){var a=Qr(n,o),i=e[a];e[a]=e[n],e[n]=i}return e.length=t,e}function Qa(e){if("string"==typeof e||vu(e))return e;var t=e+"";return"0"==t&&1/e==-Me?"-0":t}function ei(e){if(null!=e){try{return mc.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function ti(e,t){return l(Fe,function(n){var r="_."+n[0];t&n[1]&&!d(e,r)&&e.push(r)}),e.sort()}function ni(e){if(e instanceof E)return e.clone();var t=new o(e.__wrapped__,e.__chain__);return t.__actions__=Uo(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}function ri(e,t,n){t=(n?ja(e,t,n):t===oe)?1:qc(_u(t),0);var r=null==e?0:e.length;if(!r||t<1)return[];for(var o=0,a=0,i=nc(Uc(r/t));o<r;)i[a++]=so(e,o,o+=t);return i}function oi(e){for(var t=-1,n=null==e?0:e.length,r=0,o=[];++t<n;){var a=e[t];a&&(o[r++]=a)}return o}function ai(){var e=arguments.length;if(!e)return[];for(var t=nc(e-1),n=arguments[0],r=e;r--;)t[r-1]=arguments[r];return v(gp(n)?Uo(n):[n],pr(t,1))}function ii(e,t,n){var r=null==e?0:e.length;return r?(t=n||t===oe?1:_u(t),so(e,t<0?0:t,r)):[]}function si(e,t,n){var r=null==e?0:e.length;return r?(t=n||t===oe?1:_u(t),t=r-t,so(e,0,t<0?0:t)):[]}function ui(e,t){return e&&e.length?yo(e,_a(t,3),!0,!0):[]}function li(e,t){return e&&e.length?yo(e,_a(t,3),!0):[]}function ci(e,t,n,r){var o=null==e?0:e.length;return o?(n&&"number"!=typeof n&&ja(e,t,n)&&(n=0,r=o),cr(e,t,n,r)):[]}function fi(e,t,n){var r=null==e?0:e.length;if(!r)return-1;var o=null==n?0:_u(n);return o<0&&(o=qc(r+o,0)),k(e,_a(t,3),o)}function pi(e,t,n){var r=null==e?0:e.length;if(!r)return-1;var o=r-1;return n!==oe&&(o=_u(n),o=n<0?qc(r+o,0):Yc(o,r-1)),k(e,_a(t,3),o,!0)}function di(e){return(null==e?0:e.length)?pr(e,1):[]}function hi(e){return(null==e?0:e.length)?pr(e,Me):[]}function mi(e,t){return(null==e?0:e.length)?(t=t===oe?1:_u(t),pr(e,t)):[]}function vi(e){for(var t=-1,n=null==e?0:e.length,r={};++t<n;){var o=e[t];r[o[0]]=o[1]}return r}function gi(e){return e&&e.length?e[0]:oe}function yi(e,t,n){var r=null==e?0:e.length;if(!r)return-1;var o=null==n?0:_u(n);return o<0&&(o=qc(r+o,0)),C(e,t,o)}function bi(e){return(null==e?0:e.length)?so(e,0,-1):[]}function Ei(e,t){return null==e?"":Hc.call(e,t)}function wi(e){var t=null==e?0:e.length;return t?e[t-1]:oe}function _i(e,t,n){var r=null==e?0:e.length;if(!r)return-1;var o=r;return n!==oe&&(o=_u(n),o=o<0?qc(r+o,0):Yc(o,r-1)),t===t?X(e,t,o):k(e,x,o,!0)}function ki(e,t){return e&&e.length?Yr(e,_u(t)):oe}function Ci(e,t){return e&&e.length&&t&&t.length?Jr(e,t):e}function Si(e,t,n){return e&&e.length&&t&&t.length?Jr(e,t,_a(n,2)):e}function xi(e,t,n){return e&&e.length&&t&&t.length?Jr(e,t,oe,n):e}function Pi(e,t){var n=[];if(!e||!e.length)return n;var r=-1,o=[],a=e.length;for(t=_a(t,3);++r<a;){var i=e[r];t(i,r,e)&&(n.push(i),o.push(r))}return Xr(e,o),n}function Ti(e){return null==e?e:Kc.call(e)}function Oi(e,t,n){var r=null==e?0:e.length;return r?(n&&"number"!=typeof n&&ja(e,t,n)?(t=0,n=r):(t=null==t?0:_u(t),n=n===oe?r:_u(n)),so(e,t,n)):[]}function Ni(e,t){return lo(e,t)}function Ii(e,t,n){return co(e,t,_a(n,2))}function Mi(e,t){var n=null==e?0:e.length;if(n){var r=lo(e,t);if(r<n&&qs(e[r],t))return r}return-1}function Di(e,t){return lo(e,t,!0)}function Ai(e,t,n){return co(e,t,_a(n,2),!0)}function Ri(e,t){if(null==e?0:e.length){var n=lo(e,t,!0)-1;if(qs(e[n],t))return n}return-1}function ji(e){return e&&e.length?fo(e):[]}function Li(e,t){return e&&e.length?fo(e,_a(t,2)):[]}function Ui(e){var t=null==e?0:e.length;return t?so(e,1,t):[]}function Fi(e,t,n){return e&&e.length?(t=n||t===oe?1:_u(t),so(e,0,t<0?0:t)):[]}function Bi(e,t,n){var r=null==e?0:e.length;return r?(t=n||t===oe?1:_u(t),t=r-t,so(e,t<0?0:t,r)):[]}function Wi(e,t){return e&&e.length?yo(e,_a(t,3),!1,!0):[]}function Vi(e,t){return e&&e.length?yo(e,_a(t,3)):[]}function Hi(e){return e&&e.length?mo(e):[]}function zi(e,t){return e&&e.length?mo(e,_a(t,2)):[]}function qi(e,t){return t="function"==typeof t?t:oe,e&&e.length?mo(e,oe,t):[]}function Yi(e){if(!e||!e.length)return[];var t=0;return e=p(e,function(e){if(Gs(e))return t=qc(e.length,t),!0}),D(t,function(t){return m(e,T(t))})}function Gi(e,t){if(!e||!e.length)return[];var n=Yi(e);return null==t?n:m(n,function(e){return s(t,oe,e)})}function Zi(e,t){return wo(e||[],t||[],qn)}function $i(e,t){return wo(e||[],t||[],ao)}function Ki(e){var t=n(e);return t.__chain__=!0,t}function Ji(e,t){return t(e),e}function Xi(e,t){return t(e)}function Qi(){return Ki(this)}function es(){return new o(this.value(),this.__chain__)}function ts(){this.__values__===oe&&(this.__values__=Eu(this.value()));var e=this.__index__>=this.__values__.length;return{done:e,value:e?oe:this.__values__[this.__index__++]}}function ns(){return this}function rs(e){for(var t,n=this;n instanceof r;){var o=ni(n);o.__index__=0,o.__values__=oe,t?a.__wrapped__=o:t=o;var a=o;n=n.__wrapped__}return a.__wrapped__=e,t}function os(){var e=this.__wrapped__;if(e instanceof E){var t=e;return this.__actions__.length&&(t=new E(this)),t=t.reverse(),t.__actions__.push({func:Xi,args:[Ti],thisArg:oe}),new o(t,this.__chain__)}return this.thru(Ti)}function as(){return bo(this.__wrapped__,this.__actions__)}function is(e,t,n){var r=gp(e)?f:ur;return n&&ja(e,t,n)&&(t=oe),r(e,_a(t,3))}function ss(e,t){return(gp(e)?p:fr)(e,_a(t,3))}function us(e,t){return pr(hs(e,t),1)}function ls(e,t){return pr(hs(e,t),Me)}function cs(e,t,n){return n=n===oe?1:_u(n),pr(hs(e,t),n)}function fs(e,t){return(gp(e)?l:mf)(e,_a(t,3))}function ps(e,t){return(gp(e)?c:vf)(e,_a(t,3))}function ds(e,t,n,r){e=Ys(e)?e:Qu(e),n=n&&!r?_u(n):0;var o=e.length;return n<0&&(n=qc(o+n,0)),mu(e)?n<=o&&e.indexOf(t,n)>-1:!!o&&C(e,t,n)>-1}function hs(e,t){return(gp(e)?m:Wr)(e,_a(t,3))}function ms(e,t,n,r){return null==e?[]:(gp(t)||(t=null==t?[]:[t]),n=r?oe:n,gp(n)||(n=null==n?[]:[n]),Gr(e,t,n))}function vs(e,t,n){var r=gp(e)?g:N,o=arguments.length<3;return r(e,_a(t,4),n,o,mf)}function gs(e,t,n){var r=gp(e)?y:N,o=arguments.length<3;return r(e,_a(t,4),n,o,vf)}function ys(e,t){return(gp(e)?p:fr)(e,Ms(_a(t,3)))}function bs(e){return(gp(e)?An:ro)(e)}function Es(e,t,n){return t=(n?ja(e,t,n):t===oe)?1:_u(t),(gp(e)?Rn:oo)(e,t)}function ws(e){return(gp(e)?Ln:io)(e)}function _s(e){if(null==e)return 0;if(Ys(e))return mu(e)?Q(e):e.length;var t=Pf(e);return t==$e||t==tt?e.size:Ur(e).length}function ks(e,t,n){var r=gp(e)?b:uo;return n&&ja(e,t,n)&&(t=oe),r(e,_a(t,3))}function Cs(e,t){if("function"!=typeof t)throw new cc(se);return e=_u(e),function(){if(--e<1)return t.apply(this,arguments)}}function Ss(e,t,n){return t=n?oe:t,t=e&&null==t?e.length:t,ca(e,ke,oe,oe,oe,oe,t)}function xs(e,t){var n;if("function"!=typeof t)throw new cc(se);return e=_u(e),function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=oe),n}}function Ps(e,t,n){t=n?oe:t;var r=ca(e,be,oe,oe,oe,oe,oe,t);return r.placeholder=Ps.placeholder,r}function Ts(e,t,n){t=n?oe:t;var r=ca(e,Ee,oe,oe,oe,oe,oe,t);return r.placeholder=Ts.placeholder,r}function Os(e,t,n){function r(t){var n=p,r=d;return p=d=oe,y=t,m=e.apply(r,n)}function o(e){return y=e,v=Nf(s,t),b?r(e):m}function a(e){var n=e-g,r=e-y,o=t-n;return E?Yc(o,h-r):o}function i(e){var n=e-g,r=e-y;return g===oe||n>=t||n<0||E&&r>=h}function s(){var e=ap();if(i(e))return u(e);v=Nf(s,a(e))}function u(e){return v=oe,w&&p?r(e):(p=d=oe,m)}function l(){v!==oe&&_f(v),y=0,p=g=d=v=oe}function c(){return v===oe?m:u(ap())}function f(){var e=ap(),n=i(e);if(p=arguments,d=this,g=e,n){if(v===oe)return o(g);if(E)return v=Nf(s,t),r(g)}return v===oe&&(v=Nf(s,t)),m}var p,d,h,m,v,g,y=0,b=!1,E=!1,w=!0;if("function"!=typeof e)throw new cc(se);return t=Cu(t)||0,ou(n)&&(b=!!n.leading,E="maxWait"in n,h=E?qc(Cu(n.maxWait)||0,t):h,w="trailing"in n?!!n.trailing:w),f.cancel=l,f.flush=c,f}function Ns(e){return ca(e,Se)}function Is(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new cc(se);var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],a=n.cache;if(a.has(o))return a.get(o);var i=e.apply(this,r);return n.cache=a.set(o,i)||a,i};return n.cache=new(Is.Cache||ln),n}function Ms(e){if("function"!=typeof e)throw new cc(se);return function(){var t=arguments;switch(t.length){case 0:return!e.call(this);case 1:return!e.call(this,t[0]);case 2:return!e.call(this,t[0],t[1]);case 3:return!e.call(this,t[0],t[1],t[2])}return!e.apply(this,t)}}function Ds(e){return xs(2,e)}function As(e,t){if("function"!=typeof e)throw new cc(se);return t=t===oe?t:_u(t),no(e,t)}function Rs(e,t){if("function"!=typeof e)throw new cc(se);return t=null==t?0:qc(_u(t),0),no(function(n){var r=n[t],o=So(n,0,t);return r&&v(o,r),s(e,this,o)})}function js(e,t,n){var r=!0,o=!0;if("function"!=typeof e)throw new cc(se);return ou(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),Os(e,t,{leading:r,maxWait:t,trailing:o})}function Ls(e){return Ss(e,1)}function Us(e,t){return fp(ko(t),e)}function Fs(){if(!arguments.length)return[];var e=arguments[0];return gp(e)?e:[e]}function Bs(e){return rr(e,de)}function Ws(e,t){return t="function"==typeof t?t:oe,rr(e,de,t)}function Vs(e){return rr(e,fe|de)}function Hs(e,t){return t="function"==typeof t?t:oe,rr(e,fe|de,t)}function zs(e,t){return null==t||ar(e,t,Bu(t))}function qs(e,t){return e===t||e!==e&&t!==t}function Ys(e){return null!=e&&ru(e.length)&&!tu(e)}function Gs(e){return au(e)&&Ys(e)}function Zs(e){return!0===e||!1===e||au(e)&&yr(e)==He}function $s(e){return au(e)&&1===e.nodeType&&!du(e)}function Ks(e){if(null==e)return!0;if(Ys(e)&&(gp(e)||"string"==typeof e||"function"==typeof e.splice||bp(e)||Cp(e)||vp(e)))return!e.length;var t=Pf(e);if(t==$e||t==tt)return!e.size;if(Wa(e))return!Ur(e).length;for(var n in e)if(vc.call(e,n))return!1;return!0}function Js(e,t){return Or(e,t)}function Xs(e,t,n){n="function"==typeof n?n:oe;var r=n?n(e,t):oe;return r===oe?Or(e,t,oe,n):!!r}function Qs(e){if(!au(e))return!1;var t=yr(e);return t==Ye||t==qe||"string"==typeof e.message&&"string"==typeof e.name&&!du(e)}function eu(e){return"number"==typeof e&&Vc(e)}function tu(e){if(!ou(e))return!1;var t=yr(e);return t==Ge||t==Ze||t==Ve||t==Qe}function nu(e){return"number"==typeof e&&e==_u(e)}function ru(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=De}function ou(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function au(e){return null!=e&&"object"==typeof e}function iu(e,t){return e===t||Mr(e,t,Ca(t))}function su(e,t,n){return n="function"==typeof n?n:oe,Mr(e,t,Ca(t),n)}function uu(e){return pu(e)&&e!=+e}function lu(e){if(Tf(e))throw new oc(ie);return Dr(e)}function cu(e){return null===e}function fu(e){return null==e}function pu(e){return"number"==typeof e||au(e)&&yr(e)==Ke}function du(e){if(!au(e)||yr(e)!=Xe)return!1;var t=Pc(e);if(null===t)return!0;var n=vc.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&mc.call(n)==Ec}function hu(e){return nu(e)&&e>=-De&&e<=De}function mu(e){return"string"==typeof e||!gp(e)&&au(e)&&yr(e)==nt}function vu(e){return"symbol"==typeof e||au(e)&&yr(e)==rt}function gu(e){return e===oe}function yu(e){return au(e)&&Pf(e)==at}function bu(e){return au(e)&&yr(e)==it}function Eu(e){if(!e)return[];if(Ys(e))return mu(e)?ee(e):Uo(e);if(Mc&&e[Mc])return q(e[Mc]());var t=Pf(e);return(t==$e?Y:t==tt?$:Qu)(e)}function wu(e){if(!e)return 0===e?e:0;if((e=Cu(e))===Me||e===-Me){return(e<0?-1:1)*Ae}return e===e?e:0}function _u(e){var t=wu(e),n=t%1;return t===t?n?t-n:t:0}function ku(e){return e?nr(_u(e),0,je):0}function Cu(e){if("number"==typeof e)return e;if(vu(e))return Re;if(ou(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=ou(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(At,"");var n=qt.test(e);return n||Gt.test(e)?Nn(e.slice(2),n?2:8):zt.test(e)?Re:+e}function Su(e){return Fo(e,Wu(e))}function xu(e){return e?nr(_u(e),-De,De):0===e?e:0}function Pu(e){return null==e?"":ho(e)}function Tu(e,t){var n=hf(e);return null==t?n:Xn(n,t)}function Ou(e,t){return _(e,_a(t,3),dr)}function Nu(e,t){return _(e,_a(t,3),hr)}function Iu(e,t){return null==e?e:gf(e,_a(t,3),Wu)}function Mu(e,t){return null==e?e:yf(e,_a(t,3),Wu)}function Du(e,t){return e&&dr(e,_a(t,3))}function Au(e,t){return e&&hr(e,_a(t,3))}function Ru(e){return null==e?[]:mr(e,Bu(e))}function ju(e){return null==e?[]:mr(e,Wu(e))}function Lu(e,t,n){var r=null==e?oe:vr(e,t);return r===oe?n:r}function Uu(e,t){return null!=e&&Oa(e,t,Er)}function Fu(e,t){return null!=e&&Oa(e,t,wr)}function Bu(e){return Ys(e)?Mn(e):Ur(e)}function Wu(e){return Ys(e)?Mn(e,!0):Fr(e)}function Vu(e,t){var n={};return t=_a(t,3),dr(e,function(e,r,o){er(n,t(e,r,o),e)}),n}function Hu(e,t){var n={};return t=_a(t,3),dr(e,function(e,r,o){er(n,r,t(e,r,o))}),n}function zu(e,t){return qu(e,Ms(_a(t)))}function qu(e,t){if(null==e)return{};var n=m(ba(e),function(e){return[e]});return t=_a(t),$r(e,n,function(e,n){return t(e,n[0])})}function Yu(e,t,n){t=Co(t,e);var r=-1,o=t.length;for(o||(o=1,e=oe);++r<o;){var a=null==e?oe:e[Qa(t[r])];a===oe&&(r=o,a=n),e=tu(a)?a.call(e):a}return e}function Gu(e,t,n){return null==e?e:ao(e,t,n)}function Zu(e,t,n,r){return r="function"==typeof r?r:oe,null==e?e:ao(e,t,n,r)}function $u(e,t,n){var r=gp(e),o=r||bp(e)||Cp(e);if(t=_a(t,4),null==n){var a=e&&e.constructor;n=o?r?new a:[]:ou(e)&&tu(a)?hf(Pc(e)):{}}return(o?l:dr)(e,function(e,r,o){return t(n,e,r,o)}),n}function Ku(e,t){return null==e||vo(e,t)}function Ju(e,t,n){return null==e?e:go(e,t,ko(n))}function Xu(e,t,n,r){return r="function"==typeof r?r:oe,null==e?e:go(e,t,ko(n),r)}function Qu(e){return null==e?[]:j(e,Bu(e))}function el(e){return null==e?[]:j(e,Wu(e))}function tl(e,t,n){return n===oe&&(n=t,t=oe),n!==oe&&(n=Cu(n),n=n===n?n:0),t!==oe&&(t=Cu(t),t=t===t?t:0),nr(Cu(e),t,n)}function nl(e,t,n){return t=wu(t),n===oe?(n=t,t=0):n=wu(n),e=Cu(e),_r(e,t,n)}function rl(e,t,n){if(n&&"boolean"!=typeof n&&ja(e,t,n)&&(t=n=oe),n===oe&&("boolean"==typeof t?(n=t,t=oe):"boolean"==typeof e&&(n=e,e=oe)),e===oe&&t===oe?(e=0,t=1):(e=wu(e),t===oe?(t=e,e=0):t=wu(t)),e>t){var r=e;e=t,t=r}if(n||e%1||t%1){var o=$c();return Yc(e+o*(t-e+On("1e-"+((o+"").length-1))),t)}return Qr(e,t)}function ol(e){return Kp(Pu(e).toLowerCase())}function al(e){return(e=Pu(e))&&e.replace($t,Yn).replace(vn,"")}function il(e,t,n){e=Pu(e),t=ho(t);var r=e.length;n=n===oe?r:nr(_u(n),0,r);var o=n;return(n-=t.length)>=0&&e.slice(n,o)==t}function sl(e){return e=Pu(e),e&&Ct.test(e)?e.replace(_t,Gn):e}function ul(e){return e=Pu(e),e&&Dt.test(e)?e.replace(Mt,"\\$&"):e}function ll(e,t,n){e=Pu(e),t=_u(t);var r=t?Q(e):0;if(!t||r>=t)return e;var o=(t-r)/2;return ra(Fc(o),n)+e+ra(Uc(o),n)}function cl(e,t,n){e=Pu(e),t=_u(t);var r=t?Q(e):0;return t&&r<t?e+ra(t-r,n):e}function fl(e,t,n){e=Pu(e),t=_u(t);var r=t?Q(e):0;return t&&r<t?ra(t-r,n)+e:e}function pl(e,t,n){return n||null==t?t=0:t&&(t=+t),Zc(Pu(e).replace(Rt,""),t||0)}function dl(e,t,n){return t=(n?ja(e,t,n):t===oe)?1:_u(t),to(Pu(e),t)}function hl(){var e=arguments,t=Pu(e[0]);return e.length<3?t:t.replace(e[1],e[2])}function ml(e,t,n){return n&&"number"!=typeof n&&ja(e,t,n)&&(t=n=oe),(n=n===oe?je:n>>>0)?(e=Pu(e),e&&("string"==typeof t||null!=t&&!_p(t))&&!(t=ho(t))&&H(e)?So(ee(e),0,n):e.split(t,n)):[]}function vl(e,t,n){return e=Pu(e),n=null==n?0:nr(_u(n),0,e.length),t=ho(t),e.slice(n,n+t.length)==t}function gl(e,t,r){var o=n.templateSettings;r&&ja(e,t,r)&&(t=oe),e=Pu(e),t=Op({},t,o,fa);var a,i,s=Op({},t.imports,o.imports,fa),u=Bu(s),l=j(s,u),c=0,f=t.interpolate||Kt,p="__p += '",d=uc((t.escape||Kt).source+"|"+f.source+"|"+(f===Pt?Vt:Kt).source+"|"+(t.evaluate||Kt).source+"|$","g"),h="//# sourceURL="+("sourceURL"in t?t.sourceURL:"lodash.templateSources["+ ++_n+"]")+"\n";e.replace(d,function(t,n,r,o,s,u){return r||(r=o),p+=e.slice(c,u).replace(Jt,W),n&&(a=!0,p+="' +\n__e("+n+") +\n'"),s&&(i=!0,p+="';\n"+s+";\n__p += '"),r&&(p+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=u+t.length,t}),p+="';\n";var m=t.variable;m||(p="with (obj) {\n"+p+"\n}\n"),p=(i?p.replace(yt,""):p).replace(bt,"$1").replace(Et,"$1;"),p="function("+(m||"obj")+") {\n"+(m?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(a?", __e = _.escape":"")+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";var v=Jp(function(){return ac(u,h+"return "+p).apply(oe,l)});if(v.source=p,Qs(v))throw v;return v}function yl(e){return Pu(e).toLowerCase()}function bl(e){return Pu(e).toUpperCase()}function El(e,t,n){if((e=Pu(e))&&(n||t===oe))return e.replace(At,"");if(!e||!(t=ho(t)))return e;var r=ee(e),o=ee(t);return So(r,U(r,o),F(r,o)+1).join("")}function wl(e,t,n){if((e=Pu(e))&&(n||t===oe))return e.replace(jt,"");if(!e||!(t=ho(t)))return e;var r=ee(e);return So(r,0,F(r,ee(t))+1).join("")}function _l(e,t,n){if((e=Pu(e))&&(n||t===oe))return e.replace(Rt,"");if(!e||!(t=ho(t)))return e;var r=ee(e);return So(r,U(r,ee(t))).join("")}function kl(e,t){var n=xe,r=Pe;if(ou(t)){var o="separator"in t?t.separator:o;n="length"in t?_u(t.length):n,r="omission"in t?ho(t.omission):r}e=Pu(e);var a=e.length;if(H(e)){var i=ee(e);a=i.length}if(n>=a)return e;var s=n-Q(r);if(s<1)return r;var u=i?So(i,0,s).join(""):e.slice(0,s);if(o===oe)return u+r;if(i&&(s+=u.length-s),_p(o)){if(e.slice(s).search(o)){var l,c=u;for(o.global||(o=uc(o.source,Pu(Ht.exec(o))+"g")),o.lastIndex=0;l=o.exec(c);)var f=l.index;u=u.slice(0,f===oe?s:f)}}else if(e.indexOf(ho(o),s)!=s){var p=u.lastIndexOf(o);p>-1&&(u=u.slice(0,p))}return u+r}function Cl(e){return e=Pu(e),e&&kt.test(e)?e.replace(wt,Zn):e}function Sl(e,t,n){return e=Pu(e),t=n?oe:t,t===oe?z(e)?re(e):w(e):e.match(t)||[]}function xl(e){var t=null==e?0:e.length,n=_a();return e=t?m(e,function(e){if("function"!=typeof e[1])throw new cc(se);return[n(e[0]),e[1]]}):[],no(function(n){for(var r=-1;++r<t;){var o=e[r];if(s(o[0],this,n))return s(o[1],this,n)}})}function Pl(e){return or(rr(e,fe))}function Tl(e){return function(){return e}}function Ol(e,t){return null==e||e!==e?t:e}function Nl(e){return e}function Il(e){return Lr("function"==typeof e?e:rr(e,fe))}function Ml(e){return Vr(rr(e,fe))}function Dl(e,t){return Hr(e,rr(t,fe))}function Al(e,t,n){var r=Bu(t),o=mr(t,r);null!=n||ou(t)&&(o.length||!r.length)||(n=t,t=e,e=this,o=mr(t,Bu(t)));var a=!(ou(n)&&"chain"in n&&!n.chain),i=tu(e);return l(o,function(n){var r=t[n];e[n]=r,i&&(e.prototype[n]=function(){var t=this.__chain__;if(a||t){var n=e(this.__wrapped__);return(n.__actions__=Uo(this.__actions__)).push({func:r,args:arguments,thisArg:e}),n.__chain__=t,n}return r.apply(e,v([this.value()],arguments))})}),e}function Rl(){return Dn._===this&&(Dn._=wc),this}function jl(){}function Ll(e){return e=_u(e),no(function(t){return Yr(t,e)})}function Ul(e){return La(e)?T(Qa(e)):Kr(e)}function Fl(e){return function(t){return null==e?oe:vr(e,t)}}function Bl(){return[]}function Wl(){return!1}function Vl(){return{}}function Hl(){return""}function zl(){return!0}function ql(e,t){if((e=_u(e))<1||e>De)return[];var n=je,r=Yc(e,je);t=_a(t),e-=je;for(var o=D(r,t);++n<e;)t(n);return o}function Yl(e){return gp(e)?m(e,Qa):vu(e)?[e]:Uo(Mf(Pu(e)))}function Gl(e){var t=++gc;return Pu(e)+t}function Zl(e){return e&&e.length?lr(e,Nl,br):oe}function $l(e,t){return e&&e.length?lr(e,_a(t,2),br):oe}function Kl(e){return P(e,Nl)}function Jl(e,t){return P(e,_a(t,2))}function Xl(e){return e&&e.length?lr(e,Nl,Br):oe}function Ql(e,t){return e&&e.length?lr(e,_a(t,2),Br):oe}function ec(e){return e&&e.length?M(e,Nl):0}function tc(e,t){return e&&e.length?M(e,_a(t,2)):0}t=null==t?Dn:$n.defaults(Dn.Object(),t,$n.pick(Dn,wn));var nc=t.Array,rc=t.Date,oc=t.Error,ac=t.Function,ic=t.Math,sc=t.Object,uc=t.RegExp,lc=t.String,cc=t.TypeError,fc=nc.prototype,pc=ac.prototype,dc=sc.prototype,hc=t["__core-js_shared__"],mc=pc.toString,vc=dc.hasOwnProperty,gc=0,yc=function(){var e=/[^.]+$/.exec(hc&&hc.keys&&hc.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),bc=dc.toString,Ec=mc.call(sc),wc=Dn._,_c=uc("^"+mc.call(vc).replace(Mt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),kc=jn?t.Buffer:oe,Cc=t.Symbol,Sc=t.Uint8Array,xc=kc?kc.allocUnsafe:oe,Pc=G(sc.getPrototypeOf,sc),Tc=sc.create,Oc=dc.propertyIsEnumerable,Nc=fc.splice,Ic=Cc?Cc.isConcatSpreadable:oe,Mc=Cc?Cc.iterator:oe,Dc=Cc?Cc.toStringTag:oe,Ac=function(){try{var e=Sa(sc,"defineProperty");return e({},"",{}),e}catch(e){}}(),Rc=t.clearTimeout!==Dn.clearTimeout&&t.clearTimeout,jc=rc&&rc.now!==Dn.Date.now&&rc.now,Lc=t.setTimeout!==Dn.setTimeout&&t.setTimeout,Uc=ic.ceil,Fc=ic.floor,Bc=sc.getOwnPropertySymbols,Wc=kc?kc.isBuffer:oe,Vc=t.isFinite,Hc=fc.join,zc=G(sc.keys,sc),qc=ic.max,Yc=ic.min,Gc=rc.now,Zc=t.parseInt,$c=ic.random,Kc=fc.reverse,Jc=Sa(t,"DataView"),Xc=Sa(t,"Map"),Qc=Sa(t,"Promise"),ef=Sa(t,"Set"),tf=Sa(t,"WeakMap"),nf=Sa(sc,"create"),rf=tf&&new tf,of={},af=ei(Jc),sf=ei(Xc),uf=ei(Qc),lf=ei(ef),cf=ei(tf),ff=Cc?Cc.prototype:oe,pf=ff?ff.valueOf:oe,df=ff?ff.toString:oe,hf=function(){function e(){}return function(t){if(!ou(t))return{};if(Tc)return Tc(t);e.prototype=t;var n=new e;return e.prototype=oe,n}}();n.templateSettings={escape:St,evaluate:xt,interpolate:Pt,variable:"",imports:{_:n}},n.prototype=r.prototype,n.prototype.constructor=n,o.prototype=hf(r.prototype),o.prototype.constructor=o,E.prototype=hf(r.prototype),E.prototype.constructor=E,ne.prototype.clear=Bt,ne.prototype.delete=Xt,ne.prototype.get=Qt,ne.prototype.has=en,ne.prototype.set=tn,nn.prototype.clear=rn,nn.prototype.delete=on,nn.prototype.get=an,nn.prototype.has=sn,nn.prototype.set=un,ln.prototype.clear=cn,ln.prototype.delete=fn,ln.prototype.get=pn,ln.prototype.has=dn,ln.prototype.set=hn,gn.prototype.add=gn.prototype.push=yn,gn.prototype.has=bn,En.prototype.clear=Sn,En.prototype.delete=xn,En.prototype.get=Pn,En.prototype.has=Tn,En.prototype.set=In;var mf=zo(dr),vf=zo(hr,!0),gf=qo(),yf=qo(!0),bf=rf?function(e,t){return rf.set(e,t),e}:Nl,Ef=Ac?function(e,t){return Ac(e,"toString",{configurable:!0,enumerable:!1,value:Tl(t),writable:!0})}:Nl,wf=no,_f=Rc||function(e){return Dn.clearTimeout(e)},kf=ef&&1/$(new ef([,-0]))[1]==Me?function(e){return new ef(e)}:jl,Cf=rf?function(e){return rf.get(e)}:jl,Sf=Bc?function(e){return null==e?[]:(e=sc(e),p(Bc(e),function(t){return Oc.call(e,t)}))}:Bl,xf=Bc?function(e){for(var t=[];e;)v(t,Sf(e)),e=Pc(e);return t}:Bl,Pf=yr;(Jc&&Pf(new Jc(new ArrayBuffer(1)))!=ut||Xc&&Pf(new Xc)!=$e||Qc&&"[object Promise]"!=Pf(Qc.resolve())||ef&&Pf(new ef)!=tt||tf&&Pf(new tf)!=at)&&(Pf=function(e){var t=yr(e),n=t==Xe?e.constructor:oe,r=n?ei(n):"";if(r)switch(r){case af:return ut;case sf:return $e;case uf:return"[object Promise]";case lf:return tt;case cf:return at}return t});var Tf=hc?tu:Wl,Of=Ja(bf),Nf=Lc||function(e,t){return Dn.setTimeout(e,t)},If=Ja(Ef),Mf=function(e){var t=Is(e,function(e){return n.size===le&&n.clear(),e}),n=t.cache;return t}(function(e){var t=[];return Nt.test(e)&&t.push(""),e.replace(It,function(e,n,r,o){t.push(r?o.replace(Wt,"$1"):n||e)}),t}),Df=no(function(e,t){return Gs(e)?sr(e,pr(t,1,Gs,!0)):[]}),Af=no(function(e,t){var n=wi(t);return Gs(n)&&(n=oe),Gs(e)?sr(e,pr(t,1,Gs,!0),_a(n,2)):[]}),Rf=no(function(e,t){var n=wi(t);return Gs(n)&&(n=oe),Gs(e)?sr(e,pr(t,1,Gs,!0),oe,n):[]}),jf=no(function(e){var t=m(e,_o);return t.length&&t[0]===e[0]?kr(t):[]}),Lf=no(function(e){var t=wi(e),n=m(e,_o);return t===wi(n)?t=oe:n.pop(),n.length&&n[0]===e[0]?kr(n,_a(t,2)):[]}),Uf=no(function(e){var t=wi(e),n=m(e,_o);return t="function"==typeof t?t:oe,t&&n.pop(),n.length&&n[0]===e[0]?kr(n,oe,t):[]}),Ff=no(Ci),Bf=ga(function(e,t){var n=null==e?0:e.length,r=tr(e,t);return Xr(e,m(t,function(e){return Ra(e,n)?+e:e}).sort(Ao)),r}),Wf=no(function(e){return mo(pr(e,1,Gs,!0))}),Vf=no(function(e){var t=wi(e);return Gs(t)&&(t=oe),mo(pr(e,1,Gs,!0),_a(t,2))}),Hf=no(function(e){var t=wi(e);return t="function"==typeof t?t:oe,mo(pr(e,1,Gs,!0),oe,t)}),zf=no(function(e,t){return Gs(e)?sr(e,t):[]}),qf=no(function(e){return Eo(p(e,Gs))}),Yf=no(function(e){var t=wi(e);return Gs(t)&&(t=oe),Eo(p(e,Gs),_a(t,2))}),Gf=no(function(e){var t=wi(e);return t="function"==typeof t?t:oe,Eo(p(e,Gs),oe,t)}),Zf=no(Yi),$f=no(function(e){var t=e.length,n=t>1?e[t-1]:oe;return n="function"==typeof n?(e.pop(),n):oe,Gi(e,n)}),Kf=ga(function(e){var t=e.length,n=t?e[0]:0,r=this.__wrapped__,a=function(t){return tr(t,e)};return!(t>1||this.__actions__.length)&&r instanceof E&&Ra(n)?(r=r.slice(n,+n+(t?1:0)),r.__actions__.push({func:Xi,args:[a],thisArg:oe}),new o(r,this.__chain__).thru(function(e){return t&&!e.length&&e.push(oe),e})):this.thru(a)}),Jf=Vo(function(e,t,n){vc.call(e,n)?++e[n]:er(e,n,1)}),Xf=Jo(fi),Qf=Jo(pi),ep=Vo(function(e,t,n){vc.call(e,n)?e[n].push(t):er(e,n,[t])}),tp=no(function(e,t,n){var r=-1,o="function"==typeof t,a=Ys(e)?nc(e.length):[];return mf(e,function(e){a[++r]=o?s(t,e,n):Sr(e,t,n)}),a}),np=Vo(function(e,t,n){er(e,n,t)}),rp=Vo(function(e,t,n){e[n?0:1].push(t)},function(){return[[],[]]}),op=no(function(e,t){if(null==e)return[];var n=t.length;return n>1&&ja(e,t[0],t[1])?t=[]:n>2&&ja(t[0],t[1],t[2])&&(t=[t[0]]),Gr(e,pr(t,1),[])}),ap=jc||function(){return Dn.Date.now()},ip=no(function(e,t,n){var r=ve;if(n.length){var o=Z(n,wa(ip));r|=we}return ca(e,r,t,n,o)}),sp=no(function(e,t,n){var r=ve|ge;if(n.length){var o=Z(n,wa(sp));r|=we}return ca(t,r,e,n,o)}),up=no(function(e,t){return ir(e,1,t)}),lp=no(function(e,t,n){return ir(e,Cu(t)||0,n)});Is.Cache=ln;var cp=wf(function(e,t){t=1==t.length&&gp(t[0])?m(t[0],R(_a())):m(pr(t,1),R(_a()));var n=t.length;return no(function(r){for(var o=-1,a=Yc(r.length,n);++o<a;)r[o]=t[o].call(this,r[o]);return s(e,this,r)})}),fp=no(function(e,t){var n=Z(t,wa(fp));return ca(e,we,oe,t,n)}),pp=no(function(e,t){var n=Z(t,wa(pp));return ca(e,_e,oe,t,n)}),dp=ga(function(e,t){return ca(e,Ce,oe,oe,oe,t)}),hp=ia(br),mp=ia(function(e,t){return e>=t}),vp=xr(function(){return arguments}())?xr:function(e){return au(e)&&vc.call(e,"callee")&&!Oc.call(e,"callee")},gp=nc.isArray,yp=Fn?R(Fn):Pr,bp=Wc||Wl,Ep=Bn?R(Bn):Tr,wp=Wn?R(Wn):Ir,_p=Vn?R(Vn):Ar,kp=Hn?R(Hn):Rr,Cp=zn?R(zn):jr,Sp=ia(Br),xp=ia(function(e,t){return e<=t}),Pp=Ho(function(e,t){if(Wa(t)||Ys(t))return void Fo(t,Bu(t),e);for(var n in t)vc.call(t,n)&&qn(e,n,t[n])}),Tp=Ho(function(e,t){Fo(t,Wu(t),e)}),Op=Ho(function(e,t,n,r){Fo(t,Wu(t),e,r)}),Np=Ho(function(e,t,n,r){Fo(t,Bu(t),e,r)}),Ip=ga(tr),Mp=no(function(e){return e.push(oe,fa),s(Op,oe,e)}),Dp=no(function(e){return e.push(oe,pa),s(Up,oe,e)}),Ap=ea(function(e,t,n){e[t]=n},Tl(Nl)),Rp=ea(function(e,t,n){vc.call(e,t)?e[t].push(n):e[t]=[n]},_a),jp=no(Sr),Lp=Ho(function(e,t,n){zr(e,t,n)}),Up=Ho(function(e,t,n,r){zr(e,t,n,r)}),Fp=ga(function(e,t){var n={};if(null==e)return n;var r=!1;t=m(t,function(t){return t=Co(t,e),r||(r=t.length>1),t}),Fo(e,ba(e),n),r&&(n=rr(n,fe|pe|de,da));for(var o=t.length;o--;)vo(n,t[o]);return n}),Bp=ga(function(e,t){return null==e?{}:Zr(e,t)}),Wp=la(Bu),Vp=la(Wu),Hp=Zo(function(e,t,n){return t=t.toLowerCase(),e+(n?ol(t):t)}),zp=Zo(function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}),qp=Zo(function(e,t,n){return e+(n?" ":"")+t.toLowerCase()}),Yp=Go("toLowerCase"),Gp=Zo(function(e,t,n){return e+(n?"_":"")+t.toLowerCase()}),Zp=Zo(function(e,t,n){return e+(n?" ":"")+Kp(t)}),$p=Zo(function(e,t,n){return e+(n?" ":"")+t.toUpperCase()}),Kp=Go("toUpperCase"),Jp=no(function(e,t){try{return s(e,oe,t)}catch(e){return Qs(e)?e:new oc(e)}}),Xp=ga(function(e,t){return l(t,function(t){t=Qa(t),er(e,t,ip(e[t],e))}),e}),Qp=Xo(),ed=Xo(!0),td=no(function(e,t){return function(n){return Sr(n,e,t)}}),nd=no(function(e,t){return function(n){return Sr(e,n,t)}}),rd=na(m),od=na(f),ad=na(b),id=aa(),sd=aa(!0),ud=ta(function(e,t){return e+t},0),ld=ua("ceil"),cd=ta(function(e,t){return e/t},1),fd=ua("floor"),pd=ta(function(e,t){return e*t},1),dd=ua("round"),hd=ta(function(e,t){return e-t},0);return n.after=Cs,n.ary=Ss,n.assign=Pp,n.assignIn=Tp,n.assignInWith=Op,n.assignWith=Np,n.at=Ip,n.before=xs,n.bind=ip,n.bindAll=Xp,n.bindKey=sp,n.castArray=Fs,n.chain=Ki,n.chunk=ri,n.compact=oi,n.concat=ai,n.cond=xl,n.conforms=Pl,n.constant=Tl,n.countBy=Jf,n.create=Tu,n.curry=Ps,n.curryRight=Ts,n.debounce=Os,n.defaults=Mp,n.defaultsDeep=Dp,n.defer=up,n.delay=lp,n.difference=Df,n.differenceBy=Af,n.differenceWith=Rf,n.drop=ii,n.dropRight=si,n.dropRightWhile=ui,n.dropWhile=li,n.fill=ci,n.filter=ss,n.flatMap=us,n.flatMapDeep=ls,n.flatMapDepth=cs,n.flatten=di,n.flattenDeep=hi,n.flattenDepth=mi,n.flip=Ns,n.flow=Qp,n.flowRight=ed,n.fromPairs=vi,n.functions=Ru,n.functionsIn=ju,n.groupBy=ep,n.initial=bi,n.intersection=jf,n.intersectionBy=Lf,n.intersectionWith=Uf,n.invert=Ap,n.invertBy=Rp,n.invokeMap=tp,n.iteratee=Il,n.keyBy=np,n.keys=Bu,n.keysIn=Wu,n.map=hs,n.mapKeys=Vu,n.mapValues=Hu,n.matches=Ml,n.matchesProperty=Dl,n.memoize=Is,n.merge=Lp,n.mergeWith=Up,n.method=td,n.methodOf=nd,n.mixin=Al,n.negate=Ms,n.nthArg=Ll,n.omit=Fp,n.omitBy=zu,n.once=Ds,n.orderBy=ms,n.over=rd,n.overArgs=cp,n.overEvery=od,n.overSome=ad,n.partial=fp,n.partialRight=pp,n.partition=rp,n.pick=Bp,n.pickBy=qu,n.property=Ul,n.propertyOf=Fl,n.pull=Ff,n.pullAll=Ci,n.pullAllBy=Si,n.pullAllWith=xi,n.pullAt=Bf,n.range=id,n.rangeRight=sd,n.rearg=dp,n.reject=ys,n.remove=Pi,n.rest=As,n.reverse=Ti,n.sampleSize=Es,n.set=Gu,n.setWith=Zu,n.shuffle=ws,n.slice=Oi,n.sortBy=op,n.sortedUniq=ji,n.sortedUniqBy=Li,n.split=ml,n.spread=Rs,n.tail=Ui,n.take=Fi,n.takeRight=Bi,n.takeRightWhile=Wi,n.takeWhile=Vi,n.tap=Ji,n.throttle=js,n.thru=Xi,n.toArray=Eu,n.toPairs=Wp,n.toPairsIn=Vp,n.toPath=Yl,n.toPlainObject=Su,n.transform=$u,n.unary=Ls,n.union=Wf,n.unionBy=Vf,n.unionWith=Hf,n.uniq=Hi,n.uniqBy=zi,n.uniqWith=qi,n.unset=Ku,n.unzip=Yi,n.unzipWith=Gi,n.update=Ju,n.updateWith=Xu,n.values=Qu,n.valuesIn=el,n.without=zf,n.words=Sl,n.wrap=Us,n.xor=qf,n.xorBy=Yf,n.xorWith=Gf,n.zip=Zf,n.zipObject=Zi,n.zipObjectDeep=$i,n.zipWith=$f,n.entries=Wp,n.entriesIn=Vp,n.extend=Tp,n.extendWith=Op,Al(n,n),n.add=ud,n.attempt=Jp,n.camelCase=Hp,n.capitalize=ol,n.ceil=ld,n.clamp=tl,n.clone=Bs,n.cloneDeep=Vs,n.cloneDeepWith=Hs,n.cloneWith=Ws,n.conformsTo=zs,n.deburr=al,n.defaultTo=Ol,n.divide=cd,n.endsWith=il,n.eq=qs,n.escape=sl,n.escapeRegExp=ul,n.every=is,n.find=Xf,n.findIndex=fi,n.findKey=Ou,n.findLast=Qf,n.findLastIndex=pi,n.findLastKey=Nu,n.floor=fd,n.forEach=fs,n.forEachRight=ps,n.forIn=Iu,n.forInRight=Mu,n.forOwn=Du,n.forOwnRight=Au,n.get=Lu,n.gt=hp,n.gte=mp,n.has=Uu,n.hasIn=Fu,n.head=gi,n.identity=Nl,n.includes=ds,n.indexOf=yi,n.inRange=nl,n.invoke=jp,n.isArguments=vp,n.isArray=gp,n.isArrayBuffer=yp,n.isArrayLike=Ys,n.isArrayLikeObject=Gs,n.isBoolean=Zs,n.isBuffer=bp,n.isDate=Ep,n.isElement=$s,n.isEmpty=Ks,n.isEqual=Js,n.isEqualWith=Xs,n.isError=Qs,n.isFinite=eu,n.isFunction=tu,n.isInteger=nu,n.isLength=ru,n.isMap=wp,n.isMatch=iu,n.isMatchWith=su,n.isNaN=uu,n.isNative=lu,n.isNil=fu,n.isNull=cu,n.isNumber=pu,n.isObject=ou,n.isObjectLike=au,n.isPlainObject=du,n.isRegExp=_p,n.isSafeInteger=hu,n.isSet=kp,n.isString=mu,n.isSymbol=vu,n.isTypedArray=Cp,n.isUndefined=gu,n.isWeakMap=yu,n.isWeakSet=bu,n.join=Ei,n.kebabCase=zp,n.last=wi,n.lastIndexOf=_i,n.lowerCase=qp,n.lowerFirst=Yp,n.lt=Sp,n.lte=xp,n.max=Zl,n.maxBy=$l,n.mean=Kl,n.meanBy=Jl,n.min=Xl,n.minBy=Ql,n.stubArray=Bl,n.stubFalse=Wl,n.stubObject=Vl,n.stubString=Hl,n.stubTrue=zl,n.multiply=pd,n.nth=ki,n.noConflict=Rl,n.noop=jl,n.now=ap,n.pad=ll,n.padEnd=cl,n.padStart=fl,n.parseInt=pl,n.random=rl,n.reduce=vs,n.reduceRight=gs,n.repeat=dl,n.replace=hl,n.result=Yu,n.round=dd,n.runInContext=e,n.sample=bs,n.size=_s,n.snakeCase=Gp,n.some=ks,n.sortedIndex=Ni,n.sortedIndexBy=Ii,n.sortedIndexOf=Mi,n.sortedLastIndex=Di,n.sortedLastIndexBy=Ai,n.sortedLastIndexOf=Ri,n.startCase=Zp,n.startsWith=vl,n.subtract=hd,n.sum=ec,n.sumBy=tc,n.template=gl,n.times=ql,n.toFinite=wu,n.toInteger=_u,n.toLength=ku,n.toLower=yl,n.toNumber=Cu,n.toSafeInteger=xu,n.toString=Pu,n.toUpper=bl,n.trim=El,n.trimEnd=wl,n.trimStart=_l,n.truncate=kl,n.unescape=Cl,n.uniqueId=Gl,n.upperCase=$p,n.upperFirst=Kp,n.each=fs,n.eachRight=ps,n.first=gi,Al(n,function(){var e={};return dr(n,function(t,r){vc.call(n.prototype,r)||(e[r]=t)}),e}(),{chain:!1}),n.VERSION="4.17.4",l(["bind","bindKey","curry","curryRight","partial","partialRight"],function(e){n[e].placeholder=n}),l(["drop","take"],function(e,t){E.prototype[e]=function(n){n=n===oe?1:qc(_u(n),0);var r=this.__filtered__&&!t?new E(this):this.clone();return r.__filtered__?r.__takeCount__=Yc(n,r.__takeCount__):r.__views__.push({size:Yc(n,je),type:e+(r.__dir__<0?"Right":"")}),r},E.prototype[e+"Right"]=function(t){return this.reverse()[e](t).reverse()}}),l(["filter","map","takeWhile"],function(e,t){var n=t+1,r=n==Ne||3==n;E.prototype[e]=function(e){var t=this.clone();return t.__iteratees__.push({iteratee:_a(e,3),type:n}),t.__filtered__=t.__filtered__||r,t}}),l(["head","last"],function(e,t){var n="take"+(t?"Right":"");E.prototype[e]=function(){return this[n](1).value()[0]}}),l(["initial","tail"],function(e,t){var n="drop"+(t?"":"Right");E.prototype[e]=function(){return this.__filtered__?new E(this):this[n](1)}}),E.prototype.compact=function(){return this.filter(Nl)},E.prototype.find=function(e){return this.filter(e).head()},E.prototype.findLast=function(e){return this.reverse().find(e)},E.prototype.invokeMap=no(function(e,t){return"function"==typeof e?new E(this):this.map(function(n){return Sr(n,e,t)})}),E.prototype.reject=function(e){return this.filter(Ms(_a(e)))},E.prototype.slice=function(e,t){e=_u(e);var n=this;return n.__filtered__&&(e>0||t<0)?new E(n):(e<0?n=n.takeRight(-e):e&&(n=n.drop(e)),t!==oe&&(t=_u(t),n=t<0?n.dropRight(-t):n.take(t-e)),n)},E.prototype.takeRightWhile=function(e){return this.reverse().takeWhile(e).reverse()},E.prototype.toArray=function(){return this.take(je)},dr(E.prototype,function(e,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),a=/^(?:head|last)$/.test(t),i=n[a?"take"+("last"==t?"Right":""):t],s=a||/^find/.test(t);i&&(n.prototype[t]=function(){var t=this.__wrapped__,u=a?[1]:arguments,l=t instanceof E,c=u[0],f=l||gp(t),p=function(e){var t=i.apply(n,v([e],u));return a&&d?t[0]:t};f&&r&&"function"==typeof c&&1!=c.length&&(l=f=!1);var d=this.__chain__,h=!!this.__actions__.length,m=s&&!d,g=l&&!h;if(!s&&f){t=g?t:new E(this);var y=e.apply(t,u);return y.__actions__.push({func:Xi,args:[p],thisArg:oe}),new o(y,d)}return m&&g?e.apply(this,u):(y=this.thru(p),m?a?y.value()[0]:y.value():y)})}),l(["pop","push","shift","sort","splice","unshift"],function(e){var t=fc[e],r=/^(?:push|sort|unshift)$/.test(e)?"tap":"thru",o=/^(?:pop|shift)$/.test(e);n.prototype[e]=function(){var e=arguments;if(o&&!this.__chain__){var n=this.value();return t.apply(gp(n)?n:[],e)}return this[r](function(n){return t.apply(gp(n)?n:[],e)})}}),dr(E.prototype,function(e,t){var r=n[t];if(r){var o=r.name+"";(of[o]||(of[o]=[])).push({name:t,func:r})}}),of[Qo(oe,ge).name]=[{name:"wrapper",func:oe}],E.prototype.clone=O,E.prototype.reverse=J,E.prototype.value=te,n.prototype.at=Kf,n.prototype.chain=Qi,n.prototype.commit=es,n.prototype.next=ts,n.prototype.plant=rs,n.prototype.reverse=os,n.prototype.toJSON=n.prototype.valueOf=n.prototype.value=as,n.prototype.first=n.prototype.head,Mc&&(n.prototype[Mc]=ns),n}();Dn._=$n,(o=function(){return $n}.call(t,n,t,r))!==oe&&(r.exports=o)}).call(this)}).call(t,n(38),n(117)(e))},function(e,t,n){"use strict";function r(e,t){return(e&t)===t}var o=(n(3),n(1)),a={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,injectDOMPropertyConfig:function(e){var t=a,n=e.Properties||{},i=e.DOMAttributeNamespaces||{},u=e.DOMAttributeNames||{},l=e.DOMPropertyNames||{},c=e.DOMMutationMethods||{};e.isCustomAttribute&&s._isCustomAttributeFunctions.push(e.isCustomAttribute);for(var f in n){s.properties.hasOwnProperty(f)&&o(!1,"injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.",f);var p=f.toLowerCase(),d=n[f],h={attributeName:p,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:r(d,t.MUST_USE_PROPERTY),hasBooleanValue:r(d,t.HAS_BOOLEAN_VALUE),hasNumericValue:r(d,t.HAS_NUMERIC_VALUE),hasPositiveNumericValue:r(d,t.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:r(d,t.HAS_OVERLOADED_BOOLEAN_VALUE)};if(h.hasBooleanValue+h.hasNumericValue+h.hasOverloadedBooleanValue<=1||o(!1,"DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s",f),s.getPossibleStandardName[p]=f,u.hasOwnProperty(f)){var m=u[f];h.attributeName=m,s.getPossibleStandardName[m]=f}i.hasOwnProperty(f)&&(h.attributeNamespace=i[f]),l.hasOwnProperty(f)&&(h.propertyName=l[f]),c.hasOwnProperty(f)&&(h.mutationMethod=c[f]),s.properties[f]=h}}},i=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",s={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:i,ATTRIBUTE_NAME_CHAR:i+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},getPossibleStandardName:{autofocus:"autoFocus"},_isCustomAttributeFunctions:[],isCustomAttribute:function(e){for(var t=0;t<s._isCustomAttributeFunctions.length;t++){if((0,s._isCustomAttributeFunctions[t])(e))return!0}return!1},injection:a};e.exports=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchFollowsByUserID=t.createFollow=t.deleteFollow=t.fetchCurrentUserFollows=t.removeSessionFollow=t.addSessionFollow=t.removeFollows=t.removeFollow=t.receiveFollows=t.receiveFollow=t.REMOVE_SESSION_FOLLOW=t.ADD_SESSION_FOLLOW=t.REMOVE_FOLLOWS=t.REMOVE_FOLLOW=t.RECEIVE_FOLLOW=t.RECEIVE_FOLLOWS=void 0;var r=n(293),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_FOLLOWS="RECEIVE_FOLLOWS"),s=t.RECEIVE_FOLLOW="RECEIVE_FOLLOW",u=t.REMOVE_FOLLOW="REMOVE_FOLLOW",l=t.REMOVE_FOLLOWS="REMOVE_FOLLOWS",c=t.ADD_SESSION_FOLLOW="ADD_SESSION_FOLLOW",f=t.REMOVE_SESSION_FOLLOW="REMOVE_SESSION_FOLLOW",p=t.receiveFollow=function(e){return{type:s,follow:e}},d=t.receiveFollows=function(e){return{type:i,follows:e}},h=t.removeFollow=function(e){return{type:u,follow:e}};t.removeFollows=function(){return{type:l}},t.addSessionFollow=function(e){return{type:c,id:e}},t.removeSessionFollow=function(e){return{type:f,id:e}},t.fetchCurrentUserFollows=function(){return function(e){return o.fetchCurrentUserFollows().then(function(t){return e(d(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.deleteFollow=function(e){return function(t){return o.deleteFollow(e).then(function(e){return t(h(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.createFollow=function(e){return function(t){o.createFollow(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchFollowsByUserID=function(e){return function(t){return o.fetchFollowsByUserID(e).then(function(e){return t(d(e))},function(e){return t(receiveErrors(e.responseJSON))})}}},function(e,t,n){"use strict";function r(e){if(d.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}function o(e){if(d.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}function a(e,t){var n=function(){s||(s=!0,f(!1,"%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",t))};n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}function i(e,t){var n=function(){u||(u=!0,f(!1,"%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",t))};n.isReactWarning=!0,Object.defineProperty(e,"ref",{get:n,configurable:!0})}var s,u,l=n(6),c=n(17),f=n(2),p=n(41),d=Object.prototype.hasOwnProperty,h=n(81),m={key:!0,ref:!0,__self:!0,__source:!0},v=function(e,t,n,r,o,a,i){var s={$$typeof:h,type:e,key:t,ref:n,props:i,_owner:a};return s._store={},p?(Object.defineProperty(s._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(s,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),Object.defineProperty(s,"_source",{configurable:!1,enumerable:!1,writable:!1,value:o})):(s._store.validated=!1,s._self=r,s._source=o),Object.freeze&&(Object.freeze(s.props),Object.freeze(s)),s};v.createElement=function(e,t,n){var s,u={},l=null,f=null,p=null,g=null;if(null!=t){r(t)&&(f=t.ref),o(t)&&(l=""+t.key),p=void 0===t.__self?null:t.__self,g=void 0===t.__source?null:t.__source;for(s in t)d.call(t,s)&&!m.hasOwnProperty(s)&&(u[s]=t[s])}var y=arguments.length-2;if(1===y)u.children=n;else if(y>1){for(var b=Array(y),E=0;E<y;E++)b[E]=arguments[E+2];Object.freeze&&Object.freeze(b),u.children=b}if(e&&e.defaultProps){var w=e.defaultProps;for(s in w)void 0===u[s]&&(u[s]=w[s])}if((l||f)&&(void 0===u.$$typeof||u.$$typeof!==h)){var _="function"==typeof e?e.displayName||e.name||"Unknown":e;l&&a(u,_),f&&i(u,_)}return v(e,l,f,p,g,c.current,u)},v.createFactory=function(e){var t=v.createElement.bind(null,e);return t.type=e,t},v.cloneAndReplaceKey=function(e,t){return v(e.type,t,e.ref,e._self,e._source,e._owner,e.props)},v.cloneElement=function(e,t,n){var a,i=l({},e.props),s=e.key,u=e.ref,f=e._self,p=e._source,h=e._owner;if(null!=t){r(t)&&(u=t.ref,h=c.current),o(t)&&(s=""+t.key);var g;e.type&&e.type.defaultProps&&(g=e.type.defaultProps);for(a in t)d.call(t,a)&&!m.hasOwnProperty(a)&&(void 0===t[a]&&void 0!==g?i[a]=g[a]:i[a]=t[a])}var y=arguments.length-2;if(1===y)i.children=n;else if(y>1){for(var b=Array(y),E=0;E<y;E++)b[E]=arguments[E+2];i.children=b}return v(e.type,s,u,f,p,h,i)},v.isValidElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===h},e.exports=v},function(e,t,n){"use strict";var r=(n(3),n(1)),o=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},a=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();return n.call(r,e,t),r}return new n(e,t)},i=function(e,t,n){var r=this;if(r.instancePool.length){var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},s=function(e,t,n,r){var o=this;if(o.instancePool.length){var a=o.instancePool.pop();return o.call(a,e,t,n,r),a}return new o(e,t,n,r)},u=function(e){var t=this;e instanceof t||r(!1,"Trying to release an instance into a pool of a different type."),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},l=o,c=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||l,n.poolSize||(n.poolSize=10),n.release=u,n},f={addPoolingTo:c,oneArgumentPooler:o,twoArgumentPooler:a,threeArgumentPooler:i,fourArgumentPooler:s};e.exports=f},function(e,t,n){"use strict";var r=function(){};r=function(e,t,n){var r=arguments.length;n=new Array(r>2?r-2:0);for(var o=2;o<r;o++)n[o-2]=arguments[o];if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(t.length<10||/^[s\W]*$/.test(t))throw new Error("The warning format should be able to uniquely identify this warning. Please, use a more descriptive format than: "+t);if(!e){var a=0,i="Warning: "+t.replace(/%s/g,function(){return n[a++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(e){}}},e.exports=r},function(e,t,n){"use strict";var r=n(6),o=n(79),a=n(134),i=n(138),s=n(23),u=n(142),l=n(144),c=n(145),f=n(147),p=s.createElement,d=s.createFactory,h=s.cloneElement,m=n(51),v=n(41),g=n(83),y=!1;p=g.createElement,d=g.createFactory,h=g.cloneElement;var b=r,E=function(e){return e},w=!1,_=!1;b=function(){return m(w,"React.__spread is deprecated and should not be used. Use Object.assign directly or another helper function with similar semantics. You may be seeing this warning due to your compiler. See https://fb.me/react-spread-deprecation for more details."),w=!0,r.apply(null,arguments)},E=function(e){return m(_,"React.createMixin is deprecated and should not be used. In React v16.0, it will be removed. You can use this mixin directly instead. See https://fb.me/createmixin-was-never-implemented for more info."),_=!0,e};var k={Children:{map:a.map,forEach:a.forEach,count:a.count,toArray:a.toArray,only:f},Component:o.Component,PureComponent:o.PureComponent,createElement:p,cloneElement:h,isValidElement:s.isValidElement,PropTypes:u,createClass:c,createFactory:d,createMixin:E,DOM:i,version:l,__spread:b},C=!1;v&&(Object.defineProperty(k,"PropTypes",{get:function(){return m(y,"Accessing PropTypes via the main React package is deprecated, and will be removed in  React v16.0. Use the latest available v15.* prop-types package from npm instead. For info on usage, compatibility, migration and more, see https://fb.me/prop-types-docs"),y=!0,u}}),Object.defineProperty(k,"createClass",{get:function(){return m(C,"Accessing createClass via the main React package is deprecated, and will be removed in React v16.0. Use a plain JavaScript class instead. If you're not yet ready to migrate, create-react-class v15.* is available on npm as a temporary, drop-in replacement. For more info see https://fb.me/react-create-class"),C=!0,c}})),k.DOM={};var S=!1;Object.keys(i).forEach(function(e){k.DOM[e]=function(){return S||(m(!1,"Accessing factories like React.DOM.%s has been deprecated and will be removed in v16.0+. Use the react-dom-factories package instead.  Version 1.0 provides a drop-in replacement. For more info, see https://fb.me/react-dom-factories",e),S=!0),i[e].apply(i,arguments)}}),e.exports=k},function(e,t,n){"use strict";function r(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}e.exports=r},function(e,t,n){"use strict";function r(){o.attachRefs(this,this._currentElement)}var o=n(157),a=n(14),i=n(2),s={mountComponent:function(e,t,n,o,i,s){0!==e._debugID&&a.debugTool.onBeforeMountComponent(e._debugID,e._currentElement,s);var u=e.mountComponent(t,n,o,i,s);return e._currentElement&&null!=e._currentElement.ref&&t.getReactMountReady().enqueue(r,e),0!==e._debugID&&a.debugTool.onMountComponent(e._debugID),u},getHostNode:function(e){return e.getHostNode()},unmountComponent:function(e,t){0!==e._debugID&&a.debugTool.onBeforeUnmountComponent(e._debugID),o.detachRefs(e,e._currentElement),e.unmountComponent(t),0!==e._debugID&&a.debugTool.onUnmountComponent(e._debugID)},receiveComponent:function(e,t,n,i){var s=e._currentElement;if(t!==s||i!==e._context){0!==e._debugID&&a.debugTool.onBeforeUpdateComponent(e._debugID,t);var u=o.shouldUpdateRefs(s,t);u&&o.detachRefs(e,s),e.receiveComponent(t,n,i),u&&e._currentElement&&null!=e._currentElement.ref&&n.getReactMountReady().enqueue(r,e),0!==e._debugID&&a.debugTool.onUpdateComponent(e._debugID)}},performUpdateIfNecessary:function(e,t,n){if(e._updateBatchNumber!==n)return void i(null==e._updateBatchNumber||e._updateBatchNumber===n+1,"performUpdateIfNecessary: Unexpected batch number (current %s, pending %s)",n,e._updateBatchNumber);0!==e._debugID&&a.debugTool.onBeforeUpdateComponent(e._debugID,e._currentElement),e.performUpdateIfNecessary(t),0!==e._debugID&&a.debugTool.onUpdateComponent(e._debugID)}};e.exports=s},function(e,t,n){"use strict";function r(e){if(h){var t=e.node,n=e.children;if(n.length)for(var r=0;r<n.length;r++)m(t,n[r],null);else null!=e.html?f(t,e.html):null!=e.text&&d(t,e.text)}}function o(e,t){e.parentNode.replaceChild(t.node,e),r(t)}function a(e,t){h?e.children.push(t):e.node.appendChild(t.node)}function i(e,t){h?e.html=t:f(e.node,t)}function s(e,t){h?e.text=t:d(e.node,t)}function u(){return this.node.nodeName}function l(e){return{node:e,children:[],html:null,text:null,toString:u}}var c=n(58),f=n(47),p=n(59),d=n(96),h="undefined"!=typeof document&&"number"==typeof document.documentMode||"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent&&/\bEdge\/\d/.test(navigator.userAgent),m=p(function(e,t,n){11===t.node.nodeType||1===t.node.nodeType&&"object"===t.node.nodeName.toLowerCase()&&(null==t.node.namespaceURI||t.node.namespaceURI===c.html)?(r(t),e.insertBefore(t.node,n)):(e.insertBefore(t.node,n),r(t))});l.insertTreeBefore=m,l.replaceChildWithTree=o,l.queueChild=a,l.queueHTML=i,l.queueText=s,e.exports=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(16),u=n(9),l=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(l),f=n(5),p=n(4),d=n(11),h=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.giveToPlaybar=n.giveToPlaybar.bind(n),n}return a(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"giveToPlaybar",value:function(e){var t=this,n=this.props.allsongs.map(function(e){return e.id}),r=n.indexOf(this.props.song.id),o=this.props.allsongs.slice(r);this.props.updateSongCount(this.props.song.id),new Promise(function(e,n){return e(t.props.removeAudio())}).then(function(){return t.props.receiveAudio(Object.assign(e,{token:"PLAYING",queue:o}))})}},{key:"render",value:function(){var e=this;return c.default.createElement("div",null,c.default.createElement("img",{src:"https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png",onClick:function(){return e.giveToPlaybar(e.props.song)},className:"PlayinSongPage",ref:function(t){return e.playbutton=t}}))}}]),t}(c.default.Component),m=function(e,t){return{audio:e.audio,allsongs:e.songs.allsongs}},v=function(e){return{receiveAudio:function(t){return e((0,s.receiveAudio)(t))},removeAudio:function(t){return e((0,s.removeAudio)(t))},fetchOneUserByID:function(t){return e((0,u.fetchOneUserByID)(t))},removeAudioToken:function(){return e((0,s.removeAudioToken)())},receivePlayToken:function(){return e((0,s.receivePlayToken)())},updateSongCount:function(t){return e((0,d.updateSongCount)(t))}}};t.default=(0,f.withRouter)((0,p.connect)(m,v)(h))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(16),u=n(9),l=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(l),f=n(5),p=n(4),d=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.giveToPlaybar=n.giveToPlaybar.bind(n),n}return a(t,e),i(t,[{key:"componentWillUpdate",value:function(){"PLAYING"===this.props.audio.token?this.playbutton.src="https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png":this.playbutton.src="https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png"}},{key:"giveToPlaybar",value:function(){this.props.audio.id===this.props.song.id&&"PAUSED"===this.props.audio.token?(this.props.receivePlayToken(),this.props.requestAudioPlaybackTime()):this.props.audio.id===this.props.song.id&&"PLAYING"===this.props.audio.token&&(this.props.receivePauseToken(),this.props.requestAudioPlaybackTime())}},{key:"render",value:function(){var e=this,t="PLAYING"===this.props.audio.token?"https://s3.us-east-2.amazonaws.com/invoke-development/songshow-pausebutton.png":"https://s3.us-east-2.amazonaws.com/invoke-development/songshow-playbutton.png";return c.default.createElement("div",null,c.default.createElement("img",{src:t,onClick:this.giveToPlaybar,className:"PlayinSongPage",ref:function(t){return e.playbutton=t}}))}}]),t}(c.default.Component),h=function(e,t){return{audio:e.audio}},m=function(e){return{receiveAudio:function(t){return e((0,s.receiveAudio)(t))},removeAudio:function(t){return e((0,s.removeAudio)(t))},fetchOneUserByID:function(t){return e((0,u.fetchOneUserByID)(t))},removeAudioToken:function(){return e((0,s.removeAudioToken)())},receivePlayToken:function(){return e((0,s.receivePlayToken)())},receivePauseToken:function(){return e((0,s.receivePauseToken)())},requestAudioPlaybackTime:function(){return e((0,s.requestAudioPlaybackTime)())},updateSongCount:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return e(updateSongCount(t))})}};t.default=(0,f.withRouter)((0,p.connect)(h,m)(d))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchLikesBySongID=t.createLike=t.deleteLike=t.fetchLikes=t.removeLikes=t.removeLike=t.receiveLikes=t.receiveLike=t.REMOVE_LIKES=t.REMOVE_LIKE=t.RECEIVE_LIKE=t.RECEIVE_LIKES=void 0;var r=n(292),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_LIKES="RECEIVE_LIKES"),s=t.RECEIVE_LIKE="RECEIVE_LIKE",u=t.REMOVE_LIKE="REMOVE_LIKE",l=t.REMOVE_LIKES="REMOVE_LIKES",c=t.receiveLike=function(e){return{type:s,like:e}},f=t.receiveLikes=function(e){return{type:i,likes:e}},p=t.removeLike=function(e){return{type:u,like:e}};t.removeLikes=function(){return{type:l}},t.fetchLikes=function(){return function(e){return o.fetchLikes().then(function(t){return e(f(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.deleteLike=function(e){return function(t){return o.deleteLike(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.createLike=function(e){return function(t){o.createLike(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchLikesBySongID=function(e){return function(t){return o.fetchLikesBySongID(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}}},function(e,t,n){"use strict";function r(e,t,n){var r=t.dispatchConfig.phasedRegistrationNames[n];return y(e,r)}function o(e,t,n){g(e,"Dispatching inst must not be null");var o=r(e,n,t);o&&(n._dispatchListeners=m(n._dispatchListeners,o),n._dispatchInstances=m(n._dispatchInstances,e))}function a(e){e&&e.dispatchConfig.phasedRegistrationNames&&h.traverseTwoPhase(e._targetInst,o,e)}function i(e){if(e&&e.dispatchConfig.phasedRegistrationNames){var t=e._targetInst,n=t?h.getParentInstance(t):null;h.traverseTwoPhase(n,o,e)}}function s(e,t,n){if(n&&n.dispatchConfig.registrationName){var r=n.dispatchConfig.registrationName,o=y(e,r);o&&(n._dispatchListeners=m(n._dispatchListeners,o),n._dispatchInstances=m(n._dispatchInstances,e))}}function u(e){e&&e.dispatchConfig.registrationName&&s(e._targetInst,null,e)}function l(e){v(e,a)}function c(e){v(e,i)}function f(e,t,n,r){h.traverseEnterLeave(n,r,s,e,t)}function p(e){v(e,u)}var d=n(34),h=n(52),m=n(88),v=n(89),g=n(2),y=d.getListener,b={accumulateTwoPhaseDispatches:l,accumulateTwoPhaseDispatchesSkipTarget:c,accumulateDirectDispatches:p,accumulateEnterLeaveDispatches:f};e.exports=b},function(e,t,n){"use strict";function r(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}function o(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":return!(!n.disabled||!r(t));default:return!1}}var a=(n(3),n(44)),i=n(52),s=n(53),u=n(88),l=n(89),c=n(1),f={},p=null,d=function(e,t){e&&(i.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e))},h=function(e){return d(e,!0)},m=function(e){return d(e,!1)},v=function(e){return"."+e._rootNodeID},g={injection:{injectEventPluginOrder:a.injectEventPluginOrder,injectEventPluginsByName:a.injectEventPluginsByName},putListener:function(e,t,n){"function"!=typeof n&&c(!1,"Expected %s listener to be a function, instead got type %s",t,typeof n);var r=v(e);(f[t]||(f[t]={}))[r]=n;var o=a.registrationNameModules[t];o&&o.didPutListener&&o.didPutListener(e,t,n)},getListener:function(e,t){var n=f[t];if(o(t,e._currentElement.type,e._currentElement.props))return null;var r=v(e);return n&&n[r]},deleteListener:function(e,t){var n=a.registrationNameModules[t];n&&n.willDeleteListener&&n.willDeleteListener(e,t);var r=f[t];if(r){delete r[v(e)]}},deleteAllListeners:function(e){var t=v(e);for(var n in f)if(f.hasOwnProperty(n)&&f[n][t]){var r=a.registrationNameModules[n];r&&r.willDeleteListener&&r.willDeleteListener(e,n),delete f[n][t]}},extractEvents:function(e,t,n,r){for(var o,i=a.plugins,s=0;s<i.length;s++){var l=i[s];if(l){var c=l.extractEvents(e,t,n,r);c&&(o=u(o,c))}}return o},enqueueEvents:function(e){e&&(p=u(p,e))},processEventQueue:function(e){var t=p;p=null,e?l(t,h):l(t,m),p&&c(!1,"processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."),s.rethrowCaughtError()},__purge:function(){f={}},__getListenerBank:function(){return f}};e.exports=g},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a=n(54),i={view:function(e){if(e.view)return e.view;var t=a(e);if(t.window===t)return t;var n=t.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0}};o.augmentClass(r,i),e.exports=r},function(e,t,n){"use strict";var r={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t}};e.exports=r},function(e,t,n){"use strict";var r=function(e,t,n,r,o,a,i,s){if(void 0===t)throw new Error("invariant requires an error message argument");if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,o,a,i,s],c=0;u=new Error(t.replace(/%s/g,function(){return l[c++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}};e.exports=r},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";t.__esModule=!0;var r=(t.addLeadingSlash=function(e){return"/"===e.charAt(0)?e:"/"+e},t.stripLeadingSlash=function(e){return"/"===e.charAt(0)?e.substr(1):e},t.hasBasename=function(e,t){return new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(e)});t.stripBasename=function(e,t){return r(e,t)?e.substr(t.length):e},t.stripTrailingSlash=function(e){return"/"===e.charAt(e.length-1)?e.slice(0,-1):e},t.parsePath=function(e){var t=e||"/",n="",r="",o=t.indexOf("#");-1!==o&&(r=t.substr(o),t=t.substr(0,o));var a=t.indexOf("?");return-1!==a&&(n=t.substr(a),t=t.substr(0,a)),{pathname:t,search:"?"===n?"":n,hash:"#"===r?"":r}},t.createPath=function(e){var t=e.pathname,n=e.search,r=e.hash,o=t||"/";return n&&"?"!==n&&(o+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(o+="#"===r.charAt(0)?r:"#"+r),o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.logout=t.login=t.signupnormal=t.signup=t.clearErrors=t.receiveErrors=t.receiveCurrentUser=t.CLEAR_ERRORS=t.RECEIVE_ERRORS=t.RECEIVE_CURRENT_USER=void 0;var r=n(286),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=t.RECEIVE_CURRENT_USER="RECEIVE_CURRENT_USER",i=t.RECEIVE_ERRORS="RECEIVE_ERRORS",s=t.CLEAR_ERRORS="CLEAR_ERRORS",u=t.receiveCurrentUser=function(e){return{type:a,currentUser:e}},l=t.receiveErrors=function(e){return{type:i,errors:e}};t.clearErrors=function(e){return{type:s}},t.signup=function(e){return function(t){return o.signup(e).then(function(e){return t(u(e))},function(e){return t(l(e.responseJSON))})}},t.signupnormal=function(e){return function(t){return o.signupnormal(e).then(function(e){return t(u(e))},function(e){return t(l(e.responseJSON))})}},t.login=function(e){return function(t){return o.login(e).then(function(e){return t(u(e))},function(e){return t(l(e.responseJSON))})}},t.logout=function(){return function(e){return o.logout().then(function(t){return e(u(null))})}}},function(e,t,n){"use strict";var r=!1;try{Object.defineProperty({},"x",{get:function(){}}),r=!0}catch(e){}e.exports=r},function(e,t,n){"use strict";var r={};Object.freeze(r),e.exports=r},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(c===setTimeout)return setTimeout(e,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function a(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function i(){m&&d&&(m=!1,d.length?h=d.concat(h):v=-1,h.length&&s())}function s(){if(!m){var e=o(i);m=!0;for(var t=h.length;t;){for(d=h,h=[];++v<t;)d&&d[v].run();v=-1,t=h.length}d=null,m=!1,a(e)}}function u(e,t){this.fun=e,this.array=t}function l(){}var c,f,p=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(e){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var d,h=[],m=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new u(e,t)),1!==h.length||m||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.prependListener=l,p.prependOnceListener=l,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(e,t,n){"use strict";function r(){if(s)for(var e in u){var t=u[e],n=s.indexOf(e);if(n>-1||i(!1,"EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.",e),!l.plugins[n]){t.extractEvents||i(!1,"EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.",e),l.plugins[n]=t;var r=t.eventTypes;for(var a in r)o(r[a],t,a)||i(!1,"EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.",a,e)}}}function o(e,t,n){l.eventNameDispatchConfigs.hasOwnProperty(n)&&i(!1,"EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.",n),l.eventNameDispatchConfigs[n]=e;var r=e.phasedRegistrationNames;if(r){for(var o in r)if(r.hasOwnProperty(o)){var s=r[o];a(s,t,n)}return!0}return!!e.registrationName&&(a(e.registrationName,t,n),!0)}function a(e,t,n){l.registrationNameModules[e]&&i(!1,"EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.",e),l.registrationNameModules[e]=t,l.registrationNameDependencies[e]=t.eventTypes[n].dependencies;var r=e.toLowerCase();l.possibleRegistrationNames[r]=e,"onDoubleClick"===e&&(l.possibleRegistrationNames.ondblclick=e)}var i=(n(3),n(1)),s=null,u={},l={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:{},injectEventPluginOrder:function(e){s&&i(!1,"EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."),s=Array.prototype.slice.call(e),r()},injectEventPluginsByName:function(e){var t=!1;for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];u.hasOwnProperty(n)&&u[n]===o||(u[n]&&i(!1,"EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.",n),u[n]=o,t=!0)}t&&r()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return l.registrationNameModules[t.registrationName]||null;if(void 0!==t.phasedRegistrationNames){var n=t.phasedRegistrationNames;for(var r in n)if(n.hasOwnProperty(r)){var o=l.registrationNameModules[n[r]];if(o)return o}}return null},_resetEventPlugins:function(){s=null;for(var e in u)u.hasOwnProperty(e)&&delete u[e];l.plugins.length=0;var t=l.eventNameDispatchConfigs;for(var n in t)t.hasOwnProperty(n)&&delete t[n];var r=l.registrationNameModules;for(var o in r)r.hasOwnProperty(o)&&delete r[o];var a=l.possibleRegistrationNames;for(var i in a)a.hasOwnProperty(i)&&delete a[i]}};e.exports=l},function(e,t,n){"use strict";var r=(n(3),n(1)),o={},a={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(e,t,n,o,a,i,s,u){this.isInTransaction()&&r(!1,"Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.");var l,c;try{this._isInTransaction=!0,l=!0,this.initializeAll(0),c=e.call(t,n,o,a,i,s,u),l=!1}finally{try{if(l)try{this.closeAll(0)}catch(e){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return c},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){var r=t[n];try{this.wrapperInitData[n]=o,this.wrapperInitData[n]=r.initialize?r.initialize.call(this):null}finally{if(this.wrapperInitData[n]===o)try{this.initializeAll(n+1)}catch(e){}}}},closeAll:function(e){this.isInTransaction()||r(!1,"Transaction.closeAll(): Cannot close transaction when none are open.");for(var t=this.transactionWrappers,n=e;n<t.length;n++){var a,i=t[n],s=this.wrapperInitData[n];try{a=!0,s!==o&&i.close&&i.close.call(this,s),a=!1}finally{if(a)try{this.closeAll(n+1)}catch(e){}}}this.wrapperInitData.length=0}};e.exports=a},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(35),a=n(95),i=n(56),s={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:i,button:function(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+a.currentScrollLeft},pageY:function(e){return"pageY"in e?e.pageY:e.clientY+a.currentScrollTop}};o.augmentClass(r,s),e.exports=r},function(e,t,n){"use strict";var r,o=n(8),a=n(58),i=/^[ \r\n\t\f]/,s=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,u=n(59),l=u(function(e,t){if(e.namespaceURI!==a.svg||"innerHTML"in e)e.innerHTML=t;else{r=r||document.createElement("div"),r.innerHTML="<svg>"+t+"</svg>";for(var n=r.firstChild;n.firstChild;)e.appendChild(n.firstChild)}});if(o.canUseDOM){var c=document.createElement("div");c.innerHTML=" ",""===c.innerHTML&&(l=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),i.test(t)||"<"===t[0]&&s.test(t)){e.innerHTML=String.fromCharCode(65279)+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1)}else e.innerHTML=t}),c=null}e.exports=l},function(e,t,n){"use strict";function r(e){var t=""+e,n=a.exec(t);if(!n)return t;var r,o="",i=0,s=0;for(i=n.index;i<t.length;i++){switch(t.charCodeAt(i)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#x27;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}s!==i&&(o+=t.substring(s,i)),s=i+1,o+=r}return s!==i?o+t.substring(s,i):o}function o(e){return"boolean"==typeof e||"number"==typeof e?""+e:r(e)}var a=/["'&<>]/;e.exports=o},function(e,t,n){"use strict";function r(e){return Object.prototype.hasOwnProperty.call(e,m)||(e[m]=d++,f[e[m]]={}),f[e[m]]}var o,a=n(6),i=n(44),s=n(183),u=n(95),l=n(184),c=n(55),f={},p=!1,d=0,h={topAbort:"abort",topAnimationEnd:l("animationend")||"animationend",topAnimationIteration:l("animationiteration")||"animationiteration",topAnimationStart:l("animationstart")||"animationstart",topBlur:"blur",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:l("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},m="_reactListenersID"+String(Math.random()).slice(2),v=a({},s,{ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(v.handleTopLevel),v.ReactEventListener=e}},setEnabled:function(e){v.ReactEventListener&&v.ReactEventListener.setEnabled(e)},isEnabled:function(){return!(!v.ReactEventListener||!v.ReactEventListener.isEnabled())},listenTo:function(e,t){for(var n=t,o=r(n),a=i.registrationNameDependencies[e],s=0;s<a.length;s++){var u=a[s];o.hasOwnProperty(u)&&o[u]||("topWheel"===u?c("wheel")?v.ReactEventListener.trapBubbledEvent("topWheel","wheel",n):c("mousewheel")?v.ReactEventListener.trapBubbledEvent("topWheel","mousewheel",n):v.ReactEventListener.trapBubbledEvent("topWheel","DOMMouseScroll",n):"topScroll"===u?c("scroll",!0)?v.ReactEventListener.trapCapturedEvent("topScroll","scroll",n):v.ReactEventListener.trapBubbledEvent("topScroll","scroll",v.ReactEventListener.WINDOW_HANDLE):"topFocus"===u||"topBlur"===u?(c("focus",!0)?(v.ReactEventListener.trapCapturedEvent("topFocus","focus",n),v.ReactEventListener.trapCapturedEvent("topBlur","blur",n)):c("focusin")&&(v.ReactEventListener.trapBubbledEvent("topFocus","focusin",n),v.ReactEventListener.trapBubbledEvent("topBlur","focusout",n)),o.topBlur=!0,o.topFocus=!0):h.hasOwnProperty(u)&&v.ReactEventListener.trapBubbledEvent(u,h[u],n),o[u]=!0)}},trapBubbledEvent:function(e,t,n){return v.ReactEventListener.trapBubbledEvent(e,t,n)},trapCapturedEvent:function(e,t,n){return v.ReactEventListener.trapCapturedEvent(e,t,n)},supportsEventPageXY:function(){if(!document.createEvent)return!1;var e=document.createEvent("MouseEvent");return null!=e&&"pageX"in e},ensureScrollValueMonitoring:function(){if(void 0===o&&(o=v.supportsEventPageXY()),!o&&!p){var e=u.refreshScrollValues;v.ReactEventListener.monitorScrollValue(e),p=!0}}});e.exports=v},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deletePlaylist=t.fetchPlaylistsByUserID=t.updatePlaylist=t.createPlaylist=t.fetchPlaylistByTitle=t.removeSongFromPlaylist=t.addSongToPlaylist=t.fetchOnePlaylist=t.searchPlaylists=t.fetchChartPlaylists=t.fetchPlaylists=t.removePlaylists=t.removePlaylist=t.receivePlaylists=t.receivePlaylist=t.REMOVE_PLAYLISTS=t.REMOVE_PLAYLIST=t.RECEIVE_PLAYLIST=t.RECEIVE_PLAYLISTS=void 0;var r=n(291),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_PLAYLISTS="RECEIVE_PLAYLISTS"),s=t.RECEIVE_PLAYLIST="RECEIVE_PLAYLIST",u=t.REMOVE_PLAYLIST="REMOVE_PLAYLIST",l=t.REMOVE_PLAYLISTS="REMOVE_PLAYLISTS",c=t.receivePlaylist=function(e){return{type:s,playlist:e}},f=t.receivePlaylists=function(e){return{type:i,playlists:e}},p=t.removePlaylist=function(e){return{type:u,playlist:e}};t.removePlaylists=function(){return{type:l}},t.fetchPlaylists=function(){return function(e){return o.fetchPlaylists().then(function(t){return e(f(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.fetchChartPlaylists=function(e,t){return function(n){return o.fetchChartPlaylists(e,t).then(function(e){return n(f(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.searchPlaylists=function(e){return function(t){return o.searchPlaylists(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchOnePlaylist=function(e){return function(t){return o.fetchOnePlaylist(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.addSongToPlaylist=function(e,t){return function(n){return o.addSongToPlaylist(e,t).then(function(e){return n(c(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.removeSongFromPlaylist=function(e,t){return function(n){return o.removeSongFromPlaylist(e,t).then(function(e){return n(c(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.fetchPlaylistByTitle=function(e){return function(t){return o.fetchPlaylistByTitle(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.createPlaylist=function(e){return function(t){return o.createPlaylist(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.updatePlaylist=function(e,t){return function(n){return o.updatePlaylist(e,t).then(function(e){return n(c(e))},function(e){return n(receiveErrors(e.responseJSON))})}},t.fetchPlaylistsByUserID=function(e){return function(t){return o.fetchPlaylistByUserID(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.deletePlaylist=function(e){return function(t){return o.deletePlaylist(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}}},function(e,t,n){"use strict";var r=function(){},o=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0,a="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.warn(a);try{throw new Error(a)}catch(e){}};r=function(e,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(!e){for(var n=arguments.length,r=Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];o.apply(void 0,[t].concat(r))}},e.exports=r},function(e,t,n){"use strict";function r(e){return"topMouseUp"===e||"topTouchEnd"===e||"topTouchCancel"===e}function o(e){return"topMouseMove"===e||"topTouchMove"===e}function a(e){return"topMouseDown"===e||"topTouchStart"===e}function i(e,t,n,r){var o=e.type||"unknown-event";e.currentTarget=b.getNodeFromInstance(r),t?m.invokeGuardedCallbackWithCatch(o,n,e):m.invokeGuardedCallback(o,n,e),e.currentTarget=null}function s(e,t){var n=e._dispatchListeners,r=e._dispatchInstances;if(h(e),Array.isArray(n))for(var o=0;o<n.length&&!e.isPropagationStopped();o++)i(e,t,n[o],r[o]);else n&&i(e,t,n,r);e._dispatchListeners=null,e._dispatchInstances=null}function u(e){var t=e._dispatchListeners,n=e._dispatchInstances;if(h(e),Array.isArray(t)){for(var r=0;r<t.length&&!e.isPropagationStopped();r++)if(t[r](e,n[r]))return n[r]}else if(t&&t(e,n))return n;return null}function l(e){var t=u(e);return e._dispatchInstances=null,e._dispatchListeners=null,t}function c(e){h(e);var t=e._dispatchListeners,n=e._dispatchInstances;Array.isArray(t)&&v(!1,"executeDirectDispatch(...): Invalid `event`."),e.currentTarget=t?b.getNodeFromInstance(n):null;var r=t?t(e):null;return e.currentTarget=null,e._dispatchListeners=null,e._dispatchInstances=null,r}function f(e){return!!e._dispatchListeners}var p,d,h,m=(n(3),n(53)),v=n(1),g=n(2),y={injectComponentTree:function(e){p=e,g(e&&e.getNodeFromInstance&&e.getInstanceFromNode,"EventPluginUtils.injection.injectComponentTree(...): Injected module is missing getNodeFromInstance or getInstanceFromNode.")},injectTreeTraversal:function(e){d=e,g(e&&e.isAncestor&&e.getLowestCommonAncestor,"EventPluginUtils.injection.injectTreeTraversal(...): Injected module is missing isAncestor or getLowestCommonAncestor.")}};h=function(e){var t=e._dispatchListeners,n=e._dispatchInstances,r=Array.isArray(t),o=r?t.length:t?1:0,a=Array.isArray(n),i=a?n.length:n?1:0;g(a===r&&i===o,"EventPluginUtils: Invalid `event`.")};var b={isEndish:r,isMoveish:o,isStartish:a,executeDirectDispatch:c,executeDispatchesInOrder:s,executeDispatchesInOrderStopAtTrue:l,hasDispatches:f,getInstanceFromNode:function(e){return p.getInstanceFromNode(e)},getNodeFromInstance:function(e){return p.getNodeFromInstance(e)},isAncestor:function(e,t){return d.isAncestor(e,t)},getLowestCommonAncestor:function(e,t){return d.getLowestCommonAncestor(e,t)},getParentInstance:function(e){return d.getParentInstance(e)},traverseTwoPhase:function(e,t,n){return d.traverseTwoPhase(e,t,n)},traverseEnterLeave:function(e,t,n,r,o){return d.traverseEnterLeave(e,t,n,r,o)},injection:y};e.exports=b},function(e,t,n){"use strict";function r(e,t,n){try{t(n)}catch(e){null===o&&(o=e)}}var o=null,a={invokeGuardedCallback:r,invokeGuardedCallbackWithCatch:r,rethrowCaughtError:function(){if(o){var e=o;throw o=null,e}}};if("undefined"!=typeof window&&"function"==typeof window.dispatchEvent&&"undefined"!=typeof document&&"function"==typeof document.createEvent){var i=document.createElement("react");a.invokeGuardedCallback=function(e,t,n){var r=t.bind(null,n),o="react-"+e;i.addEventListener(o,r,!1);var a=document.createEvent("Event");a.initEvent(o,!1,!1),i.dispatchEvent(a),i.removeEventListener(o,r,!1)}}e.exports=a},function(e,t,n){"use strict";function r(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),3===t.nodeType?t.parentNode:t}e.exports=r},function(e,t,n){"use strict";/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function r(e,t){if(!a.canUseDOM||t&&!("addEventListener"in document))return!1;var n="on"+e,r=n in document;if(!r){var i=document.createElement("div");i.setAttribute(n,"return;"),r="function"==typeof i[n]}return!r&&o&&"wheel"===e&&(r=document.implementation.hasFeature("Events.wheel","3.0")),r}var o,a=n(8);a.canUseDOM&&(o=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")),e.exports=r},function(e,t,n){"use strict";function r(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=a[e];return!!r&&!!n[r]}function o(e){return r}var a={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};e.exports=o},function(e,t,n){"use strict";function r(e,t){return Array.isArray(t)&&(t=t[1]),t?t.nextSibling:e.firstChild}function o(e,t,n){c.insertTreeBefore(e,t,n)}function a(e,t,n){Array.isArray(t)?s(e,t[0],t[1],n):g(e,t,n)}function i(e,t){if(Array.isArray(t)){var n=t[1];t=t[0],u(e,t,n),e.removeChild(n)}e.removeChild(t)}function s(e,t,n,r){for(var o=t;;){var a=o.nextSibling;if(g(e,o,r),o===n)break;o=a}}function u(e,t,n){for(;;){var r=t.nextSibling;if(r===n)break;e.removeChild(r)}}function l(e,t,n){var r=e.parentNode,o=e.nextSibling;o===t?n&&g(r,document.createTextNode(n),o):n?(v(o,n),u(r,o,t)):u(r,e,t),d.debugTool.onHostOperation({instanceID:p.getInstanceFromNode(e)._debugID,type:"replace text",payload:n})}var c=n(29),f=n(168),p=n(7),d=n(14),h=n(59),m=n(47),v=n(96),g=h(function(e,t,n){e.insertBefore(t,n)}),y=f.dangerouslyReplaceNodeWithMarkup;y=function(e,t,n){if(f.dangerouslyReplaceNodeWithMarkup(e,t),0!==n._debugID)d.debugTool.onHostOperation({instanceID:n._debugID,type:"replace with",payload:t.toString()});else{var r=p.getInstanceFromNode(t.node);0!==r._debugID&&d.debugTool.onHostOperation({instanceID:r._debugID,type:"mount",payload:t.toString()})}};var b={dangerouslyReplaceNodeWithMarkup:y,replaceDelimitedText:l,processUpdates:function(e,t){for(var n=p.getInstanceFromNode(e)._debugID,s=0;s<t.length;s++){var u=t[s];switch(u.type){case"INSERT_MARKUP":o(e,u.content,r(e,u.afterNode)),d.debugTool.onHostOperation({instanceID:n,type:"insert child",payload:{toIndex:u.toIndex,content:u.content.toString()}});break;case"MOVE_EXISTING":a(e,u.fromNode,r(e,u.afterNode)),d.debugTool.onHostOperation({instanceID:n,type:"move child",payload:{fromIndex:u.fromIndex,toIndex:u.toIndex}});break;case"SET_MARKUP":m(e,u.content),d.debugTool.onHostOperation({instanceID:n,type:"replace children",payload:u.content.toString()});break;case"TEXT_CONTENT":v(e,u.content),d.debugTool.onHostOperation({instanceID:n,type:"replace text",payload:u.content.toString()});break;case"REMOVE_NODE":i(e,u.fromNode),d.debugTool.onHostOperation({instanceID:n,type:"remove child",payload:{fromIndex:u.fromIndex}})}}}};e.exports=b},function(e,t,n){"use strict";var r={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};e.exports=r},function(e,t,n){"use strict";var r=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e};e.exports=r},function(e,t,n){"use strict";function r(e){null!=e.checkedLink&&null!=e.valueLink&&f(!1,"Cannot provide a checkedLink and a valueLink. If you want to use checkedLink, you probably don't want to use valueLink and vice versa.")}function o(e){r(e),(null!=e.value||null!=e.onChange)&&f(!1,"Cannot provide a valueLink and a value or onChange event. If you want to use value or onChange, you probably don't want to use valueLink.")}function a(e){r(e),(null!=e.checked||null!=e.onChange)&&f(!1,"Cannot provide a checkedLink and a checked property or onChange event. If you want to use checked or onChange, you probably don't want to use checkedLink")}function i(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}var s=(n(3),n(100)),u=n(84),l=n(26),c=u(l.isValidElement),f=n(1),p=n(2),d={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0},h={value:function(e,t,n){return!e[t]||d[e.type]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:c.func},m={},v={checkPropTypes:function(e,t,n){for(var r in h){if(h.hasOwnProperty(r))var o=h[r](t,r,e,"prop",null,s);if(o instanceof Error&&!(o.message in m)){m[o.message]=!0;var a=i(n);p(!1,"Failed form propType: %s%s",o.message,a)}}},getValue:function(e){return e.valueLink?(o(e),e.valueLink.value):e.value},getChecked:function(e){return e.checkedLink?(a(e),e.checkedLink.value):e.checked},executeOnChange:function(e,t){return e.valueLink?(o(e),e.valueLink.requestChange(t.target.value)):e.checkedLink?(a(e),e.checkedLink.requestChange(t.target.checked)):e.onChange?e.onChange.call(void 0,t):void 0}};e.exports=v},function(e,t,n){"use strict";var r=(n(3),n(1)),o=!1,a={replaceNodeWithMarkup:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){o&&r(!1,"ReactCompositeComponent: injectEnvironment() can only be called once."),a.replaceNodeWithMarkup=e.replaceNodeWithMarkup,a.processChildrenUpdates=e.processChildrenUpdates,o=!0}}};e.exports=a},function(e,t,n){"use strict";function r(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!==e&&t!==t}function o(e,t){if(r(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(var i=0;i<n.length;i++)if(!a.call(t,n[i])||!r(e[n[i]],t[n[i]]))return!1;return!0}var a=Object.prototype.hasOwnProperty;e.exports=o},function(e,t,n){"use strict";function r(e,t){var n=null===e||!1===e,r=null===t||!1===t;if(n||r)return n===r;var o=typeof e,a=typeof t;return"string"===o||"number"===o?"string"===a||"number"===a:"object"===a&&e.type===t.type&&e.key===t.key}e.exports=r},function(e,t,n){"use strict";function r(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function o(e){var t=/(=0|=2)/g,n={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(t,function(e){return n[e]})}var a={escape:r,unescape:o};e.exports=a},function(e,t,n){"use strict";function r(e){l.enqueueUpdate(e)}function o(e){var t=typeof e;if("object"!==t)return t;var n=e.constructor&&e.constructor.name||t,r=Object.keys(e);return r.length>0&&r.length<20?n+" (keys: "+r.join(", ")+")":n}function a(e,t){var n=s.get(e);if(!n){var r=e.constructor;return f(!t,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op. Please check the code for the %s component.",t,t,r&&(r.displayName||r.name)||"ReactClass"),null}return f(null==i.current,"%s(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.",t),n}var i=(n(3),n(17)),s=n(36),u=n(14),l=n(18),c=n(1),f=n(2),p={isMounted:function(e){var t=i.current;null!==t&&(f(t._warnedAboutRefsInRender,"%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",t.getName()||"A component"),t._warnedAboutRefsInRender=!0);var n=s.get(e);return!!n&&!!n._renderedComponent},enqueueCallback:function(e,t,n){p.validateCallback(t,n);var o=a(e);if(!o)return null;o._pendingCallbacks?o._pendingCallbacks.push(t):o._pendingCallbacks=[t],r(o)},enqueueCallbackInternal:function(e,t){e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],r(e)},enqueueForceUpdate:function(e){var t=a(e,"forceUpdate");t&&(t._pendingForceUpdate=!0,r(t))},enqueueReplaceState:function(e,t,n){var o=a(e,"replaceState");o&&(o._pendingStateQueue=[t],o._pendingReplaceState=!0,void 0!==n&&null!==n&&(p.validateCallback(n,"replaceState"),o._pendingCallbacks?o._pendingCallbacks.push(n):o._pendingCallbacks=[n]),r(o))},enqueueSetState:function(e,t){u.debugTool.onSetState(),f(null!=t,"setState(...): You passed an undefined or null state object; instead, use forceUpdate().");var n=a(e,"setState");if(n){(n._pendingStateQueue||(n._pendingStateQueue=[])).push(t),r(n)}},enqueueElementInternal:function(e,t,n){e._pendingElement=t,e._context=n,r(e)},validateCallback:function(e,t){e&&"function"!=typeof e&&c(!1,"%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,o(e))}};e.exports=p},function(e,t,n){"use strict";var r=n(6),o=n(13),a=n(2),i=o,s=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],u=["applet","caption","html","table","td","th","marquee","object","template","foreignObject","desc","title"],l=u.concat(["button"]),c=["dd","dt","li","option","optgroup","p","rp","rt"],f={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null},p=function(e,t,n){var o=r({},e||f),a={tag:t,instance:n};return-1!==u.indexOf(t)&&(o.aTagInScope=null,o.buttonTagInScope=null,o.nobrTagInScope=null),-1!==l.indexOf(t)&&(o.pTagInButtonScope=null),-1!==s.indexOf(t)&&"address"!==t&&"div"!==t&&"p"!==t&&(o.listItemTagAutoclosing=null,o.dlItemTagAutoclosing=null),o.current=a,"form"===t&&(o.formTag=a),"a"===t&&(o.aTagInScope=a),"button"===t&&(o.buttonTagInScope=a),"nobr"===t&&(o.nobrTagInScope=a),"p"===t&&(o.pTagInButtonScope=a),"li"===t&&(o.listItemTagAutoclosing=a),"dd"!==t&&"dt"!==t||(o.dlItemTagAutoclosing=a),o},d=function(e,t){switch(t){case"select":return"option"===e||"optgroup"===e||"#text"===e;case"optgroup":return"option"===e||"#text"===e;case"option":return"#text"===e;case"tr":return"th"===e||"td"===e||"style"===e||"script"===e||"template"===e;case"tbody":case"thead":case"tfoot":return"tr"===e||"style"===e||"script"===e||"template"===e;case"colgroup":return"col"===e||"template"===e;case"table":return"caption"===e||"colgroup"===e||"tbody"===e||"tfoot"===e||"thead"===e||"style"===e||"script"===e||"template"===e;case"head":return"base"===e||"basefont"===e||"bgsound"===e||"link"===e||"meta"===e||"title"===e||"noscript"===e||"noframes"===e||"style"===e||"script"===e||"template"===e;case"html":return"head"===e||"body"===e;case"#document":return"html"===e}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return"h1"!==t&&"h2"!==t&&"h3"!==t&&"h4"!==t&&"h5"!==t&&"h6"!==t;case"rp":case"rt":return-1===c.indexOf(t);case"body":case"caption":case"col":case"colgroup":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return null==t}return!0},h=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},m=function(e){if(!e)return[];var t=[];do{t.push(e)}while(e=e._currentElement._owner);return t.reverse(),t},v={};i=function(e,t,n,r){r=r||f;var o=r.current,i=o&&o.tag;null!=t&&(a(null==e,"validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var s=d(e,i)?null:o,u=s?null:h(e,r),l=s||u;if(l){var c,p=l.tag,g=l.instance,y=n&&n._currentElement._owner,b=g&&g._currentElement._owner,E=m(y),w=m(b),_=Math.min(E.length,w.length),k=-1;for(c=0;c<_&&E[c]===w[c];c++)k=c;var C=E.slice(k+1).map(function(e){return e.getName()||"(unknown)"}),S=w.slice(k+1).map(function(e){return e.getName()||"(unknown)"}),x=[].concat(-1!==k?E[k].getName()||"(unknown)":[],S,p,u?["..."]:[],C,e).join(" > "),P=!!s+"|"+e+"|"+p+"|"+x;if(v[P])return;v[P]=!0;var T=e,O="";if("#text"===e?/\S/.test(t)?T="Text nodes":(T="Whitespace text nodes",O=" Make sure you don't have any extra whitespace between tags on each line of your source code."):T="<"+e+">",s){var N="";"table"===p&&"tr"===e&&(N+=" Add a <tbody> to your code to match the DOM tree generated by the browser."),a(!1,"validateDOMNesting(...): %s cannot appear as a child of <%s>.%s See %s.%s",T,p,O,x,N)}else a(!1,"validateDOMNesting(...): %s cannot appear as a descendant of <%s>. See %s.",T,p,x)}},i.updatedAncestorInfo=p,i.isTagValidInContext=function(e,t){t=t||f;var n=t.current,r=n&&n.tag;return d(e,r)&&!h(e,t)},e.exports=i},function(e,t,n){"use strict";function r(e){var t,n=e.keyCode;return"charCode"in e?0===(t=e.charCode)&&13===n&&(t=13):t=n,t>=32||13===t?t:0}e.exports=r},function(e,t,n){"use strict";function r(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}t.a=r},function(e,t,n){"use strict";function r(){}Object.defineProperty(t,"__esModule",{value:!0});var o=n(115),a=n(251),i=n(252),s=n(253),u=n(118),l=n(71);n.d(t,"createStore",function(){return o.b}),n.d(t,"combineReducers",function(){return a.a}),n.d(t,"bindActionCreators",function(){return i.a}),n.d(t,"applyMiddleware",function(){return s.a}),n.d(t,"compose",function(){return u.a}),"string"==typeof r.name&&"isCrushed"!==r.name&&l.a("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.")},function(e,t,n){"use strict";function r(e){if(!i.a(e)||o.a(e)!=s)return!1;var t=a.a(e);if(null===t)return!0;var n=f.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&c.call(n)==p}var o=n(240),a=n(245),i=n(247),s="[object Object]",u=Function.prototype,l=Object.prototype,c=u.toString,f=l.hasOwnProperty,p=c.call(Object);t.a=r},function(e,t,n){"use strict";function r(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}t.a=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.locationsAreEqual=t.createLocation=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(260),i=r(a),s=n(261),u=r(s),l=n(39);t.createLocation=function(e,t,n,r){var a=void 0;"string"==typeof e?(a=(0,l.parsePath)(e),a.state=t):(a=o({},e),void 0===a.pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(e){throw e instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):e}return n&&(a.key=n),r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=(0,i.default)(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a},t.locationsAreEqual=function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&(0,u.default)(e.state,t.state)}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(25),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=function(){var e=null,t=function(t){return(0,o.default)(null==e,"A history supports only one prompt at a time"),e=t,function(){e===t&&(e=null)}},n=function(t,n,r,a){if(null!=e){var i="function"==typeof e?e(t,n):e;"string"==typeof i?"function"==typeof r?r(i,a):((0,o.default)(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),a(!0)):a(!1!==i)}else a(!0)},r=[];return{setPrompt:t,confirmTransitionTo:n,appendListener:function(e){var t=!0,n=function(){t&&e.apply(void 0,arguments)};return r.push(n),function(){t=!1,r=r.filter(function(e){return e!==n})}},notifyListeners:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];r.forEach(function(e){return e.apply(void 0,t)})}}};t.default=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(25),s=n.n(i),u=n(37),l=n.n(u),c=n(0),f=n.n(c),p=n(10),d=n.n(p),h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},m=function(e){function t(){var n,a,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=a=o(this,e.call.apply(e,[this].concat(u))),a.state={match:a.computeMatch(a.props.history.location.pathname)},i=n,o(a,i)}return a(t,e),t.prototype.getChildContext=function(){return{router:h({},this.context.router,{history:this.props.history,route:{location:this.props.history.location,match:this.state.match}})}},t.prototype.computeMatch=function(e){return{path:"/",url:"/",params:{},isExact:"/"===e}},t.prototype.componentWillMount=function(){var e=this,t=this.props,n=t.children,r=t.history;l.a(null==n||1===f.a.Children.count(n),"A <Router> may have only one child element"),this.unlisten=r.listen(function(){e.setState({match:e.computeMatch(r.location.pathname)})})},t.prototype.componentWillReceiveProps=function(e){s.a(this.props.history===e.history,"You cannot change <Router history>")},t.prototype.componentWillUnmount=function(){this.unlisten()},t.prototype.render=function(){var e=this.props.children;return e?f.a.Children.only(e):null},t}(f.a.Component);m.propTypes={history:d.a.object.isRequired,children:d.a.node},m.contextTypes={router:d.a.object},m.childContextTypes={router:d.a.object.isRequired},t.a=m},function(e,t,n){"use strict";var r=n(266),o=n.n(r),a={},i=0,s=function(e,t){var n=""+t.end+t.strict,r=a[n]||(a[n]={});if(r[e])return r[e];var s=[],u=o.a(e,s,t),l={re:u,keys:s};return i<1e4&&(r[e]=l,i++),l},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"string"==typeof t&&(t={path:t});var n=t,r=n.path,o=void 0===r?"/":r,a=n.exact,i=void 0!==a&&a,u=n.strict,l=void 0!==u&&u,c=s(o,{end:i,strict:l}),f=c.re,p=c.keys,d=f.exec(e);if(!d)return null;var h=d[0],m=d.slice(1),v=e===h;return i&&!v?null:{path:o,url:"/"===o&&""===h?"/":h,isExact:v,params:p.reduce(function(e,t,n){return e[t.name]=m[n],e},{})}};t.a=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(4),p=n(16),d=n(9),h=n(30),m=r(h),v=n(31),g=r(v),y=n(130),b=r(y),E=n(290),w=r(E),_=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=n.handleClick.bind(n),n.handleWaveformClick=n.handleWaveformClick.bind(n),n.goToSong=n.goToSong.bind(n),n.goToUser=n.goToUser.bind(n),n.wavesurfer=null,n.likeSong=n.likeSong.bind(n),n.unlikeSong=n.unlikeSong.bind(n),n.state={playing:!1,pos:0,volume:0},n.handlePosChange=n.handlePosChange.bind(n),n}return i(t,e),s(t,[{key:"handleWaveformClick",value:function(e){var t=(e.clientX-e.currentTarget.getBoundingClientRect().left)/e.currentTarget.clientWidth;this.props.changePlaybackTime(t)}},{key:"handlePosChange",value:function(e){this.setState({pos:e.originalArgs[0],volume:0})}},{key:"handleClick",value:function(){if(this.props.user){var e="/"+username+"/"+this.props.song.title;this.props.history.push(e)}}},{key:"goToSong",value:function(){this.props.history.push("/"+this.props.user.username+"/"+this.props.song.title)}},{key:"goToUser",value:function(){this.props.history.push("/"+this.props.user.username)}},{key:"likeSong",value:function(e){e.preventDefault(),this.props.createLike({like:{song_id:this.props.song.id}})}},{key:"unlikeSong",value:function(e){e.preventDefault(),this.props.deleteLike({like:{song_id:this.props.song.id}})}},{key:"componentWillReceiveProps",value:function(e){"PLAYING"===e.audio.token&&e.audio.id===this.props.song.id?this.setState({playing:!0,volume:0,pos:e.audio.time}):"PAUSED"===e.audio.token&&e.audio.id===this.props.song.id?this.setState({playing:!1,volume:0,pos:e.audio.time}):e.audio.id!==this.props.song.id&&this.setState({playing:!1,volume:0,pos:0})}},{key:"componentWillUnmount",value:function(){this.props.song.id===this.props.audio.id&&this.props.requestAudioPlaybackTime()}},{key:"componentDidMount",value:function(){this.username=null;this.props.user&&(this.username=this.props.user.username),this.props.audio.id===this.props.song.id&&this.props.requestAudioPlaybackTime()}},{key:"render",value:function(){var e,t=this,n=new Date(""+this.props.song.created_at),r=new Date,o=Math.abs(r.getTime()-n.getTime()),a=Math.abs(o/864e5);if(a<1)var e="today";else if(a<2)var e="yesterday";else{a=Math.floor(a);var e=a+" days ago"}var i="#"+this.props.song.genre,s=void 0;s=this.props.audio.id===this.props.song.id?l.default.createElement(g.default,{song:this.props.song,playstate:this.props.audio.token}):l.default.createElement(m.default,{song:this.props.song});var u=void 0,f=this.props.likes.map(function(e){return e.user_id}),p=this.props.likes.length;return u=f.includes(this.props.currentUser.id)?l.default.createElement("button",{onClick:this.unlikeSong,className:"songpage-likebutton-liked"},p):l.default.createElement("button",{onClick:this.likeSong,className:"songpage-likebutton-notliked"},p),null!==this.props.user&&void 0!==this.props.user?l.default.createElement("div",{className:"songplaybox"},l.default.createElement("div",{className:"songplay-header"},"  ",l.default.createElement("img",{src:""+this.props.user.avatar_url,className:"songplay-avatar",onClick:this.goToSong})," ",l.default.createElement(c.Link,{to:"/"+this.props.user.username},"  ",this.props.user.username," posted a track ",e," ")," "),l.default.createElement("div",{className:"songplay-item"},l.default.createElement("div",{className:"songplay-coverart"},l.default.createElement("img",{onClick:this.goToSong,src:this.props.song.cover_art_url})),s,l.default.createElement("div",{className:"songplay-song"},l.default.createElement("div",{className:"songplay-song-information"},l.default.createElement("div",{className:"songplay-left"},l.default.createElement("div",{className:"infospan"},l.default.createElement("div",{className:"songplay-artist-chart"}," ",l.default.createElement("span",{className:"songplay-span-artist",onClick:this.goToUser},this.props.user.username)),l.default.createElement("div",{className:"songplay-title-chart"}," ",l.default.createElement("span",{className:"songplay-span-title",onClick:this.goToSong},this.props.song.title)))),l.default.createElement("div",{className:"songplay-right"},l.default.createElement("div",{className:"songplay-genre"},l.default.createElement("span",{className:"genre-tag"},i)))),l.default.createElement("div",{id:"waveform"+this.props.waveformid,onClick:this.handleWaveformClick},l.default.createElement(b.default,{audioFile:this.props.song.track_url,container:"#waveform"+this.props.waveformid,onPosChange:this.handlePosChange,pos:this.state.pos,volume:"0",playing:this.state.playing,onClick:this.handleWaveformClick,options:{waveColor:"#8c8c8c",progressColor:"#ff7540",barWidth:2,height:80},ref:function(e){return t.wavesurfer=e}})),l.default.createElement("div",{className:"songplay-buttonbar"},u,l.default.createElement(w.default,{song:this.props.song}),l.default.createElement("span",{className:"container-commentcount"},this.props.song.commentnum),l.default.createElement("img",{className:"stat-icon-playcontainer",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfY29tbWVudDwvdGl0bGU+PHBhdGggZD0iTTUgM2MtMS4xMDUgMC0yIC44ODctMiAyLjAwNnYyLjk4OEMzIDkuMTAyIDMuODg3IDEwIDUgMTBoNmMxLjEwNSAwIDItLjg4NyAyLTIuMDA2VjUuMDA2QTEuOTk4IDEuOTk4IDAgMCAwIDExIDNINXptMCA3djNsMy0zSDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="}),l.default.createElement("span",{className:"container-playcount"},this.props.song.playcount),l.default.createElement("img",{className:"stat-icon-playcontainer",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcGxheSA0PC90aXRsZT48cGF0aCBkPSJNNCAxM1YzbDkgNS05IDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="}))))):l.default.createElement("div",{className:"loader"},"Loading...")}}]),t}(l.default.Component),k=function(e,t){return{user:e.users.byID[t.song.user_id],audio:e.audio,currentUser:e.session.currentUser}},C=function(e){return{receiveAudio:function(t){return e((0,p.receiveAudio)(t))},removeAudio:function(t){return e((0,p.removeAudio)(t))},fetchOneUserByID:function(t){return e((0,d.fetchOneUserByID)(t))},changePlaybackTime:function(t){return e((0,p.changePlaybackTime)(t))},requestAudioPlaybackTime:function(){return e((0,p.requestAudioPlaybackTime)())},fetchLikesBySongID:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return e(fetchLikesBySongID(t))}),removeLikes:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(removeLikes())}),createLike:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return e(createLike(t))}),deleteLike:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return e(deleteLike(t))}),removeAudioToken:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(removeAudioToken())})}};t.default=(0,c.withRouter)((0,f.connect)(k,C)(_))},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=n(5),c=(n(4),function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),i(t,[{key:"render",value:function(){return"you"===this.props.location.pathname.slice(1,4)||"discover"===this.props.location.pathname.slice(1,9)||"collection"===this.props.location.pathname.slice(1,11)||"reposts"==this.props.location.pathname.slice(-7)||"albums"==this.props.location.pathname.slice(-6)||"playlists"==this.props.location.pathname.slice(-9)?u.default.createElement("div",{className:"error-page"},u.default.createElement("h1",{className:"error-title"},"We're sorry, this part of Invoke is still under construction!"),u.default.createElement("div",{className:"sad-bunny-error"}),u.default.createElement("p",{className:"errorText"}," Please check back at a later date."),u.default.createElement("div",{className:"backhome"},u.default.createElement("a",{href:"/#/stream"},"Take me back home"))):u.default.createElement("div",{className:"error-page"},u.default.createElement("div",{className:"cant-find-user"}),u.default.createElement("h1",{className:"error-title"},"We can’t find that user."),u.default.createElement("p",{className:"errorText"},"A report has been sent to our tech brigade. ",u.default.createElement("br",null),"  ",u.default.createElement("br",null),"Please check back in a bit."),u.default.createElement("div",{className:"backhome"},u.default.createElement(l.Link,{to:"/stream"},"Take me back home")))}}]),t}(u.default.Component));t.default=(0,l.withRouter)(c)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteComment=t.fetchCommentsBySongID=t.createComment=t.fetchOneComment=t.fetchComments=t.removeComments=t.removeComment=t.receiveComments=t.receiveComment=t.REMOVE_COMMENTS=t.REMOVE_COMMENT=t.RECEIVE_COMMENT=t.RECEIVE_COMMENTS=void 0;var r=n(297),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=n(0),i=(function(e){e&&e.__esModule}(a),t.RECEIVE_COMMENTS="RECEIVE_COMMENTS"),s=t.RECEIVE_COMMENT="RECEIVE_COMMENT",u=t.REMOVE_COMMENT="REMOVE_COMMENT",l=t.REMOVE_COMMENTS="REMOVE_COMMENTS",c=t.receiveComment=function(e){return{type:s,comment:e}},f=t.receiveComments=function(e){return{type:i,comments:e}},p=t.removeComment=function(e){return{type:u,comment:e}};t.removeComments=function(){return{type:l}},t.fetchComments=function(){return function(e){return o.fetchComments().then(function(t){return e(f(t))},function(t){return e(receiveErrors(t.responseJSON))})}},t.fetchOneComment=function(e){return function(t){return o.fetchOneComment(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.createComment=function(e){return function(t){return o.createComment(e).then(function(e){return t(c(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.fetchCommentsBySongID=function(e){return function(t){return o.fetchCommentsBySongID(e).then(function(e){return t(f(e))},function(e){return t(receiveErrors(e.responseJSON))})}},t.deleteComment=function(e){return function(t){return o.deleteComment(e).then(function(e){return t(p(e))},function(e){return t(receiveErrors(e.responseJSON))})}}},function(e,t,n){"use strict";function r(e,t,n){this.props=e,this.context=t,this.refs=l,this.updater=n||s}function o(e,t,n){this.props=e,this.context=t,this.refs=l,this.updater=n||s}function a(){}var i=(n(27),n(6)),s=n(80),u=n(41),l=n(42),c=n(1),f=n(51);r.prototype.isReactComponent={},r.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&c(!1,"setState(...): takes an object of state variables to update or a function which returns an object of state variables."),this.updater.enqueueSetState(this,e),t&&this.updater.enqueueCallback(this,t,"setState")},r.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this),e&&this.updater.enqueueCallback(this,e,"forceUpdate")};var p={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]};for(var d in p)p.hasOwnProperty(d)&&function(e,t){u&&Object.defineProperty(r.prototype,e,{get:function(){f(!1,"%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}(d,p[d]);a.prototype=r.prototype,o.prototype=new a,o.prototype.constructor=o,i(o.prototype,r.prototype),o.prototype.isPureReactComponent=!0,e.exports={Component:r,PureComponent:o}},function(e,t,n){"use strict";function r(e,t){var n=e.constructor;o(!1,"%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op. Please check the code for the %s component.",t,t,n&&(n.displayName||n.name)||"ReactClass")}var o=n(2),a={isMounted:function(e){return!1},enqueueCallback:function(e,t){},enqueueForceUpdate:function(e){r(e,"forceUpdate")},enqueueReplaceState:function(e,t){r(e,"replaceState")},enqueueSetState:function(e,t){r(e,"setState")}};e.exports=a},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=r},function(e,t,n){"use strict";function r(e){var t=e&&(o&&e[o]||e[a]);if("function"==typeof t)return t}var o="function"==typeof Symbol&&Symbol.iterator,a="@@iterator";e.exports=r},function(e,t,n){"use strict";function r(){if(l.current){var e=l.current.getName();if(e)return" Check the render method of `"+e+"`."}return""}function o(e){if(null!==e&&void 0!==e&&void 0!==e.__source){var t=e.__source;return" Check your code at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+"."}return""}function a(e){var t=r();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t=" Check the top-level render call using <"+n+">.")}return t}function i(e,t){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var n=g.uniqueKey||(g.uniqueKey={}),r=a(t);if(!n[r]){n[r]=!0;var o="";e&&e._owner&&e._owner!==l.current&&(o=" It was passed a child from "+e._owner.getName()+"."),m(!1,'Each child in an array or iterator should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.%s',r,o,c.getCurrentStackAddendum(e))}}}function s(e,t){if("object"==typeof e)if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];f.isValidElement(r)&&i(r,t)}else if(f.isValidElement(e))e._store&&(e._store.validated=!0);else if(e){var o=h(e);if(o&&o!==e.entries)for(var a,s=o.call(e);!(a=s.next()).done;)f.isValidElement(a.value)&&i(a.value,t)}}function u(e){var t=e.type;if("function"==typeof t){var n=t.displayName||t.name;t.propTypes&&p(t.propTypes,e.props,"prop",n,e,null),"function"==typeof t.getDefaultProps&&m(t.getDefaultProps.isReactClassApproved,"getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}var l=n(17),c=n(12),f=n(23),p=n(139),d=n(41),h=n(82),m=n(2),v=n(51),g={},y={createElement:function(e,t,n){var a="string"==typeof e||"function"==typeof e;if(!a&&"function"!=typeof e&&"string"!=typeof e){var i="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(i+=" You likely forgot to export your component from the file it's defined in.");var l=o(t);i+=l||r(),i+=c.getCurrentStackAddendum();var p=null!==t&&void 0!==t&&void 0!==t.__source?t.__source:null;c.pushNonStandardWarningStack(!0,p),m(!1,"React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",null==e?e:typeof e,i),c.popNonStandardWarningStack()}var d=f.createElement.apply(this,arguments);if(null==d)return d;if(a)for(var h=2;h<arguments.length;h++)s(arguments[h],e);return u(d),d},createFactory:function(e){var t=y.createElement.bind(null,e);return t.type=e,d&&Object.defineProperty(t,"type",{enumerable:!1,get:function(){return v(!1,"Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:e}),e}}),t},cloneElement:function(e,t,n){for(var r=f.cloneElement.apply(this,arguments),o=2;o<arguments.length;o++)s(arguments[o],r.type);return u(r),r}};e.exports=y},function(e,t,n){"use strict";var r=n(85);e.exports=function(e){return r(e,!1)}},function(e,t,n){"use strict";var r=n(13),o=n(1),a=n(2),i=n(86),s=n(143);e.exports=function(e,t){function n(e){var t=e&&(C&&e[C]||e[S]);if("function"==typeof t)return t}function u(e,t){return e===t?0!==e||1/e==1/t:e!==e&&t!==t}function l(e){this.message=e,this.stack=""}function c(e){function n(n,u,c,f,p,d,h){if(f=f||x,d=d||c,h!==i)if(t)o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("undefined"!=typeof console){var m=f+":"+c;!r[m]&&s<3&&(a(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",d,f),r[m]=!0,s++)}return null==u[c]?n?new l(null===u[c]?"The "+p+" `"+d+"` is marked as required in `"+f+"`, but its value is `null`.":"The "+p+" `"+d+"` is marked as required in `"+f+"`, but its value is `undefined`."):null:e(u,c,f,p,d)}var r={},s=0,u=n.bind(null,!1);return u.isRequired=n.bind(null,!0),u}function f(e){function t(t,n,r,o,a,i){var s=t[n];if(E(s)!==e)return new l("Invalid "+o+" `"+a+"` of type `"+w(s)+"` supplied to `"+r+"`, expected `"+e+"`.");return null}return c(t)}function p(e){function t(t,n,r,o,a){if("function"!=typeof e)return new l("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var s=t[n];if(!Array.isArray(s)){return new l("Invalid "+o+" `"+a+"` of type `"+E(s)+"` supplied to `"+r+"`, expected an array.")}for(var u=0;u<s.length;u++){var c=e(s,u,r,o,a+"["+u+"]",i);if(c instanceof Error)return c}return null}return c(t)}function d(e){function t(t,n,r,o,a){if(!(t[n]instanceof e)){var i=e.name||x;return new l("Invalid "+o+" `"+a+"` of type `"+k(t[n])+"` supplied to `"+r+"`, expected instance of `"+i+"`.")}return null}return c(t)}function h(e){function t(t,n,r,o,a){for(var i=t[n],s=0;s<e.length;s++)if(u(i,e[s]))return null;return new l("Invalid "+o+" `"+a+"` of value `"+i+"` supplied to `"+r+"`, expected one of "+JSON.stringify(e)+".")}return Array.isArray(e)?c(t):(a(!1,"Invalid argument supplied to oneOf, expected an instance of array."),r.thatReturnsNull)}function m(e){function t(t,n,r,o,a){if("function"!=typeof e)return new l("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var s=t[n],u=E(s);if("object"!==u)return new l("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected an object.");for(var c in s)if(s.hasOwnProperty(c)){var f=e(s,c,r,o,a+"."+c,i);if(f instanceof Error)return f}return null}return c(t)}function v(e){function t(t,n,r,o,a){for(var s=0;s<e.length;s++){if(null==(0,e[s])(t,n,r,o,a,i))return null}return new l("Invalid "+o+" `"+a+"` supplied to `"+r+"`.")}if(!Array.isArray(e))return a(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),r.thatReturnsNull;for(var n=0;n<e.length;n++){var o=e[n];if("function"!=typeof o)return a(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",_(o),n),r.thatReturnsNull}return c(t)}function g(e){function t(t,n,r,o,a){var s=t[n],u=E(s);if("object"!==u)return new l("Invalid "+o+" `"+a+"` of type `"+u+"` supplied to `"+r+"`, expected `object`.");for(var c in e){var f=e[c];if(f){var p=f(s,c,r,o,a+"."+c,i);if(p)return p}}return null}return c(t)}function y(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(y);if(null===t||e(t))return!0;var r=n(t);if(!r)return!1;var o,a=r.call(t);if(r!==t.entries){for(;!(o=a.next()).done;)if(!y(o.value))return!1}else for(;!(o=a.next()).done;){var i=o.value;if(i&&!y(i[1]))return!1}return!0;default:return!1}}function b(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function E(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":b(t,e)?"symbol":t}function w(e){if(void 0===e||null===e)return""+e;var t=E(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function _(e){var t=w(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function k(e){return e.constructor&&e.constructor.name?e.constructor.name:x}var C="function"==typeof Symbol&&Symbol.iterator,S="@@iterator",x="<<anonymous>>",P={array:f("array"),bool:f("boolean"),func:f("function"),number:f("number"),object:f("object"),string:f("string"),symbol:f("symbol"),any:function(){return c(r.thatReturnsNull)}(),arrayOf:p,element:function(){function t(t,n,r,o,a){var i=t[n];if(!e(i)){return new l("Invalid "+o+" `"+a+"` of type `"+E(i)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return c(t)}(),instanceOf:d,node:function(){function e(e,t,n,r,o){return y(e[t])?null:new l("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")}return c(e)}(),objectOf:m,oneOf:h,oneOfType:v,shape:g};return l.prototype=Error.prototype,P.checkPropTypes=s,P.PropTypes=P,P}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r={hasCachedChildNodes:1};e.exports=r},function(e,t,n){"use strict";function r(e,t){return null==t&&o(!1,"accumulateInto(...): Accumulated items must not be null or undefined."),null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}var o=(n(3),n(1));e.exports=r},function(e,t,n){"use strict";function r(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}e.exports=r},function(e,t,n){"use strict";function r(){return!a&&o.canUseDOM&&(a="textContent"in document.documentElement?"textContent":"innerText"),a}var o=n(8),a=null;e.exports=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=(n(3),n(24)),a=n(1),i=function(){function e(t){r(this,e),this._callbacks=null,this._contexts=null,this._arg=t}return e.prototype.enqueue=function(e,t){this._callbacks=this._callbacks||[],this._callbacks.push(e),this._contexts=this._contexts||[],this._contexts.push(t)},e.prototype.notifyAll=function(){var e=this._callbacks,t=this._contexts,n=this._arg;if(e&&t){e.length!==t.length&&a(!1,"Mismatched list of contexts in callback queue"),this._callbacks=null,this._contexts=null;for(var r=0;r<e.length;r++)e[r].call(t[r],n);e.length=0,t.length=0}},e.prototype.checkpoint=function(){return this._callbacks?this._callbacks.length:0},e.prototype.rollback=function(e){this._callbacks&&this._contexts&&(this._callbacks.length=e,this._contexts.length=e)},e.prototype.reset=function(){this._callbacks=null,this._contexts=null},e.prototype.destructor=function(){this.reset()},e}();e.exports=o.addPoolingTo(i)},function(e,t,n){"use strict";var r={logTopLevelRenders:!1};e.exports=r},function(e,t,n){"use strict";function r(e){var t=e.type,n=e.nodeName;return n&&"input"===n.toLowerCase()&&("checkbox"===t||"radio"===t)}function o(e){return e._wrapperState.valueTracker}function a(e,t){e._wrapperState.valueTracker=t}function i(e){delete e._wrapperState.valueTracker}function s(e){var t;return e&&(t=r(e)?""+e.checked:e.value),t}var u=n(7),l={_getTrackerFromNode:function(e){return o(u.getInstanceFromNode(e))},track:function(e){if(!o(e)){var t=u.getNodeFromInstance(e),n=r(t)?"checked":"value",s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n),l=""+t[n];t.hasOwnProperty(n)||"function"!=typeof s.get||"function"!=typeof s.set||(Object.defineProperty(t,n,{enumerable:s.enumerable,configurable:!0,get:function(){return s.get.call(this)},set:function(e){l=""+e,s.set.call(this,e)}}),a(e,{getValue:function(){return l},setValue:function(e){l=""+e},stopTracking:function(){i(e),delete t[n]}}))}},updateValueIfChanged:function(e){if(!e)return!1;var t=o(e);if(!t)return l.track(e),!0;var n=t.getValue(),r=s(u.getNodeFromInstance(e));return r!==n&&(t.setValue(r),!0)},stopTracking:function(e){var t=o(e);t&&t.stopTracking()}};e.exports=l},function(e,t,n){"use strict";function r(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!o[e.type]:"textarea"===t}var o={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};e.exports=r},function(e,t,n){"use strict";var r={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){r.currentScrollLeft=e.x,r.currentScrollTop=e.y}};e.exports=r},function(e,t,n){"use strict";var r=n(8),o=n(48),a=n(47),i=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t};r.canUseDOM&&("textContent"in document.documentElement||(i=function(e,t){if(3===e.nodeType)return void(e.nodeValue=t);a(e,o(t))})),e.exports=i},function(e,t,n){"use strict";function r(e){try{e.focus()}catch(e){}}e.exports=r},function(e,t,n){"use strict";function r(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var o={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},a=["Webkit","ms","Moz","O"];Object.keys(o).forEach(function(e){a.forEach(function(t){o[r(t,e)]=o[e]})});var i={background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}},s={isUnitlessNumber:o,shorthandPropertyExpansions:i};e.exports=s},function(e,t,n){"use strict";function r(e){return!!p.hasOwnProperty(e)||!f.hasOwnProperty(e)&&(c.test(e)?(p[e]=!0,!0):(f[e]=!0,l(!1,"Invalid attribute name: `%s`",e),!1))}function o(e,t){return null==t||e.hasBooleanValue&&!t||e.hasNumericValue&&isNaN(t)||e.hasPositiveNumericValue&&t<1||e.hasOverloadedBooleanValue&&!1===t}var a=n(21),i=n(7),s=n(14),u=n(182),l=n(2),c=new RegExp("^["+a.ATTRIBUTE_NAME_START_CHAR+"]["+a.ATTRIBUTE_NAME_CHAR+"]*$"),f={},p={},d={createMarkupForID:function(e){return a.ID_ATTRIBUTE_NAME+"="+u(e)},setAttributeForID:function(e,t){e.setAttribute(a.ID_ATTRIBUTE_NAME,t)},createMarkupForRoot:function(){return a.ROOT_ATTRIBUTE_NAME+'=""'},setAttributeForRoot:function(e){e.setAttribute(a.ROOT_ATTRIBUTE_NAME,"")},createMarkupForProperty:function(e,t){var n=a.properties.hasOwnProperty(e)?a.properties[e]:null;if(n){if(o(n,t))return"";var r=n.attributeName;return n.hasBooleanValue||n.hasOverloadedBooleanValue&&!0===t?r+'=""':r+"="+u(t)}return a.isCustomAttribute(e)?null==t?"":e+"="+u(t):null},createMarkupForCustomAttribute:function(e,t){return r(e)&&null!=t?e+"="+u(t):""},setValueForProperty:function(e,t,n){var r=a.properties.hasOwnProperty(t)?a.properties[t]:null;if(r){var u=r.mutationMethod;if(u)u(e,n);else{if(o(r,n))return void this.deleteValueForProperty(e,t);if(r.mustUseProperty)e[r.propertyName]=n;else{var l=r.attributeName,c=r.attributeNamespace;c?e.setAttributeNS(c,l,""+n):r.hasBooleanValue||r.hasOverloadedBooleanValue&&!0===n?e.setAttribute(l,""):e.setAttribute(l,""+n)}}}else if(a.isCustomAttribute(t))return void d.setValueForAttribute(e,t,n);var f={};f[t]=n,s.debugTool.onHostOperation({instanceID:i.getInstanceFromNode(e)._debugID,type:"update attribute",payload:f})},setValueForAttribute:function(e,t,n){if(r(t)){null==n?e.removeAttribute(t):e.setAttribute(t,""+n);var o={};o[t]=n,s.debugTool.onHostOperation({instanceID:i.getInstanceFromNode(e)._debugID,type:"update attribute",payload:o})}},deleteValueForAttribute:function(e,t){e.removeAttribute(t),s.debugTool.onHostOperation({instanceID:i.getInstanceFromNode(e)._debugID,type:"remove attribute",payload:t})},deleteValueForProperty:function(e,t){var n=a.properties.hasOwnProperty(t)?a.properties[t]:null;if(n){var r=n.mutationMethod;if(r)r(e,void 0);else if(n.mustUseProperty){var o=n.propertyName;n.hasBooleanValue?e[o]=!1:e[o]=""}else e.removeAttribute(n.attributeName)}else a.isCustomAttribute(t)&&e.removeAttribute(t);s.debugTool.onHostOperation({instanceID:i.getInstanceFromNode(e)._debugID,type:"remove attribute",payload:t})}};e.exports=d},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function r(){if(this._rootNodeID&&this._wrapperState.pendingUpdate){this._wrapperState.pendingUpdate=!1;var e=this._currentElement.props,t=l.getValue(e);null!=t&&i(this,Boolean(e.multiple),t)}}function o(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}function a(e,t){var n=e._currentElement._owner;l.checkPropTypes("select",t,n),void 0===t.valueLink||d||(p(!1,"`valueLink` prop on `select` is deprecated; set `value` and `onChange` instead."),d=!0);for(var r=0;r<m.length;r++){var a=m[r];if(null!=t[a]){var i=Array.isArray(t[a]);t.multiple&&!i?p(!1,"The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",a,o(n)):!t.multiple&&i&&p(!1,"The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",a,o(n))}}}function i(e,t,n){var r,o,a=c.getNodeFromInstance(e).options;if(t){for(r={},o=0;o<n.length;o++)r[""+n[o]]=!0;for(o=0;o<a.length;o++){var i=r.hasOwnProperty(a[o].value);a[o].selected!==i&&(a[o].selected=i)}}else{for(r=""+n,o=0;o<a.length;o++)if(a[o].value===r)return void(a[o].selected=!0);a.length&&(a[0].selected=!0)}}function s(e){var t=this._currentElement.props,n=l.executeOnChange(t,e);return this._rootNodeID&&(this._wrapperState.pendingUpdate=!0),f.asap(r,this),n}var u=n(6),l=n(60),c=n(7),f=n(18),p=n(2),d=!1,h=!1,m=["value","defaultValue"],v={getHostProps:function(e,t){return u({},t,{onChange:e._wrapperState.onChange,value:void 0})},mountWrapper:function(e,t){a(e,t);var n=l.getValue(t);e._wrapperState={pendingUpdate:!1,initialValue:null!=n?n:t.defaultValue,listeners:null,onChange:s.bind(e),wasMultiple:Boolean(t.multiple)},void 0===t.value||void 0===t.defaultValue||h||(p(!1,"Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://fb.me/react-controlled-components"),h=!0)},getSelectValueContext:function(e){return e._wrapperState.initialValue},postUpdateWrapper:function(e){var t=e._currentElement.props;e._wrapperState.initialValue=void 0;var n=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=Boolean(t.multiple);var r=l.getValue(t);null!=r?(e._wrapperState.pendingUpdate=!1,i(e,Boolean(t.multiple),r)):n!==Boolean(t.multiple)&&(null!=t.defaultValue?i(e,Boolean(t.multiple),t.defaultValue):i(e,Boolean(t.multiple),t.multiple?[]:""))}};e.exports=v},function(e,t,n){"use strict";function r(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}function o(e){return"function"==typeof e&&void 0!==e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent}function a(e,t){var n;if(null===e||!1===e)n=u.create(a);else if("object"==typeof e){var i=e,s=i.type;if("function"!=typeof s&&"string"!=typeof s){var h="";(void 0===s||"object"==typeof s&&null!==s&&0===Object.keys(s).length)&&(h+=" You likely forgot to export your component from the file it's defined in."),h+=r(i._owner),f(!1,"Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",null==s?s:typeof s,h)}"string"==typeof i.type?n=l.createInternalComponent(i):o(i.type)?(n=new i.type(i),n.getHostNode||(n.getHostNode=n.getNativeNode)):n=new d(i)}else"string"==typeof e||"number"==typeof e?n=l.createInstanceForText(e):f(!1,"Encountered invalid React node of type %s",typeof e);return p("function"==typeof n.mountComponent&&"function"==typeof n.receiveComponent&&"function"==typeof n.getHostNode&&"function"==typeof n.unmountComponent,"Only React Components can be mounted."),n._mountIndex=0,n._mountImage=null,n._debugID=t?c():0,Object.preventExtensions&&Object.preventExtensions(n),n}var i=(n(3),n(6)),s=n(190),u=n(104),l=n(105),c=n(193),f=n(1),p=n(2),d=function(e){this.construct(e)};i(d.prototype,s,{_instantiateReactComponent:a}),e.exports=a},function(e,t,n){"use strict";var r=(n(3),n(26)),o=n(1),a={HOST:0,COMPOSITE:1,EMPTY:2,getType:function(e){return null===e||!1===e?a.EMPTY:r.isValidElement(e)?"function"==typeof e.type?a.COMPOSITE:a.HOST:void o(!1,"Unexpected node: %s",e)}};e.exports=a},function(e,t,n){"use strict";var r,o={injectEmptyComponentFactory:function(e){r=e}},a={create:function(e){return r(e)}};a.injection=o,e.exports=a},function(e,t,n){"use strict";function r(e){return s||i(!1,"There is no registered component for the tag %s",e.type),new s(e)}function o(e){return new u(e)}function a(e){return e instanceof u}var i=(n(3),n(1)),s=null,u=null,l={injectGenericComponentClass:function(e){s=e},injectTextComponentClass:function(e){u=e}},c={createInternalComponent:r,createInstanceForText:o,isTextComponent:a,injection:l};e.exports=c},function(e,t,n){"use strict";function r(e,t){return e&&"object"==typeof e&&null!=e.key?c.escape(e.key):t.toString(36)}function o(e,t,n,a){var m=typeof e;if("undefined"!==m&&"boolean"!==m||(e=null),null===e||"string"===m||"number"===m||"object"===m&&e.$$typeof===s)return n(a,e,""===t?p+r(e,0):t),1;var v,g,y=0,b=""===t?p:t+d;if(Array.isArray(e))for(var E=0;E<e.length;E++)v=e[E],g=b+r(v,E),y+=o(v,g,n,a);else{var w=u(e);if(w){var _,k=w.call(e);if(w!==e.entries)for(var C=0;!(_=k.next()).done;)v=_.value,g=b+r(v,C++),y+=o(v,g,n,a);else{var S="";if(i.current){var x=i.current.getName();x&&(S=" Check the render method of `"+x+"`.")}for(f(h,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead.%s",S),h=!0;!(_=k.next()).done;){var P=_.value;P&&(v=P[1],g=b+c.escape(P[0])+d+r(v,0),y+=o(v,g,n,a))}}}else if("object"===m){var T="";if(T=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.",e._isReactElement&&(T=" It looks like you're using an element created by a different version of React. Make sure to use only one copy of React."),i.current){var O=i.current.getName();O&&(T+=" Check the render method of `"+O+"`.")}var N=String(e);l(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===N?"object with keys {"+Object.keys(e).join(", ")+"}":N,T)}}return y}function a(e,t,n){return null==e?0:o(e,"",t,n)}var i=(n(3),n(17)),s=n(194),u=n(195),l=n(1),c=n(64),f=n(2),p=".",d=":",h=!1;e.exports=a},function(e,t,n){"use strict";var r=n(13),o={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!0),{remove:function(){e.removeEventListener(t,n,!0)}}):(console.error("Attempted to listen to events during the capture phase on a browser that does not support the capture phase. Your application will not receive some events."),{remove:r})},registerDefault:function(){}};e.exports=o},function(e,t,n){"use strict";function r(e){return a(document.documentElement,e)}var o=n(207),a=n(209),i=n(97),s=n(109),u={hasSelectionCapabilities:function(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&"text"===e.type||"textarea"===t||"true"===e.contentEditable)},getSelectionInformation:function(){var e=s();return{focusedElem:e,selectionRange:u.hasSelectionCapabilities(e)?u.getSelection(e):null}},restoreSelection:function(e){var t=s(),n=e.focusedElem,o=e.selectionRange;t!==n&&r(n)&&(u.hasSelectionCapabilities(n)&&u.setSelection(n,o),i(n))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,end:e.selectionEnd};else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var n=document.selection.createRange();n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)})}else t=o.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,r=t.end;if(void 0===r&&(r=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length);else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var a=e.createTextRange();a.collapse(!0),a.moveStart("character",n),a.moveEnd("character",r-n),a.select()}else o.setOffsets(e,t)}};e.exports=u},function(e,t,n){"use strict";function r(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}e.exports=r},function(e,t,n){"use strict";function r(e,t){for(var n=Math.min(e.length,t.length),r=0;r<n;r++)if(e.charAt(r)!==t.charAt(r))return r;return e.length===t.length?-1:n}function o(e){return e?e.nodeType===F?e.documentElement:e.firstChild:null}function a(e){return e.getAttribute&&e.getAttribute(j)||""}function i(e,t,n,r,o){var a;if(k.logTopLevelRenders){var i=e._currentElement.props.child,s=i.type;a="React mount: "+("string"==typeof s?s:s.displayName||s.name),console.time(a)}var u=P.mountComponent(e,n,null,w(e,t),o,0);a&&console.timeEnd(a),e._renderedComponent._topLevelWrapper=e,z._mountImageIntoNode(u,t,e,r,n)}function s(e,t,n,r){var o=O.ReactReconcileTransaction.getPooled(!n&&_.useCreateElement);o.perform(i,null,e,t,o,n,r),O.ReactReconcileTransaction.release(o)}function u(e,t,n){for(S.debugTool.onBeginFlush(),P.unmountComponent(e,n),S.debugTool.onEndFlush(),t.nodeType===F&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild)}function l(e){var t=o(e);if(t){var n=E.getInstanceFromNode(t);return!(!n||!n._hostParent)}}function c(e){var t=o(e);return!(!t||!p(t)||E.getInstanceFromNode(t))}function f(e){return!(!e||e.nodeType!==U&&e.nodeType!==F&&e.nodeType!==B)}function p(e){return f(e)&&(e.hasAttribute(L)||e.hasAttribute(j))}function d(e){var t=o(e),n=t&&E.getInstanceFromNode(t);return n&&!n._hostParent?n:null}function h(e){var t=d(e);return t?t._hostContainerInfo._topLevelWrapper:null}var m=(n(3),n(29)),v=n(21),g=n(26),y=n(49),b=n(17),E=n(7),w=n(224),_=n(225),k=n(92),C=n(36),S=n(14),x=n(226),P=n(28),T=n(65),O=n(18),N=n(42),I=n(102),M=n(1),D=n(47),A=n(63),R=n(2),j=v.ID_ATTRIBUTE_NAME,L=v.ROOT_ATTRIBUTE_NAME,U=1,F=9,B=11,W={},V=1,H=function(){this.rootID=V++};H.prototype.isReactComponent={},H.displayName="TopLevelWrapper",H.prototype.render=function(){return this.props.child},H.isReactTopLevelWrapper=!0;var z={TopLevelWrapper:H,_instancesByReactRootID:W,scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,n,r,o){return z.scrollMonitor(r,function(){T.enqueueElementInternal(e,t,n),o&&T.enqueueCallbackInternal(e,o)}),e},_renderNewRootComponent:function(e,t,n,r){R(null==b.current,"_renderNewRootComponent(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate. Check the render method of %s.",b.current&&b.current.getName()||"ReactCompositeComponent"),f(t)||M(!1,"_registerComponent(...): Target container is not a DOM element."),y.ensureScrollValueMonitoring();var o=I(e,!1);O.batchedUpdates(s,o,t,n,r);var a=o._instance.rootID;return W[a]=o,o},renderSubtreeIntoContainer:function(e,t,n,r){return null!=e&&C.has(e)||M(!1,"parentComponent must be a valid React Component"),z._renderSubtreeIntoContainer(e,t,n,r)},_renderSubtreeIntoContainer:function(e,t,n,r){T.validateCallback(r,"ReactDOM.render"),g.isValidElement(t)||M(!1,"ReactDOM.render(): Invalid component element.%s","string"==typeof t?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof t?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=t&&void 0!==t.props?" This may be caused by unintentionally loading two independent copies of React.":""),R(!n||!n.tagName||"BODY"!==n.tagName.toUpperCase(),"render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");var i,s=g.createElement(H,{child:t});if(e){var u=C.get(e);i=u._processChildContext(u._context)}else i=N;var c=h(n);if(c){var f=c._currentElement,p=f.props.child;if(A(p,t)){var d=c._renderedComponent.getPublicInstance(),m=r&&function(){r.call(d)};return z._updateRootComponent(c,s,i,n,m),d}z.unmountComponentAtNode(n)}var v=o(n),y=v&&!!a(v),b=l(n);if(R(!b,"render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),!y||v.nextSibling)for(var E=v;E;){if(a(E)){R(!1,"render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.");break}E=E.nextSibling}var w=y&&!c&&!b,_=z._renderNewRootComponent(s,n,w,i)._renderedComponent.getPublicInstance();return r&&r.call(_),_},render:function(e,t,n){return z._renderSubtreeIntoContainer(null,e,t,n)},unmountComponentAtNode:function(e){R(null==b.current,"unmountComponentAtNode(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate. Check the render method of %s.",b.current&&b.current.getName()||"ReactCompositeComponent"),f(e)||M(!1,"unmountComponentAtNode(...): Target container is not a DOM element."),R(!c(e),"unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");var t=h(e);if(!t){var n=l(e),r=1===e.nodeType&&e.hasAttribute(L);return R(!n,"unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",r?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component."),!1}return delete W[t._instance.rootID],O.batchedUpdates(u,t,e,!1),!0},_mountImageIntoNode:function(e,t,n,a,i){if(f(t)||M(!1,"mountComponentIntoNode(...): Target container is not valid."),a){var s=o(t);if(x.canReuseMarkup(e,s))return void E.precacheNode(n,s);var u=s.getAttribute(x.CHECKSUM_ATTR_NAME);s.removeAttribute(x.CHECKSUM_ATTR_NAME);var l=s.outerHTML;s.setAttribute(x.CHECKSUM_ATTR_NAME,u);var c,p=e;t.nodeType===U?(c=document.createElement("div"),c.innerHTML=e,p=c.innerHTML):(c=document.createElement("iframe"),document.body.appendChild(c),c.contentDocument.write(e),p=c.contentDocument.documentElement.outerHTML,document.body.removeChild(c));var d=r(p,l),h=" (client) "+p.substring(d-20,d+20)+"\n (server) "+l.substring(d-20,d+20);t.nodeType===F&&M(!1,"You're trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s",h),R(!1,"React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:\n%s",h)}if(t.nodeType===F&&M(!1,"You're trying to render a component to the document but you didn't use server rendering. We can't do this without using server rendering due to cross-browser quirks. See ReactDOMServer.renderToString() for server rendering."),i.useCreateElement){for(;t.lastChild;)t.removeChild(t.lastChild);m.insertTreeBefore(t,e,null)}else D(t,e),E.precacheNode(n,t.firstChild);var v=E.getInstanceFromNode(t.firstChild);0!==v._debugID&&S.debugTool.onHostOperation({instanceID:v._debugID,type:"mount",payload:e.toString()})}};e.exports=z},function(e,t,n){"use strict";function r(e){for(var t;(t=e._renderedNodeType)===o.COMPOSITE;)e=e._renderedComponent;return t===o.HOST?e._renderedComponent:t===o.EMPTY?null:void 0}var o=n(103);e.exports=r},function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return i});var r=n(10),o=n.n(r),a=o.a.shape({trySubscribe:o.a.func.isRequired,tryUnsubscribe:o.a.func.isRequired,notifyNestedSubs:o.a.func.isRequired,isSubscribed:o.a.func.isRequired}),i=o.a.shape({subscribe:o.a.func.isRequired,dispatch:o.a.func.isRequired,getState:o.a.func.isRequired})},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function s(){}function u(e,t){var n={run:function(r){try{var o=e(t.getState(),r);(o!==n.props||n.error)&&(n.shouldComponentUpdate=!0,n.props=o,n.error=null)}catch(e){n.shouldComponentUpdate=!0,n.error=e}}};return n}function l(e){var t,n,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=l.getDisplayName,p=void 0===c?function(e){return"ConnectAdvanced("+e+")"}:c,E=l.methodName,w=void 0===E?"connectAdvanced":E,_=l.renderCountProp,k=void 0===_?void 0:_,C=l.shouldHandleStateChanges,S=void 0===C||C,x=l.storeKey,P=void 0===x?"store":x,T=l.withRef,O=void 0!==T&&T,N=i(l,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef"]),I=P+"Subscription",M=y++,D=(t={},t[P]=v.a,t[I]=v.b,t),A=(n={},n[I]=v.b,n);return function(t){d.a("function"==typeof t,"You must pass a component to the function returned by connect. Instead received "+JSON.stringify(t));var n=t.displayName||t.name||"Component",i=p(n),l=g({},N,{getDisplayName:p,methodName:w,renderCountProp:k,shouldHandleStateChanges:S,storeKey:P,withRef:O,displayName:i,wrappedComponentName:n,WrappedComponent:t}),c=function(n){function c(e,t){r(this,c);var a=o(this,n.call(this,e,t));return a.version=M,a.state={},a.renderCount=0,a.store=e[P]||t[P],a.propsMode=Boolean(e[P]),a.setWrappedInstance=a.setWrappedInstance.bind(a),d.a(a.store,'Could not find "'+P+'" in either the context or props of "'+i+'". Either wrap the root component in a <Provider>, or explicitly pass "'+P+'" as a prop to "'+i+'".'),a.initSelector(),a.initSubscription(),a}return a(c,n),c.prototype.getChildContext=function(){var e,t=this.propsMode?null:this.subscription;return e={},e[I]=t||this.context[I],e},c.prototype.componentDidMount=function(){S&&(this.subscription.trySubscribe(),this.selector.run(this.props),this.selector.shouldComponentUpdate&&this.forceUpdate())},c.prototype.componentWillReceiveProps=function(e){this.selector.run(e)},c.prototype.shouldComponentUpdate=function(){return this.selector.shouldComponentUpdate},c.prototype.componentWillUnmount=function(){this.subscription&&this.subscription.tryUnsubscribe(),this.subscription=null,this.notifyNestedSubs=s,this.store=null,this.selector.run=s,this.selector.shouldComponentUpdate=!1},c.prototype.getWrappedInstance=function(){return d.a(O,"To access the wrapped instance, you need to specify { withRef: true } in the options argument of the "+w+"() call."),this.wrappedInstance},c.prototype.setWrappedInstance=function(e){this.wrappedInstance=e},c.prototype.initSelector=function(){var t=e(this.store.dispatch,l);this.selector=u(t,this.store),this.selector.run(this.props)},c.prototype.initSubscription=function(){if(S){var e=(this.propsMode?this.props:this.context)[I];this.subscription=new m.a(this.store,e,this.onStateChange.bind(this)),this.notifyNestedSubs=this.subscription.notifyNestedSubs.bind(this.subscription)}},c.prototype.onStateChange=function(){this.selector.run(this.props),this.selector.shouldComponentUpdate?(this.componentDidUpdate=this.notifyNestedSubsOnComponentDidUpdate,this.setState(b)):this.notifyNestedSubs()},c.prototype.notifyNestedSubsOnComponentDidUpdate=function(){this.componentDidUpdate=void 0,this.notifyNestedSubs()},c.prototype.isSubscribed=function(){return Boolean(this.subscription)&&this.subscription.isSubscribed()},c.prototype.addExtraProps=function(e){if(!(O||k||this.propsMode&&this.subscription))return e;var t=g({},e);return O&&(t.ref=this.setWrappedInstance),k&&(t[k]=this.renderCount++),this.propsMode&&this.subscription&&(t[I]=this.subscription),t},c.prototype.render=function(){var e=this.selector;if(e.shouldComponentUpdate=!1,e.error)throw e.error;return h.createElement(t,this.addExtraProps(e.props))},c}(h.Component);return c.WrappedComponent=t,c.displayName=i,c.childContextTypes=A,c.contextTypes=D,c.propTypes=D,c.prototype.componentWillUpdate=function(){this.version!==M&&(this.version=M,this.initSelector(),this.subscription&&this.subscription.tryUnsubscribe(),this.initSubscription(),S&&this.subscription.trySubscribe())},f.a(c,t)}}t.a=l;var c=n(114),f=n.n(c),p=n(37),d=n.n(p),h=n(0),m=(n.n(h),n(236)),v=n(112),g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},y=0,b={}},function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,arguments:!0,arity:!0},a="function"==typeof Object.getOwnPropertySymbols;e.exports=function(e,t,n){if("string"!=typeof t){var i=Object.getOwnPropertyNames(t);a&&(i=i.concat(Object.getOwnPropertySymbols(t)));for(var s=0;s<i.length;++s)if(!(r[i[s]]||o[i[s]]||n&&n[i[s]]))try{e[i[s]]=t[i[s]]}catch(e){}}return e}},function(e,t,n){"use strict";function r(e,t,n){function a(){g===v&&(g=v.slice())}function u(){return m}function l(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return a(),g.push(e),function(){if(t){t=!1,a();var n=g.indexOf(e);g.splice(n,1)}}}function c(e){if(!o.a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(y)throw new Error("Reducers may not dispatch actions.");try{y=!0,m=h(m,e)}finally{y=!1}for(var t=v=g,n=0;n<t.length;n++){(0,t[n])()}return e}function f(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");h=e,c({type:s.INIT})}function p(){var e,t=l;return e={subscribe:function(e){function n(){e.next&&e.next(u())}if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");return n(),{unsubscribe:t(n)}}},e[i.a]=function(){return this},e}var d;if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error("Expected the enhancer to be a function.");return n(r)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var h=e,m=t,v=[],g=v,y=!1;return c({type:s.INIT}),d={dispatch:c,subscribe:l,getState:u,replaceReducer:f},d[i.a]=p,d}n.d(t,"a",function(){return s}),t.b=r;var o=n(70),a=n(248),i=n.n(a),s={INIT:"@@redux/INIT"}},function(e,t,n){"use strict";var r=n(241),o=r.a.Symbol;t.a=o},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){"use strict";function r(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}t.a=r},function(e,t,n){"use strict";function r(e){return function(t,n){function r(){return o}var o=e(t,n);return r.dependsOnOwnProps=!1,r}}function o(e){return null!==e.dependsOnOwnProps&&void 0!==e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function a(e,t){return function(n,r){var a=r.displayName,s=function(e,t){return s.dependsOnOwnProps?s.mapToProps(e,t):s.mapToProps(e)};return s.dependsOnOwnProps=!0,s.mapToProps=function(n,r){s.mapToProps=e,s.dependsOnOwnProps=o(e);var u=s(n,r);return"function"==typeof u&&(s.mapToProps=u,s.dependsOnOwnProps=o(u),u=s(n,r)),i.a(u,a,t),u},s}}t.a=r,t.b=a;var i=n(120)},function(e,t,n){"use strict";function r(e,t,n){o.a(e)||a.a(n+"() in "+t+" must return a plain object. Instead received "+e+".")}t.a=r;var o=n(70),a=n(68)},function(e,t,n){"use strict";t.__esModule=!0;t.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),t.addEventListener=function(e,t,n){return e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},t.removeEventListener=function(e,t,n){return e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)},t.getConfirmation=function(e,t){return t(window.confirm(e))},t.supportsHistory=function(){var e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},t.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},t.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},t.isExtraneousPopstateEvent=function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(25),s=n.n(i),u=n(0),l=n.n(u),c=n(10),f=n.n(c),p=n(75),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h=function(e){function t(){var n,a,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=a=o(this,e.call.apply(e,[this].concat(u))),a.state={match:a.computeMatch(a.props,a.context.router)},i=n,o(a,i)}return a(t,e),t.prototype.getChildContext=function(){return{router:d({},this.context.router,{route:{location:this.props.location||this.context.router.route.location,match:this.state.match}})}},t.prototype.computeMatch=function(e,t){var n=e.computedMatch,r=e.location,o=e.path,a=e.strict,i=e.exact,s=t.route;if(n)return n;var u=(r||s.location).pathname;return o?p.a(u,{path:o,strict:a,exact:i}):s.match},t.prototype.componentWillMount=function(){var e=this.props,t=e.component,n=e.render,r=e.children;s.a(!(t&&n),"You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"),s.a(!(t&&r),"You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"),s.a(!(n&&r),"You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored")},t.prototype.componentWillReceiveProps=function(e,t){s.a(!(e.location&&!this.props.location),'<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),s.a(!(!e.location&&this.props.location),'<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'),this.setState({match:this.computeMatch(e,t.router)})},t.prototype.render=function(){var e=this.state.match,t=this.props,n=t.children,r=t.component,o=t.render,a=this.context.router,i=a.history,s=a.route,u=a.staticContext,c=this.props.location||s.location,f={match:e,location:c,history:i,staticContext:u};return r?e?l.a.createElement(r,f):null:o?e?o(f):null:n?"function"==typeof n?n(f):!Array.isArray(n)||n.length?l.a.Children.only(n):null:null},t}(l.a.Component);h.propTypes={computedMatch:f.a.object,path:f.a.string,exact:f.a.bool,strict:f.a.bool,component:f.a.func,render:f.a.func,children:f.a.oneOfType([f.a.func,f.a.node]),location:f.a.object},h.contextTypes={router:f.a.shape({history:f.a.object.isRequired,route:f.a.object.isRequired,staticContext:f.a.object})},h.childContextTypes={router:f.a.object.isRequired},t.a=h},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),u=n.n(s),l=n(10),c=n.n(l),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)},d=function(e){function t(){var n,r,i;o(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=r=a(this,e.call.apply(e,[this].concat(u))),r.handleClick=function(e){if(r.props.onClick&&r.props.onClick(e),!e.defaultPrevented&&0===e.button&&!r.props.target&&!p(e)){e.preventDefault();var t=r.context.router.history,n=r.props,o=n.replace,a=n.to;o?t.replace(a):t.push(a)}},i=n,a(r,i)}return i(t,e),t.prototype.render=function(){var e=this.props,t=(e.replace,e.to),n=r(e,["replace","to"]),o=this.context.router.history.createHref("string"==typeof t?{pathname:t}:t);return u.a.createElement("a",f({},n,{onClick:this.handleClick,href:o}))},t}(u.a.Component);d.propTypes={onClick:c.a.func,target:c.a.string,replace:c.a.bool,to:c.a.oneOfType([c.a.string,c.a.object]).isRequired},d.defaultProps={replace:!1},d.contextTypes={router:c.a.shape({history:c.a.shape({push:c.a.func.isRequired,replace:c.a.func.isRequired,createHref:c.a.func.isRequired}).isRequired}).isRequired},t.a=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ProtectedRoute=t.AuthRoute=void 0;var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=n(5),i=n(4),s=function(e){var t=e.component,n=e.path,r=e.loggedIn;return o.default.createElement(a.Route,{exact:!0,path:n,render:function(e){return r?o.default.createElement(a.Redirect,{to:"/stream"}):o.default.createElement(t,e)}})},u=function(e){var t=e.component,n=e.path,r=e.loggedIn;return o.default.createElement(a.Route,{path:n,render:function(e){return r?o.default.createElement(t,e):o.default.createElement(a.Redirect,{to:"/"})}})},l=function(e){return{loggedIn:Boolean(e.session.currentUser)}};t.AuthRoute=(0,a.withRouter)((0,i.connect)(l,null)(s)),t.ProtectedRoute=(0,a.withRouter)((0,i.connect)(l,null)(u))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchOneSong=function(e){return $.ajax({method:"GET",url:"api/songs/"+e})},t.createSong=function(e){return $.ajax({method:"POST",url:"api/songs",data:e,contentType:!1,processData:!1})},t.updateSong=function(e,t){return $.ajax({method:"PATCH",url:"api/songs/"+t,data:e,contentType:!1,processData:!1})},t.updateSongCount=function(e){return $.ajax({method:"PATCH",url:"api/songs/"+e,data:{token:"addcount",id:e}})},t.fetchSongs=function(){return $.ajax({method:"GET",url:"api/songs"})},t.fetchChartSongs=function(e,t){return $.ajax({method:"GET",url:"api/songs",data:{token:"chart",num:e,genre:t}})},t.fetchLikedSongs=function(){return $.ajax({method:"GET",url:"api/songs",data:{token:"likes"}})},t.searchSongs=function(e){return $.ajax({method:"GET",url:"api/songs",data:{token:"search",query:e}})},t.fetchSongByTitle=function(e){return $.ajax({method:"GET",url:"api/songs/show2/"+e})},t.fetchSongByUserID=function(e){return $.ajax({method:"GET",url:"api/songs/userfind/"+e})},t.deleteSong=function(e){return $.ajax({method:"DELETE",url:"api/songs/"+e.id})}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(4),f=n(40),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={username:"",password:"",imageFile:null,imageUrl:null},n.handleSubmit=n.handleSubmit.bind(n),n.updateFile=n.updateFile.bind(n),n.guestLogin=n.guestLogin.bind(n),n}return i(t,e),s(t,[{key:"componentWillReceiveProps",value:function(e){e.loggedIn&&this.props.history.push("/")}},{key:"guestLogin",value:function(){var e={username:"Guest",password:"password"};this.props.login({user:e})}},{key:"componentWillMount",value:function(){this.props.clearErrors()}},{key:"update",value:function(e){var t=this;return function(n){return t.setState(r({},e,n.currentTarget.value))}}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state;if("login"===this.props.formType)this.props.login({user:t});else if("signup"===this.props.formType){var n=new FormData;null!==this.state.imageUrl?(n.append("user[username]",this.state.username),n.append("user[password]",this.state.password),n.append("user[avatar]",this.state.imageFile),this.props.signup(n)):(n.append("user[username]",this.state.username),n.append("user[password]",this.state.password),this.props.signupnormal(this.state))}}},{key:"updateFile",value:function(e){var t=e.currentTarget.files[0],n=new FileReader,r=this;n.onloadend=function(){return r.setState({imageFile:t,imageUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"displayErrors",value:function(){return l.default.createElement("ul",{className:"errorsul"},this.props.errors.map(function(e,t){return l.default.createElement("li",{key:"error-"+t}," ",e," ")}))}},{key:"render",value:function(){var e=void 0;e="signup"===this.props.formType?"Create an account":"Continue";"signup"===this.props.formType?this.state.username:this.state.username;var t=void 0,n=void 0;return"signup"==this.props.formType&&(t=l.default.createElement("input",{type:"file",onChange:this.updateFile,className:"filestyle","data-buttonText":"Upload an Avatar!"}),n=l.default.createElement("img",{className:"uploadavatarimage",src:this.state.imageUrl}),$(":file").filestyle({buttonText:"Upload an Avatar",input:!1,buttonBefore:!0})),l.default.createElement("div",{className:"session-form-container"},l.default.createElement("button",{className:"demo-login",onClick:this.guestLogin},"Continue as a Guest"),l.default.createElement("h2",{className:"divider"},"or"),l.default.createElement("form",{onSubmit:this.handleSubmit,className:"session-form-form"},l.default.createElement("div",{className:"session-form"},l.default.createElement("br",null),l.default.createElement("input",{type:"text",value:this.state.username,onChange:this.update("username"),className:"login-input",placeholder:"Username"}),l.default.createElement("br",null),l.default.createElement("input",{type:"password",value:this.state.password,onChange:this.update("password"),className:"login-input",placeholder:"Password"}),l.default.createElement("br",null),l.default.createElement("span",{className:"imagepreviewonform"},t," ",n),l.default.createElement("br",null),this.displayErrors(),l.default.createElement("button",{onClick:this.handleSubmit,className:"auth-form-button"},e))),l.default.createElement("p",{className:"disclaimer-form"},"Please note that this site is being used only for educational and portfolio purposes. I will not use any information or any music on this site for commercial purposes."))}}]),t}(l.default.Component),d=function(e){var t=e.session;return{loggedIn:Boolean(t.currentUser),errors:t.errors}},h=function(e,t){t.location;return{clearErrors:function(){return e((0,f.clearErrors)())},login:function(t){return e((0,f.login)(t))},signup:function(t){return e((0,f.signup)(t))},signupnormal:function(t){return e((0,f.signupnormal)(t))}}};t.default=(0,c.connect)(d,h)(p)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),i(t,[{key:"render",value:function(){return!1===this.props.isOpen?null:u.default.createElement("div",{className:"modal-overall-container"},u.default.createElement("div",{className:"modal-children-container"},this.props.children))}},{key:"close",value:function(e){e.preventDefault(),this.props.onClose()}}]),t}(u.default.Component);t.default=l},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(5),f=n(4),p=n(40),d=n(9),h=n(11),m=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.wildcard="/"+n.props.currentUser.id,n.results=null,n.logout=n.props.logout.bind(n),n.update=n.update.bind(n),n.search=n.search.bind(n),n.queryusers=null,n.querysongs=null,n.searchKeypress=n.searchKeypress.bind(n),n.songs={},n.users={},n.state={query:""},n}return i(t,e),s(t,[{key:"search",value:function(){this.setState({query:""}),this.props.history.push("/search?q="+this.state.query)}},{key:"searchKeypress",value:function(e){"Enter"===e.key&&(this.setState({query:""}),this.props.history.push("/search?q="+this.state.query))}},{key:"update",value:function(e){var t=this;return this.querysongs=Object.keys(this.songs).filter(function(e){return e.toLowerCase().includes(t.state.query.toLowerCase())}).map(function(e){return l.default.createElement("li",{className:"navbar-search-item",onClick:function(){t.props.history.push("/"+t.songs[e]+"/"+e),t.setState({query:""})}},e)}),this.queryusers=Object.keys(this.users).filter(function(e){return e.toLowerCase().includes(t.state.query.toLowerCase())}).map(function(e){return l.default.createElement("li",{className:"navbar-search-item",onClick:function(){t.props.history.push("/"+e),t.setState({query:""})}},e)}),""!==this.state.query?this.results=l.default.createElement("ul",{className:"navbar-search-dropdown-ul"},l.default.createElement("li",{className:"navbar-search-dropdown-header-1",onClick:this.search},"Search for ",l.default.createElement("q",null,this.state.query)),l.default.createElement("li",{className:"navbar-search-dropdown-header"},this.querysongs.length>0?"Songs":null),this.querysongs,l.default.createElement("li",{className:"navbar-search-dropdown-header"},this.queryusers.length>0?"Users":null),this.queryusers):this.results=null,function(n){return t.setState(r({},e,n.currentTarget.value))}}},{key:"componentWillReceiveProps",value:function(e){for(var t=0;t<e.users.length;t++)this.users[e.users[t]]=!0;for(var t=0;t<e.songs.length;t++)this.songs[e.songs[t].title]=e.songs[t].username}},{key:"render",value:function(){return l.default.createElement("div",{className:"navbar-container"},l.default.createElement("div",{className:"navbar-color"}),l.default.createElement("nav",{className:"navbar"},l.default.createElement("ul",{className:"navigation-left"},l.default.createElement("li",{className:"navbarlogo"}," ",l.default.createElement(c.NavLink,{to:"/stream"}," ",l.default.createElement("div",{className:""})," ")," "),l.default.createElement("li",null," ",l.default.createElement(c.NavLink,{to:"/stream"}," Home ")," "),l.default.createElement("li",null," ",l.default.createElement(c.NavLink,{to:"/you/collection"}," Collection ")," ")),l.default.createElement("ul",null,l.default.createElement("input",{type:"search",placeholder:"Search",className:"nav-search",value:this.state.query,onChange:this.update("query"),onKeyPress:this.searchKeypress}),this.results),l.default.createElement("ul",{className:"navigation-right"},l.default.createElement("li",null," ",l.default.createElement(c.NavLink,{to:"/upload"}," Upload ")),l.default.createElement("li",{className:"line"}),l.default.createElement("li",{className:"user-dropdown"}," ",l.default.createElement("a",null," ",l.default.createElement("img",{src:this.props.currentUser.avatar_url,className:"nav-profile-photo"})," ",l.default.createElement("span",{className:"nav-username"},this.props.currentUser.username," ")),l.default.createElement("ul",{className:"user-dropdown-ul"},l.default.createElement("li",{className:"user-dropdown-li first-child"}," ",l.default.createElement(c.NavLink,{to:"/"+this.props.currentUser.username}," Profile ")),l.default.createElement("li",{className:"user-dropdown-li"}," ",l.default.createElement(c.NavLink,{to:"/you/likes"}," Likes ")," "),l.default.createElement("li",{className:"user-dropdown-li"}," ",l.default.createElement(c.NavLink,{to:"/you/sets"}," Playlists ")," "),l.default.createElement("li",{className:"user-dropdown-li"}," ",l.default.createElement(c.NavLink,{to:"/you/following"}," Following ")," "),l.default.createElement("li",{className:"user-dropdown-li"}," ",l.default.createElement(c.NavLink,{to:"/discover"}," Discover ")," "),l.default.createElement("li",{className:"user-dropdown-li"}," ",l.default.createElement("a",{onClick:this.logout,className:"navbar-logout"},"Logout")))))))}}]),t}(l.default.Component),v=function(e){return{currentUser:e.session.currentUser,songs:e.songs.allsongs.map(function(e){return{title:e.title,username:e.user.username}}),users:e.users.allusers.map(function(e){return e.username})}},g=function(e){return{logout:function(){return e((0,p.logout)())},clearUsers:function(){return e((0,d.clearUsers)())},removeSongs:function(){return e((0,h.removeSongs)())}}};t.default=(0,f.connect)(v,g)(m)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(11),p=n(9),d=n(16),h=n(4),m=n(76),v=r(m),g=n(32),y=n(22),b=n(131),E=r(b),w=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.likes=[],n.user,n.newfollows={},n.donefollows={},n}return i(t,e),s(t,[{key:"componentDidMount",value:function(){var e=this;this.user||this.props.fetchOneUser(this.props.currentUser.username).then(function(t){e.user=t.user,e.props.fetchUsers();for(var n=0;n<e.user.followed_user_ids.length;n++)e.props.fetchSongsByUserID(e.user.followed_user_ids[n])}),this.props.fetchLikes(),Math.random()<.5&&($(".sidebar-feature")[0].style.display="none")}},{key:"componentWillReceiveProps",value:function(e){for(var t=0;t<e.allfollows.length;t++)this.newfollows[e.allfollows[t].id]=e.allfollows[t];for(var n=Object.keys(this.newfollows).map(function(e){return parseInt(e)}),r=e.allfollows.map(function(e){return e.id}),t=0;t<n.length;t++)if(!1===r.includes(n[t])){var o=this.newfollows[n[t].toString()].followee_id;delete this.newfollows[n[t].toString()];for(var a=this.props.allsongs,t=0;t<a.length;t++)a[t].user_id===o&&this.props.removeSong(a[t])}if(Object.keys(this.newfollows).length>0)for(var i=Object.values(this.newfollows),t=0;t<i.length;t++)this.donefollows[i[t].id]||(e.fetchOneUserByID(i[t].followee_id),e.fetchSongsByUserID(i[t].followee_id),this.donefollows[i[t].id]=!0)}},{key:"componentWillUnmount",value:function(){this.props.removeSongs(),this.props.clearUsers(),this.props.removeFollows(),this.props.removeLikes()}},{key:"render",value:function(){var e=this,t=[];return this.props.likes.length>0&&(t=this.props.likes),l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/stream"},"Stream")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/charts"},"Charts")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/discover"},"Discover"))))),l.default.createElement("section",{className:"songindexlist"},l.default.createElement("h2",{className:"streamheader"},"Hear the latest posts from the people you’re following: "),l.default.createElement("ul",null,this.props.allsongs.slice(0,10).map(function(n){return l.default.createElement("li",{key:"song_"+n.id,className:"indexlist"},l.default.createElement(v.default,{likes:t.filter(function(e){return e.song_id===n.id}),waveformid:n.id,song:n,user:e.props.usersbyID[n.user_id]}))}))),l.default.createElement(E.default,{currentUser:this.user}))}}]),t}(l.default.Component),_=function(e){return{byUsername:e.songs.byUsername,allsongs:e.songs.allsongs,usersbyID:e.users.byID,audio:e.audio,likes:e.likes.alllikes,currentUser:e.session.currentUser,allfollows:e.follows.allfollows}},k=function(e){return{fetchSongs:function(){return e((0,f.fetchSongs)())},removeSongs:function(){return e((0,f.removeSongs)())},fetchUsers:function(){return e((0,p.fetchUsers)())},clearUsers:function(){return e((0,p.clearUsers)())},removeAudioToken:function(){return e((0,d.removeAudioToken)())},fetchLikes:function(){return e((0,g.fetchLikes)())},removeLikes:function(){return e((0,g.removeLikes)())},fetchCurrentUserFollows:function(){return e((0,y.fetchCurrentUserFollows)())},removeFollows:function(){return e((0,y.removeFollows)())},fetchSongsByUserID:function(t){return e((0,f.fetchSongsByUserID)(t))},fetchOneUser:function(t){return e((0,p.fetchOneUser)(t))},fetchOneUserByID:function(t){return e((0,p.fetchOneUserByID)(t))},removeSong:function(t){return e((0,f.removeSong)(t))}}};t.default=(0,h.connect)(_,k)(w)},function(e,t,n){!function(t,r){e.exports=r(n(0),n(288))}(0,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return e.split("-").map(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}).join("")}function u(e,t,n){var r=e[t];return void 0!==r&&("number"!=typeof r||r!==parseInt(r,10)||r<0)?new Error("Invalid "+t+" supplied to "+n+",\n      expected a positive integer"):null}Object.defineProperty(t,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(3),p=r(f),d=n(1),h=r(d),m=n(4),v=["audioprocess","error","finish","loading","mouseup","pause","play","ready","scroll","seek","zoom"],g=function(e){return function(){var t=void 0;t||(t=setTimeout(function(){t=null,e()},66))}},y=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));if(n.state={isReady:!1},void 0===(void 0===m?"undefined":l(m)))throw new Error("WaveSurfer is undefined!");return n._wavesurfer=Object.create(m),n._loadMediaElt=n._loadMediaElt.bind(n),n._loadAudio=n._loadAudio.bind(n),n._seekTo=n._seekTo.bind(n),n.props.responsive&&(n._handleResize=g(function(){n.props.playing&&n._wavesurfer.pause(),n._wavesurfer.drawBuffer(),n.state.isReady&&n._seekTo(n.props.pos),n.props.playing&&n._wavesurfer.play()})),n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this,t=(0,h.default)({},this.props.options,{container:this.wavesurferEl});this.props.mediaElt&&(t.backend="MediaElement"),this._wavesurfer.init(t),this._wavesurfer.on("ready",function(){e.setState({isReady:!0,pos:e.props.pos}),e.props.pos&&e._seekTo(e.props.pos),e.props.volume&&e._wavesurfer.setVolume(e.props.volume),e.props.zoom&&e._wavesurfer.zoom(e.props.zoom)}),this._wavesurfer.on("audioprocess",function(t){e.setState({pos:t}),e.props.onPosChange({wavesurfer:e._wavesurfer,originalArgs:[t]})}),this._wavesurfer.on("seek",function(t){var n=e._posToSec(t);e.setState({formattedPos:n}),e.props.onPosChange({wavesurfer:e._wavesurfer,originalArgs:[n]})}),v.forEach(function(t){var n=e.props["on"+s(t)],r=e._wavesurfer;n&&e._wavesurfer.on(t,function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];n({wavesurfer:r,originalArgs:t})})}),this.props.audioFile&&this._loadAudio(this.props.audioFile,this.props.audioPeaks),this.props.mediaElt&&this._loadMediaElt(this.props.mediaElt,this.props.audioPeaks),this.props.responsive&&window.addEventListener("resize",this._handleResize,!1)}},{key:"componentWillReceiveProps",value:function(e){this.props.audioFile!==e.audioFile&&this._loadAudio(e.audioFile,e.audioPeaks),this.props.mediaElt!==e.mediaElt&&this._loadMediaElt(e.mediaElt,e.audioPeaks),this.props.audioPeaks!==e.audioPeaks&&(e.mediaElt?this._loadMediaElt(e.mediaElt,e.audioPeaks):this._loadAudio(e.audioFile,e.audioPeaks)),e.pos&&this.state.isReady&&e.pos!==this.props.pos&&e.pos!==this.state.pos&&this._seekTo(e.pos),this.props.playing===e.playing&&this._wavesurfer.isPlaying()===e.playing||(e.playing?this._wavesurfer.play():this._wavesurfer.pause()),this.props.volume!==e.volume&&this._wavesurfer.setVolume(e.volume),this.props.zoom!==e.zoom&&this._wavesurfer.zoom(e.zoom),this.props.options.audioRate!==e.options.audioRate&&this._wavesurfer.setPlaybackRate(e.options.audioRate),e.responsive&&this.props.responsive!==e.responsive&&window.addEventListener("resize",this._handleResize,!1),e.responsive||this.props.responsive===e.responsive||window.removeEventListener("resize",this._handleResize)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"componentWillUnmount",value:function(){var e=this;v.forEach(function(t){e._wavesurfer.un(t)}),this._wavesurfer.destroy(),this.props.responsive&&window.removeEventListener("resize",this._handleResize)}},{key:"_secToPos",value:function(e){return 1/this._wavesurfer.getDuration()*e}},{key:"_posToSec",value:function(e){return e*this._wavesurfer.getDuration()}},{key:"_seekTo",value:function(e){var t=this._secToPos(e);this.props.options.autoCenter?this._wavesurfer.seekAndCenter(t):this._wavesurfer.seekTo(t)}},{key:"_loadMediaElt",value:function(e,t){if(e instanceof window.HTMLElement)this._loadAudio(e,t);else{if(!window.document.querySelector(e))throw new Error("Media Element not found!");this._loadAudio(window.document.querySelector(e),t)}}},{key:"_loadAudio",value:function(e,t){if(e instanceof window.HTMLElement)this._wavesurfer.loadMediaElement(e,t);else if("string"==typeof e)this._wavesurfer.load(e,t);else{if(!(e instanceof window.Blob||e instanceof window.File))throw new Error("Wavesurfer._loadAudio expects prop audioFile\n        to be either HTMLElement, string or file/blob");this._wavesurfer.loadBlob(e,t)}}},{key:"render",value:function(){var e=this,t=!!this.props.children&&p.default.Children.map(this.props.children,function(t){return p.default.cloneElement(t,{wavesurfer:e._wavesurfer,isReady:e.state.isReady})});return p.default.createElement("div",null,p.default.createElement("div",{ref:function(t){e.wavesurferEl=t}}),t)}}]),t}(f.Component);y.propTypes={playing:f.PropTypes.bool,pos:f.PropTypes.number,audioFile:function(e,t,n){var r=e[t];return!r||"string"==typeof r||r instanceof window.Blob||r instanceof window.File?null:new Error("Invalid "+t+" supplied to "+n+"\n        expected either string or file/blob")},mediaElt:f.PropTypes.oneOfType([f.PropTypes.string,f.PropTypes.instanceOf(window.HTMLElement)]),audioPeaks:f.PropTypes.array,volume:f.PropTypes.number,zoom:f.PropTypes.number,responsive:f.PropTypes.bool,onPosChange:f.PropTypes.func,children:f.PropTypes.oneOfType([f.PropTypes.element,f.PropTypes.array]),options:f.PropTypes.shape({audioRate:f.PropTypes.number,backend:f.PropTypes.oneOf(["WebAudio","MediaElement"]),barWidth:function(e,t,n){var r=e[t];return void 0!==r&&"number"!=typeof r?new Error("Invalid "+t+" supplied to "+n+"\n          expected either undefined or number"):null},cursorColor:f.PropTypes.string,cursorWidth:u,dragSelection:f.PropTypes.bool,fillParent:f.PropTypes.bool,height:u,hideScrollbar:f.PropTypes.bool,interact:f.PropTypes.bool,loopSelection:f.PropTypes.bool,mediaControls:f.PropTypes.bool,minPxPerSec:u,normalize:f.PropTypes.bool,pixelRatio:f.PropTypes.number,progressColor:f.PropTypes.string,scrollParent:f.PropTypes.bool,skipLength:f.PropTypes.number,waveColor:f.PropTypes.string,autoCenter:f.PropTypes.bool})},y.defaultProps={playing:!1,pos:0,options:m.defaultParams,responsive:!0,onPosChange:function(){}},t.default=y},function(e,t,n){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Sources cannot be null or undefined");return Object(e)}function o(e,t,n){var r=t[n];if(void 0!==r&&null!==r){if(s.call(e,n)&&(void 0===e[n]||null===e[n]))throw new TypeError("Cannot convert undefined or null to object ("+n+")");s.call(e,n)&&i(r)?e[n]=a(Object(e[n]),t[n]):e[n]=r}}function a(e,t){if(e===t)return e;t=Object(t);for(var n in t)s.call(t,n)&&o(e,t,n);if(Object.getOwnPropertySymbols)for(var r=Object.getOwnPropertySymbols(t),a=0;a<r.length;a++)u.call(t,r[a])&&o(e,t,r[a]);return e}var i=n(2),s=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=function(e){e=r(e);for(var t=1;t<arguments.length;t++)a(e,arguments[t]);return e}},function(e,t){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){var t=void 0===e?"undefined":n(e);return null!==e&&("object"===t||"function"===t)}},function(t,n){t.exports=e},function(e,n){e.exports=t}])})},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=n(4),c=n(9),f=n(22),p=n(5),d=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.fetchRandomUsers(),n.followUser=n.followUser.bind(n),n.unfollowUser=n.unfollowUser.bind(n),n}return a(t,e),i(t,[{key:"followUser",value:function(e){this.props.createFollow({follow:{followee_id:e}})}},{key:"unfollowUser",value:function(e){this.props.deleteFollow({follow:{followee_id:e}})}},{key:"render",value:function(){var e=this,t=void 0;return t=this.props.toFollow.map(function(t){for(var n=u.default.createElement("button",{className:"sidebar-follow-button-follow",onClick:function(){return e.props.createFollow({follow:{followee_id:t.id}})}}," Follow "),r=0;r<e.props.allfollows.length;r++){if(e.props.allfollows[r].follower_id===e.props.currentUser.id&&e.props.allfollows[r].followee_id===t.id){n=u.default.createElement("button",{onClick:function(){return e.props.deleteFollow({follow:{followee_id:t.id}})},className:"sidebar-follow-button-unfollow"}," Unfollow ");break}n=u.default.createElement("button",{onClick:function(){return e.props.createFollow({follow:{followee_id:t.id}})},className:"sidebar-follow-button-follow"}," Follow ")}return u.default.createElement("li",{className:"sidebar-follow-li"},u.default.createElement("img",{className:"sidebar-follow-coverart",onClick:function(){return e.props.history.push("/"+t.username)},src:t.avatar_url}),u.default.createElement("div",{className:"sidebar-follow-userinfo"},u.default.createElement("div",{className:"sidebar-follow-user-username",onClick:function(){return e.props.history.push("/"+t.username)}},t.username),u.default.createElement("div",{className:"sidebar-follow-user-stats"},u.default.createElement("span",{onClick:function(){return e.props.history.push("/"+t.username)}},u.default.createElement("img",{className:"sidebar-follow-stat",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="})," ",t.followernum),u.default.createElement("span",null,u.default.createElement("img",{className:"sidebar-follow-stat",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"})," ",t.songnum),n)))}),u.default.createElement("div",{className:"sidebar"},u.default.createElement("div",{className:"sidebar-feature"},u.default.createElement("button",{className:"userpage-follow-button-follow",onClick:function(){return location.assign("http://www.amaar.me")}},"Get Invoke Unlimited")),u.default.createElement("div",{className:"sidebar-follow"},u.default.createElement("h3",{className:"sidebar-follow-title"},u.default.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="})," Who to follow"),u.default.createElement("ul",{className:"sidebar-follow-ul"},t)))}}]),t}(u.default.Component),h=function(e){return{toFollow:e.users.toFollow,newFollows:e.follows.newFollows,allfollows:e.follows.allfollows}},m=function(e){return{fetchRandomUsers:function(){return e((0,c.fetchRandomUsers)())},createFollow:function(t){return e((0,f.createFollow)(t))},deleteFollow:function(t){return e((0,f.deleteFollow)(t))}}};t.default=(0,p.withRouter)((0,l.connect)(h,m)(d))},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(11),f=n(4),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleSubmit=n.handleSubmit.bind(n),n.updateCoverart=n.updateCoverart.bind(n),n.goBack=n.goBack.bind(n),n.openCoverartUploadBox=n.openCoverartUploadBox.bind(n),n.state={title:"",description:"",genre:"",imageFile:null,imageUrl:"",loading:!1},n}return i(t,e),s(t,[{key:"componentWillReceiveProps",value:function(e){}},{key:"componentDidMount",value:function(){var e=this;this.props.fetchSongByTitle(this.props.match.params.title).then(function(){return e.setState({title:e.props.song.title,description:e.props.song.description,genre:e.props.song.genre,imageFile:null,imageUrl:e.props.song.cover_art_url,loading:!1})})}},{key:"updateCoverart",value:function(e){e.preventDefault();var t=e.currentTarget.files[1],n=new FileReader,r=this;n.onloadend=function(){return r.setState({imageFile:t,imageUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"updateTrack",value:function(e){e.preventDefault();var t=e.currentTarget.files[0],n=new FileReader,r=this;n.onloadend=function(){return r.setState({songFile:t,songUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"goBack",value:function(e){e.preventDefault(),console.log("hello"),this.props.history.goBack()}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("song[title]",this.state.title),n.append("song[genre]",this.state.genre),n.append("song[description]",this.state.description),this.props.song.cover_art_url!==this.state.imageUrl&&n.append("song[cover_art]",this.state.imageFile),this.props.updateSong(n,this.props.song.id).then(function(){return t.props.history.push("/"+t.props.currentUser+"/"+t.state.title)}),this.setState({loading:!0})}},{key:"update",value:function(e){var t=this;return function(n){return t.setState(r({},e,n.currentTarget.value))}}},{key:"openCoverartUploadBox",value:function(e){e.preventDefault(),this.imagebutton.click()}},{key:"updateCoverart",value:function(e){e.preventDefault();var t=e.currentTarget.files[0],n=new FileReader,r=this;n.onloadend=function(){return r.setState({imageFile:t,imageUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"render",value:function(){var e=this;if(this.props.song){var t=(this.state.title,"invoke-.herokuapp.com/"+this.props.currentUser+"/"+this.state.title),n=void 0,r=void 0;return n=l.default.createElement("input",{type:"file",onChange:this.updateCoverart,className:"uploadsong-imageselectbutton","data-buttonText":"Upload an image!",ref:function(t){return e.imagebutton=t}}),r=l.default.createElement("img",{className:"uploadsong-imagepreview",src:this.state.imageUrl}),l.default.createElement("div",{className:"centerer"},l.default.createElement("div",{className:"upload-form-container"},l.default.createElement("div",{className:"upload-div"},l.default.createElement("form",{onSubmit:this.handleSubmit,className:"upload-form-form"},l.default.createElement("div",{className:"form-content"},l.default.createElement("div",{className:"upload-image-section"}," ",n," ",l.default.createElement("button",{className:"spoof-imageupload",ref:function(t){return e.imagespoofbutton=t},onClick:this.openCoverartUploadBox},"Choose your Cover Art")," ",r),l.default.createElement("div",{className:"typing-fields"},l.default.createElement("ul",{className:"upload-list"},l.default.createElement("li",{className:"title"}," Title",l.default.createElement("input",{type:"text",value:this.state.title,onChange:this.update("title"),className:"upload-input",placeholder:"Name your track"})),l.default.createElement("li",{className:"future-url"},t),l.default.createElement("li",{className:"genre"}," Genre",l.default.createElement("input",{type:"text",value:this.state.genre,onChange:this.update("genre"),className:"upload-input",placeholder:"eg:Rock"})),l.default.createElement("li",null," Description",l.default.createElement("textarea",{className:"description",rows:"6",onChange:this.update("description"),placeholder:"Describe your track"}))),l.default.createElement("div",{className:"uploadbuttons"},l.default.createElement("button",{onClick:this.handleSubmit,className:"upload-form-button"},"Save"),l.default.createElement("button",{onClick:this.goBack,className:"backbutton"},"Cancel"))))))))}return l.default.createElement("h1",null,"loading")}}]),t}(l.default.Component),d=function(e,t){return{loggedIn:Boolean(e.session.currentUser),currentUser:e.session.currentUser.username,song:e.songs.byTitle[t.match.params.title]}},h=function(e,t){t.location;return{updateSong:function(t,n){return e((0,c.updateSong)(t,n))},fetchSongByTitle:function(t){return e((0,c.fetchSongByTitle)(t))}}};t.default=(0,f.connect)(d,h)(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(0),a=r(o),i=n(148),s=r(i),u=n(234),l=r(u),c=n(308),f=r(c);n(11),n(125),n(9);document.addEventListener("DOMContentLoaded",function(){var e=void 0;if(window.currentUser){var t={session:{currentUser:window.currentUser}};e=(0,f.default)(t),delete window.currentUser}else e=(0,f.default)();var n=document.getElementById("root");s.default.render(a.default.createElement(l.default,{store:e}),n)})},function(e,t,n){"use strict";function r(e){return(""+e).replace(E,"$&/")}function o(e,t){this.func=e,this.context=t,this.count=0}function a(e,t,n){var r=e.func,o=e.context;r.call(o,t,e.count++)}function i(e,t,n){if(null==e)return e;var r=o.getPooled(t,n);g(e,a,r),o.release(r)}function s(e,t,n,r){this.result=e,this.keyPrefix=t,this.func=n,this.context=r,this.count=0}function u(e,t,n){var o=e.result,a=e.keyPrefix,i=e.func,s=e.context,u=i.call(s,t,e.count++);Array.isArray(u)?l(u,o,n,v.thatReturnsArgument):null!=u&&(m.isValidElement(u)&&(u=m.cloneAndReplaceKey(u,a+(!u.key||t&&t.key===u.key?"":r(u.key)+"/")+n)),o.push(u))}function l(e,t,n,o,a){var i="";null!=n&&(i=r(n)+"/");var l=s.getPooled(t,i,o,a);g(e,u,l),s.release(l)}function c(e,t,n){if(null==e)return e;var r=[];return l(e,r,null,t,n),r}function f(e,t,n){return null}function p(e,t){return g(e,f,null)}function d(e){var t=[];return l(e,t,null,v.thatReturnsArgument),t}var h=n(135),m=n(23),v=n(13),g=n(136),y=h.twoArgumentPooler,b=h.fourArgumentPooler,E=/\/+/g;o.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},h.addPoolingTo(o,y),s.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},h.addPoolingTo(s,b);var w={forEach:i,map:c,mapIntoWithKeyPrefixInternal:l,count:p,toArray:d};e.exports=w},function(e,t,n){"use strict";var r=(n(27),n(1)),o=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},a=function(e,t){var n=this;if(n.instancePool.length){var r=n.instancePool.pop();return n.call(r,e,t),r}return new n(e,t)},i=function(e,t,n){var r=this;if(r.instancePool.length){var o=r.instancePool.pop();return r.call(o,e,t,n),o}return new r(e,t,n)},s=function(e,t,n,r){var o=this;if(o.instancePool.length){var a=o.instancePool.pop();return o.call(a,e,t,n,r),a}return new o(e,t,n,r)},u=function(e){var t=this;e instanceof t||r(!1,"Trying to release an instance into a pool of a different type."),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},l=o,c=function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||l,n.poolSize||(n.poolSize=10),n.release=u,n},f={addPoolingTo:c,oneArgumentPooler:o,twoArgumentPooler:a,threeArgumentPooler:i,fourArgumentPooler:s};e.exports=f},function(e,t,n){"use strict";function r(e,t){return e&&"object"==typeof e&&null!=e.key?c.escape(e.key):t.toString(36)}function o(e,t,n,a){var m=typeof e;if("undefined"!==m&&"boolean"!==m||(e=null),null===e||"string"===m||"number"===m||"object"===m&&e.$$typeof===s)return n(a,e,""===t?p+r(e,0):t),1;var v,g,y=0,b=""===t?p:t+d;if(Array.isArray(e))for(var E=0;E<e.length;E++)v=e[E],g=b+r(v,E),y+=o(v,g,n,a);else{var w=u(e);if(w){var _,k=w.call(e);if(w!==e.entries)for(var C=0;!(_=k.next()).done;)v=_.value,g=b+r(v,C++),y+=o(v,g,n,a);else{var S="";if(i.current){var x=i.current.getName();x&&(S=" Check the render method of `"+x+"`.")}for(f(h,"Using Maps as children is not yet fully supported. It is an experimental feature that might be removed. Convert it to a sequence / iterable of keyed ReactElements instead.%s",S),h=!0;!(_=k.next()).done;){var P=_.value;P&&(v=P[1],g=b+c.escape(P[0])+d+r(v,0),y+=o(v,g,n,a))}}}else if("object"===m){var T="";if(T=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.",e._isReactElement&&(T=" It looks like you're using an element created by a different version of React. Make sure to use only one copy of React."),i.current){var O=i.current.getName();O&&(T+=" Check the render method of `"+O+"`.")}var N=String(e);l(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===N?"object with keys {"+Object.keys(e).join(", ")+"}":N,T)}}return y}function a(e,t,n){return null==e?0:o(e,"",t,n)}var i=(n(27),n(17)),s=n(81),u=n(82),l=n(1),c=n(137),f=n(2),p=".",d=":",h=!1;e.exports=a},function(e,t,n){"use strict";function r(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function o(e){var t=/(=0|=2)/g,n={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(t,function(e){return n[e]})}var a={escape:r,unescape:o};e.exports=a},function(e,t,n){"use strict";var r=n(23),o=r.createFactory;o=n(83).createFactory;var a={a:o("a"),abbr:o("abbr"),address:o("address"),area:o("area"),article:o("article"),aside:o("aside"),audio:o("audio"),b:o("b"),base:o("base"),bdi:o("bdi"),bdo:o("bdo"),big:o("big"),blockquote:o("blockquote"),body:o("body"),br:o("br"),button:o("button"),canvas:o("canvas"),caption:o("caption"),cite:o("cite"),code:o("code"),col:o("col"),colgroup:o("colgroup"),data:o("data"),datalist:o("datalist"),dd:o("dd"),del:o("del"),details:o("details"),dfn:o("dfn"),dialog:o("dialog"),div:o("div"),dl:o("dl"),dt:o("dt"),em:o("em"),embed:o("embed"),fieldset:o("fieldset"),figcaption:o("figcaption"),figure:o("figure"),footer:o("footer"),form:o("form"),h1:o("h1"),h2:o("h2"),h3:o("h3"),h4:o("h4"),h5:o("h5"),h6:o("h6"),head:o("head"),header:o("header"),hgroup:o("hgroup"),hr:o("hr"),html:o("html"),i:o("i"),iframe:o("iframe"),img:o("img"),input:o("input"),ins:o("ins"),kbd:o("kbd"),keygen:o("keygen"),label:o("label"),legend:o("legend"),li:o("li"),link:o("link"),main:o("main"),map:o("map"),mark:o("mark"),menu:o("menu"),menuitem:o("menuitem"),meta:o("meta"),meter:o("meter"),nav:o("nav"),noscript:o("noscript"),object:o("object"),ol:o("ol"),optgroup:o("optgroup"),option:o("option"),output:o("output"),p:o("p"),param:o("param"),picture:o("picture"),pre:o("pre"),progress:o("progress"),q:o("q"),rp:o("rp"),rt:o("rt"),ruby:o("ruby"),s:o("s"),samp:o("samp"),script:o("script"),section:o("section"),select:o("select"),small:o("small"),source:o("source"),span:o("span"),strong:o("strong"),style:o("style"),sub:o("sub"),summary:o("summary"),sup:o("sup"),table:o("table"),tbody:o("tbody"),td:o("td"),textarea:o("textarea"),tfoot:o("tfoot"),th:o("th"),thead:o("thead"),time:o("time"),title:o("title"),tr:o("tr"),track:o("track"),u:o("u"),ul:o("ul"),var:o("var"),video:o("video"),wbr:o("wbr"),circle:o("circle"),clipPath:o("clipPath"),defs:o("defs"),ellipse:o("ellipse"),g:o("g"),image:o("image"),line:o("line"),linearGradient:o("linearGradient"),mask:o("mask"),path:o("path"),pattern:o("pattern"),polygon:o("polygon"),polyline:o("polyline"),radialGradient:o("radialGradient"),rect:o("rect"),stop:o("stop"),svg:o("svg"),text:o("text"),tspan:o("tspan")};e.exports=a},function(e,t,n){"use strict";(function(t){function r(e,t,r,c,f,p){for(var d in e)if(e.hasOwnProperty(d)){var h;try{"function"!=typeof e[d]&&s(!1,"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",c||"React class",a[r],d),h=e[d](t,d,c,r,null,i)}catch(e){h=e}if(u(!h||h instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",c||"React class",a[r],d,typeof h),h instanceof Error&&!(h.message in l)){l[h.message]=!0;var m="";o||(o=n(12)),null!==p?m=o.getStackAddendumByID(p):null!==f&&(m=o.getCurrentStackAddendum(f)),u(!1,"Failed %s type: %s%s",r,h.message,m)}}}var o,a=(n(27),n(140)),i=n(141),s=n(1),u=n(2);void 0!==t&&Object({NODE_ENV:"development"});var l={};e.exports=r}).call(t,n(43))},function(e,t,n){"use strict";var r={};r={prop:"prop",context:"context",childContext:"child context"},e.exports=r},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r=n(23),o=r.isValidElement,a=n(84);e.exports=a(o)},function(e,t,n){"use strict";function r(e,t,n,r,u){for(var l in e)if(e.hasOwnProperty(l)){var c;try{o("function"==typeof e[l],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",r||"React class",n,l),c=e[l](t,l,r,n,null,i)}catch(e){c=e}if(a(!c||c instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,l,typeof c),c instanceof Error&&!(c.message in s)){s[c.message]=!0;var f=u?u():"";a(!1,"Failed %s type: %s%s",n,c.message,null!=f?f:"")}}}var o=n(1),a=n(2),i=n(86),s={};e.exports=r},function(e,t,n){"use strict";e.exports="15.6.1"},function(e,t,n){"use strict";var r=n(79),o=r.Component,a=n(23),i=a.isValidElement,s=n(80),u=n(146);e.exports=u(o,i,s)},function(e,t,n){"use strict";function r(e){return e}function o(e,t,n){function o(e,t,n){for(var r in t)t.hasOwnProperty(r)&&l("function"==typeof t[r],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",e.displayName||"ReactClass",a[n],r)}function f(e,t){var n=w.hasOwnProperty(t)?w[t]:null;S.hasOwnProperty(t)&&u("OVERRIDE_BASE"===n,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",t),e&&u("DEFINE_MANY"===n||"DEFINE_MANY_MERGED"===n,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",t)}function p(e,n){if(!n){var r=typeof n;return void l("object"===r&&null!==n,"%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.",e.displayName||"ReactClass",null===n?null:r)}u("function"!=typeof n,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),u(!t(n),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var o=e.prototype,a=o.__reactAutoBindPairs;n.hasOwnProperty(c)&&_.mixins(e,n.mixins);for(var i in n)if(n.hasOwnProperty(i)&&i!==c){var s=n[i],p=o.hasOwnProperty(i);if(f(p,i),_.hasOwnProperty(i))_[i](e,s);else{var d=w.hasOwnProperty(i),h="function"==typeof s,g=h&&!d&&!p&&!1!==n.autobind;if(g)a.push(i,s),o[i]=s;else if(p){var y=w[i];u(d&&("DEFINE_MANY_MERGED"===y||"DEFINE_MANY"===y),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",y,i),"DEFINE_MANY_MERGED"===y?o[i]=m(o[i],s):"DEFINE_MANY"===y&&(o[i]=v(o[i],s))}else o[i]=s,"function"==typeof s&&n.displayName&&(o[i].displayName=n.displayName+"_"+i)}}}function d(e,t){if(t)for(var n in t){var r=t[n];if(t.hasOwnProperty(n)){var o=n in _;u(!o,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',n);var a=n in e;u(!a,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",n),e[n]=r}}}function h(e,t){u(e&&t&&"object"==typeof e&&"object"==typeof t,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var n in t)t.hasOwnProperty(n)&&(u(void 0===e[n],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",n),e[n]=t[n]);return e}function m(e,t){return function(){var n=e.apply(this,arguments),r=t.apply(this,arguments);if(null==n)return r;if(null==r)return n;var o={};return h(o,n),h(o,r),o}}function v(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function g(e,t){var n=t.bind(e);n.__reactBoundContext=e,n.__reactBoundMethod=t,n.__reactBoundArguments=null;var r=e.constructor.displayName,o=n.bind;return n.bind=function(a){for(var i=arguments.length,s=Array(i>1?i-1:0),u=1;u<i;u++)s[u-1]=arguments[u];if(a!==e&&null!==a)l(!1,"bind(): React component methods may only be bound to the component instance. See %s",r);else if(!s.length)return l(!1,"bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s",r),n;var c=o.apply(n,arguments);return c.__reactBoundContext=e,c.__reactBoundMethod=t,c.__reactBoundArguments=s,c},n}function y(e){for(var t=e.__reactAutoBindPairs,n=0;n<t.length;n+=2){var r=t[n],o=t[n+1];e[r]=g(e,o)}}function b(e){var t=r(function(e,r,o){l(this instanceof t,"Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"),this.__reactAutoBindPairs.length&&y(this),this.props=e,this.context=r,this.refs=s,this.updater=o||n,this.state=null;var a=this.getInitialState?this.getInitialState():null;void 0===a&&this.getInitialState._isMockFunction&&(a=null),u("object"==typeof a&&!Array.isArray(a),"%s.getInitialState(): must return an object or null",t.displayName||"ReactCompositeComponent"),this.state=a});t.prototype=new x,t.prototype.constructor=t,t.prototype.__reactAutoBindPairs=[],E.forEach(p.bind(null,t)),p(t,k),p(t,e),p(t,C),t.getDefaultProps&&(t.defaultProps=t.getDefaultProps()),t.getDefaultProps&&(t.getDefaultProps.isReactClassApproved={}),t.prototype.getInitialState&&(t.prototype.getInitialState.isReactClassApproved={}),u(t.prototype.render,"createClass(...): Class specification must implement a `render` method."),l(!t.prototype.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",e.displayName||"A component"),l(!t.prototype.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",e.displayName||"A component");for(var o in w)t.prototype[o]||(t.prototype[o]=null);return t}var E=[],w={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},_={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t)for(var n=0;n<t.length;n++)p(e,t[n])},childContextTypes:function(e,t){o(e,t,"childContext"),e.childContextTypes=i({},e.childContextTypes,t)},contextTypes:function(e,t){o(e,t,"context"),e.contextTypes=i({},e.contextTypes,t)},getDefaultProps:function(e,t){e.getDefaultProps?e.getDefaultProps=m(e.getDefaultProps,t):e.getDefaultProps=t},propTypes:function(e,t){o(e,t,"prop"),e.propTypes=i({},e.propTypes,t)},statics:function(e,t){d(e,t)},autobind:function(){}},k={componentDidMount:function(){this.__isMounted=!0}},C={componentWillUnmount:function(){this.__isMounted=!1}},S={replaceState:function(e,t){this.updater.enqueueReplaceState(this,e,t)},isMounted:function(){return l(this.__didWarnIsMounted,"%s: isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",this.constructor&&this.constructor.displayName||this.name||"Component"),this.__didWarnIsMounted=!0,!!this.__isMounted}},x=function(){};return i(x.prototype,e.prototype,S),b}var a,i=n(6),s=n(42),u=n(1),l=n(2),c="mixins";a={prop:"prop",context:"context",childContext:"child context"},e.exports=o},function(e,t,n){"use strict";function r(e){return o.isValidElement(e)||a(!1,"React.Children.only expected to receive a single React element child."),e}var o=(n(27),n(23)),a=n(1);e.exports=r},function(e,t,n){"use strict";e.exports=n(149)},function(e,t,n){"use strict";var r=n(7),o=n(150),a=n(110),i=n(28),s=n(18),u=n(228),l=n(229),c=n(111),f=n(230),p=n(2);o.inject();var d={findDOMNode:l,render:a.render,unmountComponentAtNode:a.unmountComponentAtNode,version:u,unstable_batchedUpdates:s.batchedUpdates,unstable_renderSubtreeIntoContainer:f};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ComponentTree:{getClosestInstanceFromNode:r.getClosestInstanceFromNode,getNodeFromInstance:function(e){return e._renderedComponent&&(e=c(e)),e?r.getNodeFromInstance(e):null}},Mount:a,Reconciler:i}),n(8).canUseDOM&&window.top===window.self){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&(navigator.userAgent.indexOf("Chrome")>-1&&-1===navigator.userAgent.indexOf("Edge")||navigator.userAgent.indexOf("Firefox")>-1)){var h=-1===window.location.protocol.indexOf("http")&&-1===navigator.userAgent.indexOf("Firefox");console.debug("Download the React DevTools "+(h?"and use an HTTP server (instead of a file: URL) ":"")+"for a better development experience: https://fb.me/react-devtools")}var m=function(){};p(-1!==(m.name||m.toString()).indexOf("testFn"),"It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details."),p(!(document.documentMode&&document.documentMode<8),'Internet Explorer is running in compatibility mode; please add the following tag to your HTML to prevent this from happening: <meta http-equiv="X-UA-Compatible" content="IE=edge" />');for(var v=[Array.isArray,Array.prototype.every,Array.prototype.forEach,Array.prototype.indexOf,Array.prototype.map,Date.now,Function.prototype.bind,Object.keys,String.prototype.trim],g=0;g<v.length;g++)if(!v[g]){p(!1,"One or more ES5 shims expected by React are not available: https://fb.me/react-warning-polyfills");break}}var y=n(14),b=n(231),E=n(232),w=n(233);y.debugTool.addHook(b),y.debugTool.addHook(E),y.debugTool.addHook(w),e.exports=d},function(e,t,n){"use strict";function r(){k||(k=!0,y.EventEmitter.injectReactEventListener(g),y.EventPluginHub.injectEventPluginOrder(s),y.EventPluginUtils.injectComponentTree(p),y.EventPluginUtils.injectTreeTraversal(h),y.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:_,EnterLeaveEventPlugin:u,ChangeEventPlugin:i,SelectEventPlugin:w,BeforeInputEventPlugin:a}),y.HostComponent.injectGenericComponentClass(f),y.HostComponent.injectTextComponentClass(m),y.DOMProperty.injectDOMPropertyConfig(o),y.DOMProperty.injectDOMPropertyConfig(l),y.DOMProperty.injectDOMPropertyConfig(E),y.EmptyComponent.injectEmptyComponentFactory(function(e){return new d(e)}),y.Updates.injectReconcileTransaction(b),y.Updates.injectBatchingStrategy(v),y.Component.injectEnvironment(c))}var o=n(151),a=n(152),i=n(156),s=n(164),u=n(165),l=n(166),c=n(167),f=n(173),p=n(7),d=n(199),h=n(200),m=n(201),v=n(202),g=n(203),y=n(205),b=n(206),E=n(212),w=n(213),_=n(214),k=!1;e.exports={inject:r}},function(e,t,n){"use strict";var r={Properties:{"aria-current":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},DOMAttributeNames:{},DOMPropertyNames:{}};e.exports=r},function(e,t,n){"use strict";function r(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function o(e){switch(e){case"topCompositionStart":return S.compositionStart;case"topCompositionEnd":return S.compositionEnd;case"topCompositionUpdate":return S.compositionUpdate}}function a(e,t){return"topKeyDown"===e&&t.keyCode===y}function i(e,t){switch(e){case"topKeyUp":return-1!==g.indexOf(t.keyCode);case"topKeyDown":return t.keyCode!==y;case"topKeyPress":case"topMouseDown":case"topBlur":return!0;default:return!1}}function s(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}function u(e,t,n,r){var u,l;if(b?u=o(e):P?i(e,n)&&(u=S.compositionEnd):a(e,n)&&(u=S.compositionStart),!u)return null;_&&(P||u!==S.compositionStart?u===S.compositionEnd&&P&&(l=P.getData()):P=h.getPooled(r));var c=m.getPooled(u,t,n,r);if(l)c.data=l;else{var f=s(n);null!==f&&(c.data=f)}return p.accumulateTwoPhaseDispatches(c),c}function l(e,t){switch(e){case"topCompositionEnd":return s(t);case"topKeyPress":return t.which!==k?null:(x=!0,C);case"topTextInput":var n=t.data;return n===C&&x?null:n;default:return null}}function c(e,t){if(P){if("topCompositionEnd"===e||!b&&i(e,t)){var n=P.getData();return h.release(P),P=null,n}return null}switch(e){case"topPaste":return null;case"topKeyPress":return t.which&&!r(t)?String.fromCharCode(t.which):null;case"topCompositionEnd":return _?null:t.data;default:return null}}function f(e,t,n,r){var o;if(!(o=w?l(e,n):c(e,n)))return null;var a=v.getPooled(S.beforeInput,t,n,r);return a.data=o,p.accumulateTwoPhaseDispatches(a),a}var p=n(33),d=n(8),h=n(153),m=n(154),v=n(155),g=[9,13,27,32],y=229,b=d.canUseDOM&&"CompositionEvent"in window,E=null;d.canUseDOM&&"documentMode"in document&&(E=document.documentMode);var w=d.canUseDOM&&"TextEvent"in window&&!E&&!function(){var e=window.opera;return"object"==typeof e&&"function"==typeof e.version&&parseInt(e.version(),10)<=12}(),_=d.canUseDOM&&(!b||E&&E>8&&E<=11),k=32,C=String.fromCharCode(k),S={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:["topBlur","topCompositionEnd","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:["topBlur","topCompositionStart","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:["topBlur","topCompositionUpdate","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]}},x=!1,P=null,T={eventTypes:S,extractEvents:function(e,t,n,r){return[u(e,t,n,r),f(e,t,n,r)]}};e.exports=T},function(e,t,n){"use strict";function r(e){this._root=e,this._startText=this.getText(),this._fallbackText=null}var o=n(6),a=n(24),i=n(90);o(r.prototype,{destructor:function(){this._root=null,this._startText=null,this._fallbackText=null},getText:function(){return"value"in this._root?this._root.value:this._root[i()]},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,r=n.length,o=this.getText(),a=o.length;for(e=0;e<r&&n[e]===o[e];e++);var i=r-e;for(t=1;t<=i&&n[r-t]===o[a-t];t++);var s=t>1?1-t:void 0;return this._fallbackText=o.slice(e,s),this._fallbackText}}),a.addPoolingTo(r),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a={data:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a={data:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n){var r=x.getPooled(I.change,e,t,n);return r.type="change",_.accumulateTwoPhaseDispatches(r),r}function o(e){var t=e.nodeName&&e.nodeName.toLowerCase();return"select"===t||"input"===t&&"file"===e.type}function a(e){var t=r(D,e,T(e));S.batchedUpdates(i,t)}function i(e){w.enqueueEvents(e),w.processEventQueue(!1)}function s(e,t){M=e,D=t,M.attachEvent("onchange",a)}function u(){M&&(M.detachEvent("onchange",a),M=null,D=null)}function l(e,t){var n=P.updateValueIfChanged(e),r=!0===t.simulated&&j._allowSimulatedPassThrough;if(n||r)return e}function c(e,t){if("topChange"===e)return t}function f(e,t,n){"topFocus"===e?(u(),s(t,n)):"topBlur"===e&&u()}function p(e,t){M=e,D=t,M.attachEvent("onpropertychange",h)}function d(){M&&(M.detachEvent("onpropertychange",h),M=null,D=null)}function h(e){"value"===e.propertyName&&l(D,e)&&a(e)}function m(e,t,n){"topFocus"===e?(d(),p(t,n)):"topBlur"===e&&d()}function v(e,t,n){if("topSelectionChange"===e||"topKeyUp"===e||"topKeyDown"===e)return l(D,n)}function g(e){var t=e.nodeName;return t&&"input"===t.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)}function y(e,t,n){if("topClick"===e)return l(t,n)}function b(e,t,n){if("topInput"===e||"topChange"===e)return l(t,n)}function E(e,t){if(null!=e){var n=e._wrapperState||t._wrapperState;if(n&&n.controlled&&"number"===t.type){var r=""+t.value;t.getAttribute("value")!==r&&t.setAttribute("value",r)}}}var w=n(34),_=n(33),k=n(8),C=n(7),S=n(18),x=n(19),P=n(93),T=n(54),O=n(55),N=n(94),I={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:["topBlur","topChange","topClick","topFocus","topInput","topKeyDown","topKeyUp","topSelectionChange"]}},M=null,D=null,A=!1;k.canUseDOM&&(A=O("change")&&(!document.documentMode||document.documentMode>8));var R=!1;k.canUseDOM&&(R=O("input")&&(!("documentMode"in document)||document.documentMode>9));var j={eventTypes:I,_allowSimulatedPassThrough:!0,_isInputEventSupported:R,extractEvents:function(e,t,n,a){var i,s,u=t?C.getNodeFromInstance(t):window;if(o(u)?A?i=c:s=f:N(u)?R?i=b:(i=v,s=m):g(u)&&(i=y),i){var l=i(e,t,n);if(l){return r(l,n,a)}}s&&s(e,u,t),"topBlur"===e&&E(t,u)}};e.exports=j},function(e,t,n){"use strict";function r(e,t,n){"function"==typeof e?e(t.getPublicInstance()):a.addComponentAsRefTo(t,e,n)}function o(e,t,n){"function"==typeof e?e(null):a.removeComponentAsRefFrom(t,e,n)}var a=n(158),i={};i.attachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&r(n,e,t._owner)}},i.shouldUpdateRefs=function(e,t){var n=null,r=null;null!==e&&"object"==typeof e&&(n=e.ref,r=e._owner);var o=null,a=null;return null!==t&&"object"==typeof t&&(o=t.ref,a=t._owner),n!==o||"string"==typeof o&&a!==r},i.detachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&o(n,e,t._owner)}},e.exports=i},function(e,t,n){"use strict";function r(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef)}var o=(n(3),n(1)),a={addComponentAsRefTo:function(e,t,n){r(n)||o(!1,"addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner)."),n.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,n){r(n)||o(!1,"removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).");var a=n.getPublicInstance();a&&a.refs[t]===e.getPublicInstance()&&n.detachRef(t)}};e.exports=a},function(e,t,n){"use strict";function r(e,t,n,r,o,a,i,s){try{t.call(n,r,o,a,i,s)}catch(t){w(k[e],"Exception thrown by hook while handling %s: %s",e,t+"\n"+t.stack),k[e]=!0}}function o(e,t,n,o,a,i){for(var s=0;s<_.length;s++){var u=_[s],l=u[e];l&&r(e,l,u,t,n,o,a,i)}}function a(){y.purgeUnmountedComponents(),g.clearHistory()}function i(e){return e.reduce(function(e,t){var n=y.getOwnerID(t),r=y.getParentID(t);return e[t]={displayName:y.getDisplayName(t),text:y.getText(t),updateCount:y.getUpdateCount(t),childIDs:y.getChildIDs(t),ownerID:n||r&&y.getOwnerID(r)||0,parentID:r},e},{})}function s(){var e=O,t=T,n=g.getHistory();if(0===P)return O=0,T=[],void a();if(t.length||n.length){var r=y.getRegisteredIDs();S.push({duration:E()-e,measurements:t||[],operations:n||[],treeSnapshot:i(r)})}a(),O=E(),T=[]}function u(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&0===e||e||w(!1,"ReactDebugTool: debugID may not be empty.")}function l(e,t){0!==P&&(D&&!A&&(w(!1,"There is an internal error in the React performance measurement code. Did not expect %s timer to start while %s timer is still in progress for %s instance.",t,D||"no",e===N?"the same":"another"),A=!0),I=E(),M=0,N=e,D=t)}function c(e,t){0!==P&&(D===t||A||(w(!1,"There is an internal error in the React performance measurement code. We did not expect %s timer to stop while %s timer is still in progress for %s instance. Please report this as a bug in React.",t,D||"no",e===N?"the same":"another"),A=!0),C&&T.push({timerType:t,instanceID:e,duration:E()-I-M}),I=0,M=0,N=null,D=null)}function f(){var e={startTime:I,nestedFlushStartTime:E(),debugID:N,timerType:D};x.push(e),I=0,M=0,N=null,D=null}function p(){var e=x.pop(),t=e.startTime,n=e.nestedFlushStartTime,r=e.debugID,o=e.timerType,a=E()-n;I=t,M+=a,N=r,D=o}function d(e){if(!C||!j)return!1;var t=y.getElement(e);return null!=t&&"object"==typeof t&&!("string"==typeof t.type)}function h(e,t){if(d(e)){var n=e+"::"+t;R=E(),performance.mark(n)}}function m(e,t){if(d(e)){var n=e+"::"+t,r=y.getDisplayName(e)||"Unknown";if(E()-R>.1){var o=r+" ["+t+"]";performance.measure(o,n)}performance.clearMarks(n),o&&performance.clearMeasures(o)}}var v=n(160),g=n(161),y=n(12),b=n(8),E=n(162),w=n(2),_=[],k={},C=!1,S=[],x=[],P=0,T=[],O=0,N=null,I=0,M=0,D=null,A=!1,R=0,j="undefined"!=typeof performance&&"function"==typeof performance.mark&&"function"==typeof performance.clearMarks&&"function"==typeof performance.measure&&"function"==typeof performance.clearMeasures,L={addHook:function(e){_.push(e)},removeHook:function(e){for(var t=0;t<_.length;t++)_[t]===e&&(_.splice(t,1),t--)},isProfiling:function(){return C},beginProfiling:function(){C||(C=!0,S.length=0,s(),L.addHook(g))},endProfiling:function(){C&&(C=!1,s(),L.removeHook(g))},getFlushHistory:function(){return S},onBeginFlush:function(){P++,s(),f(),o("onBeginFlush")},onEndFlush:function(){s(),P--,p(),o("onEndFlush")},onBeginLifeCycleTimer:function(e,t){u(e),o("onBeginLifeCycleTimer",e,t),h(e,t),l(e,t)},onEndLifeCycleTimer:function(e,t){u(e),c(e,t),m(e,t),o("onEndLifeCycleTimer",e,t)},onBeginProcessingChildContext:function(){o("onBeginProcessingChildContext")},onEndProcessingChildContext:function(){o("onEndProcessingChildContext")},onHostOperation:function(e){u(e.instanceID),o("onHostOperation",e)},onSetState:function(){o("onSetState")},onSetChildren:function(e,t){u(e),t.forEach(u),o("onSetChildren",e,t)},onBeforeMountComponent:function(e,t,n){u(e),u(n,!0),o("onBeforeMountComponent",e,t,n),h(e,"mount")},onMountComponent:function(e){u(e),m(e,"mount"),o("onMountComponent",e)},onBeforeUpdateComponent:function(e,t){u(e),o("onBeforeUpdateComponent",e,t),h(e,"update")},onUpdateComponent:function(e){u(e),m(e,"update"),o("onUpdateComponent",e)},onBeforeUnmountComponent:function(e){u(e),o("onBeforeUnmountComponent",e),h(e,"unmount")},onUnmountComponent:function(e){u(e),m(e,"unmount"),o("onUnmountComponent",e)},onTestEvent:function(){o("onTestEvent")}};L.addDevtool=L.addHook,L.removeDevtool=L.removeHook,L.addHook(v),L.addHook(y),/[?&]react_perf\b/.test(b.canUseDOM&&window.location.href||"")&&L.beginProfiling(),e.exports=L},function(e,t,n){"use strict";var r=n(2),o=!1,a=function(){r(!o,"setState(...): Cannot call setState() inside getChildContext()")},i={onBeginProcessingChildContext:function(){o=!0},onEndProcessingChildContext:function(){o=!1},onSetState:function(){a()}};e.exports=i},function(e,t,n){"use strict";var r=[],o={onHostOperation:function(e){r.push(e)},clearHistory:function(){o._preventClearing||(r=[])},getHistory:function(){return r}};e.exports=o},function(e,t,n){"use strict";var r,o=n(163);r=o.now?function(){return o.now()}:function(){return Date.now()},e.exports=r},function(e,t,n){"use strict";var r,o=n(8);o.canUseDOM&&(r=window.performance||window.msPerformance||window.webkitPerformance),e.exports=r||{}},function(e,t,n){"use strict";var r=["ResponderEventPlugin","SimpleEventPlugin","TapEventPlugin","EnterLeaveEventPlugin","ChangeEventPlugin","SelectEventPlugin","BeforeInputEventPlugin"];e.exports=r},function(e,t,n){"use strict";var r=n(33),o=n(7),a=n(46),i={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},s={eventTypes:i,extractEvents:function(e,t,n,s){if("topMouseOver"===e&&(n.relatedTarget||n.fromElement))return null;if("topMouseOut"!==e&&"topMouseOver"!==e)return null;var u;if(s.window===s)u=s;else{var l=s.ownerDocument;u=l?l.defaultView||l.parentWindow:window}var c,f;if("topMouseOut"===e){c=t;var p=n.relatedTarget||n.toElement;f=p?o.getClosestInstanceFromNode(p):null}else c=null,f=t;if(c===f)return null;var d=null==c?u:o.getNodeFromInstance(c),h=null==f?u:o.getNodeFromInstance(f),m=a.getPooled(i.mouseLeave,c,n,s);m.type="mouseleave",m.target=d,m.relatedTarget=h;var v=a.getPooled(i.mouseEnter,f,n,s);return v.type="mouseenter",v.target=h,v.relatedTarget=d,r.accumulateEnterLeaveDispatches(m,v,c,f),[m,v]}};e.exports=s},function(e,t,n){"use strict";var r=n(21),o=r.injection.MUST_USE_PROPERTY,a=r.injection.HAS_BOOLEAN_VALUE,i=r.injection.HAS_NUMERIC_VALUE,s=r.injection.HAS_POSITIVE_NUMERIC_VALUE,u=r.injection.HAS_OVERLOADED_BOOLEAN_VALUE,l={isCustomAttribute:RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+r.ATTRIBUTE_NAME_CHAR+"]*$")),Properties:{accept:0,acceptCharset:0,accessKey:0,action:0,allowFullScreen:a,allowTransparency:0,alt:0,as:0,async:a,autoComplete:0,autoPlay:a,capture:a,cellPadding:0,cellSpacing:0,charSet:0,challenge:0,checked:o|a,cite:0,classID:0,className:0,cols:s,colSpan:0,content:0,contentEditable:0,contextMenu:0,controls:a,coords:0,crossOrigin:0,data:0,dateTime:0,default:a,defer:a,dir:0,disabled:a,download:u,draggable:0,encType:0,form:0,formAction:0,formEncType:0,formMethod:0,formNoValidate:a,formTarget:0,frameBorder:0,headers:0,height:0,hidden:a,high:0,href:0,hrefLang:0,htmlFor:0,httpEquiv:0,icon:0,id:0,inputMode:0,integrity:0,is:0,keyParams:0,keyType:0,kind:0,label:0,lang:0,list:0,loop:a,low:0,manifest:0,marginHeight:0,marginWidth:0,max:0,maxLength:0,media:0,mediaGroup:0,method:0,min:0,minLength:0,multiple:o|a,muted:o|a,name:0,nonce:0,noValidate:a,open:a,optimum:0,pattern:0,placeholder:0,playsInline:a,poster:0,preload:0,profile:0,radioGroup:0,readOnly:a,referrerPolicy:0,rel:0,required:a,reversed:a,role:0,rows:s,rowSpan:i,sandbox:0,scope:0,scoped:a,scrolling:0,seamless:a,selected:o|a,shape:0,size:s,sizes:0,span:s,spellCheck:0,src:0,srcDoc:0,srcLang:0,srcSet:0,start:i,step:0,style:0,summary:0,tabIndex:0,target:0,title:0,type:0,useMap:0,value:0,width:0,wmode:0,wrap:0,about:0,datatype:0,inlist:0,prefix:0,property:0,resource:0,typeof:0,vocab:0,autoCapitalize:0,autoCorrect:0,autoSave:0,color:0,itemProp:0,itemScope:a,itemType:0,itemID:0,itemRef:0,results:0,security:0,unselectable:0},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{},DOMMutationMethods:{value:function(e,t){if(null==t)return e.removeAttribute("value");"number"!==e.type||!1===e.hasAttribute("value")?e.setAttribute("value",""+t):e.validity&&!e.validity.badInput&&e.ownerDocument.activeElement!==e&&e.setAttribute("value",""+t)}}};e.exports=l},function(e,t,n){"use strict";var r=n(57),o=n(172),a={processChildrenUpdates:o.dangerouslyProcessChildrenUpdates,replaceNodeWithMarkup:r.dangerouslyReplaceNodeWithMarkup};e.exports=a},function(e,t,n){"use strict";var r=(n(3),n(29)),o=n(8),a=n(169),i=n(13),s=n(1),u={dangerouslyReplaceNodeWithMarkup:function(e,t){if(o.canUseDOM||s(!1,"dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use ReactDOMServer.renderToString() for server rendering."),t||s(!1,"dangerouslyReplaceNodeWithMarkup(...): Missing markup."),"HTML"===e.nodeName&&s(!1,"dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See ReactDOMServer.renderToString()."),"string"==typeof t){var n=a(t,i)[0];e.parentNode.replaceChild(n,e)}else r.replaceChildWithTree(e,t)}};e.exports=u},function(e,t,n){"use strict";function r(e){var t=e.match(c);return t&&t[1].toLowerCase()}function o(e,t){var n=l;l||u(!1,"createNodesFromMarkup dummy not initialized");var o=r(e),a=o&&s(o);if(a){n.innerHTML=a[1]+e+a[2];for(var c=a[0];c--;)n=n.lastChild}else n.innerHTML=e;var f=n.getElementsByTagName("script");f.length&&(t||u(!1,"createNodesFromMarkup(...): Unexpected <script> element rendered."),i(f).forEach(t));for(var p=Array.from(n.childNodes);n.lastChild;)n.removeChild(n.lastChild);return p}var a=n(8),i=n(170),s=n(171),u=n(1),l=a.canUseDOM?document.createElement("div"):null,c=/^\s*<(\w+)/;e.exports=o},function(e,t,n){"use strict";function r(e){var t=e.length;if((Array.isArray(e)||"object"!=typeof e&&"function"!=typeof e)&&i(!1,"toArray: Array-like object expected"),"number"!=typeof t&&i(!1,"toArray: Object needs a length property"),0===t||t-1 in e||i(!1,"toArray: Object should have keys for indices"),"function"==typeof e.callee&&i(!1,"toArray: Object can't be `arguments`. Use rest params (function(...args) {}) or Array.from() instead."),e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(e){}for(var n=Array(t),r=0;r<t;r++)n[r]=e[r];return n}function o(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e)}function a(e){return o(e)?Array.isArray(e)?e.slice():r(e):[e]}var i=n(1);e.exports=a},function(e,t,n){"use strict";function r(e){return i||a(!1,"Markup wrapping node not initialized"),p.hasOwnProperty(e)||(e="*"),s.hasOwnProperty(e)||(i.innerHTML="*"===e?"<link />":"<"+e+"></"+e+">",s[e]=!i.firstChild),s[e]?p[e]:null}var o=n(8),a=n(1),i=o.canUseDOM?document.createElement("div"):null,s={},u=[1,'<select multiple="true">',"</select>"],l=[1,"<table>","</table>"],c=[3,"<table><tbody><tr>","</tr></tbody></table>"],f=[1,'<svg xmlns="http://www.w3.org/2000/svg">',"</svg>"],p={"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],optgroup:u,option:u,caption:l,colgroup:l,tbody:l,tfoot:l,thead:l,td:c,th:c};["circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","text","tspan"].forEach(function(e){p[e]=f,s[e]=!0}),e.exports=r},function(e,t,n){"use strict";var r=n(57),o=n(7),a={dangerouslyProcessChildrenUpdates:function(e,t){var n=o.getNodeFromInstance(e);r.processUpdates(n,t)}};e.exports=a},function(e,t,n){"use strict";function r(e){if(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" This DOM node was rendered by `"+n+"`."}}return""}function o(e){if("object"==typeof e){if(Array.isArray(e))return"["+e.map(o).join(", ")+"]";var t=[];for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=/^[a-z$_][\w$_]*$/i.test(n)?n:JSON.stringify(n);t.push(r+": "+o(e[n]))}return"{"+t.join(", ")+"}"}return"string"==typeof e?JSON.stringify(e):"function"==typeof e?"[function object]":String(e)}function a(e,t,n){if(null!=e&&null!=t&&!W(e,t)){var r,a=n._tag,i=n._currentElement._owner;i&&(r=i.getName());var s=r+"|"+a;ee.hasOwnProperty(s)||(ee[s]=!0,z(!1,"`%s` was passed a style object that has previously been mutated. Mutating `style` is deprecated. Consider cloning it beforehand. Check the `render` %s. Previous style: %s. Mutated style: %s.",a,i?"of `"+r+"`":"using <"+a+">",o(e),o(t)))}}function i(e,t){t&&(ae[e._tag]&&(null!=t.children||null!=t.dangerouslySetInnerHTML)&&F(!1,"%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s",e._tag,e._currentElement._owner?" Check the render method of "+e._currentElement._owner.getName()+".":""),null!=t.dangerouslySetInnerHTML&&(null!=t.children&&F(!1,"Can only set one of `children` or `props.dangerouslySetInnerHTML`."),"object"==typeof t.dangerouslySetInnerHTML&&J in t.dangerouslySetInnerHTML||F(!1,"`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.")),z(null==t.innerHTML,"Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),z(t.suppressContentEditableWarning||!t.contentEditable||null==t.children,"A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),z(null==t.onFocusIn&&null==t.onFocusOut,"React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),null!=t.style&&"object"!=typeof t.style&&F(!1,"The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.%s",r(e)))}function s(e,t,n,r){if(!(r instanceof j)){z("onScroll"!==t||B("scroll",!0),"This browser doesn't support the `onScroll` event");var o=e._hostContainerInfo,a=o._node&&o._node.nodeType===Q,i=a?o._node:o._ownerDocument;Z(t,i),r.getReactMountReady().enqueue(u,{inst:e,registrationName:t,listener:n})}}function u(){var e=this;S.putListener(e.inst,e.registrationName,e.listener)}function l(){var e=this;N.postMountWrapper(e)}function c(){var e=this;D.postMountWrapper(e)}function f(){var e=this;I.postMountWrapper(e)}function p(){V.track(this)}function d(){var e=this;e._rootNodeID||F(!1,"Must be mounted to trap events");var t=G(e);switch(t||F(!1,"trapBubbledEvent(...): Requires node to be rendered."),e._tag){case"iframe":case"object":e._wrapperState.listeners=[P.trapBubbledEvent("topLoad","load",t)];break;case"video":case"audio":e._wrapperState.listeners=[];for(var n in ne)ne.hasOwnProperty(n)&&e._wrapperState.listeners.push(P.trapBubbledEvent(n,ne[n],t));break;case"source":e._wrapperState.listeners=[P.trapBubbledEvent("topError","error",t)];break;case"img":e._wrapperState.listeners=[P.trapBubbledEvent("topError","error",t),P.trapBubbledEvent("topLoad","load",t)];break;case"form":e._wrapperState.listeners=[P.trapBubbledEvent("topReset","reset",t),P.trapBubbledEvent("topSubmit","submit",t)];break;case"input":case"select":case"textarea":e._wrapperState.listeners=[P.trapBubbledEvent("topInvalid","invalid",t)]}}function h(){M.postUpdateWrapper(this)}function m(e){ue.call(se,e)||(ie.test(e)||F(!1,"Invalid tag: %s",e),se[e]=!0)}function v(e,t){return e.indexOf("-")>=0||null!=t.is}function g(e){var t=e.type;m(t),this._currentElement=e,this._tag=t.toLowerCase(),this._namespaceURI=null,this._renderedChildren=null,this._previousStyle=null,this._previousStyleCopy=null,this._hostNode=null,this._hostParent=null,this._rootNodeID=0,this._domID=0,this._hostContainerInfo=null,this._wrapperState=null,this._topLevelWrapper=null,this._flags=0,this._ancestorInfo=null,te.call(this,null)}var y=(n(3),n(6)),b=n(174),E=n(175),w=n(29),_=n(58),k=n(21),C=n(99),S=n(34),x=n(44),P=n(49),T=n(87),O=n(7),N=n(185),I=n(186),M=n(101),D=n(187),A=n(14),R=n(188),j=n(197),L=n(13),U=n(48),F=n(1),B=n(55),W=n(62),V=n(93),H=n(66),z=n(2),q=T,Y=S.deleteListener,G=O.getNodeFromInstance,Z=P.listenTo,$=x.registrationNameModules,K={string:!0,number:!0},J="__html",X={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null},Q=11,ee={},te=L;te=function(e){var t=null!=this._contentDebugID,n=this._debugID,r=-n;if(null==e)return t&&A.debugTool.onUnmountComponent(this._contentDebugID),void(this._contentDebugID=null);H(null,String(e),this,this._ancestorInfo),this._contentDebugID=r,t?(A.debugTool.onBeforeUpdateComponent(r,e),A.debugTool.onUpdateComponent(r)):(A.debugTool.onBeforeMountComponent(r,e,n),A.debugTool.onMountComponent(r),A.debugTool.onSetChildren(n,[r]))};var ne={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",topWaiting:"waiting"},re={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},oe={listing:!0,pre:!0,textarea:!0},ae=y({menuitem:!0},re),ie=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,se={},ue={}.hasOwnProperty,le=1;g.displayName="ReactDOMComponent",g.Mixin={mountComponent:function(e,t,n,r){this._rootNodeID=le++,this._domID=n._idCounter++,this._hostParent=t,this._hostContainerInfo=n;var o=this._currentElement.props;switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":this._wrapperState={listeners:null},e.getReactMountReady().enqueue(d,this);break;case"input":N.mountWrapper(this,o,t),o=N.getHostProps(this,o),e.getReactMountReady().enqueue(p,this),e.getReactMountReady().enqueue(d,this);break;case"option":I.mountWrapper(this,o,t),o=I.getHostProps(this,o);break;case"select":M.mountWrapper(this,o,t),o=M.getHostProps(this,o),e.getReactMountReady().enqueue(d,this);break;case"textarea":D.mountWrapper(this,o,t),o=D.getHostProps(this,o),e.getReactMountReady().enqueue(p,this),e.getReactMountReady().enqueue(d,this)}i(this,o);var a,s;null!=t?(a=t._namespaceURI,s=t._tag):n._tag&&(a=n._namespaceURI,s=n._tag),(null==a||a===_.svg&&"foreignobject"===s)&&(a=_.html),a===_.html&&("svg"===this._tag?a=_.svg:"math"===this._tag&&(a=_.mathml)),this._namespaceURI=a;var u;null!=t?u=t._ancestorInfo:n._tag&&(u=n._ancestorInfo),u&&H(this._tag,null,this,u),this._ancestorInfo=H.updatedAncestorInfo(u,this._tag,this);var h;if(e.useCreateElement){var m,v=n._ownerDocument;if(a===_.html)if("script"===this._tag){var g=v.createElement("div"),y=this._currentElement.type;g.innerHTML="<"+y+"></"+y+">",m=g.removeChild(g.firstChild)}else m=o.is?v.createElement(this._currentElement.type,o.is):v.createElement(this._currentElement.type);else m=v.createElementNS(a,this._currentElement.type);O.precacheNode(this,m),this._flags|=q.hasCachedChildNodes,this._hostParent||C.setAttributeForRoot(m),this._updateDOMProperties(null,o,e);var E=w(m);this._createInitialChildren(e,o,r,E),h=E}else{var k=this._createOpenTagMarkupAndPutListeners(e,o),S=this._createContentMarkup(e,o,r);h=!S&&re[this._tag]?k+"/>":k+">"+S+"</"+this._currentElement.type+">"}switch(this._tag){case"input":e.getReactMountReady().enqueue(l,this),o.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"textarea":e.getReactMountReady().enqueue(c,this),o.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"select":case"button":o.autoFocus&&e.getReactMountReady().enqueue(b.focusDOMComponent,this);break;case"option":e.getReactMountReady().enqueue(f,this)}return h},_createOpenTagMarkupAndPutListeners:function(e,t){var n="<"+this._currentElement.type;for(var r in t)if(t.hasOwnProperty(r)){var o=t[r];if(null!=o)if($.hasOwnProperty(r))o&&s(this,r,o,e);else{"style"===r&&(o&&(this._previousStyle=o,o=this._previousStyleCopy=y({},t.style)),o=E.createMarkupForStyles(o,this));var a=null;null!=this._tag&&v(this._tag,t)?X.hasOwnProperty(r)||(a=C.createMarkupForCustomAttribute(r,o)):a=C.createMarkupForProperty(r,o),a&&(n+=" "+a)}}return e.renderToStaticMarkup?n:(this._hostParent||(n+=" "+C.createMarkupForRoot()),n+=" "+C.createMarkupForID(this._domID))},_createContentMarkup:function(e,t,n){var r="",o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&(r=o.__html);else{var a=K[typeof t.children]?t.children:null,i=null!=a?null:t.children;if(null!=a)r=U(a),te.call(this,a);else if(null!=i){var s=this.mountChildren(i,e,n);r=s.join("")}}return oe[this._tag]&&"\n"===r.charAt(0)?"\n"+r:r},_createInitialChildren:function(e,t,n,r){var o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&w.queueHTML(r,o.__html);else{var a=K[typeof t.children]?t.children:null,i=null!=a?null:t.children;if(null!=a)""!==a&&(te.call(this,a),w.queueText(r,a));else if(null!=i)for(var s=this.mountChildren(i,e,n),u=0;u<s.length;u++)w.queueChild(r,s[u])}},receiveComponent:function(e,t,n){var r=this._currentElement;this._currentElement=e,this.updateComponent(t,r,e,n)},updateComponent:function(e,t,n,r){var o=t.props,a=this._currentElement.props;switch(this._tag){case"input":o=N.getHostProps(this,o),a=N.getHostProps(this,a);break;case"option":o=I.getHostProps(this,o),a=I.getHostProps(this,a);break;case"select":o=M.getHostProps(this,o),a=M.getHostProps(this,a);break;case"textarea":o=D.getHostProps(this,o),a=D.getHostProps(this,a)}switch(i(this,a),this._updateDOMProperties(o,a,e),this._updateDOMChildren(o,a,e,r),this._tag){case"input":N.updateWrapper(this);break;case"textarea":D.updateWrapper(this);break;case"select":e.getReactMountReady().enqueue(h,this)}},_updateDOMProperties:function(e,t,n){var r,o,i;for(r in e)if(!t.hasOwnProperty(r)&&e.hasOwnProperty(r)&&null!=e[r])if("style"===r){var u=this._previousStyleCopy;for(o in u)u.hasOwnProperty(o)&&(i=i||{},i[o]="");this._previousStyleCopy=null}else $.hasOwnProperty(r)?e[r]&&Y(this,r):v(this._tag,e)?X.hasOwnProperty(r)||C.deleteValueForAttribute(G(this),r):(k.properties[r]||k.isCustomAttribute(r))&&C.deleteValueForProperty(G(this),r);for(r in t){var l=t[r],c="style"===r?this._previousStyleCopy:null!=e?e[r]:void 0;if(t.hasOwnProperty(r)&&l!==c&&(null!=l||null!=c))if("style"===r)if(l?(a(this._previousStyleCopy,this._previousStyle,this),this._previousStyle=l,l=this._previousStyleCopy=y({},l)):this._previousStyleCopy=null,c){for(o in c)!c.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(i=i||{},i[o]="");for(o in l)l.hasOwnProperty(o)&&c[o]!==l[o]&&(i=i||{},i[o]=l[o])}else i=l;else if($.hasOwnProperty(r))l?s(this,r,l,n):c&&Y(this,r);else if(v(this._tag,t))X.hasOwnProperty(r)||C.setValueForAttribute(G(this),r,l);else if(k.properties[r]||k.isCustomAttribute(r)){var f=G(this);null!=l?C.setValueForProperty(f,r,l):C.deleteValueForProperty(f,r)}}i&&E.setValueForStyles(G(this),i,this)},_updateDOMChildren:function(e,t,n,r){var o=K[typeof e.children]?e.children:null,a=K[typeof t.children]?t.children:null,i=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,s=t.dangerouslySetInnerHTML&&t.dangerouslySetInnerHTML.__html,u=null!=o?null:e.children,l=null!=a?null:t.children,c=null!=o||null!=i,f=null!=a||null!=s;null!=u&&null==l?this.updateChildren(null,n,r):c&&!f&&(this.updateTextContent(""),A.debugTool.onSetChildren(this._debugID,[])),null!=a?o!==a&&(this.updateTextContent(""+a),te.call(this,a)):null!=s?(i!==s&&this.updateMarkup(""+s),A.debugTool.onSetChildren(this._debugID,[])):null!=l&&(te.call(this,null),this.updateChildren(l,n,r))},getHostNode:function(){return G(this)},unmountComponent:function(e){switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":var t=this._wrapperState.listeners;if(t)for(var n=0;n<t.length;n++)t[n].remove();break;case"input":case"textarea":V.stopTracking(this);break;case"html":case"head":case"body":F(!1,"<%s> tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.",this._tag)}this.unmountChildren(e),O.uncacheNode(this),S.deleteAllListeners(this),this._rootNodeID=0,this._domID=0,this._wrapperState=null,te.call(this,null)},getPublicInstance:function(){return G(this)}},y(g.prototype,g.Mixin,R.Mixin),e.exports=g},function(e,t,n){"use strict";var r=n(7),o=n(97),a={focusDOMComponent:function(){o(r.getNodeFromInstance(this))}};e.exports=a},function(e,t,n){"use strict";var r=n(98),o=n(8),a=n(14),i=n(176),s=n(178),u=n(179),l=n(181),c=n(2),f=l(function(e){return u(e)}),p=!1,d="cssFloat";if(o.canUseDOM){var h=document.createElement("div").style;try{h.font=""}catch(e){p=!0}void 0===document.documentElement.style.cssFloat&&(d="styleFloat")}var m=/^(?:webkit|moz|o)[A-Z]/,v=/;\s*$/,g={},y={},b=!1,E=function(e,t){g.hasOwnProperty(e)&&g[e]||(g[e]=!0,c(!1,"Unsupported style property %s. Did you mean %s?%s",e,i(e),C(t)))},w=function(e,t){g.hasOwnProperty(e)&&g[e]||(g[e]=!0,c(!1,"Unsupported vendor-prefixed style property %s. Did you mean %s?%s",e,e.charAt(0).toUpperCase()+e.slice(1),C(t)))},_=function(e,t,n){y.hasOwnProperty(t)&&y[t]||(y[t]=!0,c(!1,'Style property values shouldn\'t contain a semicolon.%s Try "%s: %s" instead.',C(n),e,t.replace(v,"")))},k=function(e,t,n){b||(b=!0,c(!1,"`NaN` is an invalid value for the `%s` css style property.%s",e,C(n)))},C=function(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""},S=function(e,t,n){var r;n&&(r=n._currentElement._owner),e.indexOf("-")>-1?E(e,r):m.test(e)?w(e,r):v.test(t)&&_(e,t,r),"number"==typeof t&&isNaN(t)&&k(e,0,r)},x={createMarkupForStyles:function(e,t){var n="";for(var r in e)if(e.hasOwnProperty(r)){var o=0===r.indexOf("--"),a=e[r];o||S(r,a,t),null!=a&&(n+=f(r)+":",n+=s(r,a,t,o)+";")}return n||null},setValueForStyles:function(e,t,n){a.debugTool.onHostOperation({instanceID:n._debugID,type:"update styles",payload:t});var o=e.style;for(var i in t)if(t.hasOwnProperty(i)){var u=0===i.indexOf("--");u||S(i,t[i],n);var l=s(i,t[i],n,u);if("float"!==i&&"cssFloat"!==i||(i=d),u)o.setProperty(i,l);else if(l)o[i]=l;else{var c=p&&r.shorthandPropertyExpansions[i];if(c)for(var f in c)o[f]="";else o[i]=""}}}};e.exports=x},function(e,t,n){"use strict";function r(e){return o(e.replace(a,"ms-"))}var o=n(177),a=/^-ms-/;e.exports=r},function(e,t,n){"use strict";function r(e){return e.replace(o,function(e,t){return t.toUpperCase()})}var o=/-(.)/g;e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){if(null==t||"boolean"==typeof t||""===t)return"";var o=isNaN(t);if(r||o||0===t||i.hasOwnProperty(e)&&i[e])return""+t;if("string"==typeof t){if(n&&"0"!==t){var u=n._currentElement._owner,l=u?u.getName():null;l&&!s[l]&&(s[l]={});var c=!1;if(l){var f=s[l];c=f[e],c||(f[e]=!0)}c||a(!1,"a `%s` tag (owner: `%s`) was passed a numeric string value for CSS property `%s` (value: `%s`) which will be treated as a unitless number in a future version of React.",n._currentElement.type,l||"unknown",e,t)}t=t.trim()}return t+"px"}var o=n(98),a=n(2),i=o.isUnitlessNumber,s={};e.exports=r},function(e,t,n){"use strict";function r(e){return o(e).replace(a,"-ms-")}var o=n(180),a=/^ms-/;e.exports=r},function(e,t,n){"use strict";function r(e){return e.replace(o,"-$1").toLowerCase()}var o=/([A-Z])/g;e.exports=r},function(e,t,n){"use strict";function r(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}e.exports=r},function(e,t,n){"use strict";function r(e){return'"'+o(e)+'"'}var o=n(48);e.exports=r},function(e,t,n){"use strict";function r(e){o.enqueueEvents(e),o.processEventQueue(!1)}var o=n(34),a={handleTopLevel:function(e,t,n,a){r(o.extractEvents(e,t,n,a))}};e.exports=a},function(e,t,n){"use strict";function r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n["ms"+e]="MS"+t,n["O"+e]="o"+t.toLowerCase(),n}function o(e){if(s[e])return s[e];if(!i[e])return e;var t=i[e];for(var n in t)if(t.hasOwnProperty(n)&&n in u)return s[e]=t[n];return""}var a=n(8),i={animationend:r("Animation","AnimationEnd"),animationiteration:r("Animation","AnimationIteration"),animationstart:r("Animation","AnimationStart"),transitionend:r("Transition","TransitionEnd")},s={},u={};a.canUseDOM&&(u=document.createElement("div").style,"AnimationEvent"in window||(delete i.animationend.animation,delete i.animationiteration.animation,delete i.animationstart.animation),"TransitionEvent"in window||delete i.transitionend.transition),e.exports=o},function(e,t,n){"use strict";function r(){this._rootNodeID&&b.updateWrapper(this)}function o(e){return"checkbox"===e.type||"radio"===e.type?null!=e.checked:null!=e.value}function a(e){var t=this._currentElement.props,n=u.executeOnChange(t,e);c.asap(r,this);var o=t.name;if("radio"===t.type&&null!=o){for(var a=l.getNodeFromInstance(this),i=a;i.parentNode;)i=i.parentNode;for(var s=i.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),p=0;p<s.length;p++){var d=s[p];if(d!==a&&d.form===a.form){var h=l.getInstanceFromNode(d);h||f(!1,"ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."),c.asap(r,h)}}}return n}var i=(n(3),n(6)),s=n(99),u=n(60),l=n(7),c=n(18),f=n(1),p=n(2),d=!1,h=!1,m=!1,v=!1,g=!1,y=!1,b={getHostProps:function(e,t){var n=u.getValue(t),r=u.getChecked(t);return i({type:void 0,step:void 0,min:void 0,max:void 0},t,{defaultChecked:void 0,defaultValue:void 0,value:null!=n?n:e._wrapperState.initialValue,checked:null!=r?r:e._wrapperState.initialChecked,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){u.checkPropTypes("input",t,e._currentElement._owner);var n=e._currentElement._owner;void 0===t.valueLink||d||(p(!1,"`valueLink` prop on `input` is deprecated; set `value` and `onChange` instead."),d=!0),void 0===t.checkedLink||h||(p(!1,"`checkedLink` prop on `input` is deprecated; set `value` and `onChange` instead."),h=!0),void 0===t.checked||void 0===t.defaultChecked||v||(p(!1,"%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components",n&&n.getName()||"A component",t.type),v=!0),void 0===t.value||void 0===t.defaultValue||m||(p(!1,"%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components",n&&n.getName()||"A component",t.type),m=!0);var r=t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:null!=t.value?t.value:r,listeners:null,onChange:a.bind(e),controlled:o(t)}},updateWrapper:function(e){var t=e._currentElement.props,n=o(t),r=e._currentElement._owner;e._wrapperState.controlled||!n||y||(p(!1,"%s is changing an uncontrolled input of type %s to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components",r&&r.getName()||"A component",t.type),y=!0),!e._wrapperState.controlled||n||g||(p(!1,"%s is changing a controlled input of type %s to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components",r&&r.getName()||"A component",t.type),g=!0);var a=t.checked;null!=a&&s.setValueForProperty(l.getNodeFromInstance(e),"checked",a||!1);var i=l.getNodeFromInstance(e),c=u.getValue(t);if(null!=c)if(0===c&&""===i.value)i.value="0";else if("number"===t.type){var f=parseFloat(i.value,10)||0;(c!=f||c==f&&i.value!=c)&&(i.value=""+c)}else i.value!==""+c&&(i.value=""+c);else null==t.value&&null!=t.defaultValue&&i.defaultValue!==""+t.defaultValue&&(i.defaultValue=""+t.defaultValue),null==t.checked&&null!=t.defaultChecked&&(i.defaultChecked=!!t.defaultChecked)},postMountWrapper:function(e){var t=e._currentElement.props,n=l.getNodeFromInstance(e);switch(t.type){case"submit":case"reset":break;case"color":case"date":case"datetime":case"datetime-local":case"month":case"time":case"week":n.value="",n.value=n.defaultValue;break;default:n.value=n.value}var r=n.name;""!==r&&(n.name=""),n.defaultChecked=!n.defaultChecked,n.defaultChecked=!n.defaultChecked,""!==r&&(n.name=r)}};e.exports=b},function(e,t,n){"use strict";function r(e){var t="";return a.Children.forEach(e,function(e){null!=e&&("string"==typeof e||"number"==typeof e?t+=e:l||(l=!0,u(!1,"Only strings and numbers are supported as <option> children.")))}),t}var o=n(6),a=n(26),i=n(7),s=n(101),u=n(2),l=!1,c={mountWrapper:function(e,t,n){u(null==t.selected,"Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");var o=null;if(null!=n){var a=n;"optgroup"===a._tag&&(a=a._hostParent),null!=a&&"select"===a._tag&&(o=s.getSelectValueContext(a))}var i=null;if(null!=o){var l;if(l=null!=t.value?t.value+"":r(t.children),i=!1,Array.isArray(o)){for(var c=0;c<o.length;c++)if(""+o[c]===l){i=!0;break}}else i=""+o===l}e._wrapperState={selected:i}},postMountWrapper:function(e){var t=e._currentElement.props;if(null!=t.value){i.getNodeFromInstance(e).setAttribute("value",t.value)}},getHostProps:function(e,t){var n=o({selected:void 0,children:void 0},t);null!=e._wrapperState.selected&&(n.selected=e._wrapperState.selected);var a=r(t.children);return a&&(n.children=a),n}};e.exports=c},function(e,t,n){"use strict";function r(){this._rootNodeID&&d.updateWrapper(this)}function o(e){var t=this._currentElement.props,n=i.executeOnChange(t,e);return u.asap(r,this),n}var a=(n(3),n(6)),i=n(60),s=n(7),u=n(18),l=n(1),c=n(2),f=!1,p=!1,d={getHostProps:function(e,t){return null!=t.dangerouslySetInnerHTML&&l(!1,"`dangerouslySetInnerHTML` does not make sense on <textarea>."),a({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){i.checkPropTypes("textarea",t,e._currentElement._owner),void 0===t.valueLink||f||(c(!1,"`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead."),f=!0),void 0===t.value||void 0===t.defaultValue||p||(c(!1,"Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://fb.me/react-controlled-components"),p=!0);var n=i.getValue(t),r=n;if(null==n){var a=t.defaultValue,s=t.children;null!=s&&(c(!1,"Use the `defaultValue` or `value` props instead of setting children on <textarea>."),null!=a&&l(!1,"If you supply `defaultValue` on a <textarea>, do not pass children."),Array.isArray(s)&&(s.length<=1||l(!1,"<textarea> can only have at most one child."),s=s[0]),a=""+s),null==a&&(a=""),r=a}e._wrapperState={initialValue:""+r,listeners:null,onChange:o.bind(e)}},updateWrapper:function(e){var t=e._currentElement.props,n=s.getNodeFromInstance(e),r=i.getValue(t);if(null!=r){var o=""+r;o!==n.value&&(n.value=o),null==t.defaultValue&&(n.defaultValue=o)}null!=t.defaultValue&&(n.defaultValue=t.defaultValue)},postMountWrapper:function(e){var t=s.getNodeFromInstance(e),n=t.textContent;n===e._wrapperState.initialValue&&(t.value=n)}};e.exports=d},function(e,t,n){"use strict";function r(e,t,n){return{type:"INSERT_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:n,afterNode:t}}function o(e,t,n){return{type:"MOVE_EXISTING",content:null,fromIndex:e._mountIndex,fromNode:h.getHostNode(e),toIndex:n,afterNode:t}}function a(e,t){return{type:"REMOVE_NODE",content:null,fromIndex:e._mountIndex,fromNode:t,toIndex:null,afterNode:null}}function i(e){return{type:"SET_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function s(e){return{type:"TEXT_CONTENT",content:e,fromIndex:null,fromNode:null,toIndex:null,afterNode:null}}function u(e,t){return t&&(e=e||[],e.push(t)),e}function l(e,t){c.processChildrenUpdates(e,t)}var c=(n(3),n(61)),f=n(36),p=n(14),d=n(17),h=n(28),m=n(189),v=n(13),g=n(196),y=n(1),b=v,E=function(e){if(!e._debugID){var t;(t=f.get(e))&&(e=t)}return e._debugID};b=function(e){var t=E(this);0!==t&&p.debugTool.onSetChildren(t,e?Object.keys(e).map(function(t){return e[t]._debugID}):[])};var w={Mixin:{_reconcilerInstantiateChildren:function(e,t,n){var r=E(this);if(this._currentElement)try{return d.current=this._currentElement._owner,m.instantiateChildren(e,t,n,r)}finally{d.current=null}return m.instantiateChildren(e,t,n)},_reconcilerUpdateChildren:function(e,t,n,r,o,a){var i,s=0;if(s=E(this),this._currentElement){try{d.current=this._currentElement._owner,i=g(t,s)}finally{d.current=null}return m.updateChildren(e,i,n,r,o,this,this._hostContainerInfo,a,s),i}return i=g(t,s),m.updateChildren(e,i,n,r,o,this,this._hostContainerInfo,a,s),i},mountChildren:function(e,t,n){var r=this._reconcilerInstantiateChildren(e,t,n);this._renderedChildren=r;var o=[],a=0;for(var i in r)if(r.hasOwnProperty(i)){var s=r[i],u=0;u=E(this);var l=h.mountComponent(s,t,this,this._hostContainerInfo,n,u);s._mountIndex=a++,o.push(l)}return b.call(this,r),o},updateTextContent:function(e){var t=this._renderedChildren;m.unmountChildren(t,!1);for(var n in t)t.hasOwnProperty(n)&&y(!1,"updateTextContent called on non-empty component.");l(this,[s(e)])},updateMarkup:function(e){var t=this._renderedChildren;m.unmountChildren(t,!1);for(var n in t)t.hasOwnProperty(n)&&y(!1,"updateTextContent called on non-empty component.");l(this,[i(e)])},updateChildren:function(e,t,n){this._updateChildren(e,t,n)},_updateChildren:function(e,t,n){var r=this._renderedChildren,o={},a=[],i=this._reconcilerUpdateChildren(r,e,a,o,t,n);if(i||r){var s,c=null,f=0,p=0,d=0,m=null;for(s in i)if(i.hasOwnProperty(s)){var v=r&&r[s],g=i[s];v===g?(c=u(c,this.moveChild(v,m,f,p)),p=Math.max(v._mountIndex,p),v._mountIndex=f):(v&&(p=Math.max(v._mountIndex,p)),c=u(c,this._mountChildAtIndex(g,a[d],m,f,t,n)),d++),f++,m=h.getHostNode(g)}for(s in o)o.hasOwnProperty(s)&&(c=u(c,this._unmountChild(r[s],o[s])));c&&l(this,c),this._renderedChildren=i,b.call(this,i)}},unmountChildren:function(e){var t=this._renderedChildren;m.unmountChildren(t,e),this._renderedChildren=null},moveChild:function(e,t,n,r){if(e._mountIndex<r)return o(e,t,n)},createChild:function(e,t,n){return r(n,t,e._mountIndex)},removeChild:function(e,t){return a(e,t)},_mountChildAtIndex:function(e,t,n,r,o,a){return e._mountIndex=r,this.createChild(e,n,t)},_unmountChild:function(e,t){var n=this.removeChild(e,t);return e._mountIndex=null,n}}};e.exports=w},function(e,t,n){"use strict";(function(t){function r(e,t,r,a){var u=void 0===e[r];o||(o=n(12)),u||c(!1,"flattenChildren(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.%s",s.unescape(r),o.getStackAddendumByID(a)),null!=t&&u&&(e[r]=i(t,!0))}var o,a=n(28),i=n(102),s=n(64),u=n(63),l=n(106),c=n(2);void 0!==t&&Object({NODE_ENV:"development"});var f={instantiateChildren:function(e,t,n,o){if(null==e)return null;var a={};return l(e,function(e,t,n){return r(e,t,n,o)},a),a},updateChildren:function(e,t,n,r,o,s,l,c,f){if(t||e){var p,d;for(p in t)if(t.hasOwnProperty(p)){d=e&&e[p];var h=d&&d._currentElement,m=t[p];if(null!=d&&u(h,m))a.receiveComponent(d,m,o,c),t[p]=d;else{d&&(r[p]=a.getHostNode(d),a.unmountComponent(d,!1));var v=i(m,!0);t[p]=v;var g=a.mountComponent(v,o,s,l,c,f);n.push(g)}}for(p in e)!e.hasOwnProperty(p)||t&&t.hasOwnProperty(p)||(d=e[p],r[p]=a.getHostNode(d),a.unmountComponent(d,!1))}},unmountChildren:function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];a.unmountComponent(r,t)}}};e.exports=f}).call(t,n(43))},function(e,t,n){"use strict";function r(e){}function o(e,t){_(null===t||!1===t||l.isValidElement(t),"%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",e.displayName||e.name||"Component"),_(!e.childContextTypes,"%s(...): childContextTypes cannot be defined on a functional component.",e.displayName||e.name||"Component")}function a(e){return!(!e.prototype||!e.prototype.isReactComponent)}function i(e){return!(!e.prototype||!e.prototype.isPureReactComponent)}function s(e,t,n){if(0===t)return e();h.debugTool.onBeginLifeCycleTimer(t,n);try{return e()}finally{h.debugTool.onEndLifeCycleTimer(t,n)}}var u=(n(3),n(6)),l=n(26),c=n(61),f=n(17),p=n(53),d=n(36),h=n(14),m=n(103),v=n(28),g=n(191),y=n(42),b=n(1),E=n(62),w=n(63),_=n(2),k={ImpureClass:0,PureClass:1,StatelessFunctional:2};r.prototype.render=function(){var e=d.get(this)._currentElement.type,t=e(this.props,this.context,this.updater);return o(e,t),t};var C=1,S={construct:function(e){this._currentElement=e,this._rootNodeID=0,this._compositeType=null,this._instance=null,this._hostParent=null,this._hostContainerInfo=null,this._updateBatchNumber=null,this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._renderedNodeType=null,this._renderedComponent=null,this._context=null,this._mountOrder=0,this._topLevelWrapper=null,this._pendingCallbacks=null,this._calledComponentWillUnmount=!1,this._warnedAboutRefsInRender=!1},mountComponent:function(e,t,n,u){var c=this;this._context=u,this._mountOrder=C++,this._hostParent=t,this._hostContainerInfo=n;var f,p=this._currentElement.props,h=this._processContext(u),m=this._currentElement.type,v=e.getUpdateQueue(),g=a(m),E=this._constructComponent(g,p,h,v);g||null!=E&&null!=E.render?i(m)?this._compositeType=k.PureClass:this._compositeType=k.ImpureClass:(f=E,o(m,f),null===E||!1===E||l.isValidElement(E)||b(!1,"%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",m.displayName||m.name||"Component"),E=new r(m),this._compositeType=k.StatelessFunctional),null==E.render&&_(!1,"%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",m.displayName||m.name||"Component");var w=E.props!==p,S=m.displayName||m.name||"Component";_(void 0===E.props||!w,"%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",S,S),E.props=p,E.context=h,E.refs=y,E.updater=v,this._instance=E,d.set(E,this),_(!E.getInitialState||E.getInitialState.isReactClassApproved||E.state,"getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",this.getName()||"a component"),_(!E.getDefaultProps||E.getDefaultProps.isReactClassApproved,"getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",this.getName()||"a component"),_(!E.propTypes,"propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",this.getName()||"a component"),_(!E.contextTypes,"contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",this.getName()||"a component"),_("function"!=typeof E.componentShouldUpdate,"%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",this.getName()||"A component"),_("function"!=typeof E.componentDidUnmount,"%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",this.getName()||"A component"),_("function"!=typeof E.componentWillRecieveProps,"%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",this.getName()||"A component");var x=E.state;void 0===x&&(E.state=x=null),("object"!=typeof x||Array.isArray(x))&&b(!1,"%s.state: must be set to an object or null",this.getName()||"ReactCompositeComponent"),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1;var P;return P=E.unstable_handleError?this.performInitialMountWithErrorHandling(f,t,n,e,u):this.performInitialMount(f,t,n,e,u),E.componentDidMount&&e.getReactMountReady().enqueue(function(){s(function(){return E.componentDidMount()},c._debugID,"componentDidMount")}),P},_constructComponent:function(e,t,n,r){f.current=this;try{return this._constructComponentWithoutOwner(e,t,n,r)}finally{f.current=null}},_constructComponentWithoutOwner:function(e,t,n,r){var o=this._currentElement.type;return e?s(function(){return new o(t,n,r)},this._debugID,"ctor"):s(function(){return o(t,n,r)},this._debugID,"render")},performInitialMountWithErrorHandling:function(e,t,n,r,o){var a,i=r.checkpoint();try{a=this.performInitialMount(e,t,n,r,o)}catch(s){r.rollback(i),this._instance.unstable_handleError(s),this._pendingStateQueue&&(this._instance.state=this._processPendingState(this._instance.props,this._instance.context)),i=r.checkpoint(),this._renderedComponent.unmountComponent(!0),r.rollback(i),a=this.performInitialMount(e,t,n,r,o)}return a},performInitialMount:function(e,t,n,r,o){var a=this._instance,i=0;i=this._debugID,a.componentWillMount&&(s(function(){return a.componentWillMount()},i,"componentWillMount"),this._pendingStateQueue&&(a.state=this._processPendingState(a.props,a.context))),void 0===e&&(e=this._renderValidatedComponent());var u=m.getType(e);this._renderedNodeType=u;var l=this._instantiateReactComponent(e,u!==m.EMPTY);this._renderedComponent=l;var c=v.mountComponent(l,r,t,n,this._processChildContext(o),i);if(0!==i){var f=0!==l._debugID?[l._debugID]:[];h.debugTool.onSetChildren(i,f)}return c},getHostNode:function(){return v.getHostNode(this._renderedComponent)},unmountComponent:function(e){if(this._renderedComponent){var t=this._instance;if(t.componentWillUnmount&&!t._calledComponentWillUnmount)if(t._calledComponentWillUnmount=!0,e){var n=this.getName()+".componentWillUnmount()";p.invokeGuardedCallback(n,t.componentWillUnmount.bind(t))}else s(function(){return t.componentWillUnmount()},this._debugID,"componentWillUnmount");this._renderedComponent&&(v.unmountComponent(this._renderedComponent,e),this._renderedNodeType=null,this._renderedComponent=null,this._instance=null),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,this._pendingElement=null,this._context=null,this._rootNodeID=0,this._topLevelWrapper=null,d.remove(t)}},_maskContext:function(e){var t=this._currentElement.type,n=t.contextTypes;if(!n)return y;var r={};for(var o in n)r[o]=e[o];return r},_processContext:function(e){var t=this._maskContext(e),n=this._currentElement.type;return n.contextTypes&&this._checkContextTypes(n.contextTypes,t,"context"),t},_processChildContext:function(e){var t,n=this._currentElement.type,r=this._instance;if(r.getChildContext){h.debugTool.onBeginProcessingChildContext();try{t=r.getChildContext()}finally{h.debugTool.onEndProcessingChildContext()}}if(t){"object"!=typeof n.childContextTypes&&b(!1,"%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",this.getName()||"ReactCompositeComponent"),this._checkContextTypes(n.childContextTypes,t,"child context");for(var o in t)o in n.childContextTypes||b(!1,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||"ReactCompositeComponent",o);return u({},e,t)}return e},_checkContextTypes:function(e,t,n){g(e,t,n,this.getName(),null,this._debugID)},receiveComponent:function(e,t,n){var r=this._currentElement,o=this._context;this._pendingElement=null,this.updateComponent(t,r,e,o,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement?v.receiveComponent(this,this._pendingElement,e,this._context):null!==this._pendingStateQueue||this._pendingForceUpdate?this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context):this._updateBatchNumber=null},updateComponent:function(e,t,n,r,o){var a=this._instance;null==a&&b(!1,"Attempted to update component `%s` that has already been unmounted (or failed to mount).",this.getName()||"ReactCompositeComponent");var i,u=!1;this._context===o?i=a.context:(i=this._processContext(o),u=!0);var l=t.props,c=n.props;t!==n&&(u=!0),u&&a.componentWillReceiveProps&&s(function(){return a.componentWillReceiveProps(c,i)},this._debugID,"componentWillReceiveProps");var f=this._processPendingState(c,i),p=!0;this._pendingForceUpdate||(a.shouldComponentUpdate?p=s(function(){return a.shouldComponentUpdate(c,f,i)},this._debugID,"shouldComponentUpdate"):this._compositeType===k.PureClass&&(p=!E(l,c)||!E(a.state,f))),_(void 0!==p,"%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",this.getName()||"ReactCompositeComponent"),this._updateBatchNumber=null,p?(this._pendingForceUpdate=!1,this._performComponentUpdate(n,c,f,i,e,o)):(this._currentElement=n,this._context=o,a.props=c,a.state=f,a.context=i)},_processPendingState:function(e,t){var n=this._instance,r=this._pendingStateQueue,o=this._pendingReplaceState;if(this._pendingReplaceState=!1,this._pendingStateQueue=null,!r)return n.state;if(o&&1===r.length)return r[0];for(var a=u({},o?r[0]:n.state),i=o?1:0;i<r.length;i++){var s=r[i];u(a,"function"==typeof s?s.call(n,a,e,t):s)}return a},_performComponentUpdate:function(e,t,n,r,o,a){var i,u,l,c=this,f=this._instance,p=Boolean(f.componentDidUpdate);p&&(i=f.props,u=f.state,l=f.context),f.componentWillUpdate&&s(function(){return f.componentWillUpdate(t,n,r)},this._debugID,"componentWillUpdate"),this._currentElement=e,this._context=a,f.props=t,f.state=n,f.context=r,this._updateRenderedComponent(o,a),p&&o.getReactMountReady().enqueue(function(){s(f.componentDidUpdate.bind(f,i,u,l),c._debugID,"componentDidUpdate")})},_updateRenderedComponent:function(e,t){var n=this._renderedComponent,r=n._currentElement,o=this._renderValidatedComponent(),a=0;if(a=this._debugID,w(r,o))v.receiveComponent(n,o,e,this._processChildContext(t));else{var i=v.getHostNode(n);v.unmountComponent(n,!1);var s=m.getType(o);this._renderedNodeType=s;var u=this._instantiateReactComponent(o,s!==m.EMPTY);this._renderedComponent=u;var l=v.mountComponent(u,e,this._hostParent,this._hostContainerInfo,this._processChildContext(t),a);if(0!==a){var c=0!==u._debugID?[u._debugID]:[];h.debugTool.onSetChildren(a,c)}this._replaceNodeWithMarkup(i,l,n)}},_replaceNodeWithMarkup:function(e,t,n){c.replaceNodeWithMarkup(e,t,n)},_renderValidatedComponentWithoutOwnerOrContext:function(){var e,t=this._instance;return e=s(function(){return t.render()},this._debugID,"render"),void 0===e&&t.render._isMockFunction&&(e=null),e},_renderValidatedComponent:function(){var e;f.current=this;try{e=this._renderValidatedComponentWithoutOwnerOrContext()}finally{f.current=null}return null===e||!1===e||l.isValidElement(e)||b(!1,"%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.",this.getName()||"ReactCompositeComponent"),e},attachRef:function(e,t){var n=this.getPublicInstance();null==n&&b(!1,"Stateless function components cannot have refs.");var r=t.getPublicInstance(),o=t&&t.getName?t.getName():"a component";_(null!=r||t._compositeType!==k.StatelessFunctional,'Stateless function components cannot be given refs (See ref "%s" in %s created by %s). Attempts to access this ref will fail.',e,o,this.getName()),(n.refs===y?n.refs={}:n.refs)[e]=r},detachRef:function(e){delete this.getPublicInstance().refs[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){var e=this._instance;return this._compositeType===k.StatelessFunctional?null:e},_instantiateReactComponent:null};e.exports=S},function(e,t,n){"use strict";(function(t){function r(e,t,r,c,f,p){for(var d in e)if(e.hasOwnProperty(d)){var h;try{"function"!=typeof e[d]&&s(!1,"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",c||"React class",a[r],d),h=e[d](t,d,c,r,null,i)}catch(e){h=e}if(u(!h||h instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",c||"React class",a[r],d,typeof h),h instanceof Error&&!(h.message in l)){l[h.message]=!0;var m="";o||(o=n(12)),null!==p?m=o.getStackAddendumByID(p):null!==f&&(m=o.getCurrentStackAddendum(f)),u(!1,"Failed %s type: %s%s",r,h.message,m)}}}var o,a=(n(3),n(192)),i=n(100),s=n(1),u=n(2);void 0!==t&&Object({NODE_ENV:"development"});var l={};e.exports=r}).call(t,n(43))},function(e,t,n){"use strict";var r={};r={prop:"prop",context:"context",childContext:"child context"},e.exports=r},function(e,t,n){"use strict";function r(){return o++}var o=1;e.exports=r},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=r},function(e,t,n){"use strict";function r(e){var t=e&&(o&&e[o]||e[a]);if("function"==typeof t)return t}var o="function"==typeof Symbol&&Symbol.iterator,a="@@iterator";e.exports=r},function(e,t,n){"use strict";(function(t){function r(e,t,r,o){if(e&&"object"==typeof e){var s=e,l=void 0===s[r];a||(a=n(12)),l||u(!1,"flattenChildren(...): Encountered two children with the same key, `%s`. Child keys must be unique; when two children share a key, only the first child will be used.%s",i.unescape(r),a.getStackAddendumByID(o)),l&&null!=t&&(s[r]=t)}}function o(e,t){if(null==e)return e;var n={};return s(e,function(e,n,o){return r(e,n,o,t)},n),n}var a,i=n(64),s=n(106),u=n(2);void 0!==t&&Object({NODE_ENV:"development"}),e.exports=o}).call(t,n(43))},function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),this.renderToStaticMarkup=e,this.useCreateElement=!1,this.updateQueue=new u(this)}var o=n(6),a=n(24),i=n(45),s=n(14),u=n(198),l=[];l.push({initialize:s.debugTool.onBeginFlush,close:s.debugTool.onEndFlush});var c={enqueue:function(){}},f={getTransactionWrappers:function(){return l},getReactMountReady:function(){return c},getUpdateQueue:function(){return this.updateQueue},destructor:function(){},checkpoint:function(){},rollback:function(){}};o(r.prototype,i,f),a.addPoolingTo(r),e.exports=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){var n=e.constructor;i(!1,"%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op. Please check the code for the %s component.",t,t,n&&(n.displayName||n.name)||"ReactClass")}var a=n(65),i=n(2),s=function(){function e(t){r(this,e),this.transaction=t}return e.prototype.isMounted=function(e){return!1},e.prototype.enqueueCallback=function(e,t,n){this.transaction.isInTransaction()&&a.enqueueCallback(e,t,n)},e.prototype.enqueueForceUpdate=function(e){this.transaction.isInTransaction()?a.enqueueForceUpdate(e):o(e,"forceUpdate")},e.prototype.enqueueReplaceState=function(e,t){this.transaction.isInTransaction()?a.enqueueReplaceState(e,t):o(e,"replaceState")},e.prototype.enqueueSetState=function(e,t){this.transaction.isInTransaction()?a.enqueueSetState(e,t):o(e,"setState")},e}();e.exports=s},function(e,t,n){"use strict";var r=n(6),o=n(29),a=n(7),i=function(e){this._currentElement=null,this._hostNode=null,this._hostParent=null,this._hostContainerInfo=null,this._domID=0};r(i.prototype,{mountComponent:function(e,t,n,r){var i=n._idCounter++;this._domID=i,this._hostParent=t,this._hostContainerInfo=n;var s=" react-empty: "+this._domID+" ";if(e.useCreateElement){var u=n._ownerDocument,l=u.createComment(s);return a.precacheNode(this,l),o(l)}return e.renderToStaticMarkup?"":"\x3c!--"+s+"--\x3e"},receiveComponent:function(){},getHostNode:function(){return a.getNodeFromInstance(this)},unmountComponent:function(){a.uncacheNode(this)}}),e.exports=i},function(e,t,n){"use strict";function r(e,t){"_hostNode"in e||u(!1,"getNodeFromInstance: Invalid argument."),"_hostNode"in t||u(!1,"getNodeFromInstance: Invalid argument.");for(var n=0,r=e;r;r=r._hostParent)n++;for(var o=0,a=t;a;a=a._hostParent)o++;for(;n-o>0;)e=e._hostParent,n--;for(;o-n>0;)t=t._hostParent,o--;for(var i=n;i--;){if(e===t)return e;e=e._hostParent,t=t._hostParent}return null}function o(e,t){"_hostNode"in e||u(!1,"isAncestor: Invalid argument."),"_hostNode"in t||u(!1,"isAncestor: Invalid argument.");for(;t;){if(t===e)return!0;t=t._hostParent}return!1}function a(e){return"_hostNode"in e||u(!1,"getParentInstance: Invalid argument."),e._hostParent}function i(e,t,n){for(var r=[];e;)r.push(e),e=e._hostParent;var o;for(o=r.length;o-- >0;)t(r[o],"captured",n);for(o=0;o<r.length;o++)t(r[o],"bubbled",n)}function s(e,t,n,o,a){for(var i=e&&t?r(e,t):null,s=[];e&&e!==i;)s.push(e),e=e._hostParent;for(var u=[];t&&t!==i;)u.push(t),t=t._hostParent;var l;for(l=0;l<s.length;l++)n(s[l],"bubbled",o);for(l=u.length;l-- >0;)n(u[l],"captured",a)}var u=(n(3),n(1));e.exports={isAncestor:o,getLowestCommonAncestor:r,getParentInstance:a,traverseTwoPhase:i,traverseEnterLeave:s}},function(e,t,n){"use strict";var r=(n(3),n(6)),o=n(57),a=n(29),i=n(7),s=n(48),u=n(1),l=n(66),c=function(e){this._currentElement=e,this._stringText=""+e,this._hostNode=null,this._hostParent=null,this._domID=0,this._mountIndex=0,this._closingComment=null,this._commentNodes=null};r(c.prototype,{mountComponent:function(e,t,n,r){var o;null!=t?o=t._ancestorInfo:null!=n&&(o=n._ancestorInfo),o&&l(null,this._stringText,this,o);var u=n._idCounter++,c=" react-text: "+u+" ";if(this._domID=u,this._hostParent=t,e.useCreateElement){var f=n._ownerDocument,p=f.createComment(c),d=f.createComment(" /react-text "),h=a(f.createDocumentFragment());return a.queueChild(h,a(p)),this._stringText&&a.queueChild(h,a(f.createTextNode(this._stringText))),a.queueChild(h,a(d)),i.precacheNode(this,p),this._closingComment=d,h}var m=s(this._stringText);return e.renderToStaticMarkup?m:"\x3c!--"+c+"--\x3e"+m+"\x3c!-- /react-text --\x3e"},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;var n=""+e;if(n!==this._stringText){this._stringText=n;var r=this.getHostNode();o.replaceDelimitedText(r[0],r[1],n)}}},getHostNode:function(){var e=this._commentNodes;if(e)return e;if(!this._closingComment)for(var t=i.getNodeFromInstance(this),n=t.nextSibling;;){if(null==n&&u(!1,"Missing closing comment for text component %s",this._domID),8===n.nodeType&&" /react-text "===n.nodeValue){this._closingComment=n;break}n=n.nextSibling}return e=[this._hostNode,this._closingComment],this._commentNodes=e,e},unmountComponent:function(){this._closingComment=null,this._commentNodes=null,i.uncacheNode(this)}}),e.exports=c},function(e,t,n){"use strict";function r(){this.reinitializeTransaction()}var o=n(6),a=n(18),i=n(45),s=n(13),u={initialize:s,close:function(){p.isBatchingUpdates=!1}},l={initialize:s,close:a.flushBatchedUpdates.bind(a)},c=[l,u];o(r.prototype,i,{getTransactionWrappers:function(){return c}});var f=new r,p={isBatchingUpdates:!1,batchedUpdates:function(e,t,n,r,o,a){var i=p.isBatchingUpdates;return p.isBatchingUpdates=!0,i?e(t,n,r,o,a):f.perform(e,null,t,n,r,o,a)}};e.exports=p},function(e,t,n){"use strict";function r(e){for(;e._hostParent;)e=e._hostParent;var t=f.getNodeFromInstance(e),n=t.parentNode;return f.getClosestInstanceFromNode(n)}function o(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[]}function a(e){var t=d(e.nativeEvent),n=f.getClosestInstanceFromNode(t),o=n;do{e.ancestors.push(o),o=o&&r(o)}while(o);for(var a=0;a<e.ancestors.length;a++)n=e.ancestors[a],m._handleTopLevel(e.topLevelType,n,e.nativeEvent,d(e.nativeEvent))}function i(e){e(h(window))}var s=n(6),u=n(107),l=n(8),c=n(24),f=n(7),p=n(18),d=n(54),h=n(204);s(o.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,this.ancestors.length=0}}),c.addPoolingTo(o,c.twoArgumentPooler);var m={_enabled:!0,_handleTopLevel:null,WINDOW_HANDLE:l.canUseDOM?window:null,setHandleTopLevel:function(e){m._handleTopLevel=e},setEnabled:function(e){m._enabled=!!e},isEnabled:function(){return m._enabled},trapBubbledEvent:function(e,t,n){return n?u.listen(n,t,m.dispatchEvent.bind(null,e)):null},trapCapturedEvent:function(e,t,n){return n?u.capture(n,t,m.dispatchEvent.bind(null,e)):null},monitorScrollValue:function(e){var t=i.bind(null,e);u.listen(window,"scroll",t)},dispatchEvent:function(e,t){if(m._enabled){var n=o.getPooled(e,t);try{p.batchedUpdates(a,n)}finally{o.release(n)}}}};e.exports=m},function(e,t,n){"use strict";function r(e){return e.Window&&e instanceof e.Window?{x:e.pageXOffset||e.document.documentElement.scrollLeft,y:e.pageYOffset||e.document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop}}e.exports=r},function(e,t,n){"use strict";var r=n(21),o=n(34),a=n(52),i=n(61),s=n(104),u=n(49),l=n(105),c=n(18),f={Component:i.injection,DOMProperty:r.injection,EmptyComponent:s.injection,EventPluginHub:o.injection,EventPluginUtils:a.injection,EventEmitter:u.injection,HostComponent:l.injection,Updates:c.injection};e.exports=f},function(e,t,n){"use strict";function r(e){this.reinitializeTransaction(),this.renderToStaticMarkup=!1,this.reactMountReady=a.getPooled(null),this.useCreateElement=e}var o=n(6),a=n(91),i=n(24),s=n(49),u=n(108),l=n(14),c=n(45),f=n(65),p={initialize:u.getSelectionInformation,close:u.restoreSelection},d={initialize:function(){var e=s.isEnabled();return s.setEnabled(!1),e},close:function(e){s.setEnabled(e)}},h={initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll()}},m=[p,d,h];m.push({initialize:l.debugTool.onBeginFlush,close:l.debugTool.onEndFlush});var v={getTransactionWrappers:function(){return m},getReactMountReady:function(){return this.reactMountReady},getUpdateQueue:function(){return f},checkpoint:function(){return this.reactMountReady.checkpoint()},rollback:function(e){this.reactMountReady.rollback(e)},destructor:function(){a.release(this.reactMountReady),this.reactMountReady=null}};o(r.prototype,c,v),i.addPoolingTo(r),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return e===n&&t===r}function o(e){var t=document.selection,n=t.createRange(),r=n.text.length,o=n.duplicate();o.moveToElementText(e),o.setEndPoint("EndToStart",n);var a=o.text.length;return{start:a,end:a+r}}function a(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;var n=t.anchorNode,o=t.anchorOffset,a=t.focusNode,i=t.focusOffset,s=t.getRangeAt(0);try{s.startContainer.nodeType,s.endContainer.nodeType}catch(e){return null}var u=r(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset),l=u?0:s.toString().length,c=s.cloneRange();c.selectNodeContents(e),c.setEnd(s.startContainer,s.startOffset);var f=r(c.startContainer,c.startOffset,c.endContainer,c.endOffset),p=f?0:c.toString().length,d=p+l,h=document.createRange();h.setStart(n,o),h.setEnd(a,i);var m=h.collapsed;return{start:m?d:p,end:m?p:d}}function i(e,t){var n,r,o=document.selection.createRange().duplicate();void 0===t.end?(n=t.start,r=n):t.start>t.end?(n=t.end,r=t.start):(n=t.start,r=t.end),o.moveToElementText(e),o.moveStart("character",n),o.setEndPoint("EndToStart",o),o.moveEnd("character",r-n),o.select()}function s(e,t){if(window.getSelection){var n=window.getSelection(),r=e[c()].length,o=Math.min(t.start,r),a=void 0===t.end?o:Math.min(t.end,r);if(!n.extend&&o>a){var i=a;a=o,o=i}var s=l(e,o),u=l(e,a);if(s&&u){var f=document.createRange();f.setStart(s.node,s.offset),n.removeAllRanges(),o>a?(n.addRange(f),n.extend(u.node,u.offset)):(f.setEnd(u.node,u.offset),n.addRange(f))}}}var u=n(8),l=n(208),c=n(90),f=u.canUseDOM&&"selection"in document&&!("getSelection"in window),p={getOffsets:f?o:a,setOffsets:f?i:s};e.exports=p},function(e,t,n){"use strict";function r(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function o(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function a(e,t){for(var n=r(e),a=0,i=0;n;){if(3===n.nodeType){if(i=a+n.textContent.length,a<=t&&i>=t)return{node:n,offset:t-a};a=i}n=r(o(n))}}e.exports=a},function(e,t,n){"use strict";function r(e,t){return!(!e||!t)&&(e===t||!o(e)&&(o(t)?r(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}var o=n(210);e.exports=r},function(e,t,n){"use strict";function r(e){return o(e)&&3==e.nodeType}var o=n(211);e.exports=r},function(e,t,n){"use strict";function r(e){var t=e?e.ownerDocument||e:document,n=t.defaultView||window;return!(!e||!("function"==typeof n.Node?e instanceof n.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}e.exports=r},function(e,t,n){"use strict";var r={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},o={accentHeight:"accent-height",accumulate:0,additive:0,alignmentBaseline:"alignment-baseline",allowReorder:"allowReorder",alphabetic:0,amplitude:0,arabicForm:"arabic-form",ascent:0,attributeName:"attributeName",attributeType:"attributeType",autoReverse:"autoReverse",azimuth:0,baseFrequency:"baseFrequency",baseProfile:"baseProfile",baselineShift:"baseline-shift",bbox:0,begin:0,bias:0,by:0,calcMode:"calcMode",capHeight:"cap-height",clip:0,clipPath:"clip-path",clipRule:"clip-rule",clipPathUnits:"clipPathUnits",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",contentScriptType:"contentScriptType",contentStyleType:"contentStyleType",cursor:0,cx:0,cy:0,d:0,decelerate:0,descent:0,diffuseConstant:"diffuseConstant",direction:0,display:0,divisor:0,dominantBaseline:"dominant-baseline",dur:0,dx:0,dy:0,edgeMode:"edgeMode",elevation:0,enableBackground:"enable-background",end:0,exponent:0,externalResourcesRequired:"externalResourcesRequired",fill:0,fillOpacity:"fill-opacity",fillRule:"fill-rule",filter:0,filterRes:"filterRes",filterUnits:"filterUnits",floodColor:"flood-color",floodOpacity:"flood-opacity",focusable:0,fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",glyphRef:"glyphRef",gradientTransform:"gradientTransform",gradientUnits:"gradientUnits",hanging:0,horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",ideographic:0,imageRendering:"image-rendering",in:0,in2:0,intercept:0,k:0,k1:0,k2:0,k3:0,k4:0,kernelMatrix:"kernelMatrix",kernelUnitLength:"kernelUnitLength",kerning:0,keyPoints:"keyPoints",keySplines:"keySplines",keyTimes:"keyTimes",lengthAdjust:"lengthAdjust",letterSpacing:"letter-spacing",lightingColor:"lighting-color",limitingConeAngle:"limitingConeAngle",local:0,markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",markerHeight:"markerHeight",markerUnits:"markerUnits",markerWidth:"markerWidth",mask:0,maskContentUnits:"maskContentUnits",maskUnits:"maskUnits",mathematical:0,mode:0,numOctaves:"numOctaves",offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pathLength:"pathLength",patternContentUnits:"patternContentUnits",patternTransform:"patternTransform",patternUnits:"patternUnits",pointerEvents:"pointer-events",points:0,pointsAtX:"pointsAtX",pointsAtY:"pointsAtY",pointsAtZ:"pointsAtZ",preserveAlpha:"preserveAlpha",preserveAspectRatio:"preserveAspectRatio",primitiveUnits:"primitiveUnits",r:0,radius:0,refX:"refX",refY:"refY",renderingIntent:"rendering-intent",repeatCount:"repeatCount",repeatDur:"repeatDur",requiredExtensions:"requiredExtensions",requiredFeatures:"requiredFeatures",restart:0,result:0,rotate:0,rx:0,ry:0,scale:0,seed:0,shapeRendering:"shape-rendering",slope:0,spacing:0,specularConstant:"specularConstant",specularExponent:"specularExponent",speed:0,spreadMethod:"spreadMethod",startOffset:"startOffset",stdDeviation:"stdDeviation",stemh:0,stemv:0,stitchTiles:"stitchTiles",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",string:0,stroke:0,strokeDasharray:"stroke-dasharray",strokeDashoffset:"stroke-dashoffset",strokeLinecap:"stroke-linecap",strokeLinejoin:"stroke-linejoin",strokeMiterlimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",surfaceScale:"surfaceScale",systemLanguage:"systemLanguage",tableValues:"tableValues",targetX:"targetX",targetY:"targetY",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",textLength:"textLength",to:0,transform:0,u1:0,u2:0,underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicode:0,unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",values:0,vectorEffect:"vector-effect",version:0,vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",viewBox:"viewBox",viewTarget:"viewTarget",visibility:0,widths:0,wordSpacing:"word-spacing",writingMode:"writing-mode",x:0,xHeight:"x-height",x1:0,x2:0,xChannelSelector:"xChannelSelector",xlinkActuate:"xlink:actuate",xlinkArcrole:"xlink:arcrole",xlinkHref:"xlink:href",xlinkRole:"xlink:role",xlinkShow:"xlink:show",xlinkTitle:"xlink:title",xlinkType:"xlink:type",xmlBase:"xml:base",xmlns:0,xmlnsXlink:"xmlns:xlink",xmlLang:"xml:lang",xmlSpace:"xml:space",y:0,y1:0,y2:0,yChannelSelector:"yChannelSelector",z:0,zoomAndPan:"zoomAndPan"},a={Properties:{},DOMAttributeNamespaces:{xlinkActuate:r.xlink,xlinkArcrole:r.xlink,xlinkHref:r.xlink,xlinkRole:r.xlink,xlinkShow:r.xlink,xlinkTitle:r.xlink,xlinkType:r.xlink,xmlBase:r.xml,xmlLang:r.xml,xmlSpace:r.xml},DOMAttributeNames:{}};Object.keys(o).forEach(function(e){a.Properties[e]=0,o[e]&&(a.DOMAttributeNames[e]=o[e])}),e.exports=a},function(e,t,n){"use strict";function r(e){if("selectionStart"in e&&u.hasSelectionCapabilities(e))return{start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft}}}function o(e,t){if(y||null==m||m!==c())return null;var n=r(m);if(!g||!p(g,n)){g=n;var o=l.getPooled(h.select,v,e,t);return o.type="select",o.target=m,a.accumulateTwoPhaseDispatches(o),o}return null}var a=n(33),i=n(8),s=n(7),u=n(108),l=n(19),c=n(109),f=n(94),p=n(62),d=i.canUseDOM&&"documentMode"in document&&document.documentMode<=11,h={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:["topBlur","topContextMenu","topFocus","topKeyDown","topKeyUp","topMouseDown","topMouseUp","topSelectionChange"]}},m=null,v=null,g=null,y=!1,b=!1,E={eventTypes:h,extractEvents:function(e,t,n,r){if(!b)return null;var a=t?s.getNodeFromInstance(t):window;switch(e){case"topFocus":(f(a)||"true"===a.contentEditable)&&(m=a,v=t,g=null);break;case"topBlur":m=null,v=null,g=null;break;case"topMouseDown":y=!0;break;case"topContextMenu":case"topMouseUp":return y=!1,o(n,r);case"topSelectionChange":if(d)break;case"topKeyDown":case"topKeyUp":return o(n,r)}return null},didPutListener:function(e,t,n){"onSelect"===t&&(b=!0)}};e.exports=E},function(e,t,n){"use strict";function r(e){return"."+e._rootNodeID}function o(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}var a=(n(3),n(107)),i=n(33),s=n(7),u=n(215),l=n(216),c=n(19),f=n(217),p=n(218),d=n(46),h=n(220),m=n(221),v=n(222),g=n(35),y=n(223),b=n(13),E=n(67),w=n(1),_={},k={};["abort","animationEnd","animationIteration","animationStart","blur","canPlay","canPlayThrough","click","contextMenu","copy","cut","doubleClick","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","focus","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","progress","rateChange","reset","scroll","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchMove","touchStart","transitionEnd","volumeChange","waiting","wheel"].forEach(function(e){var t=e[0].toUpperCase()+e.slice(1),n="on"+t,r="top"+t,o={phasedRegistrationNames:{bubbled:n,captured:n+"Capture"},dependencies:[r]};_[e]=o,k[r]=o});var C={},S={eventTypes:_,extractEvents:function(e,t,n,r){var o=k[e];if(!o)return null;var a;switch(e){case"topAbort":case"topCanPlay":case"topCanPlayThrough":case"topDurationChange":case"topEmptied":case"topEncrypted":case"topEnded":case"topError":case"topInput":case"topInvalid":case"topLoad":case"topLoadedData":case"topLoadedMetadata":case"topLoadStart":case"topPause":case"topPlay":case"topPlaying":case"topProgress":case"topRateChange":case"topReset":case"topSeeked":case"topSeeking":case"topStalled":case"topSubmit":case"topSuspend":case"topTimeUpdate":case"topVolumeChange":case"topWaiting":a=c;break;case"topKeyPress":if(0===E(n))return null;case"topKeyDown":case"topKeyUp":a=p;break;case"topBlur":case"topFocus":a=f;break;case"topClick":if(2===n.button)return null;case"topDoubleClick":case"topMouseDown":case"topMouseMove":case"topMouseUp":case"topMouseOut":case"topMouseOver":case"topContextMenu":a=d;break;case"topDrag":case"topDragEnd":case"topDragEnter":case"topDragExit":case"topDragLeave":case"topDragOver":case"topDragStart":case"topDrop":a=h;break;case"topTouchCancel":case"topTouchEnd":case"topTouchMove":case"topTouchStart":a=m;break;case"topAnimationEnd":case"topAnimationIteration":case"topAnimationStart":a=u;break;case"topTransitionEnd":a=v;break;case"topScroll":a=g;break;case"topWheel":a=y;break;case"topCopy":case"topCut":case"topPaste":a=l}a||w(!1,"SimpleEventPlugin: Unhandled event type, `%s`.",e);var s=a.getPooled(o,t,n,r);return i.accumulateTwoPhaseDispatches(s),s},didPutListener:function(e,t,n){if("onClick"===t&&!o(e._tag)){var i=r(e),u=s.getNodeFromInstance(e);C[i]||(C[i]=a.listen(u,"click",b))}},willDeleteListener:function(e,t){if("onClick"===t&&!o(e._tag)){var n=r(e);C[n].remove(),delete C[n]}}};e.exports=S},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a={animationName:null,elapsedTime:null,pseudoElement:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a={clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(35),a={relatedTarget:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(35),a=n(67),i=n(219),s=n(56),u={key:i,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:s,charCode:function(e){return"keypress"===e.type?a(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?a(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};o.augmentClass(r,u),e.exports=r},function(e,t,n){"use strict";function r(e){if(e.key){var t=a[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){var n=o(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?i[e.keyCode]||"Unidentified":""}var o=n(67),a={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},i={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(46),a={dataTransfer:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(35),a=n(56),i={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:a};o.augmentClass(r,i),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(19),a={propertyName:null,elapsedTime:null,pseudoElement:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t,n,r){return o.call(this,e,t,n,r)}var o=n(46),a={deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null};o.augmentClass(r,a),e.exports=r},function(e,t,n){"use strict";function r(e,t){var n={_topLevelWrapper:e,_idCounter:1,_ownerDocument:t?t.nodeType===a?t:t.ownerDocument:null,_node:t,_tag:t?t.nodeName.toLowerCase():null,_namespaceURI:t?t.namespaceURI:null};return n._ancestorInfo=t?o.updatedAncestorInfo(null,n._tag,null):null,n}var o=n(66),a=9;e.exports=r},function(e,t,n){"use strict";var r={useCreateElement:!0,useFiber:!1};e.exports=r},function(e,t,n){"use strict";var r=n(227),o=/\/?>/,a=/^<\!\-\-/,i={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){var t=r(e);return a.test(e)?e:e.replace(o," "+i.CHECKSUM_ATTR_NAME+'="'+t+'"$&')},canReuseMarkup:function(e,t){var n=t.getAttribute(i.CHECKSUM_ATTR_NAME);return n=n&&parseInt(n,10),r(e)===n}};e.exports=i},function(e,t,n){"use strict";function r(e){for(var t=1,n=0,r=0,a=e.length,i=-4&a;r<i;){for(var s=Math.min(r+4096,i);r<s;r+=4)n+=(t+=e.charCodeAt(r))+(t+=e.charCodeAt(r+1))+(t+=e.charCodeAt(r+2))+(t+=e.charCodeAt(r+3));t%=o,n%=o}for(;r<a;r++)n+=t+=e.charCodeAt(r);return t%=o,n%=o,t|n<<16}var o=65521;e.exports=r},function(e,t,n){"use strict";e.exports="15.6.1"},function(e,t,n){"use strict";function r(e){var t=o.current;if(null!==t&&(l(t._warnedAboutRefsInRender,"%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",t.getName()||"A component"),t._warnedAboutRefsInRender=!0),null==e)return null;if(1===e.nodeType)return e;var n=i.get(e);if(n)return n=s(n),n?a.getNodeFromInstance(n):null;"function"==typeof e.render?u(!1,"findDOMNode was called on an unmounted component."):u(!1,"Element appears to be neither ReactComponent nor DOMNode (keys: %s)",Object.keys(e))}var o=(n(3),n(17)),a=n(7),i=n(36),s=n(111),u=n(1),l=n(2);e.exports=r},function(e,t,n){"use strict";var r=n(110);e.exports=r.renderSubtreeIntoContainer},function(e,t,n){"use strict";function r(e,t){null!=t&&"string"==typeof t.type&&(t.type.indexOf("-")>=0||t.props.is||f(e,t))}var o=n(21),a=n(44),i=n(12),s=n(2),u={children:!0,dangerouslySetInnerHTML:!0,key:!0,ref:!0,autoFocus:!0,defaultValue:!0,valueLink:!0,defaultChecked:!0,checkedLink:!0,innerHTML:!0,suppressContentEditableWarning:!0,onFocusIn:!0,onFocusOut:!0},l={},c=function(e,t,n){if(o.properties.hasOwnProperty(t)||o.isCustomAttribute(t))return!0;if(u.hasOwnProperty(t)&&u[t]||l.hasOwnProperty(t)&&l[t])return!0;if(a.registrationNameModules.hasOwnProperty(t))return!0;l[t]=!0;var r=t.toLowerCase(),c=o.isCustomAttribute(r)?r:o.getPossibleStandardName.hasOwnProperty(r)?o.getPossibleStandardName[r]:null,f=a.possibleRegistrationNames.hasOwnProperty(r)?a.possibleRegistrationNames[r]:null;return null!=c?(s(!1,"Unknown DOM property %s. Did you mean %s?%s",t,c,i.getStackAddendumByID(n)),!0):null!=f&&(s(!1,"Unknown event handler property %s. Did you mean `%s`?%s",t,f,i.getStackAddendumByID(n)),!0)},f=function(e,t){var n=[];for(var r in t.props){c(t.type,r,e)||n.push(r)}var o=n.map(function(e){return"`"+e+"`"}).join(", ");1===n.length?s(!1,"Unknown prop %s on <%s> tag. Remove this prop from the element. For details, see https://fb.me/react-unknown-prop%s",o,t.type,i.getStackAddendumByID(e)):n.length>1&&s(!1,"Unknown props %s on <%s> tag. Remove these props from the element. For details, see https://fb.me/react-unknown-prop%s",o,t.type,i.getStackAddendumByID(e))},p={onBeforeMountComponent:function(e,t){r(e,t)},onBeforeUpdateComponent:function(e,t){r(e,t)}};e.exports=p},function(e,t,n){"use strict";function r(e,t){null!=t&&("input"!==t.type&&"textarea"!==t.type&&"select"!==t.type||null==t.props||null!==t.props.value||i||(a(!1,"`value` prop on `%s` should not be null. Consider using the empty string to clear the component or `undefined` for uncontrolled components.%s",t.type,o.getStackAddendumByID(e)),i=!0))}var o=n(12),a=n(2),i=!1,s={onBeforeMountComponent:function(e,t){r(e,t)},onBeforeUpdateComponent:function(e,t){r(e,t)}};e.exports=s},function(e,t,n){"use strict";function r(e,t,n){if(l.hasOwnProperty(t)&&l[t])return!0;if(c.test(t)){var r=t.toLowerCase(),o=i.getPossibleStandardName.hasOwnProperty(r)?i.getPossibleStandardName[r]:null;if(null==o)return l[t]=!0,!1;if(t!==o)return u(!1,"Unknown ARIA attribute %s. Did you mean %s?%s",t,o,s.getStackAddendumByID(n)),l[t]=!0,!0}return!0}function o(e,t){var n=[];for(var o in t.props){r(t.type,o,e)||n.push(o)}var a=n.map(function(e){return"`"+e+"`"}).join(", ");1===n.length?u(!1,"Invalid aria prop %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s",a,t.type,s.getStackAddendumByID(e)):n.length>1&&u(!1,"Invalid aria props %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s",a,t.type,s.getStackAddendumByID(e))}function a(e,t){null!=t&&"string"==typeof t.type&&(t.type.indexOf("-")>=0||t.props.is||o(e,t))}var i=n(21),s=n(12),u=n(2),l={},c=new RegExp("^(aria)-["+i.ATTRIBUTE_NAME_CHAR+"]*$"),f={onBeforeMountComponent:function(e,t){a(e,t)},onBeforeUpdateComponent:function(e,t){a(e,t)}};e.exports=f},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=r(o),i=n(4),s=n(5),u=n(283),l=r(u),c=function(e){var t=e.store;return a.default.createElement(i.Provider,{store:t},a.default.createElement(s.HashRouter,null,a.default.createElement(l.default,null)))};t.default=c},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(){d||(d=!0,p.a("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions."))}function s(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"store",n=arguments[1],s=n||t+"Subscription",l=function(e){function n(a,i){r(this,n);var s=o(this,e.call(this,a,i));return s[t]=a.store,s}return a(n,e),n.prototype.getChildContext=function(){var e;return e={},e[t]=this[t],e[s]=null,e},n.prototype.render=function(){return u.Children.only(this.props.children)},n}(u.Component);return l.prototype.componentWillReceiveProps=function(e){this[t]!==e.store&&i()},l.propTypes={store:f.a.isRequired,children:c.a.element.isRequired},l.childContextTypes=(e={},e[t]=f.a.isRequired,e[s]=f.b,e),l.displayName="Provider",l}t.a=s;var u=n(0),l=(n.n(u),n(10)),c=n.n(l),f=n(112),p=n(68),d=!1;t.b=s()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){var e=[],t=[];return{clear:function(){t=a,e=a},notify:function(){for(var n=e=t,r=0;r<n.length;r++)n[r]()},subscribe:function(n){var r=!0;return t===e&&(t=e.slice()),t.push(n),function(){r&&e!==a&&(r=!1,t===e&&(t=e.slice()),t.splice(t.indexOf(n),1))}}}}n.d(t,"a",function(){return s});var a=null,i={notify:function(){}},s=function(){function e(t,n,o){r(this,e),this.store=t,this.parentSub=n,this.onStateChange=o,this.unsubscribe=null,this.listeners=i}return e.prototype.addNestedSub=function(e){return this.trySubscribe(),this.listeners.subscribe(e)},e.prototype.notifyNestedSubs=function(){this.listeners.notify()},e.prototype.isSubscribed=function(){return Boolean(this.unsubscribe)},e.prototype.trySubscribe=function(){this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.onStateChange):this.store.subscribe(this.onStateChange),this.listeners=o())},e.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=i)},e}()},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t,n){for(var r=t.length-1;r>=0;r--){var o=t[r](e);if(o)return o}return function(t,r){throw new Error("Invalid value of type "+typeof e+" for "+n+" argument when connecting component "+r.wrappedComponentName+".")}}function a(e,t){return e===t}var i=n(113),s=n(238),u=n(239),l=n(254),c=n(255),f=n(256),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.connectHOC,n=void 0===t?i.a:t,d=e.mapStateToPropsFactories,h=void 0===d?l.a:d,m=e.mapDispatchToPropsFactories,v=void 0===m?u.a:m,g=e.mergePropsFactories,y=void 0===g?c.a:g,b=e.selectorFactory,E=void 0===b?f.a:b;return function(e,t,i){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=u.pure,c=void 0===l||l,f=u.areStatesEqual,d=void 0===f?a:f,m=u.areOwnPropsEqual,g=void 0===m?s.a:m,b=u.areStatePropsEqual,w=void 0===b?s.a:b,_=u.areMergedPropsEqual,k=void 0===_?s.a:_,C=r(u,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),S=o(e,h,"mapStateToProps"),x=o(t,v,"mapDispatchToProps"),P=o(i,y,"mergeProps");return n(E,p({methodName:"connect",getDisplayName:function(e){return"Connect("+e+")"},shouldHandleStateChanges:Boolean(e),initMapStateToProps:S,initMapDispatchToProps:x,initMergeProps:P,pure:c,areStatesEqual:d,areOwnPropsEqual:g,areStatePropsEqual:w,areMergedPropsEqual:k},C))}}()},function(e,t,n){"use strict";function r(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!==e&&t!==t}function o(e,t){if(r(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(var i=0;i<n.length;i++)if(!a.call(t,n[i])||!r(e[n[i]],t[n[i]]))return!1;return!0}t.a=o;var a=Object.prototype.hasOwnProperty},function(e,t,n){"use strict";function r(e){return"function"==typeof e?s.b(e,"mapDispatchToProps"):void 0}function o(e){return e?void 0:s.a(function(e){return{dispatch:e}})}function a(e){return e&&"object"==typeof e?s.a(function(t){return i.bindActionCreators(e,t)}):void 0}var i=n(69),s=n(119);t.a=[r,o,a]},function(e,t,n){"use strict";function r(e){return null==e?void 0===e?u:s:l&&l in Object(e)?a.a(e):i.a(e)}var o=n(116),a=n(243),i=n(244),s="[object Null]",u="[object Undefined]",l=o.a?o.a.toStringTag:void 0;t.a=r},function(e,t,n){"use strict";var r=n(242),o="object"==typeof self&&self&&self.Object===Object&&self,a=r.a||o||Function("return this")();t.a=a},function(e,t,n){"use strict";(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.a=n}).call(t,n(38))},function(e,t,n){"use strict";function r(e){var t=i.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(e){}var o=s.call(e);return r&&(t?e[u]=n:delete e[u]),o}var o=n(116),a=Object.prototype,i=a.hasOwnProperty,s=a.toString,u=o.a?o.a.toStringTag:void 0;t.a=r},function(e,t,n){"use strict";function r(e){return a.call(e)}var o=Object.prototype,a=o.toString;t.a=r},function(e,t,n){"use strict";var r=n(246),o=r.a(Object.getPrototypeOf,Object);t.a=o},function(e,t,n){"use strict";function r(e,t){return function(n){return e(t(n))}}t.a=r},function(e,t,n){"use strict";function r(e){return null!=e&&"object"==typeof e}t.a=r},function(e,t,n){e.exports=n(249)},function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0});var o,a=n(250),i=function(e){return e&&e.__esModule?e:{default:e}}(a);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:r;var s=(0,i.default)(o);t.default=s}).call(t,n(38),n(117)(e))},function(e,t,n){"use strict";function r(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t){var n=t&&t.type;return"Given action "+(n&&'"'+n.toString()+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function o(e,t,n,r){var o=Object.keys(t),a=n&&n.type===s.a.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===o.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!u.a(e))return"The "+a+' has unexpected type of "'+{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following keys: "'+o.join('", "')+'"';var i=Object.keys(e).filter(function(e){return!t.hasOwnProperty(e)&&!r[e]});return i.forEach(function(e){r[e]=!0}),i.length>0?"Unexpected "+(i.length>1?"keys":"key")+' "'+i.join('", "')+'" found in '+a+'. Expected to find one of the known reducer keys instead: "'+o.join('", "')+'". Unexpected keys will be ignored.':void 0}function a(e){Object.keys(e).forEach(function(t){var n=e[t];if(void 0===n(void 0,{type:s.a.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===n(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+s.a.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}function i(e){for(var t=Object.keys(e),n={},i=0;i<t.length;i++){var s=t[i];void 0===e[s]&&l.a('No reducer provided for key "'+s+'"'),"function"==typeof e[s]&&(n[s]=e[s])}var u=Object.keys(n),c=void 0;c={};var f=void 0;try{a(n)}catch(e){f=e}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];if(f)throw f;var a=o(e,n,t,c);a&&l.a(a);for(var i=!1,s={},p=0;p<u.length;p++){var d=u[p],h=n[d],m=e[d],v=h(m,t);if(void 0===v){var g=r(d,t);throw new Error(g)}s[d]=v,i=i||v!==m}return i?s:e}}t.a=i;var s=n(115),u=n(70),l=n(71)},function(e,t,n){"use strict";function r(e,t){return function(){return t(e.apply(void 0,arguments))}}function o(e,t){if("function"==typeof e)return r(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var n=Object.keys(e),o={},i=0;i<n.length;i++){var s=n[i],u=e[s];"function"==typeof u?o[s]=r(u,t):a.a("bindActionCreators expected a function actionCreator for key '"+s+"', instead received type '"+typeof u+"'.")}return o}t.a=o;var a=n(71)},function(e,t,n){"use strict";function r(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return function(n,r,i){var s=e(n,r,i),u=s.dispatch,l=[],c={getState:s.getState,dispatch:function(e){return u(e)}};return l=t.map(function(e){return e(c)}),u=o.a.apply(void 0,l)(s.dispatch),a({},s,{dispatch:u})}}}t.a=r;var o=n(118),a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},function(e,t,n){"use strict";function r(e){return"function"==typeof e?a.b(e,"mapStateToProps"):void 0}function o(e){return e?void 0:a.a(function(){return{}})}var a=n(119);t.a=[r,o]},function(e,t,n){"use strict";function r(e,t,n){return u({},n,e,t)}function o(e){return function(t,n){var r=n.displayName,o=n.pure,a=n.areMergedPropsEqual,i=!1,u=void 0;return function(t,n,l){var c=e(t,n,l);return i?o&&a(c,u)||(u=c):(i=!0,u=c,s.a(u,r,"mergeProps")),u}}}function a(e){return"function"==typeof e?o(e):void 0}function i(e){return e?void 0:function(){return r}}var s=n(120),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.a=[a,i]},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t,n,r){return function(o,a){return n(e(o,a),t(r,a),a)}}function a(e,t,n,r,o){function a(o,a){return h=o,m=a,v=e(h,m),g=t(r,m),y=n(v,g,m),d=!0,y}function i(){return v=e(h,m),t.dependsOnOwnProps&&(g=t(r,m)),y=n(v,g,m)}function s(){return e.dependsOnOwnProps&&(v=e(h,m)),t.dependsOnOwnProps&&(g=t(r,m)),y=n(v,g,m)}function u(){var t=e(h,m),r=!p(t,v);return v=t,r&&(y=n(v,g,m)),y}function l(e,t){var n=!f(t,m),r=!c(e,h);return h=e,m=t,n&&r?i():n?s():r?u():y}var c=o.areStatesEqual,f=o.areOwnPropsEqual,p=o.areStatePropsEqual,d=!1,h=void 0,m=void 0,v=void 0,g=void 0,y=void 0;return function(e,t){return d?l(e,t):a(e,t)}}function i(e,t){var n=t.initMapStateToProps,i=t.initMapDispatchToProps,u=t.initMergeProps,l=r(t,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),c=n(e,l),f=i(e,l),p=u(e,l);return s.a(c,f,p,l.displayName),(l.pure?a:o)(c,f,p,e,l)}t.a=i;var s=n(257)},function(e,t,n){"use strict";function r(e,t,n){if(!e)throw new Error("Unexpected value for "+t+" in "+n+".");"mapStateToProps"!==t&&"mapDispatchToProps"!==t||e.hasOwnProperty("dependsOnOwnProps")||a.a("The selector for "+t+" of "+n+" did not specify a value for dependsOnOwnProps.")}function o(e,t,n,o){r(e,"mapStateToProps",o),r(t,"mapDispatchToProps",o),r(n,"mergeProps",o)}t.a=o;var a=n(68)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=n(259),f=n.n(c),p=n(15),d=function(e){function t(){var n,a,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=a=o(this,e.call.apply(e,[this].concat(u))),a.history=f.a(a.props),i=n,o(a,i)}return a(t,e),t.prototype.render=function(){return s.a.createElement(p.e,{history:this.history,children:this.props.children})},t}(s.a.Component);d.propTypes={basename:l.a.string,forceRefresh:l.a.bool,getUserConfirmation:l.a.func,keyLength:l.a.number,children:l.a.node},t.a=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(25),s=r(i),u=n(37),l=r(u),c=n(72),f=n(39),p=n(73),d=r(p),h=n(121),m=function(){try{return window.history.state||{}}catch(e){return{}}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,l.default)(h.canUseDOM,"Browser history needs a DOM");var t=window.history,n=(0,h.supportsHistory)(),r=!(0,h.supportsPopStateOnHashChange)(),i=e.forceRefresh,u=void 0!==i&&i,p=e.getUserConfirmation,v=void 0===p?h.getConfirmation:p,g=e.keyLength,y=void 0===g?6:g,b=e.basename?(0,f.stripTrailingSlash)((0,f.addLeadingSlash)(e.basename)):"",E=function(e){var t=e||{},n=t.key,r=t.state,o=window.location,a=o.pathname,i=o.search,u=o.hash,l=a+i+u;return(0,s.default)(!b||(0,f.hasBasename)(l,b),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+l+'" to begin with "'+b+'".'),b&&(l=(0,f.stripBasename)(l,b)),(0,c.createLocation)(l,r,n)},w=function(){return Math.random().toString(36).substr(2,y)},_=(0,d.default)(),k=function(e){a(V,e),V.length=t.length,_.notifyListeners(V.location,V.action)},C=function(e){(0,h.isExtraneousPopstateEvent)(e)||P(E(e.state))},S=function(){P(E(m()))},x=!1,P=function(e){if(x)x=!1,k();else{_.confirmTransitionTo(e,"POP",v,function(t){t?k({action:"POP",location:e}):T(e)})}},T=function(e){var t=V.location,n=N.indexOf(t.key);-1===n&&(n=0);var r=N.indexOf(e.key);-1===r&&(r=0);var o=n-r;o&&(x=!0,A(o))},O=E(m()),N=[O.key],I=function(e){return b+(0,f.createPath)(e)},M=function(e,r){(0,s.default)(!("object"===(void 0===e?"undefined":o(e))&&void 0!==e.state&&void 0!==r),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var a=(0,c.createLocation)(e,r,w(),V.location);_.confirmTransitionTo(a,"PUSH",v,function(e){if(e){var r=I(a),o=a.key,i=a.state;if(n)if(t.pushState({key:o,state:i},null,r),u)window.location.href=r;else{var l=N.indexOf(V.location.key),c=N.slice(0,-1===l?0:l+1);c.push(a.key),N=c,k({action:"PUSH",location:a})}else(0,s.default)(void 0===i,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=r}})},D=function(e,r){(0,s.default)(!("object"===(void 0===e?"undefined":o(e))&&void 0!==e.state&&void 0!==r),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var a=(0,c.createLocation)(e,r,w(),V.location);_.confirmTransitionTo(a,"REPLACE",v,function(e){if(e){var r=I(a),o=a.key,i=a.state;if(n)if(t.replaceState({key:o,state:i},null,r),u)window.location.replace(r);else{var l=N.indexOf(V.location.key);-1!==l&&(N[l]=a.key),k({action:"REPLACE",location:a})}else(0,s.default)(void 0===i,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(r)}})},A=function(e){t.go(e)},R=function(){return A(-1)},j=function(){return A(1)},L=0,U=function(e){L+=e,1===L?((0,h.addEventListener)(window,"popstate",C),r&&(0,h.addEventListener)(window,"hashchange",S)):0===L&&((0,h.removeEventListener)(window,"popstate",C),r&&(0,h.removeEventListener)(window,"hashchange",S))},F=!1,B=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=_.setPrompt(e);return F||(U(1),F=!0),function(){return F&&(F=!1,U(-1)),t()}},W=function(e){var t=_.appendListener(e);return U(1),function(){U(-1),t()}},V={length:t.length,action:"POP",location:O,createHref:I,push:M,replace:D,go:A,goBack:R,goForward:j,block:B,listen:W};return V};t.default=v},function(e,t,n){"use strict";var r=function(e){return"/"===e.charAt(0)},o=function(e,t){for(var n=t,r=n+1,o=e.length;r<o;n+=1,r+=1)e[n]=e[r];e.pop()},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=e&&e.split("/")||[],a=t&&t.split("/")||[],i=e&&r(e),s=t&&r(t),u=i||s;if(e&&r(e)?a=n:n.length&&(a.pop(),a=a.concat(n)),!a.length)return"/";var l=void 0;if(a.length){var c=a[a.length-1];l="."===c||".."===c||""===c}else l=!1;for(var f=0,p=a.length;p>=0;p--){var d=a[p];"."===d?o(a,p):".."===d?(o(a,p),f++):f&&(o(a,p),f--)}if(!u)for(;f--;f)a.unshift("..");!u||""===a[0]||a[0]&&r(a[0])||a.unshift("");var h=a.join("/");return l&&"/"!==h.substr(-1)&&(h+="/"),h};e.exports=a},function(e,t,n){"use strict";t.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function e(t,n){if(t===n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every(function(t,r){return e(t,n[r])});var o=void 0===t?"undefined":r(t);if(o!==(void 0===n?"undefined":r(n)))return!1;if("object"===o){var a=t.valueOf(),i=n.valueOf();if(a!==t||i!==n)return e(a,i);var s=Object.keys(t),u=Object.keys(n);return s.length===u.length&&s.every(function(r){return e(t[r],n[r])})}return!1};t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=n(263),f=n.n(c),p=n(74),d=function(e){function t(){var n,a,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=a=o(this,e.call.apply(e,[this].concat(u))),a.history=f.a(a.props),i=n,o(a,i)}return a(t,e),t.prototype.render=function(){return s.a.createElement(p.a,{history:this.history,children:this.props.children})},t}(s.a.Component);d.propTypes={initialEntries:l.a.array,initialIndex:l.a.number,getUserConfirmation:l.a.func,keyLength:l.a.number,children:l.a.node},t.a=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(25),s=r(i),u=n(39),l=n(72),c=n(73),f=r(c),p=function(e,t,n){return Math.min(Math.max(e,t),n)},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getUserConfirmation,n=e.initialEntries,r=void 0===n?["/"]:n,i=e.initialIndex,c=void 0===i?0:i,d=e.keyLength,h=void 0===d?6:d,m=(0,f.default)(),v=function(e){a(O,e),O.length=O.entries.length,m.notifyListeners(O.location,O.action)},g=function(){return Math.random().toString(36).substr(2,h)},y=p(c,0,r.length-1),b=r.map(function(e){return"string"==typeof e?(0,l.createLocation)(e,void 0,g()):(0,l.createLocation)(e,void 0,e.key||g())}),E=u.createPath,w=function(e,n){(0,s.default)(!("object"===(void 0===e?"undefined":o(e))&&void 0!==e.state&&void 0!==n),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");var r=(0,l.createLocation)(e,n,g(),O.location);m.confirmTransitionTo(r,"PUSH",t,function(e){if(e){var t=O.index,n=t+1,o=O.entries.slice(0);o.length>n?o.splice(n,o.length-n,r):o.push(r),v({action:"PUSH",location:r,index:n,entries:o})}})},_=function(e,n){(0,s.default)(!("object"===(void 0===e?"undefined":o(e))&&void 0!==e.state&&void 0!==n),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");var r=(0,l.createLocation)(e,n,g(),O.location);m.confirmTransitionTo(r,"REPLACE",t,function(e){e&&(O.entries[O.index]=r,v({action:"REPLACE",location:r}))})},k=function(e){var n=p(O.index+e,0,O.entries.length-1),r=O.entries[n];m.confirmTransitionTo(r,"POP",t,function(e){e?v({action:"POP",location:r,index:n}):v()})},C=function(){return k(-1)},S=function(){return k(1)},x=function(e){var t=O.index+e;return t>=0&&t<O.entries.length},P=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return m.setPrompt(e)},T=function(e){return m.appendListener(e)},O={length:b.length,action:"POP",location:b[y],index:y,entries:b,createHref:E,push:w,replace:_,go:k,goBack:C,goForward:S,canGo:x,block:P,listen:T};return O};t.default=d},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.enable=function(e){this.unblock&&this.unblock(),this.unblock=this.context.router.history.block(e)},t.prototype.disable=function(){this.unblock&&(this.unblock(),this.unblock=null)},t.prototype.componentWillMount=function(){this.props.when&&this.enable(this.props.message)},t.prototype.componentWillReceiveProps=function(e){e.when?this.props.when&&this.props.message===e.message||this.enable(e.message):this.disable()},t.prototype.componentWillUnmount=function(){this.disable()},t.prototype.render=function(){return null},t}(s.a.Component);c.propTypes={when:l.a.bool,message:l.a.oneOfType([l.a.func,l.a.string]).isRequired},c.defaultProps={when:!0},c.contextTypes={router:l.a.shape({history:l.a.shape({block:l.a.func.isRequired}).isRequired}).isRequired},t.a=c},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},t.prototype.componentWillMount=function(){this.isStatic()&&this.perform()},t.prototype.componentDidMount=function(){this.isStatic()||this.perform()},t.prototype.perform=function(){var e=this.context.router.history,t=this.props,n=t.push,r=t.to;n?e.push(r):e.replace(r)},t.prototype.render=function(){return null},t}(s.a.Component);c.propTypes={push:l.a.bool,from:l.a.string,to:l.a.oneOfType([l.a.string,l.a.object])},c.defaultProps={push:!1},c.contextTypes={router:l.a.shape({history:l.a.shape({push:l.a.func.isRequired,replace:l.a.func.isRequired}).isRequired,staticContext:l.a.object}).isRequired},t.a=c},function(e,t,n){function r(e,t){for(var n,r=[],o=0,a=0,i="",s=t&&t.delimiter||"/";null!=(n=y.exec(e));){var c=n[0],f=n[1],p=n.index;if(i+=e.slice(a,p),a=p+c.length,f)i+=f[1];else{var d=e[a],h=n[2],m=n[3],v=n[4],g=n[5],b=n[6],E=n[7];i&&(r.push(i),i="");var w=null!=h&&null!=d&&d!==h,_="+"===b||"*"===b,k="?"===b||"*"===b,C=n[2]||s,S=v||g;r.push({name:m||o++,prefix:h||"",delimiter:C,optional:k,repeat:_,partial:w,asterisk:!!E,pattern:S?l(S):E?".*":"[^"+u(C)+"]+?"})}}return a<e.length&&(i+=e.substr(a)),i&&r.push(i),r}function o(e,t){return s(r(e,t))}function a(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function i(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},u=r||{},l=u.pretty?a:encodeURIComponent,c=0;c<e.length;c++){var f=e[c];if("string"!=typeof f){var p,d=s[f.name];if(null==d){if(f.optional){f.partial&&(o+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(g(d)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(d)+"`");if(0===d.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var h=0;h<d.length;h++){if(p=l(d[h]),!t[c].test(p))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===h?f.prefix:f.delimiter)+p}}else{if(p=f.asterisk?i(d):l(d),!t[c].test(p))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+p+'"');o+=f.prefix+p}}else o+=f}return o}}function u(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function l(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function c(e,t){return e.keys=t,e}function f(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return c(e,t)}function d(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(v(e[o],t,n).source);return c(new RegExp("(?:"+r.join("|")+")",f(n)),t)}function h(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){g(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=!1!==n.end,a="",i=0;i<e.length;i++){var s=e[i];if("string"==typeof s)a+=u(s);else{var l=u(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+l+p+")*"),p=s.optional?s.partial?l+"("+p+")?":"(?:"+l+"("+p+"))?":l+"("+p+")",a+=p}}var d=u(n.delimiter||"/"),h=a.slice(-d.length)===d;return r||(a=(h?a.slice(0,-d.length):a)+"(?:"+d+"(?=$))?"),a+=o?"$":r&&h?"":"(?="+d+"|$)",c(new RegExp("^"+a,f(n)),t)}function v(e,t,n){return g(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):g(e)?d(e,t,n):h(e,t,n)}var g=n(267);e.exports=v,e.exports.parse=r,e.exports.compile=o,e.exports.tokensToFunction=s,e.exports.tokensToRegExp=m;var y=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(37),u=n.n(s),l=n(0),c=n.n(l),f=n(10),p=n.n(f),d=n(39),h=(n.n(d),n(74)),m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},v=function(e){var t=e.pathname,n=void 0===t?"/":t,r=e.search,o=void 0===r?"":r,a=e.hash,i=void 0===a?"":a;return{pathname:n,search:"?"===o?"":o,hash:"#"===i?"":i}},g=function(e,t){return e?m({},t,{pathname:d.addLeadingSlash(e)+t.pathname}):t},y=function(e,t){if(!e)return t;var n=d.addLeadingSlash(e);return 0!==t.pathname.indexOf(n)?t:m({},t,{pathname:t.pathname.substr(n.length)})},b=function(e){return"string"==typeof e?d.parsePath(e):v(e)},E=function(e){return"string"==typeof e?e:d.createPath(e)},w=function(e){return function(){u.a(!1,"You cannot %s with <StaticRouter>",e)}},_=function(){},k=function(e){function t(){var n,r,i;o(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=r=a(this,e.call.apply(e,[this].concat(u))),r.createHref=function(e){return d.addLeadingSlash(r.props.basename+E(e))},r.handlePush=function(e){var t=r.props,n=t.basename,o=t.context;o.action="PUSH",o.location=g(n,b(e)),o.url=E(o.location)},r.handleReplace=function(e){var t=r.props,n=t.basename,o=t.context;o.action="REPLACE",o.location=g(n,b(e)),o.url=E(o.location)},r.handleListen=function(){return _},r.handleBlock=function(){return _},i=n,a(r,i)}return i(t,e),t.prototype.getChildContext=function(){return{router:{staticContext:this.props.context}}},t.prototype.render=function(){var e=this.props,t=e.basename,n=(e.context,e.location),o=r(e,["basename","context","location"]),a={createHref:this.createHref,action:"POP",location:y(t,b(n)),push:this.handlePush,replace:this.handleReplace,go:w("go"),goBack:w("goBack"),goForward:w("goForward"),listen:this.handleListen,block:this.handleBlock};return c.a.createElement(h.a,m({},o,{history:a}))},t}(c.a.Component);k.propTypes={basename:p.a.string,context:p.a.object.isRequired,location:p.a.oneOfType([p.a.string,p.a.object])},k.defaultProps={basename:"",location:"/"},k.childContextTypes={router:p.a.object.isRequired},t.a=k},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=n(25),f=n.n(c),p=n(75),d=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.componentWillReceiveProps=function(e){f.a(!(e.location&&!this.props.location),'<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'),f.a(!(!e.location&&this.props.location),'<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.')},t.prototype.render=function(){var e=this.context.router.route,t=this.props.children,n=this.props.location||e.location,r=void 0,o=void 0;return s.a.Children.forEach(t,function(t){if(s.a.isValidElement(t)){var a=t.props,i=a.path,u=a.exact,l=a.strict,c=a.from,f=i||c;null==r&&(o=t,r=f?p.a(n.pathname,{path:f,exact:u,strict:l}):e.match)}}),r?s.a.cloneElement(o,{location:n,computedMatch:r}):null},t}(s.a.Component);d.contextTypes={router:l.a.shape({route:l.a.object.isRequired}).isRequired},d.propTypes={children:l.a.node,location:l.a.object},t.a=d},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=n(0),a=n.n(o),i=n(10),s=n.n(i),u=n(114),l=n.n(u),c=n(122),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=function(e){var t=function(t){var n=t.wrappedComponentRef,o=r(t,["wrappedComponentRef"]);return a.a.createElement(c.a,{render:function(t){return a.a.createElement(e,f({},o,t,{ref:n}))}})};return t.displayName="withRouter("+(e.displayName||e.name)+")",t.WrappedComponent=e,t.propTypes={wrappedComponentRef:s.a.func},l.a(t,e)};t.a=p},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(10),l=n.n(u),c=n(272),f=n.n(c),p=n(15),d=function(e){function t(){var n,a,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=a=o(this,e.call.apply(e,[this].concat(u))),a.history=f.a(a.props),i=n,o(a,i)}return a(t,e),t.prototype.render=function(){return s.a.createElement(p.e,{history:this.history,children:this.props.children})},t}(s.a.Component);d.propTypes={basename:l.a.string,getUserConfirmation:l.a.func,hashType:l.a.oneOf(["hashbang","noslash","slash"]),children:l.a.node},t.a=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(25),i=r(a),s=n(37),u=r(s),l=n(72),c=n(39),f=n(73),p=r(f),d=n(121),h={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!/"+(0,c.stripLeadingSlash)(e)},decodePath:function(e){return"!"===e.charAt(0)?e.substr(1):e}},noslash:{encodePath:c.stripLeadingSlash,decodePath:c.addLeadingSlash},slash:{encodePath:c.addLeadingSlash,decodePath:c.addLeadingSlash}},m=function(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)},v=function(e){return window.location.hash=e},g=function(e){var t=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,t>=0?t:0)+"#"+e)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,u.default)(d.canUseDOM,"Hash history needs a DOM");var t=window.history,n=(0,d.supportsGoWithoutReloadUsingHash)(),r=e.getUserConfirmation,a=void 0===r?d.getConfirmation:r,s=e.hashType,f=void 0===s?"slash":s,y=e.basename?(0,c.stripTrailingSlash)((0,c.addLeadingSlash)(e.basename)):"",b=h[f],E=b.encodePath,w=b.decodePath,_=function(){var e=w(m());return(0,i.default)(!y||(0,c.hasBasename)(e,y),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+e+'" to begin with "'+y+'".'),y&&(e=(0,c.stripBasename)(e,y)),(0,l.createLocation)(e)},k=(0,p.default)(),C=function(e){o(q,e),q.length=t.length,k.notifyListeners(q.location,q.action)},S=!1,x=null,P=function(){var e=m(),t=E(e);if(e!==t)g(t);else{var n=_(),r=q.location;if(!S&&(0,l.locationsAreEqual)(r,n))return;if(x===(0,c.createPath)(n))return;x=null,T(n)}},T=function(e){if(S)S=!1,C();else{k.confirmTransitionTo(e,"POP",a,function(t){t?C({action:"POP",location:e}):O(e)})}},O=function(e){var t=q.location,n=D.lastIndexOf((0,c.createPath)(t));-1===n&&(n=0);var r=D.lastIndexOf((0,c.createPath)(e));-1===r&&(r=0);var o=n-r;o&&(S=!0,L(o))},N=m(),I=E(N);N!==I&&g(I);var M=_(),D=[(0,c.createPath)(M)],A=function(e){return"#"+E(y+(0,c.createPath)(e))},R=function(e,t){(0,i.default)(void 0===t,"Hash history cannot push state; it is ignored");var n=(0,l.createLocation)(e,void 0,void 0,q.location);k.confirmTransitionTo(n,"PUSH",a,function(e){if(e){var t=(0,c.createPath)(n),r=E(y+t);if(m()!==r){x=t,v(r);var o=D.lastIndexOf((0,c.createPath)(q.location)),a=D.slice(0,-1===o?0:o+1);a.push(t),D=a,C({action:"PUSH",location:n})}else(0,i.default)(!1,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack"),C()}})},j=function(e,t){(0,i.default)(void 0===t,"Hash history cannot replace state; it is ignored");var n=(0,l.createLocation)(e,void 0,void 0,q.location);k.confirmTransitionTo(n,"REPLACE",a,function(e){if(e){var t=(0,c.createPath)(n),r=E(y+t);m()!==r&&(x=t,g(r));var o=D.indexOf((0,c.createPath)(q.location));-1!==o&&(D[o]=t),C({action:"REPLACE",location:n})}})},L=function(e){(0,i.default)(n,"Hash history go(n) causes a full page reload in this browser"),t.go(e)},U=function(){return L(-1)},F=function(){return L(1)},B=0,W=function(e){B+=e,1===B?(0,d.addEventListener)(window,"hashchange",P):0===B&&(0,d.removeEventListener)(window,"hashchange",P)},V=!1,H=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=k.setPrompt(e);return V||(W(1),V=!0),function(){return V&&(V=!1,W(-1)),t()}},z=function(e){var t=k.appendListener(e);return W(1),function(){W(-1),t()}},q={length:t.length,action:"POP",location:M,createHref:A,push:R,replace:j,go:L,goBack:U,goForward:F,block:H,listen:z};return q};t.default=y},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=n(0),a=n.n(o),i=n(10),s=n.n(i),u=n(15),l=n(123),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=function(e){var t=e.to,n=e.exact,o=e.strict,i=e.location,s=e.activeClassName,p=e.className,d=e.activeStyle,h=e.style,m=e.isActive,v=r(e,["to","exact","strict","location","activeClassName","className","activeStyle","style","isActive"]);return a.a.createElement(u.d,{path:"object"===(void 0===t?"undefined":f(t))?t.pathname:t,exact:n,strict:o,location:i,children:function(e){var n=e.location,r=e.match,o=!!(m?m(r,n):r);return a.a.createElement(l.a,c({to:t,className:o?[s,p].filter(function(e){return e}).join(" "):p,style:o?c({},h,d):h},v))}})};p.propTypes={to:l.a.propTypes.to,exact:s.a.bool,strict:s.a.bool,location:s.a.object,activeClassName:s.a.string,className:s.a.string,activeStyle:s.a.object,style:s.a.object,isActive:s.a.func},p.defaultProps={activeClassName:"active"},t.a=p},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.b})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.c})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.d})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.e})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.f})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.g})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.h})},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.i})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=r(o),i=n(5),s=n(124),u=n(284),l=r(u),c=n(287),f=r(c),p=n(126),d=(r(p),n(129)),h=(r(d),n(294)),m=r(h),v=n(128),g=r(v),y=n(295),b=r(y),E=n(296),w=r(E),_=n(77),k=r(_),C=n(132),S=r(C),x=n(300),P=r(x),T=n(301),O=r(T),N=n(303),I=r(N),M=n(304),D=r(M),A=n(305),R=r(A),j=n(306),L=r(j),U=n(307),F=r(U),B=function(){return a.default.createElement("div",{className:"centerme"},a.default.createElement("header",null,a.default.createElement(s.ProtectedRoute,{path:"/",component:g.default})),a.default.createElement("div",{className:"invisible"},a.default.createElement(s.AuthRoute,{path:"/",component:l.default}),a.default.createElement(i.Switch,null,a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/stream",component:f.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/charts",component:O.default}),a.default.createElement(s.ProtectedRoute,{path:"/areyoulost",component:k.default}),a.default.createElement(s.ProtectedRoute,{path:"/upload",component:P.default}),a.default.createElement(s.ProtectedRoute,{path:"/search",component:I.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/discover",component:k.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username",component:b.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/songs",component:b.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/playlists",component:k.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/albums",component:k.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/reposts",component:k.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/:title/edit",component:S.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/you/likes",component:D.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/you/sets",component:L.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/you/following",component:F.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/you/collection",component:R.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/you/:path",component:k.default}),a.default.createElement(s.ProtectedRoute,{exact:!0,path:"/:username/:title",component:w.default}))),a.default.createElement(s.ProtectedRoute,{path:"/",component:m.default}))};t.default=B},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=(n(5),n(4)),f=n(11),p=n(9),d=n(40),h=(n(124),n(126)),m=r(h),v=n(127),g=r(v),y=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={loginModalOpen:!1,createModalOpen:!1},n}return i(t,e),s(t,[{key:"openLoginModal",value:function(){this.setState({loginModalOpen:!0})}},{key:"openCreateModal",value:function(){this.setState({createModalOpen:!0})}},{key:"closeLoginModal",value:function(){this.setState({loginModalOpen:!1})}},{key:"closeCreateModal",value:function(){this.setState({createModalOpen:!1})}},{key:"close",value:function(e){e.preventDefault(),this.setState({loginModalOpen:!1,createModalOpen:!1}),$("html").removeClass("faker")}},{key:"componentDidMount",value:function(){var e=this;this.props.fetchAllUsers().then(function(){return e.props.fetchSongs()})}},{key:"componentWillUnmount",value:function(){this.props.removeSongs(),this.props.clearUsers()}},{key:"render",value:function(){var e=this,t=void 0;!0!==this.state.loginModalOpen&&!0!==this.state.createModalOpen||(t=l.default.createElement("div",{className:"modal-backdrop",onClick:function(t){return e.close(t)}}),$("html").addClass("faker"));var n=this.props.allsongs.slice(0,12);l.default.createElement("h1",null,"Welcome to Invoke");return l.default.createElement("div",{className:"defaulthomecontainer"},l.default.createElement("div",{className:"headercontainer"},l.default.createElement("div",{className:"homepagelogo"}),l.default.createElement("div",{className:"homepagetopbuttons"},l.default.createElement("button",{onClick:function(){return e.openLoginModal()},className:"loginbutton"},"Login"),l.default.createElement("button",{className:"create-new-user-homepage-button",onClick:function(){return e.openCreateModal()}},"Create a new account"))),l.default.createElement(g.default,{isOpen:this.state.loginModalOpen,onClose:function(){return e.closeLoginModal()}},l.default.createElement(m.default,{formType:"login"})),l.default.createElement(g.default,{isOpen:this.state.createModalOpen,onClose:function(){return e.closeCreateModal()}},l.default.createElement(m.default,{formType:"signup"})),l.default.createElement("div",{className:"hmmmm"}),l.default.createElement("div",{className:"dummysearch-div"},l.default.createElement("div",{className:"homepage-search-filler"},l.default.createElement("div",{className:"homepage-searchbar-div"},l.default.createElement("input",{type:"search",className:"homepage-searchbar",placeholder:"Search for artists, bands, tracks, podcasts"}),l.default.createElement("button",{className:"homepage-searchbar-button"})),l.default.createElement("span",{className:"homepage-or-span"},"or"),l.default.createElement("button",{className:"homepage-searchdiv-ancillary-button"},"Upload your own"))),l.default.createElement("div",{className:"notloggedin-trending-section"},l.default.createElement("h2",{className:"trending-notlogged-header"},"Peek at what’s trending for free in the Invoke community"),l.default.createElement("div",{className:"top-track-list-div"},l.default.createElement("ul",{className:"top-track-list"},n.map(function(t){var n=e.props.usersbyID[t.user_id];return l.default.createElement("li",{key:t.id,className:"dh-li"},l.default.createElement("img",{className:"dh-img",src:t.cover_art_url}),l.default.createElement("span",{className:"dh-title"},t.title),l.default.createElement("span",{className:"dh-artist"},n.username))})))),t)}}]),t}(l.default.Component),b=function(e){return{currentUser:e.session.currentUser,errors:e.session.errors,allsongs:e.songs.allsongs,usersbyID:e.users.byID}},E=function(e){return{logout:function(){return e((0,d.logout)())},clearErrors:function(){return e((0,d.clearErrors)())},fetchSongs:function(){return e((0,f.fetchSongs)())},removeSongs:function(){return e((0,f.removeSongs)())},fetchAllUsers:function(){return e((0,p.fetchAllUsers)())},clearUsers:function(){return e((0,p.clearUsers)())},removeAudioToken:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(removeAudioToken())})}};t.default=(0,c.connect)(b,E)(y)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchOneUser=function(e){return $.ajax({method:"GET",url:"api/users/"+e})},t.fetchUsers=function(){return $.ajax({method:"GET",url:"api/users"})},t.fetchAllUsers=function(){return $.ajax({method:"GET",url:"api/users",data:{token:"All"}})},t.fetchRandomUsers=function(){return $.ajax({method:"GET",url:"api/users",data:{token:"random"}})},t.searchUsers=function(e){return $.ajax({method:"GET",url:"api/users",data:{token:"search",query:e}})},t.fetchOneUserByID=function(e){return $.ajax({method:"GET",url:"api/users/show2/"+e})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.login=function(e){return $.ajax({method:"POST",url:"/api/session",data:e})},t.signup=function(e){return $.ajax({method:"POST",url:"/api/users",data:e,contentType:!1,processData:!1})},t.signupnormal=function(e){return $.ajax({method:"POST",url:"/api/users",data:{user:e}})},t.logout=function(){return $.ajax({method:"DELETE",url:"/api/session"})}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(4),p=n(40),d=n(128),h=(r(d),n(129)),m=r(h),v=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"handleLogout",value:function(){var e=this;this.props.logout().then(function(){return e.props.history.push("/login")})}},{key:"render",value:function(){return l.default.createElement("div",null,l.default.createElement(c.Route,{exact:!0,path:"/stream",component:m.default}))}}]),t}(l.default.Component),g=function(e){return{currentUser:e.session.currentUser}},y=function(e){return{logout:function(){return e((0,p.logout)())}}};t.default=(0,f.connect)(g,y)(v)},function(e,t,n){(function(t){e.exports=t.WaveSurfer=n(289)}).call(t,n(38))},function(e,t,n){var r,o;/*! wavesurfer.js 1.4.0 (Mon, 10 Apr 2017 08:55:35 GMT)
* https://github.com/katspaugh/wavesurfer.js
* @license BSD-3-Clause */
!function(n,a){r=[],void 0!==(o=function(){return n.WaveSurfer=a()}.apply(t,r))&&(e.exports=o)}(this,function(){"use strict";var e={defaultParams:{audioContext:null,audioRate:1,autoCenter:!0,backend:"WebAudio",barHeight:1,closeAudioContext:!1,container:null,cursorColor:"#333",cursorWidth:1,dragSelection:!0,fillParent:!0,forceDecode:!1,height:128,hideScrollbar:!1,interact:!0,loopSelection:!0,mediaContainer:null,mediaControls:!1,mediaType:"audio",minPxPerSec:20,partialRender:!1,pixelRatio:window.devicePixelRatio||screen.deviceXDPI/screen.logicalXDPI,progressColor:"#555",normalize:!1,renderer:"MultiCanvas",scrollParent:!1,skipLength:2,splitChannels:!1,waveColor:"#999"},init:function(t){if(this.params=e.util.extend({},this.defaultParams,t),this.container="string"==typeof t.container?document.querySelector(this.params.container):this.params.container,!this.container)throw new Error("Container element not found");if(null==this.params.mediaContainer?this.mediaContainer=this.container:"string"==typeof this.params.mediaContainer?this.mediaContainer=document.querySelector(this.params.mediaContainer):this.mediaContainer=this.params.mediaContainer,!this.mediaContainer)throw new Error("Media Container element not found");this.savedVolume=0,this.isMuted=!1,this.tmpEvents=[],this.currentAjax=null,this.createDrawer(),this.createBackend(),this.createPeakCache(),this.isDestroyed=!1},createDrawer:function(){var t=this;this.drawer=Object.create(e.Drawer[this.params.renderer]),this.drawer.init(this.container,this.params),this.drawer.on("redraw",function(){t.drawBuffer(),t.drawer.progress(t.backend.getPlayedPercents())}),this.drawer.on("click",function(e,n){setTimeout(function(){t.seekTo(n)},0)}),this.drawer.on("scroll",function(e){t.params.partialRender&&t.drawBuffer(),t.fireEvent("scroll",e)})},createBackend:function(){var t=this;this.backend&&this.backend.destroy(),"AudioElement"==this.params.backend&&(this.params.backend="MediaElement"),"WebAudio"!=this.params.backend||e.WebAudio.supportsWebAudio()||(this.params.backend="MediaElement"),this.backend=Object.create(e[this.params.backend]),this.backend.init(this.params),this.backend.on("finish",function(){t.fireEvent("finish")}),this.backend.on("play",function(){t.fireEvent("play")}),this.backend.on("pause",function(){t.fireEvent("pause")}),this.backend.on("audioprocess",function(e){t.drawer.progress(t.backend.getPlayedPercents()),t.fireEvent("audioprocess",e)})},createPeakCache:function(){this.params.partialRender&&(this.peakCache=Object.create(e.PeakCache),this.peakCache.init())},getDuration:function(){return this.backend.getDuration()},getCurrentTime:function(){return this.backend.getCurrentTime()},play:function(e,t){this.fireEvent("interaction",this.play.bind(this,e,t)),this.backend.play(e,t)},pause:function(){this.backend.isPaused()||this.backend.pause()},playPause:function(){this.backend.isPaused()?this.play():this.pause()},isPlaying:function(){return!this.backend.isPaused()},skipBackward:function(e){this.skip(-e||-this.params.skipLength)},skipForward:function(e){this.skip(e||this.params.skipLength)},skip:function(e){var t=this.getCurrentTime()||0,n=this.getDuration()||1;t=Math.max(0,Math.min(n,t+(e||0))),this.seekAndCenter(t/n)},seekAndCenter:function(e){this.seekTo(e),this.drawer.recenter(e)},seekTo:function(e){this.fireEvent("interaction",this.seekTo.bind(this,e));var t=this.backend.isPaused();t||this.backend.pause();var n=this.params.scrollParent;this.params.scrollParent=!1,this.backend.seekTo(e*this.getDuration()),this.drawer.progress(this.backend.getPlayedPercents()),t||this.backend.play(),this.params.scrollParent=n,this.fireEvent("seek",e)},stop:function(){this.pause(),this.seekTo(0),this.drawer.progress(0)},setVolume:function(e){this.backend.setVolume(e)},getVolume:function(){return this.backend.getVolume()},setPlaybackRate:function(e){this.backend.setPlaybackRate(e)},getPlaybackRate:function(){return this.backend.getPlaybackRate()},toggleMute:function(){this.setMute(!this.isMuted)},setMute:function(e){e!==this.isMuted&&(e?(this.savedVolume=this.backend.getVolume(),this.backend.setVolume(0),this.isMuted=!0):(this.backend.setVolume(this.savedVolume),this.isMuted=!1))},getMute:function(){return this.isMuted},getFilters:function(){return this.backend.filters||[]},toggleScroll:function(){this.params.scrollParent=!this.params.scrollParent,this.drawBuffer()},toggleInteraction:function(){this.params.interact=!this.params.interact},drawBuffer:function(){var e=Math.round(this.getDuration()*this.params.minPxPerSec*this.params.pixelRatio),t=this.drawer.getWidth(),n=e,r=this.drawer.getScrollX(),o=Math.min(r+t,n);if(this.params.fillParent&&(!this.params.scrollParent||e<t)&&(n=t,r=0,o=n),this.params.partialRender)for(var a=this.peakCache.addRangeToPeakCache(n,r,o),i=0;i<a.length;i++){var s=this.backend.getPeaks(n,a[i][0],a[i][1]);this.drawer.drawPeaks(s,n,a[i][0],a[i][1])}else{r=0,o=n;var s=this.backend.getPeaks(n,r,o);this.drawer.drawPeaks(s,n,r,o)}this.fireEvent("redraw",s,n)},zoom:function(e){this.params.minPxPerSec=e,this.params.scrollParent=!0,this.drawBuffer(),this.drawer.progress(this.backend.getPlayedPercents()),this.drawer.recenter(this.getCurrentTime()/this.getDuration()),this.fireEvent("zoom",e)},loadArrayBuffer:function(e){this.decodeArrayBuffer(e,function(e){this.isDestroyed||this.loadDecodedBuffer(e)}.bind(this))},loadDecodedBuffer:function(e){this.backend.load(e),this.drawBuffer(),this.fireEvent("ready")},loadBlob:function(e){var t=this,n=new FileReader;n.addEventListener("progress",function(e){t.onProgress(e)}),n.addEventListener("load",function(e){t.loadArrayBuffer(e.target.result)}),n.addEventListener("error",function(){t.fireEvent("error","Error reading file")}),n.readAsArrayBuffer(e),this.empty()},load:function(e,t,n){switch(this.empty(),this.isMuted=!1,this.params.backend){case"WebAudio":return this.loadBuffer(e,t);case"MediaElement":return this.loadMediaElement(e,t,n)}},loadBuffer:function(e,t){var n=function(t){return t&&this.tmpEvents.push(this.once("ready",t)),this.getArrayBuffer(e,this.loadArrayBuffer.bind(this))}.bind(this);return t?(this.backend.setPeaks(t),this.drawBuffer(),void this.tmpEvents.push(this.once("interaction",n))):n()},loadMediaElement:function(e,t,n){var r=e;if("string"==typeof e)this.backend.load(r,this.mediaContainer,t,n);else{var o=e;this.backend.loadElt(o,t),r=o.src}this.tmpEvents.push(this.backend.once("canplay",function(){this.drawBuffer(),this.fireEvent("ready")}.bind(this)),this.backend.once("error",function(e){this.fireEvent("error",e)}.bind(this))),t&&this.backend.setPeaks(t),t&&!this.params.forceDecode||!this.backend.supportsWebAudio()||this.getArrayBuffer(r,function(e){this.decodeArrayBuffer(e,function(e){this.backend.buffer=e,this.backend.setPeaks(null),this.drawBuffer(),this.fireEvent("waveform-ready")}.bind(this))}.bind(this))},decodeArrayBuffer:function(e,t){this.arraybuffer=e,this.backend.decodeArrayBuffer(e,function(n){this.isDestroyed||this.arraybuffer!=e||(t(n),this.arraybuffer=null)}.bind(this),this.fireEvent.bind(this,"error","Error decoding audiobuffer"))},getArrayBuffer:function(t,n){var r=this,o=e.util.ajax({url:t,responseType:"arraybuffer"});return this.currentAjax=o,this.tmpEvents.push(o.on("progress",function(e){r.onProgress(e)}),o.on("success",function(e,t){n(e),r.currentAjax=null}),o.on("error",function(e){r.fireEvent("error","XHR error: "+e.target.statusText),r.currentAjax=null})),o},onProgress:function(e){if(e.lengthComputable)var t=e.loaded/e.total;else t=e.loaded/(e.loaded+1e6);this.fireEvent("loading",Math.round(100*t),e.target)},exportPCM:function(e,t,n){e=e||1024,t=t||1e4,n=n||!1;var r=this.backend.getPeaks(e,t),o=[].map.call(r,function(e){return Math.round(e*t)/t}),a=JSON.stringify(o);return n||window.open("data:application/json;charset=utf-8,"+encodeURIComponent(a)),a},exportImage:function(e,t){return e||(e="image/png"),t||(t=1),this.drawer.getImage(e,t)},cancelAjax:function(){this.currentAjax&&(this.currentAjax.xhr.abort(),this.currentAjax=null)},clearTmpEvents:function(){this.tmpEvents.forEach(function(e){e.un()})},empty:function(){this.backend.isPaused()||(this.stop(),this.backend.disconnectSource()),this.cancelAjax(),this.clearTmpEvents(),this.drawer.progress(0),this.drawer.setWidth(0),this.drawer.drawPeaks({length:this.drawer.getWidth()},0)},destroy:function(){this.fireEvent("destroy"),this.cancelAjax(),this.clearTmpEvents(),this.unAll(),this.backend.destroy(),this.drawer.destroy(),this.isDestroyed=!0}};return e.create=function(t){var n=Object.create(e);return n.init(t),n},e.util={extend:function(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){Object.keys(t).forEach(function(n){e[n]=t[n]})}),e},debounce:function(e,t,n){var r,o,a,i=function(){a=null,n||e.apply(o,r)};return function(){o=this,r=arguments;var s=n&&!a;clearTimeout(a),a=setTimeout(i,t),a||(a=setTimeout(i,t)),s&&e.apply(o,r)}},min:function(e){var t=1/0;for(var n in e)e[n]<t&&(t=e[n]);return t},max:function(e){var t=-1/0;for(var n in e)e[n]>t&&(t=e[n]);return t},getId:function(){return"wavesurfer_"+Math.random().toString(32).substring(2)},ajax:function(t){var n=Object.create(e.Observer),r=new XMLHttpRequest,o=!1;return r.open(t.method||"GET",t.url,!0),r.responseType=t.responseType||"json",r.addEventListener("progress",function(e){n.fireEvent("progress",e),e.lengthComputable&&e.loaded==e.total&&(o=!0)}),r.addEventListener("load",function(e){o||n.fireEvent("progress",e),n.fireEvent("load",e),200==r.status||206==r.status?n.fireEvent("success",r.response,e):n.fireEvent("error",e)}),r.addEventListener("error",function(e){n.fireEvent("error",e)}),r.send(),n.xhr=r,n}},e.Observer={on:function(e,t){this.handlers||(this.handlers={});var n=this.handlers[e];return n||(n=this.handlers[e]=[]),n.push(t),{name:e,callback:t,un:this.un.bind(this,e,t)}},un:function(e,t){if(this.handlers){var n=this.handlers[e];if(n)if(t)for(var r=n.length-1;r>=0;r--)n[r]==t&&n.splice(r,1);else n.length=0}},unAll:function(){this.handlers=null},once:function(e,t){var n=this,r=function(){t.apply(this,arguments),setTimeout(function(){n.un(e,r)},0)};return this.on(e,r)},fireEvent:function(e){if(this.handlers){var t=this.handlers[e],n=Array.prototype.slice.call(arguments,1);t&&t.forEach(function(e){e.apply(null,n)})}}},e.util.extend(e,e.Observer),e.WebAudio={scriptBufferSize:256,PLAYING_STATE:0,PAUSED_STATE:1,FINISHED_STATE:2,supportsWebAudio:function(){return!(!window.AudioContext&&!window.webkitAudioContext)},getAudioContext:function(){return e.WebAudio.audioContext||(e.WebAudio.audioContext=new(window.AudioContext||window.webkitAudioContext)),e.WebAudio.audioContext},getOfflineAudioContext:function(t){return e.WebAudio.offlineAudioContext||(e.WebAudio.offlineAudioContext=new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(1,2,t)),e.WebAudio.offlineAudioContext},init:function(t){this.params=t,this.ac=t.audioContext||this.getAudioContext(),this.lastPlay=this.ac.currentTime,this.startPosition=0,this.scheduledPause=null,this.states=[Object.create(e.WebAudio.state.playing),Object.create(e.WebAudio.state.paused),Object.create(e.WebAudio.state.finished)],this.createVolumeNode(),this.createScriptNode(),this.createAnalyserNode(),this.setState(this.PAUSED_STATE),this.setPlaybackRate(this.params.audioRate),this.setLength(0)},disconnectFilters:function(){this.filters&&(this.filters.forEach(function(e){e&&e.disconnect()}),this.filters=null,this.analyser.connect(this.gainNode))},setState:function(e){this.state!==this.states[e]&&(this.state=this.states[e],this.state.init.call(this))},setFilter:function(){this.setFilters([].slice.call(arguments))},setFilters:function(e){this.disconnectFilters(),e&&e.length&&(this.filters=e,this.analyser.disconnect(),e.reduce(function(e,t){return e.connect(t),t},this.analyser).connect(this.gainNode))},createScriptNode:function(){this.ac.createScriptProcessor?this.scriptNode=this.ac.createScriptProcessor(this.scriptBufferSize):this.scriptNode=this.ac.createJavaScriptNode(this.scriptBufferSize),this.scriptNode.connect(this.ac.destination)},addOnAudioProcess:function(){var e=this;this.scriptNode.onaudioprocess=function(){var t=e.getCurrentTime();t>=e.getDuration()?(e.setState(e.FINISHED_STATE),e.fireEvent("pause")):t>=e.scheduledPause?e.pause():e.state===e.states[e.PLAYING_STATE]&&e.fireEvent("audioprocess",t)}},removeOnAudioProcess:function(){this.scriptNode.onaudioprocess=null},createAnalyserNode:function(){this.analyser=this.ac.createAnalyser(),this.analyser.connect(this.gainNode)},createVolumeNode:function(){this.ac.createGain?this.gainNode=this.ac.createGain():this.gainNode=this.ac.createGainNode(),this.gainNode.connect(this.ac.destination)},setVolume:function(e){this.gainNode.gain.value=e},getVolume:function(){return this.gainNode.gain.value},decodeArrayBuffer:function(e,t,n){this.offlineAc||(this.offlineAc=this.getOfflineAudioContext(this.ac?this.ac.sampleRate:44100)),this.offlineAc.decodeAudioData(e,function(e){t(e)}.bind(this),n)},setPeaks:function(e){this.peaks=e},setLength:function(e){if(!this.mergedPeaks||e!=2*this.mergedPeaks.length-1+2){this.splitPeaks=[],this.mergedPeaks=[];for(var t=this.buffer?this.buffer.numberOfChannels:1,n=0;n<t;n++)this.splitPeaks[n]=[],this.splitPeaks[n][2*(e-1)]=0,this.splitPeaks[n][2*(e-1)+1]=0;this.mergedPeaks[2*(e-1)]=0,this.mergedPeaks[2*(e-1)+1]=0}},getPeaks:function(e,t,n){if(this.peaks)return this.peaks;this.setLength(e);for(var r=this.buffer.length/e,o=~~(r/10)||1,a=this.buffer.numberOfChannels,i=0;i<a;i++)for(var s=this.splitPeaks[i],u=this.buffer.getChannelData(i),l=t;l<=n;l++){for(var c=~~(l*r),f=~~(c+r),p=0,d=0,h=c;h<f;h+=o){var m=u[h];m>d&&(d=m),m<p&&(p=m)}s[2*l]=d,s[2*l+1]=p,(0==i||d>this.mergedPeaks[2*l])&&(this.mergedPeaks[2*l]=d),(0==i||p<this.mergedPeaks[2*l+1])&&(this.mergedPeaks[2*l+1]=p)}return this.params.splitChannels?this.splitPeaks:this.mergedPeaks},getPlayedPercents:function(){return this.state.getPlayedPercents.call(this)},disconnectSource:function(){this.source&&this.source.disconnect()},destroy:function(){this.isPaused()||this.pause(),this.unAll(),this.buffer=null,this.disconnectFilters(),this.disconnectSource(),this.gainNode.disconnect(),this.scriptNode.disconnect(),this.analyser.disconnect(),this.params.closeAudioContext&&("function"==typeof this.ac.close&&"closed"!=this.ac.state&&this.ac.close(),this.ac=null,this.params.audioContext?this.params.audioContext=null:e.WebAudio.audioContext=null,e.WebAudio.offlineAudioContext=null)},load:function(e){this.startPosition=0,this.lastPlay=this.ac.currentTime,this.buffer=e,this.createSource()},createSource:function(){this.disconnectSource(),this.source=this.ac.createBufferSource(),this.source.start=this.source.start||this.source.noteGrainOn,this.source.stop=this.source.stop||this.source.noteOff,this.source.playbackRate.value=this.playbackRate,this.source.buffer=this.buffer,this.source.connect(this.analyser)},isPaused:function(){return this.state!==this.states[this.PLAYING_STATE]},getDuration:function(){return this.buffer?this.buffer.duration:0},seekTo:function(e,t){if(this.buffer)return this.scheduledPause=null,null==e&&(e=this.getCurrentTime())>=this.getDuration()&&(e=0),null==t&&(t=this.getDuration()),this.startPosition=e,this.lastPlay=this.ac.currentTime,this.state===this.states[this.FINISHED_STATE]&&this.setState(this.PAUSED_STATE),{start:e,end:t}},getPlayedTime:function(){return(this.ac.currentTime-this.lastPlay)*this.playbackRate},play:function(e,t){if(this.buffer){this.createSource();var n=this.seekTo(e,t);e=n.start,t=n.end,this.scheduledPause=t,this.source.start(0,e,t-e),"suspended"==this.ac.state&&this.ac.resume&&this.ac.resume(),this.setState(this.PLAYING_STATE),this.fireEvent("play")}},pause:function(){this.scheduledPause=null,this.startPosition+=this.getPlayedTime(),this.source&&this.source.stop(0),this.setState(this.PAUSED_STATE),this.fireEvent("pause")},getCurrentTime:function(){return this.state.getCurrentTime.call(this)},getPlaybackRate:function(){return this.playbackRate},setPlaybackRate:function(e){e=e||1,this.isPaused()?this.playbackRate=e:(this.pause(),this.playbackRate=e,this.play())}},e.WebAudio.state={},e.WebAudio.state.playing={init:function(){this.addOnAudioProcess()},getPlayedPercents:function(){var e=this.getDuration();return this.getCurrentTime()/e||0},getCurrentTime:function(){return this.startPosition+this.getPlayedTime()}},e.WebAudio.state.paused={init:function(){this.removeOnAudioProcess()},getPlayedPercents:function(){var e=this.getDuration();return this.getCurrentTime()/e||0},getCurrentTime:function(){return this.startPosition}},e.WebAudio.state.finished={init:function(){this.removeOnAudioProcess(),this.fireEvent("finish")},getPlayedPercents:function(){return 1},getCurrentTime:function(){return this.getDuration()}},e.util.extend(e.WebAudio,e.Observer),e.MediaElement=Object.create(e.WebAudio),e.util.extend(e.MediaElement,{init:function(e){this.params=e,this.media={currentTime:0,duration:0,paused:!0,playbackRate:1,play:function(){},pause:function(){}},this.mediaType=e.mediaType.toLowerCase(),this.elementPosition=e.elementPosition,this.setPlaybackRate(this.params.audioRate),this.createTimer()},createTimer:function(){var e=this,t=function(){if(!e.isPaused()){e.fireEvent("audioprocess",e.getCurrentTime());(window.requestAnimationFrame||window.webkitRequestAnimationFrame)(t)}};this.on("play",t)},load:function(e,t,n,r){var o=document.createElement(this.mediaType);o.controls=this.params.mediaControls,o.autoplay=this.params.autoplay||!1,o.preload=null==r?"auto":r,o.src=e,o.style.width="100%";var a=t.querySelector(this.mediaType);a&&t.removeChild(a),t.appendChild(o),this._load(o,n)},loadElt:function(e,t){var n=e;n.controls=this.params.mediaControls,n.autoplay=this.params.autoplay||!1,this._load(n,t)},_load:function(e,t){var n=this;"function"==typeof e.load&&e.load(),e.addEventListener("error",function(){n.fireEvent("error","Error loading media element")}),e.addEventListener("canplay",function(){n.fireEvent("canplay")}),e.addEventListener("ended",function(){n.fireEvent("finish")}),this.media=e,this.peaks=t,this.onPlayEnd=null,this.buffer=null,this.setPlaybackRate(this.playbackRate)},isPaused:function(){return!this.media||this.media.paused},getDuration:function(){var e=(this.buffer||this.media).duration;return e>=1/0&&(e=this.media.seekable.end(0)),e},getCurrentTime:function(){return this.media&&this.media.currentTime},getPlayedPercents:function(){return this.getCurrentTime()/this.getDuration()||0},getPlaybackRate:function(){return this.playbackRate||this.media.playbackRate},setPlaybackRate:function(e){this.playbackRate=e||1,this.media.playbackRate=this.playbackRate},seekTo:function(e){null!=e&&(this.media.currentTime=e),this.clearPlayEnd()},play:function(e,t){this.seekTo(e),this.media.play(),t&&this.setPlayEnd(t),this.fireEvent("play")},pause:function(){this.media&&this.media.pause(),this.clearPlayEnd(),this.fireEvent("pause")},setPlayEnd:function(e){var t=this;this.onPlayEnd=function(n){n>=e&&(t.pause(),t.seekTo(e))},this.on("audioprocess",this.onPlayEnd)},clearPlayEnd:function(){this.onPlayEnd&&(this.un("audioprocess",this.onPlayEnd),this.onPlayEnd=null)},getPeaks:function(t,n,r){return this.buffer?e.WebAudio.getPeaks.call(this,t,n,r):this.peaks||[]},getVolume:function(){return this.media.volume},setVolume:function(e){this.media.volume=e},destroy:function(){this.pause(),this.unAll(),this.media&&this.media.parentNode&&this.media.parentNode.removeChild(this.media),this.media=null}}),e.AudioElement=e.MediaElement,e.Drawer={init:function(e,t){this.container=e,this.params=t,this.width=0,this.height=t.height*this.params.pixelRatio,this.lastPos=0,this.initDrawer(t),this.createWrapper(),this.createElements()},createWrapper:function(){this.wrapper=this.container.appendChild(document.createElement("wave")),this.style(this.wrapper,{display:"block",position:"relative",userSelect:"none",webkitUserSelect:"none",height:this.params.height+"px"}),(this.params.fillParent||this.params.scrollParent)&&this.style(this.wrapper,{width:"100%",overflowX:this.params.hideScrollbar?"hidden":"auto",overflowY:"hidden"}),this.setupWrapperEvents()},handleEvent:function(e,t){!t&&e.preventDefault();var n,r=e.targetTouches?e.targetTouches[0].clientX:e.clientX,o=this.wrapper.getBoundingClientRect(),a=this.width,i=this.getWidth();return!this.params.fillParent&&a<i?(n=(r-o.left)*this.params.pixelRatio/a||0)>1&&(n=1):n=(r-o.left+this.wrapper.scrollLeft)/this.wrapper.scrollWidth||0,n},setupWrapperEvents:function(){var e=this;this.wrapper.addEventListener("click",function(t){var n=e.wrapper.offsetHeight-e.wrapper.clientHeight;if(0!=n){var r=e.wrapper.getBoundingClientRect();if(t.clientY>=r.bottom-n)return}e.params.interact&&e.fireEvent("click",t,e.handleEvent(t))}),this.wrapper.addEventListener("scroll",function(t){e.fireEvent("scroll",t)})},drawPeaks:function(e,t,n,r){this.setWidth(t),this.params.barWidth?this.drawBars(e,0,n,r):this.drawWave(e,0,n,r)},style:function(e,t){return Object.keys(t).forEach(function(n){e.style[n]!==t[n]&&(e.style[n]=t[n])}),e},resetScroll:function(){null!==this.wrapper&&(this.wrapper.scrollLeft=0)},recenter:function(e){var t=this.wrapper.scrollWidth*e;this.recenterOnPosition(t,!0)},recenterOnPosition:function(e,t){var n=this.wrapper.scrollLeft,r=~~(this.wrapper.clientWidth/2),o=e-r,a=o-n,i=this.wrapper.scrollWidth-this.wrapper.clientWidth;if(0!=i){if(!t&&-r<=a&&a<r){a=Math.max(-5,Math.min(5,a)),o=n+a}(o=Math.max(0,Math.min(i,o)))!=n&&(this.wrapper.scrollLeft=o)}},getScrollX:function(){return Math.round(this.wrapper.scrollLeft*this.params.pixelRatio)},getWidth:function(){return Math.round(this.container.clientWidth*this.params.pixelRatio)},setWidth:function(e){this.width!=e&&(this.width=e,this.params.fillParent||this.params.scrollParent?this.style(this.wrapper,{width:""}):this.style(this.wrapper,{width:~~(this.width/this.params.pixelRatio)+"px"}),this.updateSize())},setHeight:function(e){e!=this.height&&(this.height=e,this.style(this.wrapper,{height:~~(this.height/this.params.pixelRatio)+"px"}),this.updateSize())},progress:function(e){var t=1/this.params.pixelRatio,n=Math.round(e*this.width)*t;if(n<this.lastPos||n-this.lastPos>=t){if(this.lastPos=n,this.params.scrollParent&&this.params.autoCenter){var r=~~(this.wrapper.scrollWidth*e);this.recenterOnPosition(r)}this.updateProgress(n)}},destroy:function(){this.unAll(),this.wrapper&&(this.container.removeChild(this.wrapper),this.wrapper=null)},initDrawer:function(){},createElements:function(){},updateSize:function(){},drawWave:function(e,t){},clearWave:function(){},updateProgress:function(e){}},e.util.extend(e.Drawer,e.Observer),e.Drawer.Canvas=Object.create(e.Drawer),e.util.extend(e.Drawer.Canvas,{createElements:function(){var e=this.wrapper.appendChild(this.style(document.createElement("canvas"),{position:"absolute",zIndex:1,left:0,top:0,bottom:0}));if(this.waveCc=e.getContext("2d"),this.progressWave=this.wrapper.appendChild(this.style(document.createElement("wave"),{position:"absolute",zIndex:2,left:0,top:0,bottom:0,overflow:"hidden",width:"0",display:"none",boxSizing:"border-box",borderRightStyle:"solid",borderRightWidth:this.params.cursorWidth+"px",borderRightColor:this.params.cursorColor})),this.params.waveColor!=this.params.progressColor){var t=this.progressWave.appendChild(document.createElement("canvas"));this.progressCc=t.getContext("2d")}},updateSize:function(){var e=Math.round(this.width/this.params.pixelRatio);this.waveCc.canvas.width=this.width,this.waveCc.canvas.height=this.height,this.style(this.waveCc.canvas,{width:e+"px"}),this.style(this.progressWave,{display:"block"}),this.progressCc&&(this.progressCc.canvas.width=this.width,this.progressCc.canvas.height=this.height,this.style(this.progressCc.canvas,{width:e+"px"})),this.clearWave()},clearWave:function(){this.waveCc.clearRect(0,0,this.width,this.height),this.progressCc&&this.progressCc.clearRect(0,0,this.width,this.height)},drawBars:function(t,n,r,o){var a=this;if(t[0]instanceof Array){var i=t;if(this.params.splitChannels)return this.setHeight(i.length*this.params.height*this.params.pixelRatio),void i.forEach(function(e,t){a.drawBars(e,t,r,o)});t=i[0]}var s=[].some.call(t,function(e){return e<0}),u=1;s&&(u=2);var l=.5/this.params.pixelRatio,c=this.width,f=this.params.height*this.params.pixelRatio,p=f*n||0,d=f/2,h=t.length/u,m=this.params.barWidth*this.params.pixelRatio,v=Math.max(this.params.pixelRatio,~~(m/2)),g=m+v,y=1/this.params.barHeight;if(this.params.normalize){var b=e.util.max(t),E=e.util.min(t);y=-E>b?-E:b}var w=h/c;this.waveCc.fillStyle=this.params.waveColor,this.progressCc&&(this.progressCc.fillStyle=this.params.progressColor),[this.waveCc,this.progressCc].forEach(function(e){if(e)for(var n=r/w;n<o/w;n+=g){var a=t[Math.floor(n*w*u)]||0,i=Math.round(a/y*d);e.fillRect(n+l,d-i+p,m+l,2*i)}},this)},drawWave:function(t,n,r,o){var a=this;if(t[0]instanceof Array){var i=t;if(this.params.splitChannels)return this.setHeight(i.length*this.params.height*this.params.pixelRatio),void i.forEach(function(e,t){a.drawWave(e,t,r,o)});t=i[0]}if(![].some.call(t,function(e){return e<0})){for(var s=[],u=0,l=t.length;u<l;u++)s[2*u]=t[u],s[2*u+1]=-t[u];t=s}var c=.5/this.params.pixelRatio,f=this.params.height*this.params.pixelRatio,p=f*n||0,d=f/2,h=~~(t.length/2),m=1;this.params.fillParent&&this.width!=h&&(m=this.width/h);var v=1/this.params.barHeight;if(this.params.normalize){var g=e.util.max(t),y=e.util.min(t);v=-y>g?-y:g}this.waveCc.fillStyle=this.params.waveColor,this.progressCc&&(this.progressCc.fillStyle=this.params.progressColor),[this.waveCc,this.progressCc].forEach(function(e){if(e){e.beginPath(),e.moveTo(r*m+c,d+p);for(var n=r;n<o;n++){var a=Math.round(t[2*n]/v*d);e.lineTo(n*m+c,d-a+p)}for(var n=o-1;n>=r;n--){var a=Math.round(t[2*n+1]/v*d);e.lineTo(n*m+c,d-a+p)}e.closePath(),e.fill(),e.fillRect(0,d+p-c,this.width,c)}},this)},updateProgress:function(e){this.style(this.progressWave,{width:e+"px"})},getImage:function(e,t){return this.waveCc.canvas.toDataURL(e,t)}}),e.Drawer.MultiCanvas=Object.create(e.Drawer),e.util.extend(e.Drawer.MultiCanvas,{initDrawer:function(e){if(this.maxCanvasWidth=null!=e.maxCanvasWidth?e.maxCanvasWidth:4e3,this.maxCanvasElementWidth=Math.round(this.maxCanvasWidth/this.params.pixelRatio),this.maxCanvasWidth<=1)throw"maxCanvasWidth must be greater than 1.";if(this.maxCanvasWidth%2==1)throw"maxCanvasWidth must be an even number.";this.hasProgressCanvas=this.params.waveColor!=this.params.progressColor,this.halfPixel=.5/this.params.pixelRatio,this.canvases=[]},createElements:function(){this.progressWave=this.wrapper.appendChild(this.style(document.createElement("wave"),{position:"absolute",zIndex:2,left:0,top:0,bottom:0,overflow:"hidden",width:"0",display:"none",boxSizing:"border-box",borderRightStyle:"solid",borderRightWidth:this.params.cursorWidth+"px",borderRightColor:this.params.cursorColor})),this.addCanvas()},updateSize:function(){for(var e=Math.round(this.width/this.params.pixelRatio),t=Math.ceil(e/this.maxCanvasElementWidth);this.canvases.length<t;)this.addCanvas();for(;this.canvases.length>t;)this.removeCanvas();for(var n in this.canvases){var r=this.maxCanvasWidth+2*Math.ceil(this.params.pixelRatio/2);n==this.canvases.length-1&&(r=this.width-this.maxCanvasWidth*(this.canvases.length-1)),this.updateDimensions(this.canvases[n],r,this.height),this.clearWaveForEntry(this.canvases[n])}},addCanvas:function(){var e={},t=this.maxCanvasElementWidth*this.canvases.length;e.wave=this.wrapper.appendChild(this.style(document.createElement("canvas"),{position:"absolute",zIndex:1,left:t+"px",top:0,bottom:0,height:"100%"})),e.waveCtx=e.wave.getContext("2d"),this.hasProgressCanvas&&(e.progress=this.progressWave.appendChild(this.style(document.createElement("canvas"),{position:"absolute",left:t+"px",top:0,bottom:0,height:"100%"})),e.progressCtx=e.progress.getContext("2d")),this.canvases.push(e)},removeCanvas:function(){var e=this.canvases.pop();e.wave.parentElement.removeChild(e.wave),this.hasProgressCanvas&&e.progress.parentElement.removeChild(e.progress)},updateDimensions:function(e,t,n){var r=Math.round(t/this.params.pixelRatio),o=Math.round(this.width/this.params.pixelRatio);e.start=e.waveCtx.canvas.offsetLeft/o||0,e.end=e.start+r/o,e.waveCtx.canvas.width=t,e.waveCtx.canvas.height=n,this.style(e.waveCtx.canvas,{width:r+"px"}),this.style(this.progressWave,{display:"block"}),this.hasProgressCanvas&&(e.progressCtx.canvas.width=t,e.progressCtx.canvas.height=n,this.style(e.progressCtx.canvas,{width:r+"px"}))},clearWave:function(){for(var e in this.canvases)this.clearWaveForEntry(this.canvases[e])},clearWaveForEntry:function(e){e.waveCtx.clearRect(0,0,e.waveCtx.canvas.width,e.waveCtx.canvas.height),this.hasProgressCanvas&&e.progressCtx.clearRect(0,0,e.progressCtx.canvas.width,e.progressCtx.canvas.height)},drawBars:function(t,n,r,o){var a=this;if(t[0]instanceof Array){var i=t;if(this.params.splitChannels)return this.setHeight(i.length*this.params.height*this.params.pixelRatio),void i.forEach(function(e,t){a.drawBars(e,t,r,o)});t=i[0]}var s=[].some.call(t,function(e){return e<0}),u=1;s&&(u=2);var l=this.width,c=this.params.height*this.params.pixelRatio,f=c*n||0,p=c/2,d=t.length/u,h=this.params.barWidth*this.params.pixelRatio,m=Math.max(this.params.pixelRatio,~~(h/2)),v=h+m,g=1/this.params.barHeight;if(this.params.normalize){var y=e.util.max(t),b=e.util.min(t);g=-b>y?-b:y}for(var E=d/l,w=r/E;w<o/E;w+=v){var _=t[Math.floor(w*E*u)]||0,k=Math.round(_/g*p);this.fillRect(w+this.halfPixel,p-k+f,h+this.halfPixel,2*k)}},drawWave:function(t,n,r,o){var a=this;if(t[0]instanceof Array){var i=t;if(this.params.splitChannels)return this.setHeight(i.length*this.params.height*this.params.pixelRatio),void i.forEach(function(e,t){a.drawWave(e,t,r,o)});t=i[0]}if(![].some.call(t,function(e){return e<0})){for(var s=[],u=0,l=t.length;u<l;u++)s[2*u]=t[u],s[2*u+1]=-t[u];t=s}var c=this.params.height*this.params.pixelRatio,f=c*n||0,p=c/2,d=1/this.params.barHeight;if(this.params.normalize){var h=e.util.max(t),m=e.util.min(t);d=-m>h?-m:h}this.drawLine(t,d,p,f,r,o),this.fillRect(0,p+f-this.halfPixel,this.width,this.halfPixel)},drawLine:function(e,t,n,r,o,a){for(var i in this.canvases){var s=this.canvases[i];this.setFillStyles(s),this.drawLineToContext(s,s.waveCtx,e,t,n,r,o,a),this.drawLineToContext(s,s.progressCtx,e,t,n,r,o,a)}},drawLineToContext:function(e,t,n,r,o,a,i,s){if(t){var u=n.length/2,l=1;this.params.fillParent&&this.width!=u&&(l=this.width/u);var c=Math.round(u*e.start),f=Math.round(u*e.end);if(!(c>s||f<i)){var p=Math.max(c,i),d=Math.min(f,s);t.beginPath(),t.moveTo((p-c)*l+this.halfPixel,o+a);for(var h=p;h<d;h++){var m=n[2*h]||0,v=Math.round(m/r*o);t.lineTo((h-c)*l+this.halfPixel,o-v+a)}for(var h=d-1;h>=p;h--){var m=n[2*h+1]||0,v=Math.round(m/r*o);t.lineTo((h-c)*l+this.halfPixel,o-v+a)}t.closePath(),t.fill()}}},fillRect:function(e,t,n,r){for(var o=Math.floor(e/this.maxCanvasWidth),a=Math.min(Math.ceil((e+n)/this.maxCanvasWidth)+1,this.canvases.length),i=o;i<a;i++){var s=this.canvases[i],u=i*this.maxCanvasWidth,l={x1:Math.max(e,i*this.maxCanvasWidth),y1:t,x2:Math.min(e+n,i*this.maxCanvasWidth+s.waveCtx.canvas.width),y2:t+r};l.x1<l.x2&&(this.setFillStyles(s),this.fillRectToContext(s.waveCtx,l.x1-u,l.y1,l.x2-l.x1,l.y2-l.y1),this.fillRectToContext(s.progressCtx,l.x1-u,l.y1,l.x2-l.x1,l.y2-l.y1))}},fillRectToContext:function(e,t,n,r,o){e&&e.fillRect(t,n,r,o)},setFillStyles:function(e){e.waveCtx.fillStyle=this.params.waveColor,this.hasProgressCanvas&&(e.progressCtx.fillStyle=this.params.progressColor)},updateProgress:function(e){this.style(this.progressWave,{width:e+"px"})},getImage:function(e,t){var n=[];return this.canvases.forEach(function(r){n.push(r.wave.toDataURL(e,t))}),n.length>1?n:n[0]}}),e.Drawer.SplitWavePointPlot=Object.create(e.Drawer.Canvas),e.util.extend(e.Drawer.SplitWavePointPlot,{defaultPlotParams:{plotNormalizeTo:"whole",plotTimeStart:0,plotMin:0,plotMax:1,plotColor:"#f63",plotProgressColor:"#F00",plotPointHeight:2,plotPointWidth:2,plotSeparator:!0,plotSeparatorColor:"black",plotRangeDisplay:!1,plotRangeUnits:"",plotRangePrecision:4,plotRangeIgnoreOutliers:!1,plotRangeFontSize:12,plotRangeFontType:"Ariel",waveDrawMedianLine:!0,plotFileDelimiter:"\t"},plotTimeStart:0,plotTimeEnd:-1,plotArrayLoaded:!1,plotArray:[],plotPoints:[],plotMin:0,plotMax:1,initDrawer:function(e){var t=this;for(var n in this.defaultPlotParams)void 0===this.params[n]&&(this.params[n]=this.defaultPlotParams[n]);if(this.plotTimeStart=this.params.plotTimeStart,void 0!==this.params.plotTimeEnd&&(this.plotTimeEnd=this.params.plotTimeEnd),Array.isArray(e.plotArray))this.plotArray=e.plotArray,this.plotArrayLoaded=!0;else{var r=function(e){t.plotArray=e,t.plotArrayLoaded=!0,t.fireEvent("plot_array_loaded")};this.loadPlotArrayFromFile(e.plotFileUrl,r,this.params.plotFileDelimiter)}},drawPeaks:function(e,t,n,r){if(1==this.plotArrayLoaded)this.setWidth(t),this.splitChannels=!0,this.params.height=this.params.height/2,e[0]instanceof Array&&(e=e[0]),this.params.barWidth?this.drawBars(e,1,n,r):this.drawWave(e,1,n,r),this.params.height=2*this.params.height,this.calculatePlots(),this.drawPlots();else{var o=this;o.on("plot-array-loaded",function(){o.drawPeaks(e,t,n,r)})}},drawPlots:function(){var e=this.params.height*this.params.pixelRatio/2,t=.5/this.params.pixelRatio;this.waveCc.fillStyle=this.params.plotColor,this.progressCc&&(this.progressCc.fillStyle=this.params.plotProgressColor);for(var n in this.plotPoints){var r=parseInt(n),o=e-this.params.plotPointHeight-this.plotPoints[n]*(e-this.params.plotPointHeight),a=this.params.plotPointHeight;this.waveCc.fillRect(r,o,this.params.plotPointWidth,a),this.progressCc&&this.progressCc.fillRect(r,o,this.params.plotPointWidth,a)}this.params.plotSeparator&&(this.waveCc.fillStyle=this.params.plotSeparatorColor,this.waveCc.fillRect(0,e,this.width,t)),this.params.plotRangeDisplay&&this.displayPlotRange()},displayPlotRange:function(){var e=this.params.plotRangeFontSize*this.params.pixelRatio,t=this.plotMax.toPrecision(this.params.plotRangePrecision)+" "+this.params.plotRangeUnits,n=this.plotMin.toPrecision(this.params.plotRangePrecision)+" "+this.params.plotRangeUnits;this.waveCc.font=e.toString()+"px "+this.params.plotRangeFontType,this.waveCc.fillText(t,3,e),this.waveCc.fillText(n,3,this.height/2)},calculatePlots:function(){this.plotPoints={},this.calculatePlotTimeEnd();for(var e=[],t=-1,n=0,r=99999999999999,o=0,a=99999999999999,i=this.plotTimeEnd-this.plotTimeStart,s=0;s<this.plotArray.length;s++){var u=this.plotArray[s];if(u.value>n&&(n=u.value),u.value<r&&(r=u.value),u.time>=this.plotTimeStart&&u.time<=this.plotTimeEnd){var l=Math.round(this.width*(u.time-this.plotTimeStart)/i);if(e.push(u.value),l!==t&&e.length>0){var c=this.avg(e);c>o&&(o=c),c<a&&(a=c),this.plotPoints[t]=c,e=[]}t=l}}"whole"==this.params.plotNormalizeTo?(this.plotMin=r,this.plotMax=n):"values"==this.params.plotNormalizeTo?(this.plotMin=this.params.plotMin,this.plotMax=this.params.plotMax):(this.plotMin=a,this.plotMax=o),this.normalizeValues()},normalizeValues:function(){var e={};if("none"!==this.params.plotNormalizeTo){for(var t in this.plotPoints){var n=(this.plotPoints[t]-this.plotMin)/(this.plotMax-this.plotMin);n>1?this.params.plotRangeIgnoreOutliers||(e[t]=1):n<0?this.params.plotRangeIgnoreOutliers||(e[t]=0):e[t]=n}this.plotPoints=e}},loadPlotArrayFromFile:function(t,n,r){void 0===r&&(r="\t");var o=[],a={url:t,responseType:"text"};e.util.ajax(a).on("load",function(e){if(200==e.currentTarget.status){for(var t=e.currentTarget.responseText.split("\n"),a=0;a<t.length;a++){var i=t[a].split(r);2==i.length&&o.push({time:parseFloat(i[0]),value:parseFloat(i[1])})}n(o)}})},calculatePlotTimeEnd:function(){void 0!==this.params.plotTimeEnd?this.plotTimeEnd=this.params.plotTimeEnd:this.plotTimeEnd=this.plotArray[this.plotArray.length-1].time},avg:function(e){return e.reduce(function(e,t){return e+t})/e.length}}),e.util.extend(e.Drawer.SplitWavePointPlot,e.Observer),e.PeakCache={init:function(){this.clearPeakCache()},clearPeakCache:function(){this.peakCacheRanges=[],this.peakCacheLength=-1},addRangeToPeakCache:function(e,t,n){e!=this.peakCacheLength&&(this.clearPeakCache(),this.peakCacheLength=e);for(var r=[],o=0;o<this.peakCacheRanges.length&&this.peakCacheRanges[o]<t;)o++;for(o%2==0&&r.push(t);o<this.peakCacheRanges.length&&this.peakCacheRanges[o]<=n;)r.push(this.peakCacheRanges[o]),o++;o%2==0&&r.push(n),r=r.filter(function(e,t,n){return 0==t?e!=n[t+1]:t==n.length-1?e!=n[t-1]:e!=n[t-1]&&e!=n[t+1]}),this.peakCacheRanges=this.peakCacheRanges.concat(r),this.peakCacheRanges=this.peakCacheRanges.sort(function(e,t){return e-t}).filter(function(e,t,n){return 0==t?e!=n[t+1]:t==n.length-1?e!=n[t-1]:e!=n[t-1]&&e!=n[t+1]});var a=[];for(o=0;o<r.length;o+=2)a.push([r[o],r[o+1]]);return a},getCacheRanges:function(){for(var e=[],t=0;t<this.peakCacheRanges.length;t+=2)e.push([this.peakCacheRanges[t],this.peakCacheRanges[t+1]]);return e}},function(){var t=function(){var t=document.querySelectorAll("wavesurfer");Array.prototype.forEach.call(t,function(t){var n=e.util.extend({container:t,backend:"MediaElement",mediaControls:!0},t.dataset);t.style.display="block";var r=e.create(n);if(t.dataset.peaks)var o=JSON.parse(t.dataset.peaks);r.load(t.dataset.url,o)})};"complete"===document.readyState?t():window.addEventListener("load",t)}(),e})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(127),c=r(l),f=n(0),p=r(f),d=(n(5),n(4)),h=n(50),m=function(e){function t(e){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={modalOpen:!1,title:"",description:"",addsection:!0,createsection:!1,filter:""},n.openModal=n.openModal.bind(n),n.closeModal=n.closeModal.bind(n),n.close=n.close.bind(n),n.createModal=!1,n.handleSubmit=n.handleSubmit.bind(n),n.toggleform=n.toggleform.bind(n),n.addSong=n.addSong.bind(n),n.removeSong=n.removeSong.bind(n),n}return s(t,e),u(t,[{key:"componentDidMount",value:function(){}},{key:"openModal",value:function(){this.setState({modalOpen:!0}),this.props.fetchPlaylistsByUserID(this.props.currentUser.id)}},{key:"closeModal",value:function(){this.setState({modalOpen:!1})}},{key:"addSong",value:function(e){this.props.addSongToPlaylist(this.props.song.id,e.id)}},{key:"removeSong",value:function(e){this.props.removeSongFromPlaylist(this.props.song.id,e.id)}},{key:"update",value:function(e){var t=this;return function(n){return t.setState(o({},e,n.currentTarget.value))}}},{key:"close",value:function(e){e.preventDefault(),this.setState({modalOpen:!1}),this.props.removePlaylists()}},{key:"componentWillUnmount",value:function(){}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.props.createPlaylist({title:this.state.title,description:this.state.description}).then(function(e){t.props.addSongToPlaylist(t.props.song.id,e.playlist.id)}),this.setState({addsection:!0,createsection:!1}),$("#modal-playlist-add-header").addClass("modal-playlist-header-active"),$("#modal-playlist-create-header").removeClass("modal-playlist-header-active")}},{key:"toggleform",value:function(e){!0===this.state.addsection&&"modal-playlist-create-header"===e.target.id?(this.setState({addsection:!1,createsection:!0}),$("#modal-playlist-create-header").addClass("modal-playlist-header-active"),$("#modal-playlist-add-header").removeClass("modal-playlist-header-active")):!0===this.state.createsection&&"modal-playlist-add-header"===e.target.id&&(this.setState({addsection:!0,createsection:!1}),$("#modal-playlist-add-header").addClass("modal-playlist-header-active"),$("#modal-playlist-create-header").removeClass("modal-playlist-header-active"))}},{key:"render",value:function(){var e=this;0===this.props.currentUser.playlistnum&&(this.createModal=!0);var t=void 0,n=void 0;if(n=!0===this.createModal?p.default.createElement("div",{className:"playlist-form-heading-div"},p.default.createElement("h3",{className:"playlist-form-header"},"Create a Playlist")):p.default.createElement("div",{className:"playlist-form-heading-div"},p.default.createElement("ul",{className:"playlist-form-header-ul"},p.default.createElement("li",{className:"pfhul modal-playlist-header-active",id:"modal-playlist-add-header",onClick:this.toggleform}," Add to Playlist "),p.default.createElement("li",{className:"pfhul",id:"modal-playlist-create-header",onClick:this.toggleform}," Create a playlist"))),!0===this.createModal||!0===this.state.createsection)t=p.default.createElement("div",null,p.default.createElement("div",{className:"rest-of-playlist-form"},p.default.createElement("div",{className:"create-playlist-textfield"},p.default.createElement("span",{className:"playlist-title-span"},"Playlist Title",p.default.createElement("span",{className:"required-field-asterisk"}," *")),p.default.createElement("input",{type:"text",onChange:this.update("title"),value:this.state.title,className:"create-playlist-input-title"})),p.default.createElement("div",{className:"create-playlist-textfield"},p.default.createElement("span",{className:"playlist-title-span"},"Description (Optional)"),p.default.createElement("input",{onChange:this.update("description"),value:this.state.description,type:"text",className:"create-playlist-input-description"})),p.default.createElement("div",{className:"playlist-songs-form"},p.default.createElement("ul",{className:"playlist-songs-form-ul"},p.default.createElement("li",{className:"playlist-songs-form-ul-li"},p.default.createElement("div",{className:"psfui-image"},p.default.createElement("img",{src:this.props.song.cover_art_url})),p.default.createElement("div",{className:"psfui-info"},p.default.createElement("span",{className:"psfui-infou"},this.props.song.user.username," -"),p.default.createElement("span",{className:"psfui-infot"},this.props.song.title))),p.default.createElement("li",{className:"playlist-songs-form-ul-li"}),p.default.createElement("li",{className:"playlist-songs-form-ul-li"}),p.default.createElement("li",{className:"playlist-songs-form-ul-li"})))),p.default.createElement("button",{onClick:this.handleSubmit,className:"submit-playlist-button"},"Save"));else if(this.props.possiblePlaylists.length>0){var r={},o=(this.props.possiblePlaylists.forEach(function(t){t.title.includes(e.state.filter)&&(r[t.id]=t)}),Object.values(r).map(function(t){var n=p.default.createElement("button",{className:"add-to-playlist-modal-button",onClick:function(){return e.addSong(t)}}," Add To Playlist"),r=p.default.createElement("button",{className:"remove-from-playlist-modal-button",onClick:function(){return e.removeSong(t)}},"Added");return p.default.createElement("li",{className:"playlist-modal-filter-ul-li"},p.default.createElement("img",{src:t.playlist_songs[0]?t.playlist_songs[0].cover_art_url:t.user.avatar_url}),p.default.createElement("div",{className:"pmfiulai"},p.default.createElement("span",{className:"pmfiulau"},t.title),p.default.createElement("div",{className:"track-count-playlist-modal"},p.default.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"}),p.default.createElement("span",{className:"pmfiulst"},t.playlist_songs.length))),t.playlist_songs.map(function(e){return e.title}).includes(e.props.song.title)?r:n)}));t=p.default.createElement("div",{className:"rest-of-playlist-form"},p.default.createElement("input",{className:"playlist-modal-filter-input",type:"text",placeholder:"Filter playlists",onChange:this.update("filter"),value:this.state.filter}),p.default.createElement("ul",{className:"playlist-modal-filter-ul"},o.slice(0,5)))}var a=void 0;return!0===this.state.modalOpen&&(a=p.default.createElement("div",{className:"modal-backdrop",onClick:function(t){return e.close(t)}})),p.default.createElement("div",{className:"playlist-button"},p.default.createElement("button",{id:"add-to-playlist-button",onClick:function(){return e.openModal()}}),p.default.createElement(c.default,{isOpen:this.state.modalOpen,onClose:function(t){return e.close(t)}},n,t),a)}}]),t}(p.default.Component),v=function(e){return{currentUser:e.session.currentUser,possiblePlaylists:e.playlists.allplaylists,byTitle:e.playlists.byTitle}},g=function(e){return{createPlaylist:function(t){return e((0,h.createPlaylist)(t))},addSongToPlaylist:function(t,n){return e((0,h.addSongToPlaylist)(t,n))},fetchPlaylistsByUserID:function(t){return e((0,h.fetchPlaylistsByUserID)(t))},removePlaylists:function(){return e((0,h.removePlaylists)())},removeSongFromPlaylist:function(t,n){return e((0,h.removeSongFromPlaylist)(t,n))},removePlaylist:function(t){return e((0,h.removePlaylist)(t))}}};t.default=(0,d.connect)(v,g)(m)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchOnePlaylist=function(e){return $.ajax({method:"GET",url:"api/playlists/"+e})},t.createPlaylist=function(e){return $.ajax({method:"POST",url:"api/playlists",data:{playlist:e}})},t.updatePlaylist=function(e,t){return $.ajax({method:"PATCH",url:"api/playlists/"+t,data:{playlist:e}})},t.addSongToPlaylist=function(e,t){return $.ajax({method:"POST",url:"api/playlists/addsong/"+t,data:{songid:e}})},t.removeSongFromPlaylist=function(e,t){return $.ajax({method:"POST",url:"api/playlists/removesong/"+t,data:{songid:e}})},t.fetchPlaylists=function(){return $.ajax({method:"GET",url:"api/playlists"})},t.searchPlaylists=function(e){return $.ajax({method:"GET",url:"api/playlists",data:{token:"search",query:e}})},t.fetchPlaylistByTitle=function(e){return $.ajax({method:"GET",url:"api/playlists/show2/"+e})},t.fetchPlaylistByUserID=function(e){return $.ajax({method:"GET",url:"api/playlists/userfind/"+e})},t.deletePlaylist=function(e){return $.ajax({method:"DELETE",url:"api/playlists/"+e.id})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchLikes=function(){return $.ajax({method:"GET",url:"api/likes"})},t.createLike=function(e){return $.ajax({method:"POST",url:"api/likes",data:e})},t.deleteLike=function(e){return $.ajax({method:"DELETE",url:"api/likes/"+e.id,data:e})},t.fetchLikesBySongID=function(e){return $.ajax({method:"GET",url:"api/likes/songfind/"+e})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchCurrentUserFollows=function(){return $.ajax({method:"GET",url:"api/follows"})},t.createFollow=function(e){return $.ajax({method:"POST",url:"api/follows",data:e})},t.deleteFollow=function(e){return $.ajax({method:"DELETE",url:"api/follows/"+e.id,data:e})},t.fetchFollowsByUserID=function(e){return $.ajax({method:"GET",url:"api/follows/userfind/"+e})}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=(n(5),n(4)),c=n(9),f=n(16),p=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=n.handleClick.bind(n),n.movebar=n.movebar.bind(n),n.clickbar=n.clickbar.bind(n),n.dragbar=n.dragbar.bind(n),n.dragdrop=n.dragdrop.bind(n),n.dragEnter=n.dragEnter.bind(n),n.dragOver=n.dragOver.bind(n),n.dragwidth=null,n.dragmusic=null,n.goToUser=n.goToUser.bind(n),n.goToSong=n.goToSong.bind(n),n.timeshow=n.timeshow.bind(n),n.setdata=n.setdata.bind(n),n.ended=n.ended.bind(n),n.username=null,n.title=null,n.queue=[],n.queueIdx=0,n.nextSong=n.nextSong.bind(n),n.previousSong=n.previousSong.bind(n),n}return a(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){""!==e.audio.track_url&&e.audio.id!==this.props.audio.id&&this.props.fetchOneUserByID(e.audio.user_id),null===e.audio.id?this.footer.className="aintnothinghere":(null===this.props.audio.id&&(this.queue=e.audio.queue,this.queueIdx=0),this.footer.className="audiofooter"),"REQUEST-TIME"===e.audio.request&&this.props.provideAudioPlaybackTime(this.music.currentTime)}},{key:"goToSong",value:function(){this.props.history.push("/"+this.props.artist.username+"/"+this.props.audio.title)}},{key:"goToUser",value:function(){this.props.history.push("/"+this.props.artist.username)}},{key:"nextSong",value:function(){this.queueIdx<this.queue.length-1?(this.queueIdx+=1,this.props.receiveAudio(Object.assign(this.queue[this.queueIdx],{token:"PLAYING",queue:this.queue})),this.music.src=this.queue[this.queueIdx].track_url):store.dispatch(this.props.receivePauseToken())}},{key:"previousSong",value:function(){this.queueIdx>0?(this.queueIdx-=1,this.props.receiveAudio(Object.assign(this.queue[this.queueIdx],{token:"PLAYING",queue:this.queue})),this.music.src=this.queue[this.queueIdx].track_url):(store.dispatch(this.props.receivePauseToken()),this.music.currentTime=0)}},{key:"componentWillUpdate",value:function(e){this.music&&("PLAYING"===e.audio.token?(this.music.play(),this.playbutton.className="pause"):"PAUSED"===e.audio.token&&(this.music.pause(),this.playbutton.className="play"),"WAVEFORM-OVERRIDE"===e.audio.token&&e.audio.id===this.props.audio.id&&(this.music.currentTime=e.audio.set*this.music.duration,this.music.paused?store.dispatch(this.props.receivePauseToken()):store.dispatch(this.props.receivePlayToken())))}},{key:"timeshow",value:function(e){var t=parseInt(Math.floor(e/60)),n=parseInt(e%60);return n=n<10?"0"+n:n,0===t?"0:"+n:(t=t<10?"0"+t:t)+":"+n}},{key:"ended",value:function(e){this.queueIdx===this.queue.length-1||0===this.queue.length?store.dispatch(this.props.receivePauseToken()):(this.queueIdx+=1,this.props.receiveAudio(Object.assign(this.queue[this.queueIdx],{token:"PLAYING",queue:this.queue})),this.music.src=this.queue[this.queueIdx].track_url)}},{key:"movebar",value:function(e){var t=this.music.duration,n=this.music.currentTime;this.fullduration.innerText=this.timeshow(this.music.duration);var r=n/t,o=r.toLocaleString("en",{minimumFractionDigits:10,style:"percent"});this.playbar.style.width=o,this.timeelapased.innerText=""+this.timeshow(n);var a=r*this.playbarholder.clientWidth;this.ball.style.left=a+"px"}},{key:"clickbar",value:function(e){var t=this.playbarholder.clientWidth,n=this.music.duration,r=e.clientX-this.playbar.offsetLeft-this.playbar.offsetParent.offsetLeft-this.container.offsetLeft;this.music.style.width=r,this.music.currentTime=r/t*n,this.props.provideAudioPlaybackTime(this.music.currentTime)}},{key:"dragOver",value:function(e){return e.preventDefault(),!1}},{key:"dragStart",value:function(e){e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("Text",ev.target.getAttribute("id")),ev.dataTransfer.setDragImage(ev.target,0,0)}},{key:"dragbar",value:function(e){var t=this.playbarholder.clientWidth;console.log("hello");var n=this.music.duration,r=e.clientX-this.playbar.offsetLeft-this.playbar.offsetParent.offsetLeft-this.container.offsetLeft;this.dragwidth=r,this.dragmusic=r/t*n}},{key:"dragdrop",value:function(e){this.playbar.style.width=this.dragwidth,this.music.currentTime=this.dragmusic}},{key:"dragEnter",value:function(e){return e.preventDefault(),console.log("can put"),!0}},{key:"setdata",value:function(){this.title.innerText=this.props.audio.title,this.username.innerText=this.props.audio.user.username}},{key:"handleClick",value:function(){"PAUSED"===this.props.audio.token?(this.props.provideAudioPlaybackTime(this.music.currentTime),store.dispatch(this.props.receivePlayToken())):"PLAYING"===this.props.audio.token&&(this.props.provideAudioPlaybackTime(this.music.currentTime),store.dispatch(this.props.receivePauseToken()))}},{key:"render",value:function(){var e=this,t=void 0;return""!==this.props.audio.track_url&&(t=u.default.createElement("div",{className:"playbar",ref:function(t){return e.container=t}},u.default.createElement("audio",{onTimeUpdate:this.movebar,onCanPlay:this.setdata,onEnded:this.ended,id:"song",ref:function(t){return e.music=t}},u.default.createElement("source",{src:this.props.audio.track_url,type:"audio/ogg"}),u.default.createElement("source",{src:this.props.audio.track_url,type:"audio/mpeg"})),u.default.createElement("div",{className:"controls"},u.default.createElement("i",{className:"fa fa-step-backward","aria-hidden":"true",id:"prev-song-button",onClick:this.previousSong}),u.default.createElement("button",{id:"playbutton",className:"pause",onClick:this.handleClick,ref:function(t){return e.playbutton=t}}),u.default.createElement("i",{className:"fa fa-step-forward","aria-hidden":"true",id:"next-song-button",onClick:this.nextSong})),u.default.createElement("span",{className:"time-elapsed",ref:function(t){return e.timeelapased=t}}),u.default.createElement("div",{className:"progress-bar-background",ref:function(t){return e.playbarholder=t},onClick:this.clickbar,onDrop:this.dragdrop,onDragEnter:this.dragEnter,onDragOver:this.dragOver},u.default.createElement("div",{className:"dragball",ref:function(t){return e.ball=t},onDragStart:this.dragbar,onDrag:this.dragbar,draggable:"true"}),u.default.createElement("div",{className:"progress-bar",ref:function(t){return e.playbar=t},onClick:this.clickbar})),u.default.createElement("span",{className:"full-duration",ref:function(t){return e.fullduration=t}}),u.default.createElement("div",{className:"currentSongInfo"}," ",u.default.createElement("img",{className:"song-coverart-playerslice",src:this.props.audio.cover_art_url,onClick:this.goToSong}),u.default.createElement("div",{className:"song-infoplayer-slice"},u.default.createElement("span",{className:"playbar-artist-infoslice",ref:function(t){return e.username=t},onClick:this.goToUser}),u.default.createElement("span",{className:"playbar-song-infoslice",ref:function(t){return e.title=t},onClick:this.goToSong}))))),u.default.createElement("footer",{className:"audiofooter",ref:function(t){return e.footer=t}},t)}}]),t}(u.default.Component),d=function(e){return e.users.byID[e.audio.user_id]||{username:""}},h=function(e){return{audio:e.audio,artist:d(e)}},m=function(e){return{fetchSongs:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(fetchSongs())}),clearUsers:function(){return e((0,c.clearUsers)())},fetchOneUser:function(t){return e((0,c.fetchOneUser)(t))},fetchOneUserByID:function(t){return e((0,c.fetchOneUserByID)(t))},receivePlayToken:function(){return e(f.receivePlayToken)},receivePauseToken:function(){return e(f.receivePauseToken)},provideAudioPlaybackTime:function(t){return e((0,f.provideAudioPlaybackTime)(t))},receiveAudio:function(t){return e((0,f.receiveAudio)(t))},removeAudioToken:function(){return e((0,f.removeAudioToken)())}}};t.default=(0,l.connect)(h,m)(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(11),f=n(9),p=n(16),d=n(77),h=(r(d),n(4)),m=n(5),v=n(32),g=n(22),y=n(76),b=r(y),E=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.followUser=n.followUser.bind(n),n.unfollowUser=n.unfollowUser.bind(n),n}return i(t,e),s(t,[{key:"componentDidMount",value:function(){var e=this;this.props.fetchOneUser(this.props.match.params.username).then(function(t){e.props.fetchSongsByUserID(t.user.id),e.props.fetchFollowsByUserID(t.user.id)})}},{key:"componentWillReceiveProps",value:function(e){e.match.params.username!==this.props.match.params.username&&(this.props.removeSongs(),this.props.removeFollows(),this.props.removeLikes())}},{key:"componentWillUnmount",value:function(){this.props.removeLikes(),this.props.removeFollows(),this.props.removeSongs(),this.props.clearUsers()}},{key:"componentWillUpdate",value:function(e){var t=this;e.match.params.username!==this.props.match.params.username&&this.props.fetchOneUser(e.match.params.username).then(function(e){t.props.fetchSongsByUserID(e.user.id)})}},{key:"followUser",value:function(e){e.preventDefault(),this.props.createFollow({follow:{followee_id:this.props.user.id}})}},{key:"unfollowUser",value:function(e){e.preventDefault(),this.props.deleteFollow({follow:{followee_id:this.props.user.id}})}},{key:"render",value:function(){var e=void 0,t=Object.keys(this.props.follows.byFollowerID).join(",").split(",").map(function(e){return parseInt(e)}),n=t.length;isNaN(t[0])?(n=0,e=l.default.createElement("button",{onClick:this.followUser,className:"userpage-follow-button-follow"}," Follow ")):(e=t.includes(this.props.currentUser.id)?l.default.createElement("button",{onClick:this.unfollowUser,className:"userpage-follow-button-unfollow"}," Unfollow "):l.default.createElement("button",{onClick:this.followUser,className:"userpage-follow-button-follow"},"  Follow "),n=t.length);var r=void 0;if(this.props.user){var o=[];this.props.likes.length>0&&(o=this.props.likes);var a=this.props.songs.map(function(e){return l.default.createElement(b.default,{song:e,key:e.id,likes:o.filter(function(t){return t.song_id===e.id})})}),i=l.default.createElement("ul",{className:"user-page-navlinks"},l.default.createElement("li",null,l.default.createElement(m.NavLink,{to:"/"+this.props.user.username},"All")),l.default.createElement("li",null,l.default.createElement(m.NavLink,{to:"/"+this.props.user.username+"/songs"},"Tracks")),l.default.createElement("li",null,l.default.createElement(m.NavLink,{to:"/"+this.props.user.username+"/playlists"},"Playlists")),l.default.createElement("li",null,l.default.createElement(m.NavLink,{to:"/"+this.props.user.username+"/albums"},"Albums")),l.default.createElement("li",null,l.default.createElement(m.NavLink,{to:"/"+this.props.user.username+"/reposts"},"Reposts")),e);r=l.default.createElement("div",{className:"usersongindex"},l.default.createElement("div",{className:"user-page"},l.default.createElement("div",{className:"user-page-overall"},l.default.createElement("div",{className:"user-header"},l.default.createElement("div",{className:"header-replacement"}),l.default.createElement("ul",{className:"user-information"},l.default.createElement("li",null,l.default.createElement("span",null,this.props.user.username))),l.default.createElement("div",{className:"user-avatar"},l.default.createElement("img",{src:this.props.user.avatar_url}))),i)),l.default.createElement("div",{className:"userpage-belowheader"},l.default.createElement("ul",{className:"songindexlist"},a),l.default.createElement("div",{className:"userpage-sidebar"},l.default.createElement("div",null,l.default.createElement("table",{className:"stats"},l.default.createElement("tbody",{className:"userpage-stats-tbody"},l.default.createElement("tr",null,l.default.createElement("td",{className:"sidebar-stats-td"},l.default.createElement("h3",{className:"sidebar-stats-header"},"Followers"),l.default.createElement("div",{className:"sidebar-stats-value"},n)),l.default.createElement("td",{className:"sidebar-stats-td"},l.default.createElement("h3",{className:"sidebar-stats-header"},"Following"),l.default.createElement("div",{className:"sidebar-stats-value"},this.props.user.followingnum)),l.default.createElement("td",{className:"sidebar-stats-td"},l.default.createElement("h3",{className:"sidebar-stats-header"},"Tracks"),l.default.createElement("div",{className:"sidebar-stats-value"},this.props.user.songnum)))))))))}else r=l.default.createElement("div",{className:"loader"},"Loading...");return r}}]),t}(l.default.Component),w=function(e,t){return{user:e.users.byUsername[t.match.params.username],songs:e.songs.allsongs,likes:e.likes.alllikes,follows:e.follows,currentUser:e.session.currentUser}},_=function(e){return{fetchSongsByUserID:function(t){return e((0,c.fetchSongsByUserID)(t))},fetchOneUser:function(t){return e((0,f.fetchOneUser)(t))},removeSongs:function(){return e((0,c.removeSongs)())},removeLikes:function(){return e((0,v.removeLikes)())},fetchCurrentUserFollows:function(){return e((0,g.fetchCurrentUserFollows)())},fetchFollowsByUserID:function(t){return e((0,g.fetchFollowsByUserID)(t))},removeFollows:function(){return e((0,g.removeFollows)())},createFollow:function(t){return e((0,g.createFollow)(t))},deleteFollow:function(t){return e((0,g.deleteFollow)(t))},requestAudioPlaybackTime:function(){return e((0,p.requestAudioPlaybackTime)())},addSessionFollow:function(t){return e((0,g.addSessionFollow)(t))},removeSessionFollow:function(t){return e((0,g.removeSessionFollow)(t))},clearUsers:function(){return e((0,f.clearUsers)())}}};t.default=(0,h.connect)(w,_)(E)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(9),p=n(77),d=r(p),h=n(4),m=(n(5),n(11)),v=n(30),g=r(v),y=n(31),b=r(y),E=n(132),w=(r(E),n(78)),_=n(298),k=r(_),C=n(22),S=n(16),x=n(32),P=n(130),T=r(P),O=n(299),N=(r(O),function(e){function t(e){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.removeLikes(),n.goToUser=n.goToUser.bind(n),n.goToEdit=n.goToEdit.bind(n),n.byeBye=n.byeBye.bind(n),n.followUser=n.followUser.bind(n),n.unfollowUser=n.unfollowUser.bind(n),n.howLongAgo=n.howLongAgo.bind(n),n.editbutton=null,n.deletebutton=null,n.props.fetchOneUser(n.props.match.params.username).then(function(e){n.props.fetchFollowsByUserID(e.user.id)}),n.likeSong=n.likeSong.bind(n),n.unlikeSong=n.unlikeSong.bind(n),n.handlePosChange=n.handlePosChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.handleWaveformClick=n.handleWaveformClick.bind(n),n.state={body:"",comment_time:"",song_id:null,playing:!1,pos:0,volume:0},n}return s(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this;this.props.fetchSongByTitle(this.props.match.params.title).then(function(t){e.props.fetchCommentsBySongID(t.song.id),e.props.fetchLikesBySongID(t.song.id)})}},{key:"followUser",value:function(e){e.preventDefault(),this.props.createFollow({follow:{followee_id:this.props.user.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"unfollowUser",value:function(e){e.preventDefault(),this.props.deleteFollow({follow:{followee_id:this.props.user.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"handleSubmit",value:function(e){if(13!==e.keyCode)return null;var t=this.state,n=document.getElementsByClassName("playbar-song-infoslice");if(0===n.length||n[0].innerText!==this.props.song.title){var r=Math.floor(60*Math.random());r=r<10?"0"+r:""+r,t.comment_time="0"+Math.floor(3.5*Math.random())+":"+r}else t.comment_time=document.getElementsByClassName("time-elapsed")[0].innerText;t.song_id=this.props.song.id;this.setState({body:"",comment_time:"",song_id:null}),this.props.createComment({comment:t}),this.props.requestAudioPlaybackTime()}},{key:"howLongAgo",value:function(e){var t,n=new Date(""+e),r=new Date,o=Math.abs(r.getTime()-n.getTime()),a=Math.abs(o/864e5);if(a<1)var t="Today";else if(a<2)var t="1 day";else{a=Math.floor(a);var t=a+" days"}return t}},{key:"update",value:function(e){var t=this;return function(n){return t.setState(o({},e,n.currentTarget.value))}}},{key:"componentWillUnmount",value:function(){this.props.removeComments(),this.props.removeLikes(),this.props.removeFollows(),this.props.removeSongs(),this.props.song.id===this.props.audio.id&&this.props.requestAudioPlaybackTime()}},{key:"componentWillReceiveProps",value:function(e){e.match.params.username===this.props.match.params.username&&e.match.params.title===this.props.match.params.title||(this.props.removeSongs(),this.props.clearUsers(),this.props.removeFollows(),this.props.removeLikes()),"PLAYING"===e.audio.token&&e.audio.id===e.song.id?this.setState({playing:!0,volume:0,pos:e.audio.time}):"PAUSED"===e.audio.token&&e.audio.id===e.song.id&&this.setState({playing:!1,volume:0,pos:e.audio.time})}},{key:"handlePosChange",value:function(e){this.setState({pos:e.originalArgs[0]})}},{key:"handleWaveformClick",value:function(e){var t=(e.clientX-e.currentTarget.getBoundingClientRect().left)/e.currentTarget.clientWidth;this.props.changePlaybackTime(t)}},{key:"likeSong",value:function(e){e.preventDefault(),this.props.createLike({like:{song_id:this.props.song.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"unlikeSong",value:function(e){e.preventDefault(),this.props.deleteLike({like:{song_id:this.props.song.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"goToUser",value:function(){this.props.history.push("/"+this.props.match.params.username)}},{key:"goToEdit",value:function(){this.props.history.push(this.props.location.pathname+"/edit")}},{key:"byeBye",value:function(){var e=this;this.props.deleteSong(this.props.song).then(function(){return e.props.history.push("/"+e.props.match.params.username)})}},{key:"render",value:function(){var e=this;if(this.props.song&&this.props.user){this.props.currentUser&&this.props.user&&this.props.currentUser.id===this.props.user.id&&(this.editbutton=c.default.createElement("button",{onClick:this.goToEdit,className:"editbutton"},"Edit"),this.deletebutton=c.default.createElement("button",{onClick:this.byeBye,className:"deletebutton"},"Delete"));var t=this.props.comments.map(function(t){return c.default.createElement(k.default,{comment:t,timeago:e.howLongAgo(t.created_at),parent:e})}),n=void 0,r=Object.keys(this.props.follows.byFollowerID).join(",").split(",").map(function(e){return parseInt(e)}),o=r.length;isNaN(r[0])?(o=0,n=c.default.createElement("button",{onClick:this.followUser,className:"userpage-follow-button-follow"}," Follow ")):(n=r.includes(this.props.currentUser.id)?c.default.createElement("button",{onClick:this.unfollowUser,className:"userpage-follow-button-unfollow"}," Unfollow "):c.default.createElement("button",{onClick:this.followUser,className:"userpage-follow-button-follow"},"  Follow "),o=r.length);var a=void 0,i=void 0;isNaN(this.props.likedUsers[0])?(i=0,a=c.default.createElement("button",{onClick:this.likeSong,className:"songpage-likebutton-notliked"},"Like")):(a=this.props.likedUsers.includes(this.props.currentUser.id)?c.default.createElement("button",{onClick:this.unlikeSong,className:"songpage-likebutton-liked"},"Liked"):c.default.createElement("button",{onClick:this.likeSong,className:"songpage-likebutton-notliked"},"Like"),i=this.props.likedUsers.length);var s="#"+this.props.song.genre,u=void 0,l=null;null!==this.props.audio.id&&this.props.audio.id===this.props.song.id?(u=c.default.createElement(b.default,{className:"PlayinSongPage",song:this.props.song}),l=c.default.createElement(T.default,{audioFile:this.props.song.track_url,container:"#waveform-songpage",onPosChange:this.handlePosChange,className:"test",pos:this.state.pos,volume:"0",playing:this.state.playing,options:{waveColor:"#ddd",progressColor:"#ff7540",barWidth:2,height:100},ref:function(t){return e.wavesurfer=t}})):(u=c.default.createElement(g.default,{className:"PlayinSongPage",song:this.props.song}),l=c.default.createElement(T.default,{audioFile:this.props.song.track_url,container:"#waveform-songpage",volume:"0",playing:!1,options:{waveColor:"#ddd",progressColor:"#ff7540",barWidth:2,height:100},ref:function(t){return e.wavesurfer=t}}));var f=this.howLongAgo(this.props.song.created_at),p=void 0,h=this.props.song.created_at.slice(0,10);p=new Date(h).toDateString();var m=void 0;return m=this.props.match.params.username&&this.props.match.params.title?c.default.createElement("div",{className:"song-header"},c.default.createElement("div",{className:"song-information"},c.default.createElement("div",{className:"song-info"},c.default.createElement("div",{className:"left"},u,c.default.createElement("div",{className:"infospan"},c.default.createElement("div",{className:"artist"}," ",c.default.createElement("span",{className:"song-header-artist",onClick:this.goToUser},this.props.user.username)),c.default.createElement("div",{className:"title"}," ",c.default.createElement("span",{className:"song-header-title"},this.props.song.title)))),c.default.createElement("div",{className:"right"},c.default.createElement("div",{className:"genre"},c.default.createElement("span",{className:"how-long-ago"},f)),c.default.createElement("div",{className:"time"},c.default.createElement("span",{className:"genre-tag"},s)))),c.default.createElement("div",{className:"waveform",id:"waveform-songpage",onClick:this.handleWaveformClick},l)),c.default.createElement("div",{className:"song-coverart"},c.default.createElement("img",{src:this.props.song.cover_art_url}))):c.default.createElement(d.default,null),c.default.createElement("div",{className:"song-page"},m,c.default.createElement("div",{className:"songpage-utilty-bar"},c.default.createElement("div",{className:"comment-creation-portion"},c.default.createElement("img",{className:"comment-currentuser-avatar",src:this.props.currentUser.avatar_url}),c.default.createElement("input",{type:"text",value:this.state.body,onChange:this.update("body"),onKeyDown:this.handleSubmit,className:"comment-input-songpage",placeholder:"Write a Comment",ref:function(t){return e.commentfield=t}})),c.default.createElement("div",{className:"songpage-user-buttons"},a,this.editbutton,this.deletebutton,c.default.createElement("div",{className:"songpage-counters"},c.default.createElement("div",{className:"songpage-like-count"},i)))),c.default.createElement("div",{className:"rest-of-songpage"},c.default.createElement("div",{className:"left-comment-pane"},c.default.createElement("img",{className:"artist-avatar-songpage",src:this.props.user.avatar_url,onClick:this.goToUser}),c.default.createElement("div",{className:"artist-info-songpage"},c.default.createElement("h3",{className:"artist-info-username",onClick:this.goToUser}," ",this.props.user.username," ",c.default.createElement("img",{className:"verification-badge",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+"})),c.default.createElement("div",{className:"artist-data"},c.default.createElement("ul",{className:"artist-metadata"},c.default.createElement("li",{className:"songpage-artist-followcount-image"},c.default.createElement("img",{className:"follower-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="}),c.default.createElement("div",{className:"after-icon-badge"},o)),c.default.createElement("li",{className:"songpage-artist-songcount-image"}," ",c.default.createElement("img",{className:"track-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"}),c.default.createElement("div",{className:"after-icon-badge"},this.props.user.songnum))),n))),c.default.createElement("div",{className:"comments-songpage"},c.default.createElement("div",{className:"song-date-description"},c.default.createElement("h3",{className:"song-dd-heading"},"Release date:"),c.default.createElement("h4",{className:"song-dd-text"},p),c.default.createElement("h3",{className:"song-dd-heading"},"Description:"),c.default.createElement("h4",{className:"song-dd-text"},this.props.song.description)),c.default.createElement("h3",{className:"comment-count"},c.default.createElement("div",{id:"comment-icon"}),this.props.comments.length," ",1!==this.props.comments.length?"comments":"comment"),c.default.createElement("ul",{className:"comment-list"},t)),c.default.createElement("div",{className:"songpage-sidebar"})))}return null}}]),t}(c.default.Component)),I=function(e,t){return{user:e.users.byUsername[t.match.params.username],song:e.songs.byTitle[t.match.params.title],currentUser:e.session.currentUser,comments:e.comments.allcomments,audio:e.audio,likes:e.likes.alllikes,likedUsers:Object.keys(e.likes.bySongID).join(",").split(",").map(function(e){return parseInt(e)}),follows:e.follows}},M=function(e){return{fetchSongsByUserID:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return e(fetchSongsByUserID(t))}),fetchSongByTitle:function(t){return e((0,m.fetchSongByTitle)(t))},fetchOneUser:function(t){return e((0,f.fetchOneUser)(t))},removeSongs:function(){return e((0,m.removeSongs)())},deleteSong:function(t){return e((0,m.deleteSong)(t))},fetchCommentsBySongID:function(t){return e((0,w.fetchCommentsBySongID)(t))},removeComments:function(){return e((0,w.removeComments)())},createComment:function(t){return e((0,w.createComment)(t))},deleteComment:function(t){return e((0,w.deleteComment)(t))},requestAudioPlaybackTime:function(){return e((0,S.requestAudioPlaybackTime)())},fetchLikesBySongID:function(t){return e((0,x.fetchLikesBySongID)(t))},removeLikes:function(){return e((0,x.removeLikes)())},createLike:function(t){return e((0,x.createLike)(t))},deleteLike:function(t){return e((0,x.deleteLike)(t))},fetchFollowsByUserID:function(t){return e((0,C.fetchFollowsByUserID)(t))},createFollow:function(t){return e((0,C.createFollow)(t))},deleteFollow:function(t){return e((0,C.deleteFollow)(t))},removeFollows:function(){return e((0,C.removeFollows)())},changePlaybackTime:function(t){return e((0,S.changePlaybackTime)(t))}}};t.default=(0,h.connect)(I,M)(N)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fetchOneComment=function(e){return $.ajax({method:"GET",url:"api/comments/"+e})},t.createComment=function(e){return $.ajax({method:"POST",url:"api/comments",data:e})},t.fetchComments=function(){return $.ajax({method:"GET",url:"api/comments"})},t.fetchCommentsBySongID=function(e){return $.ajax({method:"GET",url:"api/comments/songfind/"+e})},t.deleteComment=function(e){return $.ajax({method:"DELETE",url:"api/comments/"+e.id})}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=n(5),c=n(4),f=(n(16),n(9)),p=n(78),d=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.goToSong=n.goToSong.bind(n),n.goToUser=n.goToUser.bind(n),n.deleteComment=n.deleteComment.bind(n),n}return a(t,e),i(t,[{key:"goToSong",value:function(){this.props.history.push("/"+this.username+"/"+this.props.song.title)}},{key:"goToUser",value:function(){this.props.history.push("/"+this.username)}},{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){this.props.fetchOneUserByID(this.props.comment.user_id),this.username=null;this.props.user&&(this.username=this.props.user.username)}},{key:"deleteComment",value:function(){this.props.deleteComment(this.props.comment)}},{key:"render",value:function(){var e=this;return null!==this.props.user&&void 0!==this.props.user?(this.props.user.id!==this.props.currentUser.id&&this.deletebutton&&(this.deletebutton.style.display="none"),u.default.createElement("div",{className:"commentbox",ref:function(t){return e.commentbox=t}},u.default.createElement("div",{className:"comment-item"},u.default.createElement("div",{className:"comment-user-avatar"},u.default.createElement("img",{onClick:this.goToUser,src:this.props.user.avatar_url})),u.default.createElement("div",{className:"comment-info"},u.default.createElement("div",{className:"left-comment"},u.default.createElement("span",{id:"comment-span-author-time"},u.default.createElement("a",null,this.props.user.username)," at ",u.default.createElement("a",null,this.props.comment.comment_time)),u.default.createElement("span",{id:"comment-span-body"},this.props.comment.body)),u.default.createElement("div",{className:"right-comment"},u.default.createElement("span",{id:"comment-timeago"},this.props.timeago),u.default.createElement("button",{id:"comment-delete-button",onClick:this.deleteComment,ref:function(t){return e.deletebutton=t}})))))):u.default.createElement("h1",null,"Hello!")}}]),t}(u.default.Component),h=function(e,t){return{user:e.users.byID[t.comment.user_id],currentUser:e.session.currentUser}},m=function(e){return{fetchOneUserByID:function(t){return e((0,f.fetchOneUserByID)(t))},deleteComment:function(t){return e((0,p.deleteComment)(t))}}};t.default=(0,l.withRouter)((0,c.connect)(h,m)(d))},function(e,t,n){"use strict";function r(e){var t=e&&(_&&e[_]||e[k]);if("function"==typeof t)return t}function o(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function a(e,t){return e&&"object"==typeof e&&null!=e.key?o(e.key):t.toString(36)}function i(e,t,n,o){var s=typeof e;if("undefined"!==s&&"boolean"!==s||(e=null),null===e||"string"===s||"number"===s||"object"===s&&e.$$typeof===m)return n(o,e,""===t?b+a(e,0):t),1;var u,l,c=0,f=""===t?b:t+E;if(Array.isArray(e))for(var p=0;p<e.length;p++)u=e[p],l=f+a(u,p),c+=i(u,l,n,o);else{var d=r(e);if(d){d===e.entries&&(y(w,"Using Maps as children is unsupported and will likely yield unexpected results. Convert it to a sequence/iterable of keyed ReactElements instead."),w=!0);for(var h,v=d.call(e),_=0;!(h=v.next()).done;)u=h.value,l=f+a(u,_++),c+=i(u,l,n,o)}else if("object"===s){var k="";k=" If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.";var C=""+e;g(!1,"Objects are not valid as a React child (found: %s).%s","[object Object]"===C?"object with keys {"+Object.keys(e).join(", ")+"}":C,k)}}return c}function s(e,t,n){return null==e?0:i(e,"",t,n)}function u(e){return(""+e).replace(C,"$&/")}function l(e,t){return h.cloneElement(e,{key:t},void 0!==e.props?e.props.children:void 0)}function c(e,t,n,r){this.result=e,this.keyPrefix=t,this.func=n,this.context=r,this.count=0}function f(e,t,n){var r=e.result,o=e.keyPrefix,a=e.func,i=e.context,s=a.call(i,t,e.count++);Array.isArray(s)?p(s,r,n,v.thatReturnsArgument):null!=s&&(h.isValidElement(s)&&(s=l(s,o+(!s.key||t&&t.key===s.key?"":u(s.key)+"/")+n)),r.push(s))}function p(e,t,n,r,o){var a="";null!=n&&(a=u(n)+"/");var i=c.getPooled(t,a,r,o);s(e,f,i),c.release(i)}function d(e){if("object"!=typeof e||!e||Array.isArray(e))return y(!1,"React.addons.createFragment only accepts a single object. Got: %s",e),e;if(h.isValidElement(e))return y(!1,"React.addons.createFragment does not accept a ReactElement without a wrapper object."),e;g(1!==e.nodeType,"React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.");var t=[];for(var n in e)!N&&O.test(n)&&(y(!1,"React.addons.createFragment(...): Child objects should have non-numeric keys so ordering is preserved."),N=!0),p(e[n],t,n,v.thatReturnsArgument);return t}var h=n(0),m="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,v=n(13),g=n(1),y=n(2),b=".",E=":",w=!1,_="function"==typeof Symbol&&Symbol.iterator,k="@@iterator",C=/\/+/g,S=x,x=function(e){var t=this;if(t.instancePool.length){var n=t.instancePool.pop();return t.call(n,e),n}return new t(e)},P=function(e){var t=this;g(e instanceof t,"Trying to release an instance into a pool of a different type."),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},T=function(e,t,n,r){var o=this;if(o.instancePool.length){var a=o.instancePool.pop();return o.call(a,e,t,n,r),a}return new o(e,t,n,r)};c.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},function(e,t){var n=e;n.instancePool=[],n.getPooled=t||S,n.poolSize||(n.poolSize=10),n.release=P}(c,T);var O=/^\d+$/,N=!1;e.exports=d},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(11),f=n(4),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={title:"",description:"",genre:"",imageFile:null,imageUrl:"",songFile:null,songUrl:null,loading:!1},n.handleSubmit=n.handleSubmit.bind(n),n.updateCoverart=n.updateCoverart.bind(n),n.updateTrack=n.updateTrack.bind(n),n.goBack=n.goBack.bind(n),n.openCoverartUploadBox=n.openCoverartUploadBox.bind(n),n.openSongUploadBox=n.openSongUploadBox.bind(n),n}return i(t,e),s(t,[{key:"updateCoverart",value:function(e){e.preventDefault();var t=e.currentTarget.files[1],n=new FileReader,r=this;n.onloadend=function(){return r.setState({imageFile:t,imageUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"updateTrack",value:function(e){e.preventDefault();var t=e.currentTarget.files[0],n=new FileReader,r=this;n.onloadend=function(){return r.setState({songFile:t,songUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"goBack",value:function(e){e.preventDefault(),console.log("hello"),this.props.history.goBack()}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("song[title]",this.state.title),n.append("song[genre]",this.state.genre),n.append("song[cover_art]",this.state.imageFile),n.append("song[track]",this.state.songFile),n.append("song[description]",this.state.description),this.props.createSong(n).then(function(){return t.props.history.push("/"+t.props.currentUser+"/"+t.state.title)}),this.setState({loading:!0})}},{key:"update",value:function(e){var t=this;return function(n){return t.setState(r({},e,n.currentTarget.value))}}},{key:"openCoverartUploadBox",value:function(){this.imagebutton.click(),this.imagespoofbutton.style.opacity="0.5",this.imagespoofbutton.innerText="Update your Cover Art",this.imagespoofbutton.style.border="1px solid black"}},{key:"openSongUploadBox",value:function(){this.songbutton.click()}},{key:"updateCoverart",value:function(e){e.preventDefault();var t=e.currentTarget.files[0],n=new FileReader,r=this;n.onloadend=function(){return r.setState({imageFile:t,imageUrl:n.result})},t&&n.readAsDataURL(t)}},{key:"render",value:function(){var e=this;if(!0===this.state.loading)return l.default.createElement("div",{className:"loader"},"Loading...");var t=(this.state.title,"invoke-.herokuapp.com/"+this.props.currentUser+"/"+this.state.title);this.state.title;var n=void 0,r=void 0,o=void 0;return n=l.default.createElement("input",{type:"file",onChange:this.updateCoverart,className:"uploadsong-imageselectbutton","data-buttonText":"Upload an image!",ref:function(t){return e.imagebutton=t}}),r=l.default.createElement("img",{className:"uploadsong-imagepreview",src:this.state.imageUrl}),o=l.default.createElement("input",{type:"file",onChange:this.updateTrack,className:"file-upload-input","data-buttonText":"Upload a song!",ref:function(t){return e.songbutton=t}}),null!==this.state.songFile?l.default.createElement("div",{className:"centerer"},l.default.createElement("div",{className:"upload-form-container"},l.default.createElement("div",{className:"upload-div"},l.default.createElement("form",{onSubmit:this.handleSubmit,className:"upload-form-form"},l.default.createElement("div",{className:"form-content"},l.default.createElement("div",{className:"upload-image-section"}," ",n," ",l.default.createElement("button",{className:"spoof-imageupload",ref:function(t){return e.imagespoofbutton=t},onClick:this.openCoverartUploadBox},"Choose your Cover Art")," ",r),l.default.createElement("div",{className:"typing-fields"},l.default.createElement("ul",{className:"upload-list"},l.default.createElement("li",{className:"title"}," Title",l.default.createElement("input",{type:"text",value:this.state.title,onChange:this.update("title"),className:"upload-input",placeholder:"Name your track"})),l.default.createElement("li",{className:"future-url"},t),l.default.createElement("li",{className:"genre"}," Genre",l.default.createElement("input",{type:"text",value:this.state.genre,onChange:this.update("genre"),className:"upload-input",placeholder:"eg:Rock"})),l.default.createElement("li",null," Description",l.default.createElement("textarea",{className:"description",rows:"6",onChange:this.update("description"),placeholder:"Describe your track"}))),l.default.createElement("div",{className:"uploadbuttons"},l.default.createElement("button",{onClick:this.handleSubmit,className:"upload-form-button"},"Save"),l.default.createElement("button",{onClick:this.goBack,className:"backbutton"},"Cancel")))))))):l.default.createElement("div",{className:"upload-file-container"},l.default.createElement("div",{className:"upload-div"},l.default.createElement("h1",{className:"upload-title"},"Upload to Invoke"),o,l.default.createElement("button",{className:"upload-spoof-button",onClick:this.openSongUploadBox},"Choose a file to upload")))}}]),t}(l.default.Component),d=function(e){return{loggedIn:Boolean(e.session.currentUser),currentUser:e.session.currentUser.username}},h=function(e,t){t.location;return{createSong:function(t){return e((0,c.createSong)(t))}}};t.default=(0,f.connect)(d,h)(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(11),p=n(9),d=n(16),h=n(4),m=n(302),v=r(m),g=n(32),y=n(22),b=n(131),E=(r(b),function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.removeSongs(),n.props.clearUsers(),n.props.removeFollows(),n.props.removeLikes(),n.likes=[],n.user,n.checknum=n.checknum.bind(n),n.checkgenre=n.checkgenre.bind(n),n.num=10,n.genre="all",n}return i(t,e),s(t,[{key:"componentDidMount",value:function(){var e=this;this.props.fetchChartSongs(this.num).then(function(t){for(var n=0;n<t.songs.length;n++)!1===Object.keys(e.props.usersbyID).includes([t.songs[n].user_id])&&e.props.fetchOneUserByID(t.songs[n].user_id)}),this.props.fetchLikes()}},{key:"componentWillReceiveProps",value:function(e){}},{key:"componentWillUnmount",value:function(){this.props.removeSongs(),this.props.clearUsers(),this.props.removeFollows(),this.props.removeLikes()}},{key:"checknum",value:function(e){var t=this,n=parseInt(e.target.selectedOptions[0].value);n!==this.num&&(this.num=n,this.props.removeSongs(),this.props.clearUsers(),this.props.removeFollows(),this.props.removeLikes(),this.props.fetchChartSongs(this.num,this.genre).then(function(e){for(var n=0;n<e.songs.length;n++)!1===Object.keys(t.props.usersbyID).includes([e.songs[n].user_id])&&t.props.fetchOneUserByID(e.songs[n].user_id)}),this.props.fetchLikes())}},{key:"checkgenre",value:function(e){var t=this,n=e.target.selectedOptions[0].value;n!==this.genre&&(this.genre=n,this.props.removeSongs(),this.props.clearUsers(),this.props.removeFollows(),this.props.removeLikes(),this.props.fetchChartSongs(this.num,this.genre).then(function(e){for(var n=0;n<e.songs.length;n++)!1===Object.keys(t.props.usersbyID).includes([e.songs[n].user_id])&&t.props.fetchOneUserByID(e.songs[n].user_id)}),this.props.fetchLikes())}},{key:"render",value:function(){var e=this,t=[];return this.props.likes.length>0&&(t=this.props.likes),this.props.allusers.length>=this.props.allsongs.length?l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/stream"},"Stream")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/charts"},"Charts")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/discover"},"Discover"))))),l.default.createElement("section",{className:"songindexlist"},l.default.createElement("div",{className:"chart-select-buttons"},l.default.createElement("select",{className:"chart-number-select",onChange:this.checknum},l.default.createElement("option",{value:"5"},"Top 5"),l.default.createElement("option",{selected:"selected",value:"10"},"Top 10"),l.default.createElement("option",{value:"20"},"Top 20")),l.default.createElement("select",{className:"chart-genre-select",onChange:this.checkgenre},l.default.createElement("option",{selected:"selected",value:"all"},"All Music Genres"),l.default.createElement("option",{value:"Rock"},"Rock"),l.default.createElement("option",{value:"Indie"},"Indie"),l.default.createElement("option",{value:"Hip Hop"},"Hip Hop")),l.default.createElement("select",{className:"chart-region-select"},l.default.createElement("option",{selected:"selected"},"World"))),l.default.createElement("h2",{className:"streamheader",id:"streamheader-chart"},"The most played tracks on Invoke of all time: "),l.default.createElement("div",{className:"chart-header"},l.default.createElement("div",{className:"chart-header-hash"},"#"),l.default.createElement("div",{className:"chart-header-track"},"Track"),l.default.createElement("div",{className:"chart-header-playnum"},"Plays (All time)")),l.default.createElement("ul",null,this.props.allsongs.slice(0,this.num).map(function(n,r){return l.default.createElement("li",{key:"song_"+n.id,className:"indexlist",id:"chartlist-li"},l.default.createElement("div",{className:"chart-rank"},r+1),l.default.createElement(v.default,{likes:t.filter(function(e){return e.song_id===n.id}),waveformid:n.id,song:n,user:e.props.usersbyID[n.user_id]}))})))):l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/stream"},"Stream")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/charts"},"Charts")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/discover"},"Discover"))))),l.default.createElement("section",{className:"songindexlist"},l.default.createElement("div",{className:"chart-select-buttons"},l.default.createElement("select",{className:"chart-number-select"},l.default.createElement("option",null,"Top 5"),l.default.createElement("option",{selected:"selected"},"Top 10"),l.default.createElement("option",null,"Top 20")),l.default.createElement("select",{className:"chart-genre-select"},l.default.createElement("option",{selected:"selected"},"All Music Genres"),l.default.createElement("option",null,"Rock"),l.default.createElement("option",null,"Indie"),l.default.createElement("option",null,"Hip Hop")),l.default.createElement("select",{className:"chart-region-select"},l.default.createElement("option",{selected:"selected"},"World"))),l.default.createElement("h2",{className:"streamheader",id:"streamheader-chart"},"The most played tracks on Invoke of all time: "),l.default.createElement("div",{className:"chart-header"},l.default.createElement("div",{className:"chart-header-hash"},"#"),l.default.createElement("div",{className:"chart-header-track"},"Track"),l.default.createElement("div",{className:"chart-header-playnum"},"Plays (All time)")),l.default.createElement("div",{className:"loader"},"Loading...")))}}]),t}(l.default.Component)),w=function(e){return{byUsername:e.songs.byUsername,allsongs:e.songs.allsongs,usersbyID:e.users.byID,audio:e.audio,likes:e.likes.alllikes,currentUser:e.session.currentUser,newFollows:e.follows.newFollows,allusers:e.users.allusers}},_=function(e){return{fetchChartSongs:function(t,n){return e((0,f.fetchChartSongs)(t,n))},removeSongs:function(){return e((0,f.removeSongs)())},fetchUsers:function(){return e((0,p.fetchUsers)())},clearUsers:function(){return e((0,p.clearUsers)())},removeAudioToken:function(){return e((0,d.removeAudioToken)())},fetchLikes:function(){return e((0,g.fetchLikes)())},removeLikes:function(){return e((0,g.removeLikes)())},fetchCurrentUserFollows:function(){return e((0,y.fetchCurrentUserFollows)())},removeFollows:function(){return e((0,y.removeFollows)())},fetchSongsByUserID:function(t){return e((0,f.fetchSongsByUserID)(t))},fetchOneUserByID:function(t){return e((0,p.fetchOneUserByID)(t))}}};t.default=(0,h.connect)(w,_)(E)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(4),p=n(16),d=n(9),h=n(30),m=r(h),v=n(31),g=r(v),y=n(32),b=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=n.handleClick.bind(n),n.goToSong=n.goToSong.bind(n),n.goToUser=n.goToUser.bind(n),n.likeSong=n.likeSong.bind(n),n.unlikeSong=n.unlikeSong.bind(n),n}return i(t,e),s(t,[{key:"handleClick",value:function(){if(this.props.user){var e="/"+username+"/"+this.props.song.title;this.props.history.push(e)}}},{key:"likeSong",value:function(e){e.preventDefault(),this.props.createLike({like:{song_id:this.props.song.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"unlikeSong",value:function(e){e.preventDefault(),this.props.deleteLike({like:{song_id:this.props.song.id}}),"PLAYING"===this.props.audio.token&&this.props.requestAudioPlaybackTime()}},{key:"goToSong",value:function(){this.props.history.push("/"+this.props.user.username+"/"+this.props.song.title)}},{key:"goToUser",value:function(){this.props.history.push("/"+this.props.user.username)}},{key:"componentWillUnmount",value:function(){this.props.song.id===this.props.audio.id&&this.props.requestAudioPlaybackTime()}},{key:"componentDidMount",value:function(){this.props.audio.id===this.props.song.id&&this.props.requestAudioPlaybackTime()}},{key:"render",value:function(){var e=new Date(""+this.props.song.created_at),t=new Date,n=Math.abs(t.getTime()-e.getTime()),r=Math.abs(n/864e5);if(r<1);else if(r<2);else{r=Math.floor(r)}var o=(this.props.song.genre,void 0);o=this.props.audio.id===this.props.song.id?l.default.createElement(g.default,{song:this.props.song,playstate:this.props.audio.token}):l.default.createElement(m.default,{song:this.props.song});var a=void 0,i=this.props.likes.map(function(e){return e.user_id});this.props.likes.length;if(a=i.includes(this.props.currentUser.id)?l.default.createElement("button",{onClick:this.unlikeSong,className:"songpage-likebutton-liked"}):l.default.createElement("button",{onClick:this.likeSong,className:"songpage-likebutton-notliked"}),null!==this.props.user||void 0!==this.props.user)return l.default.createElement("div",{className:"songplaybox-chart"},l.default.createElement("div",{className:"songplay-item-chart"},l.default.createElement("div",{className:"songplay-coverart-chart"},l.default.createElement("img",{onClick:this.goToSong,src:this.props.song.cover_art_url})),l.default.createElement("div",{className:"songplay-song-chart"},l.default.createElement("div",{className:"songplay-song-information"},l.default.createElement("div",{className:"songplay-left-chart"},l.default.createElement("div",{className:"infospan-chart"},l.default.createElement("div",{className:"songplay-artist-chart"}," ",l.default.createElement("span",{className:"songplay-span-artist",onClick:this.goToUser},this.props.user.username)),l.default.createElement("div",{className:"songplay-title-chart"}," ",l.default.createElement("span",{className:"songplay-span-title",onClick:this.goToSong},this.props.song.title)))),l.default.createElement("div",{className:"songplay-right-chart"},l.default.createElement("img",{className:"stat-icon-playcontainer-chart",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfcGxheSA0PC90aXRsZT48cGF0aCBkPSJNNCAxM1YzbDkgNS05IDV6IiBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="}),l.default.createElement("span",{className:"container-playcount-chart"},this.props.song.playcount))),l.default.createElement("div",{className:"songplay-buttonbar-chart"},o,a))))}}]),t}(l.default.Component),E=function(e,t){return{user:e.users.byID[t.song.user_id],audio:e.audio,currentUser:e.session.currentUser}},w=function(e){return{receiveAudio:function(t){return e((0,p.receiveAudio)(t))},removeAudio:function(t){return e((0,p.removeAudio)(t))},fetchOneUserByID:function(t){return e((0,d.fetchOneUserByID)(t))},changePlaybackTime:function(t){return e((0,p.changePlaybackTime)(t))},requestAudioPlaybackTime:function(){return e((0,p.requestAudioPlaybackTime)())},fetchLikesBySongID:function(t){return e((0,y.fetchLikesBySongID)(t))},removeLikes:function(){return e((0,y.removeLikes)())},createLike:function(t){return e((0,y.createLike)(t))},deleteLike:function(t){return e((0,y.deleteLike)(t))}}};t.default=(0,c.withRouter)((0,f.connect)(E,w)(b))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(4),p=n(11),d=n(9),h=n(76),m=r(h),v=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.query=n.props.location.search.slice(3),n.state={users:[],songs:[],nosongs:!1,nousers:!1},n.props.searchSongs(n.query).then(function(e){n.setState({songs:e.songs}),0===e.songs.length?n.setState({nosongs:!0}):n.setState({nosongs:!1});for(var t=0;t<n.props.allsongs.length;t++)n.props.fetchOneUserByID(n.props.allsongs[t].user_id)}),n.props.searchUsers(n.query).then(function(e){0===e.users.length?n.setState({nousers:!0}):n.setState({nousers:!1}),n.setState({users:e.users})}),n}return i(t,e),s(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.query=e.location.search.slice(3),e.location.search!==this.props.location.search&&(this.setState({nosongs:!1}),this.props.removeSongs(),this.props.clearUsers(),this.query=e.location.search.slice(3),this.props.searchSongs(this.query).then(function(e){0===e.songs.length?t.setState({nosongs:!0}):t.setState({nosongs:!1}),t.setState({songs:e.songs});for(var n=0;n<t.props.allsongs.length;n++)t.props.fetchOneUserByID(t.props.allsongs[n].user_id)}),this.props.searchUsers(this.query).then(function(e){0===e.users.length?t.setState({nousers:!0}):t.setState({nousers:!1}),t.setState({users:e.users})}))}},{key:"componentWillUnmount",value:function(){this.props.removeSongs(),this.props.clearUsers()}},{key:"render",value:function(){var e=this,t=void 0,n=void 0;return this.props.location.pathname.includes("people")?($(".search-people-span").addClass("active"),$(".search-tracks-span").removeClass("active"),$(".search-everything-span").removeClass("active")):this.props.location.pathname.includes("tracks")?($(".search-tracks-span").addClass("active"),$(".search-people-span").removeClass("active"),$(".search-everything-span").removeClass("active")):($(".search-everything-span").addClass("active"),$(".search-people-span").removeClass("active"),$(".search-tracks-span").removeClass("active")),this.props.location.pathname.includes("people")?(n=null,!1===this.state.nousers&&(t=this.state.users.map(function(t){return l.default.createElement("li",{className:"search-user-li"},l.default.createElement("div",{className:"search-user-topdiv"},l.default.createElement("img",{src:t.avatar_url,className:"user-search-image",onClick:function(){return e.props.history.push("/"+t.username)}}),l.default.createElement("div",{className:"user-search-user-info"},l.default.createElement("h3",{onClick:function(){return e.props.history.push("/"+t.username)}},t.username,l.default.createElement("img",{className:"verification-badge",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+"})),l.default.createElement("ul",{className:"artist-metadata"},l.default.createElement("li",{className:"songpage-artist-followcount-image"},l.default.createElement("img",{className:"follower-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="}),l.default.createElement("div",{className:"after-icon-badge"},t.followernum)),l.default.createElement("li",{className:"songpage-artist-songcount-image"}," ",l.default.createElement("img",{className:"track-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"}),l.default.createElement("div",{className:"after-icon-badge"},t.songnum))))))}))):this.props.location.pathname.includes("tracks")?(t=null,this.state.nosongs||(n=this.state.songs.map(function(t){return l.default.createElement("li",{className:"search-song-li"},l.default.createElement(m.default,{song:t,likes:e.props.alllikes.filter(function(e){return e.song_id===t.id}),waveformid:t.id}))}))):(this.state.nosongs||(n=this.state.songs.map(function(t){return l.default.createElement("li",{className:"search-song-li"},l.default.createElement(m.default,{song:t,likes:e.props.alllikes.filter(function(e){return e.song_id===t.id}),waveformid:t.id}))})),!1===this.state.nousers&&(t=this.state.users.map(function(t){return l.default.createElement("li",{className:"search-user-li"},l.default.createElement("div",{className:"search-user-topdiv"},l.default.createElement("img",{src:t.avatar_url,className:"user-search-image"}),l.default.createElement("div",{className:"user-search-user-info"},l.default.createElement("h3",{onClick:function(){return e.props.history.push("/"+t.username)}},t.username,l.default.createElement("img",{className:"verification-badge",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UHJvIFN0YXI8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTYgMTJBNiA2IDAgMSAwIDYgMGE2IDYgMCAwIDAgMCAxMnoiIGZpbGw9IiNGNTAiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNiA4LjA3TDMuMzU1IDkuNjRsLjY3Ni0zLTIuMzEtMi4wMyAzLjA2Mi0uMjg1TDYgMS41bDEuMjE3IDIuODI1IDMuMDYzLjI4NC0yLjMxMSAyLjAzLjY3NiAzLjAwMnoiLz48L2c+PC9zdmc+"})),l.default.createElement("ul",{className:"artist-metadata"},l.default.createElement("li",{className:"songpage-artist-followcount-image"},l.default.createElement("img",{className:"follower-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0icmdiYSgxNTMsIDE1MywgMTUzLCAwLjcpIiBkPSJNMTguNCAxOC41bDIuNSA1IC4yLjVIMjhsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTE3LjUgMTlsLTUtMS44di0zYzEuNC0xLjIgMi0zLjggMi01LjkgMC0yLjQtMi4zLTQuMy00LTQuMy0xLjcgMC00IDEuOC00IDQuMyAwIDIuMi42IDQuNyAyIDUuOXYzbC01IDEuOEwxIDI0aDE5bC0yLjUtNXoiLz48L3N2Zz4="}),l.default.createElement("div",{className:"after-icon-badge"},t.followernum)),l.default.createElement("li",{className:"songpage-artist-songcount-image"}," ",l.default.createElement("img",{className:"track-icon",src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"}),l.default.createElement("div",{className:"after-icon-badge"},t.songnum))))))}))),this.state.songs.length>0&&Object.keys(this.props.usersbyID).includes(""+this.state.songs[this.state.songs.length-1].user_id)||!0===this.state.nosongs?l.default.createElement("div",{className:"searchpage"},l.default.createElement("h1",{className:"searchpage-header"},'Search results for "',this.query,'"'),l.default.createElement("div",{className:"search-leftpane"},l.default.createElement("ul",{className:"search-leftpane-options"},l.default.createElement("li",{className:"search-leftpane-options-li"},l.default.createElement("a",{className:"search-everything-span",href:"/#/search"+this.props.location.search}," Everything ")),l.default.createElement("li",{className:"search-leftpane-options-li"},l.default.createElement("a",{className:"search-tracks-span",href:"/#/search/tracks"+this.props.location.search},"Tracks")," "),l.default.createElement("li",{className:"search-leftpane-options-li"},l.default.createElement("a",{className:"search-people-span",href:"/#/search/people"+this.props.location.search},"People")," "))),l.default.createElement("div",{className:"search-actual"},l.default.createElement("ul",{className:"searched-users"},t),l.default.createElement("ul",{className:"searched-songs"},n))):l.default.createElement("div",{className:"loader"},"Loading...")}}]),t}(l.default.Component),g=function(e){return{currentUser:e.session.currentUser,allsongs:e.songs.allsongs,allusers:e.users.allusers,alllikes:e.likes.alllikes,usersbyID:e.users.byID}},y=function(e){return{fetchSongs:function(){return e((0,p.fetchSongs)())},removeSongs:function(){return e((0,p.removeSongs)())},fetchAllUsers:function(){return e((0,d.fetchAllUsers)())},clearUsers:function(){return e((0,d.clearUsers)())},removeAudioToken:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(removeAudioToken())}),searchUsers:function(t){return e((0,d.searchUsers)(t))},searchSongs:function(t){return e((0,p.searchSongs)(t))},fetchOneUserByID:function(t){return e((0,d.fetchOneUserByID)(t))}}};t.default=(0,c.withRouter)((0,f.connect)(g,y)(v))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(11),p=n(4),d=n(30),h=r(d),m=n(31),v=r(m),g=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.fetchLikedSongs(),n}return i(t,e),s(t,[{key:"componentWillUnmount",value:function(){this.props.removeSongs()}},{key:"render",value:function(){var e=this;if(this.props.allsongs.length>0){var t=Object.values(this.props.SongsbyID).map(function(t){var n=void 0;return n=e.props.audio.id===t.id?l.default.createElement(v.default,{song:t,playstate:e.props.audio.token}):l.default.createElement(h.default,{song:t}),l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("img",{className:"likepage-song-item-coverart",src:t.cover_art_url,onClick:function(){return e.props.history.push("/"+t.user.username+"/"+t.title)}}),n),l.default.createElement("div",{className:"likepage-song-item-title",onClick:function(){return e.props.history.push("/"+t.user.username+"/"+t.title)}}," ",l.default.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",className:"likepage-like-heart"})," ",l.default.createElement("span",null,t.title)),l.default.createElement("div",{className:"likepage-song-item-artist",onClick:function(){return e.props.history.push("/"+t.user.username)}},t.user.username))});return l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/collection"},"Overview")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/likes"},"Likes")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/sets"},"Playlists")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/following"},"Following"))))),l.default.createElement("section",{className:"likepage"},l.default.createElement("h2",{className:"streamheader shift-header"},"Hear the tracks you've liked: "),l.default.createElement("ul",{className:"likepage-ul"},t)))}return l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/collection"},"Overview")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/likes"},"Likes")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/sets"},"Playlists")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/following"},"Following"))))),l.default.createElement("section",{className:"likepage"},l.default.createElement("h2",{className:"streamheader"},"Hear the tracks you've liked: ")))}}]),t}(l.default.Component),y=function(e,t){return{currentUser:e.session.currentUser,audio:e.audio,allsongs:e.songs.allsongs,SongsbyID:e.songs.byID}},b=function(e){return{fetchLikedSongs:function(){return e((0,f.fetchLikedSongs)())},removeSongs:function(){return e((0,f.removeSongs)())}}};t.default=(0,p.connect)(y,b)(g)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(11),p=n(4),d=n(30),h=r(d),m=n(31),v=r(m),g=n(50),y=n(22),b=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.fetchLikedSongs(),n.props.fetchPlaylistsByUserID(n.props.currentUser.id),n.props.fetchCurrentUserFollows(),n.createBoxes=n.createBoxes.bind(n),n}return i(t,e),s(t,[{key:"componentWillUnmount",value:function(){this.props.removeSongs(),this.props.removePlaylists(),this.props.removeFollows()}},{key:"createBoxes",value:function(e,t){var n=void 0;if(0===e)n=6;else{if(e%6==0)return;n=6-e%6}for(var r=[],o=0;o<n;o++)r.push(l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("div",{className:"useless-grey-box"}))));return r}},{key:"render",value:function(){var e=this,t=void 0;if(this.props.allsongs.length>0){var n=Object.values(this.props.SongsbyID).map(function(t){var n=void 0;return n=e.props.audio.id===t.id?l.default.createElement(v.default,{song:t,playstate:e.props.audio.token}):l.default.createElement(h.default,{song:t}),l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("img",{className:"likepage-song-item-coverart",src:t.cover_art_url,onClick:function(){return e.props.history.push("/"+t.user.username+"/"+t.title)}}),n),l.default.createElement("div",{className:"likepage-song-item-title",onClick:function(){return e.props.history.push("/"+t.user.username+"/"+t.title)}}," ",l.default.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",className:"likepage-like-heart"})," ",l.default.createElement("span",null,t.title)),l.default.createElement("div",{className:"likepage-song-item-artist",onClick:function(){return e.props.history.push("/"+t.user.username)}},t.user.username))});t=l.default.createElement("section",{className:"likepage"},l.default.createElement("ul",{className:"likepage-ul"},n.concat(this.createBoxes(n.length,"like"))))}else{var r=[];t=l.default.createElement("section",{className:"likepage"},l.default.createElement("ul",{className:"likepage-ul"},r.concat(this.createBoxes(r.length,"like"))))}var o=void 0;if(this.props.allplaylists.length>0){var a=Object.values(this.props.PlaylistsbyID).map(function(t){return l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("img",{className:"likepage-song-item-coverart",src:t.playlist_songs[0]?t.playlist_songs[0].cover_art_url:t.user.avatar_url})),l.default.createElement("div",{className:"likepage-song-item-title"}," ",l.default.createElement("span",null,t.title)),l.default.createElement("div",{className:"likepage-song-item-artist",onClick:function(){return e.props.history.push("/"+t.user.username)}},t.user.username))});o=l.default.createElement("section",{className:"likepage"},l.default.createElement("ul",{className:"likepage-ul"},a.concat(this.createBoxes(a.length,"playlist"))))}else{var i=[];o=l.default.createElement("section",{className:"likepage"},l.default.createElement("ul",{className:"likepage-ul"},i.concat(this.createBoxes(i.length,"playlist"))))}var s=void 0;if(this.props.allfollows.length>0){var u=Object.values(this.props.byFolloweeID).map(function(t){return l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("img",{className:"likepage-song-item-coverart",src:t.followee.avatar_url,onClick:function(){return e.props.history.push("/"+t.followee.username)}})),l.default.createElement("div",{className:"likepage-song-item-title",onClick:function(){return e.props.history.push("/"+t.followee.username)}}," ",l.default.createElement("span",null,t.followee.username)))});s=l.default.createElement("section",{className:"likepage followingpage"},l.default.createElement("ul",{className:"likepage-ul"},u.concat(this.createBoxes(u.length,"follow"))))}else{var f=[];s=l.default.createElement("section",{className:"likepage followingpage"},l.default.createElement("ul",{className:"likepage-ul"},f.concat(this.createBoxes(f.length,"follow"))))}return l.default.createElement("div",{className:"collection index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/collection"},"Overview")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/likes"},"Likes")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/sets"},"Playlists")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/following"},"Following"))))),l.default.createElement("div",{className:"collection-likes"},l.default.createElement("div",{className:"collection-subheading-div"},l.default.createElement("h2",{className:"collection-subheading"},"Likes")),t),l.default.createElement("div",{className:"collection-playlists"},l.default.createElement("div",{className:"collection-subheading-div"},l.default.createElement("h2",{className:"collection-subheading"},"Playlists")),o),l.default.createElement("div",{className:"collection-following"},l.default.createElement("div",{className:"collection-subheading-div"},l.default.createElement("h2",{className:"collection-subheading"},"Following")),s))}}]),t}(l.default.Component),E=function(e,t){return{currentUser:e.session.currentUser,audio:e.audio,allsongs:e.songs.allsongs,SongsbyID:e.songs.byID,PlaylistsbyID:e.playlists.byID,allplaylists:e.playlists.allplaylists,allfollows:e.follows.allfollows,byFolloweeID:e.follows.byFolloweeID}},w=function(e){return{fetchLikedSongs:function(){return e((0,f.fetchLikedSongs)())},removeSongs:function(){return e((0,f.removeSongs)())},fetchPlaylistsByUserID:function(t){return e((0,g.fetchPlaylistsByUserID)(t))},removePlaylists:function(){return e((0,g.removePlaylists)())},fetchCurrentUserFollows:function(){return e((0,y.fetchCurrentUserFollows)())},removeFollows:function(){return e((0,y.removeFollows)())}}};t.default=(0,p.connect)(E,w)(b)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=r(u),c=n(5),f=n(4),p=n(30),d=(r(p),n(31)),h=(r(d),n(50)),m=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.fetchPlaylistsByUserID(n.props.currentUser.id),n.createBoxes=n.createBoxes.bind(n),n}return i(t,e),s(t,[{key:"componentWillUnmount",value:function(){this.props.removePlaylists()}},{key:"createBoxes",value:function(e){if(e%6!=0){for(var t=6-e%6,n=[],r=0;r<t;r++)n.push(l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("div",{className:"useless-grey-box"}))));return n}}},{key:"render",value:function(){var e=this,t=void 0;if(this.props.allplaylists.length>0){var n=Object.values(this.props.PlaylistsbyID).map(function(t){return l.default.createElement("li",{className:"likepage-song-item-li"},l.default.createElement("div",{className:"likepage-song-item-coverart-div"},l.default.createElement("img",{className:"likepage-song-item-coverart",src:t.playlist_songs[0]?t.playlist_songs[0].cover_art_url:t.user.avatar_url})),l.default.createElement("div",{className:"likepage-song-item-title"}," ",l.default.createElement("span",null,t.title)),l.default.createElement("div",{className:"likepage-song-item-artist",onClick:function(){return e.props.history.push("/"+t.user.username)}},t.user.username))});t=l.default.createElement("section",{className:"likepage"},l.default.createElement("ul",{className:"likepage-ul"},n.concat(this.createBoxes(n.length))))}return l.default.createElement("div",{className:"index"},l.default.createElement("div",{className:"Homepagenavdiv"},l.default.createElement("nav",{className:"homepage-nav"},l.default.createElement("ul",{className:"homepage-nav-list"},l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/collection"},"Overview")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/likes"},"Likes")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/sets"},"Playlists")),l.default.createElement("li",{className:"flexfoo"},l.default.createElement(c.NavLink,{to:"/you/following"},"Following"))))),l.default.createElement("section",{className:"likepage"},l.default.createElement("h2",{className:"streamheader shift-header"},"Playlists you have created: "),t))}}]),t}(l.default.Component),v=function(e,t){return{currentUser:e.session.currentUser,audio:e.audio,allsongs:e.songs.allsongs,SongsbyID:e.songs.byID,PlaylistsbyID:e.playlists.byID,allplaylists:e.playlists.allplaylists}},g=function(e){return{fetchLikedSongs:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(fetchLikedSongs())}),removeSongs:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){return e(removeSongs())}),fetchPlaylistsByUserID:function(t){return e((0,h.fetchPlaylistsByUserID)(t))},removePlaylists:function(){return e((0,h.removePlaylists)())}}};t.default=(0,f.connect)(v,g)(m)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),l=n(5),c=n(22),f=n(4),p=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.props.fetchCurrentUserFollows(),n}return a(t,e),i(t,[{key:"componentWillUnmount",value:function(){this.props.removeFollows()}},{key:"render",value:function(){var e=this;if(this.props.allfollows.length>0){var t=Object.values(this.props.byFolloweeID).map(function(t){return u.default.createElement("li",{className:"likepage-song-item-li"},u.default.createElement("div",{className:"likepage-song-item-coverart-div"},u.default.createElement("img",{className:"likepage-song-item-coverart",src:t.followee.avatar_url,onClick:function(){return e.props.history.push("/"+t.followee.username)}})),u.default.createElement("div",{className:"likepage-song-item-title",onClick:function(){return e.props.history.push("/"+t.followee.username)}}," ",u.default.createElement("span",null,t.followee.username)))});return u.default.createElement("div",{className:"index"},u.default.createElement("div",{className:"Homepagenavdiv"},u.default.createElement("nav",{className:"homepage-nav"},u.default.createElement("ul",{className:"homepage-nav-list"},u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/collection"},"Overview")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/likes"},"Likes")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/sets"},"Playlists")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/following"},"Following"))))),u.default.createElement("section",{className:"likepage followingpage"},u.default.createElement("h2",{className:"streamheader shift-header"},"Hear what the people you follow have posted"),u.default.createElement("ul",{className:"likepage-ul"},t)))}return u.default.createElement("div",{className:"index"},u.default.createElement("div",{className:"Homepagenavdiv"},u.default.createElement("nav",{className:"homepage-nav"},u.default.createElement("ul",{className:"homepage-nav-list"},u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/collection"},"Overview")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/likes"},"Likes")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/sets"},"Playlists")),u.default.createElement("li",{className:"flexfoo"},u.default.createElement(l.NavLink,{to:"/you/following"},"Following"))))),u.default.createElement("section",{className:"likepage followingpage"},u.default.createElement("h2",{className:"streamheader"},"Hear what the people you follow have posted: ")))}}]),t}(u.default.Component),d=function(e,t){return{currentUser:e.session.currentUser,allfollows:e.follows.allfollows,byFolloweeID:e.follows.byFolloweeID}},h=function(e){return{fetchCurrentUserFollows:function(){return e((0,c.fetchCurrentUserFollows)())},removeFollows:function(){return e((0,c.removeFollows)())}}};t.default=(0,f.connect)(d,h)(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(69),a=n(309),i=r(a),s=(n(310),n(311)),u=r(s),l=[i.default],c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.createStore)(u.default,e,o.applyMiddleware.apply(void 0,l))};t.default=c},function(e,t,n){"use strict";function r(e){return function(t){var n=t.dispatch,r=t.getState;return function(t){return function(o){return"function"==typeof o?o(n,r,e):t(o)}}}}t.__esModule=!0;var o=r();o.withExtraArgument=r,t.default=o},function(e,t,n){(function(e){!function(e,n){n(t)}(0,function(t){"use strict";function n(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,n){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function a(e,t){a.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function s(e,t,n){s.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function u(e,t,n){var r=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,r),e}function l(e){var t=void 0===e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function c(e,t,n,r,f,p,d){f=f||[],d=d||[];var h=f.slice(0);if(void 0!==p){if(r){if("function"==typeof r&&r(h,p))return;if("object"===(void 0===r?"undefined":N(r))){if(r.prefilter&&r.prefilter(h,p))return;if(r.normalize){var m=r.normalize(h,p,e,t);m&&(e=m[0],t=m[1])}}}h.push(p)}"regexp"===l(e)&&"regexp"===l(t)&&(e=e.toString(),t=t.toString());var v=void 0===e?"undefined":N(e),g=void 0===t?"undefined":N(t),y="undefined"!==v||d&&d[d.length-1].lhs&&d[d.length-1].lhs.hasOwnProperty(p),b="undefined"!==g||d&&d[d.length-1].rhs&&d[d.length-1].rhs.hasOwnProperty(p);if(!y&&b)n(new a(h,t));else if(!b&&y)n(new i(h,e));else if(l(e)!==l(t))n(new o(h,e,t));else if("date"===l(e)&&e-t!=0)n(new o(h,e,t));else if("object"===v&&null!==e&&null!==t)if(d.filter(function(t){return t.lhs===e}).length)e!==t&&n(new o(h,e,t));else{if(d.push({lhs:e,rhs:t}),Array.isArray(e)){var E;for(e.length,E=0;E<e.length;E++)E>=t.length?n(new s(h,E,new i(void 0,e[E]))):c(e[E],t[E],n,r,h,E,d);for(;E<t.length;)n(new s(h,E,new a(void 0,t[E++])))}else{var w=Object.keys(e),_=Object.keys(t);w.forEach(function(o,a){var i=_.indexOf(o);i>=0?(c(e[o],t[o],n,r,h,o,d),_=u(_,i)):c(e[o],void 0,n,r,h,o,d)}),_.forEach(function(e){c(void 0,t[e],n,r,h,e,d)})}d.length=d.length-1}else e!==t&&("number"===v&&isNaN(e)&&isNaN(t)||n(new o(h,e,t)))}function f(e,t,n,r){return r=r||[],c(e,t,function(e){e&&r.push(e)},n),r.length?r:void 0}function p(e,t,n){if(n.path&&n.path.length){var r,o=e[t],a=n.path.length-1;for(r=0;r<a;r++)o=o[n.path[r]];switch(n.kind){case"A":p(o[n.path[r]],n.index,n.item);break;case"D":delete o[n.path[r]];break;case"E":case"N":o[n.path[r]]=n.rhs}}else switch(n.kind){case"A":p(e[t],n.index,n.item);break;case"D":e=u(e,t);break;case"E":case"N":e[t]=n.rhs}return e}function d(e,t,n){if(e&&t&&n&&n.kind){for(var r=e,o=-1,a=n.path?n.path.length-1:0;++o<a;)void 0===r[n.path[o]]&&(r[n.path[o]]="number"==typeof n.path[o]?[]:{}),r=r[n.path[o]];switch(n.kind){case"A":p(n.path?r[n.path[o]]:r,n.index,n.item);break;case"D":delete r[n.path[o]];break;case"E":case"N":r[n.path[o]]=n.rhs}}}function h(e,t,n){if(n.path&&n.path.length){var r,o=e[t],a=n.path.length-1;for(r=0;r<a;r++)o=o[n.path[r]];switch(n.kind){case"A":h(o[n.path[r]],n.index,n.item);break;case"D":case"E":o[n.path[r]]=n.lhs;break;case"N":delete o[n.path[r]]}}else switch(n.kind){case"A":h(e[t],n.index,n.item);break;case"D":case"E":e[t]=n.lhs;break;case"N":e=u(e,t)}return e}function m(e,t,n){if(e&&t&&n&&n.kind){var r,o,a=e;for(o=n.path.length-1,r=0;r<o;r++)void 0===a[n.path[r]]&&(a[n.path[r]]={}),a=a[n.path[r]];switch(n.kind){case"A":h(a[n.path[r]],n.index,n.item);break;case"D":case"E":a[n.path[r]]=n.lhs;break;case"N":delete a[n.path[r]]}}}function v(e,t,n){if(e&&t){c(e,t,function(r){n&&!n(e,t,r)||d(e,t,r)})}}function g(e){return"color: "+D[e].color+"; font-weight: bold"}function y(e){var t=e.kind,n=e.path,r=e.lhs,o=e.rhs,a=e.index,i=e.item;switch(t){case"E":return[n.join("."),r,"→",o];case"N":return[n.join("."),o];case"D":return[n.join(".")];case"A":return[n.join(".")+"["+a+"]",i];default:return[]}}function b(e,t,n,r){var o=f(e,t);try{r?n.groupCollapsed("diff"):n.group("diff")}catch(e){n.log("diff")}o?o.forEach(function(e){var t=e.kind,r=y(e);n.log.apply(n,["%c "+D[t].text,g(t)].concat(I(r)))}):n.log("—— no diff ——");try{n.groupEnd()}catch(e){n.log("—— diff end —— ")}}function E(e,t,n,r){switch(void 0===e?"undefined":N(e)){case"object":return"function"==typeof e[r]?e[r].apply(e,I(n)):e[r];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,n=e.duration;return function(e,r,o){var a=["action"];return a.push("%c"+String(e.type)),t&&a.push("%c@ "+r),n&&a.push("%c(in "+o.toFixed(2)+" ms)"),a.join(" ")}}function _(e,t){var n=t.logger,r=t.actionTransformer,o=t.titleFormatter,a=void 0===o?w(t):o,i=t.collapsed,s=t.colors,u=t.level,l=t.diff,c=void 0===t.titleFormatter;e.forEach(function(o,f){var p=o.started,d=o.startedTime,h=o.action,m=o.prevState,v=o.error,g=o.took,y=o.nextState,w=e[f+1];w&&(y=w.prevState,g=w.started-p);var _=r(h),k="function"==typeof i?i(function(){return y},h,o):i,C=T(d),S=s.title?"color: "+s.title(_)+";":"",x=["color: gray; font-weight: lighter;"];x.push(S),t.timestamp&&x.push("color: gray; font-weight: lighter;"),t.duration&&x.push("color: gray; font-weight: lighter;");var P=a(_,C,g);try{k?s.title&&c?n.groupCollapsed.apply(n,["%c "+P].concat(x)):n.groupCollapsed(P):s.title&&c?n.group.apply(n,["%c "+P].concat(x)):n.group(P)}catch(e){n.log(P)}var O=E(u,_,[m],"prevState"),N=E(u,_,[_],"action"),I=E(u,_,[v,m],"error"),M=E(u,_,[y],"nextState");if(O)if(s.prevState){var D="color: "+s.prevState(m)+"; font-weight: bold";n[O]("%c prev state",D,m)}else n[O]("prev state",m);if(N)if(s.action){var A="color: "+s.action(_)+"; font-weight: bold";n[N]("%c action    ",A,_)}else n[N]("action    ",_);if(v&&I)if(s.error){var R="color: "+s.error(v,m)+"; font-weight: bold;";n[I]("%c error     ",R,v)}else n[I]("error     ",v);if(M)if(s.nextState){var j="color: "+s.nextState(y)+"; font-weight: bold";n[M]("%c next state",j,y)}else n[M]("next state",y);l&&b(m,y,n,k);try{n.groupEnd()}catch(e){n.log("—— log end ——")}})}function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},A,e),n=t.logger,r=t.stateTransformer,o=t.errorTransformer,a=t.predicate,i=t.logErrors,s=t.diffPredicate;if(void 0===n)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var n=e.getState;return function(e){return function(l){if("function"==typeof a&&!a(n,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=r(n()),c.action=l;var f=void 0;if(i)try{f=e(l)}catch(e){c.error=o(e)}else f=e(l);c.took=O.now()-c.started,c.nextState=r(n());var p=t.diff&&"function"==typeof s?s(n,l):t.diff;if(_(u,Object.assign({},t,{diff:p})),u.length=0,c.error)throw c.error;return f}}}}var C,S,x=function(e,t){return new Array(t+1).join(e)},P=function(e,t){return x("0",t-e.toString().length)+e},T=function(e){return P(e.getHours(),2)+":"+P(e.getMinutes(),2)+":"+P(e.getSeconds(),2)+"."+P(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},M=[];C="object"===(void 0===e?"undefined":N(e))&&e?e:"undefined"!=typeof window?window:{},S=C.DeepDiff,S&&M.push(function(){void 0!==S&&C.DeepDiff===f&&(C.DeepDiff=S,S=void 0)}),n(o,r),n(a,r),n(i,r),n(s,r),Object.defineProperties(f,{diff:{value:f,enumerable:!0},observableDiff:{value:c,enumerable:!0},applyDiff:{value:v,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:m,enumerable:!0},isConflict:{value:function(){return void 0!==S},enumerable:!0},noConflict:{value:function(){return M&&(M.forEach(function(e){e()}),M=null),f},enumerable:!0}});var D={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},A={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,n=e.getState;return"function"==typeof t||"function"==typeof n?k()({dispatch:t,getState:n}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};t.defaults=A,t.createLogger=k,t.logger=R,t.default=R,Object.defineProperty(t,"__esModule",{value:!0})})}).call(t,n(38))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(69),a=n(312),i=r(a),s=n(313),u=r(s),l=n(314),c=r(l),f=n(315),p=r(f),d=n(316),h=r(d),m=n(317),v=r(m),g=n(318),y=(r(g),n(321)),b=r(y),E=n(322),w=r(E),_=(0,o.combineReducers)({session:u.default,songs:i.default,audio:c.default,users:p.default,comments:h.default,likes:v.default,follows:b.default,playlists:w.default});t.default=_},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(11),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{byTitle:{},byID:{},allsongs:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_SONGS:return t.songs.forEach(function(e){return n.byTitle[e.title]=e}),t.songs.forEach(function(e){return n.byID[e.id]=e}),t.songs.forEach(function(e){return n.allsongs.push(e)}),n;case o.RECEIVE_SONG:return n.allsongs.push(t.song),n.byID[t.song.id]=t.song,n.byTitle[t.song.title]=t.song,n;case o.REMOVE_SONG:delete n.byID[t.song.id],delete n.byTitle[t.song.title];var a=[];return e.allsongs.forEach(function(e){e.id!==t.song.id&&a.push(e)}),n.allsongs=a,n;case o.REMOVE_SONGS:return{byTitle:{},byID:{},allsongs:[]};default:return e}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(40),a=Object.freeze({currentUser:null,errors:[]}),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1];switch(Object.freeze(e),t.type){case o.RECEIVE_CURRENT_USER:return(0,r.merge)({},a,{currentUser:t.currentUser});case o.RECEIVE_ERRORS:return(0,r.merge)({},a,{errors:t.errors});case o.CLEAR_ERRORS:return{currentUser:e.currentUser,errors:[]};default:return e}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AudioReducer=void 0;var r=n(20),o=n(16),a={track_url:"",user_id:null,id:null,token:"",request:""},i=t.AudioReducer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},a);switch(t.type){case o.RECEIVE_AUDIO:return(0,r.merge)(n,t.audio);case o.REMOVE_AUDIO:return n;case o.RECEIVE_AUDIO_TOKEN:return(0,r.merge)({},e,{token:t.token});case o.REMOVE_AUDIO_TOKEN:return(0,r.merge)({},e,{token:""});case o.PROVIDE_AUDIO_PLAYBACK_TIME:return(0,r.merge)({},e,{time:t.time,request:""});case o.CHANGE_PLAYBACK_TIME:return(0,r.merge)({},e,{set:t.set,token:t.token});case o.REQUEST_AUDIO_PLAYBACK_TIME:return(0,r.merge)({},e,{request:t.request});case o.CLEAR_AUDIO_REQUEST:return(0,r.merge)({},e,{request:""});default:return e}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(9),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{byUsername:{},byID:{},allusers:[],toFollow:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_USERS:return t.users.forEach(function(e){return n.byUsername[e.username]=e}),t.users.forEach(function(e){return n.byID[e.id]=e}),t.users.forEach(function(e){return n.allusers.push(e)}),n;case o.RECEIVE_USER:return n.allusers.push(t.user),n.byUsername[t.user.username]=t.user,n.byID[t.user.id]=t.user,n;case o.REMOVE_USER:return n.byID.delete(t.user.id),n.byUsername.delete(t.user.username),n;case o.CLEAR_USERS:return{byUsername:{},byID:{},allusers:[],toFollow:[]};case o.RANDOM_USERS:return t.users.forEach(function(e){return n.toFollow.push(e)}),n;default:return e}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(78),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{bySongID:{},byID:{},allcomments:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_COMMENTS:return t.comments.forEach(function(e){return n.bySongID[e.user_id]=e}),t.comments.forEach(function(e){return n.byID[e.id]=e}),t.comments.forEach(function(e){return n.allcomments.push(e)}),n;case o.RECEIVE_COMMENT:return n.allcomments.push(t.comment),n.byID[t.comment.id]=t.comment,n.bySongID[t.comment.user_id]=t.comment,n;case o.REMOVE_COMMENT:delete n.byID[t.comment.id],delete n.bySongID[t.comment.user_id];var a=(e.allcomments.indexOf(t.comment),e.allcomments.slice(0),[]);return e.allcomments.forEach(function(e){e.id!==t.comment.id&&a.push(e)}),n.allcomments=a,n;case o.REMOVE_COMMENTS:return{bySongID:{},byID:{},allcomments:[]};default:return e}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(32),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{bySongID:{},byUserID:{},alllikes:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_LIKES:return t.likes.forEach(function(e){return n.bySongID[e.user_id]=e}),t.likes.forEach(function(e){return n.byUserID[e.song_id]=e}),t.likes.forEach(function(e){return n.alllikes.push(e)}),n;case o.RECEIVE_LIKE:return n.alllikes.push(t.like),n.byUserID[t.like.song_id]=t.like,n.bySongID[t.like.user_id]=t.like,n;case o.REMOVE_LIKE:delete n.byUserID[t.like.song_id],delete n.bySongID[t.like.user_id];var a=(e.alllikes.indexOf(t.like),e.alllikes.slice(0),[]);return e.alllikes.forEach(function(e){e.id!==t.like.id&&a.push(e)}),n.alllikes=a,n;case o.REMOVE_LIKES:return{bySongID:{},byUserID:{},alllikes:[]};default:return e}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(319),a=Object.freeze({query:"",results:null}),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1];switch(Object.freeze(e),t.type){case o.RECEIVE_RESULTS:return(0,r.merge)({},a,{currentUser:t.results});default:return e}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.makeSearch=t.receiveResults=t.SEARCH_DATABASE=void 0;var r=n(320),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),a=(t.SEARCH_DATABASE="SEARCH_DATABASE",t.receiveResults=function(e){return{type:RECEIVE_RESULTS,likes:likes}});t.makeSearch=function(){return function(e){return o.searchUsersAndSongs().then(function(t){return e(a(t))},function(t){return e(receiveErrors(t.responseJSON))})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.searchUsersAndSongs=function(e){return $.ajax({method:"GET",url:"/api/search",data:e})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(22),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{byFollowerID:{},byFolloweeID:{},allfollows:[],newFollows:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_FOLLOWS:return t.follows.forEach(function(e){return n.byFollowerID[e.follower_id]=e}),t.follows.forEach(function(e){return n.byFolloweeID[e.followee_id]=e}),t.follows.forEach(function(e){return n.allfollows.push(e)}),n;case o.RECEIVE_FOLLOW:return n.allfollows.push(t.follow),n.byFolloweeID[t.follow.followee_id]=t.follow,n.byFollowerID[t.follow.follower_id]=t.follow,n;case o.REMOVE_FOLLOW:delete n.byFolloweeID[t.follow.followee_id],delete n.byFollowerID[t.follow.follower_id];var a=(e.allfollows.indexOf(t.follow),e.allfollows.slice(0),[]);return e.allfollows.forEach(function(e){e.id!==t.follow.id&&a.push(e)}),n.allfollows=a,n;case o.REMOVE_FOLLOWS:return{byFollowerID:{},byFolloweeID:{},allfollows:[],newFollows:e.newFollows};case o.ADD_SESSION_FOLLOW:var i=e.newFollows;return i.push(t.id),n.newFollows=i,n;case o.REMOVE_SESSION_FOLLOW:var s=e.newFollows,u=e.newFollows.indexOf(t.id);return u?(s.splice(u,1),n.newFollows=s,n):e;default:return e}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(20),o=n(50),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{byTitle:{},byID:{},allplaylists:[]},t=arguments[1];Object.freeze(e);var n=(0,r.merge)({},e);switch(t.type){case o.RECEIVE_PLAYLISTS:return t.playlists.forEach(function(e){return n.byTitle[e.title]=e}),t.playlists.forEach(function(e){return n.byID[e.id]=e}),t.playlists.forEach(function(e){return n.allplaylists.push(e)}),n;case o.RECEIVE_PLAYLIST:return n.allplaylists.push(t.playlist),n.byID[t.playlist.id]=t.playlist,n.byTitle[t.playlist.title]=t.playlist,n;case o.REMOVE_PLAYLIST:return delete n.byID[t.playlist.id],delete n.byTitle[t.playlist.title],n;case o.REMOVE_PLAYLISTS:return{byTitle:{},byID:{},allplaylists:[]};default:return e}};t.default=a}]);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//



;
