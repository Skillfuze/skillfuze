/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button } from '@skillfuze/ui-components';
import Link from 'next/link';

interface Props {
  title: string;
  moreText: string;
  carousel: React.ReactNode;
  moreHref: string;
  hidden?: boolean;
}

const RecommendationCarousel: React.FC<Props> = (props: Props) => (
  <div className={`container p-4 ${props.hidden ? 'hidden' : ''}`}>
    <div className="container flex row justify-between mb-4 flex-wrap">
      <h1 className="font-bold mb-4">{props.title}</h1>
      <Button className="mb-4" variant="outlined" color="primary" size="large">
        <Link href={props.moreHref}>
          <a>{props.moreText}</a>
        </Link>
      </Button>
    </div>
    {props.carousel}
  </div>
);

RecommendationCarousel.defaultProps = {
  hidden: false,
};

export default RecommendationCarousel;
