import { useEffect, useRef, useState } from 'react';

import './InfoDisplayCard.css'

function InfoDisplayCard({date, time, title, description}) {
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

function TransportInfoDisplayCard({mode, time, departure, destination, date, id}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {time}
      title = {`${mode}: ${departure} -> ${destination}`}
      description = {`ID: ${id}`}
    />
  );
}

export {InfoDisplayCard, TransportInfoDisplayCard}