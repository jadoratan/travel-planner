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

function TransportInfoDisplayCard({mode, departure, destination, date, time, id}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {time}
      title = {`${mode}: ${departure} -> ${destination}`}
      description = {`ID: ${id}`}
    />
  );
}

function AccomodationInfoDisplayCard({name, location, date, time, isCheckIn}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {time}
      title = {isCheckIn ? `Check In: ${name}` : `Check Out: ${name}`}
      description = {`at ${location}`}
    />
  );
}

function ActivityInfoDisplayCard({name, location, date, startTime}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {startTime}
      title = {name}
      description = {`at ${location}`}
    />
  );
}

export {InfoDisplayCard, TransportInfoDisplayCard, ActivityInfoDisplayCard, AccomodationInfoDisplayCard}