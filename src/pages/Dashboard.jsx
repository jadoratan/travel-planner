import { useState } from 'react';
import ManualEntryPopup from '../components/ManualEntryPopup';

export default function Dashboard({navigatePage}) {

  const [flightPopupOpen, setFlightPopupOpen] = useState(false);
  const flightInputs = ["Departure", "Destination", "Departure Date", "Destination Date", "Budget (USD)", "Flight ID"]

  return (
    <div>
      <h1>DASHBOARD PAGE</h1>

      <h2>Add Your Plans!</h2>
      <button name="flight" onClick={() => setFlightPopupOpen(true)}>flight ✈️</button>
      <ManualEntryPopup 
        isOpen={flightPopupOpen} 
        onClose={()=> setFlightPopupOpen(false)} 
        title="Flight Information"
        inputs={flightInputs}
      />

      <div style={{height:"2rem"}}></div>
      
      <h2>Log Out:</h2>
      <button onClick={() => navigatePage("login")}>log out</button>
    </div>
  );
}