<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <!-- Modal Wrapper -->
      <div v-show="modalActive" class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-6 font-Lexend">
        <!-- Modal Contents -->
        <Transition name="modal-inner">
          <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-[520px] rounded-lg">
            <slot />
            <button class="text-white bg-accent mt-6 py-2 px-6
            rounded-md hover:bg-primary duration-150 cursor-pointer ease-out" @click="$emit('close-modal')">Close</button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport> 
</template>

<script setup>
  defineEmits(['close-modal'])
  defineProps({
    modalActive: {
      type: Boolean,
      default: false
    } 
  })
</script>

<style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }

  .modal-inner-enter-active {
    transition: all 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }

  .modal-inner-leave-active {
    transition: all 300ms cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  
  .modal-inner-leave-to {
    transform: scale(0.8);
  }
</style>