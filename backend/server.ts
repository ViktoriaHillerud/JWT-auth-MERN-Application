import express from 'express';
import cors from 'cors';
const app = express();
import './db';
import router from "./routes/routes";
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});