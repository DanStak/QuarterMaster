import {NextApiRequest, NextApiResponse} from "next";
import {Session} from "next-auth";
import {z} from "zod";
import {withValidate} from "@/lib/api-middlewares/with-validate";
import {withMethods} from "@/lib/api-middlewares/with-methods";
import {withAuth} from "@/lib/api-middlewares/with-auth";
import {RouteArgs} from "@/types";
import {db} from "@/lib/db";
import {RemoveCause} from ".prisma/client";

const POST = async ({req, res}: RouteArgs) => {
    try {
        await db.item.create({
            data: {
                ...req.body
            }
        })

        return res.status(200).json({message: 'Item added successfully'})

    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }

}

const PATCH = async ({req, res}: RouteArgs) => {
    try {
        const data = req.body;
        delete data.id;

        await db.item.update({
            where: {
                id: req.body.id
            },
            data: {
                ...data
            }
        })

        return res.status(200).json({message: 'Product updated successfully'})

    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }

}

async function handler(req: NextApiRequest, res: NextApiResponse, session: Session) {

    if(req.method === 'POST') {
        const shape = z.object({
            productId: z.string().cuid(),
            expirationDate: z.date().optional(),
            price: z.number().nonnegative().optional(),
        })

        await withValidate({req, res, session}, shape, POST)
    }

    if(req.method === 'PATCH') {

        const shape = z.object({
            id: z.string().cuid(),
            expirationDate: z.date().optional(),
            price: z.number().nonnegative().optional(),
            removeCause: z.nativeEnum(RemoveCause)
        })
        withValidate({ req, res, session }, shape, PATCH)
    }
}

export default withMethods(['POST', 'PATCH'], withAuth(handler))