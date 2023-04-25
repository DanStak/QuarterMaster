import type { NextApiRequest, NextApiResponse } from "next"
import {getAuthSession} from "@/helpers/get-auth-session";
import {Session} from "next-auth";

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse, user: Session) => unknown | Promise<unknown>) {
    return async function (req: NextApiRequest, res: NextApiResponse) {

        try {
            const session = await getAuthSession(req, res);
            if(session) {
                return handler(req, res, session)
            }

            return res.status(401).json({
                error: 'Unauthorized action. You need to be logged in to perform this action.',
            })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }


    }
}
