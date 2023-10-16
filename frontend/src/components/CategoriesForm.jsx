import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import CategoryDeleteButton from './CategoryDeleteButton'

const CategoriesForm = () => {
    const { user } = useAuthContext()

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/ads/categories')
            const json = await response.json()

            if (response.ok) {
                setCategories(json)
                console.log(json)
            }
        }
        fetchCategories()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }

        const category = { name }

        const response = await fetch('/api/ads/categories', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setName('')
            setError(null)
            setEmptyFields([])
            setCategories([...categories, json])
            console.log("Nauja kategorija įrašyta", json)
        }

    }

    return (

        <form className="create kategorijos" onSubmit={handleSubmit}>

            <ul className="categories">
                {categories && categories.map((cat) => (
                    <li key={cat._id}>{cat.name} <CategoryDeleteButton id={cat._id} categories={categories} setCategories={setCategories} /></li>
                ))}
            </ul>
            <h3>Nauja kategorija</h3>

            <label>Pavadinimas:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <button>Įrašyti</button>

            {error && <div className='error'>{error} </div>}
        </form>
    )
}

export default CategoriesForm
