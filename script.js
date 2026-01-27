const STORAGE_KEY = "video_list";
let videos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveVideos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

// ================= ADMIN =================
function addVideo(){
  let title = document.getElementById("title").value.trim();
  let link  = document.getElementById("link").value.trim();

  if(!title || !link){
    alert("Fill all fields");
    return;
  }

  // YouTube auto embed
  if(link.includes("youtube.com/watch")){
    let id = new URL(link).searchParams.get("v");
    link = "https://www.youtube.com/embed/" + id;
  }
  if(link.includes("youtu.be/")){
    let id = link.split("/").pop();
    link = "https://www.youtube.com/embed/" + id;
  }

  videos.push({title, link});
  saveVideos();

  document.getElementById("title").value="";
  document.getElementById("link").value="";

  renderAdmin();
  renderUser();
}

function deleteVideo(i){
  if(!confirm("Delete video?")) return;
  videos.splice(i,1);
  saveVideos();
  renderAdmin();
  renderUser();
}

function renderAdmin(){
  let box=document.getElementById("adminVideos");
  if(!box) return;
  box.innerHTML="";
  videos.forEach((v,i)=>{
    box.innerHTML+=`
      <div class="card">
        <b>${v.title}</b><br>
        <small>${v.link}</small>
        <button onclick="deleteVideo(${i})">🗑 Delete</button>
      </div>
    `;
  });
}

// ================= USER =================
function renderUser(){
  let box=document.getElementById("videoList");
  if(!box) return;
  box.innerHTML="";

  videos.forEach(v=>{
    if(v.link.includes("youtube.com/embed")){
      box.innerHTML+=`
        <div class="card">
          <h3>${v.title}</h3>
          <iframe src="${v.link}"
           allowfullscreen
           style="width:100%;height:220px;border-radius:14px;"></iframe>
        </div>`;
    }else{
      box.innerHTML+=`
        <div class="card">
          <h3>${v.title}</h3>
          <video controls style="width:100%;border-radius:14px;">
            <source src="${v.link}" type="video/mp4">
          </video>
        </div>`;
    }
  });
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded",()=>{
  renderAdmin();
  renderUser();
});
