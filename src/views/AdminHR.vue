<template>
  <div class="min-h-screen bg-background text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div class="p-6">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <img :src="logo" alt="Primakara Logo" class="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
        </RouterLink>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <RouterLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-primary/10 !text-primary">
          <i class="fas fa-th-large w-5"></i>
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/rooms" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-primary/10 !text-primary">
          <i class="fas fa-door-open w-5"></i>
          Room Name
        </RouterLink>
        <RouterLink to="/admin/activity" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-primary/10 !text-primary">
          <i class="fas fa-calendar-alt w-5"></i>
          Activity Schedule
        </RouterLink>
        <RouterLink to="/admin/hr" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-primary/10 !text-primary">
          <i class="fas fa-user-tie w-5"></i>
          Admin HR
        </RouterLink>
        <RouterLink to="/admin/dpt" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-primary/10 !text-primary">
          <i class="fas fa-users-cog w-5"></i>
          Admin DPT
        </RouterLink>
      </nav>

      <div class="p-6 border-t border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
            <i class="fas fa-user-shield text-emerald-400"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium">Administrator</span>
            <span class="text-[10px] text-slate-500 uppercase font-bold">HR Manager</span>
          </div>
        </div>
        <button @click="handleLogout" class="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-xs font-bold border border-white/5 uppercase tracking-wider">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-h-screen bg-background">
      <header class="h-20 border-b border-white/5 bg-[#032038]/40 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 w-full">
        <div>
          <h1 class="text-xl font-black uppercase italic tracking-tight">Admin<span class="text-primary not-italic">HR</span></h1>
        </div>
        <div class="flex items-center gap-4">
          <!-- Header actions can go here if needed -->
        </div>
      </header>

      <div class="p-8 max-w-7xl mx-auto">
        <div class="glass-card border-white/5 overflow-hidden">
          <div class="p-6 border-b border-white/5 space-y-6 bg-white/[0.01]">
            <div class="flex items-center justify-between">
              <h2 class="font-bold flex items-center gap-2 text-slate-100 uppercase tracking-tight">
                <i class="fas fa-clipboard-list text-primary"></i>
                Loan Requests (HR Dept)
              </h2>
            </div>

            <!-- Refined Filters -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Name</label>
                <div class="relative group">
                  <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs transition-colors group-focus-within:text-primary"></i>
                  <input 
                    v-model="filters.name" 
                    type="text" 
                    placeholder="Search user..." 
                    class="w-full bg-slate-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium" 
                  />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Booking Number</label>
                <div class="relative group">
                  <i class="fas fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs transition-colors group-focus-within:text-primary"></i>
                  <input 
                    v-model="filters.number" 
                    type="text" 
                    placeholder="LR-..." 
                    class="w-full bg-slate-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium" 
                  />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Date</label>
                <div class="relative group">
                  <input 
                    v-model="filters.date" 
                    type="date" 
                    class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium [color-scheme:dark]" 
                  />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">SDM Status</label>
                <div class="relative">
                  <select 
                    v-model="filters.status" 
                    class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="approve">Approve</option>
                    <option value="rejected">Rejected</option>
                    <option value="all">All Status</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] pointer-events-none"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                  <th class="px-6 py-4">Loan Code</th>
                  <th class="px-6 py-4">Name</th>
                  <th class="px-6 py-4">Organization</th>
                  <th class="px-6 py-4">Room</th>
                  <th class="px-6 py-4">Start Time</th>
                  <th class="px-6 py-4">End Time</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr v-if="isLoading && !requests.length">
                  <td colspan="8" class="px-6 py-12 text-center text-slate-500">
                    <i class="fas fa-circle-notch animate-spin mb-3 text-3xl text-primary block mx-auto"></i>
                    Loading requests...
                  </td>
                </tr>
                <tr v-else v-for="request in filteredRequests" :key="request.id" class="hover:bg-white/[0.02] transition-colors group text-sm">
                  <td class="px-6 py-5">
                    <span class="px-2 py-1 bg-slate-900 border border-white/10 rounded text-[10px] font-mono font-bold text-primary">
                      {{ request.code }}
                    </span>
                  </td>
                  <td class="px-6 py-5 font-bold text-slate-200">{{ request.name }}</td>
                  <td class="px-6 py-5 text-slate-400 uppercase text-[10px] font-bold tracking-tight">{{ request.organization }}</td>
                  <td class="px-6 py-5 text-slate-300">{{ request.room?.nameroom || 'Unassigned' }}</td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                       <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Start</span>
                       <span class="text-primary font-mono">{{ request.start_time }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                       <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">End</span>
                       <span class="text-primary font-mono">{{ request.end_time }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span :class="[
                      'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider',
                      (request.status_sdm || '').toLowerCase().startsWith('approve') ? 'bg-primary/10 text-primary' : 
                      (request.status_sdm || '').toLowerCase().startsWith('rejected') ? 'bg-red-500/10 text-red-400' : 
                      'bg-amber-500/10 text-amber-400'
                    ]">
                      {{ request.status_sdm || 'Pending' }}
                    </span>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <button 
                      @click="openManageModal(request)" 
                      class="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-bold hover:bg-slate-800 hover:text-primary transition-all text-slate-400 flex items-center ml-auto gap-2"
                    >
                      <i class="fas fa-sliders-h"></i>
                      Manage
                    </button>
                  </td>
                </tr>
                <tr v-if="!isLoading && filteredRequests.length === 0">
                  <td colspan="8" class="px-6 py-12 text-center text-slate-500">
                    <i class="fas fa-search mb-3 text-3xl opacity-20 block"></i>
                    No requests found matching your search.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Manage Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div class="glass-card w-full max-w-lg border-white/5 animate-in fade-in zoom-in duration-300">
          <div class="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 class="text-lg font-bold">Manage <span class="text-primary">Request</span></h3>
            <button @click="showModal = false" class="text-slate-500 hover:text-white transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="p-6 space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Room Allocation</label>
                   <select v-model="manageForm.room_id" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none text-slate-200">
                      <option value="">Unassigned</option>
                      <option v-for="r in rooms" :key="r.id" :value="r.id">{{ r.nameroom }}</option>
                   </select>
                </div>
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">SDM Status</label>
                   <select v-model="manageForm.status_sdm" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none text-slate-200">
                      <option value="pending">Pending</option>
                      <option value="approve">Approve</option>
                      <option value="rejected">Rejected</option>
                   </select>
                </div>
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Start Date & Time</label>
                   <input v-model="manageForm.start_time" type="datetime-local" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark]" />
                </div>
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">End Date & Time</label>
                   <input v-model="manageForm.end_time" type="datetime-local" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark]" />
                </div>
             </div>

             <div class="pt-4 flex gap-3">
                <button @click="showModal = false" class="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all text-slate-300">
                  Cancel
                </button>
              <button @click="saveChanges" class="flex-1 px-4 py-3 bg-primary rounded-xl text-sm font-bold hover:bg-primary/80 transition-all text-[#032038] shadow-lg shadow-primary/20">
                Update Request
              </button>
             </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import logo from '../assets/logo.png'
