import { useEffect, useState } from 'react'
import ListItem from './components/ListItem.js'
import ListHeader from "./components/ListHeader.js";

function App() {
  const userEmail = 'busy@test.com'
  const [tasks, setTasks] = useState(null)
  
const getData = async () => {

  try {
    const response = await fetch (`http://localhost:8000/todos/${userEmail}`)
    const json = await response.json()
    setTasks(json)
  } catch (err) {
    console.error(err)
  }
}

console.log(tasks)

useEffect(()=> getData, [])

//sort by date
const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={'Articles'} getData={getData}/>
      {sortedTask?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
  );
}

export default App;
