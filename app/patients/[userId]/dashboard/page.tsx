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
const Dashboard = () => {
  const params = useParams();
  const { userId } = params;

  return (
    <div className="flex flex-1 flex-col p-4 gap-4 overflow-auto">
      {/* Patient Profile */}
      <Card className="flex flex-col md:flex-row p-4 gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Patient"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">Jessica Alexander</h2>
            <p className="text-sm text-gray-500">29 Yrs, Female - Engineer</p>
            <span className="text-green-500 font-semibold">Active</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Scheduled Appt:</p>
            <p>14 Mar 2021</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">RAMQ:</p>
            <p>STES 3455 6665</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Referring Doctor:</p>
            <p>Dre Chantal Godin</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Assigned Doctor:</p>
            <p>Audrey Smith</p>
          </div>
        </div>
      </Card>

      {/* Weather and Notes Card */}
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <p className="text-lg">24°C</p>
            </div>
            <div>
              <p className="text-sm">Good Morning,</p>
              <p className="font-bold">Dr. Audrey Graham</p>
            </div>
          </div>
          <div>
            <p>Consultation Notes:</p>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-64"
              placeholder="Type here..."
            />
          </div>
        </div>
      </Card>

      {/* Risk Factor */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Risk Factor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No risk factor added.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Add Risk Factor
          </button>
        </CardContent>
      </Card>

      {/* Physical Exam */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Physical Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Heart</p>
              <p>Blockage in left artery</p>
            </div>
            <div>
              <p className="text-sm">TA</p>
              <p>120 mm/Hg</p>
            </div>
            <div>
              <p className="text-sm">Lungs</p>
              <p>Congestion in left side of chest</p>
            </div>
            <div>
              <p className="text-sm">FC</p>
              <p>72 / min</p>
            </div>
            <div>
              <p className="text-sm">Abdomen</p>
              <p>Pain on right side</p>
            </div>
            <div>
              <p className="text-sm">Poids</p>
              <p>71.6 Kg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarDemo;
