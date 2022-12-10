<script lang="ts">
  import Tabuleiro from './lib/Tabuleiro.svelte';
  import svelteLogo from './assets/svelte.svg'
  // import Counter from './lib/Counter.svelte'

  const niveis = 3;
  const lado = 3;
  
  $: innerWidth = 10;
  
  function changedInnerWidth(newWidth) {
    // Test
  }
  
  $: {
    changedInnerWidth(innerWidth);
  }
</script>

<svelte:window bind:innerWidth />

<main>  
  <h1>Trilha inteligente!</h1>
  <p>
    Jogo de trilha utilizando a busca cega DFS (Depth-First-Search), e MDP (Markov-Decision-Process).
  </p>
  
  <div>
    <Tabuleiro>
    </Tabuleiro>
  </div>
</main>

<style>
  p {
    margin: 50px;
  }

  div {
    margin: 0 auto;
    width: 100%;
  }
</style>