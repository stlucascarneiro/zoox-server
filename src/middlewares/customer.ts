import { BadRequestException } from '@nestjs/common';
import { Customers, CustomersDocument, gender } from 'src/entities/customer.entity';

export const validateCustomers = (json: any[], skipDate?: boolean): Customers[] => {
  for (const [index, customer] of json.entries()) {
    if (!customer.name || !(/^[a-zA-ZÀ-ú\s]*$/.test(customer.name))) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'nome'`)
    }
    if (!customer.nacionality || !(/^[a-zA-ZÀ-ú\s]*$/.test(customer.nacionality))) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'nacionalidade'`)
    }
    if (!customer.gender || !gender.includes(customer.gender)) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'genero'`)
    }
    if (customer.date && !(customer.date instanceof Date) && !skipDate) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'data_nascimento'`)
    }
    if (customer.createdAt && !(customer.createdAt instanceof Date) && !skipDate) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'data_criacao'`)
    }
    if (customer.updatedAt && !(customer.updatedAt instanceof Date) && !skipDate) {
      throw new BadRequestException(`A linha de número ${index + 2} possui um valor inválido na coluna 'data_atualizacao'`)
    }
  }
  return json
}
