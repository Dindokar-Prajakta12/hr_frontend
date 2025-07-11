import React, { useState } from "react";
import axios from "axios";

const CandidateTable = ({ candidates, refresh, selectedIds, setSelectedIds }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://hr-backend-2-c07c.onrender.com/api/candidates/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refresh();
  };

  const updateNote = async (id, notes) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://hr-backend-2-c07c.onrender.com/api/candidates/${id}`,
      { notes },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refresh();
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // 🔍 Enhanced search across all fields
  const filtered = candidates.filter((c) => {
    const combined = `
      ${c.name}
      ${c.phone}
      ${c.email}
      ${c.experience}
      ${c.skills}
      ${c.location}
      ${c.status}
    `.toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gray-200 py-4">
      <div className="mt-8 container">
        <input
          type="text"
          placeholder="Search by any field..."
          className="mb-4 px-3 py-2 border rounded w-full"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Select</th>
                <th className="p-2 border">SR.No</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Experience</th>
                <th className="p-2 border">Skills</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Notes</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((c, index) => (
                <tr key={c._id}>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c._id)}
                      onChange={() => handleSelect(c._id)}
                    />
                  </td>
                  <td className="p-2 border">{(currentPage - 1) * 5 + (index + 1)}</td>
                  <td className="p-2 border">{c.name}</td>
                  <td className="p-2 border">{c.phone}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">{c.experience}</td>
                  <td className="p-2 border">{c.skills}</td>
                  <td className="p-2 border">{c.location}</td>
                  <td className="p-2 border">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="Not Connected">Not Connected</option>
                      <option value="Interested">Interested</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full"
                      defaultValue={c.notes}
                      onBlur={(e) => updateNote(c._id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔁 Pagination Controls */}
        <div className="mt-6 pb-4 flex justify-center items-center gap-2 text-sm container">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md border transition-all duration-200 
              ${currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-blue-600 border-blue-300"}`}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 rounded-md border transition-all duration-200
                ${currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600 font-semibold"
                  : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md border transition-all duration-200
              ${currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-blue-600 border-blue-300"}`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
