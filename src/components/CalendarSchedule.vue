<template>
  <section id="schedule" class="py-24 px-6 bg-slate-950">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          Availability <span class="text-emerald-400">Schedule</span>
          <span v-if="selectedRoom" class="block text-xl text-slate-400 mt-2 font-medium italic">Viewing: {{ selectedRoom }}</span>
        </h2>
        <p class="text-slate-400">Powered by FullCalendar. Click a time slot to start your booking.</p>
      </div>

      <div class="glass-card p-4 md:p-8 border-white/5 relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
        
        <FullCalendar :options="calendarOptions" />
      </div>

      <!-- Legend -->
      <div class="mt-8 flex flex-wrap gap-6 justify-center text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30"></div>
          <span>Available</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-indigo-500 border border-indigo-400 text-white"></div>
          <span>Reserved</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

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
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
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
    
    alert(
      `Booking Details:\n` +
      `------------------\n` +
      `User: ${name || 'N/A'}\n` +
      `Org: ${organization || 'N/A'}\n` +
      `Room: ${info.event.title}\n` +
      `Start: ${start}\n` +
      `End: ${end}\n` +
      `Status: Reserved`
    )
  }
}))
</script>

<style>
@reference "../style.css";

/* FullCalendar Theming Override */
:root {
  --fc-border-color: rgba(255, 255, 255, 0.05);
  --fc-daygrid-event-dot-width: 8px;
  --fc-today-bg-color: rgba(16, 185, 129, 0.05);
  --fc-page-bg-color: transparent;
}

.fc {
  @apply text-slate-200 font-serif;
  --fc-button-bg-color: rgba(255, 255, 255, 0.05);
  --fc-button-border-color: rgba(255, 255, 255, 0.1);
  --fc-button-hover-bg-color: rgba(255, 255, 255, 0.1);
  --fc-button-active-bg-color: #10b981;
  --fc-button-active-border-color: #10b981;
}

.fc .fc-toolbar-title {
  @apply text-xl font-bold text-slate-100;
}

.fc .fc-button {
  @apply rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all duration-300;
}

.fc .fc-col-header-cell {
  @apply py-4 bg-slate-900/50 text-xs font-bold text-slate-400 uppercase tracking-widest;
}

.fc .fc-timegrid-slot {
  @apply h-12 text-[10px] text-slate-500 font-bold;
}

.fc .fc-timegrid-now-indicator-line {
  @apply border-emerald-500;
}

.fc .fc-highlight {
  @apply bg-emerald-500/10;
}

.fc-v-event {
  @apply border-0 rounded-lg shadow-lg py-1 px-2;
}

.fc-event-title {
  @apply text-[10px] font-bold truncate;
}
</style>
