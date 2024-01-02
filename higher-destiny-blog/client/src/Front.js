import PostList from "./components/PostList";
import PlaceButtons from "./components/PlaceButtons";
import Modal2 from "./components/Modal"


const Front = ({data}) => {
  return (
    <div className='center'> 
    <div className="app">
      <PostList data={data}/>
      <PlaceButtons/>

    </div>
    </div>
  );
};

export default Front;