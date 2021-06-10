const editEntryHandler = async (event) => {
  event.preventDefault();

  const { id } = event.target.dataset;

  const title = document.querySelector('#entry-title').value.trim();
  const content = document.querySelector('#entry-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit entry');
    }
  }
};

const deleteEntryHandler = async (event) => {
  const { id } = event.target.dataset;
  
  const response = await fetch(`/api/entries/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete entry');
  }
};

document
  .querySelector('#edit-entry-btn')
  .addEventListener('click', editEntryHandler);

document
  .querySelector('#delete-entry-btn')
  .addEventListener('click', deleteEntryHandler);