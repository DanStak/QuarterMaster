import {NextApiRequest, NextApiResponse} from "next";
import {withMethods} from "@/lib/api-middlewares/with-methods";
import {withAuth} from "@/lib/api-middlewares/with-auth";
import {RouteArgs} from "@/types/route-args";
import {db} from "@/lib/db";

type RouteArgsWithoutSession = Omit<RouteArgs, 'session'>

const DELETE = async ({req, res}: RouteArgsWithoutSession) => {
    try {
        const id = Array.isArray(req.query?.productId) ? req.query?.productId[0] : req.query.productId

        if(!!id) {
            await db.product.delete({
                where: {
                    id
                },
            })
            return res.status(200).json({message: 'Product removed successfully'})
        } else {
            return res.status(404).json({message: 'Product not found'})
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Internal Server Error' })
    }

}

async function handler(req: NextApiRequest, res: NextApiResponse) {

    await DELETE({req, res})

}

export default withMethods(['DELETE'], withAuth(handler))