const sqlite3 = require('sqlite3').verbose();
const { stations } = require('../models/Station')
const { trains } = require('../models/Train')
const { trainStations } = require('../models/TrainStation')

function initialize() {
    const db = new sqlite3.Database('mydb.sqlite', (err) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log('Connected to the SQLite database.')
            db.serialize(function () {
                db.run(`CREATE TABLE IF NOT EXISTS Station (
                                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                name VARCHAR(255) UNIQUE)`
                )
                db.run(`CREATE TABLE IF NOT EXISTS Train (
                                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                name VARCHAR(255) UNIQUE)`
                )
                db.run(`CREATE TABLE IF NOT EXISTS TrainStation (
                                trainId INTEGER, 
                                stationId INTEGER, 
                                arrival DATETIME,
                                departure DATETIME,
                                PRIMARY KEY (trainId, stationId), 
                                FOREIGN KEY (trainId) REFERENCES Train(id), 
                                FOREIGN KEY (stationId) REFERENCES Station(id))`)
                stations.forEach(function (station) {
                    db.run(`INSERT OR IGNORE INTO Station (name) VALUES (?)`, station.name)
                })
                trains.forEach(function (train) {
                    db.run(`INSERT OR REPLACE INTO Train (name) VALUES (?)`, train.name);
                })
                trainStations.forEach(function (trainStation) { 
                    db.run(`INSERT OR REPLACE INTO TrainStation (trainId, stationId, arrival, departure) 
                                VALUES (?, ?, ?, ?)`,
                           trainStation.trainId, trainStation.stationId, trainStation.arrival, trainStation.departure);
                })
            })
        }
    })
}

module.exports = {
    initialize
}
