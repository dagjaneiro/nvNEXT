const fs = require('fs')
const data = fs.readFileSync('reuters-000.json')
const entries = JSON.parse(data)

const Sqlite3 = require('sqlite3')
const sqlite3 = Sqlite3.verbose()

const db = new sqlite3.Database('./notes.sqlite3', (err) => {
  if (err) return
  entries.forEach((e) => {
    db.run(`INSERT INTO notes (id, title, content) VALUES (
      $id,
      $title,
      $body
    );`, {
      $id: e.id,
      $title: e.title,
      $body: e.body
    })
  })
})
