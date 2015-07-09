process.env.NODE_ENV = 'TEST';

var config = require('config');
var assert = require('assert');
var _ = require('underscore');
var Shipwire = require(__dirname + '/../../index').Shipwire;

describe('Shipwire', function () {
  this.timeout(10000);

  it('should initialize object', function () {
    var shipwire_ = new Shipwire();
    assert.ok(shipwire_);
  });

  var shipwire_ = new Shipwire({
    host: config.get('host'),
    username: config.get('username'),
    password: config.get('password')
  });

  describe('#orders', function () {

    describe('#orders#get', function () {
      it('should list orders', function (done) {
        shipwire_.orders.get(function (err, data) {
          assert.ifError(err);
          assert.equal(data.status, 200);
          done();
        });
      });
    });

  });

});
