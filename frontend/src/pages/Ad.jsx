import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments'

const Ad = () => {
  const params = useParams()
  const adId = params.id
  const [ad, setAd] = useState({

    title: "",
    description: "",
    category: {
      name: ""
    }

  })

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch('/api/ads/' + adId)
      const json = await response.json()

      if (response.ok) {
        setAd(json)
        console.log(json)
      }
    }
    fetchAd()
  }, [adId])
  return (
    <div className='ad-info'>
      <h2>{ad.title}</h2>
      <p className='kategorija'>{ad.category.name}</p>
      <img src="../no-image.png" alt="not found" />
      <p>{ad.description}</p>
      <p className='kaina'> {ad.price} €</p>

      <Comments ad_id={adId} />
    </div>
  )
}

export default Ad
