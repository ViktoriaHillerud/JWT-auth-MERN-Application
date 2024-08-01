const express = require('express').setHeader
import { Request } from "express";
import bcrypt from "bcrypt";
import { User, UserDoc }from '../models/userSchema';
import jwt from 'jsonwebtoken';
import { UpdateQuery } from "mongoose";
require("dotenv").config();



//Read ALL users

export const readAllUsers = async () => {
  try {
    const users = await User.find({});

    if (!users) {
      throw new Error("Users not found");
    }

    return { error: null, data: users };
  } catch (error) {
    console.log(error);
    return { error: "Users not found", data: null };
  }
};


//Read one user

export const readOneUser = async (data: Request) => {
  try {
	const user = await User.findById(data.params.userID);
    return {error: null, user};
  } catch (error) {
    console.log(error);
    return { error: "User not found" };
  }
};


//Create(register) new user

export const createUser = async (req: Request) => {
	try {
	  const salt = await bcrypt.genSalt();
	  const passwordHash = await bcrypt.hash(req.body.password, salt);
  
	  const newUser = new User({ name: req.body.name, email: req.body.email, password: passwordHash });
	  await newUser.save();
  
	  const token = jwt.sign(
		{ id: newUser._id, email: newUser.email },
		process.env.JWT_SECRET as string,
		{ expiresIn: "2h" }
	  );
  
	  return { error: null, email: newUser.email, name: newUser.name, token };
	} catch (error: unknown) {
	  if (error instanceof Error) {
		return { error: { message: error.message }, req: null };
	  } else {
		return { error: { message: "Unknown error" }, req: null };
	  }
	}
  };


//Login user

export const loginUser  = async (req: Request) => {

	try {
		const { email, password } = req.body;
	
		if (!email) {
			throw new Error("Email is invalid");
		  
		}
		else if (!password)  {
			throw new Error("Password is invalid");
		}

		const user = await User.findOne({ email });

	
		if (user && (await bcrypt.compare(password, user.password))) {
		
		  const accessToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET as string,
			{
			  expiresIn: "2h",
			}
			
		  );

		  // user
		  return {email: user.email, name: user.name, accessToken};
		} else {
			throw new Error("Password does not match");
		}
		
		
	  } catch (err) {
		console.log(err);
		return { err: "User not found" }
	  }
	  // register logic ends here
	
}



// Update user 

export const updateUser = async (id: string, data: UpdateQuery<UserDoc> | undefined) => {
try {
	const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});
	return { error: null, data: updatedUser };
} catch (error) {
	console.log(error);
	
    return { error: "User not updated", data: null };
}
}


//Delete user

export const deleteUser = async (id: string) => {
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		return { error: null, deleteUser }

	} catch(error: unknown) {
		if(error instanceof Error){
			return { error: { message: error.message}, id: null};
		}
		else {
			return { error: { message: "Unknown error"}, id: null};
		}
	}
}




module.exports = {readAllUsers, readOneUser, createUser, loginUser, updateUser, deleteUser};