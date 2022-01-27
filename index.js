const searchGameVods = require("./utils/searchGameVods");

(async () => {
    const channel = "suwie";

    // abrir twitch sin estar loggeado, abrir la devtool y seleccionar cualquier call a la api gql
    // buscar el header Client-Id
    const client_id = "";

    // tiene que estar bien escrito(no toma GTAV porque twitch lo guarda como Grand Theft Auto V)
    // no importan las mayusculas
    const game = "grand theft auto v";

    const vods = await searchGameVods(channel, client_id, game);

    console.log(vods);
})();
