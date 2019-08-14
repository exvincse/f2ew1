<template>
  <div id="app">
    <div class="wrap">
      <div class="d-flex">
        <div class="left-msg">
          <div class="add d-flex align-items-center">
            <input type="text" class="addmsg" placeholder="add a new mission…"
              v-model="addtodo"
              @keyup.enter="addlist()">
            <a href="#"
              @click.prevent="addlist()">
              <i class="fas fa-plus addicon"></i>
            </a>
          </div>
          <div class="todo d-flex" v-if="Object.keys(process).length !== 0 && process.now">
            <div class="check"></div>
            <div class="d-flex flex-column item">
              <span>{{process.todo}}</span>
              <div></div>
            </div>
            <a href="#"></a>
          </div>
          <div v-else>
            沒有進行中任務
          </div>
          <div class="timeout">{{min}}:{{second}}</div>
          <div v-if="todoary.length">
            <div class="list d-flex align-items-center"
              v-for="(item, index) in tododata" :key="index">
              <div class="d-flex">
                <a href="#" class="check" @click.prevent="complete(item)"></a>
                <span>{{item.todo}}</span>
              </div>
              <a href="#"
                @click.prevent="nowprocess(item)">
                <i class="far fa-play-circle fa-lg"></i>
              </a>
            </div>
              <div class="more">
                <a href="#">MORE</a>
              </div>
          </div>
          <div v-else>
            請新增任務
          </div>
        </div>
        <div class="right-menu">
          <div class="d-flex flex-column align-items-center menu">
            <a href="#" @click.prevent="toggle=true,check='todolist'">
              <i class="fas fa-bars"></i>
            </a>
            <a href="#" @click.prevent="toggle=true,check='analytics'">
              <i class="fas fa-chart-bar"></i>
            </a>
            <a href="#" @click.prevent="toggle=true,check='ringtones'">
              <i class="fas fa-music"></i>
            </a>
            <div class="text">POMODORO</div>
          </div>
        </div>
      </div>
      <div class="mind" :class="{'mind-click':play}">
        <a href="#" @click.prevent="timestart()" v-if="!play">
          <i class="fas fa-play-circle fa-5x"></i>
        </a>
        <a href="#" @click.prevent="pause(nowmusic),stop=!stop" v-else-if="stop">
          <i class="fas fa-stop-circle fa-5x"></i>
        </a>
        <a href="#" @click.prevent="timestop(),play=!play" v-else-if="play">
          <i class="fas fa-pause-circle fa-5x"></i>
        </a>
      </div>
      <div class="progess"></div>
      <div class="bar"></div>
      <div class="folded d-flex" v-show="toggle">
        <div class="d-flex flex-column justify-content-between first">
          <div class="d-flex flex-column folded-menu">
            <a href="#" @click.prevent="check='todolist'">
              <span :class="{'actived':check==='todolist'}">
                <i class="fas fa-bars"></i>
                <span>TO-DO LIST</span>
              </span>
            </a>
            <a href="#" @click.prevent="check='analytics'">
              <span :class="{'actived':check==='analytics'}">
                <i class="fas fa-chart-bar"></i>
                <span>analytics</span>
              </span>
            </a>
            <a href="#" @click.prevent="check='ringtones'">
              <span :class="{'actived':check==='ringtones'}">
                <i class="fas fa-music"></i>
                <span>ringtones</span>
              </span>
            </a>
          </div>

          <div class="semi-circle d-flex flex-column text-center justify-content-between">
            <div class="play-circle">
              <div class="start" v-if="!play"></div>
              <div class="stop" v-else-if="stop"></div>
              <div class="pause" v-else-if="play"></div>
                <a href="#" @click.prevent="timestart()" v-if="!play"></a>
                <a href="#" @click.prevent="pause(nowmusic),stop=!stop" v-else-if="stop"></a>
                <a href="#" @click.prevent="timestop(),play=!play" v-else-if="play"></a>
              </div>
              <div></div>
              <div class="folded-time">
                <div class="time">{{min}}:{{second}}</div>
                <div class="text">{{process.todo}}</div>
            </div>
          </div>
        </div>

        <div class="todolist" v-show="check==='todolist'">
          <div class="add d-flex align-items-center">
            <input type="text" class="addmsg" placeholder="add a new mission…"
              v-model="addtodo"
              @keyup.enter="addlist()">
            <a href="#"
              @click.prevent="addlist()">
              <i class="fas fa-plus addicon"></i>
            </a>
          </div>
          <div>
            <div class="processing">
              <div class="todo d-flex justify-content-between align-items-center">
                <span>to-do</span>
                <a class="todoslide" href="#" @click.prevent="slide=!slide">
                  <i class="fas fa-sort-down fa-lg" v-if="slide"></i>
                  <i class="fas fa-sort-up fa-lg" v-else></i>
                </a>
              </div>
              <div v-if="todoary.length" class="slide-down" :class="{'slide-toggle':slide}">
                <div class="list d-flex align-items-center"
                  v-for="(item, index) in tododata" :key="index">
                  <div class="d-flex">
                    <a href="#" class="check" @click.prevent="complete(item)"></a>
                    <span class="process-text">{{item.todo}}</span>
                  </div>
                  <a href="#"
                    @click.prevent="nowprocess(item, index)">
                    <i class="far fa-play-circle fa-lg"></i>
                  </a>
                </div>
              </div>
              <div v-else>
                請新增任務
              </div>
            </div>

            <div class="done">
              <div class="todo d-flex justify-content-between align-items-center">
                <span>done</span>
                <a class="todoslide" href="#" @click.prevent="done=!done">
                  <i class="fas fa-sort-down fa-lg" v-if="done"></i>
                  <i class="fas fa-sort-up fa-lg" v-else></i>
                </a>
              </div>
              <div v-if="todoary.length" class="slide-down" :class="{'slide-toggle':done}">
                <div class="list d-flex align-items-center"
                  v-for="(item, index) in donedata" :key="index">
                  <div class="d-flex">
                    <a href="#" class="check" @click.prevent="nocomplete(item)">
                      <div class="check-style-equal-width"></div>
                    </a>
                    <span class="done-text">{{item.todo}}</span>
                  </div>
                  <div class="count">
                    <div class="white-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="analytics" v-show="check==='analytics'">
            <div class="processing">
              <div class="todo d-flex justify-content-between align-items-center">
                <span>focus time</span>
              </div>
            </div>
            <div class="d-flex" style="margin-bottom:60px;">
              <div class="today">
                <span class="title">today</span>
                <div>
                  <span class="day">{{focus[0].today}}</span>
                  <span class="tomato">/tomato</span>
                </div>
              </div>
              <!-- <div class="today">
                <span class="title">WEEK</span>
                <div>
                  <span class="day">108</span>
                  <span class="tomato">/tomato</span>
                </div>
              </div> -->
            </div>
        </div>

        <div class="ringtones" v-show="check==='ringtones'">
          <div class="processing">
            <div class="todo d-flex justify-content-between align-items-center">
              <span>work</span>
            </div>
            <div class="work d-flex flex-wrap">
              <div class="d-flex align-items-center choose">
                <a href="#" class="check"
                  @click.prevent="player('stop')">
                  <span :class="{'check-style-equal-width':nowmusic === 'stop'}"></span>
                </a>
                <span>NONE</span>
              </div>
              <div class="d-flex align-items-center choose"
                v-for="(item,index) in musicname" :key="index">
                <a href="#" class="check"
                  @click.prevent="player(item)">
                  <span :class="{'check-style-equal-width':nowmusic === item}"></span>
                </a>
                <a href="#" class="musicname" @click.prevent="pause(item)">
                  <span>{{item}}</span>
                  <span class="musicpause">
                    <i class="fas fa-times"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="processing">
            <div class="todo d-flex justify-content-between align-items-center">
              <span>break</span>
            </div>
            <div class="work d-flex flex-wrap">
              <div class="d-flex align-items-center choose">
                <div class="check"></div>
                <span>NONE</span>
              </div>
              <div class="d-flex align-items-center choose">
                <div class="check"></div>
                <span>NONE</span>
              </div>
              <div class="d-flex align-items-center choose">
                <div class="check"></div>
                <span>NONE</span>
              </div>
              <div class="d-flex align-items-center choose">
                <div class="check"></div>
                <span>NONE</span>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column justify-content-between three">
          <a href="#" @click.prevent="toggle=!toggle">
            <i class="fas fa-times fa-2x"></i>
          </a>
          <div class="text">POMODORO</div>
        </div>
        <div>
          <audio class="audiocheck">
            <source src="../src/assets/audio.mp3" type="">
          </audio>
          <audio class="chase">
            <source src="../src/assets/chase.mp3" type="">
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      check: '',
      addtodo: '',
      todoary: [],
      focus: [],
      process: {},
      min: 0,
      second: 2,
      time: null,
      play: false,
      slide: false,
      done: false,
      stop: false,
      musicname: ['audiocheck','chase'],
      nowmusic: 'audiocheck'
    };
  },
  computed: {
    tododata () {
      return this.todoary.filter((item) => {
        if (!item.now) {
          if (!item.done) {
            return item;
          }
        }
      })
    },
    donedata () {
      return this.todoary.filter((item) => {
          return item.done;
      })
    },
  },
  created() {
    this.updatetodo();
    this.todoary.forEach((item) => {
      if (item.now){
        this.process = item;
      }
    })
  },
  methods: {
    addlist() {
      if (!this.addtodo.trim()) return false;
      let timestamp = new Date().getTime()
      this.todoary.push({
        id: timestamp,
        todo: this.addtodo,
        now: false,
        done: false
      })
      let jsonstr = JSON.stringify(this.todoary);
      localStorage.setItem("todolist", jsonstr);
      this.addtodo = '';
      this.updatetodo();
    },
    updatetodo() {
      let getlocal = localStorage.getItem("todolist") || [];
      let focus = localStorage.getItem("focus") || [];
      this.stop = false;
      if (focus.length===0) {
        this.focus.push({
          today: 0,
          week: 0,
        })
        let nullary = JSON.stringify(this.focus);
        localStorage.setItem("focus", nullary);
      } else {
        let parseJson = JSON.parse(focus);
        this.focus = parseJson;
      }

      if (getlocal.length===0) {
        let nullary = JSON.stringify(getlocal);
        localStorage.setItem("todolist", nullary);
      } else {
        let parseJson = JSON.parse(getlocal);
        this.todoary = parseJson;
      }
    },
    nowprocess(nowprocess) {
      clearInterval(this.time);
      this.play = false;
      this.min = 0;
      this.second = 2;
      this.updatetodo();
      this.todoary.forEach((item, index) => {
        if(item.id === nowprocess.id){
          this.todoary[index].now = true;
          this.process = this.todoary[index];
        } else {
          item.now = false;
        }
      })
      this.pause(this.nowmusic);
      let jsonstr = JSON.stringify(this.todoary);
      localStorage.setItem("todolist", jsonstr);
    },
    timestart() {
      if (this.todoary.length === 0){
        alert('請新增任務');
        this.play = false;
        return;
      }
      if (Object.keys(this.process).length === 0){
        alert('請選擇進行中任務');
        this.play = false;
        return;
      }
      if (this.min === 0 && this.second === 0) {
        alert('請選擇任務');
        this.play = false;
        return;
      }
      clearInterval(this.time);
      this.play = true;
      this.time = setInterval(() => {
        if (this.second === 0) {
          this.min -= 1;
          this.second = 60;
        }
        this.second -= 1;
        if(this.min === 0 && this.second === 0) {
          this.focus[0].today += 1;
          let jsonstr = JSON.stringify( this.focus);
          localStorage.setItem("focus", jsonstr);
          clearInterval(this.time);
          this.stop = !this.stop;
          let audio = document.querySelector(`.${this.nowmusic}`);
          audio.play();
        }
      },1000)
    },
    timestop() {
      clearInterval(this.time);
    },
    complete(complete) {
      this.todoary.forEach((item,index) => {
        if(complete.id === item.id){
           this.todoary[index].done = true;
        }
      })
      let addlocal = JSON.stringify(this.todoary);
      localStorage.setItem("todolist", addlocal);
      this.updatetodo();
    },
    nocomplete(nocomplete) {
      this.todoary.forEach((item,index) => {
        if(nocomplete.id === item.id){
          this.todoary[index].done = false;
        }
      });
      let addlocal = JSON.stringify(this.todoary);
      localStorage.setItem("todolist", addlocal);
      this.updatetodo();
    },
    player(name) {
      let audio = document.querySelector(`.${name}`);
      let audiostop = document.querySelectorAll('audio');
      audiostop.forEach((item) => {
        item.pause();
        item.currentTime = 0;
      });
      this.nowmusic = name;
      this.min = 0;
      this.second = 2;
      this.stop = false;
      if (name === 'stop') return;
      audio.play();
    },
    pause(name) {
      this.play = false;
      let audio = document.querySelector(`.${name}`);
      audio.currentTime = 0;
      audio.pause();
    }
  },
};
</script>

<style lang="scss">
  @import "./assets/all";
  .addicon{
    color: #FF4384;
	}
</style>
