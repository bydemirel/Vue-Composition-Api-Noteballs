import { defineStore } from "pinia";
import { db } from "../js/firebase";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import {useStoreAuth} from "./storeAuth";


let notesCollectionRef 
let notesCollectionQuery 
let getNotesSnapshot = null

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()

       notesCollectionRef = collection(db, "users", storeAuth.user.id,"notes");
       notesCollectionQuery = query(
        notesCollectionRef,
        orderBy("date", "desc")
      );
      this.getNotes();
    },
    async getNotes() {
      /* Changes updated on refresh */
      /*const querySnapshot = await getDocs(collection(db,'notes'))
    querySnapshot.forEach((doc)=>{
      let note = {
        id:doc.id, 
        content:doc.data().content,
      }

      this.notes.push(note)
    })*/

      /* Changes updated instantly */

      this.notesLoaded = false;

       getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {   
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };

          notes.push(note);
        });
        setTimeout(() => {
          this.notes = notes;
          this.notesLoaded = true;
        }, 500);
      });

    },
    clearNotes(){
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      /*let note = {
        id: id,
        content: newNoteContent,
      };*/

      // this.notes.unshift(note) // add the top of the array

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: date,
      });
    },
    async deleteNote(idToDelete) {
      /*this.notes = this.notes.filter((note) => 
             note.id !== idToDelete
          );*/
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      /*let index = this.notes.findIndex(note=> 
         note.id === id
      );*/

      //this.notes[index].content  = content;

      await updateDoc(doc(notesCollectionRef, id), {
        content: content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });

      return count;
    },
  },
});
