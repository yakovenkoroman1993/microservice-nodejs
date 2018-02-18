/*
 * © Copyright 2018, Prevalent Inc., All Rights reserved.
 */

import * as Hapi from 'hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from 'inert';
import * as Vision from 'vision';
import routes from './routes';
const config = require('config').util.toObject();

const {port, host, prefix} = config.server;
const server = new Hapi.Server({port, host});
server.realm.modifiers.route.prefix = prefix;

server.route(routes);

server.events.on('start', () => (
    console.log(`Server running at: ${server.info.uri}`)
));

async function startup(){
    await server.register([Inert, Vision, {
        plugin: HapiSwagger,
        options: config.swagger
    }]);

    server.start();
}

startup();

export default server; // for testing