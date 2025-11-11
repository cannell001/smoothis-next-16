'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../lib/supabaseClient'

export default function CreatePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly.')
            return
        }

        setSubmitting(true)
        const { error } = await supabase
            .from('smoothies')
            .insert([{ title, method, rating }])

        if (error) {
            console.error(error)
            setFormError('Unable to create smoothie. Try again.')
        } else {
            setFormError(null)
            router.push('/')
        }
        setSubmitting(false)
    }

    return (
        <div className='page create'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor='method'>Method:</label>
                <textarea
                    id='method'
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                />

                <label htmlFor='rating'>Rating:</label>
                <input
                    type='number'
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />

                <button type='submit' disabled={submitting}>
                    {submitting ? 'Saving...' : 'Create Smoothie Recipe'}
                </button>

                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}
