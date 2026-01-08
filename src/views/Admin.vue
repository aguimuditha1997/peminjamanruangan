<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <!-- Navbar -->
    <nav class="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <RouterLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <i class="fas fa-bolt text-white"></i>
            </div>
            <span class="text-xl font-bold tracking-tight text-white">Admin<span class="text-emerald-400">Dash</span></span>
          </RouterLink>
        </div>
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Back to Site</RouterLink>
          <div class="h-8 w-[1px] bg-white/10"></div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              <i class="fas fa-user-shield text-xs text-emerald-400"></i>
            </div>
            <span class="text-sm font-medium">Administrator</span>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-bold mb-2">Management <span class="text-emerald-400">Dashboard</span></h1>
        <p class="text-slate-400">Monitor room status and manage incoming reservations.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Room Status List -->
        <div class="lg:col-span-1 space-y-6">
          <div class="glass-card p-6 border-white/5 h-full">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <i class="fas fa-door-open text-emerald-400"></i>
                Rooms ({{ rooms.length }})
              </h2>
              <span class="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded">Online</span>
            </div>
            
            <div class="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar text-slate-300">
              <div v-for="room in rooms" :key="room.id" 
                class="p-4 bg-slate-900/50 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-bold text-sm group-hover:text-emerald-400 transition-colors">{{ room.name }}</h3>
                    <p class="text-xs text-slate-500">Capacity: {{ room.capacity }} pax</p>
                  </div>
                  <div :class="[
                    'w-2 h-2 rounded-full',
                    room.id % 5 === 0 ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                  ]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rental/Booking List -->
        <div class="lg:col-span-2 space-y-6">
          <div class="glass-card p-6 border-white/5 min-h-[400px]">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold flex items-center gap-2 text-slate-100">
                <i class="fas fa-calendar-check text-emerald-400"></i>
                Recent Reservations
              </h2>
              <button class="text-xs text-emerald-400 hover:underline">View All</button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th class="pb-4">User / Organization</th>
                    <th class="pb-4">Room</th>
                    <th class="pb-4">Time Period</th>
                    <th class="pb-4">Status</th>
                    <th class="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="rental in rentals" :key="rental.id" class="group">
                    <td class="py-4">
                      <div class="flex flex-col">
                        <span class="font-bold text-sm text-slate-200">{{ rental.user }}</span>
                        <span class="text-xs text-slate-500">{{ rental.org }}</span>
                      </div>
                    </td>
                    <td class="py-4">
                      <span class="text-sm text-slate-300">{{ rental.room }}</span>
                    </td>
                    <td class="py-4">
                      <div class="flex flex-col">
                        <span class="text-xs text-slate-300">{{ rental.date }}</span>
                        <span class="text-[10px] text-slate-500">{{ rental.time }}</span>
                      </div>
                    </td>
                    <td class="py-4">
                      <span :class="[
                        'px-2 py-1 rounded text-[10px] font-bold uppercase',
                        rental.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      ]">
                        {{ rental.status }}
                      </span>
                    </td>
                    <td class="py-4 text-right">
                      <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors group">
                        <i class="fas fa-ellipsis-v text-slate-500 group-hover:text-white"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Stats Summary -->
          <div class="grid grid-cols-3 gap-6">
            <div class="glass-card p-6 border-white/5 bg-slate-900/50">
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bookings Today</p>
              <p class="text-2xl font-bold text-slate-100">12</p>
            </div>
            <div class="glass-card p-6 border-white/5 bg-slate-900/50">
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Occupancy Rate</p>
              <p class="text-2xl font-bold text-emerald-400">84%</p>
            </div>
            <div class="glass-card p-6 border-white/5 bg-slate-900/50">
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
              <p class="text-2xl font-bold text-emerald-400">Rp 4.5M</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const roomTemplates = [
  { name: 'Executive Lounge', capacity: 12 },
  { name: 'Creative Studio', capacity: 8 },
  { name: 'Zen Pod', capacity: 2 },
  { name: 'Grand Boardroom', capacity: 25 }
]

const rooms = Array.from({ length: 35 }, (_, i) => {
  const template = roomTemplates[i % roomTemplates.length]
  return {
    id: i + 1,
    name: `${template.name} ${Math.floor(i / 4) + 1}`,
    capacity: template.capacity
  }
})

const rentals = ref([
  { id: 1, user: 'Budi Santoso', org: 'Tech Innovators', room: 'Creative Studio 1', date: 'Jan 8, 2026', time: '10:00 - 12:00', status: 'Confirmed' },
  { id: 2, user: 'Siti Aminah', org: 'Creative Collective', room: 'Zen Pod 2', date: 'Jan 8, 2026', time: '14:30 - 16:00', status: 'Confirmed' },
  { id: 3, user: 'Andi Wijaya', org: 'Global Logistics', room: 'Grand Boardroom 1', date: 'Jan 9, 2026', time: '09:00 - 17:00', status: 'Pending' },
  { id: 4, user: 'Rina Putri', org: 'Design Hub', room: 'Executive Lounge 1', date: 'Jan 9, 2026', time: '11:00 - 13:00', status: 'Confirmed' },
  { id: 5, user: 'Eko Prasetyo', org: 'Morning Star', room: 'Creative Studio 2', date: 'Jan 10, 2026', time: '10:00 - 11:00', status: 'Pending' }
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.3);
}
</style>
