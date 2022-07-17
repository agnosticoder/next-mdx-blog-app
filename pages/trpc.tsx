import {trpc} from '../utils/trpc';

const Trpc = () => {
    const {data} = trpc.useQuery(['post.dashboard', {}]);

    console.log('data', data);

    return (
        <div>Setting Up Trpc</div>
    );
};

export default Trpc;