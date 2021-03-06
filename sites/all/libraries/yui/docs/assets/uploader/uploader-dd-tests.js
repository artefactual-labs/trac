YUI.add('uploader-dd-tests', function(Y) {

    var suite = new Y.Test.Suite('Uploader DD Example Test Suite'),
        Assert = Y.Assert;
            var demo_btn = Y.one("#demo_btn"),
                demo_input = Y.one("#demo_input"),
                demo_output = Y.one("#demo_output");

    suite.add(new Y.Test.Case({

        name: 'Uploader Tests',

        'Dummy passing test, manual tests required.': function() {

                Assert.isTrue(true, " - Use manual tests.");
         }
    }));

    Y.Test.Runner.add(suite);

}, '', { requires: [ 'node', 'node-event-simulate'] });
