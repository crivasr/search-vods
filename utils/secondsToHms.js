function secondsToHms(seconds) {
    seconds = Number(seconds);
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${h}h${m}m${s}s`;
}

module.exports = secondsToHms;
