<script lang="ts">
  import TabuleiroTrilha from './lib/Tabuleiro.svelte';

  //import svelteLogo from './assets/svelte.svg'
</script>

<main>  
  <h1>Trilha-Inteligente!</h1>
  <p>
    Jogo de <a href="http://www.tabuleirocriativo.com.br/post_trilha.html">Trilha</a> 
    utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MinMax</a>, 
    e arvóre de decisão <a href="https://en.wikipedia.org/wiki/Markov_decision_process">MDP</a> 
    (Markov-Decision-Process).
  </p>
  
  <TabuleiroTrilha></TabuleiroTrilha>
</main>

<style>
  p {
    margin: 50px;
  }
</style>