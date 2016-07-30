import IntRandomizer from './randomizer';
import Animator from './animator';

let goBtn = document.getElementById(`goBtn`);
let number = document.getElementById(`number`);
let clrBtn = document.getElementById(`clrBtn`);
let unique = document.getElementById(`unique`);
let from = document.getElementById(`from`);
let to = document.getElementById(`to`);
let animator = new Animator;
let randomizer = new IntRandomizer();

goBtn.onclick = ()=>{
    let rnd;
    let numbers = [];
    let i = 0; 

    for (let key in localStorage){
        numbers[i] = parseInt(localStorage[key]);
        i++;
    }
   
    if(!isNaN(parseInt(from.value)) && !isNaN(parseInt(to.value))) {
        if (!unique.checked || randomizer.randomize(parseInt(from.value),parseInt(to.value),numbers)!==false) {

            animator.animate((timePassed) => {
                if (!unique.checked){
                    rnd = randomizer.randomize(parseInt(from.value),parseInt(to.value));
                } else {
                    rnd = randomizer.randomize(parseInt(from.value),parseInt(to.value),numbers);
                }
                number.innerHTML = rnd;
                let fontSizeAnim = timePassed/100;
                number.style.fontSize = fontSizeAnim+`vh`;}, 4000);

            if (unique.checked){
                setTimeout(()=>{ localStorage.setItem(localStorage.length,rnd);},4100);
            }

        } else { 
            number.innerHTML = `<p class='error'>No more unique numbers! Reset the local storage please!</p>`;
        }
    } else {
        number.innerHTML = `<p class='error'>Invalid characters!</p>`;
    }
  
};

clrBtn.onclick = () => {
    localStorage.clear();
    number.innerHTML = `<p class='reseted'>Local Storage reseted succesfully!</p>`;
};
  
unique.onclick = () => {
    clrBtn.disabled = !unique.checked;
};