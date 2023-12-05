import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css';


const EventItem = ({number, event, onChangeDate, onChangePlace, onChangeEventText, onDelete}) => {


  const [date, onChange] = useState(event.date);
  const [isShowInput, setIsShowInput] = useState(false)
  const [isShowTextArea, setIsShowTextArea] = useState (false)


const handleDateTimeChange = (newValue) => {
  onChange(newValue);
  onChangeDate(event.id, newValue);
};

const handleChangeSelect = (e) => {
 setIsShowInput(e.target.value === 'inne') 
 onChangePlace(event.id, e.target.value)}

 const handleChangeTextArea = (e) => {
  e.preventDefault();
  setIsShowTextArea(!isShowTextArea)
  onChangeEventText(event.id, '')
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
          <label htmlFor={`eventSelect-${event.id}`}>Choose a place:</label>   
          <select 
            name="eventSelect" 
            id={`eventSelect-${event.id}`}  
            onChange={handleChangeSelect}
            >
            <option value="kraków">Kraków</option>
            <option value="kęty">Kęty</option>
            <option value="bielsko-biała">Bielsko-Biała</option>
            <option value="inne">Inne</option>
          </select>
          {isShowInput && <input
              id={`eventInput-${event.id}`} 
              name={`eventInputelect-${event.id}`}
              className='more-input' 
              onChange={(e) => onChangePlace(event.id, e.target.value)}
              placeholder='Enter a place'/>}
        
        </div>
          <button className='more-info' onClick={handleChangeTextArea}>
          {isShowTextArea ? 'Close' : 'More info'}
          </button>

          <button className='delete' onClick={() => onDelete(event.id)}>Delete</button>
      </div>
          {isShowTextArea && <textarea name='more-info'
          onChange={(e) => {onChangeEventText(event.id, e.target.value)}}/>}
    </div>
  )
}

export default EventItem