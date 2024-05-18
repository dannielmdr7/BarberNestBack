import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Barber extends Document {
  @Prop({ required: true })
  name: string;
}

export const BarberSchema = SchemaFactory.createForClass(Barber);
