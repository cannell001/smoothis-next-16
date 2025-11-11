'use client'

import { useEffect, useState } from 'react'
import SmoothieCard from '../components/SmoothieCard'
import supabase from '../lib/supabaseClient'

export default function HomePage() {
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState([])
    const [orderBy, setOrderBy] = useState('created_at')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSmoothies = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .order(orderBy, { ascending: false })

            if (error) {
                setFetchError('Could not fetch the smoothies')
                setSmoothies([])
            } else if (data) {
                setSmoothies(data)
                setFetchError(null)
            }
            setLoading(false)
        }

        fetchSmoothies()
    }, [orderBy])

    const handleDelete = (id) => {
        setSmoothies((prev) => prev.filter((smoothie) => smoothie.id !== id))
    }

    return (
        <div className='page home'>
            {fetchError && <p>{fetchError}</p>}
            {loading && <p>Loading smoothies…</p>}
            {!loading && smoothies.length === 0 && (
                <p>No smoothies found. Create your first one!</p>
            )}
            {smoothies.length > 0 && (
                <div className='smoothies'>
                    <div className='order-by'>
                        <p>Order by:</p>
                        <button onClick={() => setOrderBy('created_at')}>
                            Time Created
                        </button>
                        <button onClick={() => setOrderBy('title')}>
                            Title
                        </button>
                        <button onClick={() => setOrderBy('rating')}>
                            Rating
                        </button>
                    </div>
                    <div className='smoothie-grid'>
                        {smoothies.map((smoothie) => (
                            <SmoothieCard
                                key={smoothie.id}
                                smoothie={smoothie}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
