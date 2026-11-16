import { useEffect, useState } from 'react';
import ManualEntryPopup from '../components/ManualEntryPopup';
import TripSidebar from '../components/TripSidebar';  
import {ActivityInfoDisplayCard, AccomodationInfoDisplayCard, TransportInfoDisplayCard} from '../components/InfoDisplayCard'

import './Dashboard.css';

export default function Dashboard({navigatePage, userId}) {


  /* MANUAL ENTRY FUNCTIONALITY*/
  const [transportationPopupOpen, setTransportationPopupOpen] = useState(false);
  const transportationInputs = [
    { name: "type", label: "Mode of transport", options: ["Flight", "Train", "Bus", "Car", "Ferry", "Other"] },
    { name: "depart_location", label: "Departing From" },
    { name: "arrive_location", label: "Arriving At" },
    { name: "depart_date", label: "Departure Date" },
    { name: "depart_time", label: "Departure Time" },
    { name: "arrive_date", label: "Arrive Date" },
    { name: "arrive_time", label: "Arrive Time" },
    { name: "cost", label: "Cost" },
    { name: "confirmation", label: "Flight ID / Reference Number" },
  ];

  const [accommodationsPopupOpen, setAccommodationsPopupOpen] = useState(false);
  const accommodationsInputs = [
    { name: "name", label: "Place Name" },
    { name: "street_address", label: "Street Address" },
    { name: "address_line_2", label: "Address Line 2" },
    { name: "city", label: "City" },
    { name: "state_province", label: "State/Province" },
    { name: "zip_code", label: "Zip Code" },
    { name: "country", label: "Country" },
    { name: "check_in", label: "Check-in Date" },
    { name: "check_out", label: "Check-out Date" },
    { name: "cost", label: "Total Cost" },
    { name: "confirmation", label: "Confirmation Number"}
  ];

  const [activityPopupOpen, setActivityPopupOpen] = useState(false);
  const activityInputs = [
    { name: "name", label: "Activity Name" },
    { name: "location", label: "Location" },
    { name: "date", label: "Date" },
    { name: "start_time", label: "Start Time" },
    { name: "end_time", label: "End Time" },
    { name: "cost", label: "Cost" },
  ];

  const [newTripPopupOpen, setNewTripPopupOpen] = useState(false);
  const tripInputs = [
    { name: "name", label: "Trip Name" },
    { name: "destination", label: "Destination" },
    { name: "start_date", label: "Start Date" },
    { name: "end_date", label: "End Date" },
  ];



  /* TRIP FILTER FUNCTIONALITY*/

  //placeholder
  const [trips, setTrips] = useState([]);
  const [currentTripID, setCurrentTripID] = useState(null);

  // load this user's saved trips whenever the logged-in user changes
  useEffect(() => {
    if (!userId) { return; }
    fetch(`http://localhost:3001/trips?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) { throw new Error(`Request failed with status ${res.status}`); }
        return res.json();
      })
      .then((data) => {
        setTrips(data);
        if (data.length > 0) { setCurrentTripID(data[0].id); }
      })
      .catch((err) => console.error(err));
  }, [userId]);

  // todo: do we still need this?
  const displayTrip = trips.find(t => t.id === currentTripID);

  function filterCurrentTrip(id){
    setCurrentTripID(id);
  }


  return (
    <div class="dashboard">

      <div class="sidebar">
        <button name="new trip" onClick={() => setNewTripPopupOpen(true)}>+ New Trip </button>
        <ManualEntryPopup
          isOpen={newTripPopupOpen}
          onClose={() => setNewTripPopupOpen(false)}
          title="New Trip Information"
          inputs={tripInputs}
          endpoint="http://localhost:3001/trips"
          extraData={{ user_id: userId }}
          onSaved={(trip) => { setTrips(t => [...t, trip]); setCurrentTripID(trip.id); }}
        />

        <TripSidebar trips={trips} selectTrip={filterCurrentTrip}></TripSidebar>
      </div>



      <div style={{height:"3rem"}}></div>



      <div class="main-content">
        <h1>DASHBOARD PAGE</h1>
        <h2>Add Your Plans!</h2>

        <button name="transportation" disabled={!currentTripID} onClick={() => setTransportationPopupOpen(true)}>transportation </button>
        <ManualEntryPopup
          isOpen={transportationPopupOpen}
          onClose={() => setTransportationPopupOpen(false)}
          title="Transportation Information"
          inputs={transportationInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/transportation`}
        />

        <div style={{height:"rem"}}></div>

        <button name="accommodations" disabled={!currentTripID} onClick={() => setAccommodationsPopupOpen(true)}>accommodations</button>
        <ManualEntryPopup
          isOpen={accommodationsPopupOpen}
          onClose={() => setAccommodationsPopupOpen(false)}
          title="Accommodations Information"
          inputs={accommodationsInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/accommodations`}
        />

        <div style={{height:"rem"}}></div>

        <button name="activity" disabled={!currentTripID} onClick={() => setActivityPopupOpen(true)}>activity</button>
        <ManualEntryPopup
          isOpen={activityPopupOpen}
          onClose={() => setActivityPopupOpen(false)}
          title="Activity Information"
          inputs={activityInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/activities`}
        />

        <div style={{height:"2rem"}}></div>

        <h2>Current Trip: {displayTrip?.name ?? "none selected"}</h2>

        <TransportInfoDisplayCard
          date = "Dec 10th, 2026"
          departure = "LAX"
          destination ="HND"
          mode= "Flight"
          id = "fd832ld"
          time = "2:50am"
        />

        <AccomodationInfoDisplayCard
          name = "Fantasy Springs"
          location = "1-13 Maihama, Urayasu, Chiba 279-8511, Japan"
          date = "Dec 10th, 2026"
          time = "7pm"
          isCheckIn = {true}
        />

        <ActivityInfoDisplayCard
            name = "Disney Sea"
            location = "1-13 Maihama, Urayasu, Chiba 279-8511, Japan"
            date = "Dec 11th, 2026"
            startTime = "7am"
        />

        <AccomodationInfoDisplayCard
          name = "Fantasy Springs"
          location = "1-13 Maihama, Urayasu, Chiba 279-8511, Japan"
          date = "Dec 15th, 2026"
          time = "11am"
          isCheckIn = {false}
        />

        <div style={{height:"2rem"}}></div>
        <h2>Log Out:</h2>
        <button onClick={() => navigatePage("login")}>log out</button>
      </div>

    </div>
  );
}