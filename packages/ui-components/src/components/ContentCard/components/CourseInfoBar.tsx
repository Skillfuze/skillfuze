import React from 'react';
import Rating from 'react-star-ratings';

interface Props {
  price: number;
  rate: number;
}

const CourseInfoBar: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex mt-2 items-center">
      <p className="text-2xl flex-grow font-bold">{props.price > 0 ? `$${props.price}` : 'FREE'}</p>
      <Rating rating={props.rate} starRatedColor="#ffc107" starDimension="15px" starSpacing="1px" />
      <p className="ml-1 mt-1 text-sm font-bold">{props.rate}</p>
    </div>
  );
};

export default CourseInfoBar;
