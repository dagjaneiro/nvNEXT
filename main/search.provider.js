import Sqlite3 from 'sqlite3'
const sqlite3 = Sqlite3.verbose()

export default class SearchProvider {
  constructor (options = {}, batchOptions = {}) {
    this.instance = new Promise((resolve, reject) => {
      const db = new sqlite3.Database(':memory:', (err) => {
        if (err) return reject(err)
        this.initSchema(db, resolve, reject)
      })
    })
  }

  initSchema (db, onDone, onError) {
    db.serialize(() => {
      this.createNotesTable(db)
      this.createFTSTable(db)
      this.createFTSTriggers(db, onDone, onError)
    })
  }

  createNotesTable (db) {
    db.run(`CREATE TABLE IF NOT EXISTS notes
      (
        id TEXT PRIMARY KEY,
        title TEXT,
        content TEXT,
        cursorPosition INTEGER,
        dateCreated INTEGER,
        dateModified INTEGER
      );`)
  }

  createFTSTable (db) {
    db.run('CREATE VIRTUAL TABLE IF NOT EXISTS searchIndex USING fts4(content="notes")')
  }

  createFTSTriggers (db, onDone, onError) {
    db.run(`CREATE TRIGGER IF NOT EXISTS searchIndex_bu BEFORE UPDATE ON notes
    BEGIN
      DELETE FROM searchIndex WHERE docid=old.rowid;
    END;`)
    db.run(`CREATE TRIGGER IF NOT EXISTS searchIndex_bd BEFORE DELETE ON notes
    BEGIN
      DELETE FROM searchIndex WHERE docid=old.rowid;
    END;`)

    db.run(`CREATE TRIGGER IF NOT EXISTS searchIndex_au AFTER UPDATE ON notes
    BEGIN
      INSERT INTO searchIndex(docid, title, content) VALUES(new.rowid, new.title, new.content);
    END;`)

    db.run(`CREATE TRIGGER IF NOT EXISTS searchIndex_ai AFTER INSERT ON notes
    BEGIN
      INSERT INTO searchIndex(docid, title, content) VALUES(new.rowid, new.title, new.content);
    END;`, (err) => {
      if (err) return onError(err)
      onDone(db)
    })
  }

  addNote (note) {
    const updateParams = {
      $id: note.id,
      $title: note.title,
      $content: note.content,
      $cursorPosition: note.cursorPosition,
      $dateModified: note.dateModified
    }

    const insertParams = Object.assign({}, updateParams, {
      $dateCreated: note.dateCreated
    })

    this.updateNoteWithParams(updateParams)
    this.insertNoteWithParams(insertParams)
  }

  updateNoteWithParams (params) {
    this.instance.then((db) => {
      db.run(`UPDATE notes
        SET title = $title,
        content = $content,
        cursorPosition = $cursorPosition,
        dateModified = $dateModified
        WHERE id = $id;`, params)
    })
  }

  insertNoteWithParams (params) {
    this.instance.then((db) => {
      db.run(`INSERT OR IGNORE INTO notes (id, title, content, cursorPosition, dateCreated, dateModified)
        VALUES (
          $id,
          $title,
          $content,
          $cursorPosition,
          $dateCreated,
          $dateModified
        );`, params)
    })
  }

  removeNote (noteId) {
    this.instance.then((db) => {
      db.run('DELETE FROM notes WHERE id = $id', {
        $id: noteId
      })
    })
  }

  getNote (noteId) {
    return new Promise((resolve, reject) => {
      this.instance.then((db) => {
        db.all('SELECT * FROM notes WHERE id = $id', {
          $id: noteId
        }, (err, rows) => {
          if (err) return reject(err)
          if (rows.length > 1) {
            console.log(`Oops! found more than 1 row for this ID: ${noteId}`)
          } else {
            resolve(rows[0])
          }
        })
      })
    })
  }

  search (searchText) {
    const ftsCondition = searchText.split(' ').map((word) => word.trim()).join('* ') + '*'

    return new Promise((resolve, reject) => {
      this.instance.then((db) => {
        db.all(`SELECT * FROM searchIndex WHERE searchIndex MATCH "${ftsCondition}"`, (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
      })
    })
  }

  getAllNotes () {
    return new Promise((resolve, reject) => {
      this.instance.then((db) => {
        db.all('SELECT * FROM notes', (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
      })
    })
  }
}
