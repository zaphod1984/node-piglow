var expect = require('chai').expect;
var sinon = require('sinon');
var ce = require('cloneextend');

function createBackendMock() {
    return {
        values: [],
        writeBytes: function(bytes) {
            this.values.push(ce.clone(bytes));
        }
    };
}

var AnimationBackend = require('../lib/animations/AnimationBackend');
var animationInterface = require('../lib/animations/animationInterface');
var piglowInterface = require('../lib/interface');

describe('animationsBackend', function() {
    var clock, mock;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        mock = createBackendMock();
    });

    afterEach(function() {
        clock.restore();
    });

    it('should write for one loop', function() {
        animationInterface(new AnimationBackend({}, mock))
                .set().to(piglowInterface(['ring_0'])).after('100ms')
                .set().to(piglowInterface(['reset'])).after('100ms')
                .set().to(piglowInterface(['ring_1'])).after('100ms')
                .set().to(piglowInterface(['reset'])).after('100ms')
                .set().to(piglowInterface(['ring_2'])).after('100ms')
                .set().to(piglowInterface(['reset'])).after('100ms')
                .repeat(1)
                .start();

        clock.tick(5000);

        expect(mock.values).to.deep.equal([
                [ 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                [ 0, 0, 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 255, 0, 0 ],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]);
    });

    it('should write for two loop', function() {
        animationInterface(new AnimationBackend({}, mock))
                .set().to(piglowInterface(['ring_0'])).after('100ms')
                .set().to(piglowInterface(['reset'])).after('100ms')
                .repeat(2)
                .start();

        clock.tick(5000);

        expect(mock.values).to.deep.equal([
            [ 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]);
    });

    it('should fade', function() {
        animationInterface(new AnimationBackend({interval:10}, mock))
                .fade().to(piglowInterface(['red'])).after('100ms').in('30ms')
                .fade().to(piglowInterface(['green'])).after('100ms').in('30ms')
                .repeat(1)
                .start();

        clock.tick(5000);

        expect(mock.values).to.deep.equal([
            [ 85, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85 ],
            [ 170, 0, 0, 0, 0, 0, 170, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170 ],
            [ 255, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255 ],
            [ 170, 0, 0, 85, 0, 85, 170, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 170 ],
            [ 84, 0, 0, 170, 0, 170, 84, 0, 0, 0, 0, 0, 0, 170, 0, 0, 0, 84 ],
            [ 0, 0, 0, 255, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0 ]
        ]);
    });
});