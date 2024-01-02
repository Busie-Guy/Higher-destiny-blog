import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css';


const EventItem = ({number, event, onChangeDate, onChangePlace, onChangeEventText, onDelete}) => {

  const allowedValues = ["kraków", "kęty", "bielsko-biała"];
  const trimmedValue = event.place.trim();


  const [date, onChange] = useState(event.date);
  const [isShowInput, setIsShowInput] = useState((!allowedValues.includes(trimmedValue) && trimmedValue !== "") ? true :false)
  const [isShowTextArea, setIsShowTextArea] = useState (false)


const handleDateTimeChange = (newValue) => {
  onChange(newValue);
  const dateISO = newValue.toLocaleString('sv-SE', { timeZone: 'Europe/Warsaw' });
  onChangeDate(event.event_id, dateISO);
};

const handleChangeSelect = (e) => {
 setIsShowInput(e.target.value === 'inne') 
 onChangePlace(event.event_id, e.target.value)}

 const handleChangeTextArea = (e) => {
  e.preventDefault();
  setIsShowTextArea(!isShowTextArea)
  onChangeEventText(event.event_id, '')
 }

 

  
  return (
    <div className='event'>
      <div className='event-more-info'>
        <div className='event-elements'>
          {number}
          <DateTimePicker 
          onChange={handleDateTimeChange}
          value={date} 
          minDate={new Date()}
          disableClock={true} />
          <label htmlFor={`eventSelect-${event.event_id}`}>Choose a place:</label>   
            <select 
              name="eventSelect" 
              id={`eventSelect-${event.event_id}`}  
              value={isShowInput === false ? event.place : "inne"}
              onChange={handleChangeSelect}
              >
              <option value="kraków">Kraków</option>
              <option value="kęty">Kęty</option>
              <option value="bielsko-biała">Bielsko-Biała</option>
              <option value="inne">Inne</option>
            </select>
          {isShowInput && <input
              id={`eventInput-${event.event_id}`} 
              name={`eventInputelect-${event.event_id}`}
              value={event.place === 'inne' ? '' : event.place}
              className='more-input' 
              onChange={(e) => onChangePlace(event.event_id, e.target.value)}
              placeholder='Enter a place'/>
            }
        
        </div>
          <button className='more-info' onClick={handleChangeTextArea}>
          {isShowTextArea ? 'Close' : 'More info'}
          </button>

          <button className='delete' onClick={() => onDelete(event.event_id)}>Delete</button>
      </div>
          {(isShowTextArea || event.event_text !== "") && <textarea name='more-info' value={event.event_text}
          onChange={(e) => {onChangeEventText(event.event_id, e.target.value)}}/>}
    </div>
  )
}

export default EventItem