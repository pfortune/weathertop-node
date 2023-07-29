export const authController = {
  login(request, response) {
    const viewData = {
      title: "Login",
      flash: request.flash,
    };

    console.log("-- login rendered");
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.cookie('flash_success', 'You have been logged out successfully.', { maxAge: 10000 });
    response.redirect("/");
  },

  async register(request, response) {
    const viewData = {
      title: "Register",
      flash: request.flash,
    };

    console.log("-- register rendered");
    response.render("register-view", viewData);
  },
};
