<script setup>
import logo from '../assets/logo.png'
</script>

<template>
  <footer class="bg-background border-t border-white/5 pt-20 pb-10 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div class="md:col-span-2">
        <div class="flex flex-col mb-6">
          <img :src="logo" alt="Primakara Logo" class="h-10 w-auto mb-4 self-start" />
          <p class="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mb-4">
            Jl. Tukad Badung No.135, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226
          </p>
          <a href="https://maps.app.goo.gl/Fan5fsCY1xzAytT96" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-primary text-xs font-bold hover:bg-primary hover:text-[#032038] transition-all w-fit">
            <i class="fas fa-map-marker-alt"></i>
            Lihat di Google Maps
          </a>
        </div>
      </div>
      
      <div>
        <h4 class="font-bold mb-6 text-slate-200 uppercase text-xs tracking-widest">Navigasi</h4>
        <ul class="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
          <li><a href="#" class="hover:text-primary transition-colors">Ruangan</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">Reservasi</a></li>
          <li><a href="#" class="hover:text-primary transition-colors">Jadwal Tersedia</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-bold mb-6 text-slate-200 uppercase text-xs tracking-widest">Hubungi Kami</h4>
        <ul class="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
          <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2">
            <i class="fab fa-instagram"></i> Instagram
          </a></li>
          <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a></li>
          <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2">
            <i class="fab fa-linkedin"></i> LinkedIn
          </a></li>
        </ul>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
      <p>© 2026 Primakara University. All rights reserved.</p>
      <div class="flex gap-8">
        <p class="hover:text-primary">Created by: Agui Muditha</p>
      </div>
    </div>
  </footer>
</template>
