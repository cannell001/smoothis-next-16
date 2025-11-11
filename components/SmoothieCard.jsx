'use client'

import Link from 'next/link'
import supabase from '../lib/supabaseClient'

const SmoothieCard = ({ smoothie, onDelete }) => {
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select()

        if (error) {
            console.error('Failed to delete smoothie', error)
            return
        }

        if (data) {
            onDelete(smoothie.id)
        }
    }

    return (
        <div className='smoothie-card'>
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className='rating'>{smoothie.rating}</div>
            <div className='buttons'>
                <Link href={`/${smoothie.id}`}>
                    <i className='material-icons'>edit</i>
                </Link>
                <i className='material-icons' onClick={handleDelete}>
                    delete
                </i>
            </div>
        </div>
    )
}

export default SmoothieCard
