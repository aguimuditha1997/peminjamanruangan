<template>
  <section id="schedule" class="py-24 px-6 bg-background">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-black mb-4 uppercase italic">
          Jadwal <span class="text-primary not-italic">Tersedia</span>
          <span v-if="selectedRoom" class="block text-xl text-slate-400 mt-2 font-medium italic">Viewing: {{ selectedRoom }}</span>
        </h2>
        <p class="text-slate-400 font-medium">Temukan waktu yang tepat untuk reservasi ruangan.</p>
      </div>

      <div class="glass-card p-4 md:p-8 border-white/5 relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
        
        <FullCalendar :options="calendarOptions" />
      </div>

      <!-- Legend -->
      <div class="mt-8 flex flex-wrap gap-6 justify-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-primary/20 border border-primary/30"></div>
          <span>Available</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-primary border border-primary text-[#032038] flex items-center justify-center">
            <i class="fas fa-lock text-[8px]"></i>
          </div>
          <span>Reserved</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { showAlert } from '../services/alertService'

const props = defineProps({
  selectedRoom: String,
  events: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select-time'])

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  slotMinTime: '00:00:00',
  slotMaxTime: '24:00:00',
  allDaySlot: false,
  height: 'auto',
  selectable: true,
  selectMirror: true,
  nowIndicator: true,
  editable: false,
  droppable: false,
  events: props.events,
  select: (info) => {
    emit('select-time', { 
      startStr: info.startStr.substring(0, 16),
      endStr: info.endStr.substring(0, 16)
    })
  },
  eventClick: (info) => {
    const { name, organization } = info.event.extendedProps
    const start = info.event.start.toLocaleString()
    const end = info.event.end ? info.event.end.toLocaleString() : 'N/A'
    
    showAlert({
      title: 'Booking Details',
      type: 'details',
      details: {
        'Nama Lengkap': name || 'N/A',
        'Organisasi': organization || 'N/A',
        'Ruangan': info.event.title,
        'Waktu Mulai': start,
        'Waktu Selesai': end,
      }
    })
  }
}))
</script>

<style>
/* FullCalendar Theming Override */
:root {
  --fc-border-color: rgba(255, 255, 255, 0.05);
  --fc-daygrid-event-dot-width: 8px;
  --fc-today-bg-color: rgba(29, 202, 211, 0.05);
  --fc-page-bg-color: transparent;
}

.fc {
  @apply text-slate-200 font-sans;
  --fc-button-bg-color: rgba(255, 255, 255, 0.05);
  --fc-button-border-color: rgba(255, 255, 255, 0.1);
  --fc-button-hover-bg-color: rgba(255, 255, 255, 0.1);
  --fc-button-active-bg-color: #1dcad3;
  --fc-button-active-border-color: #1dcad3;
  --fc-event-bg-color: #1dcad3;
  --fc-event-border-color: #1dcad3;
  --fc-event-text-color: #032038;
  --fc-list-event-dot-color: #1dcad3;
  --fc-now-indicator-color: #1dcad3;
}

.fc .fc-toolbar-title {
  @apply text-xl font-black text-white uppercase italic tracking-tight;
}

.fc .fc-button {
  @apply rounded-lg px-4 py-2 text-[10px] font-black uppercase italic transition-all duration-300;
}

.fc .fc-button-primary:not(:disabled).fc-button-active {
  @apply text-[#032038];
}

.fc .fc-col-header-cell {
  @apply py-4 bg-[#032038]/50 text-[10px] font-black text-slate-400 uppercase tracking-widest;
}

.fc .fc-timegrid-slot {
  @apply h-12 text-[9px] text-slate-500 font-black uppercase;
}

.fc .fc-timegrid-now-indicator-line {
  @apply border-primary;
}

.fc .fc-highlight {
  @apply bg-primary/10;
}

.fc-v-event {
  @apply border-0 rounded-lg shadow-lg py-1 px-2;
}

.fc-event-title {
  @apply text-[10px] font-bold truncate text-[#032038];
}

.fc-event-time {
  @apply text-[9px] font-medium text-[#032038]/80;
}
</style>
