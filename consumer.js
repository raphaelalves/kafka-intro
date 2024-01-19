import { Kafka } from 'kafkajs';

const MY_IP = 'localhost'; // Your local network IP goes here

const kafka = new Kafka({
    clientId: 'myConsumer',
    brokers: [`${MY_IP}:9091`],
});

const consumer = kafka.consumer({
    groupId: 'theFirstOfMany'
});

await consumer.connect();
await consumer.subscribe({
    topic: 'salesTopic'
});

await consumer.run({
    eachMessage: ({ partition, topic, message}) => {
        console.info(`Received message from topic ${topic} from partition ${partition}`);
        console.log(`=====================`);
        console.log(`Partition Key used: ${message.key}, Message: ${message.value}`);
    }
})