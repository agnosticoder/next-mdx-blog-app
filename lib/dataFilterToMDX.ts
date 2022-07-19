import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

type SerializeToMDXProp = {
    content: string;
    //* can be any arbitrary data
} 

const serializeDataToMDX = async (data:SerializeToMDXProp[]) => {
    const serializedData = await data.map(async (post) => {
        const serializedPost = {
            ...post,
            content: await serialize(post.content, {mdxOptions: {remarkPlugins:[remarkGfm]}}),
        };
        return serializedPost;
    });
    
    //* I want to return serialzedContent with any arbitrary data passed along with it
    return await Promise.all(serializedData);
};

export default serializeDataToMDX;





 interface Post{
    content: string,
    createdAt: string,
    id: number,
    likedBy: {name:string, id: number, email: string}[]
    isDone: boolean
}

 interface PostSerilized{
    content: MDXRemoteSerializeResult,
    createdAt: string,
    id: number,
    likedBy: {name:string, id: number, email: string}[]
    isDone: boolean
}

interface Post2 {
    autherId: number;
    content: string;
    createdAt: string;
    id: number;
    isDone: boolean;
    _count: {likedBy: number}
    likedBy: {id: number}[]
}

interface PostSerilized2 {
    autherId: number;
    content: MDXRemoteSerializeResult;
    createdAt: string;
    id: number;
    isDone: boolean;
    _count: {likedBy: number}
    likedBy: {id: number}[]
}