//Arquivo: colisor.js
//Função construtura para objeto colisor

function Colisor() {
   this.sprites = [];
   this.aoColidir = null;
   this.spritesExcluir = [];
}
Colisor.prototype = {
   novoSprite: function (sprite) {
      this.sprites.push(sprite);
      sprite.colisor = this;
   },
   processar: function () {
      // Inicio com um objeto vazio
      var jaTestados = new Object();

      for (var i in this.sprites) {
         for (var j in this.sprites) {
            // Não colidir um sprite com ele mesmo
            if (i == j) continue;

            // Gerar strings únicas para os objetos
            var id1 = this.stringUnica(this.sprites[i]);
            var id2 = this.stringUnica(this.sprites[j]);

            // Criar os arrays se não existirem
            if (!jaTestados[id1]) jaTestados[id1] = [];
            if (!jaTestados[id2]) jaTestados[id2] = [];

            // Teste de repetição
            if (!(jaTestados[id1].indexOf(id2) >= 0 ||
               jaTestados[id2].indexOf(id1) >= 0)) {

               // Abstrair a colisão
               this.testarColisao(this.sprites[i], this.sprites[j]);

               // Registrando o teste
               jaTestados[id1].push(id2);
               jaTestados[id2].push(id1);
            }
         }
      }

      this.processarExclusoes();
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   testarColisao: function (sprite1, sprite2) {
      // Obter os retângulos de colisão de cada sprite
      var rets1 = sprite1.retangulosColisao();
      var rets2 = sprite2.retangulosColisao();
      var colidiu = false;

      // Testar as colisões entre eles
      colisoes:
      for (var i in rets1) {
         for (var j in rets2) {
            // Abstraindo a fórmula!
            if (this.retangulosColidem(rets1[i], rets2[j])) {
               // Eles colidem, vamos notificá-los
               sprite1.colidiuCom(sprite2);
               sprite2.colidiuCom(sprite1);

               // Tratador geral
               if (this.aoColidir) this.aoColidir(sprite1, sprite2);

               // Não precisa terminar de ver todos os retângulos
               break colisoes;
            }
         }
      }
   },//Não esquecer dessa vírgula sempre que for criar um novo método.

   //Fórmula para detectar colisões entre sprites
   retangulosColidem: function (ret1, ret2) {
      if (ret1.tipo === 'retangulo' && ret2.tipo === 'retangulo') {
         return (ret1.x + ret1.largura) > ret2.x &&
            ret1.x < (ret2.x + ret2.largura) &&
            (ret1.y + ret1.altura) > ret2.y &&
            ret1.y < (ret2.y + ret2.altura);
      } else if (ret1.tipo === 'circulo' && ret2.tipo === 'circulo') {
         const distanciaX = ret1.x - ret2.x;
         const distanciaY = ret1.y - ret2.y;
         const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
         return distancia < ret1.raio + ret2.raio;
      } else if (ret1.tipo === 'retangulo' && ret2.tipo === 'circulo') {
         let maisProximoX = Math.max(ret1.x, Math.min(ret2.x, ret1.x + ret1.largura));
         let maisProximoY = Math.max(ret1.y, Math.min(ret2.y, ret1.y + ret1.altura));

         let distanciaX = ret2.x - maisProximoX;
         let distanciaY = ret2.y - maisProximoY;
         let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

         return distancia < ret2.raio;
      } else if (ret1.tipo === 'circulo' && ret2.tipo === 'retangulo') {
         let maisProximoX = Math.max(ret2.x, Math.min(ret1.x, ret2.x + ret2.largura));
         let maisProximoY = Math.max(ret2.y, Math.min(ret1.y, ret2.y + ret2.altura));

         let distanciaX = ret1.x - maisProximoX;
         let distanciaY = ret1.y - maisProximoY;
         let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

         return distancia < ret1.raio;;
      }
      // Fórmula de interseção de retângulos
      // return (ret1.x + ret1.largura) > ret2.x &&
      //    ret1.x < (ret2.x + ret2.largura) &&
      //    (ret1.y + ret1.altura) > ret2.y &&
      //    ret1.y < (ret2.y + ret2.altura);
   },
   stringUnica: function (sprite) {
      var str = '';
      var retangulos = sprite.retangulosColisao();

      for (var i in retangulos) {
         str += 'x:' + retangulos[i].x + ',' +
            'y:' + retangulos[i].y + ',' +
            'l:' + retangulos[i].largura + ',' +
            'a:' + retangulos[i].altura + '\n';
      }

      return str;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   excluirSprite: function (sprite) {
      this.spritesExcluir.push(sprite);
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   processarExclusoes: function () {
      // Criar um novo array
      var novoArray = [];

      // Adicionar somente os elementos não excluídos
      for (var i in this.sprites) {
         if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
            novoArray.push(this.sprites[i]);
      }

      // Limpar o array de exclusões
      this.spritesExcluir = [];

      // Substituir o array velho pelo novo
      this.sprites = novoArray;
   }
}
