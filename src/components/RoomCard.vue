<template>
  <div class="glass-card overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
    <div class="relative h-64 overflow-hidden">
      <img :src="image" :alt="name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
      <div class="absolute bottom-4 left-4">
        <span class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
          {{ capacity }} Pax
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{{ name }}</h3>
      <p class="text-slate-400 text-sm mb-6 leading-relaxed">
        {{ description }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <div v-for="tag in tags" :key="tag" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400" :title="tag">
            <i :class="getIcon(tag)"></i>
          </div>
        </div>
        <button @click="$emit('select', name)" class="text-emerald-400 font-semibold flex items-center gap-1 group/btn hover:translate-x-1 transition-transform">
          Select Room
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  image: String,
  capacity: Number,
  description: String,
  tags: Array
})

const getIcon = (tag) => {
  const icons = {
    'Wifi': 'fas fa-wifi',
    'TV': 'fas fa-tv',
    'AC': 'fas fa-wind',
    'Projector': 'fas fa-video'
  }
  return icons[tag] || 'fas fa-check'
}
</script>
