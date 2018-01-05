const fs = require('fs')

const convertToJsObject = parseCsvLine => csvString => {
  const csvLines = csvString.split('\n')
  const csvHeaders = parseCsvLine(csvLines[0])
  const dataRows = csvLines.slice(1).map(parseCsvLine).filter(line => line.length)

  return dataRows.map(row => row.reduce((acc, it, index) => {
    acc[csvHeaders[index]] = it
    return acc
  }, {}))
}

const parseCsvLine = (delimiter) => {
  // original regex with hard-coded quote delimiter: /,(?=(?:[^"]*"[^"]*")*[^"]*$)/
  // have to escape the delimiter when building the string, incase the delimiter is a special regex char (e.g. "|")
  const fieldSeparationRegex = new RegExp(`,(?=(?:[^\\${delimiter}]*\\${delimiter}[^\\${delimiter}]*\\${delimiter})*[^\\${delimiter}]*$)`)
  const delimiterReplacementRegex = new RegExp(`\\${delimiter}`, 'g')

  return rawLine => rawLine.trim().split(fieldSeparationRegex)
      .map(field => field.trim().replace(delimiterReplacementRegex, ''))
}

const readFileContentAsString = (filename) => new Promise((resolve, reject) => {
  fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data.toString()))
})

module.exports = {
  fromFilePath: (csvPath, {delimiter = '"'} = {}) => readFileContentAsString(csvPath)
    .then(convertToJsObject(parseCsvLine(delimiter)))
}
