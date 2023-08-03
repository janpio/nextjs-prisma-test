import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export default function Pagination({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: Props) {
  let pages = [];

  const pagesNumber = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= pagesNumber; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button
            type='button'
            key={index}
            hidden={pagesNumber == 1}
            onClick={() => setCurrentPage(page)}
            className={`${
              page == currentPage ? 'active' : ''
            }inline-block mr-1 mb-1 px-3 py-1.5 bg-indian-khaki-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indian-khaki-700 hover:shadow-lg focus:bg-indian-khaki-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indian-khaki-800 active:shadow-lg transition duration-150 ease-in-out`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
