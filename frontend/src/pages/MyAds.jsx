import { useEffect } from "react"
import { useAdsContext } from '../hooks/useAdsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import AdCard from "../components/AdCard"
import AdForm from "../components/AdForm"
import AdsNavbar from "../components/AdsNavbar"

const Home = () => {
    const { ads, dispatch } = useAdsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchAds = async () => {
            const response = await fetch('/api/ads/myads', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_ADS', payload: json })
            }
        }
        if (user) {
            fetchAds()
        }
    }, [dispatch, user])

    return (
        <>
            <AdsNavbar />
            <div className="myads">
                <div className="container d-flex flex-wrap">
                    {ads && ads.map((ad) => (
                        <AdCard key={ad._id} ad={ad} buttons={true} />
                    ))}
                </div>
                <AdForm />
            </div>
        </>
    )
}

export default Home
