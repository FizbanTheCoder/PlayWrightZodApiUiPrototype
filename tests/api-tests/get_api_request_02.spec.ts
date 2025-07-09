// Load playwright module
// const {test, expect} = require('@playwright/test')
import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
//add zod
import { PostResponseSchema } from '../../utils/post_response_schema';

const { DateTime } = require('luxon');

// Write a test
test('Create POST api request using dynamic request body', async ({ request }) => {
    // Create post api request
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 10, max: 1000 });
    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({ days: 10 }).toFormat('yyyy-MM-dd');
    const additionalNeeds = faker.lorem.sentence();
    const depositPaid = faker.datatype.boolean();

    const postAPIResponse = await request.post('/booking', {
        data: {
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": depositPaid,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
            },
            "additionalneeds": additionalNeeds
        }
    })

    // Validate status code
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();



    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);
    
// Validate response body with Zod schema
    newFunction(postAPIResponseBody);

    const bId = postAPIResponseBody.bookingid;
    
    // Validate JSON api response
    expect(postAPIResponseBody.booking.firstname).toBe(firstName);
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice", totalPrice);
    expect(postAPIResponseBody.booking.lastname).toBe(lastName);

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", checkInDate);
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", checkOutDate);

console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    console.log('BookingId:  '+bId);
  
    const getAPIResponse = await request.get('/booking/'+bId);
    const getAPIResponseBody = await getAPIResponse.json();
    console.log(getAPIResponseBody);




    expect(getAPIResponseBody).toHaveProperty('firstname', firstName);
    expect(getAPIResponseBody).toHaveProperty('lastname', lastName);
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);


});


function newFunction(postAPIResponseBody: any) {
    const parseResult = PostResponseSchema.safeParse(postAPIResponseBody);
    expect(parseResult.success).toBeTruthy();
    if (!parseResult.success) {
        console.error(parseResult.error);
    }
}

