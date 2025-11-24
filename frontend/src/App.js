import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:4000/api/employees";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", email: "", position: "", salary: "" });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp._id);
  };

  return (
    <div className="container">
      <h1>Employee Payroll System</h1>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
      <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />

      <button onClick={handleSubmit}>
        {editId ? "Update Employee" : "Add Employee"}
      </button>

      <hr />

      <h2>Employee List</h2>
      {employees.map((emp) => (
        <div key={emp._id} className="employee">
          <strong>{emp.name}</strong> – {emp.position} – ₹{emp.salary}
          <br />
          <button onClick={() => handleEdit(emp)}>Edit</button>
          <button onClick={() => handleDelete(emp._id)} style={{ background: "red" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
