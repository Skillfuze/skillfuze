/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import { cx } from 'emotion';
import { carouselChild, arrowBtnStyle } from './styles';
import NextIcon from '../../assets/icons/next.svg';
import BackIcon from '../../assets/icons/back.svg';

const ReactCarousel = require('react-multi-carousel').default;

interface Props {
  children: React.ReactNode;
  className: string;
}
const CustomArrow = ({ onClick, direction }: any) => {
  return (
    <button
      className={cx(
        `flex justify-center react-multiple-carousel__arrow react-multiple-carousel__arrow--${direction}`,
        arrowBtnStyle,
      )}
      onClick={onClick}
    >
      {direction === 'left' ? <BackIcon fill="white" width={15} /> : <NextIcon fill="white" width={15} />}
    </button>
  );
};
const Carousel: React.FC<Props> = (props: Props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 15,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 5,
    },
  };
  return (
    <ReactCarousel
      customRightArrow={<CustomArrow direction="right" />}
      customLeftArrow={<CustomArrow direction="left" />}
      sliderClass={carouselChild}
      partialVisbile
      itemClass="py-1"
      responsive={responsive}
      className={props.className}
    >
      {props.children}
    </ReactCarousel>
  );
};

export default Carousel;
