// Details.js
import React, { useState } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

const Details = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    ...location.state,
    companySize: "",
    phoneNumber: "",
    vendor: "",
    priority: "",
    parentChild: "",
    workshops: "",
    moveAssets: "",
  });
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`https://cmmsapi.encyte.tech:8093/enroll-client`, {
        addInfo: formData,
      });
      toast.success("Enrolled Successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  const handleNext = () => {
    const {
      companySize,
      industry,
      managesAssets,
      vendor,
      priority,
      parentChild,
      workshops,
      moveAssets,
    } = formData;

    if (companySize === "") {
      toast.error("Please select a company size.");
      return;
    }
    if (industry === "") {
      toast.error("Please select an industry.");
      return;
    }
    if (managesAssets === "") {
      toast.error("Please select an option for asset management.");
      return;
    }
    if (vendor === "") {
      toast.error("Please select whether you need to manage vendors.");
      return;
    }
    if (priority === "") {
      toast.error("Please select whether you need to set priority on assets.");
      return;
    }
    if (parentChild === "") {
      toast.error(
        "Please select whether you need parent/child asset relationships."
      );
      return;
    }
    if (workshops === "") {
      toast.error(
        "Please select whether you have workshops or service centers."
      );
      return;
    }
    if (moveAssets === "") {
      toast.error("Please select whether you frequently move assets.");
      return;
    }

    // If all validations pass, proceed to next page
    navigate("/third-page", { state: formData });
  };

  return (
    <div className="flex flex-col items-center mx-auto my-10 w-1/2">
      <h2>FieldSmart SaaS Additional Details</h2>
      <Form onSubmit={handleNext} className="w-full">
        <Form.Field>
          <label>Company Size:</label>
          <Dropdown
            placeholder="Select Company Size"
            fluid
            selection
            options={companySizeOptions}
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Field>
            <label>Industry:</label>
            <Dropdown
              placeholder="Select Industry"
              fluid
              selection
              options={industryOptions}
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>
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
            />
          </Form.Field>
          <Form.Field>
            <label>Do you need to manage vendors?</label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions2}
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Do you need to set priority on assets?</label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions2}
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Do you need parent-asset/child-asset relationships?</label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions2}
              name="parentChild"
              value={formData.parentChild}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Do you have workshops or service centers?</label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions2}
              name="workshops"
              value={formData.workshops}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>
              Do you frequently move assets between workshops or sites?
            </label>
            <Dropdown
              placeholder="Select Yes or No"
              fluid
              selection
              options={manageOptions2}
              name="moveAssets"
              value={formData.moveAssets}
              onChange={handleChange}
              required
            />
          </Form.Field>
        </Form.Field>
        <div className="flex items-center justify-center mt-10">
          <Button
            type="submit"
            style={{ backgroundColor: "var(--dark-blue)", color: "white" }}
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Details;
