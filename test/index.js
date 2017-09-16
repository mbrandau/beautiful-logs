const expect = require('expect.js'),
  init = require('../index');

describe('beautiful-logs', function() {
  it('should expose a function', function() {
    expect(init).to.be.a('function');
  });
  describe('logger', function() {
    describe('.addCallback()', function() {
      it('should be a function', () => expect(init().addCallback).to.be.a('function'));
      it('should be called on log events', function(done) {
        const logger = init();
        logger.addCallback(function(event) {
          expect(event).to.have.property('level', 'info');
          expect(event).to.have.property('message', 'Test message!');
          done();
        });
        logger.info('Test message!');
      });
    });
    describe('.emptyLine()', function() {
      it('should print a empty line on the console', function(done) {
        const oldFn = console.log;
        console.log = function() {
          expect(arguments.length).to.be(0);
          console.log = oldFn;
          done();
        }
        init().emptyLine();
      });
    });
    describe('.log()', function(done) {
      const logger = init();
      it('should return a string', function() {
        expect(logger.log('info', 'Test')).to.be.a('string');
      });
    });
    describe('.trace()', function() {
      it('should return a string', function() {
        expect(init().trace('Test')).to.be.a('string');
      });
    });
    describe('.debug()', function() {
      it('should return a string', function() {
        expect(init().debug('Test')).to.be.a('string');
      });
    });
    describe('.info()', function() {
      it('should return a string', function() {
        expect(init().info('Test')).to.be.a('string');
      });
    });
    describe('.warn()', function() {
      it('should return a string', function() {
        expect(init().warn('Test')).to.be.a('string');
      });
    });
    describe('.err()', function() {
      it('should return a string', function() {
        expect(init().err('Test')).to.be.a('string');
      });
    });
    describe('.fatal()', function() {
      it('should return a string', function() {
        expect(init().fatal('Test')).to.be.a('string');
      });
    });
  });
});
