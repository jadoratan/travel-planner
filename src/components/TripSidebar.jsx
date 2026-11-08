import { useState } from 'react';

export default function TripSidebar({trips}) {
    return(
        <div>
                {trips.map((trip, i) => <button key = {i}>{trip}</button>)}
        </div>
    );
}