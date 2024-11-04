// Function to handle form submission
function submitIncident() {
    const station = document.getElementById("station").value;
    const time = document.getElementById("time").value;
    const content = document.getElementById("content").value;
    const status = document.getElementById("status").value;
    const user = document.getElementById("user").value;
  
    addIncident(station, time, content, status, user)
      .then(() => alert("Incident submitted successfully!"))
      .catch((error) => console.error("Error submitting incident: ", error));
  }
  
  // Function to display all incidents
  async function displayIncidents() {
    const incidents = await getAllIncidents();
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
  