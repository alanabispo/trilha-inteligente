<script lang="ts">
  import TabuleiroTrilha from './lib/Tabuleiro.svelte';
</script>

<main>  
  <h1>Trilha-Inteligente!</h1>
  <p>
    Jogo de <a href="http://www.tabuleirocriativo.com.br/post_trilha.html">Trilha</a> 
    utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MinMax</a>, 
    com <a href="https://pt.wikipedia.org/wiki/Poda_(computa%C3%A7%C3%A3o)">poda alfa-beta</a>.
  </p>
  
  <TabuleiroTrilha></TabuleiroTrilha>
</main>

<style>
  p {
    margin: 25px;
  }
</style>