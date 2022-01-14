const fetch = require("node-fetch");
const getVods = require("./getVods");
const { moment: momentConst, gqlAPI } = require("./constants.json");

async function getVodsMoments(token, vods) {
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
                operationName: momentConst.operation,
                variables: {
                    videoId: id,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: momentConst.hash,
                    },
                },
            };

            operations.push(body);
        });

        const options = {
            method: "POST",
            headers: { Authorization: `OAuth ${token}` },
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
