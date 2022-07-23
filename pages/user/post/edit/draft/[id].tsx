import { useRouter } from 'next/router';
import EditDraftForm from '../../../../../components/EditDraftForm';
import { trpc } from '../../../../../utils/trpc';

const EditDraft = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const {data: post, isSuccess} = trpc.useQuery(['post.get', { postId: id }],{
        enabled: !!id,
    });

    const prefill = {id, title: post?.title, content: post?.content};

    return (
        <div>
            {isSuccess && <EditDraftForm {...prefill}/>}
        </div>
    );
}

export default EditDraft;