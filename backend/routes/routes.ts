import express, { Request, Response } from "express";
import { createUser, readAllUsers, readOneUser, loginUser, updateUser, deleteUser } from '../controllers/userController';


const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Hello World')
});

//USER-ROUTES

router.post("/register", async (req : Request, res : Response) => {
	const user = await createUser(req);

	if(user) {
		if(user.error) {
			res.status(500).json({
				error: user.error
			});
		}
		else {
			res.status(201).json({
				user: user,
				message: "User registrated successfully"
			});
		}
	}

});

router.post("/login", async(req : Request, res : Response) => {
	const user = await loginUser(req);

	if(user) {
		if(user.err) {
			res.status(500).json({
				error: user.err,
				message: "wrong credentials"
			});
		}
		else {
			
			res.status(201).json({
				user: user,
				message: "user logged in"
			});
		}
	}

})

router.get("/users", async (req : Request, res : Response) => {
	const users = await readAllUsers();

	if(users) {
		if(users.error) {
			res.status(500).json({
				error: users.error
			});
		}
		else {
			res.status(201).json({
				message: "User found successfully"
			});
		}
	}

})


router.get("/profile/:userID", async(req : Request, res : Response) => {
	const user = await readOneUser(req);

	if(user) {
		if(user.error) {
			res.status(500).json({
				error: user.error
			});
		}
		else {
			res.status(201).json({
				user: user,
				message: "User found successfully"
			});
		}
	}

})


router.put("/profile/:userID", async(req : Request, res : Response) => {
	const user = await updateUser(req.params.userID, req.body);

	if(user) {
		if(user.error) {
			res.status(500).json({
				error: user.error
			});
		}
		else {
			res.status(201).json({
				user: user,
				message: "User updated successfully"
			});
		}
	}
})

router.delete("/profile/:userID", async (req : Request, res : Response) => {
	const user = await deleteUser(req.params.userID);

	if(user) {
		 if(user.error) {
			res.status(500).json({
				error: user.error
			});
		
	}

	else {
		res.status(201).json({
			user: user,
			message: "user deleted"
		});
	}
}

});



export default router;