import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import EventList from './EventList'


const Modal = ({shutdownModal, getData, mode, post}) => {
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    title: editMode ? post.title : '',
    text: editMode ? post.text : '',
    events: editMode ? post.events : []
  })

 const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blog`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200) {
        console.log('Fetch data worked')
      }
    } catch (err) {
      console.error(err)
    }}

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blog/${post.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
      })
      if(response.status === 200) {
        console.log('Edit data worked')
      }
    } catch (err) {
      console.error(err)
    }
  }

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


  const handleAddNew = (e) => {
    e.preventDefault();
    setData(data => {
      return {
        ...data,
        events: [
          ...data.events,
          {
            event_id: uuidv4(),
            date: new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Warsaw' }),
            place: 'kraków',
            event_text: ''
          }
        ]
      };
    });
  }

  const handleChangeDate = (idChange, onChange) => {

    const newList = data.events?.map((event) => {
      if(idChange === event.event_id){
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
      if(idChange === event.event_id){
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
      if(idChange === event.event_id){
        return {
          ...event,
          event_text: eText
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

    const newList = data.events?.filter(event => id !== event.event_id)
    setData({
      ...data,
      events: newList
    })
  }


 const handleSubmit = async (e) => {
    editMode ? await editData(e) : await postData(e)
    setData({
      title: '',
      text: '',
      events: []
    })
    getData()
    window.location.reload()
    shutdownModal()
  }

 const handleCancel = (e) => {
    e.preventDefault()
    shutdownModal()
 }

 console.log(data.events)
 
  return (
    <div className="overlay">
      <form name='modal' className='modal'>
        <div>
          <button onClick={handleCancel}>X</button>
        </div>
        Post title:
        <input name='title' maxLength={10} value={data.title} onChange={handleChangeTitle} required/>
        Post content:
        <textarea name='text' value={data.text} onChange={handleChangeText}/>

        {<EventList 
          events={data.events}
          onAddNew={handleAddNew} 
          onChangeDate={handleChangeDate}
          onChangePlace={handleChangePlace}
          onChangeEventText={handleChangeEventText}
          onDelete={handleDelete}/>}

        <button name='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
 ) 
}

export default Modal