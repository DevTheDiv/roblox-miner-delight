import { Workspace } from "@rbxts/services";
import console from "shared/console";
import { Players } from "@rbxts/services";
console.log("Mineables.ts has been loaded");


let Templates = Workspace.WaitForChild("Templates");

class Mineable {
    template = Templates.FindFirstChild("Mineable");
    stages : string[] = ["stage_0", "stage_1", "stage_2"];
    stage = 0;
    mesh : MeshPart;
    health = 100;

    sound = new Instance("Sound");

    constructor(position: Vector3 = new Vector3(0,0,0), parent: Instance = Workspace){
        // @ts-ignore
        this.mesh = this.template.GetChildren()[this.stage].Clone() as MeshPart;
        this.mesh.Position = position;
        this.mesh.Parent = parent;

        this.sound.SoundId = "rbxassetid://4050718565";


        this.init();
    }

    init(mesh: MeshPart = this.mesh){
        this.mesh = mesh;

        console.log("Init on mesh " + this.mesh.Name);

        this.sound = new Instance("Sound");
        this.sound.SoundId = "rbxassetid://4050718565";
        this.sound.Parent = this.mesh;
        this.sound.Play();

        this.mesh.Touched.Connect((part: BasePart) => {
            if(part.Name === "Handle"){
                this.takeDamage(5);
            }
        });
    }

    private takeDamage(damage: number){
        // this is acually subtracting health with a negative number
        this.health -= damage;
        if(this.health <= 66 && this.health > 33){
            this.swapMesh(1);
        }
        if(this.health <= 33 && this.health > 0){
            this.swapMesh(2);
        }
        if(this.health <= 0){
            this.mesh.Destroy()
        }
    }

    private swapMesh(stage: number){

        if(this.stage === stage) return;
        this.stage = stage;
        // @ts-ignore
        let template = this.template.FindFirstChild(this.stages[stage]) as MeshPart;
        let newMesh = template.Clone() as MeshPart;
        let oldMesh = this.mesh;

        newMesh.Parent = oldMesh.Parent;
        newMesh.Position = oldMesh.Position;
        oldMesh.Destroy();
        this.mesh = newMesh;
        this.init(this.mesh);
    }
}


export default Mineable;



