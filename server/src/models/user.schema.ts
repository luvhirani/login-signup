import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate E-mail Entered'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  about: string;

  @Prop({
    type: {
      line1: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
      postal_code: { type: String, default: ''},
      formattedAddress: {type:String, default:''},
    },
    default: {},
  })
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    formattedAddress: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
