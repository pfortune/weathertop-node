export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About Us",
    };
    console.log("-- about rendered");
    response.render("about-view", viewData);
  },
};