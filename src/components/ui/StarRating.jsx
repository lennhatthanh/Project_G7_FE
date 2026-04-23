import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const StarRating = ({ totalStars = 5, onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (star) => {
        setRating(star);
        if (onRatingChange) onRatingChange(star);
    };

    return (
        <div className="flex space-x-1">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={starValue}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        className="focus:outline-none"
                    >
                        <FontAwesomeIcon
                            className={`transition-colors duration-150 ${
                                starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            icon={faStar}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
