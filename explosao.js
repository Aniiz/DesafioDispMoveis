//Arquivo: explosao.js
//Função construtura para objeto explosão

var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.4;
SOM_EXPLOSAO.load();

function Explosao(context, imagem, x, y) {
   this.context = context;
   this.imagem = imagem;

   //Definindo o quadro do spritesheet | linha 1 e coluna 5
   this.spritesheet = new Spritesheet(context, imagem, 1, 5);
   //Definir um intervalo de tempo para mudança de quadro
   this.spritesheet.intervalo = 75;
   this.x = x;
   this.y = y;
   this.animando = false;
   
   var explosao = this;
   this.fimDaExplosao = null;
   this.spritesheet.fimDoCiclo = function() {
      explosao.animacao.excluirSprite(explosao);
      if (explosao.fimDaExplosao) explosao.fimDaExplosao();
   }
   
   SOM_EXPLOSAO.currentTime = 0.0;
   SOM_EXPLOSAO.play();
}
Explosao.prototype = {
   atualizar: function() {
      
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Desenhamos o quadro atual e animamos a spritesheet
   desenhar: function() {
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   }
}