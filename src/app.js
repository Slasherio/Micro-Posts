import { http } from './http';
import { ui } from './ui';

const getPosts = () => {
  http
    .get('http://localhost:3000/posts')
    .then(data => {
      ui.showPosts(data);
    })
    .catch(err => {
      throw new Error(err);
    });
};

const addPost = () => {
  const title = document.querySelector('#title').value,
    body = document.querySelector('#body').value,
    id = document.querySelector('#id').value;

  if (!title || !body) {
    ui.showAlert('Please fill in all inputs', 'alert alert-danger');
  } else {
    const data = {
      title,
      body
    };
    if (id === '') {
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post successful added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => {
          throw new Error(err);
        });
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post successful added', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};

const deletePost = e => {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post successful deleted', 'alert alert-success');
          getPosts();
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};

const editPost = e => {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = {
      id,
      body,
      title
    };

    ui.fillForm(data);
  }
};

const cancelEdit = e => {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
};

document.querySelector('#posts').addEventListener('click', editPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('.post-submit').addEventListener('click', addPost);
document.querySelector('.card-form').addEventListener('click', cancelEdit);
document.addEventListener('DOMContentLoaded', getPosts);
