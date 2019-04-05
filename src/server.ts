import {GraphQLServer} from 'graphql-yoga';
import {createConnection, EntityManager} from 'typeorm';
import schema from './schema';
import './env';
import * as bcrypt from 'bcrypt';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
});

server.start({port: PORT}, () => console.log(`server is running on ${PORT}`));
