const axios = require('axios');
const { classifyUploadImage } = require('./app'); // Replace with the correct path

// Mock Axios
jest.mock('axios');

describe('classifyUploadImage', () => {
  it('should respond with a classification result on successful API call', async () => {
    const mockResponse = {
      data: {
        // Simulate response from the API
        // You can customize this to match the actual response structure
        predictions: [{ tagName: 'Car', probability: 0.95 }],
      },
    };

    // Mock Axios post method to return the mock response
    axios.post.mockResolvedValue(mockResponse);

    // Mock Express request and response objects
    const req = {
      file: {
        buffer: Buffer.from('fakeImageData'), // Simulate image buffer
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    // Call the function
    await classifyUploadImage(req, res);

    // Verify that the response methods were called as expected
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should respond with an error on unsuccessful API call', async () => {
    // Create mock request and response objects
    const req = {
      file: {
        buffer: Buffer.from('test image data'),
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    // Mock axios.post to simulate an error response
    axios.post.mockRejectedValueOnce(new Error('API error'));

    // Call the function
    await classifyUploadImage(req, res);

    // Verify that the response methods were called as expected
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
  });
});
