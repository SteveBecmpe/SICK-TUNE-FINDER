$("#artistSearch").on("click", function (event) {
    let artist = $("#StartSearchValue").val();
    console.log(artist);
    SearchArtist(artist);
});


function SearchArtist(artist) {
    // This is our API key. Add your own API key between the ""
    let APIKey = "&appid=523532";
    let NumOfDays = "&cnt=5";

    let baseURL = "theaudiodb.com/api/v1/json/1/search.php?s=";
  
    let searchURL = baseURL + artist;
    console.log(searchURL);

    
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response) {
        console.log("response object " +response);

    });

};
