import { useEffect, useRef, useState } from 'react';

export default function ManualEntryPopup({
    isOpen,
    onClose,
    onSaved,
    title,
    inputs,
    endpoint = 'http://localhost:3001/manual-entry',
    extraData = {}, // fields to send that aren't in the form, e.g. { user_id }
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

        const form = e.currentTarget;
        const values = Object.fromEntries(new FormData(e.currentTarget).entries());
        setError('');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, ...extraData }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const saved = await response.json();
            form.reset();
            onSaved?.(saved); // let Dashboard only refresh / select new item
            onClose(); // close only after a successful save
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Unable to submit entry.');
        }
    };


      // in the form:
  //   {input.options
  //     ? <select name={input.name} defaultValue="" required>...</select>
  //     : <input name={input.name} type={input.type ?? "text"} placeholder={input.label} aria-label={input.label} />}
  //   <button type="submit">Done!</button>   ← remove onClick={onClose}
  return (
    <dialog
      ref={popupRef}
      onClose={onClose}
    >
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <div key={input.name}>
            {input.options ? (
              <select name={input.name} defaultValue="" required>
                <option value="" disabled>{input.label}</option>
                {input.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
               ))}
              </select>
            ) : (
              <input
                name={input.name}
                type={input.type ?? "text"}
                placeholder={input.label}
                aria-label={input.label}
              />
            )}
          </div>
        ))}
        <button type="submit">Done!</button>
        {error && <p role="alert">{error}</p>}
        <div></div>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </dialog>
  );
}