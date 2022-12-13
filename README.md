# TrilhaInteligente

Jogo para testar inteligência artificial aplicada a jogo de tabuleiro Trilha (Nine Men's Morris) feita com Svelte + TS + Vite.

[![Open in Gitpod](https://www.gitpod.io/svg/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/alanabispo/trilha-inteligente)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Como funciona?

A solução foi baseada no algoritmo minimax, que funciona construindo uma arvore de possiveis movimentos com uma profundidade especifica que descobrimos e confirmamos com certas leituras que 3 é um bom número.

## Heuristica

Numero de movimentos possiveis: Cada movimento adiciona 0.2 pontos
Numero de peças: Cada peça dá 4 pontos
Numero de trilhas ou trincas: Dão 1 ponto 

## Motivos

Os motivos por trás da heuristica são os seguintes:

### Numero de movimentos possiveis

Cada movimento extra dá novas possibilidades de se obter mais pontos com trincas por exemplo e manter a pontuação alta de muitas peças.

### Número de peças

É importante incluir uma vez que quanto menos peças menos possibilidades se tem para ganhar o jogo.

### Número de trincas

Fazer trincas é necessário para ganhar o jogo visto que bloquear o adversário nem sempre é possível, logo o objetivo da IA é diminuir o número de peças até que o adversário tenha apenas 2.