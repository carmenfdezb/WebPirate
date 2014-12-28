import QtQuick 2.0
import Sailfish.Silica 1.0
import "menus"
import "../js/UrlHelper.js" as UrlHelper
import "../js/Database.js" as Database
import "../js/Favorites.js" as Favorites
import "../js/Credentials.js" as Credentials

Item
{    
    id: browsertab
    state: "favorites"

    states: [
        State {
            name: "favorites";
            PropertyChanges { target: webview; visible: false; }
            PropertyChanges { target: favoritesview; visible: true }
            PropertyChanges { target: loadingbar; visible: false }
            PropertyChanges { target: loadfailed; visible: false }
        },

        State {
            name: "webbrowser";
            PropertyChanges { target: webview; visible: true; }
            PropertyChanges { target: favoritesview; visible: false }
            PropertyChanges { target: loadfailed; visible: false }
        },

        State {
            name: "loaderror";
            PropertyChanges { target: webview; visible: false; }
            PropertyChanges { target: favoritesview; visible: false }
            PropertyChanges { target: loadingbar; visible: false }
            PropertyChanges { target: loadfailed; visible: true }
        } ]

    function getIcon()
    {
        if(state == "favorites")
            return "image://theme/icon-m-tabs";

        return (webview.icon !== "" ? webview.icon : "image://theme/icon-s-group-chat");
    }

    function getTitle()
    {
        if(navigationbar.searchBar.title.length > 0)
            return navigationbar.searchBar.title

        if(navigationbar.searchBar.url.length > 0)
            return navigationbar.searchBar.url

        if(navigationbar.state == "loaderror")
            return "Load Error";

        return qsTr("New Tab");
    }

    function loadDefault()
    {
        state = "favorites";
        webview.url = "about:bookmarks";
        navigationbar.searchBar.url = "about:bookmarks";
    }

    function manageSpecialUrl(url)
    {
        var specialurl = UrlHelper.specialUrl(url);

        if(specialurl === "config")
            pageStack.push(Qt.resolvedUrl("../SettingsPage.qml"), {"settings": mainwindow.settings });

        loadDefault();
    }

    function load(req) {
        if(UrlHelper.isSpecialUrl(req))
            manageSpecialUrl(req);
        else if(req !== null)
        {
            state = "webbrowser";

            if(UrlHelper.isUrl(req))
                webview.url = UrlHelper.adjustUrl(req);
            else
                webview.url = mainwindow.settings.searchengines.get(mainwindow.settings.searchengine).query + req;
        }
        else
            loadDefault();
    }

    LinkMenu {
        id: linkmenu

        onOpenLinkRequested: browsertab.load(url)
        onOpenTabRequested: tabview.addTab(url)
        onAddToFavoritesRequested: Favorites.add(Database.instance(), mainwindow.settings.favorites, url, url)
        onRemoveFromFavoritesRequested: Favorites.remove(Database.instance(), mainwindow.settings.favorites, url)
    }

    CredentialMenu {
        id: credentialmenu
    }

    HistoryMenu {
        id: historymenu
        anchors { left: parent.left; right: parent.right; top: parent.top; bottom: navigationbar.top }
        onUrlRequested: browsertab.load(url)
    }

    FavoritesView
    {
        id: favoritesview
        anchors { left: parent.left; right: parent.right; top: parent.top; bottom: navigationbar.top }
        onUrlRequested: load(favoriteurl);

        onVisibleChanged: {
            if(visible)
                navigationbar.expand();
        }
    }

    LoadFailed
    {
        id: loadfailed
        anchors { left: parent.left; right: parent.right; top: parent.top; bottom: navigationbar.top }

        onVisibleChanged: {
            if(visible)
                navigationbar.expand();
        }
    }

    LoadingBar
    {
        id: loadingbar
        z: 1
        visible: false
        anchors { left: parent.left; top: parent.top; right: parent.right }
        minimumValue: 0
        maximumValue: 100
        value: webview.loadProgress
        hideWhenFinished: true
    }

    BrowserWebView
    {
        id: webview
        anchors.fill: parent
    }

    NavigationBar
    {
        id: navigationbar
        anchors { bottom: parent.bottom; left: parent.left; right: parent.right }
        forwardButton.enabled: webview.canGoForward;
        backButton.enabled: webview.canGoBack;

        onForwardRequested: webview.goForward();
        onBackRequested: webview.goBack();
        onRefreshRequested: webview.reload();
        onStopRequested: webview.stop();
        onSearchRequested: load(searchquery);

        searchBar.onTextChanged: {
            if(webview.loading)
                return;

            historymenu.query = text
        }
    }

    onVisibleChanged: {
        if(!visible) {
            linkmenu.hide();
        }
    }
}
