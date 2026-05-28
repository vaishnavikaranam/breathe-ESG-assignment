import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [records, setRecords] = useState([]);

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    source_type: "",
    company_name: "",
    activity_name: "",
    quantity: "",
    unit: "",
    normalized_unit: "",
    emission_factor: "",
    scope: "",
    created_by: ""
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch Records
  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add Record
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/add/",
        formData
      );

      fetchRecords();

      setFormData({
        source_type: "",
        company_name: "",
        activity_name: "",
        quantity: "",
        unit: "",
        normalized_unit: "",
        emission_factor: "",
        scope: "",
        created_by: ""
      });

    } catch (error) {

      console.log(error);

    }
  };

  // Approve Record
  const approveRecord = async (id) => {

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/approve/${id}/`
      );

      fetchRecords();

    } catch (error) {

      console.log(error);

    }
  };

  // Reject Record
  const rejectRecord = async (id) => {

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/reject/${id}/`
      );

      fetchRecords();

    } catch (error) {

      console.log(error);

    }
  };

  // Upload CSV
  const uploadCSV = async () => {

    if (!file) {

      alert("Please select CSV file");

      return;
    }

    const uploadData = new FormData();

    uploadData.append("file", file);

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/upload-csv/",
        uploadData
      );

      alert("CSV Uploaded Successfully");

      fetchRecords();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1f2937"
        }}
      >
        Breathe ESG Dashboard
      </h1>

      {/* Form Section */}

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px"
        }}
      >

        <h2>Add Emission Record</h2>

        <form onSubmit={handleSubmit}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px"
            }}
          >

            <input
              type="text"
              name="source_type"
              placeholder="Source Type"
              value={formData.source_type}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="activity_name"
              placeholder="Activity Name"
              value={formData.activity_name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="unit"
              placeholder="Unit"
              value={formData.unit}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="normalized_unit"
              placeholder="Normalized Unit"
              value={formData.normalized_unit}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="emission_factor"
              placeholder="Emission Factor"
              value={formData.emission_factor}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="scope"
              placeholder="Scope"
              value={formData.scope}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="created_by"
              placeholder="Created By"
              value={formData.created_by}
              onChange={handleChange}
              style={inputStyle}
            />

          </div>

          <button
            type="submit"
            style={addButton}
          >
            Add Record
          </button>

        </form>

      </div>

      {/* CSV Upload */}

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px"
        }}
      >

        <h2>Upload CSV File</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button
          onClick={uploadCSV}
          style={uploadButton}
        >
          Upload CSV
        </button>

      </div>

      {/* Table Section */}

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
        }}
      >

        <h2>Emission Records</h2>

        <div style={{ overflowX: "auto" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor: "#2563eb",
                  color: "white"
                }}
              >

                <th style={tableHeader}>ID</th>
                <th style={tableHeader}>Source</th>
                <th style={tableHeader}>Company</th>
                <th style={tableHeader}>Activity</th>
                <th style={tableHeader}>Quantity</th>
                <th style={tableHeader}>Unit</th>
                <th style={tableHeader}>Emission Factor</th>
                <th style={tableHeader}>Total Emission</th>
                <th style={tableHeader}>Scope</th>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Created By</th>
                <th style={tableHeader}>Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                records.map((record) => (

                  <tr
                    key={record.id}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #ddd"
                    }}
                  >

                    <td style={tableCell}>{record.id}</td>
                    <td style={tableCell}>{record.source_type}</td>
                    <td style={tableCell}>{record.company_name}</td>
                    <td style={tableCell}>{record.activity_name}</td>
                    <td style={tableCell}>{record.quantity}</td>
                    <td style={tableCell}>{record.unit}</td>
                    <td style={tableCell}>{record.emission_factor}</td>
                    <td style={tableCell}>{record.total_emission}</td>
                    <td style={tableCell}>{record.scope}</td>

                    <td style={tableCell}>

                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "5px",
                          color: "white",
                          backgroundColor:
                            record.status === "APPROVED"
                              ? "green"
                              : record.status === "REJECTED"
                              ? "red"
                              : "orange"
                        }}
                      >
                        {record.status}
                      </span>

                    </td>

                    <td style={tableCell}>{record.created_by}</td>

                    <td style={tableCell}>

                      <button
                        onClick={() => approveRecord(record.id)}
                        style={approveButton}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectRecord(record.id)}
                        style={rejectButton}
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

// Styles

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%"
};

const addButton = {
  marginTop: "20px",
  padding: "12px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const uploadButton = {
  padding: "10px 20px",
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const approveButton = {
  padding: "8px 12px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px"
};

const rejectButton = {
  padding: "8px 12px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const tableHeader = {
  padding: "12px"
};

const tableCell = {
  padding: "12px"
};

export default App;