# Music Visualizer

**Music Visualizer** es una aplicación hecha en React y [Remotion](https://github.com/remotion-dev/remotion?tab=coc-ov-file) que te permite crear videos animados a partir de tu música favorita. Solo tienes que insertar un archivo `.mp3` y una imagen de miniatura, junto con otras configuraciones como título y artista, y la aplicación generará un video `.mp4` animado de la canción.

## Instalación

Primero, clona este repositorio:

```bash
git clone https://github.com/MilimNava-dev/music-visualizer.git
```

Después, entra al nuevo directorio creado e instala las dependencias:

```bash
npm install
```

Si quieres ver una *preview* del video, ejecuta:

```bash
npm run dev
```

## Configuraciones

| Parámetro     | Descripción                                                                                                                | Data Type                  | Obligatorio | Predeterminado |
|---------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------|-------------|----------------|
| **audio**     | Archivo de audio a usar en el video. Debe estar en el directorio `public/` (recomendado `.mp3`).                           | `string` (nombre de archivo)  | ✅          | —              |
| **miniature** | Imagen de miniatura de la canción (aparece en el centro del video), también en `public/`.                                  | `string` (nombre de archivo)  | ✅          | —              |
| **duration**  | Duración del video en segundos.                                                                                            | `integer` (segundos)          | ✅          | —              |
| **title**     | Título de la canción.                                                                                                      | `string`                      | ⚠️          | (en blanco)    |
| **artist**    | Artista de la canción.                                                                                                     | `string`                      | ⚠️          | (en blanco)    |
| **bpm**       | BPM (beats per minute) de la canción. Opcional, pero muy recomendable para que las animaciones vayan al ritmo.             | `integer`                     | ⚠️          | 120            |
| **bgColor**   | Color de fondo principal.                                                                                                  | `string` (hex)                | ⚠️          | ![#fff](https://dummyimage.com/10/fff/fff) `#fff` |
| **colors**    | Lista de colores para los círculos animados del fondo.                                                                     | `array` de `string` (hex)     | ⚠️          | [ ![#0099ff](https://dummyimage.com/10/0099ff/0099ff) `#0099ff`, ![#00ff99](https://dummyimage.com/10/00ff99/00ff99) `#00ff99`, ![#ff0099](https://dummyimage.com/10/ff0099/ff0099) `#ff0099` ] |
| **seed**      | Semilla numérica para el movimiento aleatorio de los círculos (usando [seedrandom](https://www.npmjs.com/package/seedrandom)). | `integer`                     | ❌          | 42             |
| **blur**      | Cantidad de desenfoque (en píxeles) para el fondo.                                                                         | `integer` (px)                | ❌          | 60             |

- ✅ = obligatorio
- ⚠️ = recomendado
- ❌ = opcional

### Cambiar configuraciones

Las configuraciones están en `/src/Root.jsx`, en una constante llamada `songData` (con ejemplos). Puedes editarlas directamente ahí.

```js
const songData = {
  title: "ハイドレンジア feat. 歌愛ユキ",
  artist: "LonePi",
  audio: "audio.mp3",
  miniature: "miniature.jpg",
  bpm: 134,
  bgColor: "#2d2331ff",
  colors: [
    "#2d2331ff",
    "#4a2e4bff",
    "#392e49ff"
  ],
  duration: 3 * 60 + 21,
  // Opcionales:
  // seed: 42,
  // blur: 60
}
```

## Formatos disponibles

Puedes descargar el video en dos formatos: vertical y horizontal, para adaptarlo al dispositivo donde lo quieras usar.

Esto se gestiona mediante dos `<Composition>` diferentes en `Root.jsx`:

- **MusicVisualizerH** → versión horizontal
- **MusicVisualizerV** → versión vertical

## Descargar el video

Cuando hayas personalizado todo, para exportar el video en formato `.mp4`, ejecuta:

```bash
npx remotion render <id> out/<nombre-video>.mp4
```

> Donde `<id>` es el formato deseado: `MusicVisualizerV` para vertical, `MusicVisualizerH` para horizontal.

El archivo resultante aparecerá en el directorio `out/`.

---

¡Gracias por usar Music Visualizer!  
¿Tienes dudas o sugerencias? ¡Abre un issue!