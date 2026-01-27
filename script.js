// ================================
// localStorage key
// ================================
const STORAGE_KEY = "video_list";

// Load videos
let videos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save videos
function saveVideos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

// ================================
// ADMIN: Add video
// ================================
function addVideo() {
  let title = document.getElementById("title").value.trim();
  let link  = document.getElementById("link").value.trim();

  if (!title || !link) {
    alert("Title / Link ထည့်ပါ");
    return;
  }

  // Convert YouTube link to embed
  if (link.includes("watch?v=")) {
    let id = new URL(link).searchParams.get("v");
    link = "https://www.youtube.com/embed/" + id;
  }
  if (link.includes("youtu.be/")) {
    let id = link.split("/").pop();
    link = "https://www.youtube.com/embed/" + id;
  }

  videos.push({
    title: title,
    link: link
  });

  saveVideos();

  document.getElementById("title").value = "";
  document.getElementById("link").value  = "";

  renderAdmin();
  renderUser();
}

// ================================
// ADMIN: Delete video
// ================================
function deleteVideo(index) {
  if (!confirm("Delete this video?")) return;
  videos.splice(index, 1);
  saveVideos();
  renderAdmin();
  renderUser();
}

// ================================
// ADMIN: Render list
// ================================
function renderAdmin() {
  let box = document.getElementById("adminVideos");
  if (!box) return;

  box.innerHTML = "";

  videos.forEach((v, i) => {
    box.innerHTML += `
      <div class="card">
        <b>${v.title}</b><br>
        <small>${v.link}</small><br><br>
        <button onclick="deleteVideo(${i})">🗑 Delete</button>
      </div>
    `;
  });
}

// ================================
// USER: Render list
// ================================
function renderUser() {
  let box = document.getElementById("videoList");
  if (!box) return;

  box.innerHTML = "";

  if (videos.length === 0) {
    box.innerHTML = "<p>No videos yet</p>";
    return;
  }

  videos.forEach(v => {
    if (v.link.includes("youtube.com/embed")) {
      box.innerHTML += `
        <div class="card">
          <h3>${v.title}</h3>
          <iframe
            src="${v.link}"
            frameborder="0"
            allowfullscreen
            style="width:100%;height:220px;border-radius:14px;">
          </iframe>
        </div>
      `;
    } else {
      box.innerHTML += `
        <div class="card">
          <h3>${v.title}</h3>
          <video controls style="width:100%;border-radius:14px;">
            <source src="${v.link}" type="video/mp4">
          </video>
        </div>
      `;
    }
  });
}

// ================================
// Auto load
// ================================
document.addEventListener("DOMContentLoaded", () => {
  renderAdmin();
  renderUser();
});
