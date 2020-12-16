<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.title {
  font: 32px 'Lato', sans-serif;
  text-align: center;
  text-transform: uppercase;
}

.submition-error {
  color: #f00;
  font-size: 14px;
  text-align: center;
}

.validation-error {
  color: #f00;
  font-size: 14px;
  text-align: right;
}

hr {
  border: none;
  border-top: solid 1px #ddd;
}

input[type=button], input[type=submit] {
  font: 16px 'Lato', sans-serif;
  text-align: center;
  text-transform: uppercase;
}

input[type=button] {
  color: #444;
  background: #fff;
  border: 2px solid #444;
}

input[type=button]:hover {
  color: #f75;
  border: 2px solid #f75;
}

input[type=submit] {
  color: #fff;
  background: #444;
  border: 2px solid #444;
}

input[type=submit]:hover {
  background: #f75;
  border: 2px solid #f75;
}
</style>
