import React, {useEffect, useState} from 'react';
import cn from "classnames";
import styles from './App.module.scss';
import Item from "../Item/Item";
import Masonry from "react-masonry-component";

function App(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         photos: []
    //     }
    // }

    const [state, changeState] = useState({photos:[], owner:null});
    useEffect(() => {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6d8260788a880a46519e5936c61f00ad&photoset_id=72157624970981280&user_id=14873749%40N02&format=json&nojsoncallback=1`)
            .then(resp => resp.json())
            .then(resp => changeState({
            photos: resp.photoset.photo,
            owner: {
                ownerName: resp.photoset.ownername,
                ownerId: resp.photoset.owner
            }
        }));
    }, [])

        const items = state.photos.map((photo, id) => {
            return <div className={cn(`col-lg-4`, `col-sm-6`, `col-12`, `my-3`, `px-3`)} key={id}><Item owner={state.owner} photo={photo}/></div>
        })
        return (
            <Masonry className={cn(styles.App)}>
                {items}
            </Masonry>
        );
    }


export default App;


