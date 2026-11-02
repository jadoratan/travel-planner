import { useEffect, useRef, useState } from 'react';

export default function ManualEntryPopup({
    isOpen,
    onClose,
    title,
    inputs,
    endpoint = 'http://localhost:3001/manual-entry',
}){

    //useRef helps close the <dialog> / popup modal which is hidden initially
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

  }, [isOpen]); //useEffect() runs when isOpen changes

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents the whole app from reloading on submit

        const values = Object.fromEntries(new FormData(e.currentTarget).entries());
        setError('');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            onClose();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Unable to submit entry.');
        }
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
              <input name={input} aria-label={input} placeholder={input} />
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
        {error && <p role="alert">{error}</p>}
        <div></div>
        <button type="button" onClick={onClose}>cancel</button>
      </form>
    </dialog>
  );
}