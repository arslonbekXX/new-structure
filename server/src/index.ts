import express, { json } from 'express';
import cors from 'cors';
import { taskRouter } from './routes';

const app = express();

app.use(json());
app.use(cors());

app.use('/api/tasks', taskRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
