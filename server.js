// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const fs = require('fs');
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

fastify.post('/data', async (request, reply)=>{
    fs.writeFile('./data.txt', data, (err)=>{
        if(err){
            throw err;
        }
        return {success: 1};
    });
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT  || 3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()