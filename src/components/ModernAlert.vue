<template>
  <Transition name="fade">
    <div v-if="alertState.isOpen" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm" @click.self="closeAlert">
      <Transition name="scale">
        <div v-if="alertState.isOpen" class="glass-card w-full max-w-md overflow-hidden relative border border-white/5 shadow-2xl">
          <!-- Animated Background Glow -->
          <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20" :class="typeColorClass"></div>
          
          <div class="p-8 relative">
            <!-- Header Icon -->
            <div class="flex justify-center mb-6">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg" :class="iconContainerClass">
                <i :class="iconClass"></i>
              </div>
            </div>

            <!-- Content -->
            <div class="text-center space-y-2 mb-8">
              <h3 class="text-xl font-black uppercase italic tracking-tight text-white">
                {{ alertState.title || defaultTitle }}
              </h3>
              <p v-if="alertState.message" class="text-slate-400 text-sm leading-relaxed">
                {{ alertState.message }}
              </p>
            </div>

            <!-- Structured Details (Special for Activity Schedule) -->
            <div v-if="alertState.details" class="bg-slate-900/50 rounded-2xl border border-white/5 p-5 mb-8 space-y-3">
              <div v-for="(value, key) in alertState.details" :key="key" class="flex items-center justify-between text-xs">
                <span class="text-slate-500 font-bold uppercase tracking-widest">{{ key }}</span>
                <span class="text-slate-200 font-mono">{{ value }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <button 
              @click="closeAlert" 
              class="w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg"
              :class="buttonClass"
            >
              Tutup
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { alertState, closeAlert } from '../services/alertService'

const defaultTitle = computed(() => {
  switch (alertState.type) {
    case 'success': return 'Success'
    case 'error': return 'Execution Error'
    case 'warning': return 'Attention Required'
    case 'details': return 'Booking Details'
    default: return 'Notification'
  }
})

const typeColorClass = computed(() => {
  switch (alertState.type) {
    case 'success': return 'bg-primary'
    case 'error': return 'bg-red-500'
    case 'warning': return 'bg-amber-500'
    case 'details': return 'bg-primary'
    default: return 'bg-primary'
  }
})

const iconContainerClass = computed(() => {
  switch (alertState.type) {
    case 'success': return 'bg-primary/20 text-primary border border-primary/20'
    case 'error': return 'bg-red-500/20 text-red-500 border border-red-500/20'
    case 'warning': return 'bg-amber-500/20 text-amber-500 border border-amber-500/20'
    case 'details': return 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(29,202,211,0.2)]'
    default: return 'bg-primary/20 text-primary border border-primary/20'
  }
})

const iconClass = computed(() => {
  switch (alertState.type) {
    case 'success': return 'fas fa-check-circle'
    case 'error': return 'fas fa-exclamation-triangle'
    case 'warning': return 'fas fa-exclamation-circle'
    case 'details': return 'fas fa-calendar-check'
    default: return 'fas fa-info-circle'
  }
})

const buttonClass = computed(() => {
  switch (alertState.type) {
    case 'success': return 'bg-primary text-[#032038] hover:bg-primary/90 shadow-primary/20'
    case 'error': return 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20'
    case 'warning': return 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20'
    default: return 'bg-primary text-[#032038] hover:bg-primary/90 shadow-primary/20'
  }
})
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(24px);
  border-radius: 32px;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}
</style>
