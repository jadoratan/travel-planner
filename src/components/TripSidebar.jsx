import './TripSidebar.css';

export default function TripSidebar({trips, selectTrip}) {
    return(
        <ul className = "trip-sidebar-list">
                {trips.map((trip) => 
                    (<li key = {trip.id}>
                        <button 
                        onClick = {() => selectTrip(trip.id)}
                        className = "trip-sidebar-item"
                        >
                            <span className="trip-name" >{trip.name}</span>
                        </button>
                    </li>)
                )}
        </ul>
    );
}