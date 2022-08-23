<template>
  <div class="edit-note">
    <AddEditNote
        ref="addEditNoteRef"
        bgColor="link"
        placeholder="Edit note"
        label="Edit Note"
        v-model="noteContent">

        <template #buttons>
          <button
          @click="handleSaveClicked()"
            class="button is-link has-background-link"
            :disabled="!noteContent"
          >
            Save Note
          </button>

          <button
          @click="$router.back()"
            class="button is-link is-light mr-2"
          >
            Cancel
          </button>
        </template>
      </AddEditNote>

  </div>
</template>


<script setup>
/* imports*/
import { ref } from "@vue/reactivity";
import { useRoute,useRouter } from "vue-router";
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useStoreNotes } from "../stores/storeNotes";

/* router */
const route = useRoute()
const router = useRouter()

/* store */
const storeNotes = useStoreNotes();

/* note */
const noteContent  = ref("");

noteContent.value  = storeNotes.getNoteContent(route.params.id);

/* save clicked */
const handleSaveClicked = () =>{
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}

</script>