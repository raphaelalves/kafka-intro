import { Kafka } from 'kafkajs';

const MY_IP = 'localhost'; // Your local network IP goes here

const kafka = new Kafka({
    clientId: 'myAppProducer',
    brokers: [`${MY_IP}:9091`],
});

const producer = kafka.producer();

await producer.connect();

for (let i=0; i<=100; i++) {
    const PARTITION_KEY = Math.round(Math.random() * 100).toString();
    await producer.send({
        topic: 'salesTopic',
        messages: [
            { key: PARTITION_KEY, value: `This is the ${i} message!` }
        ]
    });
}

await producer.disconnect();