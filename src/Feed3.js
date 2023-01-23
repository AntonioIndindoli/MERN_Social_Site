import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = (props) => (
 <tr>
   <td>{props.post.name}</td>
   <td>{props.post.body}</td>
   <td>{props.post.date}</td>
   <td>
     <button 
       onClick={() => {
         props.deletePost(props.post._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function Feed() {
 const [posts, setPosts] = useState([]);
 
 // This method fetches the Posts from the database.
 useEffect(() => {
   async function getPosts() {
    const configuration = {
        method: "get",
        url: "http://localhost:3000/post",
    };

    axios(configuration)
        .then((result) => {
            const posts = result.data;
            alert(posts);
            setPosts(posts);
        })
        .catch((error) => {
            error = new Error();
        });
   }
 
   getPosts();
 
   return;
 }, [posts.length]);
 
 // This method will delete a Post
 async function deletePost(id) {
   await axios.get('http://localhost:3000/${id}', {
     method: "DELETE"
   });
 
   const newPosts = posts.filter((el) => el._id !== id);
   setPosts(newPosts);
 }
 
 // This method will map out the Posts on the table
 function postList() {
   return posts.map((post) => {
     return (
       <Post
         post={post}
         deletePost={() => deletePost(post._id)}
         key={post._id}
       />
     );
   });
 }
 
 // This following section will display the table with the Posts of individuals.
 return (
   <div>
     <h3>Post List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{postList()}</tbody>
     </table>
   </div>
 );
}