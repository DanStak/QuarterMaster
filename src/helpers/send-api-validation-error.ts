import {NextApiResponse} from "next";
import {undefined, ZodFormattedError} from "zod";

export const sendApiValidationErrors = (res: NextApiResponse, errors: ZodFormattedError<any> | undefined): void => {
    res.status(422).json({ errors });
};