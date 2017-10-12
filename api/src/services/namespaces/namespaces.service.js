// Initializes the `namespaces` service on path `/namespaces`
const createService = require('feathers-rethinkdb');
const hooks = require('./namespaces.hooks');
const filters = require('./namespaces.filters');

module.exports = function () {
  const app = this;
  const Model = app.get('rethinkdbClient');
  const paginate = app.get('paginate');

  const options = {
    name: 'namespaces',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/namespaces', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('namespaces');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
