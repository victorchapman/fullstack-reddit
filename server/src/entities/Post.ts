import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

/**
- Defines the shape of the data that will be
stored in the database- Defines the shape of
the data that will be returned to the client-
Defines the shape of the data that will be
used to create a new instance of this entity
*/
@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}
