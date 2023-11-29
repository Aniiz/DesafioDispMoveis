//Arquivo: animacao.js
//Função construtura para objeto animação
/*Para dar um aspecto mais profissional ao jogo, devemos 
cronometrar as animações. No construtor da classe 'Animacao', 
foi criado os atributos 'ultimoCiclo' (para guardar o instante 
do ciclo anterior, lido do relógio) e 'decorrido' (para guardar 
o tempo decorrido entre o ciclo anterior e o atual).*/

function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
   this.processamentos = [];
   this.spritesExcluir = [];
   this.processamentosExcluir = [];
   this.ultimoCiclo = 0;
   this.decorrido = 0;
}
/*Objeto associado a função construtora.
Todas as instâncias usarão as mesmas cópisas de cada método.
A apalavra 'prototype' funciona como se fosse um atributo da função construtora.*/
Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.animacao = this;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   ligar: function() {
      this.ultimoCiclo = 0;
      this.ligado = true;
      this.proximoFrame();
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   desligar: function() {
      this.ligado = false;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.

   /*Para cronometrar as animações, obtemos o instante atual 
   do relógio do computador (dado por Date.getTime() em 
   milissegundos) e calculamos a diferença entre esse instante 
   e o instante do ciclo anterior.*/
   proximoFrame: function() {
      // Posso continuar?
      if ( ! this.ligado ) return;
      
      var agora = new Date().getTime();
      if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
      this.decorrido = agora - this.ultimoCiclo;

      // Atualizamos o estado dos sprites
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      // Desenhamos os sprites
      for (var i in this.sprites)
         this.sprites[i].desenhar();
         
      // Processamentos gerais
      for (var i in this.processamentos)
         this.processamentos[i].processar();
         
      // Processamento de exclusões
      this.processarExclusoes();
      
      // Atualizar o instante do último ciclo antes de chamar o próximo ciclo.
      this.ultimoCiclo = agora;

      //Chamamos o próximo ciclo
      /*O método 'requestAnimationFrame delega para o browser
      a tarefa de executar sua animação o mais rápido possível,
      assim que os recursos do sistema estiverem disponíveis.
      Temos que chamá-lo de forma cíclica, uma vez após a outra,
      da mesma forma que faríamos caso usássemos o conhecido 
      setTimeout*/
      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
      //Agora os sprites sabem quanto tempo levou entre um ciclo e outro
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   novoProcessamento: function(processamento) {
      this.processamentos.push(processamento);
      processamento.animacao = this;
   },
   excluirSprite: function(sprite) {
      this.spritesExcluir.push(sprite);
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   excluirProcessamento: function(processamento) {
      this.processamentosExcluir.push(processamento);
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   processarExclusoes: function() {
      // Criar novos arrays
      var novoSprites = [];
      var novoProcessamentos = [];
      
      // Adicionar somente se não constar no array de excluídos
      for (var i in this.sprites) {
         if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
            novoSprites.push(this.sprites[i]);
      }
      
      for (var i in this.processamentos) {
         if (this.processamentosExcluir.indexOf(this.processamentos[i])
             == -1)
            novoProcessamentos.push(this.processamentos[i]);
      }
      
      // Limpar os arrays de exclusões
      this.spritesExcluir = [];
      this.processamentosExcluir = [];
      
      // Substituir os arrays velhos pelos novos
      this.sprites = novoSprites;
      this.processamentos = novoProcessamentos;
   }
}
