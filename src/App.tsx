import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import './App.css'

const client = generateClient<Schema>() // use this Data client for CRUDL requests


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
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form className='music-form'>
          <input className='music-form--input' name="name" onChange={(e) => handleOnChange(e)} placeholder='Name music'/>
          <input className='music-form--input' name="author" onChange={(e) => handleOnChange(e)} placeholder='Author'/>
          <input className='music-form--input' name="album" onChange={(e) => handleOnChange(e)} placeholder='Album'/>
        </form>
        <button onClick={addMusic}>
          Add music
        </button>
        <h3>My music</h3>
        <ul className="music-list">
        {
          favouriteMusic.map((music) => (
            <li key={music.id} className="music-item">
              <div className="music-details">
                <h2 className="music-name">{music.name}</h2>
                <p className="music-author">{music.author}</p>
                <h2 className="music-name">{music.album}</h2>
              </div>
            </li>
          ))
        }
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
