function isEmpty(value){
    return !value ? 'Please enter value' : false;
}
function startsWithNum(value){
    return /^\d/.test(value) ? 'Username can\'t start with number' : false;
}
function containsSpaces(value){
    return /\s/.test(value) ? 'Username can\'t contain spaces' : false;
}
function passLength(value, minPassLen){
    return (value.length < minPassLen) ? 'Minumum ' + minPassLen.toString() + ' symbols' : false;
}
function usernameLength(value, minLen, maxLen){
    return (value.length < minLen || value.length > maxLen) ? 'Username length is from 3 to 50 symbols.' : false;
}
function checkPass(p1,p2){
    return p1 !== p2 ? 'Passwords don\'t match' : false
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (!re.test(String(email).toLowerCase())) ? 'E-mail is incorrect' : false;
}

class Validator{
    constructor(value, field){
        this.value = value;
        this.field = field;

        this.minUsernameLen = 3;
        this.maxUsernameLen = 50;
        this.minPassLen = 8;


        this.rules = {
            'username': [isEmpty, startsWithNum, containsSpaces, usernameLength],
            'email': [isEmpty, validateEmail],
            'password': [isEmpty, checkPass]
        }
    }

    validate(){
        var rules = this.rules[this.field];
        for(let i = 0; i < rules.length; i++){
            let result = rules[i](this.value);
            if(result){
                return result;
            }
            // else{
            //     // console.log('OK!');
            //     // continue
            // }
        }
        return false;
    }

}

export default Validator;

// passLength(){
//     return !(this.value.length < this.minPassLen);
// }

 // isEmpty(){
    //     return !this.value;
    // }

    // startsWithNum(){
    //     return /^\d/.test(this.value);
    // }

    // containsSpaces(){
    //     return /\s/.test(this.value);
    // }

// return this.value.match('/^\d/') ? true : false;