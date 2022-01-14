const fetch = require("node-fetch");
const { vod: vodConst, gqlAPI } = require("./constants.json");

async function getVods(channel, token) {
    const vods = [];
    let cursor = undefined;

    while (cursor !== null) {
        const body = [
            {
                operationName: vodConst.operation,
                variables: {
                    limit: 100,
                    channelOwnerLogin: channel,
                    broadcastType: "ARCHIVE",
                    videoSort: "TIME",
                    cursor: cursor,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: vodConst.hash,
                    },
                },
            },
        ];

        const options = {
            method: "POST",
            headers: { Authorization: `OAuth ${token}` },
            body: JSON.stringify(body),
        };

        const response = await fetch(gqlAPI, options);
        const json = await response.json();
        const edges = json[0].data.user.videos.edges;

        edges.forEach((VOD) => {
            vods.push(VOD);
        });

        cursor = edges[0].cursor;
    }

    return vods;
}

module.exports = getVods;
