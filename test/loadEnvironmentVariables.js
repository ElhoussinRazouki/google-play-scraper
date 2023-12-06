import dotenv from 'dotenv';

dotenv.config();

export const proxy = JSON.parse(process.env.PROXY);
