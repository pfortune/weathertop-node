/**
 * Middleware function to manage flash messages in the application.
 * Flash messages are short-lived messages intended to communicate the status of an operation,
 * such as success or failure. They are often used to provide user feedback after form submissions.
 *
 * This middleware retrieves flash messages from cookies and attaches them to the request object.
 * It then clears the flash cookies, ensuring that the messages are displayed only once.
 */
export const flash = (request, response, next) => {
  // Retrieve flash messages for error and success from cookies
  // and attach them to the request object
  request.flash = {
    error: request.cookies.flash_error,
    success: request.cookies.flash_success,
  };

  // Clear the flash cookies so that the messages are not displayed again
  // on subsequent requests
  response.clearCookie("flash_error");
  response.clearCookie("flash_success");

  next(); // Continue to the next middleware or route handler
};
