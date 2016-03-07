var __wp_facebookhelper__ = {
    playbutton: "data:image/png;base64,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",

    grabVideo: function(fbvideoelement) {
        var videothumb = fbvideoelement.querySelector("i[class*='img']");
        var videoobj = JSON.parse(fbvideoelement.getAttribute("data-store"));

        if(!videoobj.hasOwnProperty("videoID") || !videoobj.hasOwnProperty("src"))
            return;

        var fbinfo = new Object;
        fbinfo.type = "play_facebook";
        fbinfo.thumbnail = videothumb.style.background.match(/url\(["]*(.*)["]*\)/)[1];
        fbinfo.url = videoobj.src;

        __wp_grabberbuilder__.createPlayer(fbvideoelement.parentElement, "fb", "navigator.qt.postMessage('" + JSON.stringify(fbinfo) + "')", __wp_facebookhelper__.playbutton, fbinfo.thumbnail);
    },

    getEmbeddedVideos: function () {
        var fbembeddedvideos = document.querySelectorAll("div[data-store^='{\"videoID']");

        for(var i = 0; i < fbembeddedvideos.length; i++)
            __wp_facebookhelper__.grabVideo(fbembeddedvideos[i]);
    }
};
