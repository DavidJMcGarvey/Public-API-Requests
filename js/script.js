// ------------------------------------------
//  Create Card
// ------------------------------------------
function createCard(response) {
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    const firstName = response.results[i].name.first;
    const lastName = response.results[i].name.last;
    const fullName = `${firstName} ${lastName}`;
    const email = response.results[i].email;
    const homeCity = response.results[i].location.city;
    const homeState = response.results[i].location.state;
    const profilePic = response.results[i].picture.large;
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
  }
}

// ------------------------------------------
//  Create Modal
// ------------------------------------------
function createModal() {
  const modal = document.createElement('div');
  const card = document.querySelector('#gallery');
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
                    <div class="modal-btn-container">
                      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                      <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                    `;
  card.append(modal);
}

// ------------------------------------------
//  Create Search
// ------------------------------------------
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

// ------------------------------------------
//  Handle AJAX Request
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(response => createCard(response), createModal())
  .catch(error => console.log('There was a problem dawg!', error))
  .finally(createSearch);

// ------------------------------------------
//  Card and Modal Interactivity
// ------------------------------------------
$('.modal-container').hide();

$('div.card').on('click', (e) => console.log(e.target)); // Click handler not working! Is it a async thing?


$('#modal-prev').on('click', () => {
  console.log('evaD!');
})

$('#modal-next').on('click', () => {
  console.log('Dave!');
})

$('#modal-close-btn').on('click', () => {
  $('.modal-container').hide();
})
