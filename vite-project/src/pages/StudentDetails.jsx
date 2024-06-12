import React, { useState, useEffect } from "react";
import GridData from "../Components/GridData";

function StudentDetails() {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      const res = await fetch(`http://localhost:3000/staff/getBatch`);
      const data = await res.json();
      const durations = data.map((item) => item.duration);
      setBatches([...batches, ...durations]);
    };
    fetchBatchDetails();
  }, []);

  useEffect(() => {
    const fetchBatchStudents = async () => {
      if (selectedBatch) {
        try {
          const encodedBatch = encodeURIComponent(selectedBatch);
          const res = await fetch(
            `http://localhost:3000/student/${encodedBatch}`
          );
          const batch = await res.json();
          setBatchDetails(batch);
        } catch (error) {
          console.error("Error fetching batch details:", error);
        } finally {
        }
      }
    };

    fetchBatchStudents();
  }, [selectedBatch]);

  return (
    <>
      <select
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
      >
        <option value="" disabled>
          Select Batch
        </option>
        {batches.map((batch) => (
          <option key={batch} value={batch}>
            {batch}
          </option>
        ))}
      </select>

      {/* {loading && <div>Loading...</div>} */}

      {selectedBatch && (
        <div>
          <h2>Batch Details</h2>
          <GridData selectedBatch={selectedBatch} />
        </div>
      )}
    </>
  );
}

export default StudentDetails;
