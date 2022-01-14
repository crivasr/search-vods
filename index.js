const searchGameVods = require("./utils/searchGameVods");

(async () => {
    const channel = "suwie";

    // para conseguir tu token ve a twitch pulsa F12 y ve a Application > Cookies > twitch.tv > auth-token
    const token = "";

    // tiene que estar bien escrito(no toma GTAV porque twitch lo guarda como Grand Theft Auto V)
    // no importan las mayusculas
    const game = "grand theft auto v";

    const vods = await searchGameVods(channel, token, game);

    console.log(vods);
})();
