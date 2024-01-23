// ref: https://docs.beeswax.com/docs/api-requests-and-responses

// ApiResponse is the response format for all api requests
export type ApiResponse = {
  success: boolean;
  message?: string;
  payload?: any;
  error?: any;
  id?: string;
};
