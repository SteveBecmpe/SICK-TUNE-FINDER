$(document).on("click", ".albumbtn", function (event) {

    let LyricArtist = $(this).attr("artist");
    let LyricAlbum = $(this).attr("value");
    console.log("Artist " + LyricArtist);
    console.log("Album " + LyricAlbum);
    SearchLyrics(LyricArtist);

});


function SearchLyrics(LyricArtist) {
    console.log("inF Artist " + LyricArtist);
    // //musixmatch api key:  9ad329a114ae6adb6c4a2c27453f0710

    // //artist.search?q_artist=prodigy&page_size=5
    // let MMLyricArtist = LyricArtist;
    let MMAPIKey = "&apikey=9ad329a114ae6adb6c4a2c27453f0710";
    let baseURL = "https://api.musixmatch.com/ws/1.1/";
    // let subsearchURL = "artist.search?q_artist=prodigy";
    let subTracksearchURL = "track.search?";
    let subArtistsearchURL = "artist.search?";
    let searchType = "&q_artist=";  //justin bieber&page_size=3&page=1&s_track_rating=desc
    let resultCNT = "&page_size=5";
    let responseFormat = "format=jsonp&callback=callback";

    // let searchURL = baseURL + subsearchURL + responseFormat +searchType + MMLyricArtist;
    let searchURL = baseURL + subArtistsearchURL + responseFormat + searchType + LyricArtist + MMAPIKey;
    // let searchURL = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=p!nk&apikey=9ad329a114ae6adb6c4a2c27453f0710";

    // let searchURL = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc" + MMAPIKey;
    // let searchURL = "https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=pink";

    // let searchURL = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=roundabout&q_artist=yes"+MMAPIKey
    // ​
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
        let postMMalbumURL = "&s_release_date=desc&g_album_name=1";//"&s_release_date=desc&g_album_name=1"
        // artist.albums.get?artist_id=****&s_release_date=desc&g_album_name=1
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

        });



    });

}