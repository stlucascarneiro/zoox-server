import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HistoryDocument, History } from 'src/entities/history.entity';


@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('history')
    private historyModel: Model<HistoryDocument>
  ) { }

  async getHistory() {
    try {
      const documents = await this.historyModel.find({})
      return documents
    } catch (error) {
      throw new Error('[getHistory] Read Error')
    }
  }

  async saveHistory(document: History) {
    try {
      await this.historyModel.create(document)
    } catch (error) {
      throw new Error('[saveHistory] Write Error')
    }
  }
}
