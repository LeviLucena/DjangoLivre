<template>
  <div class="notes">
    <BrList data-toggle density="large">
      <BrItem class="notes-title">
        <template #content-header>
          <h3 class="category-title mt-0 mb-3">{{ notesLabel }}</h3>
        </template>
        <BrList>
          <BrItem v-for="(note, index) in notes" :key="index">
            <p>{{ note.question }}</p>
            <p class="mb-0" :class="{ 'mb-3': index === notes.length - 1 }">{{ note.answer }}</p>
          </BrItem>
        </BrList>
      </BrItem>
    </BrList>
  </div>
</template>

<script>
import store from "./store/index"

import BrItem from "../Item/Item.ce.vue"
import BrList from "../List/List.ce.vue"

const CookiebarNotes = {
  name: "BrCookiebarNotes",
  components: {
    BrItem,
    BrList,
  },
  computed: {
    notes() {
      return store.getters.notes
    },
    notesLabel() {
      return store.getters.labels?.notes
    },
  },
}

export default CookiebarNotes
</script>

<style></style>
