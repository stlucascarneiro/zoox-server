import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export const gender = ['Masculino', 'Feminino'] as const

@Schema({ timestamps: true })
export class Customers  {
  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  gender: 'Masculino' | 'Feminino';

  @Prop()
  nacionality: string;
}

export type CustomersDocument = Customers & Document
export interface ICustomer {
  name: string
  date: Date
  gender: 'Masculino' | 'Feminino'
  nacionality: string
}

export const CustomersSchema = SchemaFactory.createForClass(Customers)