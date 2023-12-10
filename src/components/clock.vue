  <template>
  <div>
    <p>{{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: this.getCurrentTime(),
    };
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    updateCurrentTime() {
      this.currentTime = this.getCurrentTime();
    },
  },
  mounted() {
    this.intervalId = setInterval(this.updateCurrentTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
