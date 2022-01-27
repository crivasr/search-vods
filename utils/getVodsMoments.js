const fetch = require("node-fetch");
const { Moment, gqlAPI } = require("./constants");

async function getVodsMoments(client_id, vods) {
    const moments = [];
    const fragments = [[]];

    vods.forEach((vod) => {
        // creamos fragmentos con 34 ids (que es el maximo que permite twitch)
        let lastIndex = fragments.length - 1;
        const length = fragments[lastIndex].length;
        const id = vod.node.id;

        if (length > 34) {
            lastIndex++;
            fragments.push([]);
        }
        fragments[lastIndex].push(id);
    });

    for (let i = 0; i < fragments.length; i++) {
        // para cada fragmento buscar la info de todas las ids de Vods
        const fragment = fragments[i];
        const operations = [];

        fragment.forEach((id) => {
            const body = {
                operationName: Moment.operationName,
                variables: {
                    videoId: id,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: Moment.hash,
                    },
                },
            };

            operations.push(body);
        });

        const options = {
            method: "POST",
            headers: { "Client-Id": client_id },
            body: JSON.stringify(operations),
        };

        const request = await fetch(gqlAPI, options);
        const json = await request.json();

        json.forEach((vod) => {
            vod.data.video.moments.edges.forEach((moment) => {
                moments.push(moment);
            });
        });
    }

    return moments;
}

module.exports = getVodsMoments;
