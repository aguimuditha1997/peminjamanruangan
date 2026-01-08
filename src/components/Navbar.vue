<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <span class="text-xl font-bold tracking-tight text-white">Room<span class="text-emerald-400">Sync</span></span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="/#rooms" class="text-slate-400 hover:text-emerald-400 transition-colors">Rooms</a>
        <a href="/#schedule" class="text-slate-400 hover:text-emerald-400 transition-colors">Schedule</a>
        <RouterLink to="/admin" class="text-slate-400 hover:text-emerald-400 transition-colors">Admin</RouterLink>
        <a href="/#book" class="btn-primary py-2 px-6">Book Now</a>
      </div>
      
      <!-- Mobile Menu Toggle -->
      <button class="md:hidden text-slate-300">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </nav>
</template>
