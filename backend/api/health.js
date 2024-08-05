const fastify = require("../fastify_init.js");

fastify.get('/api/status', async (request, reply) => {
    return { status: 'ok', success: true }
})
