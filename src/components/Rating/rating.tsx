interface RatingProps {
  rating: number
}

export default function Rating({ rating }: RatingProps) {
  const roundedRating = Math.round(rating * 10) / 10

  const getColor = (rating: number) => {
    if (rating <= 3) return 'border-[#E90000]'
    if (rating <= 5) return 'border-[#E97E00]'
    if (rating <= 7) return 'border-[#E9D100]'
    return 'border-[#66E900]'
  }

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${getColor(
        roundedRating
      )}`}
    >
      <span className='font-medium text-xs text-black'>{roundedRating}</span>
    </div>
  )
}
