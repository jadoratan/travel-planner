import { useEffect, useRef } from 'react';

export default function ManualEntryPopup({isOpen, onClose, title, inputs}) {

  //useRef helps close the <dialog> / popup modal which is hidden initially
  const popupRef = useRef(null);

  useEffect(() => {
    const popup = popupRef.current;

    if (!popup) { return; }

    if (isOpen) {
      popup.showModal();
    }
    else {
      popup.close();
    }

  }, [isOpen]); //useEffect() runs when isOpen changes

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the whole app from reloading on submit
  };

  return (
    <dialog
      ref={popupRef}
      onClose={onClose}
    >
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <div key={i}>
            {typeof input === "string" ? (
              <input placeholder={input} />
            ) : (
              <select defaultValue="">
                <option value="" disabled>{input.label}</option>
                {input.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit" onClick={onClose}>Done!</button>
        <div></div>
        <button type="button" onClick={onClose}>cancel</button>
      </form>
    </dialog>
  );
}