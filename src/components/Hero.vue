<template>
  <div class="relative pt-32 pb-20 px-6 overflow-hidden">
    <!-- Gradient Blobs -->
    <div class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full"></div>

    <div class="max-w-7xl mx-auto flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Premium Spaces Available
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
        Reserve Your Perfect <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Collaboration Space</span>
      </h1>
      
      <p class="max-w-2xl text-slate-400 text-lg md:text-xl mb-12">
        Professional room booking made simple for your organization. High-speed internet, premium amenities, and seamless coordination.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4">
        <button class="btn-primary">Explore Rooms</button>
        <button class="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-xl transition-all">View Schedule</button>
      </div>
    </div>
  </div>
</template>
