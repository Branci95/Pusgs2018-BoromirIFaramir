export class Rent{
    public End:Date;
    public Branch:number;
    public Vehicle:number;
    public User:string;

    constructor(branch:number){
        this.Branch = branch;
    }
}