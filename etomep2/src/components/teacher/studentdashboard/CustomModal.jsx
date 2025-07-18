import React from 'react';
import './CustomModal.css';

export const WarningIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#FFF7E0"/>
    <path d="M20 12v8" stroke="#F6B800" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="20" cy="27" r="1.5" fill="#F6B800"/>
  </svg>
);

export const SuccessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#E9F9F1"/>
    <path d="M13 21l5 5 9-9" stroke="#2BC155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CustomModal({ open, icon, title, message, onCancel, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', onlyConfirm = false }) {
  if (!open) return null;
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        {icon && <div className="custom-modal-icon">{icon}</div>}
        <h2 className="custom-modal-title">{title}</h2>
        <p className="custom-modal-message">{message}</p>
        <div className="custom-modal-actions">
          {!onlyConfirm && <button onClick={onCancel} className="custom-modal-cancel">{cancelText}</button>}
          {!onlyConfirm &&<button onClick={onConfirm} className="custom-modal-confirm">{confirmText}</button>}
        </div>
      </div>
    </div>
  );
} 