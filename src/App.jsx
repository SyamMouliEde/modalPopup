import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import ModalPopup from "./ModalPopup";
import ModalPopup from "./Modals";

function App() {
  const [open, setOpen] = useState(true); // Set true for demo

  return (
    <div className="p-4" style={{ minHeight: "100vh", background: "#f6f8fa" }}>
      <button className="btn btn-primary mb-2" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <ModalPopup isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
