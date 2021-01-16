$("#artistSearch").on("click", function (event) {
    let artist = $("#StartSearchValue").val();
    // console.log(artist);
    SearchArtist(artist);
});


function SearchArtist(artist) {
    // This is our API key. Add your own API key between the ""
    let APIKey = "&appid=523532";
    let ADBAPITOKEN = "CDCFB";
    let wildCard = "%";
    // let NumOfDays = "&cnt=5";
    // let testURL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay" + APIKey;

    let baseURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
  
    let searchURL = baseURL + artist+wildCard;
  

    
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function (response) {
        console.log(searchURL);
        // console.log(testURL);
        // console.log("response object " +response);
        console.log(response);

    });

};
