import { useState } from 'react';
import ManualEntryPopup from '../components/ManualEntryPopup';

export default function Dashboard({navigatePage}) {

  const [flightPopupOpen, setFlightPopupOpen] = useState(false);
  const flightInputs = ["Departure", "Destination", "Departure Date", "Destination Date", "Budget (USD)", "Flight ID"];

  const [accommodationsPopupOpen, setAccommodationsPopupOpen] = useState(false);
  const accommodationsInputs = ["Place name", "Street Address", "Address Line 2", "City", "State/Province", "Zip Code", "Country",
    "Check-in date", "Check-out date", "Total cost"];

  const [activityPopupOpen, setActivityPopupOpen] = useState(false);
  const activityInputs = ["Activity name", "Location", "Date", "Start time", "End time", "Cost"];

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

      <div style={{height:"rem"}}></div>

      <button name="accommodations" onClick={() => setAccommodationsPopupOpen(true)}>accommodations</button>
      <ManualEntryPopup 
        isOpen={accommodationsPopupOpen} 
        onClose={()=> setAccommodationsPopupOpen(false)} 
        title="Accommodations Information"
        inputs={accommodationsInputs}
      />

      <div style={{height:"rem"}}></div>

      <button name="activity" onClick={() => setActivityPopupOpen(true)}>activity</button>
      <ManualEntryPopup 
        isOpen={activityPopupOpen} 
        onClose={()=> setActivityPopupOpen(false)} 
        title="Activty Information"
        inputs={activityInputs}
      />

      <div style={{height:"2rem"}}></div>
      
      <h2>Log Out:</h2>
      <button onClick={() => navigatePage("login")}>log out</button>
    </div>
  );
}