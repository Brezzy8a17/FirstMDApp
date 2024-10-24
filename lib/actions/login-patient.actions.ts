"use server";

import { Client, Account, Query } from "node-appwrite";
import { DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { getAppointment } from "./appointment.actions"; // Import the getAppointment function

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

export const logoutUser = async () => {
  try {
    // Delete the current session to log out the user
    await account.deleteSession("current");
    return { success: true, message: "User successfully logged out" };
  } catch (error) {
    console.error("An error occurred during logout:", error);
    if (error instanceof Error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during logout.");
  }
};

//retrieve user through their unique ID
export const getUserData = async () => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [
        Query.orderDesc("$createdAt"),
      ]
    );

    const users = parseStringify(data.documents); // Parse user data

    // Fetch appointments for each user
    const usersWithAppointments = await Promise.all(users.map(async (user: { userId: string; }) => {
      const appointments = await getAppointment(user.userId); // Assuming userId is the identifier
      return {
        ...user,
        appointments: appointments ? [appointments] : [], // Wrap in an array if appointments exist
      };
    }));

    return usersWithAppointments; // Return users with their appointments
  } catch (error) {
    console.log(error);
  }
}