var db = require("../config/connection");
var collections = require("../config/collections");
const bcrypt = require("bcrypt");
var objId = require("mongodb").ObjectId;

module.exports = {
  doLogin: (key) => {
    return new Promise((resolve, reject) => {
      let password =
        "$2b$10$/847nbCEGpL99STKAfXvuuL1UqCoxqQez3HnWpaRxCbtEGSTQKoRC";
      let response = false;
      bcrypt.compare(key, password).then((status) => {
        if (status) {
          response = true;
          resolve(response);
        } else {
          resolve(response);
        }
      });
    });
  },
  addProgram: (programs) => {
    return new Promise(async (resolve, reject) => {
      let program = await db
        .get()
        .collection(collections.PROGRAM_COLLECTION)
        .findOne();
      if (program) {
        let text = { text: programs.text };
        db.get()
          .collection(collections.PROGRAM_COLLECTION)
          .updateOne({ _id: objId(program._id) }, { $push: { program: text } })
          .then(() => {
            resolve({ success: true });
          });
      } else {
        let programDetails = {
          program: [{ text: programs.text }],
          date: programs.dd + "/" + programs.mm + "/" + programs.yyyy,
        };
        db.get()
          .collection(collections.PROGRAM_COLLECTION)
          .insertOne(programDetails)
          .then(() => {
            resolve({ success: true });
          });
      }
    });
  },
  getProgram: () => {
    return new Promise(async (resolve, reject) => {
      let program = await db
        .get()
        .collection(collections.PROGRAM_COLLECTION)
        .findOne();
      resolve(program);
    });
  },
  doneProgram: (text, id) => {
    return new Promise(async (resolve, reject) => {
      let program = await db
        .get()
        .collection(collections.PROGRAM_COLLECTION)
        .findOne({ _id: objId(id) });
      let done = await db
        .get()
        .collection(collections.DONE_COLLECTION)
        .findOne({ programId: objId(id) });
      if (done) {
        let textObj = { text: program.program[0].text };
        db.get()
          .collection(collections.DONE_COLLECTION)
          .updateOne({ programId: objId(id) }, { $push: { program: textObj } });
      } else {
        let programDetails = {
          programId: objId(id),
          program: [{ text: text }],
          date: program.date,
        };
        db.get()
          .collection(collections.DONE_COLLECTION)
          .insertOne(programDetails);
      }
      db.get()
        .collection(collections.PROGRAM_COLLECTION)
        .updateOne({ _id: objId(id) }, { $pull: { program: { text: text } } })
        .then(async () => {
          let programChecking = await db
            .get()
            .collection(collections.PROGRAM_COLLECTION)
            .findOne({ _id: objId(id) });
          if (programChecking.program.length == 0) {
            db.get()
              .collection(collections.PROGRAM_COLLECTION)
              .deleteOne({ _id: objId(id) });
          }
          resolve();
        });
    });
  },
  getDone: () => {
    return new Promise(async (resolve, reject) => {
      let done = await db
        .get()
        .collection(collections.DONE_COLLECTION)
        .find()
        .toArray();
      resolve(done);
    });
  },
  deleteAllDone: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.DONE_COLLECTION)
        .deleteMany()
        .then(() => {
          resolve();
        });
    });
  },
  deleteDoned: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.DONE_COLLECTION)
        .deleteOne({ _id: objId(id) })
        .then(() => {
          resolve();
        });
    });
  },
  dropProgram: (text, id) => {
    return new Promise(async (resolve, reject) => {
      let program = await db
        .get()
        .collection(collections.PROGRAM_COLLECTION)
        .findOne({ _id: objId(id) });
      let drop = await db
        .get()
        .collection(collections.DROP_COLLECTION)
        .findOne({ programId: objId(id) });
      if (drop) {
        let textObj = { text: program.program[0].text };
        db.get()
          .collection(collections.DROP_COLLECTION)
          .updateOne({ programId: objId(id) }, { $push: { program: textObj } });
      } else {
        let programDetails = {
          programId: objId(id),
          program: [{ text: text }],
          date: program.date,
        };
        db.get()
          .collection(collections.DROP_COLLECTION)
          .insertOne(programDetails);
      }
      db.get()
        .collection(collections.PROGRAM_COLLECTION)
        .updateOne({ _id: objId(id) }, { $pull: { program: { text: text } } })
        .then(async () => {
          let programChecking = await db
            .get()
            .collection(collections.PROGRAM_COLLECTION)
            .findOne({ _id: objId(id) });
          if (programChecking.program.length == 0) {
            db.get()
              .collection(collections.PROGRAM_COLLECTION)
              .deleteOne({ _id: objId(id) });
          }
          resolve();
        });
    });
  },
  getDrop: () => {
    return new Promise(async (resolve, reject) => {
      let drop = await db
        .get()
        .collection(collections.DROP_COLLECTION)
        .find()
        .toArray();
      resolve(drop);
    });
  },
  deleteAllDrop: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.DROP_COLLECTION)
        .deleteMany()
        .then(() => {
          resolve();
        });
    });
  },
  deleteDroped: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.DROP_COLLECTION)
        .deleteOne({ _id: objId(id) })
        .then(() => {
          resolve();
        });
    });
  },
};
