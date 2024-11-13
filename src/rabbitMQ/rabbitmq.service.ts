import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { QUEUE_NAME, RABBITMQ_URL } from './rabbitmq.constants';
import * as amqp from 'amqplib';
import { ConsumeMessage } from 'amqplib'; // Import the type for messages


@Injectable()
export class RabbitMQService implements OnModuleDestroy {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async connect() {
        this.connection = await amqp.connect(RABBITMQ_URL);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(QUEUE_NAME, { durable: true });
    }

    async sendWelcomeMessage(userName: string) {
        const message = `Welcome, ${userName}! Thanks for signing up!`;
        await this.channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        console.log(`[x] Sent '${message}'`);
    }

    async consumeMessages() {
        if (!this.channel) await this.connect();
        console.log(`[*] Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);
        this.channel.consume(QUEUE_NAME, (msg: ConsumeMessage | null) => {
            console.log(`[x] Received ${msg.content.toString()}`);
            this.channel.ack(msg);
        });
    }

    async onModuleDestroy() {
        await this.channel.close();
        await this.connection.close();
    }
}
