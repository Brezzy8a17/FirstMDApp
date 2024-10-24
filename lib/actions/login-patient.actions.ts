"use server";

import { Client, Account, Query } from "node-appwrite";
import { DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID } from "../appwrite.config";
import { Patient } from "@/types/appwrite.types";

// Define the UserData interface
interface UserData {
  userName: string;
  userId: string;
  userGender: string;
  userOccupation: string;
  userInsuranceProvider: string;
  userAllergies: string;
  userMedication: string;
  userPhysician: string;
}

// Initialize Appwrite client and account services
const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);
const account = new Account(client);

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response; // Parse/format as needed
  } catch (error) {
    console.error("An error occurred during login:", error);
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during login.");
  }
};

// Function to log out the user from their current session
export const logoutUser = async () => {
  try {
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

// Function to retrieve user data from documents
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")] // Add any necessary query filters here
    );

    // Assuming you have userId from the logged-in session or from the documents, use find instead of filter
    const user = (response.documents as Patient[]).find((userDoc) => userDoc.$id); // Replace with the correct condition to find the logged-in user

    if (user) {
      const userData: UserData = {
        userName: user.name,
        userId: user.$id,
        userGender: user.gender,
        userOccupation: user.occupation,
        userInsuranceProvider: user.insuranceProvider,
        userAllergies: user.allergies || "",
        userMedication: user.currentMedication || "",
        userPhysician: user.primaryPhysician
      };
      return userData; // Return the user data object
    } else {
      return null; // Return null if no user is found
    }
  } catch (error) {
    console.error("An error occurred while retrieving user data:", error);
    throw error;
  }
};
