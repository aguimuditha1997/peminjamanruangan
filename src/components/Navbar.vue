<script setup>
import logo from '../assets/logo.png'
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <img :src="logo" alt="Primakara Logo" class="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
        <a href="/#schedule" class="text-slate-400 hover:text-primary transition-colors">Jadwal Tersedia</a>
        <a href="/#rooms" class="text-slate-400 hover:text-primary transition-colors">Ruangan</a>
        <!-- <RouterLink to="/admin" class="text-slate-400 hover:text-primary transition-colors">Admin</RouterLink> -->
        <a href="/#book" class="btn-primary py-2 px-6 text-xs font-bold">Reservasi</a>
      </div>
      
      <!-- Mobile Menu Toggle -->
      <button class="md:hidden text-slate-300">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </nav>
</template>
