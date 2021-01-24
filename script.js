$("#artistSearch").on("click", function (event) {
  let artist = $("#StartSearchValue").val();
  $("#StartSearchValue").val("");
  console.log(artist);
  SearchArtist(artist);
});

let input = document.getElementById("StartSearchValue");//press enter is the same as clicking artist button
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("artistSearch").click();//click the artist button when enter is press while in the input box
  }
});


function SearchArtist(artist) {
  let wildCard = "%";
  let baseArtistURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
  let searchArtistURL = baseArtistURL + artist + wildCard;
  let searchURL = searchArtistURL;
  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#SearchResults").html("");
    let nextHeader = $(`
    <h3>Results for: ${artist}</h3>
    `);
    $("#SearchResults").append(nextHeader);
    for (let i = 0; i < response.artists.length; i++) {
      let nextButton = $(`
      <button class="button artistbtn" value="${response.artists[i].strArtist}">${response.artists[i].strArtist}</button>
      `);
      $("#SearchResults").append(nextButton);
    }
    let nextAlbums = $(`
    <div id="albumResults"></div>
    `);
    $("#SearchResults").append(nextAlbums);
  });
}