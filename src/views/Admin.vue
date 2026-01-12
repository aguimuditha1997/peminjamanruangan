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
      <!-- Header -->
      <header class="h-20 border-b border-white/5 bg-slate-900/20 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-10 w-full">
        <div>
          <h1 class="text-xl font-bold">Management <span class="text-emerald-400">Dashboard</span></h1>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="text" placeholder="Global search..." class="bg-slate-900/50 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 w-64 transition-all" />
          </div>
          <button class="w-10 h-10 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center hover:bg-slate-800 transition-colors">
            <i class="fas fa-bell text-slate-400"></i>
          </button>
        </div>
      </header>

      <div class="p-8 space-y-8 max-w-7xl mx-auto">
        <!-- Stats Summary -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass-card p-8 border-white/5 bg-gradient-to-br from-emerald-500/10 to-transparent relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <i class="fas fa-door-open text-emerald-400 text-xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Rooms</p>
                <h3 class="text-3xl font-bold text-slate-100">{{ rooms.length }}</h3>
              </div>
            </div>
            <div class="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 w-[80%]"></div>
            </div>
            <p class="text-xs text-slate-400 mt-3 flex items-center gap-1">
              <i class="fas fa-arrow-up text-emerald-400"></i>
              <span class="text-emerald-400 font-bold">+2</span> added this month
            </p>
          </div>

          <div class="glass-card p-8 border-white/5 bg-gradient-to-br from-blue-500/10 to-transparent relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <i class="fas fa-calendar-check text-blue-400 text-xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Bookings</p>
                <h3 class="text-3xl font-bold text-slate-100">{{ rentals.length }}</h3>
              </div>
            </div>
            <div class="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 w-[65%]"></div>
            </div>
            <p class="text-xs text-slate-400 mt-3 flex items-center gap-1">
              <i class="fas fa-arrow-up text-blue-400"></i>
              <span class="text-blue-400 font-bold">+15%</span> from last week
            </p>
          </div>
        </div>

        <!-- Booking Table Section -->
        <div class="glass-card border-white/5 min-h-[400px] overflow-hidden">
          <div class="p-6 border-b border-white/5 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <i class="fas fa-list-ul text-emerald-400"></i>
                Booking Data
              </h2>
              <div class="flex gap-2">
                <button class="px-4 py-2 bg-slate-900/50 border border-white/5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                  <i class="fas fa-download mr-2"></i> Export
                </button>
              </div>
            </div>

            <!-- Table Filters -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Name</label>
                <input v-model="filters.name" type="text" placeholder="Search user..." class="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Rental Number</label>
                <input v-model="filters.rentalNumber" type="text" placeholder="BK-000..." class="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Room</label>
                <div class="relative">
                  <select v-model="filters.room" class="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
                    <option value="">All Rooms</option>
                    <option v-for="room in roomTemplates" :key="room.name" :value="room.name">{{ room.name }}</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] pointer-events-none"></i>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Date</label>
                <input v-model="filters.date" type="date" class="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]" />
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                  <th class="px-6 py-4">Name</th>
                  <th class="px-6 py-4">Rental Number</th>
                  <th class="px-6 py-4 text-xs">Room</th>
                  <th class="px-6 py-4 text-xs">Room Details</th>
                  <th class="px-6 py-4 text-xs">Date</th>
                  <th class="px-6 py-4 text-xs text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr v-for="rental in filteredRentals" :key="rental.id" class="hover:bg-white/[0.02] transition-colors group">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-bold text-emerald-400 border border-emerald-500/10">
                        {{ rental.user.split(' ').map(n => n[0]).join('') }}
                      </div>
                      <div class="flex flex-col">
                        <span class="font-bold text-sm text-slate-200">{{ rental.user }}</span>
                        <span class="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{{ rental.org }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-xs font-mono text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10 tracking-wider">
                      {{ rental.code }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-sm text-slate-300 font-medium">{{ rental.room }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-[10px] text-slate-500 line-clamp-1 truncate max-w-[200px]" :title="rental.roomDetail">
                      {{ rental.roomDetail }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                      <span class="text-xs text-slate-300">{{ rental.date }}</span>
                      <span class="text-[10px] text-slate-500">{{ rental.time }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        @click="openManageModal(rental)" 
                        class="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20 transition-all flex items-center gap-1.5"
                      >
                        <i class="fas fa-sliders-h"></i>
                        Manage
                      </button>
                      <RouterLink to="/admin/rooms" class="text-[10px] font-bold text-slate-400 hover:text-slate-300 uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-all">
                        Room Details
                      </RouterLink>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredRentals.length === 0">
                  <td colspan="4" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center gap-2 text-slate-500">
                      <i class="fas fa-search text-3xl mb-2 opacity-20"></i>
                      <p class="font-medium text-sm">No results match your filters</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Room Details Table Section (Merged) -->
        <div class="glass-card border-white/5 overflow-hidden">
          <div class="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <h2 class="font-bold flex items-center gap-2">
              <i class="fas fa-door-open text-emerald-400"></i>
              Room Details Table
            </h2>
            <button @click="openModal()" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <i class="fas fa-plus text-[10px]"></i>
              Add New Room
            </button>
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
                <tr v-for="room in rooms" :key="room.id" class="hover:bg-white/[0.02] transition-colors group">
                  <td class="px-6 py-5">
                    <div class="w-16 h-12 rounded-lg bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center text-slate-700">
                      <img v-if="room.images && room.images.length" :src="room.images[0]" class="w-full h-full object-cover" />
                      <i v-else class="fas fa-image text-lg"></i>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                      <span class="font-bold text-sm text-slate-200">{{ room.nameroom }}</span>
                      <span class="text-[10px] text-slate-500 line-clamp-1 truncate max-w-[300px]" :title="room.detail || room.details || room.description">{{ room.detail || room.details || room.description || 'No description available' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-medium text-slate-300">
                    {{ room.capacity }} People
                  </td>
                  <td class="px-6 py-5 text-right">
                    <div class="flex items-center justify-end gap-2 text-slate-400">
                      <button @click="openModal(room)" class="p-2 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all rounded-lg">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="deleteRoom(room)" class="p-2 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-lg">
                        <i class="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Room Management Modal (Merged) -->
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
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Room Name</label>
              <input v-model="form.nameroom" type="text" required placeholder="Name Room" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-slate-200" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Capacity</label>
              <input v-model.number="form.capacity" type="number" required placeholder="Capacity" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-slate-200" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Details</label>
              <textarea v-model="form.detail" rows="3" placeholder="Describe room features..." class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-slate-200 resize-none"></textarea>
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Room Images</label>
              <div class="grid grid-cols-3 gap-3">
                <div v-for="(img, index) in form.imagePreviews" :key="index" class="relative aspect-video rounded-lg overflow-hidden border border-white/5 group">
                  <img :src="img" class="w-full h-full object-cover" />
                  <button @click.prevent="removeImage(index)" class="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-trash text-[10px] text-white"></i>
                  </button>
                </div>
                <label v-if="form.imagePreviews.length < 5" class="aspect-video rounded-lg border-2 border-dashed border-white/5 hover:border-emerald-500/50 transition-all flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 group">
                  <i class="fas fa-plus text-slate-500 group-hover:text-emerald-400 mb-1"></i>
                  <span class="text-[10px] text-slate-500 group-hover:text-emerald-400 font-bold uppercase tracking-wider">Upload</span>
                  <input type="file" @change="handleFileUpload" multiple accept="image/*" class="hidden" />
                </label>
              </div>
            </div>
            <div class="pt-4 flex gap-3">
              <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold hover:bg-slate-800 text-slate-300">Cancel</button>
              <button type="submit" class="flex-1 px-4 py-3 bg-emerald-500 rounded-xl text-sm font-bold hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                {{ isEditing ? 'Save Changes' : 'Create Room' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Manage Booking Modal -->
    <Teleport to="body">
      <div v-if="isManageModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div class="glass-card w-full max-w-lg border-white/5 animate-in fade-in zoom-in duration-300">
          <div class="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 class="text-lg font-bold">Manage <span class="text-emerald-400">Booking</span></h3>
            <button @click="isManageModalOpen = false" class="text-slate-500 hover:text-white transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="p-6 space-y-6">
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Room Allocation</label>
                   <div class="relative">
                     <select v-model="manageForm.room_id" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 appearance-none text-slate-200 cursor-pointer">
                        <option value="">Unassigned</option>
                        <option v-for="r in rooms" :key="r.id" :value="r.id">{{ r.nameroom }}</option>
                     </select>
                     <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] pointer-events-none"></i>
                   </div>
                </div>
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Global Status</label>
                   <div class="relative">
                     <select v-model="manageForm.status" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 appearance-none text-slate-200 cursor-pointer">
                        <option value="pending">Pending</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                     </select>
                     <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] pointer-events-none"></i>
                   </div>
                </div>
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Start Date & Time</label>
                   <input v-model="manageForm.start_time" type="datetime-local" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]" />
                </div>
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">End Date & Time</label>
                   <input v-model="manageForm.end_time" type="datetime-local" class="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]" />
                </div>
             </div>

             <div class="pt-4 flex gap-3">
                <button @click="isManageModalOpen = false" class="flex-1 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all text-slate-300">
                  Cancel
                </button>
                <button @click="saveBookingChanges" :disabled="isLoading" class="flex-1 px-4 py-3 bg-emerald-500 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all text-white shadow-lg shadow-emerald-500/20 disabled:opacity-50">
                  {{ isLoading ? 'Updating...' : 'Update Request' }}
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

const rooms = ref([])
const rentals = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')

// Room Management State
const isModalOpen = ref(false)
const isManageModalOpen = ref(false)
const isEditing = ref(false)
const currentRoomSlug = ref(null) // Using slug instead of ID for routing
const form = ref({
  nameroom: '',
  capacity: '',
  detail: '',
  images: [],
  imagePreviews: []
})

const manageForm = ref({
  status: '',
  start_time: '',
  end_time: '',
  room_id: ''
})
const activeBooking = ref(null)

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
}

const fetchDashboardData = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [roomsRes, bookingsRes] = await Promise.all([
      api.get('/rooms'),
      api.get('/bookings')
    ])
    
    rooms.value = roomsRes.data?.data || roomsRes.data || []
    rentals.value = bookingsRes.data?.data || bookingsRes.data || []
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    errorMessage.value = 'Failed to load dashboard data.'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchDashboardData)

