import * as handler from './handler';
import * as Enjoi from 'enjoi';
const {version} = require('./../package.json');
const schema = require('./schemas/object.schema.json');

export default [{
    method: 'GET',
    path: `/`,
    options: {
        description: 'Welcome to service',
        notes: 'Returns version of service',
        handler: (request, h) => (
            h.response(`Version of service is ${version}`)
        )
    }
}, {
    method: ['POST', 'PUT'],
    path: `/create`,
    options: {
        description: 'Create operation',
        notes: 'Returns created object',
        handler: handler.create,
        tags: ['api'],
        validate: {
            payload: Enjoi(schema)
        }
    }
}, {
    method: 'GET',
    path: `/get/{id}`,
    options: {
        description: 'Read operation',
        notes: 'Returns object by id',
        handler: handler.read,
        tags: ['api'],
        validate: {
            params: Enjoi(
                require('./schemas/object.id.schema.json')
            ),
        }
    }
}, {
    method: 'GET',
    path: `/get`,
    options: {
        description: 'Read operation',
        notes: 'Returns all existed objects',
        handler: handler.readAll,
        tags: ['api']
    }
}, {
    method: 'POST',
    path: `/update/{id}`,
    options: {
        description: 'Update operation',
        notes: 'Returns updated object by id',
        handler: handler.update,
        tags: ['api'],
        validate: {
            params: Enjoi(
                require('./schemas/object.id.schema.json')
            ),
            payload: Enjoi({
                ...schema,
                required: []
            })
        }
    }
}, {
    method: 'DELETE',
    path: `/remove`,
    options: {
        description: 'Delete operation',
        notes: 'Returns status code',
        handler: handler.remove,
        tags: ['api'],
        validate: {
            payload: Enjoi(
                require('./schemas/object.delete.schema.json')
            )
        }
    }
}, {
    method: '*',
    path: '/{p*}', // catch-all path
    handler: handler.notFound
}];