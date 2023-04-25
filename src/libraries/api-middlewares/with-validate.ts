import {validateRequestBody} from "@/helpers/validate-request-body";
import {sendApiValidationErrors} from "@/helpers/send-api-validation-error";
import {RouteArgs} from "@/types/route-args";
import {z} from "zod";

type Handler = (args: RouteArgs) => unknown | Promise<unknown>;
export const withValidate = (routeProps: RouteArgs, shape: z.ZodType<any>, handler: Handler) => {
    const validate = validateRequestBody(shape);
    const validationResult = validate(routeProps.req.body);

    if(validationResult !== true) {
        sendApiValidationErrors(routeProps.res, validationResult);
        return;
    }

    handler({...routeProps});
}