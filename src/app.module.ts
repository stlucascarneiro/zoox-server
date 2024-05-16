import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { CustomersSchema } from './entities/customer.entity';
import { HistorySchema } from './entities/history.entity';
import { HistoryService } from './services/history.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.latebvf.mongodb.net/?retryWrites=true&w=majority&appName=Main-Cluster`
    ),
    MongooseModule.forFeature([
      {name: 'customers', schema: CustomersSchema},
      {name: 'history', schema: HistorySchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, HistoryService],
})

export class AppModule {}
