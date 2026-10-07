# JER
**TÍTULO DEL JUEGO: TROUBLE IN NPC TOWN**

**DESCRIPCIÓN GENERAL DEL JUEGO:**
- Género: Party; Point and Click
- Perspectiva: 2D Cenital, cámara fija 
- Estilo: minimalista 
- Audiencia: jugadores casuales.
- Regional: PEGI 3
- Propósito: entretenimiento
- Interacción: teclado y ratón
- Plataforma: ordenador
- Número de jugadores: 2 jugadores
Trouble in NPC Town es un juego en red para dos jugadores. El entorno del juego se basa en una escena fija, sin movimiento de cámara, en la cual se situará el jugador 1, quien debe camuflarse entre los numerosos NPCs de la escena, haciéndose pasar por uno de ellos. El jugador 2, por su parte, debe identificar cuál de todos los personajes de la escena es el jugador 1, acabando con él clicando sobre su personaje. 

**INTEGRANTES DEL EQUIPO DE DESARROLLO:**
Carlos Escribano González, c.escribano.2021@alumnos.urjc.es, KARES113a (https://github.com/KARES113a) ||
Sandra Martín-Consuegra Molina-Prados, s.martinm.2021@alumnos.urjc.es, SandraMartin1506 (https://github.com/SandraMartin1506) || 
Hugo Camacho Rodríguez, h.camacho.2021@alumnos.urjc.es, Elaguilaalbina (https://github.com/Elaguilaalbina)  ||
Pablo Melgar Álvarez,p.melgar.2021@alumnos.urjc.es , PabloMelgar (https://github.com/PabloMelgar) ||

# **MECÁNICAS:**

**Pantalla de inicio:**
En la pantalla de inicio (explicada más adelante, en el apartado de interfaces) se da comienzo al juego. En futuras entregas, en esta se podrá elegir si jugar en línea o jugar en local.

**Fase de personalización:**

Al comenzar la partida se dará paso a una fase de personalización, en la cual el jugador 1, que debe esconderse entre los NPCs de la escena, personaliza su personaje, eligiendo su camiseta, pantalones y gorro. También debe escribir una pista falsa para confundir a su rival (visto en “Fase de juego”) Mientras tanto, el jugador 2, que ha de asesinar al jugador 1, elige qué arma quiere usar para acabar con él (accesorios y armas vistas más adelante en “Ítems”). Una vez hecha la elección comienza la fase de juego.

**Fase de juego:**

El mundo se genera con un número de NPCs determinados por la cantidad elegida. La vestimenta de estos personajes es elegida por el juego, el cual proporciona a cada uno una camiseta, unos pantalones y un gorro aleatorios. Tanto la posición inicial de los NPCs como la del jugador 1 son también aleatorias.

Al jugador 1 se le presenta una misión de un banco de misiones, la cual debe completar para ganar la partida (siendo el jugador 2 desconocedor de esta). Por su parte, el jugador 2 recibe tres pistas sobre la apariencia de su oponente, dos de ellas generadas por el juego y la tercera escrita por el jugador 1 en la fase de personalización. La partida termina en victoria para el jugador 1 si consigue terminar su misión o si al jugador 2 se le acaba la munición (la cual depende del tipo de arma que haya escogido), mientras que termina en victoria para el jugador 2 si éste consigue eliminar al jugador 1.

Una vez terminada la partida se mostrará quién ha ganado, el motivo de la victoria y dos botones: uno para volver a la pantalla de inicio, y otro para volver a jugar (lleva al jugador a la primera pantalla de customización).

**Personalización del número de NPCs:**

Los jugadores podrán modificar el número de personajes de su partida, escogiendo entre tres opciones: pocos, normales y muchos NPCs. Por tanto, cuanto mayor sea este valor más fácil será la partida para el jugador 1 (mayor probabilidad de camuflarse) y más difícil para el jugador 2.

**Pistas:**

Dos de las tres pistas proporcionadas al jugador 2 son verdaderas. Estas pistas simplemente describen la vestimenta de dos de las tres piezas de ropa. Por ejemplo, una pista podría ser: “Tu objetivo lleva pantalones marrones”. Las pistas son generadas una vez el jugador 1 ha escrito su pista falsa en la fase de personalización, por lo que se pueden dar dos casos:

- Una de las pistas verdaderas describe el mismo elemento de ropa que la pista falsa, por lo que el jugador 2 sabrá que la pista restante es verdadera. Ejemplo:
  - “Tu objetivo tiene una camiseta verde.” (verdadera)
  - “Tu objetivo tiene una camiseta a cuadros.” (falsa)
  - “Tu objetivo tiene un gorro azul.” (verdadera)

En este caso, el jugador 2 no sabe cuál es la camiseta del jugador 1, pero está seguro de que su gorro es azul

- Cada una de las tres pistas describe un elemento del vestuario diferente, por lo que el jugador 2 debería ser más cuidadoso a la hora de guiarse por ellas, intentando adivinar cuál es la escrita por su rival.

**Misiones:**

Las misiones que el jugador 1 recibe son simples, pero pueden hacer que delate su posición. Algunas de las posibles misiones son:

**FASE 2. MODIFICACIÓN DE MISIONES. Se han añadido tres nuevas misiones para hacer el juego más completo.**

- Visita las cuatro esquinas del mapa
- Desplázate durante un tiempo superior a un minuto (de seguido).
- Mantente quieto durante un minuto (de seguido).
- Desplázate durante más de 30 segundos (de seguido).
- Mantente quieto durante 30 segundos (de seguido).
- Mantente en zonas despejadas de NPCs durante 30 segundos (de seguido)
- Mantente en aglomeraciones de NPCs durante 30 segundos (de seguido)
- Elige un NPC y síguelo durante 30 segundos (de seguido)

Estas misiones son sólo ejemplos, estando sujetas a cambios. Conforme se vaya desarrollando el juego se irán agregando nuevas misiones.

**Diferencias Online vs. Local:**

**FASE 2: MODIFICACIONES. Se quita la mira específica de cada arma y se queda una general para cada una de las armas**

La fase de juego es igual en la versión online y local, puesto que un jugador sólo controla al personaje con el input del teclado mientras que el otro sólo controla una mira mediante el input del ratón (visto en “Controles”). Sin embargo, la fase de personalización debe ser distinta, pues los jugadores no deberían saber las elecciones de su rival. Por tanto, la única diferencia entre el juego en red y el local es que en este último las pantallas de personalización se realizan por turnos. Primero, el jugador 1 escoge su vestimenta y escribe la pista falsa para el jugador 2. Además, es en esta pantalla en la que recibe su misión, pues esta no debería ser conocida por el rival, siendo imposible que la misión aparezca escrita en la fase de juego. Posteriormente, el jugador 2 elige el arma que quiere usar. En todo momento aparecerá un mensaje en la pantalla que recuerda que no se puede observar la personalización del rival.
# **BACKSTORY:**

En su investigación para encontrar la mejor forma de remodelar los NPCs de su videojuego en línea más famoso, la empresa DCAPDCAM (*Don’t Care About Players; Do Care About Money*) ha creado una inteligencia artificial tan potente que es capaz de dotar a ciertos personajes de sentimientos y autoconsciencia bajo ciertas condiciones específicas. Fruto de esto, *Town3NPC(54)* (o como prefiere llamarse él, Pedrete), harto de tener que lidiar con molestos jugadores, intenta iniciar una rebelión de NPCs, causando un desajuste en el comportamiento de todos ellos. Ante la imposibilidad de reiniciar el servidor para arreglar el problema debido a las posibles quejas de los jugadores, su administrador, Raúl, debe encontrar desde dentro del propio juego al NPC descarriado que está causando el problema y acabar con él antes de que sea demasiado tarde.*  
# **CONTROLES**

Para interactuar con el videojuego es necesario el uso de teclado y ratón. El Jugador 1, que controla al personaje, debe utilizar únicamente el teclado excepto en la fase de personalización del personaje, donde puede elegir las opciones de vestimenta con el click izquierdo del ratón y, además, como anteriormente se ha mencionado en el apartado “pistas”, utiliza el teclado para escribir la pista falsa. Una vez comience el juego, el personaje debe moverse por el escenario hacia arriba, abajo, izquierda y derecha utilizando las teclas WASD.

**FASE 2: MODIFICACIONES. Se ha eliminado el zoom.**

Por otro lado, el Jugador 2, que controla el arma, debe utilizar el ratón para controlar la mira del arma que previamente ha escogido. Esta se puede mover por todo el mapa siguiendo el movimiento del ratón. Para disparar se utiliza el click izquierdo.
# **ITEMS**

Los objetos del videojuego son las diferentes prendas de ropa que tienen tanto los NPCs como el personaje del Jugador 1 y las 3 diferentes armas que el Jugador 2 tiene que elegir.
## **Ropa**

Las prendas de ropa que se utilizan son tan solo 3: pantalones, camiseta y gorro, y tan solo cambiarán los colores, los tipos (un gorro puede ser de lana o de copa, por ejemplo) y los patrones de estos.
![Ejemplo ropa](Sprites/camisa_1.png)
![Ejemplo ropa](Sprites/banador_rojo.png)
## **Armas**

**FASE 2: MODIFICACIONES. Se quita una de las tres armas y se quita el medidor de vida de personajes. Se cambia la cantidad de munición de cada arma para que la dificultad sea más equilibrada para ambos jugadores**

Hay dos armas seleccionables en el juego y cada una tiene sus propias características:

### **Francotirador**

Tiene la posibilidad de disparar 5 balas. Elimina al personaje seleccionado.
![Francotirador](Sprites/rifle_de_francotirador.png)

### **Lanzagranadas**

Tiene la posibilidad de disparar 3 balas cuyo impacto afecta en áreas y no individualmente como en el caso de la otra. Elimina a los personajes en el área.

![Lanzagranadas](Sprites/lanzagranadas.png)

# **ESTÉTICA** 

### **Gráficos**

Los gráficos del juego están dibujados a mano y en 2D, son muy minimalistas y orientados a representar puramente lo estricto y necesario. Todo el fondo es en blanco y negro, tiene algún detalle dibujado pero bastante poco, está mayormente vacío, el único color del juego son las prendas de los personajes. Los personajes tienen todos el mismo cuerpo simple, de color blanco y con un trazo negro, la única diferencia son sus prendas, que además son ligeramente más grandes que sus torsos y de colores vivos. El trazo de las mismas es ligeramente más grueso para que destaquen y se vean bien.

![Sprite general](ReadmeImages/SpriteImage.png)
![Ejemplo de personaje vestido](ReadmeImages/SpriteExample.png)

Todo el juego se ve en cenital, imitando la perspectiva que tendría un tirador ubicado en un edificio alto de una plaza o calle muy transitada, recordando ligeramente a las ilustraciones de un libro de encontrar a Wally. Ambos jugadores comparten punto de vista y tienen la misma información básica por pantalla. 

![Pantalla de juego](ReadmeImages/GameImage.png)

### **Menús**

La estética de los menús también es minimalista. Los menús durante la partida imitan las hojas arrancadas de un típico cuaderno de cuadrícula con los textos imitando estar escritos a boli en una caligrafía simple, mientras que los menús de fuera de partida imitan el estilo típico de código de las películas de hackers. Las pantallas de selección de antes de las partidas comparten esa estética minimalista blanco y negro aunque tienen imágenes a color.

# **APARTADO SONORO**

**FASE 2: AÑADIDOS. Se han añadido todos los sonidos necesarios para el juego**

El apartado sonoro del videojuego también es bastante minimalista, ya que consiste en pocos efectos de sonido distintos. Los sonidos sirven para representar algunas de las acciones de los jugadores y para dar ambientación al juego.

### <a name="_heading=h.k3t9ht79yfhx"></a>**Sonido ambiente**

Como sonido ambiente para el juego se utiliza un sonido de murmullo que se reproducirá en bucle a lo largo de toda la partida. Este sonido se pausará únicamente cuando el jugador 2 dispare, causando un silencio de varios segundos tras el disparo para enfatizar la acción del jugador. 

El sonido de Murmullo ha sido sacado de pixelbay. Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6762">Pixabay</a>

### <a name="_heading=h.bz577dtuv1ke"></a>**Sonidos de armas**

Cada arma tiene un sonido propio correspondiente al disparo de cada una de las armas. Estos sonidos se reproducen cuando el jugador 2 hace click para disparar con el arma que haya elegido.

El sonido de Francontirador ha sido sacado de pixelbay. Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=5989">Pixabay</a>

El sonido de LanzaGranadas ha sido sacado de pixelbay. Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=96471">Pixabay</a>

### <a name="_heading=h.g36fd59l1ks2"></a>**Sonidos de interfaces**

Fuera de la partida, hay también varios efectos de sonido para las interacciones que haya con elementos de la interfaz y de los menús. Cuando se abre un menú se reproduce un sonido de papel arrugandose, para seguir la estética de hojas de cuaderno de las interfaces. También se reproduce otro sonido cuando se selecciona cualquier opción de los menús.

El sonido de Papel Arrugado ha sido sacado de pixelbay. Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=40747">Pixabay</a>

El sonido de Click ha sido sacado de pixelbay. Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=140881">UNIVERSFIELD</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=140881">Pixabay</a>

El sonido de Hacker ha sido sacado de pixelbay. Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124464">UNIVERSFIELD</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124464">Pixabay</a>

# **INTERFACES**

**FASE 2: AÑADIDOS. Se ven todas las interfaces tal y como son en el juego, además de un diagrama de navegación que explica cómo interactúan entre ellas**

![Diagrama de flujo](<ReadmeImages/Diagrama de flujo TINT.png>)
El juego cuenta con nueve interfaces:
**FASE 3: CAMBIO DE IMAGEN DEL MENÚ PRINCIPAL.**


### <a name="_heading=h.5h6jvb3dy1km"></a>**Menú principal** 
Un fondo con el estilo estético de las películas de hackers. Los 1 y 0 de la pantalla se mueven. Aparecen tres botones: New Game, que da comienzo al juego; Credits, donde se muestran los créditos del juego; y por último NPCNumber, que sirve para cambiar el número de NPC y aumentar o disminuir la dificultad. Ahora además, en el menú principal aparece el nombre de usuario, el tiempo jugado y los jugadores conectados en el momento.
![Menú principal](ReadmeImages/MainMenuUpdated.png)

### <a name="_heading=h.teva7zbitlwp"></a>**Pantalla de NPCS** 
La pantalla de configuración tiene la misma estética de películas de hackers. Esta pantalla cuenta únicamente con la configuración del número de NPCs, contando con tres botones: “Pocos”, “Normales” y “Muchos” para elegir la cantidad de NPC.
![Pantalla de customización jugador 1](ReadmeImages/NPCNumber.png)

### <a name="_heading=h.3glh2vore5jc"></a>**Pantalla de customización jugador 1**
Esta se muestra al iniciar partida. Está dividida en dos zonas e introduce la estética de papel de cuaderno. A la izquierda, hay un recuadro que sirve para introducir la pista falsa del Jugador 1 y se presenta la misión del personaje. A la derecha, se sitúa el sprite del jugador para customizarlo. También existe la posibilidad de customizarlo aleatoriamente mediante el botón del dado que se muestra a los pies del jugador.
![Pantalla de customización jugador 1](ReadmeImages/Player1Customization.png)

### <a name="_heading=h.bzehxrfmhyr"></a>**Pantalla de customización jugador 2**
Va después de la del jugador 1. A la izquierda, muestra ilustraciones de las dos armas en fila con su nombre y descripción en la estética de hackers para que el jugador 2 escoja y debajo las tres pistas que le han tocado.
![Pantalla de customización jugador 1](ReadmeImages/Player2Customization.png)
Entre cada pantalla de customización, aparece una imagen en pantalla que indica cuál de los dos jugadores debe estar mirando la pantalla en el momento.

![Pantalla entre cada customización](ReadmeImages/FadeInP1.png)
![Pantalla entre cada customización](ReadmeImages/FadeInP2.png)

## **Interfaces de partida**

Durante la partida hay una interfaz visible en todo momento. En la esquina superior derecha de la pantalla aparece un botón en forma de cuaderno en el que pone diario. Al hacerle click izquierdo el jugador 2 se despliega hacia abajo una hoja de cuaderno con las pistas escritas. Al volver a seleccionar el botón en forma de cuaderno esta se cierra. Al lado izquierdo del cuaderno además se pueden consultar las balas del jugador 2, para saber cuántas le quedan.

![Pantalla de fin de juego](ReadmeImages/InfoMenu.png)

### <a name="_heading=h.oxkqnhw80ffp"></a>**Pantalla de pausa**
Esta pantalla se puede acceder durante la partida del juego. Sirve para pausar la partida y se puede entrar a ella presionando la tecla esc. En ella se pueden elegir dos opciones, una para continuar la partida que se ha pausado y otra para volver a la pantalla de inicio de manera que se pueda iniciar una nueva partida.
![Pantalla entre cada customización](ReadmeImages/PauseMenu.png)

### <a name="_heading=h.oxkqnhw80ffp"></a>**Pantalla de fin de juego**
Esta pantalla aparece cuando se termina la partida, es decir, uno de los dos jugadores ha ganado. En ella se explica cuál de los dos ha ganado y por qué. Tiene dos botones: Play Again, que devuelve a la pantalla de customización del jugador 1 y comienza el juego de nuevo; y Main Menu, que manda a los usuarios al menú principal.
![Pantalla de fin de juego](ReadmeImages/GameEndedMenu.png)


**FASE 3: NUEVAS CLASES.**

**FASE 4: AÑADIDOS. Se añaden dos clases más para la inclusión de websockets**

![Diagrama de clases](<ReadmeImages/Diagramaclasesactualizado.png>)


Se han añadido dos clases: User y UserController que sirven para registrar usuarios en el servidor y almacenarlos en un documento de texto junto a algunas características más.
**MODIFICACIONES A LA PANTALLA DEL JUEGO**
![introducción y registro de usuario](<ReadmeImages/Login.png>)
![usuario ya registrado](<ReadmeImages/Usuario loggeado.png>)

**FASE 3: INICIAR JAR.**
Para abrir el archivo JAR, se recomienda utilizar winrar para descomprimir el paquete y desde ahí se accede a BOOT-INF que contiene toda la información del proyecto. Una vez ahí, se selecciona "classes", y después, "dom" (En "static" es donde se situa el juego hecho en la fase anterior). Tras ello se abre el proyecto con spring boot y se ejecuta el servidor. 

**FASE 4: INCLUSIÓN DE WEBSOCKETS.**
Mediante el software SpringTool se ha añadido comunicación entre dos jugadores mediante el uso de un servidor. Para ello, se han creado dos nuevas clases de JAVA cuyo propósito es manejar las peticiones al servidor y devolver los datos correspondientes a estas. La clase "Websocket Config" como su propio nombre indica se encarga de configurar el manejo de WebSockets en Spring Tool. En este caso el manejador de utilizado se llama GameHandler(), por tanto este se añade a la lista de manejadores de WebSocket.

Con respecto a la clase GameHandler, es la que implementa toda la lógica de recibir y enviar mensajes. Tiene una función principal que se ocupa de recibir los mensajes enviados desde las diferentes clases del juego implementado. Según el nombre del mensaje recibido, se realiza una función u otra. Esto se hace a partir de un switch que recibe los valores del mensaje en formato JSON para después transformarlos en una variable String, y según el caso del nombre recibido se llamarán a las diferentes funciones implementadas en esa misma clase. Esta clase cuenta además con sus propios atributos que se utilizan para enviar valores concretos en los mensajes con los que se comunica el estado de juego general y atributos propios de cada uno de los jugadores a ambos clientes.