import { useEffect, useState } from 'react'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { Authenticator } from '@aws-amplify/ui-react';
import './App.css'
import '@aws-amplify/ui-react/styles.css';
import MusicItem from './components/MusicItem';

const client = generateClient<Schema>();

function App() {  
  const [inputForm, setInputForm] = useState<{ [key: string]: string }>({});
  const [favouriteMusic, setFavouriteMusic] =  useState<Schema["FavouriteMusic"]["type"][]>([]);

  useEffect(() => {
    client.models.FavouriteMusic.observeQuery().subscribe({
      next: (data) => setFavouriteMusic([...data.items])
    })
  }, [])

  const handleOnChange = (e: any) => {
    const name  = e.target.name
    const value = e.target.value
    setInputForm({...inputForm, [name]: value})
  }

  const addMusic = () => {
    const { name, author, album } = inputForm    
    if (name && author) {
      client.models.FavouriteMusic.create({ 
        name: name,
        author: author,
        album: album
      })
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
          <>
            <div>
              <h3>Hello {user?.username}</h3>
              <button onClick={signOut}>Sign out</button>
            </div>
            <div className='container'>
              <div className="card card-form">
                <form className='music-form'>
                  <input className='music-form--input' name="name" onChange={(e) => handleOnChange(e)} placeholder='Name music'/>
                  <input className='music-form--input' name="author" onChange={(e) => handleOnChange(e)} placeholder='Author'/>
                  <input className='music-form--input' name="album" onChange={(e) => handleOnChange(e)} placeholder='Album'/>
                </form>
                <button className='add-button' onClick={addMusic}>
                  Add music
                </button>
              </div>
              <div className="card">
                  <h3 style={{margin: 0, fontSize: '20px'}}>My music</h3>
                  <ul className="music-list">
                  {
                    favouriteMusic.map((music) => (
                      <MusicItem key={music.id} songData={music}/>
                    ))
                  }
                  </ul>
                </div>
            </div>
          </>
      )}
    </Authenticator>
  )
}

export default App
