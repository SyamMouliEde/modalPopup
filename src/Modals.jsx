import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ModalPopup = ({ isOpen, onClose }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [budgetType, setBudgetType] = useState(""); // 'CBO' or 'ABO' selected by user
  const [campaignName, setCampaignName] = useState("");
  const [campaignBudget, setCampaignBudget] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState([]);
  
  const nameRef = useRef();

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/c3c32304-e31c-4253-8e03-92b3c2cf3502")
      .then((res) => setCampaigns(res.data.data || []));
  }, []);

  // Update suggestions based on campaignName and budgetType
  useEffect(() => {
    if (!campaignName || !budgetType) {
      setNameSuggestions([]);
      return;
    }
    const filtered = campaigns
      .filter(
        (c) =>
          c.budgetType === budgetType &&
          c.name.toLowerCase().includes(campaignName.toLowerCase())
      )
      .map((c) => c.name);
    setNameSuggestions(filtered.slice(0, 5));
  }, [campaignName, budgetType, campaigns]);

  const isFormValid =
    campaignName.trim() && budgetType && (budgetType !== "CBO" || !!campaignBudget);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 10,
          width: 570,
          maxWidth: "95vw",
          padding: 24,
          boxShadow: "0 6px 24px rgba(0,0,0,0.14)",
        }}
      >
        <h5 className="mb-3 fw-semibold">Create a New Campaign</h5>
        <p style={{color:'gray'}}>copy settings from an existing ad set. Ads wont be included.</p>
        <hr></hr>
<div style={{ display: "flex", marginLeft:'150px', gap: "8px" }}>
  <div
    style={{
      backgroundColor: "blue",
      color: "white",
      borderRadius: "50%",   
      width: "24px",
      height: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    1
  </div>
  Create Campaign
</div>
<hr></hr>
        {/* Budget Type Selector */}
    <div className="mb-3">
      <label className="form-label">Select Campaign to copy settings from</label>
      <select
        className="form-select"
        value={budgetType}
        onChange={(e) => setBudgetType(e.target.value)}
      >
        <option value="">Select Budget Type</option>
        <option value="CBO">Desktop Users - CBO</option>
        <option value="ABO">Desktop Users - ABO</option>
      </select>

      {/* Show selected type as a badge */}
      {budgetType && (
        <div className="mt-3 flex items-center gap-2">
          <span className="fw-bold">Selected:</span>
<span
  style={{
    backgroundColor: "#d4edda", // light green
    color: "black",            // black text
    padding: "4px 12px",
    borderRadius: "50px",
    fontWeight: "500",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  }}
>            {budgetType}
          </span>
        </div>
      )}
    </div>

        {/* Campaign Name Input with Suggestions */}
        <div className="mb-3 position-relative">
          <label className="form-label">Name of the New Campaign</label>
          <input
            className="form-control"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            autoComplete="off"
            ref={nameRef}
          />
          {nameSuggestions.length > 0 && campaignName && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #eee",
                zIndex: 1100,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {nameSuggestions.map((sug, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                  onMouseDown={() => {
                    setCampaignName(sug);
                    setNameSuggestions([]);
                  }}
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Campaign Budget: only show if CBO */}
        {budgetType === "CBO" && (
          <div className="mb-3">
            <label className="form-label">Campaign Budget</label>
            <input
              type="number"
              min={1}
              placeholder="Enter Campaign Budget"
              className="form-control"
              value={campaignBudget}
              onChange={(e) => setCampaignBudget(e.target.value)}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isFormValid}
            onClick={() => {
              alert("Campaign Created!");
              onClose();
            }}
          >
            Create and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
