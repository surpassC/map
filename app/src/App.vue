<template>
   <div class="nav">
     <router-view></router-view>
   </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
     
    }
  },
}
</script>

<style>
.nav{
  text-align: center;
}
.nav a{
  display: inline-block;
  color: #f90;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
}

</style>
