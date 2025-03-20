import React, { useState } from "react";
import { Form, Input, Button, Dropdown } from "semantic-ui-react";
import FullPageLoader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    companySize: "",
    contactNo: "",
    industry: "",
    modules: [],
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const companySizeOptions = [
    { key: "1-10", value: "1-10", text: "1-10" },
    { key: "10-50", value: "10-50", text: "10-50" },
    { key: "50-100", value: "50-100", text: "50-100" },
    { key: "100-500", value: "100-500", text: "100-500" },
    { key: "500-1000", value: "500-1000", text: "500-1000" },
  ];

  const industryOptions = [
    { key: "it", value: "IT", text: "IT" },
    { key: "finance", value: "Finance", text: "Finance" },
    { key: "healthcare", value: "Healthcare", text: "Healthcare" },
    { key: "education", value: "Education", text: "Education" },
    { key: "manufacturing", value: "Manufacturing", text: "Manufacturing" },
  ];

  const moduleOptions = [
    { key: "customers", value: "Customers Module", text: "Customers Module" },
    { key: "site", value: "Site Module", text: "Site Module" },
    { key: "assets", value: "Assets Module", text: "Assets Module" },
    { key: "inventory", value: "Inventory Module", text: "Inventory Module" },
    {
      key: "workOrders",
      value: "Work Orders Module",
      text: "Work Orders Module",
    },
    {
      key: "customerServices",
      value: "Customer Services Module",
      text: "Customer Services Module",
    },
  ];
  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.contactNo.match(/^\d{10}$/))
      newErrors.contactNo = "Enter a valid 10-digit phone number";
    if (!formData.companySize) newErrors.companySize = "Select company size";
    if (!formData.industry) newErrors.industry = "Select industry";
    if (formData.modules.length === 0)
      newErrors.modules = "Select at least one module";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setLoading(true);
    try {
      // await axios.post("http://localhost:3003/enroll-client", {
      //   addInfo: formData,
      // });
      await axios.post("https://cmmsapi.encyte.tech:8093/enroll-client", {
        addInfo: formData,
      });
      toast.success("Enrolled Successfully!");
      navigate("/success", { state: formData });
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullPageLoader text="Submitting..." />}
      <div className="flex flex-col items-center mx-auto my-6 w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <img src="/blue.png" alt="FieldSmart Logo" className="w-1/2 mb-4" />

        <Form onSubmit={handleSubmit} className="w-full space-y-3">
          <Form.Field error={!!errors.name}>
            <label>Name:</label>
            <Input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </Form.Field>

          <Form.Field error={!!errors.companyName}>
            <label>Company Name:</label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName}</span>
            )}
          </Form.Field>

          <Form.Field error={!!errors.email}>
            <label>Email:</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </Form.Field>

          <Form.Field error={!!errors.contactNo}>
            <label>Contact Number:</label>
            <Input
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
            />
            {errors.contactNo && (
              <span className="text-red-500">{errors.contactNo}</span>
            )}
          </Form.Field>

          <Form.Field error={!!errors.companySize}>
            <label>Company Size:</label>
            <Dropdown
              selection
              options={companySizeOptions}
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
            />
            {errors.companySize && (
              <span className="text-red-500">{errors.companySize}</span>
            )}
          </Form.Field>

          <Form.Field error={!!errors.industry}>
            <label>Industry:</label>
            <Dropdown
              selection
              options={industryOptions}
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
            {errors.industry && (
              <span className="text-red-500">{errors.industry}</span>
            )}
          </Form.Field>

          <Form.Field error={!!errors.modules}>
            <label>Modules:</label>
            <Dropdown
              multiple
              selection
              options={moduleOptions}
              name="modules"
              value={formData.modules}
              onChange={handleChange}
            />
            {errors.modules && (
              <span className="text-red-500">{errors.modules}</span>
            )}
          </Form.Field>

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              style={{ backgroundColor: "var(--dark-blue)", color: "white" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Home;
