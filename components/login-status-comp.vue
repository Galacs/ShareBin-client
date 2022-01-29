<template>
  <div>
      <button class="login-btn">{{ text }}</button>
  </div>
</template>

<script setup>
import { api_url } from '@/endpoints.js';

var text = "Login"

</script>

<style>
.login-btn {
    position: absolute;
    right:0;
    top:0;
    font: 13px/27px Roboto,RobotoDraft,Arial,sans-serif;
    white-space: nowrap;
    display: inline-block;
    outline: none;
    font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 16px;
    margin-right: 8px;
    margin-top: 8px;
    min-width: 96px;
    padding: 9px 23px;
    text-align: center;
    vertical-align: middle;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    margin-left: 8px;
    background: #2b7de9;
    box-shadow: 0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15);
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}
</style>