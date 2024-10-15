import React from 'react'
import { StarFullIcon, StarHalfIcon } from '@/icons'

interface StarRatingItemProps {
  value: number
  currentRating: number
  onRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onHoverRating: (rating: number | null) => void
  hoverRating: number | null
}

export default function StarRatingItem({
  onRatingChange,
  onHoverRating,
  currentRating,
  value,
  hoverRating
}: StarRatingItemProps) {
  const halfValue = value % 1 !== 0

  return (
    <label
      key={value}
      className={`cursor-pointer${halfValue ? ' absolute' : ''}`}
      style={halfValue ? { left: `${22 * Math.trunc(value)}px` } : {}}
      onMouseEnter={() => onHoverRating(value)}
      onMouseLeave={() => onHoverRating(null)}
    >
      <input
        type='radio'
        name='rating'
        value={value}
        className='hidden'
        checked={currentRating === value}
        onChange={onRatingChange}
      />
      <span
        className={`text-2xl transition-colors ${hoverRating && hoverRating >= value ? 'lg:text-yellow-300' : ''}
          ${currentRating >= value ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        {halfValue ? <StarHalfIcon /> : <StarFullIcon />}
      </span>
    </label>
  )
}