const filters = ref({
  name: '',
  rentalNumber: '',
  room: '',
  date: ''
})

const roomTemplates = computed(() => rooms.value.map(r => ({ name: r.nameroom || r.name })))

const filteredRentals = computed(() => {
  if (!Array.isArray(rentals.value)) return []
  
  return rentals.value
    .filter(rental => {
      if (!rental) return false
      const nameMatch = (rental.name || '').toLowerCase().includes(filters.value.name.toLowerCase())
      const rentalNumberMatch = (rental.code || rental.loan_code || '').toLowerCase().includes(filters.value.rentalNumber.toLowerCase())
      const roomMatch = !filters.value.room || (rental.room?.nameroom || rental.room_name || '').toLowerCase().includes(filters.value.room.toLowerCase())
      
      const bDate = rental.start_time || rental.start_date || ''
      const dateMatch = !filters.value.date || bDate.startsWith(filters.value.date)
      
      return nameMatch && rentalNumberMatch && roomMatch && dateMatch
    })
    .map(rental => {
      // Format time for display
      const startStr = rental.start_time || rental.start_date || ''
      const timeStr = startStr.includes(' ') ? startStr.split(' ')[1] : startStr.includes('T') ? startStr.split('T')[1] : ''
      
      return {
        ...rental,
        user: rental.name || 'N/A',
        org: rental.organization || 'N/A',
        room: rental.room?.nameroom || rental.room_name || 'N/A',
        roomDetail: rental.room?.detail || rental.room?.details || 'N/A',
        date: startStr.split(' ')[0] || startStr.split('T')[0] || 'N/A',
        time: timeStr || 'N/A',
        code: rental.code || rental.loan_code || 'N/A'
      }
    })
})

