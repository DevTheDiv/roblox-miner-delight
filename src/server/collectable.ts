import { Workspace, CollectionService } from "@rbxts/services";
import console from "shared/console"
import { setInterval } from "shared/timers";
console.log("Collectables.ts has loaded!");

    
let Templates = Workspace.WaitForChild("Templates");



class Collectable {

    // since we can no longer create a MeshPart and assign it a meshID, and Special Meshes do not carry mesh collisions, we will clone from a template
    template : MeshPart;
    model : MeshPart;
    sound : Sound = new Instance("Sound");

    collected = false;

    constructor(templateName : string, parent : Instance){
        this.template = Templates.WaitForChild(templateName) as MeshPart;
        this.model = this.template.Clone();
        this.model.Name = "Gem";
        this.model.Transparency = 0;
        this.model.Parent = parent;
        this.model.Anchored = false;
        this.model.Color = Color3.fromRGB(255, 217, 0);
        this.sound.SoundId = "rbxassetid://3125624765";
        this.sound.Parent = this.model;


        // items to initialize so i do not flood the constructor
        this.init();
    }

    

    init(){
        this.model.Touched.Connect((part : BasePart) => {
            this.onTouched(part);
        });
    }

    destroy(){}

    private onTouched(part : BasePart){
        if(part.Parent?.FindFirstChild("Humanoid")) {
            if(this.collected) return;
            this.collected = true;
            this.model.Transparency = 1;
            this.playSound();
        };
    }
    

    playSound(){
        this.sound.Play();
		this.sound.Ended.Connect(() => {
            this.model.Destroy();
            this.destroy();
		});
    }

    setPostion(position : Vector3){
        this.model.Position = position;
    }

    setParent(parent : BasePart){
        this.model.Parent = parent;
    }
}


export default Collectable;


