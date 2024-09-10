const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
////////////////////////////////////////////////////////////////////
function renderColumn(title, users) {
    const columnDiv = document.createElement('div'); 
    columnDiv.classList.add('column');

    const h3 = document.createElement('h3'); 
    h3.textContent = title; 
    columnDiv.appendChild(h3);

    users.forEach((user) => {
        const cardDiv = document.createElement('div'); 
        cardDiv.classList.add('card');

        const nameP = document.createElement('p'); 
        nameP.textContent = `Name: ${user.name}`; 
        cardDiv.appendChild(nameP);

        const usernameP = document.createElement('p'); 
        usernameP.textContent = `Username: ${user.username}`; 
        cardDiv.appendChild(usernameP);

        const websiteP = document.createElement('p'); 
        websiteP.textContent = `Website: ${user.website}`; 
        cardDiv.appendChild(websiteP);

        columnDiv.appendChild(cardDiv);
    });
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);
}

async function renderUsersByTopLevelDomain() {
    const response = await fetch(USERS_ENDPOINT);
    const users = await response.json();
    console.log(users);

    const usersByTLD = {}

    users.forEach(user => {
        const wordParts = user.website.split('.');
        const title = '.' + wordParts.pop();
        console.log(title);

        if(!usersByTLD[title]) {
            usersByTLD[title] = [];
        }

        usersByTLD[title].push(user);
    })

    Object.keys(usersByTLD).forEach(tld => {
        renderColumn(tld, usersByTLD[tld])
    })


}

renderUsersByTopLevelDomain();