import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class History {
  @Prop()
  method: string;

  @Prop()
  model: string;

  @Prop()
  previous: mongoose.Schema.Types.Mixed[];

  @Prop()
  current: mongoose.Schema.Types.Mixed[];
}

export type HistoryDocument = History & Document

export const HistorySchema = SchemaFactory.createForClass(History)