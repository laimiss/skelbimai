import { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNowStrict'
import { lt } from 'date-fns/locale'

const Comments = ({ ad_id }) => {
    const [comments, setComments] = useState('')

    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/comments/' + ad_id)
            const json = await response.json()

            if (response.ok) {
                setComments(json)
                console.log(json)
            }
        }
        fetchComments()
    }, [ad_id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = { ad: ad_id, name, text }

        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setName('')
            setText('')
            setError(null)
            setEmptyFields([])
            setComments([...comments, json])
            console.log("Naujas komentaras įrašytas", json)
        }

    }
    return (
        <div>
            <h4>Komentarai</h4>
            <ul className='comments'>
                {comments && comments.map((comment) => (
                    <li className="comment" key={comment._id}>
                        <p className='comment-name'>{comment.name}</p>
                        <p className='comment-text'>{comment.text}</p>
                        <p className="comment-time">{formatDistanceToNow(
                            new Date(comment.createdAt),
                            { addSuffix: true, locale: lt })}</p>
                    </li>
                ))}
            </ul>

            <form className="komentarai" onSubmit={handleSubmit}>
                <h6>naujas komentaras</h6>

                <label htmlFor="">vardas:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ''}
                />

                <label htmlFor="">žinutė:</label>
                <textarea
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    className={emptyFields.includes('text') ? 'error' : ''}
                />

                <button>Įrašyti</button>

                {error && <div className='error'>{error} </div>}

            </form>
        </div>
    )
}

export default Comments
