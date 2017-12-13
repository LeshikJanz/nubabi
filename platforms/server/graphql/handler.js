import { https } from 'firebase-functions';
import app from './server';

export const handler = https.onRequest(app);
