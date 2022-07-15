<template>
  <div
    v-if="isLoading"
    class="loader"
  >
    <div class="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
import './loader.css'

export default {
    name: 'LoaderComponent',
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
    },
}
</script>