const expect = require('expect.js'),
  init = require('../index');

describe('beautiful-logs', function() {
  it('should expose a function', function() {
    expect(init).to.be.a('function');
  });
  describe('logger', function() {
    describe('.addCallback()', function() {
      it('should be a function', () => expect(init().addCallback).to.be.a('function'));
      it('added callbacks should be called on log events', function(done) {
        const logger = init();
        logger.addCallback(function(event) {
          expect(event).to.have.property('level', 'info');
          expect(event).to.have.property('message', 'Test message!');
          done();
        });
        logger.info('Test message!');
      });
    });
  });
});
