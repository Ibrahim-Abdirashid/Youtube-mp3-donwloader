document
  .getElementById("search-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&geo=US&lang=en`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9452172446msh620b23d249c353fp16dad9jsn7b983901f89b",
        "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      displayVideos(result.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  });

function displayVideos(videos) {
  const videoList = document.getElementById("video-list");
  videoList.innerHTML = "";
  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
      <div class="video-thumbnail" style="background-image: url('${video.thumbnail[0].url}');"></div>
      <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-channel">${video.channelTitle}</div>
      </div>
    `;
    videoItem.addEventListener("click", () => openModal(video.videoId));
    videoList.appendChild(videoItem);
  });
}

async function openModal(videoId) {
  const modal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  console.log("Opening video:", videoId, videoUrl); // Debugging information

  videoPlayer.src = videoUrl;
  modal.style.display = "block";

  videoPlayer.onerror = function () {
    alert("This video is not available on YouTube.");
    closeModal();
  };

  document.getElementById("download-mp3").onclick = async function () {
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9452172446msh620b23d249c353fp16dad9jsn7b983901f89b",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.status === "ok") {
        window.location.href = result.link;
      } else {
        alert("Error downloading MP3: " + result.msg);
      }
    } catch (error) {
      console.error("Error downloading MP3:", error);
    }
  };
}

document.getElementById("close-modal").addEventListener("click", closeModal);

window.onclick = function (event) {
  const modal = document.getElementById("video-modal");
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  const modal = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  videoPlayer.src = "";
  modal.style.display = "none";
}
