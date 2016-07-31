require('babel-core/register')

const SearchProvider = require('./search.provider')
const moment = require('moment')

const sp = new SearchProvider()

sp.instance.then((db) => {
  db.serialize(() => {
    sp.addNote({
      id: '1',
      title: 'sample title',
      content: 'sample content',
      cursorPosition: 0,
      dateCreated: moment().format('X'),
      dateModified: moment().format('X')
    })

    sp.addNote({
      id: '2',
      title: 'test title',
      content: 'test content',
      cursorPosition: 0,
      dateCreated: moment().format('X'),
      dateModified: moment().format('X')
    })
    sp.search('test').then((results) => {
      console.log(`results: ${JSON.stringify(results)}`)
    }).catch((err) => {
      console.log(`failed: ${err}`)
    })
    console.log('search done')
  })
})
