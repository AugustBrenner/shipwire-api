# Shipwire API

![Version npm][npm-shipwire-api-badge]

Promise Based Shipwire API Bindings.

Forked from sanderpick/shipwire-node.
README format was adapted from MONEI/Shopify-api-node (very clean and helpful).

## Installation:

```shell
$ npm install --save shipwire-api
```

## API

This module exports a constructor function which takes an options object.

### `Shipwire(options)`

Creates a new `Shipwire` instance.

#### Arguments

- `options` - Required - A plain JavaScript object that contains the
configuration options.

#### Options
- `username` - Required - A string that specifies the login username.
- `password` - Required - A string that specifies the login password.
- `host` - Optional - A string that specifies the host to make requests to.
    Defaults to `"api.beta.shipwire.com"`

#### Return value

A `Shipwire` instance.

#### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example

```js
const Shipwire = require('shipwire-api');

const shipwire = new Shipwire({
  host: "api.shipwire.com",
  username: "<USERNAME>",
  password: "<PASSWORD>"
});
```


### Resources

Every resource is accessed via your `shipwire` instance:

```js
const shipwire = new Shipwire({
  host: "api.shipwire.com",
  username: "<USERNAME>",
  password: "<PASSWORD>"
});

// shipwire.<resouce_name>.<method_name>
```

Each method returns a `Promise` that resolves with the result:

```js
shipwire.orders.get()
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
```



### Available resources and methods

- orders
  - `get()`
  - `create()`
  - `update()`
  - `cancel()`
  - `getHolds()`
  - `getItems()`
  - `getReturns()`
  - `getTrackings()`
- stock
  - `get()`
- rate
  - `get()`
- receivings
  - `get()`
  - `create()`
  - `update()`
  - `cancel()`
  - `cancelLabels()`
  - `getHolds()`
  - `getInstructionsRecipients()`
  - `getItems()`
  - `getShipments()`
  - `getTrackings()`
- returns
  - `get()`
  - `create()`
  - `cancel()`
  - `getHolds()`
  - `getItems()`
  - `getTrackings()`
  - `getLabels()`
- products
  - `get()`
  - `create()`
  - `update()`
  - `retire()`
- webhooks
  - `get()`
  - `create()`
  - `update()`
  - `delete()`
- secret
  - `get()`
  - `create()`
  - `delete()`



where `params` is a plain JavaScript object. See https://www.shipwire.com/w/developers/
for parameters details.

##  Shipwire Resources:

* [Getting Started][getting-started]
* [Using the API][api-docs-tutorial]
* [Webhooks Guide][webhooks-guide]
* [Become a Partner][become-a-partner]


[npm-shipwire-api-badge]: https://img.shields.io/badge/npm-v1.0.1-blue.svg
[getting-started]: www.shipwire.com/w/developers/getting-started/
[api-docs-tutorial]: https://www.shipwire.com/w/developers/tutorial/
[webhooks-guide]: https://www.shipwire.com/w/developers/webhooks-guide/
[become-a-partner]: https://www.shipwire.com/partners/
