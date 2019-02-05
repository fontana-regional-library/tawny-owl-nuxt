<template>

  <Index />

</template>

<script>
export default {
  async fetch({ store }) {
    if(store.state.authors.length === 0 ) {
      await store.dispatch('getAuthors');
    }
    
    if(store.state.callsToAction.length === 0 ) {
      await store.dispatch('getCallsToAction');
    }

    if (store.state.events.length === 0) {
      await store.dispatch('getUpcomingEvents');
    }

    if (store.state.services.length === 0) {
      await store.dispatch("getServices");
    }

    if (store.state.pages.length === 0) {
      await store.dispatch("getPages");
    }

    if (store.state.collection.length === 0) {
      await store.dispatch("getCollection");
    }

    if (store.state.posts.length === 0) {
      await store.dispatch("getPosts");
    }
  }
};
</script>
