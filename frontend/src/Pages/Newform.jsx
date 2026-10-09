import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

export default function Newform() {

  const [value, setvalue] = useState({
    date: "",
    type: "",
    name: "",
    category: "",
    price: ""
  });


  const handleChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingValue =
      JSON.parse(localStorage.getItem("values")) || [];

    const setPrice = value.type==="Income" ? Number(value.price) : -Number(value.price);
    const newValue = {
      ...value,
      price:setPrice,
      id: Date.now()
    };

    const updatedValue = [...existingValue, newValue];

    localStorage.setItem("values", JSON.stringify(updatedValue));

        console.log("Form Data:", value);  
    alert(`Date: ${value.date}\nType: ${value.type}\nName: ${value.name}\nCategory: ${value.category}\nValue: ${newValue.price}`);

    setvalue({
      date: "",
      type: "",
      name: "",
      category: "",
      price: ""
    });
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

              {/* Date */}
              <div className="formRow">
                <label>Date:</label>

                <Form.Control
                  type="date" name="date" value={value.date} onChange={handleChange}
                />
              </div>

              {/* Type */}
              <div className="formRow">
                <label>Type:</label>

                <Form.Select
                  name="type" value={value.type} onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </Form.Select>
              </div>

              {/* Name */}
              <div className="formRow">
                <label>Name :</label>

                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="formRow">
                <label>Category :</label>

                <Form.Select
                  name="category"
                  value={value.category}
                  onChange={handleChange}
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
                  name="price"
                  value={value.price}
                  onChange={handleChange}
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