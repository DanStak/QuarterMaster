import {NextApiRequest, NextApiResponse} from "next";
import {Session} from "next-auth";

export interface RouteArgs {
    req: NextApiRequest,
    res: NextApiResponse,
    session?: Session
}