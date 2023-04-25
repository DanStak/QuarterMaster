import {z} from "zod";

export const validateRequestBody = <T extends z.ZodType<any>>(shape: T) => (data: any) => {

    try {
        shape.parse(data);

        return true;
    } catch (error) {

        if(error instanceof z.ZodError) {
            return error.format();
        }
    }

};