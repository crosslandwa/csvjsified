# csvjsified

I've been working with Kibana quite a lot recently, and it's ability to export search results to CSV is useful for further analysis in my tool of choice (node right now).

I've extracted this common functionality (parse CSV) as I found myself re-writing it every time I need to do some CSV analysis. I couldn't find an existing 'simple enough' library (in `npm`) to do the job...

## Example usage

Once you've `npm install`ed *csvjsified*, then simply

```js
const { fromFilePath } = require('csvjsified')

fromFilePath('/path/to/file.csv')
  .then(console.log, console.error)

/**
  For a CSV file with content like:

  'header1','header2','header3'
  'a1','b1','c1'
  'a2','b2','c2'

  fromFilePath returns an array that prints:

  [ { header1: 'a1', header2: 'b1', header3: 'c1' },
  { header1: 'a2', header2: 'b2', header3: 'c2' } ]
**/
```
