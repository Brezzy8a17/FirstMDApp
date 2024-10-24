"use client"; // This makes it a Client Component

import React from "react";
import { getUserData } from "@/lib/actions/login-patient.actions";

interface PatientDashboardProps {
  userName: string;  // Accept the prop from the Server Component
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ userName }) => {
  return (
    <div>
      {/* Display user data */}
      <h1>Welcome, {userName}</h1>
      {/* Other UI components */}
    </div>
  );
};

export default PatientDashboard;
