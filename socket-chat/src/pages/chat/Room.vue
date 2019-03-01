<template>
  <q-page class="layout-padding">
    <q-scroll-area class="pScrollArea">
      <q-chat-message
        label='Sunday, 19th'
      />

      <q-chat-message
        v-for="(data, index) in messages"
        :key="index"
        :name="data.user.name === user.name ? 'eu' : data.user.name"
        :avatar="data.user.avatar"
        :text="[data.content]"
        :letter="'S'"
        :stamp="data.sent | formatDate"
        :sent="!!(data.user.name === user.name)"
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
  padding: 0.5em;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import { LocalStorage, date } from 'quasar'

const formatDate = content => {
  return date.formatDate(content, 'DD/MM/YYYY HH:mm')
}

export default {
  name: 'Room',
  data: () => {
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
    },
    hasUser () {
      if (!LocalStorage.has('user')) {
        this.$router.push('/')
      } else {
        this.storeUser(LocalStorage.get.item('user'))
      }
    }
  },
  filters: {
    formatDate
  },
  mounted () {
    this.hasUser()
  }
}
</script>
