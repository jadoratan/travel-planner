import {ActivityInfoDisplayCard, AccomodationInfoDisplayCard1, AccomodationInfoDisplayCard2, TransportInfoDisplayCard} from './InfoDisplayCard'

import '../pages/Dashboard.css';
import '../components/TripSidebar.css'

//display in chronological order
export default function SortItinerary({transportation, accommodations, activities, setEditing}){
    const combinedItems = [
      ...transportation.map(t => ({...t, itemType: "transportation", sortDate: t.depart_date})),
      ...accommodations.map(a => ({...a, itemType: "accomodations1", sortDate: a.check_in})),
      ...accommodations.map(a => ({...a, itemType: "accomodations2", sortDate: a.check_out})),
      ...activities.map(a => ({...a, itemType: "activities", sortDate: a.date})),
    ]

    const sortedItems = combinedItems.sort((a,b) => (new Date(a.sortDate) - new Date (b.sortDate)));


    return(
      <div>
        {sortedItems.map((s) => {
          const itemKey = `${s.itemType}-${s.id}`;
          switch(s.itemType){
            case 'transportation':
              return <TransportInfoDisplayCard
                key = {itemKey}
                transport={s}
                onEdit = {() => setEditing({ table: "transportation", entry: s })}
              />;
            case 'activities':
                return <ActivityInfoDisplayCard
                  key = {itemKey}
                  activity = {s}
                  onEdit = {() => setEditing({ table: "activities", entry: s })}
                />;
            case 'accomodations1':
                return <AccomodationInfoDisplayCard1
                    key = {itemKey}
                    accomodation = {s}
                    onEdit = {() => setEditing({ table: "accommodations", entry: s })}
                />;
            case 'accomodations2':
                return <AccomodationInfoDisplayCard2
                    key = {itemKey}
                    accomodation = {s}
                    onEdit = {() => setEditing({ table: "accommodations", entry: s })}
                />;
            default:
                return null;   
          }
        })
      }
      </div>
    );
};
