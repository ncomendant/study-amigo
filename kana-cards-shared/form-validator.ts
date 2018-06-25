
declare function require(moduleName:string):any;
let DataValidator = require('./lib/data-validator');

export class FormValidator {

    public static validateUsername(username:string, onFail:any = null):boolean {
        return new DataValidator(username)
            .isType("string", onFail, "Username must be a string.")
            .regex(/^\S*$/, onFail, "Username cannot contain spaces.")
            .greaterThan(0, onFail, "Username cannot be blank.")
            .not.greaterThan(50, onFail, "Usernames cannot be greater than 50 characters.")
            .valid;
    }

    public static validatePassword(password:string, onFail:any = null):boolean {
        return new DataValidator(password)
            .isType("string", onFail, "Password must be a string.")
            .greaterThan(0, onFail, "Password cannot be blank.")
            .not.greaterThan(256, onFail, "Password cannot be greater than 256 characters.")
            //.not.lessThen(6, onFail, "Password must be at least 6 characters.")
            .valid;
    }

    private constructor(){}
}