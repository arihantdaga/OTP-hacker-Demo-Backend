// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const dotenv = require("dotenv").config();
const Airtable = require('airtable');
const fs = require('fs');
let airtablebase;

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
});

fastify.post("/data", async (request, reply) => {
    const data = {
        otp: request.body.otp,
        sender: request.body.sender,
        message: request.body.message,
    }
    console.log(data);
    return await new Promise((res, rej) => {
        airtablebase('OtpCollector').create([
            {
                "fields": data
            }], (err, records) => {
                if (err) {
                    return rej(err)
                }
                return res({ success: 1 })
            });
    })

});


// Run the server!
const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
        fastify.log.info(`server listening on ${fastify.server.address().port}`);

        Airtable.configure({ apiKey: process.env.AIRTABLE_KEY });
        airtablebase = Airtable.base(process.env.AIRTABLE_BASE)

    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()