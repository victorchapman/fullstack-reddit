import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
//import { Post } from './entities/Post';
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { buildSchema } from "type-graphql";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
//to put typescript into watch mode type tsc -w
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";

import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
  });

  redisClient.on("connect", () => {
    console.log("Redis client connected");
    console.log(redisClient.connected);
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", //csrf
        //secure: __prod__, //cookie only works in https
      },
      saveUninitialized: false,
      secret: "qowiueojwojflsdjoqiwueo",
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
