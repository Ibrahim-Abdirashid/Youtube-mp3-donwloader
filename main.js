document
  .querySelector("#search-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = document.querySelector("#search-input").value; // Make sure to get the value of the input

    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&geo=US&lang=en`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f5a1db72b2msh7bba6a56a4001e8p1d8ee6jsn7da82f55214a",
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

  videoList.innerHTML = ""; // Clear previous search results
  videos.forEach((video) => {
    const videoItem = document.createElement("div"); // Create a new div for each video
    videoItem.className = "video-item";
    videoItem.innerHTML = `
      <div class="video-thumbnail" style="background-image: url('${video.thumbnail[0].url}'); width:320px; height:300px;"></div>
      <div class="video-title">${video.title}</div>`; // Optionally, display video title

    videoList.appendChild(videoItem); // Add the video item to the video list
  });
}
