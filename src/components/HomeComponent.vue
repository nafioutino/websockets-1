<template>
  <div class="flex gap-5 flex-col  items-center justify-center h-screen">
      <h2 class="text-3xl font-bold underline text-clifford  ">Home Component</h2>
      <div class="flex justify-center items-center gap-5">
          <Camera
            color="blue"
            :size="50"
          />
          <UserPen
            color="purple"
            :size="50"
          />
      </div>
      <!-- <Icon :iconNode="burger" /> -->
  </div>

</template>

<script setup lang="ts">
import { Camera } from 'lucide-vue-next';
import { UserPen } from 'lucide-vue-next';
import { Icon } from 'lucide-vue-next';
// import { burger } from '@lucide/lab';



</script>

<style></style>
