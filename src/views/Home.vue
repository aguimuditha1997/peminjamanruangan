<template>
  <div class="min-h-screen">
    <Navbar />
    <main>
      <Hero />
      
      <CalendarSchedule 
        :selectedRoom="selectedRoom"
        @select-time="handleTimeSelection" 
      />

      <!-- Rooms Section -->
      <section id="rooms" class="py-24 px-6 bg-slate-900/30">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div class="max-w-xl">
              <h2 class="text-3xl md:text-5xl font-bold mb-4">Our Premium <span class="text-emerald-400">Spaces</span></h2>
              <p class="text-slate-400">Choose from our curated selection of high-performance environments designed for productivity.</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoomCard 
              v-for="room in visibleRooms" 
              :key="room.id"
              v-bind="room"
              @select="scrollToBooking"
            />
          </div>

          <!-- See More Button -->
          <div v-if="rooms.length > 4" class="mt-16 flex justify-center">
            <button 
              @click="showAllRooms = !showAllRooms" 
              class="px-8 py-4 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 group"
            >
              {{ showAllRooms ? 'Show Less' : 'See More Rooms' }}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transition-transform duration-300" 
                :class="showAllRooms ? 'rotate-180' : 'group-hover:translate-y-1'"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      <BookingForm 
        :rooms="roomNames"
        :selectedRoom="selectedRoom" 
        :selectedStart="selectedStart"
        :selectedEnd="selectedEnd"
      />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import RoomCard from '../components/RoomCard.vue'
import BookingForm from '../components/BookingForm.vue'
import CalendarSchedule from '../components/CalendarSchedule.vue'
import Footer from '../components/Footer.vue'

const selectedRoom = ref('')
const selectedStart = ref('')
const selectedEnd = ref('')
const showAllRooms = ref(false)

// Base room templates to rotate
const roomTemplates = [
  { name: 'Executive Lounge', capacity: 12, tags: ['Wifi', 'TV', 'AC'], img: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
  { name: 'Creative Studio', capacity: 8, tags: ['Wifi', 'Projector', 'AC'], img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2' },
  { name: 'Zen Pod', capacity: 2, tags: ['Wifi', 'AC'], img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4' },
  { name: 'Grand Boardroom', capacity: 25, tags: ['Wifi', 'TV', 'Projector', 'AC'], img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407' }
]

// Generate 35 rooms
const rooms = Array.from({ length: 35 }, (_, i) => {
  const template = roomTemplates[i % roomTemplates.length]
  return {
    id: i + 1,
    name: `${template.name} ${Math.floor(i / 4) + 1}`,
    image: `${template.img}?auto=format&fit=crop&q=80&w=800`,
    capacity: template.capacity,
    description: `A premium performance environment designed for productivity and collaboration. (Room ${i + 1})`,
    tags: template.tags
  }
})

const visibleRooms = computed(() => {
  return showAllRooms.value ? rooms : rooms.slice(0, 4)
})

const roomNames = computed(() => rooms.map(r => r.name))

const scrollToBooking = (roomName) => {
  selectedRoom.value = roomName
  const element = document.getElementById('schedule')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleTimeSelection = ({ startStr, endStr }) => {
  selectedStart.value = startStr
  selectedEnd.value = endStr
  const element = document.getElementById('book')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
