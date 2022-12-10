<script lang="ts">
  // testing

</script>
<div>
  <table>
    <tr>
      <td class="pec">O</td><td class="hbr"></td><td class="pec">O</td><td class="hbr"></td><td class="pec">O</td>
    </tr>
    <tr>
      <td class="vbr"></td><td class="cen" colspan="3" rowspan="3"><slot></slot></td><td class="vbr"></td>
    </tr>
    <tr>
      <td class="pec">O</td><td class="pec">O</td>
    </tr>
    <tr>
      <td class="vbr"></td><td class="vbr"></td>
    </tr>
    <tr>
      <td class="pec">O</td><td class="hbr"></td><td class="pec">O</td><td class="hbr"></td><td class="pec">O</td>
    </tr>
  </table>
</div>

<style>
  table, tr, td {
    margin: 0;
    padding: 0;
    border-spacing: 0;
  }

  .hbr {
    background-color: green;
    width: 200px;
    height: 10px;
  }

  .vbr {
    background-color: red;
    height: 200px;
    width: 10px;
  }
  
  .pec {
    width: 30px;
    height: 30px;
    border: 1px solid black;
  }

  .cen {
    padding: 50px;
  }
</style>