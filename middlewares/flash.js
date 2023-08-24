/**
 * Middleware function to manage flash messages in the application.
 * Flash messages are short-lived messages intended to communicate the status of an operation,
 * such as success or failure. They are often used to provide user feedback after form submissions.
 */
export const flash = (request, response, next) => {
  
  // Let's us easily set a flash message in the controller
  request.flash = (type, message) => {
    response.cookie(`flash_${type}`, message); // Store the message as a cookie.
  };

  const messageTypes = ["error", "success"];
  const flashMessages = {};

  // Loop over each message type, like "error" or "success".
  messageTypes.forEach(type => {
    // Grab the message from the cookies.
    flashMessages[type] = request.cookies[`flash_${type}`];
    // And then delete the cookie so the message won't show on the next page.
    response.clearCookie(`flash_${type}`);
  });

  // Make flash messages accessible to views.
  response.locals.flash = flashMessages;
  
  // Go to the next function in the route.
  next();
};