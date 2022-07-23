import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

type CreatePostFormInput = {
    title: string;
    content: string;
}

const CreatePostForm = ({isEditing}: {isEditing: boolean}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePostFormInput>();
    const { mutate, error } = trpc.useMutation(['post.create'], {
        onSuccess: (data) => {
            if (data.isDone) {
                router.push('/');
                return;
            }
            router.push('/user/dashboard');
        },
    });

    const onCreatePost = ({ content, title }: CreatePostFormInput) => {
        mutate({ content, title, isDone: true });
    };

    const onSaveAsDraft = ({ content, title }: CreatePostFormInput) => {
        mutate({ content, title, isDone: false });
    };

    return (
        <div className="fixed sm:top-20 sm:bottom-16 sm:inset-12 inset-1 top-20 bottom-16">
            {/* {error?.data?.code === 'PARSE_ERROR' && (
                <div className="bg-red-200 text-red-800 p-4 rounded-lg">
                    Invalid Syntax
                    <pre>{error.message}</pre>
                </div>
            )} */}
            <form className="h-full w-full" onSubmit={handleSubmit(onCreatePost)}>
                {/* eslint-disable-next-line react/self-closing-comp */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Title"
                        className="rounded-md mb-4 w-full h-14 text-xl"
                        {...register('title', { required: { value: true, message: 'Required' } })}
                    />
                    {errors?.title && (
                        <span className="text-red-500 absolute bottom-0 left-0 text-xs">{errors.title.message}</span>
                    )}
                </div>
                <div className="relative w-full h-[calc(100%-90px)] mb-4 pb-4">
                    <textarea
                        className="w-full h-full resize-none rounded-md"
                        placeholder="Write your post here..."
                        {...register('content', { required: { value: true, message: 'Required' } })}
                    />
                    {errors?.content && (
                        <div className="text-red-500 absolute bottom-0 left-0 text-xs">{errors.content.message}</div>
                    )}
                </div>
                <div className="flex justify-between">
                    <div>
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-4"
                            type="submit"
                        >
                            Publish
                        </button>
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-[7px] px-4 border border-gray-400 rounded shadow"
                            type="button"
                            onClick={handleSubmit(onSaveAsDraft)}
                        >
                            Save as Draft
                        </button>
                    </div>
                    <Link href={'/'}>
                        <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Dismiss</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm;
