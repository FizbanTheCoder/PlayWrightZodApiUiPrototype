// Load playwright module
// const {test, expect} = require('@playwright/test')
import { test, expect } from '@playwright/test';
import { stringFormat } from '../../utils/common';
import { fa, faker } from '@faker-js/faker';


const bookingAPIRequestBody = require('../../test-data/post_dynamic_request_body.json');

// Write a test
test('Create POST api request using static JSON file', async ({ request }) => {
    // Generate dynamic request body using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const lorem = faker.lorem.word();
    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), firstName, lastName, lorem);

    // Create post api request
    const postAPIResponse = await request.post('/booking', {
        data: JSON.parse(dynamicRequestBody)
    })

    const postAPIResponseBody = await postAPIResponse.json();

    // Validate status code
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    // Validate JSON api response
    expect(postAPIResponseBody.booking.firstname).toBe(firstName);
    expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);
    expect(postAPIResponseBody.booking).toHaveProperty("totalprice", 123);
    expect(postAPIResponseBody.booking.lastname).toBe(lastName);

    // Validate nested JSON objects
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2023-10-01");
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2023-10-10");
});


