<template>
  <div class="min-h-screen">
    <Navbar />
    <main>
      <Hero />
      

      <CalendarSchedule 
        :selectedRoom="selectedRoom"
        :events="approvedEvents"
        @select-time="handleTimeSelection" 
      />

      <!-- Rooms Section -->
      <section id="rooms" class="py-24 px-6 bg-slate-900/30">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black mb-4 uppercase italic">
              Ruangan <span class="text-primary not-italic">Tersedia</span>
            </h2>
            <p class="text-slate-400 font-medium">Temukan ruangan yang sesuai dengan kebutuhan Anda.</p>
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
              class="px-8 py-4 border border-primary/30 hover:bg-primary/10 text-primary font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 group"
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
        :rooms="visibleRooms"
        :selectedRoom="selectedRoom" 
        :selectedStart="selectedStart"
        :selectedEnd="selectedEnd"
      />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
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

const rooms = ref([])
const bookings = ref([])
const fetchError = ref(null)

onMounted(async () => {
  try {
    const [roomsRes, bookingsRes] = await Promise.all([
      api.get('/rooms'),
      api.get('/bookings')
    ])
    
    // Safety check for rooms
    const roomsData = roomsRes.data?.content || roomsRes.data?.data || roomsRes.data
    rooms.value = Array.isArray(roomsData) ? roomsData : []

    // Safety check for bookings
    const bookingsData = bookingsRes.data?.content || bookingsRes.data?.data || bookingsRes.data
    bookings.value = Array.isArray(bookingsData) ? bookingsData : []
    
    console.log('API Rooms:', rooms.value);
    console.log('API Bookings:', bookings.value);

    if (rooms.value.length === 0 && bookings.value.length === 0) {
       console.warn('Fetched data is empty. Backend might be empty or structure is different.')
    }
  } catch (error) {
    console.error('Failed to fetch home data:', error)
    fetchError.value = 'Could not connect to the backend server. Please make sure the Laravel app is running at http://127.0.0.1:8000'
  }
})

const visibleRooms = computed(() => {
  const sourceRooms = showAllRooms.value ? rooms.value : rooms.value.slice(0, 4)
  
  return sourceRooms.map(r => ({
    id: r.id,
    name: r.nameroom || r.name,
    image: (r.images && r.images.length > 0) ? r.images[0] : (r.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c'),
    capacity: r.capacity || 0,
    detail: r.detail || r.details || r.description || 'No description available.',
    tags: r.tags || ['Wifi', 'AC'] // Fallback tags
  }))
})

const approvedEvents = computed(() => {
  if (!Array.isArray(bookings.value)) return []
  
  const filtered = bookings.value.filter(b => {
    if (!b) return false;

    // Helper to check for approval (matches 'approve', 'Approved', 'APPROVE', etc.)
    const isOk = (val) => {
      const s = String(val || '').toLowerCase();
      return s.startsWith('approv');
    };

    // 1. Double Approval Filter
    const isApproved = isOk(b.status_sdm) && isOk(b.status_dpt);
    
    if (!isApproved) return false
    
    // 2. Room Filter (Optional focus)
    if (selectedRoom.value) {
      const roomName = b.room_name || b.room?.nameroom || b.room?.name || ''
      return roomName === selectedRoom.value
    }
    
    return true
  })

  return filtered.map(b => {
    // Robust date parsing (Database uses start_time/end_time)
    const startDate = b.start_time || b.start_date || b.start || (b.date && b.startTime ? `${b.date}T${b.startTime}` : null) || (b.loan_date && b.start_time ? `${b.loan_date}T${b.start_time}` : null)
    const endDate = b.end_time || b.end_date || b.end || (b.date && b.endTime ? `${b.date}T${b.endTime}` : null) || (b.loan_date && b.end_time ? `${b.loan_date}T${b.end_time}` : null)

    return {
      title: b.room_name || b.room?.nameroom || b.room?.name || 'Reserved',
      start: startDate,
      end: endDate,
      extendedProps: { ...b },
      color: '#1dcad3'
    }
  }).filter(e => e.start && e.end)
})

const roomNames = computed(() => rooms.value.map(r => r.nameroom || r.name))


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
