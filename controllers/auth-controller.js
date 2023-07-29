export const authController = {
  async login(request, response) {
    const viewData = {
      title: "Login",
      flash: request.flash,
    };

    console.log("-- login rendered");
    response.render("login-view", viewData);
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
