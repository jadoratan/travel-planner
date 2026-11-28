import { useEffect, useRef, useState } from 'react';
import './ManualEntryPopup.css';

// Asks "are you sure?" before something is deleted. Uses the same <dialog> popup
// and styles as ManualEntryPopup so it matches the rest of the dashboard.
export default function ConfirmPopup({
    isOpen,
    onClose,
    onConfirm, // async function that does the delete; throw to show an error
    title,
    message,
    confirmLabel = 'Delete',
}){
    const popupRef = useRef(null);
    const [error, setError] = useState('');

    useEffect(() => {
      const popup = popupRef.current;

      if (!popup) { return; }

      if (isOpen) {
        popup.showModal();
      }
      else {
        popup.close();
      }

    }, [isOpen]);

    const handleClose = () => {
        setError('');
        onClose();
    };

    const handleConfirm = async () => {
        setError('');
        try {
            await onConfirm();
            onClose(); // close only after a successful delete
        } catch (confirmError) {
            setError(confirmError instanceof Error ? confirmError.message : 'Unable to delete.');
        }
    };

  return (
    <dialog
      ref={popupRef}
      onClose={handleClose}
      className = "popup"
    >
      <h2 className = "popup-title">{title}</h2>
      <p className = "popup-message">{message}</p>
      <div className = "popup-actions">
        <button type="button" onClick={handleConfirm} className="popup-button popup-button--danger">{confirmLabel}</button>
        <button type="button" onClick={handleClose} className="popup-button popup-button--secondary">Cancel</button>
      </div>
      {error && <p className="popup-error" role="alert">{error}</p>}
    </dialog>
  );
}
