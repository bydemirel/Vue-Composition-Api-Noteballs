<template>
  <div>
    <nav
      class="navbar is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

          <a
          @click.prevent="showMobileNav = !showMobileNav"
            role="button"
            :class="{ 'is-active': showMobileNav }"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            ref="navbarBurgerRef"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active': showMobileNav }"
          ref="navbarMenuRef"
        >
          <div class="navbar-end">
            <RouterLink
            @click="showMobileNav = false"          
            to="/" class="navbar-item" active-class="is-active">
              Notes
            </RouterLink>
            <RouterLink
          
              @click="showMobileNav = false"      
              to="/stats"
              class="navbar-item"
              active-class="is-active"
            >
              Stats
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>

/* imports*/
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

/* mobile nav*/
const showMobileNav = ref(false);

/*click outside to close*/
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null)

onClickOutside(navbarMenuRef,() => {
  showMobileNav.value = false
},{
  ignore:[navbarBurgerRef]
});

</script>

<style>
@media(max-width: 1200px){
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>
