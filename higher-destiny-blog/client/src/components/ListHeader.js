const ListHeader = ({listName}) => {
	
	const Signout = () => {
		console.log('signout')
	}
	
	return (
		<div className="list-header">
			<h1>{listName}</h1>
		
			<div className="button-container">
				<button className="create">Add new</button>
				<button className="signout" onClick={Signout}>SignOut</button>
			</div>
		</div>
    )
}

export default ListHeader