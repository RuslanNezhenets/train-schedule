const sqlite3 = require('sqlite3').verbose();

class TrainStationController {
    db = new sqlite3.Database('mydb.sqlite');

    create = (req, res) => {
        const { trainId, stationId, arrival, departure } = req.body;

        if (isNaN(trainId)) {
            return res.status(400).json(`trainId ${trainId} incorrect`);
        }
        if (isNaN(stationId)) {
            return res.status(400).json(`stationId ${stationId} incorrect`);
        }

        const query = "SELECT * FROM TrainStation WHERE trainId = ? AND stationId = ?";
        this.db.get(query, [trainId, stationId], (err, row) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (row) {
                return res.status(422).json('The selected station is already on the selected route.');
            } else {
                const stmt = this.db.prepare("INSERT INTO TrainStation (trainId, stationId, arrival, departure) VALUES (?, ?, ?, ?)");
                stmt.run(trainId, stationId, arrival, departure, function(err) {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(201).json({ id: this.lastID, trainId, stationId, arrival, departure });
                });
            }
        });
    }

    getAll = (req, res) => {
        let {trainId, stationId, arrival, departure} = req.query;
        let query = "SELECT * FROM TrainStation WHERE 1=1";
        let params = [];

        if (trainId) {
            query += " AND trainId = ?";
            params.push(trainId);
        }

        if (stationId) {
            query += " AND stationId = ?";
            params.push(stationId);
        }

        if (arrival) {
            query += " AND arrival = ?";
            params.push(arrival);
        }

        if (departure) {
            query += " AND departure = ?";
            params.push(departure);
        }

        this.db.all(query, params, (err, rows) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(rows);
        });
    }

    getOne = (req, res) => {
        const {trainId, stationId} = req.params;

        const query = "SELECT * FROM TrainStation WHERE trainId = ? AND stationId = ?";
        this.db.get(query, [trainId, stationId], (err, row) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!row) {
                return res.status(404).json(`TrainStation ${trainId} - ${stationId} not found.`);
            } else {
                return res.status(200).json(row);
            }
        });
    }

    getTrains = (req, res) => {
        const {startStationId, endStationId} = req.params;

        if (startStationId === endStationId) {
            return res.status(422).json([])
        }

        const query = `
            SELECT ts1.trainId, ts1.stationId as startStationId, ts2.stationId as endStationId 
            FROM TrainStation ts1
            JOIN TrainStation ts2 ON ts1.trainId = ts2.trainId 
            WHERE ts1.stationId = ? AND ts2.stationId = ? 
                AND ts1.departure < ts2.arrival`;

        this.db.all(query, [startStationId, endStationId], (err, rows) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(rows);
        });
    }


    update = (req, res) => {
        const {arrival, departure} = req.body;
        let {trainId, stationId} = req.params;
        trainId = parseInt(trainId);
        stationId = parseInt(stationId);

        const query = "UPDATE TrainStation SET arrival = ?, departure = ? WHERE trainId = ? AND stationId = ?";
        this.db.run(query, [arrival, departure, trainId, stationId], function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`TrainStation ${trainId} - ${stationId} not found.`);
            }
            return res.status(200).json({ trainId, stationId, arrival, departure });
        });
    }

    delete = (req, res) => {
        const {trainId, stationId} = req.params;

        this.db.run("DELETE FROM TrainStation WHERE trainId = ? AND stationId = ?", [trainId, stationId], function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`TrainStation ${trainId} - ${stationId} not found.`);
            }
            return res.status(200).json({ trainId, stationId });
        });
    }

    // I didn't implement `getTrains` because it would require complex querying and joins which can vary widely depending on your schema and requirements. You might need a dedicated method for this and likely some complex SQL.
}

module.exports = new TrainStationController()
