import React from 'react';
import { cx } from 'emotion';

import { listStyle, listItemStyle } from './styles';

interface TagsProps {
  tags: string[];
  className?: string;
}

const TagsView: React.FC<TagsProps> = (props: TagsProps) => {
  return (
    <div className={cx(props.className)}>
      <ul className={cx(listStyle, 'mx-1')}>
        {props.tags.map(tag => (
          <li className={cx(listItemStyle, 'p-1 px-3 my-1 mr-1')} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsView;
