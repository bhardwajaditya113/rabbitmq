const amqp = require('amqplib/callback_api');

//Create Connection
amqp.connect('amqp://localhost', (err, connection) => {
    if(err){
        throw err;
    }
    //Create Channel
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }
        //Assert Queue
        const QUEUE = 'hello'
        channel.assertQueue(QUEUE);
        //Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from('hello from Node js application'));
        console.log(`Message send ${QUEUE}`);
    })
})