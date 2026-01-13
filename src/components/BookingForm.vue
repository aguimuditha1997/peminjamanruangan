<template>
  <section id="book" class="py-24 px-6 relative bg-background">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-black mb-4 uppercase italic">Reservasi <span class="text-primary not-italic">Ruangan</span></h2>
        <p class="text-slate-400 font-medium">Isi formulir di bawah ini untuk memesan tempat Anda. Kami akan menghubungi Anda melalui Email untuk konfirmasi.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="glass-card p-8 md:p-12 space-y-8 relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <!-- Person's Name -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Made Adi" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- Organization -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Instansi</label>
            <input 
              v-model="form.organization" 
              type="text" 
              placeholder="Staff Primakara" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- Email Address -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="contact@collective.com" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- WhatsApp Number -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">No WhatsApp</label>
            <input 
              v-model="form.no_whatsapp" 
              type="tel" 
              placeholder="0 812 3456 7890" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- Room Selection -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ruangan yang dipilih</label>
            <select v-model="form.room" class="input-field font-bold bg-[#032038]" required>
              <option value="" disabled>Pilih Ruangan</option>
              <option v-for="r in rooms" :key="r.id" :value="r.name">{{ r.name }}</option>
            </select>
          </div>

          <!-- Start Date & Time -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal & Waktu Mulai</label>
            <input 
              v-model="form.start" 
              type="datetime-local" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- End Date & Time -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal & Waktu Selesai</label>
            <input 
              v-model="form.end" 
              type="datetime-local" 
              class="input-field font-bold"
              required
            />
          </div>

          <!-- Note -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Catatan</label>
            <input 
              v-model="form.note" 
              type="text" 
              placeholder="Memerlukan meja tambahan" 
              class="input-field font-bold"
            />
          </div>
          
          <!-- Purpose of Reservation -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tujuan Peminjaman</label>
            <textarea 
              v-model="form.purpose" 
              rows="4" 
              placeholder="Deskripsikan acara atau acara..." 
              class="input-field font-bold"
              required
            ></textarea>
          </div>
        </div>

        <div class="flex items-center justify-end pt-4 relative z-10">
          <button type="submit" :disabled="isSubmitting" class="btn-primary w-full md:w-auto min-w-[240px] flex items-center justify-center gap-2 py-4">
            <span v-if="isSubmitting">Processing...</span>
            <template v-else>
              Konfirmasi Peminjaman
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </template>
          </button>
        </div>
      </form>
    </div>

    <!-- Success Modal (Simplified) -->
    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[100] flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div class="glass-card p-10 max-w-md w-full text-center relative z-10 border-primary/30">
          <div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2">Booking Success!</h3>
          <p class="text-slate-400 mb-8 font-medium">Thank you, {{ form.name }}. We've received your request. We'll contact you for confirmation shortly.</p>
          <button @click="resetForm" class="btn-primary w-full py-4">Great, thanks!</button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import api from '../services/api'
import { showAlert } from '../services/alertService'

const props = defineProps({
  rooms: {
    type: Array,
    required: true
  },
  selectedRoom: String,
  selectedStart: String,
  selectedEnd: String
})

const form = reactive({
  name: '',
  organization: '',
  email: '',
  no_whatsapp: '',
  room: props.selectedRoom || '',
  start: '',
  end: '',
  note: '',
  purpose: ''
})

// Update form when props change
watch(() => props.selectedRoom, (newVal) => {
  if (newVal) form.room = newVal
})

watch(() => props.selectedStart, (newStart) => {
  if (newStart) form.start = newStart
})

watch(() => props.selectedEnd, (newEnd) => {
  if (newEnd) form.end = newEnd
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    const selectedRoomObj = props.rooms.find(r => r.name === form.room)
    
    const payload = {
      name: form.name,
      organization: form.organization,
      email: form.email,
      no_whatsapp: form.no_whatsapp,
      room_id: selectedRoomObj?.id,
      room_name: form.room,
      start_date: form.start.replace('T', ' '),
      end_date: form.end.replace('T', ' '),
      start_time: form.start.replace('T', ' '),
      end_time: form.end.replace('T', ' '),
      note: form.note,
      purpose: form.purpose,     
    }

    const response = await api.post('/bookings', payload)
    
    if (response.status === 201 || response.status === 200 || response.data.success) {
      showSuccess.value = true
    } else {
      throw new Error('Unexpected response from server')
    }
  } catch (error) {
    console.error('Booking submission failed:', error)
    const errorMessage = error.response?.data?.message || 'Failed to submit booking. Please check your connection.'
    showAlert({ title: 'Submission Error', message: errorMessage, type: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  showSuccess.value = false
  form.name = ''
  form.organization = ''
  form.email = ''
  form.no_whatsapp = ''
  form.room = ''
  form.start = ''
  form.end = ''
  form.note = ''
  form.purpose = ''
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
