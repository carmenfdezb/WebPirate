var __wp_youtubehelper__ = {
    playbutton: "data:image/png;base64,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",

    grabPlayerElement: function() {
        var ytplayercontainer = document.getElementById("player-mole-container"); /* Standard Version */

        if(!ytplayercontainer) /* Try the mobile version */
        {
            var content = document.getElementById("content");
            ytplayercontainer = content.querySelector("div > a > div").parentElement.parentElement;

            if(!ytplayercontainer)
                return null;

            ytplayercontainer.style.width = "100%";
            ytplayercontainer.style.height = "153px";
            ytplayercontainer.style.maxWidth = "320px";
        }
        else
            ytplayercontainer.className = "player-width player-height";

        ytplayercontainer.style.backgroundColor = "#1b1b1b";
        return ytplayercontainer;
    },

    grabVideoThumbnail: function(videoid) {
       return "https://img.youtube.com/vi/" + videoid + "/0.jpg";
    },

    getVideo: function() {
        var ytregex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

        if(!ytregex.test(document.location.href))
            return;

        var ytplayer = __wp_youtubehelper__.grabPlayerElement();

        if(!ytplayer)
            return;

        // Remove this element so we can click the link
        var thbackground = document.getElementById("theater-background");

        if(thbackground)
            thbackground.parentNode.removeChild(thbackground);

        var cap = ytregex.exec(document.location.href);
        var videoinfo = new Object;
        videoinfo.type = "play_youtube";
        videoinfo.videoid = cap[1];

        __wp_grabberbuilder__.createPlayer(ytplayer, "yt", "navigator.qt.postMessage('" + JSON.stringify(videoinfo) + "')", __wp_youtubehelper__.playbutton, __wp_youtubehelper__.grabVideoThumbnail(cap[1]));
    },

    getEmbeddedVideos: function() {
        var iframes = document.querySelectorAll("iframe[src*='www.youtube.com/embed/']");

        if(!iframes.length)
            return;

        var ytregex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

        for(var i = 0; i < iframes.length; i++)
        {
            var iframe = iframes[i];
            var cap = ytregex.exec(iframe.src);

            if(!cap || (cap && !cap[1]))
                continue;

            var videoinfo = new Object;
            videoinfo.type = "play_youtube";
            videoinfo.videoid = cap[1];

            __wp_grabberbuilder__.createPlayer(iframe, "yt", "navigator.qt.postMessage('" + JSON.stringify(videoinfo) + "')", __wp_youtubehelper__.playbutton, __wp_youtubehelper__.grabVideoThumbnail(cap[1]));
        }
    }
}
