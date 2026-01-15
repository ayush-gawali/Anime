import React, { useEffect, useState } from 'react'
import ColectionCard from './Card';
import { getUserCollections } from '../../services/user.api';

function CollectionLayout({ animeId }) {

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getUserCollections().then(res => {
      setCollections(res.data);
    });
  }, []);

  return (
    <ColectionCard
      collections={collections}
      setCollections={setCollections}
      animeId={animeId}
    />
  )
}

export default CollectionLayout