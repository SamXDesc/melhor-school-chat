<template>
  <q-layout view="lHh Lpr lFr">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-toolbar-title>
          Melhor School Chat
          <div v-if="typing.user && typing.message" slot="subtitle">{{ typing.user !== this.user.name ? typing.message : 'A beautiful World' }}</div>
          <div v-else slot="subtitle">A beautiful World</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      typing: {
        user: '',
        message: ''
      }
    }
  },
  methods: {
    openURL
  },
  computed: {
    ...mapGetters('user', [
      'user'
    ])
  },
  sockets: {
    whoIsTyping (data) {
      this.typing = data
    }
  }
}
</script>

<style>
</style>
