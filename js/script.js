// ------------------------------------------
//  Create Card
// ------------------------------------------
const employeeList = [];
function createCard(response) {
  
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    const firstName = response.results[i].name.first;
    const lastName = response.results[i].name.last;
    const fullName = `${firstName} ${lastName}`;
    const email = response.results[i].email;
    const homeStreet = response.results[i].location.street;
    const homeCity = response.results[i].location.city;
    const homeState = response.results[i].location.state;
    const profilePic = response.results[i].picture.large;
    const phone = response.results[i].phone;
    const birthday = response.results[i].dob.date;
    const employeeAttr = { // attributes to be used on the Modal later: pic, name, email, city, phone, address, birthday
      'pic': profilePic,
      'name': fullName,
      'email': email,
      'street': homeStreet,
      'city': homeCity,
      'state': homeState,
      'phone': phone,
      'birthday': birthday
    };
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
    // console.log(employeeAttr);
    // $('.modal-container').hide();
    employeeList.push(employeeAttr);
  }
  // console.log(employeeList);
}

// ------------------------------------------
//  Create Modal
// ------------------------------------------
function createModal() {
  const modal = document.createElement('div');
  const card = document.querySelector('#gallery');
  modal.className = 'modal-container';
  modal.id = 'davey-modal-container';
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

function updateModal(modal, index) {
  const currentModal = document.querySelector('#davey-modal-container');
  // console.log(currentModal[index].innerHTML);
  currentModal.innerHTML = `
                          <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                              <img class="modal-img" src="${modal[index].pic}" alt="profile picture">
                              <h3 id="name" class="modal-name cap">${modal[index].name}</h3>
                              <p class="modal-text">${modal[index].email}</p>
                              <p class="modal-text cap">${modal[index].city}</p>
                              <hr>
                              <p class="modal-text">${modal[index].phone}</p>
                              <p class="modal-text">${modal[index].street}, ${modal[index].city}, OR 97204</p>
                              <p class="modal-text">Birthday: ${modal[index].birthday}</p>
                            </div>
                          </div>
                          <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                          </div>
                          `;
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
// function fetchData(url) {
//   fetch(url)
//     .then(checkStatus)
//     .then(response => response.json())
//     .then(response => createCard(response))
//     .then(createSearch())
//     .catch(error => console.log('There was a problem dawg!', error))
//     .finally(createModal());
// }

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  createModal();
  createCard(data);
  
  $('.modal-container').hide();
  // const modals = data.results.map( person => updateModal(person, 0));
  // console.log(modals);
  // updateModal(data);
  // console.log(data);
  return data;
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(Error(response.statusText));
  }
}

fetchData('https://randomuser.me/api/?results=12');

// ------------------------------------------
//  Card and Modal Interactivity
// ------------------------------------------
$('.modal-container').hide();

// $('#gallery').on('click', 'div.card', () => console.log('DAVE DAWG!!')); // Click handler WAS not working! Is it a async thing?

$('#gallery').on('click', 'div.card', (event) => {
  const thisCard = document.querySelectorAll('div.card');  
  const cardTarget = event.currentTarget;
  // console.log(cardTarget.innerHTML);
  // $('.modal-container').show();
  for (let i = 0; i < thisCard.length; i++) {
    if (thisCard[i].innerHTML === cardTarget.innerHTML) {
      updateModal(employeeList, i);
      $('.modal-container').show();
      console.log(thisCard[i]);
      $('#modal-close-btn').on('click', () => {
        $('.modal-container').hide();
      })
    }
  }
})

$('#modal-prev').on('click', () => {
  console.log('evaD!');
})

$('#modal-next').on('click', () => {
  console.log('Dave!');
})

$('#modal-close-btn').on('click', () => {
  $('.modal-container').hide();
})