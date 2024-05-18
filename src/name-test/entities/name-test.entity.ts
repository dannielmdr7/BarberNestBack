import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NameTest extends Document {
  // id: string // Mongo me lo da
  @Prop({ required: true })
  name: string;
}

export const NameTestSchema = SchemaFactory.createForClass(NameTest);
