import Sqlite3 from 'sqlite3'
import shortid from 'shortid'
import moment from 'moment'
const sqlite3 = Sqlite3.verbose()

function getCurrentDate () {
  return moment().format('X')
}

function generateId () {
  return shortid.generate()
}

export default class SearchProvider {
  constructor (options = {}, batchOptions = {}) {
    this.instance = new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./notes.sqlite3', (err) => {
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
        plainText TEXT,
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
      INSERT INTO searchIndex(docid, title, plainText) VALUES(new.rowid, new.title, new.plainText);
    END;`)

    db.run(`CREATE TRIGGER IF NOT EXISTS searchIndex_ai AFTER INSERT ON notes
    BEGIN
      INSERT INTO searchIndex(docid, title, plainText) VALUES(new.rowid, new.title, new.plainText);
    END;`, (err) => {
      if (err) return onError(err)
      onDone(db)
    })
  }

  createNote (title) {
    const createdDate = getCurrentDate()
    const createParams = {
      $id: generateId(),
      $title: title,
      $plainText: '',
      $content: '',
      $cursorPosition: 0,
      $dateCreated: createdDate,
      $dateModified: createdDate
    }
    return new Promise((resolve, reject) => {
      this.insertNoteWithParams(createParams, resolve, reject)
    })
  }

  updateNote (id, plainText, content) {
    const updateParams = {
      $id: id,
      $plainText: plainText,
      $content: content,
      $cursorPosition: 0,
      $dateModified: getCurrentDate()
    }

    return new Promise((resolve, reject) => {
      this.updateNoteWithParams(updateParams, resolve, reject)
    })
  }

  updateNoteWithParams (params, resolve, reject) {
    this.instance.then((db) => {
      db.run(`UPDATE notes
        SET plainText = $plainText,
        content = $content,
        cursorPosition = $cursorPosition,
        dateModified = $dateModified
        WHERE id = $id;`, params, (err) => {
          if (err) {
            reject()
          } else {
            resolve(params.$id)
          }
        })
    })
  }

  insertNoteWithParams (params, resolve, reject) {
    this.instance.then((db) => {
      db.run(`INSERT OR IGNORE INTO notes (id, title, plainText, content, cursorPosition, dateCreated, dateModified)
        VALUES (
          $id,
          $title,
          $plainText,
          $content,
          $cursorPosition,
          $dateCreated,
          $dateModified
        );`, params, (err) => {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
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
        db.all(`SELECT * FROM searchIndex WHERE searchIndex MATCH "${ftsCondition}" LIMIT 100`, (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
      })
    })
  }

  getAllNotes () {
    return new Promise((resolve, reject) => {
      this.instance.then((db) => {
        db.all('SELECT * FROM notes LIMIT 100', (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
      })
    })
  }
}
