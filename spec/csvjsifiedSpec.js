const fs = require('fs')
const { fromFilePath } = require('../csvjsified.js')

function writeCsvFile(filename, headers, data) {
  return new Promise((resolve, reject) => {
    const content = [headers].concat(data).join('\n')

    fs.writeFile(filename, content, err => err ? reject(err) : resolve(filename))
  })
}

describe('csvjsified, given a path to a csv file', () => {
  it('parses CSV headers and uses them as keys in the parsed data', done => {
    const assertCsvHeadersUsedForParsedDataKeys = parsedData => expect(Object.keys(parsedData[0])).toEqual(['a', 'b', 'c'])

    writeCsvFile('/tmp/temp.csv', 'a, b, c', ['1,2,3'])
      .then(fromFilePath)
      .then(assertCsvHeadersUsedForParsedDataKeys)
      .then(done, done.fail)
  })
  
  it('parses every row of data', done => {
    const assertParsedDataHas3Rows = parsedData => expect(parsedData.length).toEqual(3)
    writeCsvFile('/tmp/temp.csv', 'a, b, c', ['1,2,3', '2,2,3', '3,2,3'])
      .then(fromFilePath)
      .then(assertParsedDataHas3Rows)
      .then(done, done.fail)
  })
})
