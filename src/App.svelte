<script lang="ts">
  import TabuleiroTrilha from './lib/Tabuleiro.svelte';
  //import svelteLogo from './assets/svelte.svg'
</script>

<main>  
  <h1>Trilha inteligente!</h1>
  <p>
    Jogo de trilha utilizando busca competitiva MinMax (Depth-First-Search), e arvóre de decisão MDP (Markov-Decision-Process).
  </p>
  
  <div>
    <TabuleiroTrilha>
    </TabuleiroTrilha>
  </div>
</main>

<style>
  p {
    margin: 50px;
  }

  div {
    margin: 0 auto;
    width: 100%;
    min-height: 600px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>