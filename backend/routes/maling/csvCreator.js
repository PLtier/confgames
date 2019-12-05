const ObjectsToCsv = require("objects-to-csv");

const objectTo64Csv = async data => {
    let csv = await new ObjectsToCsv(data).toString();
    return Buffer.from(csv).toString('base64')
};

// const reparse = data => ;

//buduję funkcję, która mi parsuje
module.exports = objectTo64Csv;

