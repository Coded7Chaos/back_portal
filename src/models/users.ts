import mongoose, { Schema, Model, Document, Types} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document{
  username:string;
  mail:string;
  password:string;
  roles?: Types.ObjectId[];
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: { type:String, unique:true, required:true },
  mail:{ type: String, required: true, unique:true },
  password:  { type: String, required: true },
  roles: [{
    ref: "Role",
    type: mongoose.Types.ObjectId,
  },],
},{
  timestamps: true, 
  versionKey: false, 
}
)

UserSchema.methods.encryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password: string, receivedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, receivedPassword);
};


const User:Model<IUser> = mongoose.model<IUser>('User', UserSchema);



export default User;