import { useEffect, useState } from 'react';
import ManualEntryPopup from '../components/ManualEntryPopup';
import TripSidebar from '../components/TripSidebar';  
import SortItinerary from '../components/SortItinerary';
import {ActivityInfoDisplayCard, AccomodationInfoDisplayCard1, AccomodationInfoDisplayCard2, TransportInfoDisplayCard} from '../components/InfoDisplayCard'

import './Dashboard.css';
import '../components/TripSidebar.css'

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

  //shows which trip user has selected
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

  const displayTrip = trips.find(t => t.id === currentTripID);

  function filterCurrentTrip(id){
    setCurrentTripID(id);
  }


  /* DISPLAY ENTRIES FUNCTIONALITY*/
  const [transportation, setTransportation] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [activities, setActivities] = useState([]);

  // load the current trip's entries whenever the selected trip changes
  useEffect(() => {
    if (!currentTripID) { return; }

    fetch(`http://localhost:3001/trips/${currentTripID}/transportation`)
      .then((res) => res.json())
      .then((data) => setTransportation(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:3001/trips/${currentTripID}/accommodations`)
      .then((res) => res.json())
      .then((data) => setAccommodations(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:3001/trips/${currentTripID}/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  }, [currentTripID]);

  

  /* EDIT ENTRIES FUNCTIONALITY*/
  const [editing, setEditing] = useState(null); // which entry is being edited, e.g. { table: "activities", entry: {...} }

  const inputsByTable = {
    transportation: transportationInputs,
    accommodations: accommodationsInputs,
    activities: activityInputs,
  };

  // swap the old entry for the updated one so the card changes right away
  function saveEdit(updated){
    if (editing.table === "transportation") { setTransportation(list => list.map(e => e.id === updated.id ? updated : e)); }
    if (editing.table === "accommodations") { setAccommodations(list => list.map(e => e.id === updated.id ? updated : e)); }
    if (editing.table === "activities") { setActivities(list => list.map(e => e.id === updated.id ? updated : e)); }
  }


  return (
    <div className="dashboard">

      <div className="sidebar">
        <button 
        name="new trip" 
        onClick={() => setNewTripPopupOpen(true)}
        className = "sidebar-new-trip"
        >
          + New Trip
        </button>
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
        <button className = "logout-button" onClick={() => navigatePage("login")}>log out</button>
      </div>

      <div style={{height:"3rem"}}></div>

      <div class="main-content">
        <h1 className = "title">Dashboard Page</h1>
        <h2 className = "subheader">Add Your Plans!</h2>

        {/* ADDING TRIP INFO ACTIVATION BAR */}
        <div className = "action-bar">
        <button name="transportation" className = "action-button" disabled={!currentTripID} onClick={() => setTransportationPopupOpen(true)}>transportation </button>
        <ManualEntryPopup
          isOpen={transportationPopupOpen}
          onClose={() => setTransportationPopupOpen(false)}
          title="Transportation Information"
          inputs={transportationInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/transportation`}
          onSaved={(entry) => setTransportation(t => [...t, entry])}
        />


        <button name="accommodations" className = "action-button" disabled={!currentTripID} onClick={() => setAccommodationsPopupOpen(true)}>accommodations</button>
        <ManualEntryPopup
          isOpen={accommodationsPopupOpen}
          onClose={() => setAccommodationsPopupOpen(false)}
          title="Accommodations Information"
          inputs={accommodationsInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/accommodations`}
          onSaved={(entry) => setAccommodations(a => [...a, entry])}
        />

        <button name="activity" className = "action-button" disabled={!currentTripID} onClick={() => setActivityPopupOpen(true)}>activity</button>
        <ManualEntryPopup
          isOpen={activityPopupOpen}
          onClose={() => setActivityPopupOpen(false)}
          title="Activity Information"
          inputs={activityInputs}
          endpoint={`http://localhost:3001/trips/${currentTripID}/activities`}
          onSaved={(entry) => setActivities(a => [...a, entry])}
        />
        </div>

        <div style={{height:"2rem"}}></div>

        <h2 className='subheader'>{displayTrip?.name ?? "none selected"}</h2>
        <div style={{height:"2rem"}}></div>

      {/* DISPLAY TRIPS IN CHRONOLOGICAL ORDER */}
      <div className = "trip-list">
        <SortItinerary
          transportation={transportation}
          accommodations={accommodations}
          activities={activities}
          setEditing={setEditing}
        />
      </div>

        {editing && (
          <ManualEntryPopup
            isOpen={true}
            onClose={() => setEditing(null)}
            title="Edit Entry"
            inputs={inputsByTable[editing.table]}
            endpoint={`http://localhost:3001/trips/${currentTripID}/${editing.table}/${editing.entry.id}`}
            method="PUT"
            initialValues={editing.entry}
            onSaved={saveEdit}
          />
        )}

        
      </div>

    </div>
  );
}