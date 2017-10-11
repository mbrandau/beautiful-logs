const expect = require('expect.js'),
  init = require('../index'),
  sinon = require('sinon');


describe('beautiful-logs', function() {
  it('should expose a function', function() {
    expect(init).to.be.a('function');
  });

  describe('logger', function() {
    describe('.addCallback()', function() {
      it('should be a function', () => expect(init().addCallback).to.be.a('function'));

      const generateTest = (level) => (done) => {
        const logger = init();
        logger.addCallback(function(event) {
          expect(event).to.have.property('level', level);
          expect(event).to.have.property('message', 'Test message!');
          done();
        });
        logger[level]('Test message!');
      }

      const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
      levels.forEach(level => {
        it(`should be called ${level}`, generateTest(level));
      });
    });

    sinon.spy(console, 'log');
    describe('.lineEmpty()', function() {
      it('should be called once', function() {
          const logger = init();
          logger.emptyLine();
          expect(console.log.calledOnce).to.be.true;
      })
    })

    describe('.line()', function() {
      it('should be called once', function() {
        const logger = init();
        logger.line();
        expect(console.log.calledOnce).to.be.true;
      })
    })
  });
});
