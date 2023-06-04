class Station {
    constructor(name) {
        this.id = Station.getNextId();
        this.name = name
    }

    static getNextId() {
        const ids = stations.map(station => station.id)
        const maxId = ids.length > 0 ? Math.max(...ids) : 0
        return maxId + 1;
    }
}

stations = []
stations.push(new Station('New York'))
stations.push(new Station('Chicago'))
stations.push(new Station('San Francisco'))
stations.push(new Station('Seattle'))
stations.push(new Station('Denver'))
stations.push(new Station('Boston'))


module.exports = {Station, stations}
