export class Vehicle{
    
        constructor(
            public TypeOfVehicle: string,
            public Model: string,
            public Manufactor: string,
            public Year: number,
            public Image: string,
            public Description: string,
            public PricePerHour: number,
            public ServerName: string
        ){ }
    }