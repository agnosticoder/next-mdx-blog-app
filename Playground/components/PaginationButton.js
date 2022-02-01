import React from 'react';

const PaginationButton = ({ currentPageIndex, pagesArray, setCurrentPageIndex }) => {
    const name = 'Sani';

    return (
        <div>
            {pagesArray.map((pageNumber) => (
                <button
                    type="button"
                    onClick={() => setCurrentPageIndex(pageNumber - 1)}
                    className={`page-number ${pageNumber - 1 === currentPageIndex ? 'current-page' : ''}`}
                    key={pageNumber}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default PaginationButton;
