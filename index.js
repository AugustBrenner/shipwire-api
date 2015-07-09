var request = require('request');
var crypto = require('crypto');
var util = require('util');
var _ = require('underscore');
_.mixin(require('underscore.string'));

var Shipwire = exports.Shipwire = function (opts) {
  opts = opts || {};
  this.orders = new Orders(opts);
  this.stock = new Stock(opts);
  this.rate = new Rate(opts);
  this.receivings = new Receivings(opts);
  this.returns = new Returns(opts);
  this.products = new Products(opts);
  this.webhooks = new Webhooks(opts);
};

var Resource = function (opts) {
  this.host = opts.host;
  this.username = opts.username;
  this.password = opts.password;
  this.auth = 'Basic ' + new Buffer(this.username + ':' + this.password)
      .toString('base64');
  this.uri = 'https://' + this.host;
};

Resource.prototype.request = function (method, uri, path, data, cb) {
  if (typeof path === 'function') {
    cb = path;
    data = {};
    path = null;
  }
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }
  if (data.id) {
    path += '/' + data.id;
    delete data.id;
  }
  if (path) {
    uri += '/' + path;
  }
  var opts = {
    method: method,
    uri: uri,
    body: data,
    json: true,
    headers: {'Authorization': this.auth}
  };
  request(opts, function (err, req, body) {
    cb(err, body);
  });
};

var Orders = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/orders';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.update = _.partial(this.request, 'PUT', uri);
  this.cancel = _.partial(this.request, 'POST', uri, 'cancel');
  this.getHolds = _.partial(this.request, 'GET', uri, 'holds');
  this.getItems = _.partial(this.request, 'GET', uri, 'items');
  this.getReturns = _.partial(this.request, 'GET', uri, 'returns');
  this.getTrackings = _.partial(this.request, 'GET', uri, 'trackings');

  return this;
};
util.inherits(Orders, Resource);

var Stock = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/stock';

  this.get = _.partial(this.request, 'GET', uri);

  return this;
};
util.inherits(Stock, Resource);

var Rate = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/stock';

  this.get = _.partial(this.request, 'POST', uri);

  return this;
};
util.inherits(Rate, Resource);

var Receivings = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/receivings';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.update = _.partial(this.request, 'PUT', uri);
  this.cancel = _.partial(this.request, 'POST', uri, 'cancel');
  this.cancelLabels = _.partial(this.request, 'POST', uri, 'labels/cancel');
  this.getHolds = _.partial(this.request, 'GET', uri, 'holds');
  this.getInstructionsRecipients = _.partial(this.request, 'GET', uri,
      'instructionsRecipients');
  this.getItems = _.partial(this.request, 'GET', uri, 'items');
  this.getShipments = _.partial(this.request, 'GET', uri, 'shipments');
  this.getTrackings = _.partial(this.request, 'GET', uri, 'trackings');

  return this;
};
util.inherits(Receivings, Resource);

var Returns = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/returns';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.cancel = _.partial(this.request, 'POST', uri, 'cancel');
  this.getHolds = _.partial(this.request, 'GET', uri, 'holds');
  this.getItems = _.partial(this.request, 'GET', uri, 'items');
  this.getTrackings = _.partial(this.request, 'GET', uri, 'trackings');
  this.getLabels = _.partial(this.request, 'GET', uri, 'labels');

  return this;
};
util.inherits(Returns, Resource);

var Products = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/products';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.update = _.partial(this.request, 'PUT', uri);
  this.retire = _.partial(this.request, 'POST', uri, 'retire');

  return this;
};
util.inherits(Products, Resource);

var Webhooks = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/webhooks';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.update = _.partial(this.request, 'PUT', uri);
  this.delete = _.partial(this.request, 'DELETE', uri);

  return this;
};
util.inherits(Webhooks, Resource);

var Secret = function (opts) {
  Resource.call(this, opts);
  var uri = this.uri + '/api/v3/secret';

  this.get = _.partial(this.request, 'GET', uri);
  this.create = _.partial(this.request, 'POST', uri);
  this.delete = _.partial(this.request, 'DELETE', uri);

  return this;
};
util.inherits(Secret, Resource);
