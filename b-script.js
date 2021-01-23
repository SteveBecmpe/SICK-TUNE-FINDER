$(document).on("click", ".artistbtn", function (event) {
    let artistAlbum = $(this).attr("value");
    SearchLyrics(artistAlbum);
  });

function SearchLyrics(LyricArtist) {
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
        let searchURL = baseURL + subMMalbumURL + responseFormat + postiiMMalbumURL+ targetArtistID + postMMalbumURL + MMAPIKey;
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
            $("#albumResults").append(nextAlbumHeader);
            for (let i = 0; i < response.message.body.album_list.length; i++) {
              let nextButton = $(`
            <button class="button albumbtn" value="${response.message.body.album_list[i].album.album_name}" artist="${LyricArtist}" albumID="${response.message.body.album_list[i].album.album_id}">${response.message.body.album_list[i].album.album_name}</button>
            `)
              $("#albumResults").append(nextButton);
            }
        });
    });

}