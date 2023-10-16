import { useAuthContext } from '../hooks/useAuthContext'

const CategoryDeleteButton = ({ id, categories, setCategories }) => {

    const { user } = useAuthContext()
    const handleDelete = async () => {

        if(!window.confirm("Ar tikrai nori pašalinti kategoriją?")) return
        console.log("delete: ", id)

        if (!user) {

            return
        }
        const response = await fetch('/api/ads/categories/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            console.log("OK, deleted category", id)
            setCategories(categories.filter(cat => cat._id !== id))
        } else {
            console.log(json.error)
        }
    }

    return (
        <span className="material-symbols-outlined red delete-category" onClick={handleDelete} >close</span>
    )
}

export default CategoryDeleteButton
