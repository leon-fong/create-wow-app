<script setup lang="ts">
const name = ref('')
function go() {
  if (name.value) {
    uni.navigateTo({
      url: `/pages/hi?name=${name.value}`,
    })
  }
}
</script>

<template>
  <view>
    <view
      class="m-auto mt-5 box-border w-250px w-full border-1 border-gray-200 border-rounded border-solid bg-transparent px-4 py-2 text-center outline-none active:outline-none"
    >
      <input
        v-model="name"
        placeholder="What's your name?"
        type="text"
        autocomplete="off"
        class="mr-0 w-full"
      >
    </view>
    <view>
      <button
        :disabled="!name"
        class="m-auto m-auto mt-3 w-120rpx rounded bg-teal-600 px-4 py-1 text-sm text-white"
        hover-class="bg-teal-700"
        @click="go"
      >
        GO
      </button>
    </view>
  </view>
</template>
