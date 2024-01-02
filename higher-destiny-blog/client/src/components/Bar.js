const Bar = ({showModal}) => {
  
  return (
    <div className="bar">
      <div className="bar-text">
        Higher Destiny Blog
      </div>
      <div>
        <button onClick={showModal}>Add new</button>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Bar;