"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  FaHeartbeat,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import ReactDOM from "react-dom";
import { Calendar } from "@/components/ui/calendar";

// Registering the scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export function SidebarDemo() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>("dashboard");

  const links = [
    {
      label: "Dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveComponent("dashboard"),
    },
    {
      label: "Profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveComponent("profile"),
    },
    {
      label: "Settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveComponent("settings"),
    },
    {
      label: "Logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: handleLogout,
    },
  ];

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-900 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 h-screen overflow-hidden"
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
                label: "",
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
      <div className="flex-1 overflow-y-auto">
        {activeComponent === "dashboard" && <Dashboard />}
        {activeComponent === "profile" && <Profile />}
        {activeComponent === "settings" && <Settings />}
      </div>
    </div>
  );
}

export const Logo: React.FC = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gray-800 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        FirstMD
      </motion.span>
    </Link>
  );
};

export const LogoIcon: React.FC = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gray-800 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// SidebarLink Component (Ensure this is updated in your components)
// Profile Component
const Profile: React.FC = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, Country",
    bio: "Patient at FirstMD with a keen interest in maintaining good health.",
    avatar: "/assets/icons/user.svg",
    insuranceProvider: "HealthPlus Insurance",
    policyNumber: "HP-123456789",
    groupNumber: "GP-987654321",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      emergencyContact: {
        ...prevUser.emergencyContact,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save user data logic here (e.g., API call)
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
      <Card className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <Image
            src={user.avatar}
            className="h-24 w-24 rounded-full"
            width={96}
            height={96}
            alt="User Avatar"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
              />
            ) : (
              <h2 className="text-3xl font-bold">{user.name}</h2>
            )}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded mt-2"
              />
            ) : (
              <p className="text-gray-400">{user.email}</p>
            )}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded mt-2"
              />
            ) : (
              <p className="text-gray-400">{user.phone}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          {isEditing ? (
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-gray-300">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-300">Gender</label>
                <select
                  name="gender"
                  value={user.gender}
                  
                  className="bg-gray-700 text-white p-2 rounded w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300">Address</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 text-gray-300 space-y-1">
              <p>Date of Birth: {user.dateOfBirth}</p>
              <p>Gender: {user.gender}</p>
              <p>Address: {user.address}</p>
            </div>
          )}
        </div>
        {/* Rest of the Profile component remains the same */}
        {/* ... */}
        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-green-600">
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600">
              Edit Profile
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

//ADDED SETTINGS


const Settings: React.FC = () => {
  // State variables for settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [appointmentReminders, setAppointmentReminders] = useState<boolean>(true);
  const [labResultsNotifications, setLabResultsNotifications] =
    useState<boolean>(true);
  const [privacySettings, setPrivacySettings] = useState<string>("private");
  const [language, setLanguage] = useState<string>("en");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSaveSettings = () => {
    // Save settings logic
    alert("Settings saved successfully!");
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Change password logic
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("New passwords do not match.");
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
      <Card className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Settings</h2>
        <div className="space-y-6">
          {/* Notifications */}
          <div>
            <h3 className="text-xl font-semibold">Notifications</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">SMS Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={appointmentReminders}
                  onChange={(e) => setAppointmentReminders(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">Appointment Reminders</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={labResultsNotifications}
                  onChange={(e) => setLabResultsNotifications(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-300">
                  Lab Results Notifications
                </span>
              </label>
            </div>
          </div>
          {/* Privacy Settings */}
          <div>
            <h3 className="text-xl font-semibold">Privacy Settings</h3>
            <div className="mt-2">
              <label className="block">
                <span className="text-gray-300">Data Sharing Preferences</span>
                <select
                  value={privacySettings}
                  onChange={(e) => setPrivacySettings(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 text-white p-2 rounded"
                >
                  <option value="private">Private</option>
                  <option value="share_with_providers">
                    Share with Healthcare Providers
                  </option>
                  <option value="public">Public</option>
                </select>
              </label>
            </div>
          </div>
          {/* Account Security */}
          <div>
            <h3 className="text-xl font-semibold">Account Security</h3>
            <div className="mt-2 space-y-2">
              <div>
                <label className="block text-gray-300">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-300">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded w-full"
                />
              </div>
              <Button onClick={handleChangePassword} className="mt-2 bg-blue-600">
                Change Password
              </Button>
            </div>
          </div>
          {/* Language Preferences */}
          <div>
            <h3 className="text-xl font-semibold">Language Preferences</h3>
            <div className="mt-2">
              <label className="block">
                <span className="text-gray-300">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 text-white p-2 rounded"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  {/* Add more language options as needed */}
                </select>
              </label>
            </div>
          </div>
          {/* Download Medical Records */}
          <div>
            <h3 className="text-xl font-semibold">Medical Records</h3>
            <div className="mt-2">
              <Button
                onClick={() => alert("Downloading medical records...")}
                className="bg-green-600"
              >
                Download Medical Records
              </Button>
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="mt-4 bg-green-600">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};








const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<{ date: Date; title: string }[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newAppointmentTitle, setNewAppointmentTitle] = useState("")

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setShowForm(true)
  }

  const handleAddAppointment = () => {
    if (selectedDate && newAppointmentTitle) {
      setAppointments([...appointments, { date: selectedDate, title: newAppointmentTitle }])
      setNewAppointmentTitle("")
      setShowForm(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col p-6 gap-8 bg-gray-900 text-white overflow-y-auto">
      {/* Top Section with Small Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather and Welcome Card */}
        <Card className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-full">
              <FaCloudSun size={36} />
            </div>
            <div>
              <p className="text-sm text-gray-400 mt-1">24°C, Sunny</p>
            </div>
          </div>
        </Card>

        {/* Scheduled Appointment Card */}
        <Card className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-full">
              <FaCalendarAlt size={36} />
            </div>
            <div>
              <p className="text-lg font-bold">Scheduled Appointment</p>
              <p className="text-2xl font-bold">14 Mar 2021</p>
              <p className="text-sm text-gray-400 mt-1">With: Dr. Chantal Godin</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Patient Overview */}
      <Card className="p-8 bg-gray-800 text-white rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Patient Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PatientOverview />
        </CardContent>
      </Card>

      {/* Enhanced Calendar Section */}
      <Card className="p-8 bg-gray-800 text-white rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <FaCalendarAlt className="mr-2" />
            Appointment Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border border-gray-600"
              classNames={{
                day_today: "bg-blue-600 text-white",
                day_selected: "bg-green-600 text-white",
                day_outside: "text-gray-400 opacity-50",
              }}
            />
            {showForm && (
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Add Appointment</h3>
                <input
                  type="text"
                  value={newAppointmentTitle}
                  onChange={(e) => setNewAppointmentTitle(e.target.value)}
                  placeholder="Appointment Title"
                  className="w-full p-2 mb-2 bg-gray-600 text-white rounded"
                />
                <Button onClick={handleAddAppointment} className="w-full">
                  Add Appointment
                </Button>
              </div>
            )}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
              {appointments.map((appointment, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-700 rounded-md">
                  <p className="font-semibold">{appointment.title}</p>
                  <p className="text-sm text-gray-400">
                    {appointment.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface PatientOverviewProps {}

const PatientOverview: React.FC<PatientOverviewProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("medicalHistory");

  const tabItems = [
    { id: "medicalHistory", label: "Medical History", icon: <FaNotesMedical /> },
    { id: "labResults", label: "Lab Results", icon: <FaFlask /> },
    { id: "medications", label: "Medications", icon: <FaPrescriptionBottleAlt /> },
    { id: "allergies", label: "Allergies", icon: <FaAllergies /> },
    { id: "physicalExam", label: "Physical Exam", icon: <FaStethoscope /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "medicalHistory":
        return <MedicalHistory />;
      case "labResults":
        return <LabResults />;
      case "medications":
        return <Medications />;
      case "allergies":
        return <Allergies />;
      case "physicalExam":
        return <PhysicalExam />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === tab.id ? "bg-gray-700" : "bg-gray-600"
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

const MedicalHistory: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [medicalHistory, setMedicalHistory] = useState<string[]>([
    "2019 - Diagnosed with Hypertension",
    "2020 - Underwent Appendectomy",
  ]);

  const addRecord = (record: string): void => {
    setMedicalHistory([...medicalHistory, record]);
  };

  return (
    <div>
      <ul className="space-y-4">
        {medicalHistory.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 flex items-center px-5 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <FaPlusCircle className="mr-2" /> Add Record
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddMedicalHistoryForm
            onSave={(record) => {
              addRecord(record);
              setModalOpen(false);
            }}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

interface AddMedicalHistoryFormProps {
  onSave: (record: string) => void;
  onClose: () => void;
}

const AddMedicalHistoryForm: React.FC<AddMedicalHistoryFormProps> = ({ onSave, onClose }) => {
  const [record, setRecord] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (record.trim() !== "") {
      onSave(record);
      setRecord("");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Medical History Record</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-32 p-2 bg-gray-700 text-white rounded"
          placeholder="Enter medical history record"
          value={record}
          onChange={(e) => setRecord(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const LabResults: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [labResultsData, setLabResultsData] = useState<ChartData<'line'>>({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Cholesterol Levels",
        data: [190, 180, 175, 170, 165],
        fill: false,
        backgroundColor: "#F59E0B",
        borderColor: "#F59E0B",
      },
    ],
  });

  const addLabResult = (label: string, value: number): void => {
    setLabResultsData((prevData) => {
      const newLabels = [...(prevData.labels as string[]), label];
      const newData = [...(prevData.datasets[0].data as number[]), value];
      const updatedData: ChartData<'line'> = {
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      };
      return updatedData;
    });
  };

  return (
    <div>
      <Line data={labResultsData} />
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 flex items-center px-5 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <FaPlusCircle className="mr-2" /> Add Lab Result
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddLabResultForm
            onSave={(label, value) => {
              addLabResult(label, value);
              setModalOpen(false);
            }}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

interface AddLabResultFormProps {
  onSave: (label: string, value: number) => void;
  onClose: () => void;
}

const AddLabResultForm: React.FC<AddLabResultFormProps> = ({ onSave, onClose }) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (label.trim() !== "" && value !== '') {
      onSave(label, Number(value));
      setLabel("");
      setValue('');
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Lab Result</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-white mb-2">Date Label</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4"
            placeholder="Enter date label (e.g., Jun)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2">Value</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const Medications: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [medications, setMedications] = useState<string[]>([
    "Atorvastatin 10mg - Once daily",
    "Lisinopril 5mg - Once daily",
  ]);

  const addMedication = (medication: string): void => {
    setMedications([...medications, medication]);
  };

  return (
    <div>
      <ul className="space-y-4">
        {medications.map((medication, idx) => (
          <li key={idx}>{medication}</li>
        ))}
      </ul>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 flex items-center px-5 py-3 bg-gradient-to-r from-red-400 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <FaPlusCircle className="mr-2" /> Add Medication
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddMedicationForm
            onSave={(medication) => {
              addMedication(medication);
              setModalOpen(false);
            }}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

interface AddMedicationFormProps {
  onSave: (medication: string) => void;
  onClose: () => void;
}

const AddMedicationForm: React.FC<AddMedicationFormProps> = ({ onSave, onClose }) => {
  const [medication, setMedication] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (medication.trim() !== "") {
      onSave(medication);
      setMedication("");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Medication</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          placeholder="Enter medication name and dosage"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const Allergies: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [allergies, setAllergies] = useState<string[]>(["Penicillin", "Peanuts"]);

  const addAllergy = (allergy: string): void => {
    setAllergies([...allergies, allergy]);
  };

  return (
    <div>
      <ul className="space-y-4">
        {allergies.map((allergy, idx) => (
          <li key={idx}>{allergy}</li>
        ))}
      </ul>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 flex items-center px-5 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <FaPlusCircle className="mr-2" /> Add Allergy
      </button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AddAllergyForm
            onSave={(allergy) => {
              addAllergy(allergy);
              setModalOpen(false);
            }}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

interface AddAllergyFormProps {
  onSave: (allergy: string) => void;
  onClose: () => void;
}

const AddAllergyForm: React.FC<AddAllergyFormProps> = ({ onSave, onClose }) => {
  const [allergy, setAllergy] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (allergy.trim() !== "") {
      onSave(allergy);
      setAllergy("");
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Allergy</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          placeholder="Enter allergy"
          value={allergy}
          onChange={(e) => setAllergy(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const PhysicalExam: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Physical exam data can be displayed here */}
      <div className="flex items-start">
        <FaHeartbeat className="text-primary mr-4 mt-1" />
        <div>
          <p className="text-sm text-gray-500">Heart</p>
          <p className="font-medium text-gray-200">Blockage in left artery</p>
        </div>
      </div>
      {/* Add other physical exam items similarly */}
    </div>
  );
};

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  if (typeof window === "undefined") return null;
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

interface CalendarFormProps {
  onSave: (date: Date | undefined) => void;
  onClose: () => void;
}

const CalendarForm: React.FC<CalendarFormProps> = ({ onSave, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSave = () => {
    onSave(date);
    onClose();
  };

  return (
    <Card className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Select a Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SidebarDemo