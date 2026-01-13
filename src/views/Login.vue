<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full animate-pulse delay-700"></div>

    <div class="w-full max-w-md relative">
      <!-- Logo -->
      <div class="flex flex-col items-center mb-10">
        <img :src="logo" alt="Primakara Logo" class="h-20 w-auto mb-6 drop-shadow-[0_0_30px_rgba(29,202,211,0.3)]" />
        <h1 class="text-3xl font-black uppercase italic tracking-tight text-white">Admin<span class="text-primary not-italic">Login</span></h1>
        <p class="text-slate-500 text-sm mt-3 font-medium">Primakara University Room Booking System</p>
      </div>

      <!-- Login Card -->
      <div class="glass-card border-white/5 p-8 shadow-2xl relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <form @submit.prevent="handleLogin" class="space-y-6 relative">
          <!-- Email -->
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">Email Address</label>
            <div class="relative group">
              <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs transition-colors group-focus-within:text-primary"></i>
              <input 
                v-model="email" 
                type="email" 
                required 
                placeholder="admin@primakara.ac.id" 
                class="w-full bg-slate-900 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-slate-200"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <div class="flex items-center justify-between px-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Password</label>
              <a href="#" class="text-[10px] font-bold text-primary hover:text-primary/70 uppercase tracking-wider transition-colors">Forgot?</a>
            </div>
            <div class="relative group">
              <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs transition-colors group-focus-within:text-primary"></i>
              <input 
                v-model="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                class="w-full bg-slate-900 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-slate-200"
              />
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center gap-2 px-1">
            <input type="checkbox" id="remember" class="w-4 h-4 rounded border-white/10 bg-slate-900 text-primary focus:ring-primary/20" />
            <label for="remember" class="text-xs text-slate-400 font-medium">Remember for 30 days</label>
          </div>

          <!-- Submit -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-4 bg-primary hover:bg-primary/80 text-[#032038] rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i v-if="isLoading" class="fas fa-circle-notch animate-spin"></i>
            <span>{{ isLoading ? 'Authenticating...' : 'Sign In' }}</span>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-slate-600 text-[10px] mt-8 font-bold uppercase tracking-widest">
        &copy; 2026 PRIMAKARA UNIVERSITY. SECURE ACCESS ONLY.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import logo from '../assets/logo.png'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  isLoading.value = true
  
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    console.log('API Login Response:', response.data);

    // Deep token search helper
    const findToken = (obj) => {
      if (!obj || typeof obj !== 'object') return null;
      
      // Preferred keys
      const keys = ['token', 'access_token', 'accessToken', 'key', 'auth_token'];
      for (const key of keys) {
        if (typeof obj[key] === 'string' && obj[key].length > 10) return obj[key];
      }

      // If 'content' or 'data' is a string, it might be the token
      if (typeof obj.content === 'string' && obj.content.length > 10) return obj.content;
      if (typeof obj.data === 'string' && obj.data.length > 10) return obj.data;

      // Recurse into common wrappers
      return findToken(obj.content) || findToken(obj.data) || findToken(obj.user);
    };

    const token = findToken(response.data) || (typeof response.data === 'string' && response.data.length > 20 ? response.data : null);

    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Flexible User detection
      const userData = response.data?.user || response.data?.content?.user || response.data?.data?.user || response.data?.content || response.data?.data;
      if (userData && typeof userData === 'object') {
        localStorage.setItem('user_profile', JSON.stringify(userData));
        
        // Extract role for access control
        const role = userData.role || userData.user_role || userData.level || userData.type || '';
        localStorage.setItem('user_role', role);
      }

      router.push('/admin');
    } else {
      console.error('Unified token detection failed. Response:', response.data);
      throw new Error(`Token detection failed. Check logs. Structure: ${JSON.stringify(response.data).substring(0, 40)}...`);
    }
  } catch (error) {
    console.error('Login Error:', error);
    
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Check if backend is running.';
    } else {
      errorMessage = error.message;
    }
    
    alert(errorMessage);
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(24px);
  border-radius: 32px;
}

/* Animations */
.animate-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
