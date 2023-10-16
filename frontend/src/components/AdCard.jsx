import { useAdsContext } from "../hooks/useAdsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import formatDistanceToNow from 'date-fns/formatDistanceToNowStrict'
import { lt } from 'date-fns/locale'

const AdCard = ({ ad, buttons }) => {
    const { dispatch } = useAdsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation()
        if (!window.confirm("Ar tikrai nori pašalinti skelbimą?")) return
        if (!user) {

            return
        }
        const response = await fetch('/api/ads/' + ad._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_AD', payload: json })
        } else {
            console.log(json.error)
        }
    }

    const navigateToAd = () => {
        navigate('/ad/' + ad._id)
    }

    return (

        <Card onClick={navigateToAd} style={{ width: '18rem' }} className="ad-detail  shadow-lg" >
            <Card.Img variant="top" src="/no-image.png" />
            <Card.Body >
                {ad.category &&
                    <p className="kategorija">{ad.category.name}</p>

                }
                <Card.Title>{ad.title}</Card.Title>
                <Card.Subtitle className="mb-3"> {ad.price} €</Card.Subtitle>
                <Card.Text as="div">
                    <p>{ad.description}</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <p className="time">{formatDistanceToNow(
                    new Date(ad.createdAt),
                    { addSuffix: true, locale: lt })}</p>
                <p className="autorius">{ad.user.email}</p></Card.Footer>
            <Card.Footer className="text-muted">
                <ButtonGroup hidden={!buttons} className="p-2">
                    <Button variant="outline-danger" size="sm" title="delete ad" onClick={handleDelete}>
                        <span className="material-symbols-outlined red" >delete</span>
                    </Button>
                </ButtonGroup>
            </Card.Footer>


        </Card >
    )
}

export default AdCard
