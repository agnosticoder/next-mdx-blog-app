import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

type Unarray<T> = T extends Array<infer U> ? U : T;

type SerializeToMDXProp<T> = {
    content: string;
} & Pick<Unarray<T>, Exclude<keyof Unarray<T>, 'content'>>;

const serializeDataToMDX = async <T>(data:SerializeToMDXProp<T>[]) => {
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
