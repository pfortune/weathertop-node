export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About Us",
    };
    
    response.render("about-view", viewData);
  },
};
