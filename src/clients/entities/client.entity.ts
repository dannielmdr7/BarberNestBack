import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true, type: Types.ObjectId })
  @IsMongoId()
  barberId: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: false, default: false })
  isDeleted: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
