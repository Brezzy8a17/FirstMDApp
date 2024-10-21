"use server";

import { Client, Account } from "node-appwrite";
import { ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

// Initialize Appwrite client and account services
const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);
const account = new Account(client);

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("An error occurred during login:", error);
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during login.");
  }
};
