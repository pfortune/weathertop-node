import { userStore } from "../models/user-store.js";

export const authController = {
  login(request, response) {
    const viewData = {
      title: "Login",
      flash: request.flash,
    };

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

    response.render("register-view", viewData);
  },

  async registerUser(request, response) {
    const { firstname, lastname, email, password } = request.body;
    

    // Validation
    if (!firstname || !lastname || !email) {
      response.cookie("flash_error", "All fields must be filled!", { maxAge: 10000 });
      response.redirect("/register");
      return;
    }

    const existingUser = await userStore.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      response.cookie('flash_error', 'This email is already in use. Please use a different email.', { maxAge: 10000 });
      response.redirect("/register");
      return;
    }

    if(!password) {
      response.cookie("flash_error", "Please enter a password!", { maxAge: 10000 });
      response.redirect("/register");
      return;
    } else {
      if (!authController.isValidPassword(password)) {
        response.cookie('flash_error', 'Password must be at least 8 characters long and include at least one number.', { maxAge: 10000 });
        response.redirect("/register");
        return;
      }
    }

    let user;
    try {
      user = await userStore.addUser({ firstname, lastname, email, password });
    } catch (error) {
      response.cookie('flash_error', 'An error occurred while registering. Please try again.', { maxAge: 10000 });
      response.redirect("/register");
      return;
    }

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

  async showAccount(request, response) {

    const user = await userStore.getUserById(request.user._id);

    const viewData = {
      title: "Account",
      ...user
    };
    response.render("account-view", viewData);
  },

  async updateAccount(request, response) {
    if (!request.user) {
      response.redirect("/login");
      return;
    }

    const { firstname, lastname, email, password } = request.body;
    const user = await userStore.getUserById(request.user._id);

    if (!firstname || !lastname || !email) {
      response.cookie("flash_error", "All fields except password are mandatory", { maxAge: 10000 });
      response.redirect("/account");
      return;
    }

    const existingUser = await userStore.getUserByEmail(email.toLowerCase());
    if (existingUser && existingUser._id != user._id) {
      response.cookie('flash_error', 'This email is already in use. Please use a different email.', { maxAge: 10000 });
      response.redirect("/account");
      return;
    }

    if(!password) {
      await userStore.updateUser(user._id, { firstname, lastname, email: email.toLowerCase() });
    } else {
      if (!authController.isValidPassword(password)) {
        response.cookie('flash_error', 'Password must be at least 8 characters long and include at least one number.', { maxAge: 10000 });
        response.redirect("/account");
        return;
      }
      await userStore.updateUser(user._id, { firstname, lastname, email: email.toLowerCase(), password });
    }
    
    response.cookie('flash_success', `Account updated`, { maxAge: 10000 });
    response.redirect("/account");
  },

  isValidPassword(password) {
    return password.match("(?=.*[0-9]).{8,}");
  }
};
