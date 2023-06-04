class TrainStation {
    constructor(trainId, stationId, arrival, departure) {
        this.trainId = trainId
        this.stationId = stationId
        this.arrival = arrival
        this.departure = departure
    }
}

const currentDate = new Date();
const year = currentDate.getFullYear()
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
const day = currentDate.getDate().toString().padStart(2, '0')
const formattedDate = `${year}-${month}-${day}`

trainStations = []
trainStations.push(new TrainStation(1, 1, `${formattedDate} 06:00`, `${formattedDate} 06:10`))
trainStations.push(new TrainStation(1, 2, `${formattedDate} 06:25`, `${formattedDate} 06:35`))
trainStations.push(new TrainStation(1, 3, `${formattedDate} 06:55`, `${formattedDate} 07:05`))
trainStations.push(new TrainStation(1, 4, `${formattedDate} 07:20`, `${formattedDate} 07:30`))

trainStations.push(new TrainStation(2, 2, `${formattedDate} 07:00`, `${formattedDate} 07:10`))
trainStations.push(new TrainStation(2, 5, `${formattedDate} 07:45`, `${formattedDate} 07:55`))
trainStations.push(new TrainStation(2, 6, `${formattedDate} 08:15`, `${formattedDate} 08:25`))

trainStations.push(new TrainStation(3, 3, `${formattedDate} 08:00`, `${formattedDate} 08:10`))
trainStations.push(new TrainStation(3, 5, `${formattedDate} 08:45`, `${formattedDate} 08:55`))
trainStations.push(new TrainStation(3, 1, `${formattedDate} 09:30`, `${formattedDate} 09:40`))

trainStations.push(new TrainStation(4, 1, `${formattedDate} 08:25`, `${formattedDate} 08:30`))
trainStations.push(new TrainStation(4, 4, `${formattedDate} 09:00`, `${formattedDate} 09:10`))
trainStations.push(new TrainStation(4, 6, `${formattedDate} 09:45`, `${formattedDate} 09:55`))
trainStations.push(new TrainStation(4, 3, `${formattedDate} 10:25`, `${formattedDate} 10:35`))

trainStations.push(new TrainStation(5, 5, `${formattedDate} 10:00`, `${formattedDate} 10:10`))
trainStations.push(new TrainStation(5, 2, `${formattedDate} 10:45`, `${formattedDate} 10:55`))
trainStations.push(new TrainStation(5, 1, `${formattedDate} 11:30`, `${formattedDate} 11:40`))

trainStations.push(new TrainStation(6, 2, `${formattedDate} 11:00`, `${formattedDate} 11:10`))
trainStations.push(new TrainStation(6, 5, `${formattedDate} 11:45`, `${formattedDate} 11:55`))
trainStations.push(new TrainStation(6, 3, `${formattedDate} 12:25`, `${formattedDate} 12:35`))
trainStations.push(new TrainStation(6, 6, `${formattedDate} 13:00`, `${formattedDate} 13:10`))

module.exports = {TrainStation, trainStations}
