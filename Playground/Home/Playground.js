import { useState } from 'react';
import Play from '../Play';
import Test from '../Test';
import Counter from '../Counter';
import Input from '../Input';
import Mdx from '../Mdx';
import PaginationButton from '../components/PaginationButton';

const Playground = () => {
    const playgrounds = [Mdx, Play, Test, Counter, Input];
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const CurrentPage = playgrounds[currentPageIndex];

    const pagesArray = [];
    for (let i = 1; i <= playgrounds.length; i++) {
        pagesArray.push(i);
    }

    return (
        <div>
            <div className="playground-header">
                <h1>Playground</h1>
                <PaginationButton
                    pagesArray={pagesArray}
                    setCurrentPageIndex={setCurrentPageIndex}
                    currentPageIndex={currentPageIndex}
                />
            </div>
            <div className="container">
                <CurrentPage />
            </div>
        </div>
    );
};

export default Playground;
