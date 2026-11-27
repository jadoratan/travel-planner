import { useEffect, useRef, useState } from 'react';
import './ManualEntryPopup.css';
import './AIPopup.css';


// fixed-height box that scrolls on its own, so a long reply doesn't push the inputs and buttons off screen
function AIResponse({response}){
  const boxRef = useRef(null);

  // jump back to the top whenever a new response comes in
  useEffect(() => {
    if (boxRef.current) { boxRef.current.scrollTop = 0; }
  }, [response]);

  return(
    <div
      ref={boxRef}
      className="ai-response"
      tabIndex={0} // lets keyboard users focus the box and scroll it with arrow keys
      aria-label="Gemini's response"
      aria-live="polite"
    >
      <p className="ai-response-label">Gemini</p>
      <p className="ai-response-text">{response}</p>
    </div>
  );
}

export default function AIPopup({
    isOpen,
    onClose,
    onSaved,
    title,
    endpoint = 'http://localhost:3001/chat',
    extraData = {}, // fields to send that aren't in the form, e.g. { user_id }
}){

  //gemini response
  const [gemResponse, setGemResponse] = useState('');

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
        const values = Object.fromEntries(new FormData(form).entries());
        setError('');
        setGemResponse('thinking...');
      
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values}),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const saved = await response.json();
            setGemResponse(saved.reply);
            
        } catch (submitError) {
            setGemResponse(''); // clear "thinking..." so it doesn't stay on screen next to the error
            setError(submitError instanceof Error ? submitError.message : 'Unable to send message.');
        }
        
    };
  
    const closePopup = () => {
      setGemResponse('');
      setError('');
      onClose();
    }
     

  return (
    <dialog
      ref={popupRef}
      onClose={onClose}
      className = "popup"
    >
      <h2 id = "popup-title" className = "popup-title">Chat with Gemini for Suggestions</h2>
      <form className = "popup-form" onSubmit={handleSubmit}>

        <input name = "trip" placeholder="your trip destination..."/>
        <input name = "message" placeholder="your question here..."/>

        {gemResponse !== "" && <AIResponse response = {gemResponse}/>}

        <button type="submit" className="popup-button">Ask!</button>
        {error && <p className="popup-error" role="alert">{error}</p>}
        <div></div>
        <button type="reset" onClick={closePopup} className="popup-button popup-button--secondary">Close</button>
      </form>
    </dialog>
  );

}
