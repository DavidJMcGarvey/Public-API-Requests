// Create Card
function createCard(res) {
  const card = document.createElement('div');
  const firstName = res.results[0].name.first;
  const lastName = res.results[0].name.last;
  const fullName = `${firstName} ${lastName}`;
  const email = res.results[0].email;
  const homeCity = res.results[0].location.city;
  const homeState = res.results[0].location.state;
  const profilePic = res.results[0].picture.large;
  card.className = 'card';
  card.innerHTML = `
                    <div class="card-img-container">
                      <img class="card-img" src="${profilePic}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                      <h3 id="name" class="card-name cap">${fullName}</h3>
                      <p class="card-text">${email}</p>
                      <p class="card-text cap">${homeCity}, ${homeState}</p>
                    </div>
                    `;
  document.querySelector('#gallery').append(card);
  // console.log(res.results[0].picture.thumbnail);
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
                    document.querySelector('#gallery').append(modal);  // This is wrong, append somewhere else
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
}

// Handle AJAX Request
for  (let i = 0; i < 12; i++) {
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(res => createCard(res))
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