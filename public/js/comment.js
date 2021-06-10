const newCommentHandler = async (event) => {
  event.preventDefault();

  const { id } = event.target.dataset;
  const comment_content = document.querySelector('#comment').value.trim();

  if (comment_content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_content, post_id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);