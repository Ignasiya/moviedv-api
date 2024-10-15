import React, { useState } from 'react'
import StarRatingItem from './star-rating-item'

interface StarRatingProps {
  initial?: number
}

export default function StarRating({ initial = 0 }: StarRatingProps) {
  const [rating, setRating] = useState<number>(initial)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = +event.target.value
    setRating(newRating)
  }

  return (
    <div className='flex items-center gap-x-[2px] relative'>
      {[...Array(20)].map((_, index) => {
        const value = (index + 1) / 2

        return (
          <StarRatingItem
            key={value}
            value={value}
            onRatingChange={handleRatingChange}
            currentRating={rating}
            hoverRating={hoverRating}
            onHoverRating={setHoverRating}
          />
        )
      })}
    </div>
  )
}
