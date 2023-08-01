export const handle404Error = async (request, response, next) => {
  const viewData = {
    title: "404 - Page Not Found"
  };
  response.status(404).render("404-view", viewData);
};
