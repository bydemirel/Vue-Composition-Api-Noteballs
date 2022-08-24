<template>
  <div>
    <div class="notes">
      <AddEditNote
        ref="addEditNoteRef"
        placeholder="Add a new note"
      v-model="newNote">
        <template #buttons>
          <button
            :disabled="!newNote"
            @click="addNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </template>
      </AddEditNote>

      <progress 
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success" max="100"></progress>

    <template
    v-else
    >
        <Note

        v-bind:key="note.id"
        v-for="note in storeNotes.notes"
        :note="note"
      />
      <div v-if="!storeNotes.notes.length"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet...
      </div>
    </template>
    </div>
  </div>
</template>

<script setup>
/* imports*/

import { ref, watch } from "vue";
import { useStoreNotes } from "../stores/storeNotes";
import Note from "../components/Notes/Note.vue";
import AddEditNote  from "../components/Notes/AddEditNote.vue";
import { useWatchCharacters} from '../use/useWatchCharacters';

/* store */

const storeNotes = useStoreNotes();

/* notes*/
const newNote = ref("");
const addEditNoteRef = ref("");

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

/* watch characters */
useWatchCharacters(newNote,100)



</script>
