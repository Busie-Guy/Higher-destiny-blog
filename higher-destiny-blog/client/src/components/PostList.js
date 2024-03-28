import { Link } from "react-router-dom"

const PostList = ({ data }) => {
  

  return (
    <div className="posts-container">
      {data?.map((post) => (
        <Link
          key={post.id}
          to={`post/${post.id}`}>
            <div>{post.title}</div>
        </Link>    
      ))}
        

    </div>
  );
};

export default PostList;