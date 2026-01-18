# ToDoListe_vue

Nutzung der To-Do-Webseite

Diese Webseite dient dazu, Aufgaben übersichtlich zu verwalten und zu organisieren. Über das Eingabefeld am oberen Bereich der Seite können neue Aufgaben eingegeben werden. Nach dem Eintippen einer Aufgabe kann diese entweder durch Klicken auf den Button „Hinzufügen“ oder durch Drücken der Enter-Taste gespeichert werden. Die neue Aufgabe erscheint anschließend automatisch in der Liste „Noch zu erledigen“.

Offene Aufgaben können als erledigt markiert werden, indem die Checkbox neben der jeweiligen Aufgabe aktiviert wird. Sobald eine Aufgabe als erledigt markiert ist, wird sie aus der offenen Liste entfernt und in die Liste „Erledigt“ verschoben.
Aufgaben können jederzeit wieder zurück in die offene Liste verschoben werden. Dafür steht neben erledigten oder dringenden Aufgaben ein Kreispfeil-Symbol zur Verfügung. Durch einen Klick auf dieses Symbol wird die Aufgabe wieder als offen markiert und erscheint erneut in der Liste „Noch zu erledigen“.

Zusätzlich besteht die Möglichkeit, offene Aufgaben als dringend zu kennzeichnen. Hierfür kann das Ausrufezeichen neben der jeweiligen Aufgabe angeklickt werden. Die Aufgabe wird daraufhin in die Liste „Dringend“ verschoben. Dringende Aufgaben lassen sich ebenso wie offene Aufgaben erledigen oder wieder in die offene Liste zurückholen.

Über ein Suchfeld kann gezielt nach Aufgaben gesucht werden. Sobald ein Suchbegriff eingegeben wird, werden alle Aufgaben gefiltert, die diesen Begriff enthalten. Der gesuchte Text wird innerhalb der Aufgabe hervorgehoben, sodass passende Aufgaben schnell gefunden werden können. Die Suchfunktion funktioniert für offene, dringende und erledigte Aufgaben gleichermaßen.

Erledigte Aufgaben können endgültig gelöscht werden. In der Liste „Erledigt“ befindet sich hierfür ein „Löschen“-Button neben jeder Aufgabe. Durch einen Klick darauf wird die Aufgabe vollständig entfernt und kann nicht wiederhergestellt werden.

Alle vorgenommenen Änderungen werden automatisch gespeichert. Aufgaben bleiben somit auch nach einem Neuladen der Webseite oder nach dem Schließen des Browsers erhalten. Die Anwendung ermöglicht dadurch eine einfache, übersichtliche und dauerhafte Verwaltung von Aufgaben direkt im Browser.
## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
