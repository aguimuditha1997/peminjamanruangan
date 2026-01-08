<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">R</span>
        </div>
        <span class="text-xl font-bold tracking-tight">Room<span class="text-emerald-500">Book</span></span>
      </div>
      
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#" class="hover:text-emerald-400 transition-colors">Rooms</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">Amenities</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">About</a>
        <button class="btn-primary py-2 text-sm">Book Now</button>
      </div>
      
      <button class="md:hidden text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </nav>
</template>
