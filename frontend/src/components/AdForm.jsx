import React, { useState, useEffect } from 'react'
import { useAdsContext } from '../hooks/useAdsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const AdForm = () => {
    const { dispatch } = useAdsContext()
    const { user } = useAuthContext()

    const [categories, setCategories] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')

    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/ads/categories')
            const json = await response.json()

            if (response.ok) {
                setCategories(json)
                // setCategory(json[0])
                console.log(json)
            }
        }
        fetchCategories()
    }, [])

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }

        const ad = { title, description, price, category }

        const response = await fetch('/api/ads', {
            method: 'POST',
            body: JSON.stringify(ad),
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
            setTitle('')
            setDescription('')
            setPrice('')
            setError(null)
            setEmptyFields([])
            console.log("Naujas skelbimas įrašytas", json)
            dispatch({ type: 'CREATE_AD', payload: json })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Naujas skelbimas</h3>

            <label htmlFor="">Kategorija:</label>
            <select
                name="category"
                id="category"
                required
                onChange={e => handleCategoryChange(e)}
                className={emptyFields.includes('category') ? 'error' : ''}
            >
                <option value="" hidden>- Kategorija -</option>
                {categories && categories.map((cat) => (
                    <option value={cat._id} key={cat._id}>{cat.name}</option>
                ))}
            </select>

            <label htmlFor="">Pavadinimas:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label htmlFor="">Aprašymas:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}

            />

            <label htmlFor="">Kaina:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />

            <button>Įrašyti</button>

            {error && <div className='error'>{error} </div>}

        </form>
    )
}

export default AdForm
