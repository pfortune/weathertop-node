import { userStore } from "../models/user-store.js";

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
    response.clearCookie('user_id');
    response.cookie('flash_success', "You've been logged out", { maxAge: 10000 });
    response.redirect("/");
  },

  register(request, response) {
    const viewData = {
      title: "Register",
      flash: request.flash,
    };

    console.log("-- register rendered");
    response.render("register-view", viewData);
  },

  async registerUser(request, response) {
    const { firstname, lastname, email, password } = request.body;

    if (request.user) {
      response.redirect("/dashboard");
      return;
    }

    // Validation
    if (!firstname || !lastname || !email || !password) {
      response.cookie("flash_error", "All fields must be filled!", { maxAge: 10000 });
      response.redirect("/register");
      return;
    }

    const existingUser = await userStore.getUserByEmail(email);
    if (existingUser) {
      response.cookie('flash_error', 'This email is already in use. Please use a different email.', { maxAge: 10000 });
      response.redirect("/register");
      return;
    }

    const user = await userStore.addUser({ firstname, lastname, email, password });
    response.cookie('user_id', user._id);
    response.cookie('flash_success', `Welcome, ${user.firstname}`, { maxAge: 10000 });
    response.redirect("/dashboard");
  },

  async authenticate (request, response) {
    const { email, password } = request.body;
    const user = await userStore.getUserByEmail(email);

    if (user && user.password === password) { 
      response.cookie('user_id', user._id);
      response.cookie('flash_success', `Welcome back, ${user.firstname}`, { maxAge: 10000 });
      response.redirect("/dashboard");
    } else {
      response.cookie('flash_error', 'Invalid email or password', { maxAge: 10000 });
      response.redirect("/login");
    }
  },
};
