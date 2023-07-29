export const flash = (request, response, next) => {
  request.flash = {
    error: request.cookies.flash_error,
    success: request.cookies.flash_success,
  };

  // Clear the flash cookies
  response.clearCookie("flash_error");
  response.clearCookie("flash_success");

  next();
};
