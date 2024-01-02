const ConfirmDelete = ({showConfirm, deleteAgree}) => {

  const handleDelete = () => {
    deleteAgree()
    showConfirm(false)
  }

  return (
    <div className="overlay">
      <div className="confirm-delete-post">
        Are you sure you want to delete the post?
        <div>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => showConfirm(false)}>No</button>
        </div>
      </div>
    </div>
  )
}


export default ConfirmDelete