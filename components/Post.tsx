import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState } from 'react';
import styles from '../styles/modules/TodoItem.module.scss';
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

//Todo: This was just experiment, please remove this form here and all its references
const Ins = ({children, ...rest}:{children: string}) => (
    <ins style={{fontSize: 'small'}} {...rest}>{children}</ins>
);

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
        <div className={styles.container}>
            {/*//*  todo content rendered in mdx */}
            <div className={styles.noteWrapper}>
                <div className={styles.todo}>{content && <MDXRemote {...content} components={MDXComponents as any}/>}</div>
                <div className={styles.menu}>
                    <NotesDropdown id={id} setIsOpenModel={setIsOpenModal} onDeleteTodo={onDeleteTodo} />
                </div>
            </div>

            {autherId && (
                //! not rendering even when logged in
                //todo: make it work, change the DB schema accordingly
                //todo: include more field in local state form DB
                //* isDone will only be available if the user is signed in
                <div className={styles.dateWrapper}>
                    {/*//* toggle todo */}
                    <div className={styles.doneWrapper}>
                        <input
                            className={styles.checkbox}
                            id={String(id)}
                            type="checkbox"
                            checked={isDone}
                            onChange={() => togglePost({ postId:todo.id, isDone: !isDone })}
                        />
                        <label
                            className={styles.publish}
                            title={`${isDone ? 'Unpublish' : 'Publish'}`}
                            htmlFor={String(id)}
                        >
                            <MdCloudUpload className={`${isDone ? styles.done : styles.notDone}`} />
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
                    <div className={styles.date}>
                        <li>{new Date(Number(createdAt)).toDateString()}</li>
                    </div>
                    <EditNoteModal todo={todo} isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} />
                </div>
            )}
        </div>
    );
};

export default Post;
