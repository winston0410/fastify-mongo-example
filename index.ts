import cluster from 'cluster'
import app from 'app'

if (cluster.isMaster && process.env.NODE_ENV !== 'development') {

    // Count the machine's CPUs
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', ({id}) => {
        // Replace the dead worker, we're not sentimental
        console.log(`Worker ${id} died :(`);
        cluster.fork();

    });
} else {
  // Run the server!
  app.listen(8080, '0.0.0.0', function (err, address) {
    if (err) {
      if(process.env.NODE_ENV !== 'development'){
        app.log.error(err)
      } else {
        console.log(err)
      }
      process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
  })
}
