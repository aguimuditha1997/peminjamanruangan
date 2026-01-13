<template>
  <div class="app-container">
    <RouterView />
    <ModernAlert />
  </div>
</template>

<script setup>
import ModernAlert from './components/ModernAlert.vue'
// Root component now handled by Router
</script>

<style>
/* Global styles in style.css */
</style>
