export class Users{
    
        constructor(
            public FullName: string,
            public Email: string,
            public DateOfBirth: Date,
            public Password: string,
            public ConfirmPassword: string
        ){ }
    }