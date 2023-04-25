import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {NextApiRequest, NextApiResponse} from "next";

export const getAuthSession = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getServerSession(req, res, authOptions);

        if(session) return session;

        return null;

    } catch (error) {
        return Promise.reject(error);
    }

}