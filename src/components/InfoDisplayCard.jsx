import './InfoDisplayCard.css'

function InfoDisplayCard({date, time, title, description, onEdit}) {
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
              {onEdit && <button onClick={onEdit}>Edit</button>}
            </div>
        </div>
    );
}

function TransportInfoDisplayCard({mode, departure, destination, date, time, id, onEdit}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {time}
      title = {`${mode}: ${departure} -> ${destination}`}
      description = {`ID: ${id}`}
      onEdit = {onEdit}
    />
  );
}

function AccomodationInfoDisplayCard({name, location, date, time, isCheckIn, onEdit}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {time}
      title = {isCheckIn ? `Check In: ${name}` : `Check Out: ${name}`}
      description = {`at ${location}`}
      onEdit = {onEdit}
    />
  );
}

function ActivityInfoDisplayCard({name, location, date, startTime, onEdit}){
  return(
    <InfoDisplayCard
      date = {date}
      time = {startTime}
      title = {name}
      description = {`at ${location}`}
      onEdit = {onEdit}
    />
  );
}

export {InfoDisplayCard, TransportInfoDisplayCard, ActivityInfoDisplayCard, AccomodationInfoDisplayCard}