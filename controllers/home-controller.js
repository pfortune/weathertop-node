export const homeController = {
  index(request, response) {
    const viewData = {
      title: "Welcome to WeatherTop",
    };
    
    response.render("home-view", viewData);
  },
};
