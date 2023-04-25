import {NextApiRequest, NextApiResponse} from "next";
import {withMethods} from "@/lib/api-middlewares/with-methods";
import {z} from "zod";
import {withAuth} from "@/lib/api-middlewares/with-auth";
import {Session} from "next-auth";
import {db} from "@/lib/db";
import {withValidate} from "@/lib/api-middlewares/with-validate";
import {RouteArgs} from "@/types/route-args";

const POST = async ({req, res, session}: RouteArgs) => {
    try {

        const existedStock = await db.stockroom.findFirst({where: { name: req.body.name }});

        if(!!existedStock) return res.status(400).json({message: 'Magazyn o tej nazwie już istnieje.'})

        await db.stockroom.create({
            data: {
                name: req.body.name,
                ownerId: session.user.id
            }
        })

        return res.status(200).json({message: 'Stockroom created successfully'})

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const PATCH = async ({req, res}: RouteArgs) => {
    try {
        await db.stockroom.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
            }
        })

        return res.status(200).json({ message: 'Stockroom updated successfully' })

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
async function handler(req: NextApiRequest, res: NextApiResponse, session: Session) {

    if(req.method === 'POST') {

        const shape = z.object({
            name: z.string().min(5)
        })

        await withValidate({req, res, session}, shape, POST)
    }

    if(req.method === 'PATCH') {

        const shape = z.object({
            name: z.string().min(5),
            id: z.string().cuid(),
        })
        withValidate({ req, res, session }, shape, PATCH)
    }
}

export default withMethods(['POST', 'PATCH'], withAuth(handler))