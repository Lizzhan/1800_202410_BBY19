import { 
    db 
} from "./firebase.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

const container = document.getElementById('rederedStationList');

const renderList = async () => {
    const querySnapshot = await getDocs(collection(db, "stations"));
    querySnapshot.forEach((doc) => {
        const stationData = doc.data();

        // Create a column div
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        // Create a card div for the station and train details
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'card-cover', 'h-100', 'overflow-hidden', 'text-bg-dark', 'rounded-4', 'shadow-lg');
        cardDiv.style.backgroundImage = "url('/client/images/station/burrard.png')";

        // Create a content div for the card
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('d-flex', 'flex-column', 'h-100', 'p-5', 'pb-3', 'text-white', 'text-shadow-1');

        // Create a heading for station name
        const stationHeading = document.createElement('h3');
        stationHeading.classList.add('pt-5', 'mt-5', 'mb-4', 'display-6', 'lh-1', 'fw-bold');
        stationHeading.innerText = stationData.name;

        // Create a list for additional details
        const detailList = document.createElement('ul');
        detailList.classList.add('d-flex', 'list-unstyled', 'mt-auto');

        // Create list items for details
        const listItem1 = document.createElement('li');
        listItem1.classList.add('me-auto');
        const img = document.createElement('img');
        img.src = "https://github.com/twbs.png";
        img.alt = "Bootstrap";
        img.width = 32;
        img.height = 32;
        img.classList.add('rounded-circle', 'border', 'border-white');
        listItem1.appendChild(img);

        const listItem2 = document.createElement('li');
        listItem2.classList.add('d-flex', 'align-items-center', 'me-3');
        const svg1 = document.createElement('svg');
        svg1.classList.add('bi', 'me-2');
        svg1.setAttribute('width', '1em');
        svg1.setAttribute('height', '1em');
        listItem2.appendChild(svg1);
        const small1 = document.createElement('small');
        small1.innerText = stationData.train;
        listItem2.appendChild(small1);

        const listItem3 = document.createElement('li');
        listItem3.classList.add('d-flex', 'align-items-center');
        const svg2 = document.createElement('svg');
        svg2.classList.add('bi', 'me-2');
        svg2.setAttribute('width', '1em');
        svg2.setAttribute('height', '1em');
        listItem3.appendChild(svg2);
        const small2 = document.createElement('small');
        small2.innerText = "Last Update: 3d ago";
        listItem3.appendChild(small2);

        // Append list items to the list
        detailList.appendChild(listItem1);
        detailList.appendChild(listItem2);
        detailList.appendChild(listItem3);

        // Create a link for more details
        const link = document.createElement('a');
        link.href = "eachStation.html?docID=" + doc.id;
        link.innerText = "View Details";
        link.classList.add('text-white', 'fw-bold');

        // Append elements to the content div
        contentDiv.appendChild(stationHeading);
        contentDiv.appendChild(detailList);
        contentDiv.appendChild(link);

        // Append the content div to the card
        cardDiv.appendChild(contentDiv);

        // Append the card to the column div
        colDiv.appendChild(cardDiv);

        // Append the column to the container
        container.appendChild(colDiv);
    });
};

// Call the function to render the list of stations
renderList();