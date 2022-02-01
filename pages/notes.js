import App from '../components/Home/App';
import getTodos from '../lib/getTodos';
import filterDataToMDX from '../utils/dataFilterToMDX';

export default function Notes({ data }) {
    return (
        <div>
            <div className="container">
                <App data={data} />
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const res = await (await getTodos()).json();
    const filteredData = await filterDataToMDX(res);
    const data = await Promise.all(filteredData);
    console.log({ data });

    return {
        props: {
            data,
        },
    };
};
