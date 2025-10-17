"use client";

import React from "react";

const AutoLogoutPopup = ({ countdown, onStay, onLogout }) => {
  if (countdown === null) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Session Expiring</h5>
          </div>
          <div className="modal-body">
            <p>
              You will be logged out in <strong>{countdown}</strong> seconds due to
              inactivity.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onStay}>
              Stay Logged In
            </button>
            <button className="btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLogoutPopup;
