import createRouter from '../createRouter';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';
import bcryptjs from 'bcryptjs';

const userRouter = createRouter()
.mutation('login', {
    input: z.object({
        email: z.string(),
        password: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
        const {email, password} = input;
       //*check if user exist by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        //* if not user by email not found
        if (!user) throw new TRPCError({code: 'BAD_REQUEST', message: 'Email or password incorrect'});

        //* get hash form database
        const hash = user.password;
        const isMatch = await bcryptjs.compare(password, hash);

        if (!isMatch) throw new TRPCError({code: 'BAD_REQUEST', message: 'Email or password incorrect'});

        //* setup the session
        //* todo: don't pass user email and password in session
        ctx.session.user = {
            id: user.id,
        };
        await ctx.session.save();
        return { name: user.name, email };
    }
})
.mutation('signup', {
    input: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8),
    }),
    resolve: async ({ input, ctx }) => {
            const {name, email, password} = input;
            const isEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if(isEmail) throw new TRPCError( {code: 'BAD_REQUEST', message:'This email already exist'});

            const hash = await bcryptjs.hash(password, 10);
            const user = await prisma.user.create({
                data: { name, email, password: hash },
            });
            ctx.session.user = {
                id: user.id,
            }
            await ctx.session.save();
            return { name, email };
    }
});

export default userRouter;