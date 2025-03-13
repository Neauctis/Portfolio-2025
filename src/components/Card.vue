<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="card" style="background-color: rgba(219, 219, 219, 0.05);">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;

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
  margin: 16px 0;
}

.card-footer {
  text-align: right;
}
</style>
