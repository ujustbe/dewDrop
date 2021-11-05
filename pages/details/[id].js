import React, { useEffect, useState } from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from '../../firebaseConfig';
const db = getFirestore();
function Details({ posts }) {
    const postid = posts.id;
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getContent = async () => {
            console.log('serverside', postid);
            const docRef = doc(db, "dewdropusers3", postid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUsers(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        getContent();
        // return () => {
        //     cleanup
        // }
    }, [])

    const updateUser = async (id, like) => {
        console.log(id);
        const userDoc = doc(db, "dewdropusers3", id);
        const newFields = { like: like + 1 };
        await updateDoc(userDoc, newFields);
      };

    return (
        console.log("users", users),
        <>
            {users ? <div>
                <h1>{users.username}</h1>
                <img src={users.image} />
                <p>{users.description}</p>
                <iframe width="560" height="315" src={users.videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div> : null}
        </>
    )
}

export default Details

export async function getServerSideProps({ query }) {
    // const db = getFirestore();
    //const  meetingid  = query.id;
    console.log("query", query.id);
    // const docRef = doc(db, "ujustcelebrate", meetingid);
    //const docSnap = await getDoc(docRef);

    // const res = await fetch("https://api.ujustbe.com/Meeting/details?meetingId=" + meetingid);
    // const posts = await res.json()
    //console.log("all details", meetingid);
    return {
        props: {
            //...docSnap.doc(),
            posts: query
        }
    }


}
