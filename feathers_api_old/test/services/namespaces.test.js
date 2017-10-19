const assert = require('assert');
const app = require('../../src/app');

describe('\'namespaces\' service', () => {
  it('registered the service', () => {
    const service = app.service('namespaces');

    assert.ok(service, 'Registered the service');
  });
});
