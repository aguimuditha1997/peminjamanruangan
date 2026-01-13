<script setup>
import heroBg from '../assets/hero-bg.png'
</script>

<template>
  <div class="relative min-h-[85vh] flex items-center pt-52 pb-20 px-6 overflow-hidden">
    <!-- Background Image with Multi-layer Overlay -->
    <div class="absolute inset-0 -z-20">
      <img :src="heroBg" alt="Hero Background" class="w-full h-full object-cover scale-105 animate-slow-zoom opacity-60">
      <!-- Dark Overlay for Readability -->
      <div class="absolute inset-0 bg-background/70 backdrop-blur-[1px]"></div>
      <!-- Gradient Fade to Bottom -->
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      <!-- Vignette Effect -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,32,56,0.5)_100%)]"></div>
    </div>

    <!-- Animated Glow Blobs (Updated colors) -->
    <div class="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full animate-pulse-slow"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[110px] rounded-full animate-pulse-slow-delay"></div>

    <div class="max-w-7xl mx-auto flex flex-col items-center text-center mt-24">
      
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white">
        Selamat Datang di <br />
        <span class="text-primary">
          Primakara Room Booking
        </span>
      </h1>
      
      <p class="max-w-2xl text-slate-300 text-lg md:text-xl mb-12 leading-relaxed drop-shadow-sm">
        Temukan dan pesan ruangan terbaik untuk rapat, belajar, atau kolaborasi kreatif Anda. 
        <span class="text-primary font-medium">Produktifitas dimulai dari sini.</span>
      </p>
      
      <div class="flex flex-col sm:flex-row gap-5">
        <a href="#rooms" class="btn-primary px-10 py-4 text-lg">
          Lihat Ruangan
        </a>
        <a href="#schedule" class="btn-secondary px-10 py-4 text-lg">
          Lihat Jadwal
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slow-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.animate-slow-zoom {
  animation: slow-zoom 20s ease-in-out infinite alternate;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-pulse-slow-delay {
  animation: pulse-slow 8s ease-in-out infinite;
  animation-delay: 2s;
}
</style>
