import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

import { createTransaction } from "../api/transactionApi";


export default function Newform() {

  const [value, setvalue] = useState({
    date: "",
    user_id:"",
    type: "",
    name: "",
    category: "",
    amount: ""
  });


  const handleChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const transaction = {
      user: { id: Number(value.user_id) },
      date: value.date,
      type: value.type,
      category: value.category,
      amount: Number(value.amount),
      name: value.name
    };

  try {
    // Send the transaction to the backend
    const response = await createTransaction(transaction);

    console.log("Saved transaction:", response.data);

    alert("Transaction saved successfully!");

    // Clear the form after successfully saving
    setvalue({
      date: "",
      user_id:"",
      type: "",
      category: "",
      amount: "",
      name: ""
    });

  } catch (error) {
    console.error("Error saving transaction:", error);

    alert(
      error.response?.data?.message ||
      "Failed to save transaction. Please check your backend."
    );
  }
};

  return (
    <div>
      <div className="newFormContainer">
        <div className='newForm'>

          <div className='newHeader'>

            <div className="form-icon">
              <i className="fas fa-seedling"></i>
            </div>

            <h2>Add New Income Or Expense</h2>
          </div>

          <Form onSubmit={handleSubmit}>

            <div className='newformgrid'>

              {/* Name */}
              <div className="formRow">
                <label>Name:</label>

                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Date */}
              <div className="formRow">
                <label>Date:</label>

                <Form.Control
                  type="date" name="date" value={value.date} onChange={handleChange} required
                />
              </div>

              {/* User ID */}
              <div className="formRow">
                <label>User ID:</label>

                <Form.Control
                  type="number"
                  placeholder="Enter user ID"
                  name="user_id"
                  value={value.user_id}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  required
                />
              </div>

              {/* Type */}
              <div className="formRow">
                <label>Type:</label>

                <Form.Select
                  name="type" value={value.type} onChange={handleChange} required
                >
                  <option value="">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </Form.Select>
              </div>

  

              {/* Category */}
              <div className="formRow">
                <label>Category :</label>

                <Form.Select
                  name="category"
                  value={value.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Bill">Bill</option>
                  <option value="Food">Food</option>
                  <option value="App">App</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </div>

              {/* Price */}
              <div className="formRow">
                <label>Value :</label>

                <Form.Control
                  type="number"
                  placeholder="Enter value"
                  name="amount"
                  value={value.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <Button variant="primary" type="submit">
                Submit
              </Button>

            </div>

          </Form>

        </div>
      </div>
    </div>
  );
}