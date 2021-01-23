$("#artistSearch").on("click", function (event) {
  let artist = $("#StartSearchValue").val();
  console.log(artist);
  SearchArtist(artist);
});

// $(document).on("click", ".artistbtn", function (event) {
//   // $("#SearchResults").on("click", function (event) {
//   let artistAlbum = $(this).attr("value");
//   // alert(tempCL);
//   // event.preventDefault();
//   // let artistAlbum = $(this).html();
//   // console.log(artistAlbum);
//   SearchAlbums(artistAlbum);
// });

function SearchArtist(artist) {
  //starts at input with artist ends at display search results of all artists.

  // This is our API key. Add your own API key between the ""
  // let APIKey = "&appid=523532";
  // let ADBAPITOKEN = "CDCFB";
  let wildCard = "%";
  // let NumOfDays = "&cnt=5";
  // let testURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay" + APIKey;

  let baseArtistURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
  // let baseAlbumFromArtistURL = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=";

  // let searchURL = baseURL + artist+wildCard;
  let searchArtistURL = baseArtistURL + artist + wildCard;
  // let searchAlbumURL = baseAlbumFromArtistURL + artist;

  let searchURL = searchArtistURL;
  // let searchURL = searchAlbumURL;

  //Calls API Response
  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    // console.log(searchURL);
    // console.log(testURL);
    // console.log("response object " +response);
    console.log(response);
    // console.log(response.artists.length);
    $("#SearchResults").html("");
    let nextHeader = $(`
    <h3>Results for: ${artist}</h3>
    `);
    $("#SearchResults").append(nextHeader);

    for (let i = 0; i < response.artists.length; i++) {
      // console.log(response.artists[i].strArtist);
      let nextButton = $(`
      <button class="button artistbtn" value="${response.artists[i].strArtist}">${response.artists[i].strArtist}</button>
      `);
      $("#SearchResults").append(nextButton);
    }
    let nextAlbums = $(`
    <div id="albumResults"></div>
    `);
    $("#SearchResults").append(nextAlbums);
    // $("#genre").text(response.artists[0].strStyle);
    // $("#country").text(response.artists[0].strCountry);
    // $("#artistBio").text(response.artists[0].strBiographyEN);
  });
}

function SearchAlbums(artist) {
  //starts at artist search results, ends at output of all albums

  // This is our API key. Add your own API key between the ""
  // let APIKey = "&appid=523532";
  // let ADBAPITOKEN = "CDCFB";
  // let wildCard = "%";
  // let NumOfDays = "&cnt=5";
  // let testURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay" + APIKey;

  let baseArtistURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
  let baseAlbumFromArtistURL =
    "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=";

  // let searchURL = baseURL + artist+wildCard;
  let searchArtistURL = baseArtistURL + artist;
  console.log(searchArtistURL);
  let searchAlbumURL = baseAlbumFromArtistURL + artist;

  // let searchURL = searchArtistURL;
  let searchURL = searchAlbumURL;

  //Calls API Response
  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    // console.log(searchURL);
    // console.log(testURL);
    // console.log("response object " +response);
    // console.log(response);
    // console.log(response.artists.length);
    $("#albumResults").html("");
    let nextAlbumHeader = $(`
    <h3>Album Results for: ${artist}</h3>
    `);
    $("#albumResults").append(nextAlbumHeader);
    for (let i = 0; i < response.album.length; i++) {
      // console.log(response.album[i].strAlbum);
      let nextButton = $(`

    <button class="button albumbtn" value="${response.album[i].strAlbum}" artist="${artist}">${response.album[i].strAlbum}</button>
    `)

      $("#albumResults").append(nextButton);
    }
  });

  // Calls Artist Info
  $.ajax({
    url: searchArtistURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#style").text(response.artists[0].strStyle);
    $("#genre").text(response.artists[0].strGenre);
    $("#country").text(response.artists[0].strCountry);
    $("#artistBio").text(response.artists[0].strBiographyEN);
  });
}
