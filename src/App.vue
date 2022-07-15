<template>
  <Loader :is-loading="loading" />
  <Commands :change-loading="changeLoading" />
  <Content :change-loading="changeLoading" />
</template>

<script>
import './assets/reset.css'
import './assets/style.css'
import Commands from './components/Commands/Commands';
import Content from './components/Content/Content'
import Loader from './components/Common/Loader/Loader';

export default {
    name: 'App',
    components: {
        Commands,
        Content,
        Loader,
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading
        }
    }
}
</script>