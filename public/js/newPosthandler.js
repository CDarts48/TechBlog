const newPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#titleInput").value.trim();
  const description = document.querySelector("#bodyInput").value.trim();
  if (title && description) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Error check console");
    }
  }
};
document
  .querySelector(".createBlogPost")
  .addEventListener("submit", newPostHandler);
