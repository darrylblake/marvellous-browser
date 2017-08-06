import React from 'react'
import ComicsTile from './ComicsTile'
import './Comics.pcss'

const Comics = ({ comics }) => {
  return <div className="comics">
    {comics &&
      comics.map((comic) => <ComicsTile key={comic.id} comic={comic}/>)
    }
  </div>
}

export default Comics
