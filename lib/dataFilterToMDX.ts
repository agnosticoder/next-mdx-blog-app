import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import produce from 'immer';

type Unarray<T> = T extends Array<infer U> ? U : T;

type SerializeToMDXProps<T> = {
    content: string;
} & Omit<Unarray<T>, 'content'>;

const serializeDataToMDXArray = async <T>(data:SerializeToMDXProps<T>[]) => {
    const serializedData = await data.map(async (post) => {
        const serializedPost = {
            ...post,
            content: await serialize(post.content, { parseFrontmatter: true, mdxOptions: {remarkPlugins:[remarkGfm], rehypePlugins: [rehypeHighlight]}}),
        };
        return serializedPost;
    });
    
    //* I want to return serialzedContent with any arbitrary data passed along with it
    return await Promise.all(serializedData);
};

export default serializeDataToMDXArray;

export const serializeDataToMDX = async <T>(data: SerializeToMDXProps<T>) => {
    const serializedData = {
        ...data,
        content: await serialize(data.content, { parseFrontmatter: true, mdxOptions: {remarkPlugins:[remarkGfm], rehypePlugins: [rehypeHighlight]}}),
    };
    return serializedData;
}
