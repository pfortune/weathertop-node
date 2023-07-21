export const homeController = {
  index(request, response) {
    const viewData = {
      title: "Welcome to WeatherTop",
    };
    console.log("-- homepage");
    response.render("home-view", viewData);
  },
};