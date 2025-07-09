import * as z from "zod/v4";

export const PostResponseSchema = z.object({
    bookingid: z.number(),
    booking: z.object({
        firstname: z.string(),
        lastname: z.string(),
        totalprice: z.number(),
        depositpaid: z.boolean(),
        bookingdates: z.object({
            checkin: z.string(),
            checkout: z.string()
        }),
        additionalneeds: z.string()
    })
});