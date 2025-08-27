<template>
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style>
.app-main {
  font-family: 'DM Sans', sans-serif;
  padding: 1rem 1.5rem 2.5rem;
  text-align: center;
  min-height: 100vh;
  background: #ffffff;
  color: #374151;
}

html.dark .app-main {
  background: #111827;
  color: #f3f4f6;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .app-main {
    padding: 0.75rem 1rem 2rem;
  }
}

@media (min-width: 1024px) {
  .app-main {
    padding: 1.5rem 2rem 3rem;
  }
}
</style>
