<template>
  <div class="dialog-layer">
    <form
      class="dialog"
      @submit.prevent
    >
      <div class="header">
        {{ header }}
      </div>
      <div
        v-if="contentText"
        class="content"
      >
        {{ contentText }}
      </div>
      <div
        v-else
        class="content"
      >
        <div
          v-if="elements.length"
          class="employee"
        >
          <div
            v-for="(item, index) in elements"
            :key="index"
          >
            <Input
              :alias="item.alias"
              :name="item.name"
              :value="item.value"
              :type="item.type"
              :method="item.method"
            />
          </div>
        </div>
      </div>
      <div class="footer">
        <button
          v-for="(value, index) in footer"
          :key="index"
          :type="value.type"
          @click="value.action"
        >
          {{ value.name }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import './dialog.css'
import Input from "../../Common/Input/Input";

export default {
    name: 'DialogComponent',
    components: {
        Input,
    },
    props: {
        header: {
            type: String,
            required: true
        },
        contentText: {
            type: String,
            default: ''
        },
        elements:{
            type: Array,
            default: () => []
        },
        footer: {
            type: Array,
            default: () => []
        },
    },
}
</script>