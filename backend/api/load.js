const fastify = require("../fastify_init.js");
const fs = require('fs');
const path = require('path');
const pump = require('pump');
const ical = require('node-ical');

const filteredEvents = []

fastify.post('/api/upload_file', async function (req, reply) {
    const parts = req.parts();
    for await (const part of parts) {
        if (part.file) {
            const uploadPath = path.join(__dirname, '..', 'uploads', part.filename);
            await pump(part.file, fs.createWriteStream(uploadPath));
        }
    }

    const data = await parseIcsFile('./uploads/lucarizzi04.lr@gmail.com.ics');
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            const event = data[k];
            if (event.type === 'VEVENT') {
                console.log(event)
                filteredEvents.push({
                    summary: event.summary,
                    start: event.start,
                    end: event.end,
                    description: event.description || 'N/A'
                });
            }
        }
    }
    reply.send({ success: true, events_summary: getEventsSummary(filteredEvents) });
});

fastify.get('/api/get_events',async function (req, reply) {
    const data = await parseIcsFile('./uploads/lucarizzi04.lr@gmail.com.ics');
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            const event = data[k];
            if (event.type === 'VEVENT') {
                console.log(event)
                filteredEvents.push({
                    summary: event.summary,
                    start: event.start,
                    end: event.end,
                    description: event.description || 'N/A'
                });
            }
        }
    }
    reply.send({ code: 200, success: true, events_summary: getEventsSummary(filteredEvents) });
})

fastify.post('/api/load_data', async function (request, reply) {

    const now = new Date();
    const startDate = request.body.start_date ? new Date(request.body.start_date) : new Date(now.getFullYear(), 0, 1);
    const endDate = request.body.end_date ? new Date(request.body.end_date) : new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);


    const eventsSelected = request.body.events_selected;

    try {
        const data = await parseIcsFile('./uploads/lucarizzi04.lr@gmail.com.ics');

        var filteredEvents = [];
        // console.log(data)

        // Filtra e aggiungi gli eventi che cadono tra le date specificate
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                const event = data[k];
                if (event.type === 'VEVENT') {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);

                    if ((isValidDate(startDate) && isValidDate(endDate))) {
                        if (
                            (eventStart >= startDate && eventStart <= endDate) ||  // L'evento inizia nell'intervallo
                            (eventEnd >= startDate && eventEnd <= endDate) ||      // L'evento finisce nell'intervallo
                            (eventStart <= startDate && eventEnd >= endDate)       // L'evento attraversa l'intero intervallo
                        ) {
                            filteredEvents.push({
                                summary: event.summary,
                                start: eventStart.toLocaleString(),
                                end: eventEnd.toLocaleString(),
                                description: event.description || 'N/A'
                            });
                        }
                    }
                }
            }
        }
        // console.log(filteredEvents)
        var tmp = transformEvents(filteredEvents)
        // console.log(tmp)
        reply.status(200).send({ success: true, data: 'test' });
    } catch (err) {
        console.error('Errore durante la lettura del file .ics:', err);
        reply.status(500).send({ success: false, error: 'Errore durante la lettura del file .ics' });
    }
});


function parseIcsFile(filePath) {
    return new Promise((resolve, reject) => {
        ical.parseFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

function getEventsSummary(eventsList) {
    return eventsList.map(obj => ({
        value: obj.summary,
        label: obj.summary
      }));
}

function transformEvents(filteredEvents) {
    const eventMap = {};

    // Itera attraverso gli eventi per costruire l'oggetto con i conteggi per mese
    filteredEvents.forEach(event => {
        const eventMonth = new Date(event.start).getMonth(); // Ottieni il mese (da 0 a 11)
        const summary = event.summary;

        // Se l'evento non è già presente, inizializza la struttura
        if (!eventMap[summary]) {
            eventMap[summary] = {
                name: summary,
                data: Array(12).fill(0) // Array di 12 elementi, inizializzati a 0
            };
        }

        // Incrementa il conteggio per il mese specifico
        eventMap[summary].data[eventMonth] += 1;
    });

    // Converti l'oggetto in un array di oggetti
    return Object.values(eventMap);
}