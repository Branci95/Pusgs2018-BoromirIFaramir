export class Users{
    
        constructor(
            public FullName: string,
            public Email: string,
            public DateOfBirth: Date,
            public Password: string,
            public ConfirmPassword: string
        ){ }
    }

export class ChangePassword {
    public Email: string;
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(email: string ,oldPassword: string, newPassword: string, confirmPassword: string) {
        this.Email = email;
        this.OldPassword = oldPassword;
        this.NewPassword = newPassword;
        this.ConfirmPassword = confirmPassword;
    }
}