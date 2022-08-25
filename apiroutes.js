const router = require("express").Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

router.post("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        let rawData = JSON.parse(data);
        rawData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(rawData), (err) => {
            if(err) {
                return err;
            }
            console.log("Successful Write!");
        });
    });
    res.end;
});

router.delete("/notes/:id", (req, res) => {
    let id = req.params.id;
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err;
        }
        let rawData = JSON.parse(data);
        for (var i = 0; i < rawData.length; i++) {
            if (id === rawData[i].id) {
                rawData.splice(i, 1);
                fs.writeFile("./db/db.json", JSON.stringify(rawData), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Note has been eradicated!");
                });
            };
        };
    });
    res.end();
});

module.exports = router;
