/**
 * Middleware function to handle authentication logic.
 * @param {boolean} noAuth - If true, checks if the user is logged in and redirects if they are.
 *                           If false (or omitted), checks if the user is not logged in and redirects if they are not.
 * @param {string} redirectTo - The URL to redirect to if the check fails.
 */
export const authGuard = (noAuth = false, redirectTo = "/login") => {
  return async (request, response, next) => {
    // If noAuth is true and the user is logged in, redirect to the specified route
    if (noAuth && request.user) {
      response.redirect(redirectTo);
      return;
    }
    
    // If noAuth is false and the user is not logged in, redirect to the specified route
    if (!noAuth && !request.user) {
      response.redirect(redirectTo);
      return;
    }
    next(); // Continue to the next middleware or route handler
  };
};
