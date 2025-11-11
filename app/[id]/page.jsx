'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import supabase from '../../lib/supabaseClient'

export default function UpdatePage() {
    const params = useParams()
    const router = useRouter()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!id) return

        const fetchSmoothie = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .eq('id', id)
                .single()

            if (error || !data) {
                router.replace('/')
                return
            }

            setTitle(data.title)
            setMethod(data.method)
            setRating(data.rating)
            setLoading(false)
        }

        fetchSmoothie()
    }, [id, router])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly.')
            return
        }

        setSaving(true)
        const { error } = await supabase
            .from('smoothies')
            .update({ title, method, rating })
            .eq('id', id)

        if (error) {
            console.error(error)
            setFormError('Unable to update smoothie. Try again.')
        } else {
            setFormError(null)
            router.push('/')
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className='page create'>
                <p>Loading smoothie...</p>
            </div>
        )
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

                <button type='submit' disabled={saving}>
                    {saving ? 'Saving...' : 'Update Smoothie Recipe'}
                </button>

                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}
