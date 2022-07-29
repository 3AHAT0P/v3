<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSystemMessageStore } from './store/SystemMessageStore';

const systemMessageStore = useSystemMessageStore();
</script>

<template>
  <div class="main">
    <div class="history">
      <template v-for="(systemMessage, index) in systemMessageStore.messages" :key="systemMessage.text">
        <span>{{ systemMessage.text }}</span>
      </template>
    </div>
    <div class="actions">
      <template v-for="(actions, index) in systemMessageStore.userActLayout" :key="index">
        <template v-for="action in actions" :key="action.id">
          <span class="action" @click="systemMessageStore.sendMessageToServer(action.id)">{{ action.text }}</span>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 16px;
}

.history {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  place-items: end center;
  place-content: end center;
  border-bottom: 1px solid hsl(0deg 0% 0% / 15%);
}

.actions {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-flow: column;
  grid-auto-rows: min-content;
  gap: 1em;
  place-items: center;
  place-content: start center;
}

.action {
  border: 1px solid hsl(20deg 100% 50% / 40%);
  border-radius: 1em;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background .4s linear 0s;
}

.action:hover {
  background: hsl(0deg 0% 0% / 10%);
}

</style>
