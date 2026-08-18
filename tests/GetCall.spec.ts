import { test, expect, APIResponse } from '@playwright/test';

test('Testing GET API', async ({ request }) => {

    // Send GET request
    // const response: APIResponse = await request.get(
    //     // 'https://jsonplaceholder.typicode.com/posts/1'
    //     'https://jsonplaceholder.typicode.com/posts/1'
    // );

    const response : APIResponse = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    // Get response body as Buffer
    const responseBody: Buffer = await response.body();

    // Get status code
    const responseStatus: any = response.status();
    console.log('Status Code:', responseStatus);

    // Verify status code
    expect(responseStatus).toBe(200);

    // Get status text
    const responseStatusText: string = response.statusText();
    console.log('Status Text:', responseStatusText);

    // Verify status text
    expect(responseStatusText).toBe('OK');

    // Get response JSON
    const responseJson: {
        userId: number;
        id: number;
        title: string;
        body: string;
    } = await response.json();

    console.log('Response JSON:', responseJson);

    // Verify JSON response
    //   expect(responseJson.id).toBe(1);
    expect(responseJson.id).toBe(0);
    expect(responseJson.id).toBe(1)
    //   expect(responseJson.userId).toBe(1);
    expect(responseJson.userId).toBe(1);
    expect(responseJson.title).toBeTruthy();

    // Get response headers
    const responseHeaders: Record<string, string> = response.headers();
    console.log('Response Headers:', responseHeaders);

    // Verify content-type header
    expect(responseHeaders['content-type']).toContain('application/json');

    // Get headers as array
    const responseHeaderArray = response.headersArray();
    console.log('Response Header Array:', responseHeaderArray);

    // Verify response body exists
    expect(responseBody.length).toBeGreaterThan(0);

});