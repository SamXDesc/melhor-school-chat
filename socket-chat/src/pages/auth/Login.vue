<template lang="html">
  <div @keyup.13="confirm" class="q-my-xl">
    <q-field>
      <q-input color="white" inverted-light ref="name" v-model="name" float-label="Nome" />
    </q-field>

    <q-btn color="white" text-color="black" @click="confirm" label="Entrar na Sala" rounded class="full-width q-my-md" />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  name: 'components-auth-loginForm',
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    confirm () {
      this.$db.put({
        _id: `${Date.now()}`,
        name: this.name,
        avatar: `https://api.adorable.io/avatars/70/${this.name}`
      }, (err, result) => {
        if (err) {
          console.log(err)
        }

        LocalStorage.set('user', result.id)
        this.$router.push('room')
      })
    }
  },
  mounted () {
    this.$refs.name.focus()
  }
}
</script>

<style lang="css">
</style>
