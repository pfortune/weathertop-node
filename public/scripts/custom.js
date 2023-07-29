document.addEventListener("DOMContentLoaded", function () {
  // Get all "navbar-burger" elements
  var navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

  // Check if there are any navbar burgers
  if (navbarBurgers.length > 0) {
    // Add a click event on each of them
    navbarBurgers.forEach(function (el) {
      el.addEventListener("click", function () {
        // Get the target from the "data-target" attribute
        var target = el.dataset.target;
        var targetElement = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        targetElement.classList.toggle("is-active");
      });
    });
  }

  const deleteDialog = document.querySelector('#confirmDeleteDialog');
  const deleteLinks = document.querySelectorAll('#delete');
  const confirmButton = document.querySelector('#confirmDelete');
  const deleteForm = document.querySelector('#deleteForm');

  let deleteUrl;

  deleteLinks.forEach((deleteLink) => {
      deleteLink.addEventListener('click', (e) => {
          e.preventDefault();  // Stop the link from navigating anywhere
          deleteDialog.showModal();  // This function is native to the <dialog> element
          deleteUrl = deleteLink.dataset.link; // Get the URL from the data-link attribute
      });
  });

  deleteForm.addEventListener('submit', (e) => {
      if (!deleteUrl) {
          e.preventDefault();  // Prevent the form from being submitted
      } else {
          deleteForm.action = deleteUrl;  // Set the action of the form to the delete URL
      }
  });

  // Get the cancel button
  const cancelButton = document.querySelector('#cancelDelete');

  // Close the dialog when the cancel button is clicked
  cancelButton.addEventListener('click', () => {
      deleteDialog.close();
  });
});
