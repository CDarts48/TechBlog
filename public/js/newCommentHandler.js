async function newCommentHandler(event) {
  event.preventDefault();

  const comment_body = document.getElementById("comment").value.trim();
  const url = window.location.toString().split("/");
  const blogPost_id = url[url.length - 1];

  if (comment_body) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        blogPost_id,
        comment_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Create a new div element for the comment
      const newCommentDiv = document.createElement("div");
      const newCommentP = document.createElement("p");
      newCommentP.textContent =
        comment_body + " by " + data.user.name + " on " + data.date_created;
      newCommentDiv.appendChild(newCommentP);

      // Append the new comment to the comment section
      const commentSection = document.getElementById("comment-section");
      commentSection.appendChild(newCommentDiv);

      // Clear the comment form
      document.getElementById("comment").value = "";
    } else {
      alert(response.statusText);
    }
  }
}

document
  .getElementById("comment-form")
  .addEventListener("submit", newCommentHandler);
