import React, { useState } from "react";
import { Card, Container, Grid, Button } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom"; // Assumes you're using react-router-dom for navigation

// Sample Templates

const SelectTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate(); // To navigate to another page
  const location = useLocation();
  const [formData, setFormData] = useState({
    ...location.state,
  });
  const [templateA, setTemplateA] = useState(() => {
    let template = {};

    if (formData.workshops) {
      template.moveAssets = formData.moveAssets; // Set value from location.state
    }
    (template.make = "Spectra"),
      (template.serialNo = "SAI-DO-SP-JULY2024-14614"),
      (template.type = "In-Use"),
      (template.status = "Active"),
      (template.region = "Colombo North");

    return template;
  });

  const [templateB, setTemplateB] = useState(() => {
    let template = {};

    if (formData.managesAssets) {
      template.isCompanyManaged = "Yes";
    }

    (template.make = "Spectra"),
      (template.serialNo = "SAI-DO-SP-JULY2024-14614"),
      (template.type = "In-Use"),
      (template.status = "Active"),
      (template.region = "Colombo North");

    return template;
  });

  const templates = [
    {
      id: 1,
      name: "Template A",
      description: "A simple template for beginners.",
      values: templateA,
    },
    {
      id: 2,
      name: "Template B",
      description: "An advanced template for large companies.",
      values: templateB,
    },
  ];

  // Handle template selection
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    if (selectedTemplate) {
      navigate("/upload-assets", { state: selectedTemplate }); // Navigate with selected template data
    } else {
      alert("Please select a template before proceeding.");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid>
        {/* Left Side: List of Templates */}
        <Grid.Column width={8}>
          <h2>Select a Template to Upload Bulk Assets</h2>
          {templates.map((template) => (
            <Card
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                padding: "10px",
                border:
                  selectedTemplate?.id === template.id
                    ? "2px solid blue"
                    : "1px solid #ddd",
                backgroundColor:
                  selectedTemplate?.id === template.id ? "#e6f7ff" : "white",
              }}
            >
              <Card.Content>
                <Card.Header>{template.name}</Card.Header>
                <Card.Meta>{template.description}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>

        {/* Right Side: Display Selected Template Details */}
        <Grid.Column width={8}>
          <h2>
            Example Template Details: Please add these details and create a CSV
            file.
          </h2>
          {selectedTemplate ? (
            <div
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>Name:</strong> {selectedTemplate.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedTemplate.description}
              </p>
              {Object.entries(selectedTemplate.values).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                </p>
              ))}
            </div>
          ) : (
            <p>Please select a template to view its details.</p>
          )}

          {/* Next Button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              color="blue"
              onClick={handleNextClick}
              disabled={!selectedTemplate}
              style={{ backgroundColor: "var(--dark-blue)", color: "white" }}
            >
              Next
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SelectTemplate;
