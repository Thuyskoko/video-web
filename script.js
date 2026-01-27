let videos = JSON.parse(localStorage.getItem("video_list")) || [];

function renderUser() {
  let box = document.getElementById("videoList");
  if (!box) return;

  box.innerHTML = "";

  if (videos.length === 0) {
    box.innerHTML = "<p>No videos yet</p>";
    return;
  }

  videos.forEach(v => {
    if (v.link.includes("youtu") && !v.link.includes("youtube.com/embed")) {
      let id;
      if (v.link.includes("watch?v=")) {
        id = new URL(v.link).searchParams.get("v");
      } else {
        id = v.link.split("/").pop();
      }
      v.link = "https://www.youtube.com/embed/" + id;
    }

    if (v.link.includes("youtube.com/embed")) {
      box.innerHTML += `
        <div class="card">
          <h3>${v.title}</h3>
          <iframe src="${v.link}" frameborder="0" allowfullscreen style="width:100%;height:200px;"></iframe>
        </div>
      `;
    } else {
      box.innerHTML += `
        <div class="card">
          <h3>${v.title}</h3>
          <video controls style="width:100%;">
            <source src="${v.link}" type="video/mp4">
          </video>
        </div>
      `;
    }
  });
}

document.addEventListener("DOMContentLoaded", renderUser);
