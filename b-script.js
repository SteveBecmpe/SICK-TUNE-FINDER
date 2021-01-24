$(document).on("click", ".artistbtn", function (event) {
    let artistAlbum = $(this).attr("value");
    SearchMMAlbums(artistAlbum);
});

$(document).on("click", ".albumbtn", function (event) {
    let MMalbumID = $(this).attr("albumID");
    let MMalbumName = $(this).attr("value");
    SearchTracks(MMalbumID, MMalbumName);
});

$(document).on("click", ".trackbtn", function (event) {
    let MMartistName = $(this).attr("artistName");
    let MMtrackName = $(this).attr("trackName");
    SearchLyrics(MMartistName, MMtrackName);
});

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
            $("#albumResults").append(nextAlbumHeader);
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
    let baseArtistURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
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
    let MMAPIKey = "&apikey=9ad329a114ae6adb6c4a2c27453f0710";
    let baseURL = "https://api.musixmatch.com/ws/1.1/";
    let subTracksearchURL = "album.tracks.get?";
    let searchType = "&album_id=";
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
        let nextLyrics = $(`
        <div id="LyricsResults"></div>
        `);
        $("#SearchResults").append(nextLyrics);
    });
};

function SearchLyrics(ArtistName, TrackName) {
    let MMAPIKey = "&apikey=9ad329a114ae6adb6c4a2c27453f0710";
    let baseURL = "https://api.musixmatch.com/ws/1.1/";
    let subLyricSearchURL = "matcher.lyrics.get?";
    let subArtistSearchURL = "&q_artist=";
    let searchType = "&q_track=";
    let responseFormat = "format=jsonp&callback=callback";
    let searchURL = baseURL + subLyricSearchURL + responseFormat + searchType + TrackName + subArtistSearchURL + ArtistName + MMAPIKey;

    $.ajax(
        searchURL, {
        method: "GET",
        dataType: "jsonp"
    }
    ).then(function (response) {
        console.log("lyric Object");
        console.log(response);
        let LyricResponse = response;
        $("#LyricsResults").html("");
        let nextLyricHeader = $(`
        <h3>Lyric Results for: ${TrackName}</h3>
        `);
        $("#LyricsResults").append(nextLyricHeader);
        console.log(LyricResponse.message.header.status_code);
        let numberOfStatusCode = Number(LyricResponse.message.header.status_code);
        if ((numberOfStatusCode != 404) && (response.message.body.lyrics.lyrics_body != "")) {//stops 404 status and "" lyric body's
            console.log("inside if");
            let nextLyric = $(`
        <p class="lyrics" trackName="${TrackName}" trackArtist="${ArtistName}" type="lyrics">${response.message.body.lyrics.lyrics_body}</p>
        <p class="lyrics" trackName="${TrackName}" trackArtist="${ArtistName}" type="Copyrights">${response.message.body.lyrics.lyrics_copyright}</p>
        `)
            $("#LyricsResults").append(nextLyric);
        } else {
            console.log("body length !> 0");
            let nextLyric = $(`
            <p class="lyrics" trackName="${TrackName}" trackArtist="${ArtistName}" type="lyrics">Sorry No lyrics in the Music Match data base to load</p>
            `)
            $("#LyricsResults").append(nextLyric);
        }
    });
}