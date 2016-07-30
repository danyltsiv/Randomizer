export default class{
    constructor(){}
    //Randomizer for integer numbers.
    randomize(from, to, except){
        if (from > to) {
            let temp = from;
            from = to;
            to = temp;
        }

        let random = this.getRandomInteger(from, to);
       
        if (except && except.length!=0) {
            if (!this.checkInterval(from, to, except)){ 
                return false;
            } else {
                while(except.includes(random)){
                    random = this.getRandomInteger(from, to);
                }
            }
        }
		
        return random;
    }

    checkInterval(from, to, except){
        let result = false;
        for(let i = from; i <= to; i++){
            if (!except.includes(i)) result = true;
        }
  
        return result;
    }

    getRandomInteger(from, to){
        return Math.floor(Math.random()*(to-from+1))+from;
    }
}