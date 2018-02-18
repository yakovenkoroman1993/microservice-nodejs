let mockObjects = [];

export function create({payload}) {
    let id = Math.round(Math.random() * 10000);
    let object = {
        id,
        createdAt: Date.now(),
        roles: [],
        name: id.toString(36).substring(7),
        ...payload
    };

    mockObjects.push(object);

    return object;
}

export function readAll() {
    return mockObjects;
}

export function read({params}, h) {
    return findObjectById(params.id) || (
        h.response('Object not found').code(404)
    );
}

export function update({payload, params}, h) {
    let code = 404, message = "Object not found";
    mockObjects = mockObjects.map(it => {
        if (it.id !== params.id) {
            return it;
        }

        message = "Object was updated";
        code = 200;
        return {
            ...it,
            ...payload
        };
    });

    return h.response(message).code(code);
}

export function remove({payload}, h) {
    let counter = 0;
    mockObjects = mockObjects.filter(it => {
        const exist = payload.ids.includes(it.id);
        exist && counter++;
        return !exist;
    });

    if (!counter) {
        return h.response(`Object(-s) not found`).code(404);
    }

    return h.response(`Total removed: ${counter}`).code(200);
}

export function notFound(request, h) {
    return h.response('The page was not found').code(404);
}

function findObjectById(id) {
    return mockObjects.find(it => it.id === id);
}