import { userStore } from "../models/user-store.js";

export const authController = {
  login(request, response) {
    const viewData = {
      title: "Login"
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.clearCookie("user_id");
    request.flash("success", "You've been logged out");
    response.redirect("/");
  },

  register(request, response) {
    const viewData = {
      title: "Register"
    };

    response.render("register-view", viewData);
  },

  async registerUser(request, response) {
    const { firstname, lastname, email, password } = request.body;

    // Validation
    if (!firstname || !lastname || !email) {
      request.flash("error", "All fields must be filled!");
      response.redirect("/register");
      return;
    }

    const existingUser = await userStore.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      request.flash("error", "This email is already in use. Please use a different email.");
      response.redirect("/register");
      return;
    }

    if (!password) {
      request.flash("error", "Please enter a password!");
      response.redirect("/register");
      return;
    } else {
      if (!authController.isValidPassword(password)) {
        request.flash("error", "Password must be at least 8 characters long and include at least one number.");
        response.redirect("/register");
        return;
      }
    }

    let user;
    try {
      user = await userStore.addUser({ firstname, lastname, email, password });
    } catch (error) {
      request.flash("error", "An error occurred while registering. Please try again.");
      response.redirect("/register");
      return;
    }

    response.cookie("user_id", user._id);
    request.flash("success", `Welcome, ${user.firstname}`);
    response.redirect("/dashboard");
  },

  async authenticate(request, response) {
    const { email, password } = request.body;
    const user = await userStore.getUserByEmail(email);

    if (user && user.password === password) {
      response.cookie("user_id", user._id);
      request.flash("success", `Welcome back, ${user.firstname}`);
      response.redirect("/dashboard");
    } else {
      request.flash("error", "Invalid email or password");
      response.redirect("/login");
    }
  },

  async showAccount(request, response) {
    const user = await userStore.getUserById(request.user._id);

    const viewData = {
      title: "Account",
      ...user,
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
      request.flash("error", "All fields except password are mandatory");
      response.redirect("/account");
      return;
    }

    const existingUser = await userStore.getUserByEmail(email.toLowerCase());
    if (existingUser && existingUser._id != user._id) {
      request.flash("error", "This email is already in use. Please use a different email.");
      response.redirect("/account");
      return;
    }

    if (!password) {
      await userStore.updateUser(user._id, { firstname, lastname, email: email.toLowerCase() });
    } else {
      if (!authController.isValidPassword(password)) {
        request.flash("error", "Password must be at least 8 characters long and include at least one number.");
        response.redirect("/account");
        return;
      }
      await userStore.updateUser(user._id, { firstname, lastname, email: email.toLowerCase(), password });
    }

    request.flash("success", `Account updated`);
    response.redirect("/account");
  },

  isValidPassword(password) {
    return password.match("(?=.*[0-9]).{8,}");
  },
};
