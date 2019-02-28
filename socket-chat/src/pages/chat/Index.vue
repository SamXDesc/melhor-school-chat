<template>
  <q-page class="layout-padding">
    <q-scroll-area class="pScrollArea">
      {{ domHeight }}
      <q-chat-message
        label='Sunday, 19th'
      />

      <q-chat-message
        v-for="(message, index) in messages"
        :key="index"
        :name="message.user.name === user.name ? 'me' : message.user.name"
        avatar="http://placehold.it/100x100"
        :text="[message.content]"
        stamp="7 minutes ago"
        :sent="!!(message.user.name === user.name)"
      />
    </q-scroll-area>

    <div class="q-pa-lg fixed-bottom">
      <q-field>
        <q-input
          placeholder="Digite alguma coisa"
          v-model="text"
          v-on:keyup.enter="send"

          :after="[
            {
              icon: 'mdi-send',
              error: false,
              handler () {
                send()
              }
            }
          ]"
        />
      </q-field>
    </div>
  </q-page>
</template>

<style>
.pScrollArea {
  position: absolute;
  right: 0;
  top: 0;
  height: 90%;
  width: 100%;
  border: 2px solid red;
  padding: 0.5em;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      isTyping: false
    }
  },
  watch: {
    text (value) {
      if (value.length > 0) {
        this.isTyping = true
      } else {
        this.isTyping = false
      }
    },
    isTyping (condition) {
      this.$socket.emit('typing', { user: this.user.name, condition: condition })
    }
  },
  computed: {
    ...mapGetters('chat', [
      'messages'
    ]),
    ...mapGetters('user', [
      'user'
    ])
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    chatRoom (data) {
      this.storeMessage(data)
    }
  },
  methods: {
    ...mapActions('chat', [
      'storeMessage'
    ]),
    ...mapActions('user', [
      'storeUser'
    ]),
    send () {
      this.$socket.emit('chat', {
        content: this.text,
        sent: Date.now(),
        user: this.user
      })

      this.text = ''
    }
  },
  mounted () {
    this.storeUser({
      name: Math.random().toString(36).substring(7),
      avatar: 'http://placehold.it/80x80'
    })
  }
}
</script>
