import EventItem from './EventItem'


const EventList = ({
    onAddNew,
    onChangeDate,
    onChangePlace,
    onChangeEventText,
    onDelete,
    events
    }) => {

      
  return (
    <div>
      
      {events?.map(event => 
          <EventItem 
            key={event.id}
            event={event} 
            onChangeDate={onChangeDate}
            onChangePlace={onChangePlace}
            onChangeEventText={onChangeEventText}
            onDelete={onDelete}/>
      )}
      <button onClick={onAddNew}>Add</button>
    </div>
  )
}

export default EventList