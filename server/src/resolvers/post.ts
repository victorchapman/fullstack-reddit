import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  /**
  - It returns a list of posts- It uses the
  entity manager to find all posts
  */
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  /**
  - It takes an id and returns a Post- It uses
  the em (EntityManager) to find the Post with
  that id
  */
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  /**
  - Creates a new Post entity- Adds it to the
  EntityManager- Persists and flushes the
  entity to the database- Returns the post
  entity
  */
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  /**
  - It takes an id and a title as arguments. -
  It finds the post with that id. - If a title
  is passed, it updates the post's title. -
  Then it returns the post.
  */
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }

  /**
  - It deletes a post from the database. - It
  returns a boolean value.
  */
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
//i'm back!
