<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div class="p-6">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <i class="fas fa-bolt text-white text-xs"></i>
          </div>
          <span class="text-lg font-bold tracking-tight text-white">Admin<span class="text-emerald-400">Dash</span></span>
        </RouterLink>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <RouterLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-emerald-500/10 !text-emerald-400">
          <i class="fas fa-th-large w-5"></i>
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/rooms" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-emerald-500/10 !text-emerald-400">
          <i class="fas fa-door-open w-5"></i>
          Room Name
        </RouterLink>
        <RouterLink to="/admin/activity" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-emerald-500/10 !text-emerald-400">
          <i class="fas fa-calendar-alt w-5"></i>
          Activity Schedule
        </RouterLink>
        <RouterLink to="/admin/hr" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-emerald-500/10 !text-emerald-400">
          <i class="fas fa-user-tie w-5"></i>
          Admin HR
        </RouterLink>
        <RouterLink to="/admin/dpt" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-all font-medium" active-class="bg-emerald-500/10 !text-emerald-400">
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
          <h1 class="text-xl font-bold">Room <span class="text-emerald-400">Management</span></h1>
        </div>
        <div class="flex items-center gap-4">
          <button @click="openModal()" class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <i class="fas fa-plus"></i>
            Add Room
          </button>
        </div>
      </header>

      <div class="p-8 max-w-7xl mx-auto">
        <div class="glass-card border-white/5 overflow-hidden">
          <div class="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h2 class="font-bold flex items-center gap-2">
              <i class="fas fa-list text-emerald-400"></i>
              Available Rooms
            </h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                <input v-model="searchQuery" type="text" placeholder="Search rooms..." class="bg-slate-900 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500/50 w-48 transition-all" />
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                  <th class="px-6 py-4">Image</th>
                  <th class="px-6 py-4">Room Information</th>
                  <th class="px-6 py-4">Capacity</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr v-for="room in filteredRooms" :key="room.id" class="hover:bg-white/[0.02] transition-colors group">
                  <td class="px-6 py-5">
                    <div class="w-16 h-12 rounded-lg bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center text-slate-700">
                      <img v-if="room.images && room.images.length" :src="room.images[0]" class="w-full h-full object-cover" />
                      <i v-else class="fas fa-image text-lg"></i>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                      <span class="font-bold text-sm text-slate-200">{{ room.nameroom }}</span>
                      <span class="text-[10px] text-slate-500 line-clamp-1 truncate max-w-[300px]" :title="room.detail || room.details">{{ room.detail || room.details }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-users text-slate-500 text-xs"></i>
                      <span class="text-sm text-slate-300 font-medium">{{ room.capacity }} People</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button @click="openModal(room)" class="p-2 hover:bg-emerald-500/10 rounded-lg transition-all text-slate-400 hover:text-emerald-400" title="Edit">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="deleteRoom(room)" class="p-2 hover:bg-red-500/10 rounded-lg transition-all text-slate-400 hover:text-red-400" title="Delete">
                        <i class="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredRooms.length === 0">
                  <td colspan="4" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center gap-2 text-slate-500">
                      <i class="fas fa-folder-open text-3xl mb-2 opacity-20"></i>
                      <p class="font-medium text-sm">No rooms found</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div class="glass-card w-full max-w-lg border-white/5 animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col max-h-[90vh]">
          <div class="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 class="text-lg font-bold">{{ isEditing ? 'Edit Room' : 'Add New Room' }}</h3>
            <button @click="closeModal" class="text-slate-500 hover:text-white transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="saveRoom" class="p-6 space-y-4 overflow-y-auto custom-scrollbar">
            <!-- Room Name -->
            <div class="space-y-1.5">
              <input v-model="form.nameroom" type="text" required placeholder="Name Room (e.g. Executive Lounge)" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-slate-200" />
            </div>

            <!-- Capacity -->
            <div class="space-y-1.5">
              <input v-model.number="form.capacity" type="number" required placeholder="Capacity (e.g. 10)" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-slate-200" />
            </div>

            <!-- Details -->
            <div class="space-y-1.5">
              <textarea v-model="form.detail" rows="3" placeholder="Room Details (Describe features, amenities, etc.)" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-medium resize-none text-slate-200"></textarea>
            </div>

            <!-- Images -->
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-3">
                <div v-for="(img, index) in form.imagePreviews" :key="index" class="relative aspect-video rounded-lg overflow-hidden border border-white/5 group">
                  <img :src="img" class="w-full h-full object-cover" />
                  <button @click.prevent="removeImage(index)" class="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-trash text-[10px] text-white"></i>
                  </button>
                </div>
                <label class="aspect-video rounded-lg border-2 border-dashed border-white/5 hover:border-emerald-500/50 transition-all flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 group">
                  <i class="fas fa-plus text-slate-500 group-hover:text-emerald-400 mb-1"></i>
                  <span class="text-[10px] text-slate-500 group-hover:text-emerald-400 font-bold uppercase tracking-wider">Upload</span>
                  <input type="file" @change="handleFileUpload" multiple accept="image/*" class="hidden" />
                </label>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="pt-4 flex gap-3 sticky bottom-0 bg-slate-900/50 backdrop-blur-xl p-2 -mx-2 rounded-xl">
              <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all text-slate-300">
                Cancel
              </button>
              <button type="submit" class="flex-1 px-4 py-3 bg-emerald-500 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all text-white shadow-lg shadow-emerald-500/20">
                {{ isEditing ? 'Save Changes' : 'Create Room' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const rooms = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentRoomSlug = ref(null)

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

const fetchRooms = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/rooms')
    const data = response.data?.data || response.data
    rooms.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch rooms:', error)
    errorMessage.value = 'Failed to load rooms. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRooms)

const form = ref({
  nameroom: '',
  capacity: '',
  detail: '',
  images: [], // This will store File objects or preview URLs
  imagePreviews: [] // Specifically for UI previews
})

const filteredRooms = computed(() => {
  return rooms.value.filter(room => 
    (room.nameroom?.toLowerCase() || '').includes(searchQuery.value.toLowerCase()) ||
    (room.detail?.toLowerCase() || room.details?.toLowerCase() || '').includes(searchQuery.value.toLowerCase())
  )
})

const openModal = (room = null) => {
  if (room) {
    isEditing.value = true
    currentRoomSlug.value = room.slug || slugify(room.nameroom)
    form.value = {
      nameroom: room.nameroom,
      capacity: room.capacity,
      detail: room.detail || room.details,
      images: [], // New images to upload
      imagePreviews: room.images || [] // Existing images from API
    }
  } else {
    isEditing.value = false
    currentRoomSlug.value = null
    form.value = {
      nameroom: '',
      capacity: '',
      detail: '',
      images: [],
      imagePreviews: []
    }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files) return

  Array.from(files).forEach(file => {
    form.value.images.push(file) // Store the real file for FormData
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.imagePreviews.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.value.imagePreviews.splice(index, 1)
  // If it was a newly added file, remove it from images array too
  const roomObj = rooms.value.find(r => (r.slug || slugify(r.nameroom)) === currentRoomSlug.value)
  const previewCountBeforeNewOnes = isEditing.value ? roomObj?.images?.length || 0 : 0
  if (index >= previewCountBeforeNewOnes) {
    form.value.images.splice(index - previewCountBeforeNewOnes, 1)
  }
}

const saveRoom = async () => {
  isLoading.value = true
  try {
    const formData = new FormData()
    formData.append('nameroom', form.value.nameroom)
    formData.append('capacity', form.value.capacity)
    formData.append('detail', form.value.detail)
    
    // Add images
    form.value.images.forEach(image => {
      formData.append('images[]', image)
    })

    if (isEditing.value) {
      // Laravel requires POST with _method=PUT for file uploads in PUT requests
      await api.post(`/rooms/${currentRoomSlug.value}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Room updated successfully!')
    } else {
      await api.post('/rooms', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Room created successfully!')
    }
    
    closeModal()
    fetchRooms() // Refresh the list
  } catch (error) {
    console.error('Failed to save room:', error)
    alert(error.response?.data?.message || 'Failed to save room. Please check your input.')
  } finally {
    isLoading.value = false
  }
}

const deleteRoom = async (room) => {
  if (confirm(`Are you sure you want to delete ${room.nameroom}?`)) {
    isLoading.value = true
    try {
      const slug = room.slug || slugify(room.nameroom)
      await api.delete(`/rooms/${slug}`)
      alert('Room deleted successfully!')
      fetchRooms()
    } catch (error) {
      console.error('Failed to delete room:', error)
      alert('Failed to delete room.')
    } finally {
      isLoading.value = false
    }
  }
}

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
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

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

/* Modal animation */
.animate-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
