import { Section } from "./section";
import { App } from "../app";
import { NotificationType } from "../notification-type";
import { Path } from "../../../study-amigo-shared/path";
import { FormValidator } from "../../../study-amigo-shared/form-validator";

declare var $;

export class Join extends Section {

    private $form:any;
    private $usernameInp:any;
    private $passwordInp:any;
    private $repeatPasswordInp:any;
    private $loginLink:any;

    public constructor(app:App) {
        super("join", app);
        this.$form = $("#joinForm");
        this.$usernameInp = $("#joinUsernameInp");
        this.$passwordInp = $("#joinPasswordInp");
        this.$repeatPasswordInp = $("#joinRepeatPasswordInp");
        this.$loginLink = $("#joinLoginLink");

        //TODO - Better data validation
        this.$form.on("submit", async (event:any) => {
            event.preventDefault();

            let username:string = this.$usernameInp.val();
            let password:string = this.$passwordInp.val();
            let repeatPassword:string = this.$repeatPasswordInp.val();

            let validUsername:boolean = FormValidator.validateUsername(username, (err:string) => {
                this.app.notify(NotificationType.DANGER, err);
            });
            
            let validPassword:boolean = FormValidator.validatePassword(password, (err:string) => {
                this.app.notify(NotificationType.DANGER, err);
            });


            if (!validUsername || !validPassword) return;

            if (password !== repeatPassword) {
                this.app.notify(NotificationType.DANGER, "Passwords do not match.");
                return;
            }

            const data:any = await this.app.post(Path.JOIN, {username:username, password:password});
            if (data && data.err) {
                this.app.notify(NotificationType.DANGER, data.err);
            } else {
                this.$form[0].reset();
                this.hide();
                this.app.login.show();
                this.app.notify(NotificationType.SUCCESS, "Account created! Please login.");
            }
        });

        this.$loginLink.on("click", (event:any) => {
            event.preventDefault();
            this.$form[0].reset();
            this.hide();
            this.app.login.show();
        });
    }

    public show():void {
        super.show();
        this.$usernameInp.focus();
    }
    
}