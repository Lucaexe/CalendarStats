const fastify = require("../fastify_init.js");
const fs = require('fs');
const path = require('path');
const pump = require('pump');

fastify.post('/api/uploadFile', async function (req, reply) {
    const parts = req.parts();
    for await (const part of parts) {
        if (part.file) {
            const uploadPath = path.join(__dirname, '..', 'uploads', part.filename);
            await pump(part.file, fs.createWriteStream(uploadPath));
        }
    }
    reply.send({ success: true });
});
