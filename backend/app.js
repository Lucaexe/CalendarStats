const fastify = require("./fastify_init.js")

require('./api/health.js')
require('./api/load.js')
// require('./api/userSession.js')


fastify.get('/', async (req, res) => {
    return res.sendFile('index.html')
});


fastify.listen({ host: "0.0.0.0", port: 3000 }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
