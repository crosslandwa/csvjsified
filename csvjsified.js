const fs = require('fs')

function convertToJsObject(csvString) {
  const csvLines = csvString.split('\n')
  const csvHeaders = parseCsvLine(csvLines[0])
  const dataRows = csvLines.slice(1).map(parseCsvLine).filter(line => line.length)

  return dataRows.map(row => row.reduce((acc, it, index) => {
    acc[csvHeaders[index]] = it
    return acc
  }, {}))
}

function parseCsvLine (raw) {
  return raw.trim().length === 0
    ? []
    : raw.split(',').map(key => key.trim().replace(/"/g, ''))
}

function readFileContentAsString(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data.toString()))
  })
}

module.exports = {
  fromFilePath: (csvPath) => readFileContentAsString(csvPath)
    .then(convertToJsObject)
}
