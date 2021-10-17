import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from "dotenv";
import { User } from "./entities/User";

dotenv.config();

/**
 - It creates a new MikroORM instance with
the following configuration:- migrations:
path to the migrations directory- entities:
array of entities to be used by MikroORM-
dbName: name of the database- password:
password for the database- type: type of
database (postgresql)- debug: whether to
print debug messages or not
*/
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  password: process.env.DATABASE_PASSWORD,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

//31:53
