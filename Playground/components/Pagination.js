import PaginationButton from './PaginationButton';

const Pagination = ({ currentPageIndex, posts, postsPerPage, setCurrentPageIndex }) => {
    const numberOfPosts = posts.length;
    const numberOfPages = Math.ceil(numberOfPosts / postsPerPage);
    const pagesArray = [];

    for (let i = 1; i <= numberOfPages; i++) {
        pagesArray.push(i);
    }

    return (
        <div className="page-number-wrapper">
            <PaginationButton
                currentPageIndex={currentPageIndex}
                pagesArray={pagesArray}
                setCurrentPageIndex={setCurrentPageIndex}
            />
        </div>
    );
};

export default Pagination;
