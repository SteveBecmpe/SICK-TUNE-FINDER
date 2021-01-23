$(document).on("click", ".artistbtn", function (event) {
    let artistAlbum = $(this).attr("value");
    SearchMMAlbums(artistAlbum);
});

$(document).on("click", ".albumbtn", function (event) {
    let MMalbumID = $(this).attr("albumID");
    let MMalbumName = $(this).attr("value");
    SearchTracks(MMalbumID, MMalbumName);
});

// $(document).on("click", ".albumbtn", function (event) {
//     let MMalbumID = $(this).attr("albumID");
//     let MMalbumName = $(this).attr("value");
//     SearchTracks(MMalbumID, MMalbumName);
// });

function SearchMMAlbums(LyricArtist) {
    console.log("inF Artist " + LyricArtist);
    let MMAPIKey = "&apikey=9ad329a114ae6adb6c4a2c27453f0710";
    let baseURL = "https://api.musixmatch.com/ws/1.1/";
    let subTracksearchURL = "track.search?";
    let subArtistsearchURL = "artist.search?";
    let searchType = "&q_artist=";
    let resultCNT = "&page_size=5";
    let responseFormat = "format=jsonp&callback=callback";
    let searchURL = baseURL + subArtistsearchURL + responseFormat + searchType + LyricArtist + MMAPIKey;
    console.log(searchURL);
    $.ajax(
        searchURL, {
        method: "GET",
        dataType: "jsonp"
    }
    ).then(function (response) {
        console.log(response);
        let MMresponse = response;
        let targetArtistID;
        for (let i = 0; i < MMresponse.message.body.artist_list.length; i++) {
            console.log("ArtistArray " + i + " ");
            console.log(MMresponse.message.body.artist_list[i]);
            console.log(MMresponse.message.body.artist_list[i].artist.artist_id);
            let tempartist = MMresponse.message.body.artist_list[i].artist.artist_name;
            if (LyricArtist === tempartist) {
                targetArtistID = MMresponse.message.body.artist_list[i].artist.artist_id;
                console.log("Artist Id Var Set");
                console.log(targetArtistID);
                break;
            }
        }

        let subMMalbumURL = "artist.albums.get?";
        let postiiMMalbumURL = "&artist_id=";
        let postMMalbumURL = "&s_release_date=desc&g_album_name=1";
        let searchURL = baseURL + subMMalbumURL + responseFormat + postiiMMalbumURL + targetArtistID + postMMalbumURL + MMAPIKey;
        console.log(searchURL);
        $.ajax(
            searchURL, {
            method: "GET",
            dataType: "jsonp"
        }
        ).then(function (response) {
            console.log("2nd MM Ajax");
            console.log(response);
            $("#albumResults").html("");
            let nextAlbumHeader = $(`
            <h3>Album Results for: ${LyricArtist}</h3>
            `);
            $("#albumResults").append(nextAlbumHeader);//---------------------------------------------------
            for (let i = 0; i < response.message.body.album_list.length; i++) {
                let nextButton = $(`
            <button class="button albumbtn" value="${response.message.body.album_list[i].album.album_name}" artist="${LyricArtist}" albumID="${response.message.body.album_list[i].album.album_id}">${response.message.body.album_list[i].album.album_name}</button>
            `)
                $("#albumResults").append(nextButton);
            }
            let nextTracks = $(`
            <div id="TrackResults"></div>
            `);
            $("#SearchResults").append(nextTracks);
        });
    });
    // Calls Artist Info
    let baseArtistURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
    // let baseAlbumFromArtistURL =
    //     "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=";

    // let searchURL = baseURL + artist+wildCard;
    let searchArtistURL = baseArtistURL + LyricArtist;
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

function SearchTracks(MMalbumID, AlbumName) {
    // album.tracks.get?album_id=*******&page=1&page_size=2
    let MMAPIKey = "&apikey=9ad329a114ae6adb6c4a2c27453f0710";
    let baseURL = "https://api.musixmatch.com/ws/1.1/";
    let subTracksearchURL = "album.tracks.get?";
    //    let subArtistsearchURL = "artist.search?";
    let searchType = "&album_id=";
    // let resultCNT = "&page=1&page_size=2";
    let resultCNT = "&page=1";
    let responseFormat = "format=jsonp&callback=callback";
    let searchURL = baseURL + subTracksearchURL + responseFormat + searchType + MMalbumID + resultCNT + MMAPIKey;
    console.log(searchURL);
    $.ajax(
        searchURL, {
        method: "GET",
        dataType: "jsonp"
    }
    ).then(function (response) {
        console.log(response);
        $("#TrackResults").html("");
        let nextAlbumHeader = $(`
        <h3>Track Results for: ${AlbumName}</h3>
        `);
        $("#TrackResults").append(nextAlbumHeader);
        for (let i = 0; i < response.message.body.track_list.length; i++) {
            let nextButton = $(`
        <button class="button trackbtn" artistName="${response.message.body.track_list[i].track.artist_name}" trackName="${response.message.body.track_list[i].track.track_name}">${response.message.body.track_list[i].track.track_name}</button>
        `)
            $("#TrackResults").append(nextButton);
        }
    });


};