import { showAlert } from '../services/alertService'

const showModal = ref(false)
const filters = ref({ name: '', number: '', date: '', status: 'pending' })
const isLoading = ref(false)
const errorMessage = ref('')
const activeRequest = ref(null)
const manageForm = ref({ status_sdm: '', start_time: '', end_time: '', room_id: '' })

const rooms = ref([])
const requests = ref([])

const fetchHRData = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [roomsRes, bookingsRes] = await Promise.all([
      api.get('/rooms'),
      api.get('/bookings')
    ])
    
    rooms.value = roomsRes.data?.data || roomsRes.data || []
    requests.value = bookingsRes.data?.data || bookingsRes.data || []
  } catch (error) {
    console.error('Failed to fetch HR data:', error)
    errorMessage.value = 'Failed to load data from server.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHRData)

const filteredRequests = computed(() => {
  if (!Array.isArray(requests.value)) return []
  
  return requests.value
    .filter(req => {
      // Filter by status
      const matchesStatus = filters.value.status === 'all' || 
                           (req.status_sdm || 'pending').toLowerCase() === filters.value.status
      
      // Filter by Name
      const matchesName = !filters.value.name || 
                         (req.name || '').toLowerCase().includes(filters.value.name.toLowerCase())
      
      // Filter by Number (Code)
      const matchesNumber = !filters.value.number || 
                           (req.code || '').toLowerCase().includes(filters.value.number.toLowerCase())
      
      // Filter by Date (matches either creation date or start date)
      const matchesDate = !filters.value.date || 
                         (req.created_at || '').includes(filters.value.date) ||
                         (req.start_time || '').includes(filters.value.date)
      
      return matchesStatus && matchesName && matchesNumber && matchesDate
    })
    .sort((a, b) => {
      // Sort by creation date (oldest first)
      const dateA = new Date(a.created_at || a.id)
      const dateB = new Date(b.created_at || b.id)
      return dateA - dateB
    })
})

function openManageModal(request) {
  activeRequest.value = request
  // Handle various date/time formats from backend
  const start = request.start_time || ''
  const end = request.end_time || ''
  
  // Extract time HH:mm for the time input if it's a full ISO or space-separated string
  const getTime = (str) => {
    if (!str) return ''
    const parts = str.split(/[ T]/)
    return parts.length > 1 ? parts[1].substring(0, 5) : str.substring(0, 5)
  }

  manageForm.value = { 
    status_sdm: (request.status_sdm || 'Pending').toLowerCase(), 
    start_time: start.replace(' ', 'T').substring(0, 16), 
    end_time: end.replace(' ', 'T').substring(0, 16),
    room_id: request.room_id || ''
  }
  showModal.value = true
}

const saveChanges = async () => {
  if (!activeRequest.value) return
  
  isLoading.value = true
  try {
    const selectedRoom = rooms.value.find(r => String(r.id) === String(manageForm.value.room_id))
    const formattedStart = manageForm.value.start_time.replace('T', ' ') + ':00'
    const formattedEnd = manageForm.value.end_time.replace('T', ' ') + ':00'
    
    const payload = {
      ...manageForm.value,
      room_id: manageForm.value.room_id,
      nameroom_id: manageForm.value.room_id,
      status: manageForm.value.status_sdm,
      status_sdm: manageForm.value.status_sdm,
      start_date: formattedStart,
      end_date: formattedEnd,
      start_time: formattedStart,
      end_time: formattedEnd,
      nameroom: selectedRoom?.nameroom || selectedRoom?.name || '',
      room_name: selectedRoom?.nameroom || selectedRoom?.name || ''
    }

    // Using code instead of ID for the update endpoint as requested
    await api.put(`/bookings/${activeRequest.value.code}`, payload)
    
    showAlert({ title: 'Standardized!', message: 'Request updated successfully!', type: 'success' })
    showModal.value = false
    fetchHRData()
  } catch (error) {
    console.error('Failed to update request:', error)
    showAlert({ title: 'Error', message: error.response?.data?.message || 'Failed to update request.', type: 'error' })
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  localStorage.removeItem('isAdminAuthenticated')
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_role')
  window.location.reload()
}
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 28px;
}
.animate-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
