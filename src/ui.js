class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.postTitle = document.querySelector('#title');
    this.postBody = document.querySelector('#body');
    this.postId = document.querySelector('#id');
    this.postSubmitBtn = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach(post => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="cart-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
        `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.postContainer');
    const posts = document.querySelector('#posts');

    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const alert = document.querySelector('.alert');

    if (alert) {
      alert.remove();
    }
  }

  clearFields() {
    this.postTitle.value = '';
    this.postBody.value = '';
  }

  fillForm(data) {
    this.postTitle.value = data.title;
    this.postBody.value = data.body;
    this.postId.value = data.id;

    this.changeFormState('edit');
  }

  clearId() {
    this.postId.value = '';
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmitBtn.textContent = 'Change Post';
      this.postSubmitBtn.className = 'post-submit btn btn-warning btn-block';

      //Create cancel btn

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmitBtn.textContent = 'Post It';
      this.postSubmitBtn.className = 'post-submit btn btn-primary btn-block';
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearId();
      this.clearFields();
    }
  }
}

export const ui = new UI();
