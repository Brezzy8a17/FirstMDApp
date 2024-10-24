"use server";

import { Client, Account, Query } from "node-appwrite";
import { DATABASE_ID, 
  databases,
   ENDPOINT, 
   PATIENT_COLLECTION_ID,
    PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Patient } from "@/types/appwrite.types";


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

//function to logout the user from their current session
export const logoutUser = async () => {
  try {
    // Delete the current session to log out the user
    await account.deleteSession("current");
    return { success: true, message: "User successfully logged out" };
  } catch (error) {
    console.error("An error occurred during logout:", error);
    if (error instanceof Error) {
      throw   new Error(`Logout failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during logout.");
  }
};

//retrieve user data from documents 
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

// @/lib/actions/login-patient.actions
export const getUserData = async (): Promise<any> => {
  try {
    // logic to retrieve user data
    const userData = {
      userName: 'John Doe',
      userId: '12345',
      userGender: 'Male',
      userOccupation: 'Software Engineer',
      userInsuranceProvider: 'ABC Insurance',
      userAllergies: 'None',
      userMedication: 'None',
      userPhysician: 'Dr. Smith',
    };
    return userData;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
};