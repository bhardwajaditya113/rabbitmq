const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const api_key = 'c914dae90a73b49a726540a25133d9f1-a83a87a9-2eee852e';

const auth = {
    auth: {
      api_key : api_key ,
      domain: 'sandboxd2bf604ec7524df9ab42aabafa3109e3.mailgun.org'
    },
  }
   
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

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
        //Receive message
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received ${msg.content.toString()}`);
           
            
            const strin = `Message received: ${msg.content.toString()}`
            const msgd = {
                to: 'techblogs96@gmail.com',
                from: 'test@example.com',
                subject: 'sending the details',
                text: strin,


            };
            nodemailerMailgun.sendMail(msgd,(err ,info) =>{
                if (err) {
                    console.log(`Error: ${err}` + " message not sent");
                  }
                  else {
                    console.log(`Response: ${info}` + " messsage sent ");
                  }
            })

           
            







        }, {
            noAck: true
        })
    })
})