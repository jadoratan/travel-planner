import './TripSidebar.css';

export default function TripSidebar({trips, selectTrip, onDelete}) {
    return(
        <ul className = "trip-sidebar-list">
                {trips.map((trip) => 
                    (<li key = {trip.id} className = "trip-sidebar-row">
                        <button 
                        onClick = {() => selectTrip(trip.id)}
                        className = "trip-sidebar-item"
                        >
                            <span className="trip-name" >{trip.name}</span>
                        </button>
                        {onDelete && (
                            <button
                            onClick = {() => onDelete(trip)}
                            className = "trip-sidebar-delete"
                            aria-label = {`Delete trip ${trip.name}`}
                            title = "Delete trip"
                            >
                                ×
                            </button>
                        )}
                    </li>)
                )}
        </ul>
    );
}
