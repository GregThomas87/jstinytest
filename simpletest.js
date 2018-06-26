/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
 
 // DONE: Get success to be green.
 // DONE: One error to console person failure
 // DONE: Make failures red
 // DONE: Show stack traces for failures
 // DONE: Only show stack traces if you click expand
 // DONE: Output summary statistics to the DOM

let SimpleTestHelper = {
  renderStats(tests, failures) {
    let numberOfTests = Object.keys(tests).length;
    let successes = numberOfTests - failures;
    let summaryString = 'Ran ' + numberOfTests + " tests: " + successes + " successes, " + failures + " failures";
    let outputElement = document.createElement('h1');
    outputElement.textContent = summaryString;
    document.body.appendChild(outputElement);
    
  }
}

let SimpleTest = {

    run: function(tests) {
        let failures = 0;
        
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c%s', 'color: green;',testName);
            } catch (e) {
                failures++;
                console.groupCollapsed('%c%s', 'color: red;', testName);
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                SimpleTestHelper.renderStats(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },
    
    assertNotEquals: function(notExpected, actual) {
        if (notExpected == actual) {
            throw new Error('assertNotEquals() "' + notExpected + '" == "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = SimpleTest.fail.bind(this),
    assert             = SimpleTest.assert.bind(this),
    assertEquals       = SimpleTest.assertEquals.bind(this),
    eq                 = SimpleTest.assertEquals.bind(this), // alias for assertEquals
    assertStrictEquals = SimpleTest.assertStrictEquals.bind(this),
    tests              = SimpleTest.run.bind(this),
    noteq              = SimpleTest.assertNotEquals.bind(this),
    seq                = SimpleTest.assertStrictEquals.bind(this);