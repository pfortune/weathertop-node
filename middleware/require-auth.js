export const requireAuth = (redirectTo = "/login") => {
  return async (request, response, next) => {
    // Assuming you have a user's ID stored in a cookie named "user_id"
    if (!request.user) {
      response.redirect(redirectTo);
      return;
    }
    next(); // Continue to the next middleware or route handler
  };
};
