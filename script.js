/* =========================
   VIDEO STORAGE (local)
========================= */
let videos = JSON.parse(localStorage.getItem("videos")) || [];

/* =========================
   ADMIN : Add Video
========================= */
function addVideo() {
  let title = document.getElementById("title").value.trim();
  let link  = document.getElementById("link").value.trim();

  if (!title || !link) {
    alert("Title / Link ထည့်ပါ");
    return;
  }

  videos.push({
    title: title,
    link: link
  });

  localStorage.setItem("videos", JSON.stringify(videos));

  document.getElementById("title").value = "";
  document.getElementById("link").value  = "";

  renderAdmin();
}

/* =========================
   ADMIN : Delete Video
========================= */
function deleteVideo(index) {
  if (!confirm("Delete this video?")) return;

  videos.splice(index, 1);
  localStorage.setItem("videos", JSON.stringify(videos));
  renderAdmin();
}

/* =========================
   ADMIN : Render List
========================= */
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

/* =========================
   USER : Render Videos
========================= */
function renderUser() {
  let box = document.getElementById("videoList");
  if (!box) return;

  box.innerHTML = "";

  if (videos.length === 0) {
    box.innerHTML = "<p>No videos yet</p>";
    return;
  }

  videos.forEach(v => {
    box.innerHTML += `
      <div class="card">
        <h3>${v.title}</h3>
        <video controls width="100%">
          <source src="${v.link}" type="video/mp4">
        </video>
      </div>
    `;
  });
}

/* =========================
   AUTO LOAD
========================= */
window.onload = function () {
  renderAdmin();
  renderUser();
};
