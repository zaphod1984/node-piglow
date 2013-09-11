var piGlowInterface = require('./lib/interface');
var PiGlowBackend = require('./lib/PiGlowBackend');
var PiGlowBackendMock = require('./lib/PiGlowBackendMock');

function createPiGlow(callback) {
    var myPiGlow = new PiGlowBackend();
    var myInterface = piGlowInterface.create(myPiGlow);

    myPiGlow.on('initialize', function() {
        callback(myInterface);
    });
}

createPiGlow.BackendMock = PiGlowBackendMock;
createPiGlow.Backend = PiGlowBackend;

module.exports = createPiGlow;