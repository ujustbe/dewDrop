import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import CreatePost from '../component/CreatePost';
const Home = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  
 
  
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      <CreatePost />
    </div>
  )
}

export default Home;