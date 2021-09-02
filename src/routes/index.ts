import { Express } from 'express';
export default function (app: Express) {
  require('./user')(app)
  require('./posts')(app)
}