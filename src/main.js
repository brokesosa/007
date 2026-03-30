const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 123456789 ";
const textArea = document.querySelector('#user-message');
const btn = document.querySelector('#btn-chiffrer');
const brute = document.querySelector('#brute');
let IMPOSSIBLE = [
    "BQ", "BX", "BV", "CJ", "CQ", "CW", "CX", "DB", "DF", "DK", 
    "DP", "DQ", "DV", "DX", "FG", "FH", "FJ", "FK", "FQ", "FV", 
    "FX", "GB", "GC", "GD", "GF", "GJ", "GK", "GQ", "HJ", "HK", 
    "HQ", "JB", "JC", "JD", "JF", "JG", "JH", "JK", "JL", 
    "JM", "JN", "JP", "JQ", "JV", "JW", "JX", "JZ", "KB", "KC", 
    "KD", "KF", "KG", "KH", "KJ", "KM", "KN", "KP", "KQ", "KV", 
    "KX", "KZ","WZ","MJ","RX","XM","ZX","GX","SX","ZF","QF","HZ","WV"
    ,"XN","XZ","WJ","GZ","XK","ZS","VG"
]

btn.addEventListener('click', () => {
    const messageBrut = textArea.value.toUpperCase();
    const message = messageBrut.replace(/[^A-Z0-9 ]/g, "");
    let ligne = "";
    let colonne = "";

    for (let i =0; i < message.length; i++) {
        let lettre = message[i];
        let index = alpha.indexOf(lettre);

        if (index !== -1) {
          let L = Math.floor(index / 6) + 1;
          let C = (index % 6)+ 1;

          ligne += L;
          colonne += C;
        }}
          const CL = ligne + colonne;
          let resultat = "";
          for (let i= 0; i < CL.length;i+=2) {
              let Lnew = parseInt(CL[i]);
              let Cnew = parseInt(CL [i+1]);
              let index = (Lnew-1)*6+(Cnew-1);
              let lettreChiffrée = alpha[index];
              resultat += lettreChiffrée;
          }
          const afficheur = document.querySelector('#output-stream');
          afficheur.innerText = resultat;
      
        
  }
)
const btnDechiffrer = document.querySelector('#btn-dechiffrer');

btnDechiffrer.addEventListener('click', () => {
    const messageChiffre = textArea.value.toUpperCase();
    let rubanBrut = "";

    for (let i = 0; i < messageChiffre.length; i++) {
        let index = alpha.indexOf(messageChiffre[i]);
        if (index !== -1) {
            let L = Math.floor(index / 6) + 1;
            let C = (index % 6) + 1;
            rubanBrut += L.toString() + C.toString();
        }
    }

    const milieu = rubanBrut.length / 2;
    const partieLignes = rubanBrut.substring(0, milieu);
    const partieColonnes = rubanBrut.substring(milieu);

    let messageClair = "";
    for (let i = 0; i < partieLignes.length; i++) {
        let L_orig = parseInt(partieLignes[i]);
        let C_orig = parseInt(partieColonnes[i]);
        
        let indexOri = (L_orig - 1) * 6 + (C_orig - 1);
        messageClair += alpha[indexOri];
    }
    const afficheur = document.querySelector('#output-stream');
    afficheur.innerText = messageClair;
});
brute.addEventListener('click', () => {
  let alphabetBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphabets = [];
  let alphabetActu = alphabetBase;
  let tousLesResultats = "";
  const element = document.querySelector("#code");
  let interception = element.innerText;


  for (let i = 0; i < 25; i++) {
      alphabetActu = alphabetActu.slice(1) + alphabetActu[0];
      alphabets.push(alphabetActu);
  }

  
  for (let i = 0; i < alphabets.length; i++) {
      let alphabetTester = alphabets[i]; 
      let tentative = "";
      for (let j = 0; j < interception.length; j++) {
          let lettreCodee = interception[j];       
          let position = alphabetTester.indexOf(lettreCodee);
          if (position !== -1) {
              tentative += alphabetBase[position];
          } else {
              tentative += lettreCodee; 
          }
          
      }
      const estValide = estUnePhraseValide(tentative);
      if (estValide) {
        tousLesResultats += `CLÉ ${i + 1} (PROBABLE) : ${tentative}\n`;
    }
  }

  const afficheur1 = document.querySelector('#output2');
  afficheur1.innerText = tousLesResultats;
});

function estUnePhraseValide(phrase) {
  const contientErreur = IMPOSSIBLE.some(paire => phrase.includes(paire));
  //some renvoie true si une des paires de impossible est trouvé dans une phrase
  return !contientErreur;
}