// ------------------------------------------
//  Create Card
// ------------------------------------------
const employeeList = [];
function createCard(response) {
  for (let i = 0; i < 12; i++) {
    const card = document.createElement('div');
    const fullName = `${response.results[i].name.first} ${response.results[i].name.last}`;
    const email = response.results[i].email;
    const homeStreet = response.results[i].location.street;
    const homeCity = response.results[i].location.city;
    const homeState = response.results[i].location.state;
    const homePostCode = response.results[i].location.postcode;
    const profilePic = response.results[i].picture.large;
    const phone = response.results[i].phone;
    const birthdayYear = response.results[i].dob.date.slice(0,4);
    const birthdayMonth = response.results[i].dob.date.slice(5,7);
    const birthdayDay = response.results[i].dob.date.slice(8,10);
    const birthdayFull = `${birthdayMonth}/${birthdayDay}/${birthdayYear}`;
    const employeeAttr = {
      'pic': profilePic,
      'name': fullName,
      'email': email,
      'street': homeStreet,
      'city': homeCity,
      'state': homeState,
      'zip': homePostCode,
      'phone': phone,
      'birthday': birthdayFull
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
    employeeList.push(employeeAttr);
  }
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
                        <p class="modal-text">123 Northwest Ave., Bellingham, WA 97204</p>
                        <p class="modal-text">Birthday: 01/07/1986</p>
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
  currentModal.innerHTML = `
                          <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                              <img class="modal-img" src="${modal[index].pic}" alt="profile picture">
                              <h3 id="name" class="modal-name cap">${modal[index].name}</h3>
                              <p class="modal-text">${modal[index].email}</p>
                              <p class="modal-text cap">${modal[index].city}</p>
                              <hr>
                              <p class="modal-text cap">${modal[index].phone}</p>
                              <p class="modal-text cap">${modal[index].street}, ${modal[index].city}, WA ${modal[index].zip}</p>
                              <p class="modal-text">Birthday: ${modal[index].birthday}</p>
                            </div>
                          </div>
                          <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                          </div>
                          `;
  btnFunctionality(index);
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
                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                    `;
  document.querySelector('.search-container').append(search);
}

// ------------------------------------------
//  Handle Fetch Request
// ------------------------------------------
async function fetchData(url) {
  const response = await fetch(url);
  checkStatus(response);
  const data = await response.json();
  createModal();
  createSearch();
  createCard(data);
  $('.modal-container').hide();
  return data;
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(Error(response.statusText));
  }
}

fetchData('https://randomuser.me/api/?results=12&nat=us');

// ------------------------------------------
//  Card and Modal Interactivity
// ------------------------------------------
$('#gallery').on('click', 'div.card', (event) => {
  const thisCard = document.querySelectorAll('div.card');  
  const cardTarget = event.currentTarget;
  for (let i = 0; i < thisCard.length; i++) {
    if (thisCard[i].innerHTML === cardTarget.innerHTML) {
      updateModal(employeeList, i);
      $('.modal-container').show();
    }
  }
})

function btnFunctionality(index) {
  $('#modal-close-btn').on('click', () => {
    $('.modal-container').hide();
  })

  $('.modal-prev').on('click', () => {
    if (index > 0) {
      updateModal(employeeList, index -= 1);
    }
  })

  $('.modal-next').on('click', () => {
    if (index < 11) {
      updateModal(employeeList, index += 1);
    }
  })
}

$('#search-submit').on('keydown', () => {
  console.log('Search Dave!!');
});
