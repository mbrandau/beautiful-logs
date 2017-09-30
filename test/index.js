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

      const levels = ['trace', 'debug', 'info', 'warn', 'err', 'fatal'];
      levels.forEach(level => {
        it(`should be called ${level}`, generateTest(level));
      });
    });

    describe('.lineEmpty()', function() {
      it('should be called once', function() {
          const logger = init();
          sinon.spy(logger, 'emptyLine');
          logger.emptyLine('trace', 'Test message!');
          expect(logger.emptyLine.calledOnce).to.be.true;
      })
    })

    describe('.line()', function() {
      it('should be called once', function() {
        const logger = init();
        sinon.spy(logger, 'line');
        logger.line();
        expect(logger.line.calledOnce).to.be.true;
      })
    })
  });
});
