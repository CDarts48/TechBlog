// Function created allowing user to delete blog posts from the individual blog post page
const deletePostHandler = async (event) => {
  event.preventDefault();
  document.addEventListener("DOMContentLoaded", (event) => {
    const deleteButton = document.querySelectorAll(".deleteBtn");

    // Iterates over all buttons on the page allowing for delete functionality
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", deletePostHandler);
    }
  });
  console.log(event.target);

  let blogs = window.location.pathname.split("/");
  let blogPostId = blogs[blogs.length - 1];
  console.log(blogs);

  console.log(`Sending DELETE request to /api/blogs/${blogPostId}`);
  const response = await fetch(`/api/blogs/${blogPostId}`, {
    method: "DELETE",
  });
  console.log("Response:", response);

  if (response.ok) {
    document.location.assign(`/dashboard`);
  } else {
    alert(response.statusText);
  }
};

const deleteButton = document.querySelectorAll(".deleteBtn");

// Iterates over all buttons on the page allowing for delete functionality
for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deletePostHandler);
}
