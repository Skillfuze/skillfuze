/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { Category } from '@skillfuze/types';

import { generateURL } from '../utils/navigate';
import { useOnClickOutside } from '../utils/useOnClickOutside';
import Grid from '../../assets/icons/grid.svg';
import { CategoriesService } from '../services/categories.service';

const Categories = () => {
  const [showPopper, setShowPopper] = useState(false);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoriesPopperRef = useRef(null);
  const categoriesButtonRef = useRef(null);
  useOnClickOutside(categoriesPopperRef, () => {
    setShowPopper(false);
  });

  useEffect(() => {
    const loadCategories = async () => {
      setCategories(await CategoriesService.getAll());
    };
    loadCategories();
  }, []);

  const { styles, attributes } = usePopper(categoriesButtonRef.current, categoriesPopperRef.current, {
    placement: 'bottom-start',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <div>
      <button
        type="button"
        className="text-grey-dark flex space-x-2 outline-none text-sm items-center"
        ref={categoriesButtonRef}
        onClick={() => setShowPopper(!showPopper)}
      >
        <Grid width="15" height="15" />
        <p>Categories</p>
      </button>
      {showPopper && (
        <div
          className="bg-white shadow rounded-sm p-4 pb-0 space-y-4 flex flex-col items-start z-50"
          style={styles.popper}
          ref={categoriesPopperRef}
          {...attributes.popper}
        >
          {categories.map((category) => (
            <a href={generateURL(`/categories/${category.slug}`)} className="outline-none text-grey-dark text-sm">
              {`${category.name}`}
            </a>
          ))}
          <div ref={setArrowElement} />
        </div>
      )}
    </div>
  );
};
export default Categories;
