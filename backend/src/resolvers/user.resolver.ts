import { Arg, Field, InputType, Mutation, Query } from "type-graphql";

import { Resolver } from "type-graphql";
import { User, UserInput } from "../entities/user.typeDefs";
import { BaseEntity } from "typeorm";

@Resolver(User)
export class UserResolver {
  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  @Query(() => [User])
  async getUsers() {
    const users = await User.find();
    if (!users) throw new Error("No users found");
    return users;
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
   */
  @Query(() => User)
  async getUserById(@Arg("id") id: string) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");
    return user;
  }

  /**
   * Create a new user.
   * @param {UserInput} data - The user data.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   */
  @Mutation(() => User)
  async createUser(@Arg("data") { username, email, password }: UserInput) {
    const user = User.create({ username, email, password });
    await user.save();
    return user;
  }

  /**
   * Updates an existing user.
   * @param {string} id - The ID of the user to update.
   * @param {UserInput} data - The new user data.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   * @throws Will throw an error if the user is not found.
   */
  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UserInput) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");
    Object.assign(user, data);
    await user.save();
    return {
      user,
      success: true,
      message: "User updated successfully",
    };
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted, false otherwise.
   */
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const result = await User.delete(id);
    return result.affected === 1;
  }
}
