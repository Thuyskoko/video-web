let videos = JSON.parse(localStorage.getItem("videos")) || [];

// ---------- ADMIN ----------
function addVideo(){
  let title = document.getElementById("title").value;
  let link  = document.getElementById("link").value;

  if(title=="" || link==""){
    alert("Fill all fields");
    return;
  }

  videos.push({title,link});
  localStorage.setItem("videos",JSON.stringify(videos));

  document.getElementById("title").value="";
  document.getElementById("link").value="";

  renderAdmin();
}

function deleteVideo(i){
  videos.splice(i,1);
  localStorage.setItem("videos",JSON.stringify(videos));
  renderAdmin();
}

function renderAdmin(){
  let box=document.getElementById("adminList");
  if(!box) return;

  box.innerHTML="";
  videos.forEach((v,i)=>{
    box.innerHTML+=`
      <div class="video">
        <b>${v.title}</b>
        <button onclick="deleteVideo(${i})">❌ Delete</button>
      </div>
    `;
  });
}

// ---------- USER ----------
function renderUser(){
  let box=document.getElementById("videoList");
  if(!box) return;

  box.innerHTML="";
  videos.forEach(v=>{
    box.innerHTML+=`
      <div class="video">
        <b>${v.title}</b>
        <button onclick="play('${v.link}')">▶ Play</button>
      </div>
    `;
  });
}

function play(url){
  window.open(url,"_blank");
}

renderAdmin();
renderUser();
