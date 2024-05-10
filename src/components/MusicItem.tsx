import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { generateClient } from "aws-amplify/api";
import { type Schema } from '../../amplify/data/resource';
import { useState } from "react";
import EditModal from "./EditModel";

const client = generateClient<Schema>({
    authMode: 'apiKey'
});
function MusicItem({ songData }: { songData: { id: string; name: string, author: string; album: string } } ) {
    
    const [edit, setEdit] = useState<Boolean>(false)

    const handleEdit = (isDisplayed: boolean) => {
        setEdit(isDisplayed)
    }

    const handleDelete = (id: string) => {
        client.models.FavouriteMusic.delete({
            id: id
        })
    }

    return (
        <Fragment>
            <li className="music-item">
                <div className="music-details">
                    <div style={{display: 'flex', flexDirection: 'column', width: '60%' }}>
                        <h2 className="music-name">{songData.name}</h2>
                        <p className="music-album">Album {songData.album}</p>
                    </div>
                    <p className="music-author">{songData.author}</p>
                    <div style={{display: 'flex'}}>
                        <button onClick={() => handleEdit(!edit)} className='icon-button edit-button'>
                            <FontAwesomeIcon className='icon edit-icon' icon={faPenToSquare} />
                        </button>
                        <button onClick={() => handleDelete(songData.id)} className='icon-button delete-button'>
                            <FontAwesomeIcon className='icon delete-icon' icon={faDeleteLeft} />
                        </button>
                    </div>
                </div>
            </li>
            {edit && <EditModal updatedSong={songData} editMode={handleEdit}/>}
        </Fragment>
    );
}

export default MusicItem