const handleLogout = () => {
  localStorage.removeItem('isAdminAuthenticated')
  window.location.reload()
}

// Room Management Methods
const openModal = (room = null) => {
  if (room) {
    isEditing.value = true
    currentRoomSlug.value = room.slug || slugify(room.nameroom)
    form.value = {
      nameroom: room.nameroom,
      capacity: room.capacity,
      detail: room.detail || room.details || room.description || '',
      images: [],
      imagePreviews: room.images || []
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
    form.value.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.imagePreviews.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.value.imagePreviews.splice(index, 1)
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
    form.value.images.forEach(image => {
      formData.append('images[]', image)
    })

    if (isEditing.value) {
      // Laravel requires POST with _method=PUT for file uploads in PUT requests.
      // We use currentRoomSlug instead of ID.
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
    fetchDashboardData()
  } catch (error) {
    console.error('Failed to save room:', error)
    alert(error.response?.data?.message || 'Failed to save room.')
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
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to delete room:', error)
      alert('Failed to delete room.')
    } finally {
      isLoading.value = false
    }
  }
}

// Booking Management Methods
const openManageModal = (booking) => {
  activeBooking.value = booking
  // Map fields to match the form structure
  const start = booking.start_time || booking.start_date || ''
  const end = booking.end_time || booking.end_date || ''
  
  manageForm.value = {
    status: (booking.status || 'Pending').toLowerCase(),
    start_time: start.replace(' ', 'T').substring(0, 16), // datetime-local format
    end_time: end.replace(' ', 'T').substring(0, 16),
    room_id: booking.room_id || ''
  }
  isManageModalOpen.value = true
}

const saveBookingChanges = async () => {
  if (!activeBooking.value) return
  
  isLoading.value = true
  try {
    const selectedRoom = rooms.value.find(r => String(r.id) === String(manageForm.value.room_id))
    const formattedStart = manageForm.value.start_time.replace('T', ' ') + ':00'
    const formattedEnd = manageForm.value.end_time.replace('T', ' ') + ':00'

    const payload = {
      ...manageForm.value,
      room_id: manageForm.value.room_id,
      nameroom_id: manageForm.value.room_id,
      start_date: formattedStart,
      end_date: formattedEnd,
      start_time: formattedStart,
      end_time: formattedEnd,
      nameroom: selectedRoom?.nameroom || selectedRoom?.name || '',
      room_name: selectedRoom?.nameroom || selectedRoom?.name || ''
    }

    await api.put(`/bookings/${activeBooking.value.code}`, payload)
    
    alert('Booking updated successfully!')
    isManageModalOpen.value = false
    fetchDashboardData()
  } catch (error) {
    console.error('Failed to update booking:', error)
    alert(error.response?.data?.message || 'Failed to update booking.')
  } finally {
    isLoading.value = false
  }
}
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
