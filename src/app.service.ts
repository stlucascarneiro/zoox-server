import { Injectable } from '@nestjs/common';
import * as csvtojson from 'csvtojson'
import * as path from 'path'
import * as moment from 'moment-timezone';
import * as fs from 'fs'
import { validateCustomers } from './middlewares/customer';
import { Customers, CustomersDocument, gender } from './entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HistoryService } from './services/history.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('customers')
    private customersModel: Model<CustomersDocument>,
    private historyService: HistoryService
  ) {}
  async readFile(file): Promise<Customers[]> {
    const filePath = path.resolve(__dirname, '../', 'uploads', file.filename)
    const json = await csvtojson({
      noheader: false,
      output: 'csv'
    }).fromFile(filePath)

    fs.unlink(filePath, (err) => { if (err) console.error('Erro ao descartar arquivo') })

    const serializedCustomers = this.serializeCustomers(json)
    const validatedCustomers = validateCustomers(serializedCustomers)
    return validatedCustomers
  }

  private serializeCustomers(json: string[][]) {
    const customers = json.map(values => {
      const isYMD = /^\d{4}$/.test(values[1].slice(0, 4))
      const dateFormat = isYMD ? 'YYYY/MM/DD' : 'DD/MM/YYYY'
      return {
        name: values[0],
        date: moment(values[1], dateFormat).tz("America/Sao_Paulo").toDate(),
        gender: values[2] as unknown as typeof gender[number],
        nacionality: values[3],
        createdAt: moment(values[4], 'YYYY/MM/DD').tz("America/Sao_Paulo").toDate(),
        updatedAt: moment(values[5], 'YYYY/MM/DD').tz("America/Sao_Paulo").toDate()
      }
    })
    return customers
  }

  async saveCustomers(customers: Customers[], path: string) {
    try {
      const validatedCustomers = validateCustomers(customers, path === '/customer')
      const documents = await this.customersModel.create(validatedCustomers)
      await this.historyService.saveHistory({
        method: 'POST',
        model: 'Customer',
        current: validatedCustomers as unknown as any,
        previous: null
      })
      return documents
    } catch (error) {
      throw new Error('[saveCustomers] Write Error')
    }
  }
  
  async getCustomers() {
    try {
      const documents = await this.customersModel.find({})
      return documents
    } catch (error) {
      throw new Error('[getCustomers] Read Error')
    }
  }

  async editCustomer(customer: any) {
    try {
      validateCustomers([customer], true)
      const oldCustomer = await this.customersModel.findOne({_id: customer._id})
      const documents = await this.customersModel.updateOne({_id: customer._id}, {$set: {...customer, _id: undefined}})
      const currentCustomer = await this.customersModel.findOne({_id: customer._id})
      await this.historyService.saveHistory({
        method: 'PATCH',
        model: 'Customer',
        current: currentCustomer as unknown as any,
        previous: oldCustomer as unknown as any
      })
      return documents
    } catch (error) {
      throw new Error('[getCustomers] Read Error')
    }
  }

  async deleteCustomers(ids: string[]) {
    try {
      const customers = await this.customersModel.find({_id: {$in: ids}})
      await this.customersModel.deleteMany({_id: {$in: ids}})
      await this.historyService.saveHistory({
        method: 'DELETE',
        model: 'Customer',
        current: undefined,
        previous: customers as unknown as any
      })
      return customers
    } catch (error) {
      throw new Error('[deleteCustomers] Delete Error')
    }
  }
}
