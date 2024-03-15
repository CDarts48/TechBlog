let blogPost = window.location.pathname.split("/");
const submitButton = document.getElementById("submitNewEdit");
const blogId = submitButton.getAttribute("data-blog-id");

const submitNewEdit = async (event) => {
  event.preventDefault();
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("bodyInput").value;

  if (title && description) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(blogId);
    console.log(response);
    if (response.ok) {
      document.location.assign("/dashboard");
    } else {
      alert(response.status);
    }
  }
};

submitButton.addEventListener("click", submitNewEdit);
