const sqlite3 = require('sqlite3').verbose();

class TrainController {
    db = new sqlite3.Database('mydb.sqlite');

    create = (req, res) => {
        const { name } = req.body
        const stmt = this.db.prepare("INSERT INTO Train (name) VALUES (?)");
        stmt.run(name, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json({ id: this.lastID, name });
        });
    }

    getAll = (req, res) => {
        const { name } = req.query

        let query = "SELECT * FROM Train";
        if (name) {
            query += ` WHERE name = '${name}'`;
        }

        this.db.all(query, (err, trains) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(trains);
        });
    }

    getOne = (req, res) => {
        const { id } = req.params

        this.db.get("SELECT * FROM Train WHERE id = ?", id, (err, train) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!train) {
                return res.status(404).json(`Train ${id} not found.`);
            }
            return res.status(200).json(train);
        });
    }

    update = (req, res) => {
        const { id } = req.params
        const { name } = req.body

        this.db.run("UPDATE Train SET name = ? WHERE id = ?", name, id, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`Train ${id} not found.`);
            }
            return res.status(200).json({ id, name });
        });
    }

    delete = (req, res) => {
        const { id } = req.params

        this.db.run("DELETE FROM Train WHERE id = ?", id, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            if (this.changes === 0) {
                return res.status(404).json(`Train ${id} not found.`);
            }
            return res.status(200).json({ id });
        });
    }
}

module.exports = new TrainController()
