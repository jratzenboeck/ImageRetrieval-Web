var fs = require('fs');
var LineByLineReader = require('line-by-line');
var xmlReader = require('xml2js');

module.exports = {
    getImagesForQueryId: getImagesForQueryId,
    getAllLocations: getAllLocations
};

function getImagesForQueryId(queryId, cb) {
    var imageIds = [];
    var lr = new LineByLineReader('./data/predictions.csv');

    lr.on('error', function (err) {
        return cb({message: err.message, status: 500}, null);
    });

    lr.on('line', function (line) {
        var splitLine = line.split(' ');
        if (splitLine[0] == queryId) {
            imageIds.push(splitLine[2]);
        }
    });

    lr.on('end', function () {
        if (imageIds.length > 0) {
            return cb(null, imageIds);
        }
        return cb({message: 'Error: No images for location found.', status: 400});
    });
}

function getAllLocations(cb) {
    var locations = [];

    fs.readFile('./data/testset_topics.xml', function(err, data) {
        xmlReader.parseString(data, function (err, res) {
            if (err) {
                return cb({message: err.message, status: 500}, null);
            }
            res.topics.topic.forEach(function (topic) {
                locations.push({name: topic.title[0], number: topic.number[0]});
            });
            return cb(null, locations);
        });
    });

}