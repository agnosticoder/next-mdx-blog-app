import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState } from 'react';
import NotesDropdown from './NotesDropdown';
import {MdCloudUpload} from 'react-icons/md';
import EditNoteModal from './EditNoteModal';
import LikeButton from './LikeButton';
import { trpc } from '../utils/trpc';
import MDXComponents from './MDXComponents';

export interface Todo {
    autherId: string;
    content: MDXRemoteSerializeResult;
    createdAt: Date;
    id: string;
    isDone: boolean;
    _count: {likedBy: number}
    likedBy: {id: string}[]
}

const Post = ({ ...todo }: Todo) => {
    console.log({ todo });
    const [isOpenModal, setIsOpenModal] = useState(false);

    const utils = trpc.useContext();
    const {mutate:deletePost} = trpc.useMutation(['post.delete'], {
        onSuccess: () => {
            utils.invalidateQueries(['post.userPosts']);
        }
    });
    const {mutate:togglePost} = trpc.useMutation(['post.toggle'], {
        onSuccess: () => {
            utils.invalidateQueries(['post.userPosts']);
        }
    });


    const { content, isDone, createdAt, id, autherId } = todo;

    //todo: to render only the excerpt of notes in the app
    //todo: when user clicks the notes then show the full note in a different dynamic path page
    //? can show full note in model as well like google does with google keep

    const onDeleteTodo = async (id: string) => {
        deletePost({postId: id});
        //todo: create error and message context and wrap the entire app
        //todo: dispatch action providing error or message
        //todo: display the message or error on top of display which will diappear after 1s
    };

    return (
        <div className='bg-stone-200 text-stone-800 post-shadow mb-3 pb-1 py-3 px-10 rounded-lg border-[1px] border-black'>
            {/*//*  todo content rendered in mdx */}
            <div className='relative mb-2'>
                <div className='post'>{content && <MDXRemote {...content} components={MDXComponents as any}/>}</div>
                <div className='absolute top-0 right-0'>
                    <NotesDropdown id={id} setIsOpenModel={setIsOpenModal} onDeleteTodo={onDeleteTodo} />
                </div>
            </div>

            {autherId && (
                //! not rendering even when logged in
                //todo: make it work, change the DB schema accordingly
                //todo: include more field in local state form DB
                //* isDone will only be available if the user is signed in
                <div className='pt-1 border-t-[1px] border-stone-400/30 flex gap-1 items-start'>
                    {/*//* toggle todo */}
                    <div className='relative'>
                        <input
                            className='absolute scale-0'
                            id={String(id)}
                            type="checkbox"
                            checked={isDone}
                            onChange={() => togglePost({ postId:todo.id, isDone: !isDone })}
                        />
                        <label
                            className='cursor-pointer'
                            title={`${isDone ? 'Unpublish' : 'Publish'}`}
                            htmlFor={String(id)}
                        >
                            <MdCloudUpload className={`${isDone ? 'text-blue-400' : 'text-blue-400/50'}`} />
                        </label>
                    </div>
                    {isDone && (
                        <LikeButton
                            totalLikes={todo._count.likedBy}
                            userId={todo.autherId}
                            postId={todo.id}
                            likedByIds={todo.likedBy.map((id) => id.id)}
                        />
                    )}
                    <div className='text-base inline-block text-pink-500 list-none'>
                        <li>{new Date(Number(createdAt)).toDateString()}</li>
                    </div>
                    <EditNoteModal todo={todo} isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} />
                </div>
            )}
        </div>
    );
};

export default Post;
