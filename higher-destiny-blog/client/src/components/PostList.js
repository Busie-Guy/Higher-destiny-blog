import { Link } from "react-router-dom"

const PostList = ({ data }) => {
  

  return (
    <div className="posts-container">
      {data?.map((post) => (
        <Link
          className="link"
          key={post.id}
          to={`post/${post.id}`}>
            <div className="title">{post.title}</div>
        </Link>    
      ))}
    </div>
  );
};

export default PostList;