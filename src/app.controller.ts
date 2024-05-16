import { Body, Controller, Delete, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';
import { Customers } from './entities/customer.entity';
import { HistoryService } from './services/history.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly historyService: HistoryService
  ) { }

  @Get('/customer')
  async getCustomer() {
    const customers = await this.appService.getCustomers()
    return customers
  }

  @Get('/history')
  async getHistory() {
    const history = await this.historyService.getHistory()
    return history
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
          callback(null, uniqueSuffix + '.csv')
        }
      })
    })
  )
  async uploadCustomers(
    @UploadedFile() file: Express.Multer.File
  ) {
    const customers = await this.appService.readFile(file)
    await this.appService.saveCustomers(customers, '/upload')
    return customers
  }

  @Post('/customer')
  async createCustomer(
    @Body() body: Customers
  ) {
    const customer = await this.appService.saveCustomers([body], '/customer')
    return customer
  }

  @Patch('/customer')
  async editCustomer(
    @Body() customer: Customers
  ) {
    const customers = await this.appService.editCustomer(customer)
    return customers
  }

  @Delete('/customer')
  async deleteCustomers(
    @Body() body: string[]
  ) {
    const customers = await this.appService.deleteCustomers(body)
    return customers
  }
}

