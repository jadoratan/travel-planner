export default function TripSidebar({trips, selectTrip}) {
    return(
        <div>
                {trips.map((trip) => 
                    (<div key = {trip.id}>
                        <button onClick = {() => selectTrip(trip.id)}>
                            {trip.name}
                        </button>
                    </div>)
                )}
        </div>
    );
}