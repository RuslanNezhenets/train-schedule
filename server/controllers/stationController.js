const sqlite3 = require('sqlite3').verbose();

class StationController {
    db = new sqlite3.Database('mydb.sqlite');

    create = (req, res) => {
        const { name } = req.body
        const stmt = this.db.prepare("INSERT INTO Station (name) VALUES (?)");
        stmt.run(name, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json({ id: this.lastID, name });
        });
    }

    getAll = (req, res) => {
        const { name, page = 1, limit = 10 } = req.query

        let query = "SELECT * FROM Station";
        if (name) {
            query += ` WHERE name = '${name}'`;
        }
        query += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

        this.db.all(query, (err, stations) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(stations);
        });
    }

    getOne = (req, res) => {
        const { id } = req.params

        this.db.get("SELECT * FROM Station WHERE id = ?", id, (err, station) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!station) {
                return res.status(404).json(`Station ${id} not found.`);
            }
            return res.status(200).json(station);
        });
    }

    update = (req, res) => {
        const { id } = req.params
        const { name } = req.body

        this.db.run("UPDATE Station SET name = ? WHERE id = ?", name, id, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`Station ${id} not found.`);
            }
            return res.status(200).json({ id, name });
        });
    }

    delete = (req, res) => {
        const { id } = req.params

        this.db.run("DELETE FROM Station WHERE id = ?", id, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`Station ${id} not found.`);
            }
            return res.status(200).json({ id });
        });
    }
}

module.exports = new StationController()
