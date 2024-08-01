import mongoose from 'mongoose'; 


interface IUser {
	name: string,
	email: string,
	password: string,
	address?: string,
}

interface userModel extends mongoose.Model<UserDoc> {
	build(attr: IUser): UserDoc
}

export interface UserDoc extends mongoose.Document {
	name: string,
	email: string,
	password: string,
	address?: string,
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: false
	}
})



const User =  mongoose.model<UserDoc, userModel>("User", userSchema);

export  { User };