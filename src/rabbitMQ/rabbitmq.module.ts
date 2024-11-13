import { Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Module({
    providers: [RabbitMQService],
    exports: [RabbitMQService], // Export to use in other modules
})
export class RabbitMQModule implements OnModuleInit {
    constructor(private readonly rabbitMQService: RabbitMQService) { }

    async onModuleInit() {
        await this.rabbitMQService.consumeMessages();
    }
}
