
(function(scope) {

	var Assert, JSunit;

	var voidFunction = function() { /* void */ };

	function Assert() {

		var self = this;

		var backupedContexts = [];

		var context = null;

		var reversedMode = false;

		var getType = function(value) {
			return Object.prototype.toString.call(value);
		}

		var deepEqual = function(expected, actual, strict) {
			if(typeof expected === 'object' && typeof actual === 'object') {
				for(var property in expected) {
					if(expected.hasOwnProperty(property) && actual.hasOwnProperty(property)) {
						if(!deepEqual(expected[property], actual[property], strict)) {
							return false;
						}
					}
					else {
						return false;
					}
				}
			}
			else {
				if(strict) {
					return expected === actual;
				}
				else {
					return expected == actual;
				}
			}
			return true;
		}

		self.reverseMode = function() {
			reversedMode = !reversedMode;
		}

		self.backupContext = function() {
			if(context != null) {
				backupedContexts.push(context);
				context = null;
			}
		}

		self.setContext = function(_context) {
			if(context == null) {
				context = _context;
			}
			else {
				throw new Error("You can not set a new context, before backup the current context");
			}
		}

		self.restoreContext = function() {
			if(backupedContexts.length > 0) {
				context = backupedContexts.pop();
			}
		}

		self.that = function(expression, message) {
			if(reversedMode) {
				expression = !expression;
			}
			if(context != null) {
				context.assertThat({
					passed: expression,
					message: message,
					error: (expression ? false : new Error(message)),
				});
			}
			return expression;
		}

		self.pass = function(error) {
			if(!error) {
				error = 'Should never failed';
			}
			return self.that(true, error);
		}

		self.fail = function(error) {
			if(!error) {
				error = 'Should always failed';
			}
			return self.that(false, error);
		}

		self.hasProperty = function(property, object) {
			return self.that(
				typeof object[property] !== 'undefined',
				'Object should contain property "'+property+'"'
			);
		}

		self.doesNotHaveProperty = function(property, object) {
			return self.that(
				typeof object[property] === 'undefined',
				'Object should not contain property "'+property+'"'
			);
		}

		self.hasOwnProperty = function(property, object) {
			return self.that(
				typeof object[property] !== 'undefined' && object.hasOwnProperty(property),
				'Object should contain own property "'+property+'"'
			);
		}

		self.doesNotHaveOwnProperty = function(property, object) {
			return self.that(
				typeof object[property] === 'undefined' || !object.hasOwnProperty(property),
				'Object should not contain own property "'+property+'"'
			);
		}

		self.hasKey = function(key, array) {
			return self.that(
				typeof array[key] !== 'undefined',
				'Array should contain key "'+key+'"'
			);
		}

		self.doesNotHaveKey = function(key, array) {
			return self.that(
				typeof array[key] === 'undefined',
				'Array should not contain key "'+key+'"'
			);
		}

		self.contains = function(value, array) {
			return self.that(
				array.indexOf(value) !== -1,
				'Array should contain value "'+value+'"'
			);
		}

		self.doesNotContain = function(value, array) {
			return self.that(
				array.indexOf(value) === -1,
				'Array should not contain value "'+value+'"'
			);
		}

		self.count = function(count, array) {
			var s = (count > 1 ? 's' : '');
			return self.that(
				array.length === count,
				'Array should contain "'+count+'" element'+s
			);
		}

		self.empty = function(array) {
			return self.that(
				array.length === 0,
				'Array should be empty'
			);
		}

		self.notEmpty = function(array) {
			return self.that(
				array.length > 0,
				'Array should not be empty'
			);
		}

		self.length = function(count, string) {
			var s = (count > 1 ? 's' : '');
			return self.that(
				string.length === count,
				'String "'+string+'" should contain '+count+' character'+s
			);
		}

		self.startsWith = function(expected, string) {
			var index = string.indexOf(expected);
			return self.that(
				index !== -1 && index === 0,
				'String "'+string+'" should start with "'+expected+'"'
			);
		}

		self.endsWith = function(expected, string) {
			var index = string.lastIndexOf(expected);
			return self.that(
				index !== -1 && index === (string.length - expected.length),
				'String "'+string+'" should end with "'+expected+'"'
			);
		}

		self.equals = function(expected, actual) {
			return self.that(
				expected === actual,
				'Value "'+actual+'" should be equal to "'+expected+'"'
			);
		}

		self.doesNotEqual = function(expected, actual) {
			return self.that(
				expected !== actual,
				'Value "'+actual+'" should be different of "'+expected+'"'
			);
		}

		self.deepEquals = function(expected, actual) {
			return self.that(
				deepEqual(expected, actual, true),
				'Current value should be deeply equal to expected value'
			);
		}

		self.doesNotDeepEqual = function(expected, actual) {
			return self.that(
				!deepEqual(expected, actual, true),
				'Current value should not be deeply equal to expected value'
			);
		}

		self.equivalents = function(expected, actual) {
			return self.that(
				expected == actual,
				'Value "'+actual+'" should be equivalent to "'+expected+'"'
			);
		}

		self.doesNotEquivalent = function(expected, actual) {
			return self.that(
				expected != actual,
				'Value "'+actual+'" should be non-equivalent to "'+expected+'"'
			);
		}

		self.deepEquivalents = function(expected, actual) {
			return self.that(
				deepEqual(expected, actual, false),
				'Current value should be deeply equivalent to expected value'
			);
		}

		self.doesNotDeepEquivalent = function(expected, actual) {
			return self.that(
				!deepEqual(expected, actual, false),
				'Current value should not be deeply equivalent to expected value'
			);
		}

		self.false = function(value) {
			return self.that(
				value === false,
				'Value "'+value+'" should be "false"'
			);
		}

		self.nonStrictFalse = function(value) {
			return self.that(
				value == false,
				'Value "'+value+'" should be equivalent to "false"'
			);
		}

		self.true = function(value) {
			return self.that(
				value === true,
				'Value "'+value+'" should be "true"'
			);
		}

		self.nonStrictTrue = function(value) {
			return self.that(
				value == true,
				'Value "'+value+'" should be equivalent to "true"'
			);
		}

		self.null = function(value) {
			return self.that(
				value === null,
				'Value "'+value+'" should be "null"'
			);
		}

		self.notNull = function(value) {
			return self.that(
				value !== null,
				'Value "'+value+'" should not be "null"'
			);
		}

		self.ok = function(value) {
			return self.nonStrictTrue(value);
		}

		self.ko = function(value) {
			return self.nonStrictFalse(value);
		}

		self.greaterThan = function(expected, value) {
			return self.that(
				value > expected,
				'Value "'+value+'" should be greater than "'+expected+'"'
			);
		}

		self.greaterThanOrEquals = function(expected, value){
			return self.that(
				value >= expected,
				'Value "'+value+'" should be greater than or equals to "'+expected+'"'
			);
		}

		self.lowerThan = function(expected, value) {
			return self.that(
				value < expected,
				'Value "'+value+'" should be lower than "'+expected+'"'
			);
		}

		self.lowerThanOrEquals = function(expected, value){
			return self.that(
				value <= expected,
				'Value "'+value+'" should be lower than or equals to "'+expected+'"'
			);
		}

		self.isBoolean = function(value) {
			return self.that(
				typeof value === 'boolean',
				'Value "'+value+'" should be a Boolean'
			);
		}

		self.isNumeric = function(value) {
			return self.that(
				typeof value === 'number',
				'Value "'+value+'" should be a Number'
			);
		}

		self.isInfinity = function(value) {
			return self.that(
				value === Infinity,
				'Value "'+value+'" should be Infinity'
			);
		}

		self.isString = function(value) {
			return self.that(
				typeof value === 'string',
				'Value "'+value+'" should be a String'
			);
		}

		self.isFunction = function(value) {
			return self.that(
				typeof value === 'function',
				'Value "'+getType(value)+'" should be a Function'
			);
		}

		self.isUndefined = function(value) {
			return self.that(
				typeof value === 'undefined',
				'Value "'+value+'" should be undefined'
			);
		}

		self.isObject = function(value) {
			return self.that(
				getType(value) === '[object Object]',
				'Value "'+getType(value)+'" should be an Object'
			);
		}

		self.isRegExp = function(value) {
			return self.that(
				getType(value) === '[object RegExp]',
				'Value "'+value+'" should be a RegExp'
			);
		}

		self.isDate = function(value) {
			return self.that(
				getType(value) === '[object Date]',
				'Value "'+value+'" should be a Date'
			);
		}

		self.isError = function(value) {
			return self.that(
				getType(value) === '[object Error]',
				'Value "'+value+'" should be an Error'
			);
		}

		self.isArguments = function(value) {
			return self.that(
				getType(value) === '[object Arguments]',
				'Value "'+value+'" should be Arguments'
			);
		}

		self.isPrimitive = function(value) {
			return self.that(
				value === null ||
				typeof value === 'boolean' ||
				typeof value === 'number' ||
				typeof value === 'string' ||
				typeof value === 'undefined',
				'Value "'+value+'" should be a primitive'
			);
		}

		self.isArray = function(value) {
			return self.that(
				getType(value) === '[object Array]',
				'Value "'+getType(value)+'" should be an Array'
			);
		}

		self.instanceOf = function(expected, instance) {
			var expectedInstance = new expected();
			return self.that(
				instance instanceof expected,
				'Value "'+instance.constructor.name+'" should be an instance of "'+expectedInstance.constructor.name+'"'
			);
		}

		self.throws = function(callback, errorType) {
			if(typeof callback !== 'function') {
				return self.fail('First parameter of "assert.throws" should be a function');
			}
			var failMessage = 'Should throw exception';
			try {
				callback();
				return self.fail(failMessage);
			}
			catch(error) {
				if(typeof errorType !== 'undefined') {
					var errorInstance = new errorType();
					failMessage = 'Should throw "'+errorInstance.constructor.name+'" exception'
					if(error instanceof errorType) {
						return self.pass(failMessage);
					}
					else {
						return self.fail(failMessage);
					}
				}
				return self.pass(failMessage);
			}
		}

		self.doesNotThrow = function(callback, errorType) {
			if(typeof callback !== 'function') {
				return self.fail('First parameter of "assert.doesNotThrow" should be a function');
			}
			var failMessage = 'Should not throw exception';
			try {
				callback();
				return self.pass(failMessage);
			}
			catch(error) {
					var errorInstance = new errorType();
				if(typeof errorType !== 'undefined') {
					failMessage = 'Should not throw "'+errorInstance.constructor.name+'" exception'
					if(error instanceof errorType) {
						return self.fail(failMessage);
					}
					else {
						return self.pass(failMessage);
					}
				}
				return self.fail(failMessage);
			}
		}
	}

	function UnitTest(_description, _callback) {

		var self = this;

		var description = _description;

		var assertions = [];

		var passedAssertions = 0;

		var failedAssertions = 0;

		var beforeTest = function() {
			Assert.backupContext();
			Assert.setContext(self);
		}

		var afterTest = function() {
			Assert.restoreContext();
		}

		self.assertThat = function(assertion) {
			if(assertion.passed) {
				passedAssertions++;
			}
			else {
				failedAssertions--;
			}
			assertions.push(assertion);
		}

		self.getDescription = function() {
			return description;
		}

		self.getAssertions = function() {
			return assertions;
		}

		self.hasPassed = function() {
			return failedAssertions === 0;
		}

		self.getPassedAssertionsCount = function() {
			return passedAssertions;
		}

		self.getFailedAssertionsCount = function() {
			return failedAssertions;
		}

		self.getAssertionsCount = function() {
			return assertions.length;
		}

		var initialize = function() {
			beforeTest();
			_callback();
			afterTest();
		}();
	}

	function UnitTestSuite(_name, _callback) {

		var self = this;

		var name = _name;

		var tests = [];

		var testSuites = {};

		var passedTests = 0;

		var failedTests = 0;

		var assertionsCount = 0;

		var beforeEachTestCallback = voidFunction;

		var afterEachTestCallback = voidFunction;

		self.beforeEachTest = function(callback) {
			beforeEachTestCallback = callback;
		}

		self.afterEachTest = function(callback) {
			afterEachTestCallback = callback;
		}

		self.test = function(description, callback) {
			if(typeof description === 'function') {
				callback = description;
				description = false;
			}

			beforeEachTestCallback();
			var unitTest = new UnitTest(description, callback);
			afterEachTestCallback();

			if(unitTest.hasPassed()) {
				passedTests++;
			}
			else {
				failedTests++;
			}
			assertionsCount += unitTest.getAssertionsCount();
			tests.push(unitTest);
		}

		self.testSuite = function(name, callback) {
			var unitTestSuite = new UnitTestSuite(name, callback);
			passedTests += unitTestSuite.getPassedTestsCount();
			failedTests += unitTestSuite.getFailedTestsCount();
			assertionsCount += unitTestSuite.getAssertionsCount();
			testSuites[name] = unitTestSuite;
		}

		self.getName = function() {
			return name;
		}

		self.getTests = function() {
			return tests;
		}

		self.getTestSuites = function() {
			return testSuites;
		}

		self.hasPassed = function() {
			return failedTests === 0;
		}

		self.getPassedTestsCount = function() {
			return passedTests;
		}

		self.getFailedTestsCount = function() {
			return failedTests;
		}

		self.getTestsCount = function() {
			return tests.length;
		}

		self.getAssertionsCount = function() {
			return assertionsCount;
		}

		var initialize = function() {
			_callback(self);
		}();
	}

	function JSunit() {

		var self = this;

		var startAt;

		var templates = {
			general:
				'<div class="jsunit-stats">'+
				'	<span class="jsunit-stats-passed">passed: </span>'+
				'	<i>%passedCount</i>'+
				'	<span class="jsunit-stats-failed">failed: </span>'+
				'	<i>%failedCount</i>'+
				'	<span class="jsunit-stats-assertions">assertions: </span>'+
				'	<i>%assertionsCount</i>'+
				'	<span class="jsunit-stats-assertions">duration: </span>'+
				'	<i>%duration</i><span>s</span>'+
				'</div>'+
				'<div class="jsunit-content">'+
				'	%tests'+
				'	%testSuites'+
				'</div>',
			suite:
				'<div class="jsunit-suite">'+
				'	<p class="jsunit-suite-title">%name</p>'+
				'	<div class="jsunit-suite-tests">'+
				'		%tests'+
				'		%testSuites'+
				'	</div>'+
				'</div>',
			testPassed:
				'<div class="jsunit-test jsunit-test-passed">'+
				'	<p class="jsunit-test-title">%description</p>'+
				'	<div class="jsunit-test-assertions">'+
				'		%assertions'+
				'	</div>'+
				'</div>',
			testFailed:
				'<div class="jsunit-test jsunit-test-failed">'+
				'	<p class="jsunit-test-title">%description</p>'+
				'	<div class="jsunit-test-assertions">'+
				'		%assertions'+
				'	</div>'+
				'</div>',
			assertionPassed:
				'<p class="jsunit-assertion jsunit-assertion-passed">'+
				'	%assertion'+
				'</p>',
			assertionFailed:
				'<div class="jsunit-assertion jsunit-assertion-failed">'+
				'	<p>%assertion</p>'+
				'	<pre>%error</pre>'+
				'</div>'
		}

		var renderAssertion = function(assertion) {
			return (assertion.passed ? templates.assertionPassed : templates.assertionFailed)
				.replace('%assertion', assertion.message)
				.replace('%error', (assertion.error ? assertion.error.stack : ''));
		}

		var renderAssertions = function(assertions) {
			var assertionsHtml = '';
			if(assertions.length > 0) {
				for(var i = 0; i < assertions.length; i++) {
					assertionsHtml += renderAssertion(assertions[i]);
				}
			}
			return assertionsHtml;
		}

		var renderTest = function(test) {
			return (test.hasPassed() ? templates.testPassed : templates.testFailed)
				.replace('%description', test.getDescription())
				.replace('%assertions', renderAssertions(test.getAssertions()));
		}

		var renderTests = function(tests) {
			var testsHtml = '';
			if(tests.length > 0) {
				for(var i = 0; i < tests.length; i++) {
					testsHtml += renderTest(tests[i]);
				}
			}
			return testsHtml;
		}

		var renderSuite = function(testSuite) {
			return templates.suite
				.replace('%name', testSuite.getName())
				.replace('%testSuites', renderSuites(testSuite.getTestSuites()))
				.replace('%tests', renderTests(testSuite.getTests()));
		}

		var renderSuites = function(testSuites) {
			var suitesHtml = '';
			for(var i in testSuites) {
				if(testSuites.hasOwnProperty(i)) {
					suitesHtml += renderSuite(testSuites[i]);
				}
			}
			return suitesHtml;
		}

		self.render = function() {
			var duration = (new Date().getTime() - startAt) / 1000;
			var root = document.getElementById('JSunit');
			root.innerHTML = templates.general
				.replace('%passedCount', self.getPassedTestsCount())
				.replace('%failedCount', self.getFailedTestsCount())
				.replace('%assertionsCount', self.getAssertionsCount())
				.replace('%duration', duration)
				.replace('%testSuites', renderSuites(self.getTestSuites()))
				.replace('%tests', renderTests(self.getTests()));

			var showHideActions = {
				'jsunit-suite-title'  : 'jsunit-suite-tests',
				'jsunit-test-title'   : 'jsunit-test-assertions'
			};

			for(var parentClass in showHideActions) {
				var triggers = root.getElementsByClassName(parentClass);
				for(var i = 0; i < triggers.length; i++) {
					triggers[i].addEventListener('click', function() {
						var childClass = showHideActions[this.className];
						var childs = this.parentNode.getElementsByClassName(childClass)[0];
						if(childs.offsetParent === null) {
							childs.style.display = 'block';
						}
						else {
							childs.style.display = 'none';
						}
					});
				}
			}
		}

		var initialize = function() {
			// Call parent class
			UnitTestSuite.apply(self, ['JSunit', voidFunction]);
			startAt = new Date().getTime();
		}();
	}

	// Extends JSunit to a UnitTestSuite
	JSunit.prototype = Object.create(UnitTestSuite.prototype);

	// Assert is a singleton
	scope.Assert = Assert = new Assert();

	// JSunit is a singleton
	scope.JSunit = JSunit = new JSunit();

}(this));
