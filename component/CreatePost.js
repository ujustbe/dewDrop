// components/CreatePost.js
import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
//import app from '../config/fire-base';
import firebaseApp from '../firebaseConfig'
import { getFirestore } from "firebase/firestore";
const db = getFirestore();


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };

    // Add a new document in collection "cities" with ID 'LA'
    addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });


    console.log({
      "title": title,
      "content": content
    });
    setTitle('');
    setContent('');
  }

  useEffect(() => {
    const querySnapshot = getDocs(collection(db, "users"));
    console.log(querySnapshot);
  }, [])

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Content<br />
          <textarea value={content}
            onChange={({ target }) => setContent(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default CreatePost;