#!/usr/bin/env node
'use strict'

const express = require('express');
const horizon = require('@horizon/server');
const cors = require('cors');
const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors);
app.options('*', cors()); // allow preflight

const httpServer = app.listen(PORT);
const options = {
    project_name: 'api',
    rdb_host: process.env.HZ_RDB_HOST,
    rdb_port: process.env.HZ_RDB_PORT,
    access_control_allow_origin: '*',
    auth: {
      token_secret: 'blah-blah-blah-ok123zz',
      success_redirect: '/',
      allow_unauthenticated: false
    }
};

const horizonServer = horizon(httpServer, options);

horizonServer.add_auth_provider(horizon.auth.google, { id: process.env.HZ_AUTH_GOOGLE_ID, secret: process.env.HZ_AUTH_GOOGLE_SECRET, path: 'google' });

console.log('Listening on port 8181.');
