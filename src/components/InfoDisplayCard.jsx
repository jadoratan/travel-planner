import { useEffect, useRef, useState } from 'react';

import './InfoDisplayCard.css'

export default function InfoDisplayCard({date, time, title, description}) {
    return(
        <div className='trip-item'>
            <div className = "trip-time">
              <h3>{date}</h3>
              <h3>{time}</h3>
            </div>
            <div className = "trip-event">
              <div className = "trip-text">
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
        </div>
    );
}
/*
export default function TransportInfoDisplayCard({departure, destination, departDate, arrivalDate, id}){
  return(
    <InfoDisplayCard
      title = {`${departure} -> ${destination}`}
      description = {`ID: ${id}`}
    />

  );
}
  */