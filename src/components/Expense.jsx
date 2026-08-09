import "../css/expense.css";

import { useState, useEffect } from "react";
import SuccessMessage from "./SuccessMessage";

function Expense() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("default");
  const [note, setNote] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!date) newErrors.date = "Date is required.";
    if (!amount) newErrors.amount = "Amount is required.";
    if (!category || category == "default")
      newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const expenseHistory = () => {
    return (
      <div id="expense-history">
        <div id="expense-header">Expense History</div>
        <div class="table-container">
          <table class="table">
            <thead class="scrollable-tbody">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody class="scrollable-tbody">{tableRow(data)}</tbody>
          </table>
          {data.length == 0 && <div id="no-record">No Records</div>}
        </div>
      </div>
    );
  };

  /* Handle Submit Method */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default page refresh on form submission
    if (validateForm()) {
      const postData = {
        date: date,
        amount: amount,
        category: category,
        note: note,
      };
      try {
        const payload = JSON.stringify(postData);
        const response = await fetch("http://localhost:8080/expense", {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Inform the server about the content type
          },
          body: payload, // Convert the data to a JSON string
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
        console.log("Success:", result);
        setAlertVisible(true);
        await fetchData();
        expenseHistory();
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create post.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/expenses"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      expenseHistory();
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    errors.amount = null;
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    errors.date = null;
  };
  const handleCategoryChange = (e) => {
    e.preventDefault;
    setCategory(e.target.value);
    errors.category = null;
  };

  const clearForm = (e) => {
    e.preventDefault;
    setAmount("");
    setDate("");
    setCategory("default");
    setNote("");
    setErrors({});
    setAlertVisible(false);
  };
  const tableRow = (tableData) => {
    return tableData.map((row) => (
      <tr key={row.expenseId}>
        <td>{row.date}</td>
        <td>{row.amount}</td>
        <td>{row.category}</td>
        <td>{row.note}</td>
      </tr>
    ));
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="expense-box">
      <div id="add-expense">
        <div id="expense-header">Expense Form</div>
        <form>
          <div class="mb-3">
            <label class="form-label">Date</label>
            <input
              type="date"
              class="form-control"
              id="validationDefault01"
              value={date}
              onChange={(e) => handleDateChange(e)}
            />
            {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
          </div>
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              value={amount}
              onChange={(e) => handleAmountChange(e)}
            />{" "}
            {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
          </div>

          <div class="mb-3">
            <label class="form-label">Note</label>
            <input
              type="text"
              class="form-control"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <select
              name="category"
              value={category}
              class="form-control"
              onChange={(e) => handleCategoryChange(e)}
            >
              <option value="default">---Category---</option>
              <option value="Saving">Saving</option>
              <option value="Food">Food</option>
              <option value="Social Life">Social Life</option>
              <option value="Transport">Transport</option>
              <option value="Household">Household</option>
              <option value="Health">Health</option>
              <option value="Gift">Gift</option>
              <option value="Education">Education</option>
              <option value="Beauty">Beauty</option>
              <option value="Culture">Culture</option>
              <option value="Vacation">Vacation</option>
              <option value="Apparel">Apparel</option>
              <option value="Other">Other</option>
            </select>{" "}
            {errors.category && (
              <p style={{ color: "red" }}>{errors.category}</p>
            )}
          </div>
          <div class="d-grid gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={clearForm}
            >
              Clear
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={handleSubmit}
            >
              Add Expense
            </button>
            {alertVisible && (
              <SuccessMessage
                message="Expense added successfully!"
                onClose={() => setAlertVisible(false)}
              />
            )}
          </div>
        </form>
      </div>
      {expenseHistory()}
    </div>
  );
}
export default Expense;
