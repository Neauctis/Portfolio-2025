<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <div class="card" bg-hex-8883>
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <p>{{ content }}</p>
    </div>
    <div class="card-footer">
      <button v-if="buttonText" @click="handleClick">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;

  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-0.5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-header h2 {
  margin: 0;
  text-decoration: underline;
  font-size: 1.5em;
}

.card-body p {
  text-align: justify;
  margin: 16px 0;
}

.card-footer {
  text-align: right;
}

.card-footer button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.card-footer button:hover {
  background-color: #0056b3;
}
</style>
