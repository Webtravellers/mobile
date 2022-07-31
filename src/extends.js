Array.prototype.groupBy = function (keyGetter) {
    const map = new Map();
    this.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

String.prototype.toLocaleDate = function () {
    const date = new Date(this);
    //Convert tr-TR format 
    const monthNames = [
        "Ocak", "Şubat", "Mart",
        "Nisan", "Mayıs", "Haziran", "Temmuz",
        "Ağustos", "Eylül", "Ekim",
        "Kasım", "Aralık"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
}