export const homeController = {
  index(request, response) {

    if (request.user) {
      response.redirect("/dashboard");
      return;
    }

    const viewData = {
      title: "Welcome to WeatherTop",
    };
    
    response.render("home-view", viewData);
  },
};
