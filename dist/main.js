(()=>{var e={352:e=>{function t(){let e=[],t=[{type:"Carrier",length:5,hits:0,sunk:!1},{type:"Battleship",length:4,hits:0,sunk:!1},{type:"Destroyer",length:3,hits:0,sunk:!1},{type:"Submarine",length:3,hits:0,sunk:!1},{type:"Patrol Boat",length:2,hits:0,sunk:!1}],r=function(e){!0===e.sunk||e.hits++},o=function(e){e.hits===e.length?(e.sunk=!0,console.log("sunk")):e.sunk=!1},a=t[0],n=t[1],l=t[2],i=t[3],c=t[4];for(let t=0;t<10;t++){let t=[];for(let e=0;e<10;e++)t.push(0);e.push(t)}function s(t,r,o){if(t-=1,r-=1,o){for(let a=0;a<o.length;a++)if(t+a>=10||0!==e[r][t+a])return!0;return!1}return 0!==e[r][t]&&("x"!==e[r][t].value||void 0!==e[r][t].ship)}return{placeShip:function(t,r,o,a){if(this.x=t,this.y=r,this.ship=o,occupied=s(t,r),t-=1,r-=1,"horizontal"===a){if(!(o.length+t<=10&&!1===occupied))throw new Error("Ship is too big or the position is occupied.");for(let a=0;a<o.length;a++)e[r][t+a]={value:"o",ship:o}}else{if("vertical"!==a)throw new Error('Invalid orientation. Only "horizontal" or "vertical" are allowed.');if(console.log(occupied),!(o.length+r<=10&&!1===occupied))throw new Error("Ship is too big or the position is occupied.");for(let a=0;a<o.length;a++)if(0!==e[r+a][t])throw new Error("Ship is too big or the position is occupied.");for(let a=0;a<o.length;a++)e[r+a][t]={value:"o",ship:o}}},recieveAttack:function(t,a){occupied=s(t,a),t-=1;let n=e[a-=1][t].ship;if(!0===occupied)return e[a][t].value="x",r(n),o(n),console.log(n),console.log("Hit"),!0;if("x"===e[a][t].value)throw new Error("you have already fired here");return e[a][t]={value:"x"},console.log("Miss at "+ ++t+","+ ++a),!1},checkOccupied:s,checkGameOver:function(e){return!0===a.sunk&&!0===n.sunk&&!0===l.sunk&&!0===i.sunk&&!0===c.sunk&&(console.log("Game Over"),!0)},carrier:a,battleship:n,destroyer:l,submarine:i,patrolBoat:c,grid:e}}e.exports={Player:function(){const e=t(),r=t();function o(e){let t=Math.random()<.5?"horizontal":"vertical",a=0;if("vertical"===t){let n=Math.floor(10*Math.random())+1,l=Math.floor(Math.random()*(11-e.length))+1;for(let t=0;t<e.length;t++)!1===r.checkOccupied(n,l+t)&&a++;if(a===e.length)try{r.placeShip(n,l,e,t)}catch(t){o(e)}else a!==e.length&&o(e)}else if("horizontal"===t){let n=Math.floor(Math.random()*(11-e.length))+1,l=Math.floor(10*Math.random())+1;for(let t=0;t<e.length;t++)!1===r.checkOccupied(n+t,l)&&a++;if(a===e.length)try{r.placeShip(n,l,e,t)}catch(t){o(e)}else a!==e.length&&o(e)}}const a=[r.carrier,r.battleship,r.destroyer,r.submarine,r.patrolBoat];return o(a[0]),o(a[1]),o(a[2]),o(a[3]),o(a[4]),{player1Gameboard:e,player2Gameboard:r,compAttack:function t(){let r=Math.floor(10*Math.random())+1,o=Math.floor(10*Math.random())+1;return r-=1,o-=1,"x"===e.grid[o][r].value||"x"===e.grid[o][r].value&&void 0!==e.grid[o][r].ship?t():[r=++r,o=++o]}}}}}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(352);let t=document.getElementById("board1"),o=document.getElementById("board2");const a=(0,e.Player)();function n(){let e=a.compAttack();!0===a.player1Gameboard.recieveAttack(e[0],e[1])?setTimeout((()=>{n()}),1e3):setTimeout((()=>{h(l,t)}),1e3)}const l=a.player1Gameboard.grid,i=a.player2Gameboard.grid;let c=a.player1Gameboard.checkOccupied,s=a.player2Gameboard.checkOccupied;function d(e,r,o){return e===t?c(r,o):s(r,o)}function h(e,t){t.innerHTML="";for(let r=0;r<10;r++)for(let o=0;o<10;o++){const a=document.createElement("div");a.classList.add("cell"),a.dataset.x=o,a.dataset.y=r;let n=o,l=r;a.innerText=e[r][o]?e[r][o].value:"",t.appendChild(a),n=++n,l=++l,"x"===e[r][o].value&&!0===d(t,n,l)?a.classList.add("shiphit"):!0===d(t,n,l)?a.classList.add("ship"):"x"===e[r][o].value&&a.classList.add("hit")}}console.log(l),console.log(i),console.log(c(1,1));let u=a.player2Gameboard.recieveAttack;const p=[a.player1Gameboard.carrier,a.player1Gameboard.battleship,a.player1Gameboard.destroyer,a.player1Gameboard.submarine,a.player1Gameboard.patrolBoat];var m=0;const f=document.getElementById("gridContainer"),g=document.getElementById("shipname"),y=document.getElementById("welcomeContainer");g.innerText="Carrier",f.addEventListener("click",(function(e){const r=e.target;let o=r.dataset.x,n=r.dataset.y;o=++o,n=++n;var i=p[m];if(!a.player1Gameboard.placeShip(o,n,i,"horizontal")){m++,h(l,t),5===m&&y.remove();var c=p[m].type;g.innerText=c}}));for(let e=0;e<10;e++)for(let t=0;t<10;t++){const r=document.createElement("div");r.classList.add("cell"),r.dataset.x=t,r.dataset.y=e,f.appendChild(r)}h(l,t),h(i,o),o.addEventListener("click",(function(e){(!0===a.player1Gameboard.checkGameOver||!0===a.player2Gameboard.checkGameOver)&&console.log("Game Over");const r=e.target;let c=r.dataset.x,s=r.dataset.y;c=++c,s=++s,!0===u(c,s)||(n(),setTimeout((()=>{h(l,t)}),1e3)),h(i,o)}))})()})();