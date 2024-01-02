import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {  Routes, Route } from "react-router-dom"
import Post from './components/Post.js'
import Front from './Front.js';
import Bar from './components/Bar.js';
import Modal from "./components/Modal.js"


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [posts, setPosts] = useState(null)
  const [showModal, setShowModal] = useState(false)


  
const getData = async () => {

  try {
    const response = await fetch (`${process.env.REACT_APP_SERVERURL}/blog`)
    const json = await response.json()
    setPosts(json)
  } catch (err) {
    console.error(err)
  }
}


useEffect(()=> {
  
  getData()
},
[])

const handleShutDownModal = (e) => {
  setShowModal(false);
}

const sortedPost = posts?.sort((a,b) => (new Date(b.date) - new Date(a.date)))

console.log(posts)
 


  return (
  <div>   
    <Bar showModal={() => setShowModal(true)}/>
    <Routes>
      <Route path='/' element={<Front 
        data={sortedPost}/>} 
      />
        
        {sortedPost?.map((post) => (
          <Route 
            key={post.id} 
            path={`post/${post.id}`} 
            element={
              <Post 
                post={post} 
                shutdownModal={() => setShowModal(false)} 
                getData={getData}
              />} 
            />
          ))}
      </Routes>
      {showModal && <Modal modal="create" shutdownModal={handleShutDownModal} getData={getData}/>} 
  </div>
  );
}

export default App;
