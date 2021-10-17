import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  /**
  - It returns a string- It takes no arguments-
  It is a pure function
  */
  @Query(() => String)
  hello() {
    return "bye";
  }
}
