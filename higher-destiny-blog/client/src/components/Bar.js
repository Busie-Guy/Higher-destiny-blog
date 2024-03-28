const Bar = ({showModal}) => {
  
  return (
    <div className="bar">
      <div className="bar-text">
        Higher Destiny Blog
      </div>
      <div>
        <button className="blue-button" onClick={showModal}>Add new</button>
        <button className="yellow-button">Sign In</button>
      </div>
    </div>
  );
};

export default Bar;