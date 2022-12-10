<script lang="ts">
  import { Turno } from './lib/peca-estado';
  import Placar from './lib/Placar.svelte';
  import TabuleiroTrilha from './lib/Tabuleiro.svelte';

  let turno: Turno = Turno.Parado;
  

  //import svelteLogo from './assets/svelte.svg'
</script>

<main>  
  <h1>Trilha-Inteligente!</h1>
  <p>
    Jogo de <a href="http://www.tabuleirocriativo.com.br/post_trilha.html">Trilha</a> utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MinMax</a>, 
    e arvóre de decisão <a href="https://en.wikipedia.org/wiki/Markov_decision_process">MDP</a> (Markov-Decision-Process).
  </p>
  
  <!-- Placar -->
  <Placar turno={turno}></Placar>
  <!-- ./Placar -->

  <div>
    <TabuleiroTrilha turno={turno}>
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