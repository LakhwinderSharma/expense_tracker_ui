import "../css/income.css";

import { useState, useEffect } from "react";
import SuccessMessage from "./SuccessMessage";

function Income() {
  console.log("Income rendered");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("default");
  const [note, setNote] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedIncomeId, setselectedIncomeId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableClick = (e, row) => {
    e.preventDefault;
    if (loading == false) {
      setAmount(row.amount);
      setCategory(row.category);
      setNote(row.note);
      if (row.dateEpoc != 0) {
        const milliseconds = row.dateEpoc * 1000;
        const dateObject = new Date(milliseconds);
        const formattedDate = formatToMMDDYYYY(dateObject);
        setDate(formattedDate);
      }
    }
  };

  function formatToMMDDYYYY(date) {
    const d = new Date(date); // Ensure it's a Date object
    let month = (d.getMonth() + 1).toString(); // getMonth() is 0-indexed
    let day = d.getDate().toString();
    const year = d.getFullYear().toString();

    // Add leading zeros if month or day is a single digit
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return month + "/" + day + "/" + year;
  }
  const validateForm = () => {
    let newErrors = {};
    if (!date) newErrors.date = "Date is required.";
    if (!amount) newErrors.amount = "Amount is required.";
    if (!category || category == "default")
      newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const incomeHistory = () => {
    return (
      <div id="income-history">
        <div id="income-header">Income History</div>
        <div class="table-container">
          <table class="table table-hover">
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
    event.preventDefault;
    if (validateForm()) {
      const postData = {
        date: date,
        amount: amount,
        category: category,
        note: note,
      };
      try {
        const payload = JSON.stringify(postData);
        const response = await fetch("http://localhost:8080/income", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Success:", result);
        setAlertVisible(true);
        await fetchData();
        incomeHistory();
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create post.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/incomes"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      incomeHistory();
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
      <tr key={row.incomeId} onClick={(e) => handleTableClick(e, row)}>
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
    <div id="income-box">
      <div id="add-income">
        <div id="income-header">Income Form</div>
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
              <option value="Salary">Salary</option>
              <option value="Bonus">Bonus</option>
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
              Add Income
            </button>
            {alertVisible && (
              <SuccessMessage
                message="Income added successfully!"
                onClose={() => setAlertVisible(false)}
              />
            )}
          </div>
        </form>
      </div>
      {incomeHistory()}
    </div>
  );
}
export default Income;
