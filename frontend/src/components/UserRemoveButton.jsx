import { useAuthContext } from '../hooks/useAuthContext'

const UserRemoveButton = ({ id, users, setUsers }) => {

    const { user } = useAuthContext()
    const handleDelete = async () => {

        if(!window.confirm("Ar tikrai nori pašalinti vartotoją?")) return
        console.log("delete user: ", id)

        if (!user) {

            return
        }
        const response = await fetch('/api/user/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            console.log("OK, deleted user", id)
            setUsers(users.filter(u => u._id !== id))
        } else {
            console.log(json.error)
        }
    }

    return (
        <span className="material-symbols-outlined red delete-category" onClick={handleDelete} >close</span>
    )
}

export default UserRemoveButton
