/**
 * Middleware function to handle 404 errors.
 * This middleware responds with a 404 status code and renders a custom 404 view.
 */
export const handle404Error = async (request, response, next) => {
  // Define view data for the custom 404 view
  const viewData = {
    title: "404 - Page Not Found"
  };

  // Set the response status to 404 and render the custom 404 view with the view data
  response.status(404).render("404-view", viewData);
};
