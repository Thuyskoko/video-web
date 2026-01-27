// ================= FIREBASE CONFIG =================
var firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ================= DATABASE =================
var database = firebase.database();
var videoRef = database.ref("videos");

// ================= ADD VIDEO =================
function addVideo() {
  var title = document.getElementById("title").value;
  var link  = document.getElementById("link").value;

  if(title === "" || link === ""){
    alert("Title & Link required");
    return;
  }

  videoRef.push({
    title: title,
    link: link,
    time: Date.now()
  });

  document.getElementById("title").value = "";
  document.getElementById("link").value = "";
}

// ================= LOAD + AUTO UPDATE =================
videoRef.on("value", function(snapshot) {
  var adminDiv = document.getElementById("adminVideos");
  adminDiv.innerHTML = "";

  snapshot.forEach(function(child) {
    var id = child.key;
    var data = child.val();

    adminDiv.innerHTML += `
      <div class="card">
        <h3>${data.title}</h3>
        <p>${data.link}</p>
        <button onclick="editVideo('${id}','${data.title}','${data.link}')">✏ Edit</button>
        <button onclick="deleteVideo('${id}')">🗑 Delete</button>
      </div>
    `;
  });
});

// ================= EDIT VIDEO =================
function editVideo(id,title,link){
  var newTitle = prompt("Edit title", title);
  var newLink  = prompt("Edit link", link);

  if(newTitle && newLink){
    videoRef.child(id).update({
      title: newTitle,
      link: newLink
    });
  }
}

// ================= DELETE VIDEO =================
function deleteVideo(id){
  if(confirm("Delete this video?")){
    videoRef.child(id).remove();
  }
}
