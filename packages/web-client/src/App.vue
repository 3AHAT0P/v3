<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSystemMessageStore } from './store/SystemMessageStore';

const systemMessageStore = useSystemMessageStore();
</script>

<template>
  <div class="main">
    <div class="history">
      <div class="message-list">
        <template v-for="(systemMessage, index) in systemMessageStore.messages" :key="systemMessage.text">
          <span
            :class="{ message: true, latest: systemMessageStore.messages.length === index + 1 }"
          >{{ systemMessage.text }}</span>
        </template>
      </div>
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
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 7fr 3fr;
  grid-template-areas:
    ". history ."
    ". actions .";
  padding: 32px;
  overflow: hidden;
  box-sizing: border-box;
}

.history {
  display: grid;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid hsl(0deg 0% 0% / 15%);
  grid-area: history;
  overflow: hidden;
  align-items: end;
}

.message-list {
  display: block;
  width: 100%;
  max-height: 100%;
  border-bottom: 1px solid hsl(0deg 0% 0% / 15%);
  overflow: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.message {
  white-space: pre-wrap;
  text-indent: 2em;
  border-top-style: dotted;
  border-top-width: 2px;
  border-color: hsl(128deg 100% 23% / 40%);
  display: inline-block;
  width: 100%;
  animation: 2s appearing;
  scroll-snap-stop: always;
}

.message.latest {
  animation: 2s scrollTo, 2s appearing;
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
  grid-area: actions;
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

@keyframes appearing {
  from {
    background: hsl(57deg 100% 43% / 20%);
  }

  to {
    background: hsl(57deg 100% 43% / 0%);
  }
}

@keyframes scrollTo {
  from {
    scroll-snap-align: center;
  }

  to {
    scroll-snap-align: none;
  }
}
</style>
