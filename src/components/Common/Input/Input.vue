<template>
  <label :for="alias">
    <span>{{ name }}</span>
    <input
      :id="alias"
      :name="alias"
      :type="type"
      :value="value"
      :placeholder="name"
      required
      @input="method"
    >
  </label>
</template>

<script>
export default {
    name: 'InputComponent',
    props: {
        alias: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        value: {
            type: [Number, String],
            required: true
        },
        method: {
            type: Function,
            required: true
        },
    },
}
</script>