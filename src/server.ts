import {GraphQLServer} from 'graphql-yoga';
import {createConnection} from 'typeorm';
import schema from './schema';
import './env';

const PORT = process.env.PORT || 4000;

createConnection()
  .then(async connection => {
    const server = new GraphQLServer({
      schema,
      context: ({request}) => ({request, connection}),
    });

    server.start({port: PORT}, () =>
      console.log(`server is running on ${PORT}`),
    );
  })
  .catch(err => console.log(err));
