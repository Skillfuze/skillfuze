import React, { useState } from 'react';
import { cx } from 'emotion';

import { containerStyle, listStyle, listItemStyle } from './styles';
import Input from '../Input';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  limit?: number;
  className?: string;
}

const TagsInput: React.FC<TagsInputProps> = (props: TagsInputProps) => {
  const [input, setInput] = useState('');

  const removeTag = (index: number): void => {
    const newTags = props.tags.filter((_tags, i) => i !== index);
    props.onChange(newTags);
  };

  const inputKeyDown = (e: any): void => {
    if (e.key === 'Enter' && input) {
      if (props.limit && props.limit === props.tags.length) {
        return;
      }

      if (props.tags.find(tag => tag.toLowerCase() === input.toLowerCase())) {
        return;
      }

      props.onChange([...props.tags, input]);
      setInput('');
    } else if (e.key === 'Backspace' && !input) {
      removeTag(props.tags.length - 1);
    }
  };

  return (
    <div className={cx(containerStyle, props.className)}>
      <ul className={cx(listStyle, 'mx-1')}>
        {props.tags.map((tag, index) => (
          <li className={cx(listItemStyle, 'p-0 px-3 my-1 mr-1')} key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(index)} className="ml-2">
              -
            </button>
          </li>
        ))}
        <li className="flex-grow">
          <Input
            value={input}
            type="text"
            onKeyDown={inputKeyDown}
            onChange={setInput}
            borderless
            placeholder={props.tags.length ? '' : 'Insert tag...'}
            disabled={Boolean(props.limit && props.limit === props.tags.length)}
          />
        </li>
      </ul>
    </div>
  );
};

TagsInput.defaultProps = {
  limit: 0,
};

export default TagsInput;
