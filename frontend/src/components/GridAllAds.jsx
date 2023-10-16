import { useEffect, useState } from "react"

import AdCard from "../components/AdCard"
import AdsNavbar from "./AdsNavbar"

const GridAllAds = () => {

    const [ads, setAds] = useState('')

    useEffect(() => {
        const fetchAds = async () => {
            const response = await fetch('/api/ads')
            const json = await response.json()

            if (response.ok) {
                setAds(json)
                console.log(json)
            }
        }
        fetchAds()
    }, [])

    return (
        <>
            <AdsNavbar />

            <div className="container d-flex flex-wrap">
                {ads && ads.map((ad) => (
                    <AdCard key={ad._id} ad={ad} buttons={false} />
                ))}

            </div>
        </>
    )
}

export default GridAllAds
