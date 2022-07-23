import {Dialog} from '@headlessui/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Todo } from './Post';
import { trpc } from '../utils/trpc';
import client from '../utils/client';

interface EditNoteModalProps {
    isOpenModal: boolean,
    onClose: () => void,
    todo: Todo
}

const EditNoteModal = ({ isOpenModal, onClose, todo }: EditNoteModalProps) => {
    const [noteUpdate, setNoteUpdate] = useState<string>('');
    const ref = useRef<HTMLTextAreaElement>(null);
    const utils = trpc.useContext();
    const { mutate } = trpc.useMutation(['post.update'], {
        onSuccess: () => {
            utils.invalidateQueries(['post.userPosts']);
            onClose();
        }
    });

    const update = { isDone: todo.isDone, content: noteUpdate };
    const { createdAt } = todo;

    const onUpdateNote = async (e: MouseEvent) => {
        e.preventDefault();
        mutate({update, postId: todo.id});
    };

    useEffect(() => {
        (async function () {
            // const res = await getTodo(todo.createdAt);
            const post = await client.query('post.get', { postId: todo.id });
            if (!post) return;
            const { content } = post;
            setNoteUpdate(content);
        })();
    }, [createdAt]);

    //todo: scroll to the end when focus, research how this works?
    //todo: put the cursor to the end word
    //todo: confirm if they want to make changes
    //? provide draft facility
    // useEffect(() => {
    //     if(!ref.current) return;
    //     ref.current.focus();
    //     // ref.current.scrollTop = ref.current.scrollHeight;
    // }, [ref])

    return (
        <div>
            {/* //todo: add animation using any libarary */}
            <Dialog className='fixed inset-0' onClose={onClose} open={isOpenModal}>
                <Dialog.Overlay className='fixed inset-0 bg-stone-900/50' />
                <div className='fixed inset-14 z-10 bg-stone-100 post-shadow rounded-lg p-6'>
                    <Dialog.Title className='text-3xl'>Make Changes</Dialog.Title>
                    <Dialog.Description className='text-xl mb-4'>
                        Caution, changes will be overwrite the previous content
                    </Dialog.Description>
                    <textarea
                        ref={ref}
                        className='resize-none w-full h-96 block mb-8'
                        value={noteUpdate}
                        onChange={(e) => setNoteUpdate(e.currentTarget.value)}
                    />
                    <div className='flex gap-1 text-stone-200'>
                        <button className='bg-stone-500 rounded p-1' onClick={onUpdateNote}>Update</button>
                        <button className='bg-stone-500 rounded p-1' onClick={onClose}>Close</button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditNoteModal;
