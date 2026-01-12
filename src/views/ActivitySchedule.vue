<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div class="p-6">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <i class="fas fa-bolt text-white text-xs"></i>
          </div>
          <span class="text-lg font-bold tracking-tight text-white">Admin<span class="text-indigo-400">Dash</span></span>
        </RouterLink>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <RouterLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-indigo-500/10 !text-indigo-400">
          <i class="fas fa-th-large w-5"></i>
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/rooms" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-indigo-500/10 !text-indigo-400">
          <i class="fas fa-door-open w-5"></i>
          Room Name
        </RouterLink>
        <RouterLink to="/admin/activity" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-indigo-500/10 !text-indigo-400">
          <i class="fas fa-calendar-alt w-5"></i>
          Activity Schedule
        </RouterLink>
        <RouterLink to="/admin/hr" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-indigo-500/10 !text-indigo-400">
          <i class="fas fa-user-tie w-5"></i>
          Admin HR
        </RouterLink>
        <RouterLink to="/admin/dpt" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-indigo-500/10 !text-indigo-400">
          <i class="fas fa-users-cog w-5"></i>
          Admin DPT
        </RouterLink>
      </nav>

      <div class="p-6 border-t border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
            <i class="fas fa-user-shield text-indigo-400"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium">Administrator</span>
            <span class="text-[10px] text-slate-500 uppercase font-bold">Main Admin</span>
          </div>
        </div>
        <button @click="handleLogout" class="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-xs font-bold border border-white/5 uppercase tracking-wider">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-h-screen bg-slate-950">
      <header class="h-20 border-b border-white/5 bg-slate-900/20 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-10 w-full">
        <div>
          <h1 class="text-xl font-bold">Activity <span class="text-indigo-400">Schedule</span></h1>
        </div>
        <div class="flex items-center gap-4">
           <div class="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Current Month:</span>
            <span class="text-xs font-bold text-indigo-400">{{ currentMonth }}</span>
          </div>
        </div>
      </header>

      <div class="p-8 max-w-7xl mx-auto">
        <div class="glass-card border-white/5 overflow-hidden p-6 md:p-8">
           <FullCalendar :options="calendarOptions" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const bookings = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/bookings')
    const data = response.data?.content || response.data?.data || response.data
    bookings.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch schedule data:', error)
  }
})

const currentMonth = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
})

const approvedEvents = computed(() => {
  const isOk = (val) => String(val || '').toLowerCase().startsWith('approv');
  
  return bookings.value
    .filter(b => b && isOk(b.status_sdm) && isOk(b.status_dpt))
    .map(b => ({
      title: `${b.name || 'User'} (${b.organization || 'Org'}) - ${b.room?.nameroom || b.room_name || 'Room'}`,
      start: b.start_time || b.start_date || b.start,
      end: b.end_time || b.end_date || b.end,
      extendedProps: {
        name: b.name,
        organization: b.organization,
        room: b.room?.nameroom || b.room_name,
        code: b.code || b.loan_code
      },
      color: (b.room?.nameroom || b.room_name || '').includes('HR') ? '#10b981' : '#3b82f6'
    }))
})

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  height: '700px',
  events: approvedEvents.value,
  eventClick: (info) => {
    const { name, organization, room, code } = info.event.extendedProps
    const start = info.event.start.toLocaleString()
    const end = info.event.end ? info.event.end.toLocaleString() : 'N/A'
    
    alert(
      `Booking Details:\n` +
      `------------------\n` +
      `User: ${name || 'N/A'}\n` +
      `Org: ${organization || 'N/A'}\n` +
      `Room: ${room || 'N/A'}\n` +
      `Code: ${code || 'N/A'}\n` +
      `Start: ${start}\n` +
      `End: ${end}`
    )
  }
}))

const handleLogout = () => {
  localStorage.removeItem('isAdminAuthenticated')
  window.location.reload()
}
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 28px;
}

:deep(.fc) {
  --fc-border-color: rgba(255, 255, 255, 0.05);
  --fc-button-bg-color: rgba(255, 255, 255, 0.05);
  --fc-button-border-color: rgba(255, 255, 255, 0.1);
  --fc-button-hover-bg-color: rgba(255, 255, 255, 0.1);
  --fc-button-active-bg-color: #6366f1;
  --fc-button-active-border-color: #6366f1;
  --fc-today-bg-color: rgba(99, 102, 241, 0.05);
  color: #e2e8f0;
}

:deep(.fc .fc-toolbar-title) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
}

:deep(.fc .fc-button) {
  border-radius: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
}

:deep(.fc .fc-col-header-cell) {
  background: rgba(15, 23, 42, 0.5);
  padding: 1rem 0;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}
</style>
