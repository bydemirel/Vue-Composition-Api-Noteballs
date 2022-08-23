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

      <Note
        v-bind:key="note.id"
        v-for="note in storeNotes.notes"
        :note="note"
      />
    </div>
  </div>
</template>

<script setup>
/* imports*/

import { ref } from "@vue/reactivity";
import { useStoreNotes } from "../stores/storeNotes";
import Note from "../components/Notes/Note.vue";
import AddEditNote  from "../components/Notes/AddEditNote.vue";

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
</script>
