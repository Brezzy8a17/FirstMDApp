"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
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
import { useParams } from "next/navigation";
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
  FaTachometerAlt,
  FaLungs,
  FaWeight,
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
import PatientDashboard from "./PatientDashboard";
import { getUserData } from "@/lib/actions/login-patient.actions";
export  function SidebarDemo() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

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

const Dashboard: React.FC = async () => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const { userId } = params as { userId: string };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUserData(userData);
    };

    fetchData();
  }, []);

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
              <PatientDashboard userName={userData?.userName || "Guest"} />
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
    </div>
  );
};

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

export default SidebarDemo