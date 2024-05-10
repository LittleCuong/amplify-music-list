import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { generateClient } from "aws-amplify/api";
import { type Schema } from '../../amplify/data/resource';
import '../App.css'

const client = generateClient<Schema>()

function EditModal(
    { editMode, updatedSong }: { 
        editMode: (isDisplayed: boolean) => void; 
        updatedSong: { id: string; name: string; author: string; album: string}
    }
) {

    const [updateValue, setUpdateValue] = useState<Object>({
        id: updatedSong.id,
        name: updatedSong.name,
        author: updatedSong.author,
        album: updatedSong.album
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateValue({...updateValue, [e.target.name]: e.target.value})
    }

    const handleUpdate = async() => {
        try {
            await client.models.FavouriteMusic.update({
                id: updateValue.id,
                name: updateValue.name,
                author: updateValue.author,
                album: updateValue.album,
            })
            editMode(false)
        } catch (error) {
            console.error();
        }   
    }

    const handleExitEdit = () => {
        editMode(false)
    }

    return(
        <Fragment>
            <div className="modal">
                <div className="modal-content">
                    <h2>UPDATE SONG</h2>
                    <input onChange={(e) => handleOnChange(e)} defaultValue={updatedSong.name} className='edit-modal--input' type="text" name="name" placeholder="Song Name"/>
                    <input onChange={(e) => handleOnChange(e)} defaultValue={updatedSong.author} className='edit-modal--input' type="text" name="author" placeholder="Author"/>
                    <input onChange={(e) => handleOnChange(e)} defaultValue={updatedSong.album} className='edit-modal--input' type="text" name="album" placeholder="Album Songs"/>
                    <div style={{display: 'flex'}}>
                        <button onClick={handleUpdate} className="modal-button save-button">Save</button>
                        <button onClick={handleExitEdit} className="modal-button exit-button">Exit</button>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default EditModal;