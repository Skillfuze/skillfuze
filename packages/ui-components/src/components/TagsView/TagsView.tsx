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
      <ul className={cx(listStyle)}>
        {props.tags?.map((tag) => (
          <li className={cx(listItemStyle, 'py-2 px-3 mr-1')} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

TagsView.defaultProps = {
  tags: [],
};

export default TagsView;
