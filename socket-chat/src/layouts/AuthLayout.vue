<template>
  <q-layout class="background">
    <q-page-container class="layout-padding">
      <div class="row items-center justify-center fit">
        <div class="col-xs-12 col-md-4 col-xl-3 text-white q-mt-xl">
          <div class="text-center">
            <img src="statics/logo.png" alt="Melhor Envio" width="200">
          </div>

          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'auth-layout',
  data: () => {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="css">
</style>
