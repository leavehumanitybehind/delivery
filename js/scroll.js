(function() {
    window.disableScroll = function () {
        document.body.dbscrollY = window.scrollY;

        document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left:0;
        width: 100%;
        overflow:hidden;
        height: 100vh;
        `;
    }

    window.enableScroll = function () {
        document.body.style.cssText = ``;
    }
})();