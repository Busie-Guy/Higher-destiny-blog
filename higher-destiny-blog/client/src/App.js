import { useEffect, useState } from 'react'
import ListItem from './components/ListItem.js'
import ListHeader from "./components/ListHeader.js";
import Auth from "./components/Auth.js"
import { useCookies } from 'react-cookie'
import EventList from './components/EventList.js'
import Modal2 from './components/Modal2.js'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)


  
const getData = async () => {

  try {
    const response = await fetch (`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
    const json = await response.json()
    setTasks(json)
  } catch (err) {
    console.error(err)
  }
}


useEffect(()=> {
  if(authToken){
    getData()
  }},
 [])

//sort by date
const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      
      {!authToken && <Modal2/>} 
      {authToken && 
        <>     
        <ListHeader listName={'Articles'} getData={getData}/>
        {sortedTask?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
        </>}
    </div>
  );
}

export default App;
