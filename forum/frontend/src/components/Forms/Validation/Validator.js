const minUsernameLen = 3;
const maxUsernameLen = 50;
const minPassLen = 5;


function isEmpty(value){
    return !value ? 'Please enter value' : false;
}
function startsWithNum(value){
    return /^\d/.test(value) ? 'Username can\'t start with number' : false;
}
function containsSpaces(value){
    return /\s/.test(value) ? 'Username can\'t contain spaces' : false;
}
function passLength(value){
    return (value.length < minPassLen) ? 'Minumum ' + minPassLen.toString() + ' symbols' : false;
}
function usernameLength(value){
    return (value.length < minUsernameLen || value.length > maxUsernameLen) ? 'Username length is from 3 to 50 symbols.' : false;
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

        this.rules = {
            'username': [isEmpty, startsWithNum, containsSpaces, usernameLength],
            'email': [isEmpty, validateEmail],
            'password': [isEmpty, passLength]
        }
    }

    //  TODO!!!

    validate(){
        var rules = this.rules[this.field];
        for(let i = 0; i < rules.length; i++){
            // if(typeof this.value === 'string' || this.value instanceof String){
            //     let result = rules[i](this.value);
            // }else{
            //     let
            // }
            let result = rules[i](this.value);
            if(result){
                return result;
            }
        }
        return false;
    }

}

export default Validator;