// components/CreatePost.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc } from "firebase/firestore";
//import app from '../config/fire-base';
import firebaseApp from '../firebaseConfig'
// import { getFirestore } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Link from 'next/link'
const db = getFirestore();


const CreatePost = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [imageURL, setimage] = useState('');
  const [contype, setContype] = useState('false');
  const [description, setDescription] = useState('');
  const [videolink, setVideolink] = useState('');
  const [logdescription, setLogdescription] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([{ username: "", usercomments: "", dateTime: "" }]);
  const [newLike, setNewLike] = useState(0);
  const [newView, setNewView] = useState(0);
  const usersCollectionRef = collection(db, "dewdropusers3");
  



  const handleSubmitbuild = (event) => {
    event.preventDefault();
    let data = {
      username: username,
      image: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      totallike: newLike,
      totalview: newView
    };



    // addDoc(collection(db, "dewdropusers3"), {
    //   username: username,
    //   image: imageURL,
    //   contype: contype,
    //   description: description,
    //   videolink: videolink,
    //   comments: comments,

    // });
    //console.log("Document written with ID: ", id);

  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      username: username,
      image: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      totallike: newLike,
      totalview: newView

    };
    console.log(data);
    await addDoc(usersCollectionRef, data);

  };

  // Content Type function

  const contentType = e => {
    const target = e.target;
    if (target.checked) {
      setContype(target.value);
    }
  };


  // base 64 converter

  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();


      // Convert the file to base64 text
      reader.readAsDataURL(file);


      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
        ``


      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    //let { file } = this.state;

    const file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        setimage(result)
      })
      .catch(err => {
        console.log(err);
      });
  }



  useEffect(() => {
    const getContent = async () => {
      onSnapshot(collection(db, "dewdropusers3"), (snapshot) => {
        console.log("Suraj", snapshot);
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
    getContent();
  }, []);


  // function renderdata(doc){
  //   setBlogs([...blogs,doc.data()])
  //   console.log('all users', blogs);
  // }
  // useEffect(() => {
  //   allData()
  //   console.log('all users', blogs);
  // }, [])

  return (
    <>
      <div>
        <h2>Add Blog</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>

            <input
              type="radio"
              id="1"
              value="Image"
              name="contentType"
              checked={contype == 'Image'}
              onChange={contentType}
            />
            <label for="1">Image</label>

            <input
              type="radio"
              id="2"
              value="Video"
              name="contentType"
              checked={contype == 'Video'}
              onChange={contentType}
            />
            <label for="2">Video</label>
          </div>
          <div>
            <label>User Name</label>
            <input type="text" value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <label>Video Link</label>
            <input type="text" value={videolink}
              onChange={({ target }) => setVideolink(target.value)} />
          </div>
          <div>
            <label>description</label>
            <textarea value={description}
              onChange={({ target }) => setDescription(target.value)} />
          </div>
          <div>
            <input type="file" name="file" onChange={handleFileInputChange} />
          </div>

          <button type="submit">Save</button>


        </form>
        <>

          

          <img src={imageURL} />
          <iframe width="560" height="315" src={videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </>
      </div>
      {
            users && users.map(blog => {
              console.log(blog);
              return (
                <div className="blog-container">
                  <h4>{blog.username}</h4>
                  <Link href={"/details/[id]"} as={"/details/" + blog.id}>
                      <a >link</a>
                    </Link>
                  {/* <p>{blog.body}</p> */}
                </div>
              )
            })
          }{
        users?<div></div>:null
      }
    </>


  )
}
export default CreatePost;