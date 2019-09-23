// Create Card
function createCard() {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
                    <div class="card-img-container">
                      <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                      <h3 id="name" class="card-name cap">first last</h3>
                      <p class="card-text">email</p>
                      <p class="card-text cap">city, state</p>
                    </div>
                    `;
  document.querySelector('#gallery').append(card);
}


// Create Modal
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-container';
  modal.innerHTML = `
                    <div class="modal">
                      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                      <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                      </div>
                    </div>
                    `;
                    document.querySelector('#gallery').append(modal);
}

// Create Search
function createSearch() {
  const search = document.createElement('form');
  search.action = '#';
  search.method = 'GET';
  search.innerHTML = `
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    `;
  document.querySelector('.search-container').append(search);
  console.log(search);
}

// Handle AJAX Request
for  (let i = 0; i < 12; i++) {
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(res => {
      createCard();
      // createModal();
      const firstName = res.results[0].name.first;
      const lastName = res.results[0].name.last;
      const nameDiv = document.querySelector('#name');
      console.log(res.results[0].name.first);
      nameDiv.innerHTML = `${firstName} ${lastName}`;
    })
    .catch(error => console.log('There was a problem dawg!', error));
}


// Card and Modal Interactivity
createSearch()

$('.modal-container').hide();

$('.card').on('click', () => {
  $('.modal-container').show();
})

$('.modal-close-btn').on('click', () => {
  $('.modal-container').hide();
})
