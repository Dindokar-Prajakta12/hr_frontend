import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateTable from "../../CandidateTable";
import SummaryReport from "../../SummaryReport";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css"; // Assuming you have some styles for the dashboard
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import logo from '../../../Assets/logo.png'
const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
    const [exportFilter, setExportFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
const [bulkStatus, setBulkStatus] = useState("");

  const fetchCandidates = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/candidates", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCandidates(res.data);
  };

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/candidates/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(res.data);
  };

  useEffect(() => {
    fetchCandidates();
    fetchSummary();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.warning("Please select a file!");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");
      setIsUploading(true);
      setUploadProgress(0);

      await axios.post("http://localhost:5000/api/candidates/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      toast.success("Upload successful!");
      setSelectedFile(null);
      fetchCandidates();
      fetchSummary();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading file!");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadExcel = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/candidates/export/excel", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "candidates.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Excel downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download Excel.");
    }
  };

const handleFilteredDownload = async () => {
  const token = localStorage.getItem("token");
  try {
    let url = "http://localhost:5000/api/candidates/export/excel";
    if (exportFilter) {
      url += `?status=${encodeURIComponent(exportFilter)}`;
    }
    console.log("Downloading from:", url);

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    const fileName = exportFilter ? `candidates_${exportFilter}.xlsx` : "candidates_all.xlsx";
    const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100); // Clean up after download

    toast.success("Filtered Excel downloaded successfully!");
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Failed to download filtered Excel.");
  }
};

const handleBulkUpdate = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.put(
      "http://localhost:5000/api/candidates/bulk-update",
      { ids: selectedIds, status: bulkStatus },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Status updated for selected candidates!");
    fetchCandidates(); // refresh
    setSelectedIds([]);
    setBulkStatus("");
  } catch (error) {
    toast.error("Failed to update candidates");
  }
};

  return (
    <>


      <div className="nav ">
        <div className="flex bg-gray-200 h-15 w-full">
          <div className="flex justify-between w-full item-center px-20 h-15">
            <img src={logo} alt="Logo" className="w-20" />
            <div >
              <ul className="flex gap-4  h-full mt-4">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li> <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Logout
    </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-[5vh]">
        <ToastContainer />


        {/* Upload Box */}

        <p className="text-gray-400 container"> For Upload the Data from Excel or CSV File</p>
        <form onSubmit={handleUpload} className="flex  flex-wrap justify-between py-2 h-full container">

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={` ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } border-dashed rounded-lg text-center transition-all duration-300 h-full my-auto`}
          >



            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
            // className="hidden"
            
            />
          </div>

          {/* Selected File Name */}
          {selectedFile && (
            <p className="my-auto text-sm text-gray-700 italic">
              Selected File: <strong>{selectedFile.name}</strong>
            </p>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            disabled={isUploading}
            className={`
              h-fit my-auto
            flex items-center justify-center 
            px-5 py-2 rounded-lg font-medium text-white
            transition-all duration-300
            ${isUploading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
          >
            {isUploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Upload Excel
              </>
            )}
          </button>


          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-green-500 h-full text-xs text-center text-black"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          )}





        </form>

<div className="flex items-center gap-4 mt-6 px-6">
  <select
    onChange={(e) => setExportFilter(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-1"
  >
    <option value="">All</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Rejected">Rejected</option>
    <option value="Interested">Interested</option>
    <option value="Not Connected">Not Connected</option>
  </select>

  <button
    onClick={handleFilteredDownload}
    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
  >
    Export Filtered Excel
  </button>
</div>





        <div className="mt-8">
          {/* <CandidateTable candidates={candidates} refresh={fetchCandidates} /> */}
<CandidateTable
  candidates={candidates}
  refresh={fetchCandidates}
  selectedIds={selectedIds}
  setSelectedIds={setSelectedIds}
/>
<div className="flex items-center gap-4 mt-4 px-6">
  <select
    value={bulkStatus}
    onChange={(e) => setBulkStatus(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-2"
  >
    <option value="">Select Status to Apply</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Rejected">Rejected</option>
    <option value="Interested">Interested</option>
    <option value="Not Connected">Not Connected</option>
  </select>

  <button
    onClick={handleBulkUpdate}
    disabled={selectedIds.length === 0 || !bulkStatus}
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
  >
    Apply to Selected
  </button>
</div>

          <SummaryReport summary={summary} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
