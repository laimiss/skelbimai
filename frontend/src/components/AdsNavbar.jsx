import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from 'react-bootstrap/Navbar'

const AdsNavbar = () => {

    const { user } = useAuthContext()

    if (!user) return
    
    return (
        <Navbar>
            <Link to="/">Visi skelbimai</Link>
            {user && <Link to="/myAds">Mano skelbimai</Link>}
            {user && user.admin && <Link to="/admin" style={{color: "red"}}>Admin</Link>}

        </Navbar>
    )
}

export default AdsNavbar
