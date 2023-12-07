//Arquivo: ovni.js
//Função construtura para objeto ovni

function Ovni(context, imagem, imgExplosao) {
   this.context = context;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   this.imgExplosao = imgExplosao;
   this.spritesheet = new Spritesheet(context, imagem, 3, 1, 0, 0);
   this.spritesheet.intervalo = 100;
}

/*Devemos cronometrar o movimento do 'Ovni' aplicando no método 
'atualizar', a fórmula a seguir: 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores em 
'ovni.velocidade' da página HTML.*/

Ovni.prototype = {
   atualizar: function () {
      this.y -=
         this.velocidade * this.animacao.decorrido / 1000;

      if (this.y < (- this.imagem.height)) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   desenhar: function () {
      // var ctx = this.context;
      // var img = this.imagem;
      // ctx.drawImage(img, this.x, this.y, img.width, img.height);

      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();

   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Tratar as colisões | Definir retângulos de colisão
   retangulosColisao: function () {
      // Estes valores vão sendo ajustados aos poucos
      var formas = [
         { tipo: 'retangulo', x: this.x + 5, y: this.y + 35, largura: 34, altura: 16 },
         { tipo: 'circulo', x: this.x + 21, y: this.y + 20, raio: 18 },
      ];

      // Desenhando os retângulos para visualização | Comentar após realizar modificações
      var ctx = this.context;

      for (var i in formas) {
         ctx.save();
         ctx.strokeStyle = 'yellow';

         if (formas[i].tipo === 'retangulo') {
            ctx.strokeRect(formas[i].x, formas[i].y, formas[i].largura, formas[i].altura);
         } else if (formas[i].tipo === 'circulo') {
            ctx.beginPath();
            ctx.arc(formas[i].x, formas[i].y, formas[i].raio, 0, 2 * Math.PI);
            ctx.stroke();
         }

         ctx.restore();
      }

      return formas;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   colidiuCom: function (outro) {
      // Se colidiu com um Tiro, os dois desaparecem
      if (outro instanceof Tiro) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(outro);

         var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
         this.animacao.novoSprite(explosao);
      }
   }
}
