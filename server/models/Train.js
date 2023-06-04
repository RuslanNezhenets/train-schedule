class Train {
    constructor(name) {
        this.id = Train.getNextId();
        this.name = name
    }

    static getNextId() {
        const ids = trains.map(train => train.id)
        const maxId = ids.length > 0 ? Math.max(...ids) : 0
        return maxId + 1;
    }
}

trains = []
trains.push(new Train('Express Train'))
trains.push(new Train('Local Train'))
trains.push(new Train('Express Train 2'))
trains.push(new Train('Local Train 2'))
trains.push(new Train('High-speed Train'))
trains.push(new Train('High-speed Train 2'))


module.exports = {Train, trains}
