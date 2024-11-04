//Show updated incident realtime
import { onSnapshot } from "firebase/firestore";

function listenForIncidentUpdates() {
  const incidentRef = collection(db, "incident");
  onSnapshot(incidentRef, (snapshot) => {
    const incidents = [];
    snapshot.forEach((doc) => incidents.push({ id: doc.id, ...doc.data() }));
    updateIncidentDisplay(incidents);
  });
}

function updateIncidentDisplay(incidents) {
  const incidentResults = document.getElementById("incidentResults");
  incidentResults.innerHTML = "";
  incidents.forEach((incident) => {
    const incidentDiv = document.createElement("div");
    incidentDiv.innerHTML = `
      <h3>Station: ${incident.stationName}</h3>
      <p>Time: ${incident.time}</p>
      <p>Details: ${incident.content}</p>
      <p>Status: ${incident.status}</p>
      <p>Reported by: ${incident.user}</p>
    `;
    incidentResults.appendChild(incidentDiv);
  });
}
