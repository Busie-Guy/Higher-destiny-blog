import { useState } from 'react'

const Modal = ({mode, setShowModal, task, getData}) => {
  const editMode = mode === 'edit' ? true : false
  
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'busy@test.com',
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : Date()
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200) {
        console.log('Worked')
        setShowModal(false)
        getData();
      }
      console.log('response:', response)
    } catch (err) {
      console.error(err)
    }
  }


  const handleChange = (e) => {
    const {value, name} = e.target

    setData(data => ({
      ...data,
      [name]: value
    }))
    
    console.log(data)

  }
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task!</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br/>
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" onClick={editMode ? '' : postData}/>
        </form>

      </div>
    </div>
  )
}


export default Modal