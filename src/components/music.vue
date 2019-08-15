<template>
  <div>
    <div>
      <audio class="painoboy">
        <source src="../assets/painoboy.mp3" type="">
      </audio>
      <audio class="Groundhog">
        <source src="../assets/Groundhog.mp3" type="">
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    timeplay(nowmusic){
      let audio = document.querySelector(`.${nowmusic}`);
      audio.loop=true;
      audio.play();
    },
    play(name) {
      let audio = document.querySelector(`.${name}`);
      let audiostop = document.querySelectorAll('audio');
      audiostop.forEach((item) => {
        item.pause();
        item.currentTime = 0;
      });
      if (name === 'stop') return;
      audio.loop=true;
      audio.play();
    },
    musicpause(name) {
      let audio = document.querySelector(`.${name}`);
      audio.currentTime = 0;
      audio.pause();
    }
  },
}
</script>