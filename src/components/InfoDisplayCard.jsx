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

function TransportInfoDisplayCard({transport, onEdit}){
  return(
    <InfoDisplayCard
      date = {transport.depart_date?.slice(0, 10)}
      time = {transport.depart_time}
      title = {`${transport.type}: ${transport.depart_location} -> ${transport.arrive_location}`}
      description = {`ID: ${transport.confirmation}`}
      onEdit = {onEdit}
    />
  );
}

function AccomodationInfoDisplayCard1({accomodation, onEdit}){
  return(
    <InfoDisplayCard
      date = {accomodation.check_in?.slice(0, 10)}
      title = {`Check In: ${accomodation.name}`}
      description = {`at ${accomodation.city}`}
      onEdit = {onEdit}
    />
  );
}

function AccomodationInfoDisplayCard2({accomodation, onEdit}){
  return(
    <InfoDisplayCard
      date = {accomodation.check_out?.slice(0, 10)}
      title = {`Check Out: ${accomodation.name}`}
      description = {`at ${accomodation.city}`}
      onEdit = {onEdit}
    />
  );
}

function ActivityInfoDisplayCard({activity, onEdit}){
  return(
    <InfoDisplayCard
      date = {activity.date?.slice(0, 10)}
      time = {activity.start_time}
      title = {activity.name}
      description = {`at ${activity.location}`}
      onEdit = {onEdit}
    />
  );
}


export {InfoDisplayCard, TransportInfoDisplayCard, ActivityInfoDisplayCard, AccomodationInfoDisplayCard1, AccomodationInfoDisplayCard2}