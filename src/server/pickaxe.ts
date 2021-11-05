import { Workspace } from "@rbxts/services";
import console from "shared/console";
import { Players } from "@rbxts/services";
console.log("Pickaxe.ts has been loaded");


let Templates = Workspace.WaitForChild("Templates");



class Pickaxe {
    template : Tool;
    model : Tool;
    animation : Animation = new Instance("Animation");
    sound : {impact: Sound, swing: Sound} =  {
        impact : new Instance("Sound") ,
        swing  : new Instance("Sound"),
    }

    
    beingUsed = false;

    constructor() {
        this.template = Templates.FindFirstChild("Pickaxe") as Tool;
        this.model = this.template.Clone() as Tool;
        let child = this.model.FindFirstChild("Handle_") as MeshPart;
        child.Name = "Handle";


        // The work space will be the default parent for a new object
        this.model.Parent = Workspace;
        this.model.Name = "Pickaxe";
        this.model.ManualActivationOnly = false;

        this.animation.AnimationId = "rbxassetid://7890842145";
        this.animation.Name = "Pickaxe Animation";
        this.animation.Parent = this.model;

        this.sound.impact.SoundId = "rbxassetid://7380609515";
        this.sound.impact.Name = "Pickaxe Impact Sound";
        this.sound.impact.Parent = this.model;

        this.init();
    }

    init() : void {
        let handle = this.model.FindFirstChild("Handle") as MeshPart;

        // if touch was detected
        handle.Touched.Connect(( part: BasePart) => {
            this.onTouched(part);
        });

        // if equipped
        this.model.Equipped.Connect(() => {         
            this.onEquipped();
        });
    }

    private onEquipped() : void {
        let human = this.model.Parent?.WaitForChild("Humanoid") as Humanoid;
        let animator : Animator = human.WaitForChild("Animator") as Animator;
        let anime = animator.LoadAnimation(this.animation) as AnimationTrack;
        anime.Priority = Enum.AnimationPriority.Action;
        this.model.Activated.Connect(() => {
            anime.Play();
            this.beingUsed = true;
        })
        this.model.Deactivated.Connect(() => {
            anime.Stop();
            this.beingUsed = false;

        })
        this.model.Unequipped.Connect(() => {
            anime.Stop();
            this.beingUsed = false;
        });
    }
    private onUnequipped() : void {

    }


    private onTouched(part: BasePart) : void {

        if (this.beingUsed) {
            //rbxassetid://7380609515
            this.sound.impact.Play();
            console.log("Touched: " + part.Name);
        }
    }


    setPosition(position: Vector3) : void {
        let handle = this.model.FindFirstChild("Handle") as MeshPart;
        handle.Position =  position;
    }

    setParent(parent: Instance) : void {
        this.model.Parent = parent;
    }

    setColor(color: Color3) : void {
        let handle = this.model.FindFirstChild("Handle") as MeshPart;
        handle.Color = color;
    }
}


export default Pickaxe;



