/**
 * Middleware function to attach the user object to the request if the user is logged in.
 * If a user ID is found in the "user_id" cookie, the corresponding user is retrieved
 * from the database and attached to both the request object and response locals.
 */
export const attachUser = async (request, response, next) => {
  // Retrieve the user's ID from a cookie named "user_id"
  const userId = request.cookies.user_id;

  if (userId) {
    // Fetch the user from the database using the user's ID
    const user = await userStore.getUserById(userId);

    // Attach the user to the request object, allowing subsequent middleware and route handlers to access it
    request.user = user;
  }

  // Make the user object available to the views as well, so that templates can access user information
  response.locals.user = request.user;

  next(); // Continue to the next middleware or route handler
};
