//Add Incident collection

async function addIncident(station, time, content, status, user) {
    try {
      await addDoc(collection(db, "incident"), {
        stationName: station,
        time: time,
        content: content,
        status: status,
        user: user
      });
      console.log("Incident report added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  //Read all incident reports
  async function getAllIncidents() {
    const incidents = [];
    const querySnapshot = await getDocs(collection(db, "incident"));
    querySnapshot.forEach((doc) => {
      incidents.push({ id: doc.id, ...doc.data() });
    });
    return incidents;
  }
  
  //Search incident report by station
  async function searchIncidentsByStation(stationName) {
    const incidents = [];
    const q = query(collection(db, "incident"), where("stationName", "==", stationName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      incidents.push({ id: doc.id, ...doc.data() });
    });
    return incidents;
  }
  