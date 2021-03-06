YUI.add('transition-usage-tests', function(Y) {

    Y.Test.Runner.add(new Y.Test.Case({
        name: 'Transition Tests',

        'should remove the element': function() {
            var node = Y.one('#demo a'),
                test = this;

            node.on('click', function(e) {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isNull(Y.one('#demo'));
                    });
                }, 2500);
            });

            setTimeout(function() {
                node.simulate('click');
            }, 0);
            test.wait(3000);
        }
    }));

}, '@VERSION@' ,{requires:['transition', 'test', 'node-event-simulate']});

