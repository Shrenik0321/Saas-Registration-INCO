import React, { useState } from "react";
import { Form, Input, Button, Dropdown } from "semantic-ui-react";
import FullPageLoader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    companySize: "",
    phoneNumber: "",
    vendor: "",
    priority: "",
    parentChild: "",
    workshops: "",
    moveAssets: "",
    challenges: "",
    spareParts: "",
    track: "",
    managesAssets: "",
    industry: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const companySizeOptions = [
    { key: "1-10", value: "1-10", text: "1-10" },
    { key: "10-50", value: "10-50", text: "10-50" },
    { key: "50-100", value: "50-100", text: "50-100" },
    { key: "100-500", value: "100-500", text: "100-500" },
    { key: "500-1000", value: "500-1000", text: "500-1000" },
  ];

  const manageOptions1 = [
    { key: "yes", value: "Yes", text: "Yes" },
    { key: "no", value: "No", text: "No" },
    { key: "Both", value: "Both", text: "Both" },
  ];

  const manageOptions2 = [
    { key: "yes", value: "Yes", text: "Yes" },
    { key: "no", value: "No", text: "No" },
  ];

  const industryOptions = [
    { key: "it", value: "IT", text: "IT" },
    { key: "finance", value: "Finance", text: "Finance" },
    { key: "healthcare", value: "Healthcare", text: "Healthcare" },
    { key: "education", value: "Education", text: "Education" },
    { key: "manufacturing", value: "Manufacturing", text: "Manufacturing" },
    { key: "retail", value: "Retail", text: "Retail" },
    { key: "construction", value: "Construction", text: "Construction" },
    { key: "transportation", value: "Transportation", text: "Transportation" },
    { key: "real-estate", value: "Real Estate", text: "Real Estate" },
    { key: "hospitality", value: "Hospitality", text: "Hospitality" },
    { key: "marketing", value: "Marketing", text: "Marketing" },
    { key: "legal", value: "Legal", text: "Legal" },
    { key: "consulting", value: "Consulting", text: "Consulting" },
    { key: "energy", value: "Energy", text: "Energy" },
    { key: "nonprofit", value: "Non-Profit", text: "Non-Profit" },
    {
      key: "telecommunications",
      value: "Telecommunications",
      text: "Telecommunications",
    },
    { key: "agriculture", value: "Agriculture", text: "Agriculture" },
    { key: "other", value: "Other", text: "Other" },
  ];

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { companySize, industry } = formData;

    if (companySize === "") {
      toast.error("Please select a company size.");
      return;
    }
    if (industry === "") {
      toast.error("Please select an industry.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // await axios.post("http://localhost:3003/enroll-client", {
      //   addInfo: formData,
      // });
      await axios.post("https://cmmsapi.encyte.tech:8093/enroll-client", {
        addInfo: formData,
      });

      toast.success("Enrolled Successfully!");
      navigate("/success", { state: formData }); // Navigate to the next page if needed
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <FullPageLoader text="test" />}
      <div className="flex flex-col items-center mx-auto my-10 w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <img src="/blue.png" alt="FieldSmart Logo" className="w-1/2 mb-6" />

        <Form onSubmit={handleSubmit} className="w-full space-y-4">
          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Name"
            />
          </Form.Field>

          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Company Name:
            </label>
            <Input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Company Name"
            />
          </Form.Field>

          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Admin Account User Email:
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Email"
            />
          </Form.Field>

          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Company Size:
            </label>
            <Dropdown
              placeholder="Select Company Size"
              fluid
              selection
              options={companySizeOptions}
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              required
              className="w-full"
            />
          </Form.Field>

          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Industry:
            </label>
            <Dropdown
              placeholder="Select Industry"
              fluid
              selection
              options={industryOptions}
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full"
            />
          </Form.Field>

          <Form.Field>
            <label className="block text-sm font-medium text-gray-700">
              Does your company use the CMMS to manage its own assets, assets
              for other customers, or both?
            </label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions1}
              name="managesAssets"
              value={formData.managesAssets}
              onChange={handleChange}
              required
              className="w-full"
            />
          </Form.Field>

          <div className="flex items-center justify-center mt-6">
            <Button
              type="submit"
              style={{
                backgroundColor: "var(--dark-blue)",
                color: "white",
              }}
              className="px-6 py-2 rounded-lg"
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
