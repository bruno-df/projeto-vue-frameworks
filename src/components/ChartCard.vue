<template>
  <div class="chart-card">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default {
  props: {
    type: String,
    data: Object,
    options: Object
  },
  setup(props) {
    const chartCanvas = ref(null);

    onMounted(() => {
      if (chartCanvas.value) {
        new Chart(chartCanvas.value, {
          type: props.type,
          data: props.data,
          options: props.options
        });
      }
    });

    return { chartCanvas };
  }
};
</script>

<style scoped>
.chart-card {
  padding: 20px;
  background: white;
  border-radius: 10px;
}
</style>
