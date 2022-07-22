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
        <br>
      </template>
    </div>
    <div class="actions">
      <template v-for="(actions, index) in systemMessageStore.userActLayout" :key="index">
        <template v-for="action in actions" :key="action.id">
          <span>{{ action.text }}</span>
        </template>
        <br>
      </template>
    </div>
  </div>

</template>

<style scoped>

</style>
