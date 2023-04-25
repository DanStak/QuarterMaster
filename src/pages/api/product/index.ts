import {NextApiRequest, NextApiResponse} from "next";
import {Session} from "next-auth";
import {z} from "zod";
import {withValidate} from "@/lib/api-middlewares/with-validate";
import {withMethods} from "@/lib/api-middlewares/with-methods";
import {withAuth} from "@/lib/api-middlewares/with-auth";
import {RouteArgs} from "@/types/route-args";
import {db} from "@/lib/db";

const POST = async ({req, res}: RouteArgs) => {
    try {
        const existedProduct = await db.product.findFirst({where: { name: req.body.name }})

        if(existedProduct && req.body.forceAdd) {
            return res.status(200).json({ code: 'product-with-this-name-exist' });
        }
        console.log(req.body)

        await db.product.create({
            data: {
                ...req.body
            }
        })

        return res.status(200).json({message: 'Product added successfully'})

    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }

}

const PATCH = async ({req, res}: RouteArgs) => {
    try {
        const data = req.body;
        delete data.id;

        await db.product.update({
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
            name: z.string().min(1),
            stockroomId: z.string().cuid(),
            forceAdd: z.boolean().optional(),
        })

        await withValidate({req, res, session}, shape, POST)
    }

    if(req.method === 'PATCH') {

        const shape = z.object({
            name: z.string().min(5).optional(),
            stockroomId: z.string().cuid().optional(),
            id: z.string().cuid()
        })
        withValidate({ req, res, session }, shape, PATCH)
    }
}

export default withMethods(['POST', 'PATCH'], withAuth(handler))