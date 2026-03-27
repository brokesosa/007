async function genererCode() {
    try {
        const reponse = await fetch('https://api.adviceslip.com/advice');
        //api pour avoir des phrases random que je vais chiffrer
        const donnee = await reponse.json();
        let phraseClaire = donnee.slip.advice.toUpperCase();
        phraseClaire = phraseClaire.replace(/[^A-Z ]/g, "");
        let decalage = Math.floor(Math.random() * 25) + 1;
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let messageCode = "";

        for (let i = 0; i < phraseClaire.length; i++) {
            let index = alphabet.indexOf(phraseClaire[i]);
            if (index !== -1) {
                let nouvelIndex = (index + decalage) % 26;
                messageCode += alphabet[nouvelIndex];
            } else {
                messageCode += phraseClaire[i];
            }
        }
        document.querySelector('#code').innerText = messageCode;

    } catch (erreur) {
        console.error("Erreur de connexion au satellite...", erreur);
    }
}

genererCode();
setInterval(genererCode, 15000);