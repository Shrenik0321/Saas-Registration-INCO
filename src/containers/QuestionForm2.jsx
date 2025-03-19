// Details.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Dropdown } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react"; // Import Loader from Semantic UI

const companySizeOptions = [
  { key: "1-10", value: "1-10", text: "1-10" },
  { key: "10-50", value: "10-50", text: "10-50" },
  { key: "50-100", value: "50-100", text: "50-100" },
  { key: "100-500", value: "100-500", text: "100-500" },
  { key: "500-1000", value: "500-1000", text: "500-1000" },
];

const manageAssetsOptions = [
  { key: "yes", value: "yes", text: "Yes" },
  { key: "no", value: "no", text: "No" },
  { key: "Both", value: "Both", text: "Both" },
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

const Details2 = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    ...location.state,
    challenges: "",
    spareParts: "",
    track: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { challenges, spareParts, track } = formData;

    // Validation
    if (!challenges) {
      toast.error("Please enter the challenges you're facing.");
      return;
    }

    if (!spareParts) {
      toast.error("Please enter how you manage spare parts and inventory.");
      return;
    }

    if (!track) {
      toast.error("Please specify the KPIs or metrics you want to track.");
      return;
    }
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `https://cmmsapi.encyte.tech:8093/enroll-client`,
        {
          addInfo: formData,
        }
      );
      console.log(response.data.addedInfo.id);
      toast.success("Enrolled Successfully!");
      navigate(`/success`, { state: formData }); // Navigate to the next page if needed
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto my-10 w-1/2">
      <h2>FieldSmart SaaS Additional Details</h2>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Form onSubmit={handleSubmit} className="w-full">
          <Form.Field>
            {/* <Form.Field>
            <label>
              Do you have the same maintenance schedule for all assets?
            </label>

            <Input
              type="text"
              name="text"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Field> */}
            <Form.Field>
              <label>
                What challenges are you facing in your current maintenance
                management process?
              </label>

              <Input
                type="text"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>How do you manage spare parts and inventory?</label>

              <Input
                type="text"
                name="spareParts"
                value={formData.spareParts}
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>
                Do you have specific KPIs or metrics you want to track using our
                system?
              </label>

              <Input
                type="text"
                name="track"
                value={formData.track}
                onChange={handleChange}
                required
              />
            </Form.Field>
          </Form.Field>
          <div className="flex items-center justify-center mt-10">
            <Button
              type="submit"
              disabled={loading} // Disable button during loading
              style={{ backgroundColor: "var(--dark-blue)", color: "white" }}
            >
              Next
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Details2;
