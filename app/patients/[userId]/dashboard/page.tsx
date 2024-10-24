"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Adjusted to import from 'next/navigation'
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation"; // Import for extracting route parameters
import { logoutUser } from "@/lib/actions/login-patient.actions";
import {
  FaStethoscope,
  FaCloudSun,
  FaPlusCircle,
  FaNotesMedical,
  FaPrescriptionBottleAlt,
  FaFlask,
  FaAllergies,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaHeartbeat,
  FaTachometerAlt,
  FaLungs,
  FaWeight,
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';

export function SidebarDemo() {
  const router = useRouter(); // Moved router hook here to ensure it's defined before usage
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleLogout(), // Calling handleLogout when this link is clicked
    },
  ];

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-black dark:bg-black-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 h-screen overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/assets/icons/user.svg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        FirstMD
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/assets/icons/logo-icon.svg"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with scrollable content

// Adjust the import based on your project structure


const Dashboard = () => {
  const params = useParams();
  const { userId } = params;

  // Sample data for charts
  const labResultsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Cholesterol Levels',
        data: [190, 180, 175, 170, 165],
        fill: false,
        backgroundColor: '#F59E0B',
        borderColor: '#F59E0B',
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col p-6 gap-8 bg-gradient-to-b from-blue-50 to-white">
      {/* Patient Profile */}
      <Card className="flex flex-col md:flex-row p-8 gap-8 bg-white shadow-xl rounded-2xl">
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Patient"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary"
          />
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Jessica Alexander
            </h2>
            <p className="text-md text-gray-500">
              29 Yrs, Female - Engineer
            </p>
            <span className="text-green-600 font-semibold">
              Active
            </span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">
              Scheduled Appointment:
            </p>
            <p className="font-medium text-gray-700">
              14 Mar 2021
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">RAMQ:</p>
            <p className="font-medium text-gray-700">
              STES 3455 6665
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Referring Doctor:
            </p>
            <p className="font-medium text-gray-700">
              Dr. Chantal Godin
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Assigned Doctor:
            </p>
            <p className="font-medium text-gray-700">
              Dr. Audrey Smith
            </p>
          </div>
        </div>
      </Card>

      {/* Weather and Notes Card */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl flex items-center">
            <FaCloudSun size={36} />
            <p className="text-3xl ml-3 font-semibold">24°C</p>
          </div>
          <div>
            <p className="text-md text-gray-500">Good Morning,</p>
            <p className="text-2xl font-bold text-gray-800">
              Dr. Audrey Graham
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-3">
            Consultation Notes:
          </p>
          <textarea
            className="border border-gray-300 p-4 rounded-xl w-96 h-24 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Type here..."
          />
        </div>
      </Card>

      {/* Medical History */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaNotesMedical className="text-primary mr-3" /> Medical History
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Add Record
          </button>
        </CardHeader>
        <CardContent>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  2019 - Diagnosed with Hypertension
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  2020 - Underwent Appendectomy
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Lab Results with Chart */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaFlask className="text-primary mr-3" /> Lab Results
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Add Lab Result
          </button>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <Line data={labResultsData} />
          </div>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaPrescriptionBottleAlt className="text-primary mr-3" /> Medications
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-red-400 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Add Medication
          </button>
        </CardHeader>
        <CardContent>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  Atorvastatin 10mg - Once daily
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  Lisinopril 5mg - Once daily
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaAllergies className="text-primary mr-3" /> Allergies
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Add Allergy
          </button>
        </CardHeader>
        <CardContent>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">Penicillin</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">Peanuts</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaCalendarAlt className="text-primary mr-3" /> Upcoming Appointments
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Schedule Appointment
          </button>
        </CardHeader>
        <CardContent>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  20 Apr 2021 - Cardiologist Consultation
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4"></div>
              <div>
                <p className="font-medium text-gray-700">
                  15 May 2021 - Annual Physical Exam
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaExclamationTriangle className="text-primary mr-3" /> Risk Factors
          </CardTitle>
          <button className="flex items-center px-5 py-3 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-xl hover:shadow-lg transition-shadow">
            <FaPlusCircle className="mr-2" /> Add Risk Factor
          </button>
        </CardHeader>
        <CardContent>
          <p className="text-md text-gray-500 mt-6">
            No risk factors added.
          </p>
        </CardContent>
      </Card>

      {/* Physical Exam */}
      <Card className="p-8 bg-white shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FaStethoscope className="text-primary mr-3" /> Physical Exam
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex items-start">
              <FaHeartbeat className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Heart</p>
                <p className="font-medium text-gray-700">
                  Blockage in left artery
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaTachometerAlt className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Blood Pressure (TA)
                </p>
                <p className="font-medium text-gray-700">
                  120 mm/Hg
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaLungs className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Lungs</p>
                <p className="font-medium text-gray-700">
                  Congestion in left side of chest
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaHeartbeat className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Heart Rate (FC)
                </p>
                <p className="font-medium text-gray-700">
                  72 / min
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaNotesMedical className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Abdomen</p>
                <p className="font-medium text-gray-700">
                  Pain on right side
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaWeight className="text-primary mr-4 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Weight (Poids)
                </p>
                <p className="font-medium text-gray-700">
                  71.6 Kg
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



export default SidebarDemo;
