import { useState } from "react";
import Modal from './Modal';
import PlaceButtons from "./PlaceButtons";
import ConfirmDelete from "./ConfirmDelete";
import { useNavigate } from 'react-router-dom';

const Post = ({post, getData})=> {
	const [showModal, setShowModal] = useState(false)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const sortedEvents = post.events?.sort((a,b) => (new Date(a.date) - new Date(b.date)))

	const navigate = useNavigate();

	const handleShutDownModal = () => {
		setShowModal(false)
	}

	const deletePost = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blog/${post.id}`, {
				method: 'DELETE'
			})
			if(response.status === 200){
				getData()
			}
		} catch (err){
			console.error(err)
		}
		navigate('/', { replace: true });	
	}

    
	return(
		<div className="center">
			<div className="app">
				<div className="one-post">
					<h1>{post.title}</h1>
					{post.text.length > 1 && post.text}

					{sortedEvents?.map((event) => {
						let newFormatDate = new Date(event.date).toLocaleString();

						return (
						<li key={event.event_id}>
							{newFormatDate}
							{" " + event.place}
							<br/>
							{event.event_text}
						</li>
							)
					})}
					<br/>
					<button className="green-button" onClick={()=> setShowModal(true)}>Edit</button>
					<button className="red-button" onClick={()=>setShowConfirmDelete(true)}>Delete</button>

				</div>
			<PlaceButtons/>
			</div>
			{showConfirmDelete && <ConfirmDelete showConfirm={setShowConfirmDelete} deleteAgree={deletePost}/>}
			{showModal && <Modal mode="edit" post={post} shutdownModal={handleShutDownModal} getData={getData}/>} 
		</div>
	)
}

export default Post