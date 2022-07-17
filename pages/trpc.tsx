import {trpc} from '../utils/trpc';

const Trpc = () => {
    const {data} = trpc.useQuery(['hello']);

    console.log('data', data);

    return (
        <div>Setting Up Trpc</div>
    );
};

export default Trpc;