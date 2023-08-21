import { userStore } from "../models/user-store.js";

export const attachUser = (redirectTo="/login") => {
  return async (request, response, next) => {
    // Assuming you have a user's ID stored in a cookie named "user_id"
    const userId = request.cookies.user_id;

    if (userId) {
      // Fetch the user from the database using the user's ID
      const user = await userStore.getUserById(userId);

      // Attach the user to the request object
      request.user = user;
    }

    // Make the user object available to the views as well
    response.locals.user = request.user;

    if (!request.user) {
      response.redirect(redirectTo);
      return;
    }

    next(); // Continue to the next middleware or route handler
  }
};