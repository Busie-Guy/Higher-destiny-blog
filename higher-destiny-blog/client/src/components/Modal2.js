import { useState } from 'react'
import EventList from './EventList'

let id = 0;

const Modal = () => {
 const [data, setData] = useState({
  title: '',
  text: '',
  events: []
 })

 const postData = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blog`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    if(response.status === 200) {
      console.log('Worked')
    }
    console.log('response:', response)
  } catch (err) {
    console.error(err)
  }}


 const handleChangeTitle = (e) => {
  setData({
    ...data,
    title: e.target.value
  })
 }

 const handleChangeText = (e) => {
  setData({
    ...data,
    text: e.target.value
  })
 }


  const handleAddNew = () => {
    setData(data => {
      return {
        ...data,
        events: [
          ...data.events,
          {
            id: data.events.length,
            date: new Date(),
            place: 'Kraków',
            eventText: ''
          }
        ]
      };
    });
  }

  const handleChangeDate = (idChange, onChange) => {

    const newList = data.events?.map((event) => {
      if(idChange === event.id){
        return {
          ...event,
          date: onChange
        }} else {
          return event
        }
      }
    )
    setData({
      ...data,
      events: newList
    })
  }

  const handleChangePlace = (idChange, place) => {

    const newList = data.events?.map((event) => {
      if(idChange === event.id){
        return {
          ...event,
          place: place
        }} else {
          return event
        }
      }
    )
    setData({
      ...data,
      events: newList
    })
  }

  const handleChangeEventText = (idChange, eText) => {

    const newList = data.events?.map((event) => {
      if(idChange === event.id){
        return {
          ...event,
          eventText: eText
        }} else {
          return event
        }
      }
    )
    setData({
      ...data,
      events: newList
    })
  }

  const handleDelete = (id) => {

    const newList = data.events?.filter(event => id !== event.id)
    setData({
      ...data,
      events: newList
    })
  }

 console.log(data)
 
  return (
  <div className="overlay">
    <div className="modal2">
      Post title:
      <input value={data.title} onChange={handleChangeTitle}/>
      Post content:
      <textarea value={data.text} onChange={handleChangeText}/>
      <EventList 
        events={data.events}
        onAddNew={handleAddNew} 
        onChangeDate={handleChangeDate}
        onChangePlace={handleChangePlace}
        onChangeEventText={handleChangeEventText}
        onDelete={handleDelete}/>
        <button onClick={postData}>Submit</button>
    </div>
  </div>
 ) 
}

export default Modal