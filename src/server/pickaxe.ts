import { Workspace } from "@rbxts/services";
import console from "shared/console";
import { Players } from "@rbxts/services";
console.log("Pickaxe.ts has been loaded");


let Templates = Workspace.WaitForChild("Templates");



class Pickaxe {
    template : Tool;
    model : Tool;
    animation : Animation = new Instance("Animation");

    constructor() {
        this.template = Templates.FindFirstChild("Pickaxe") as Tool;
        this.model = this.template.Clone() as Tool;

        

        // The work space will be the default parent for a new object
        this.model.Parent = Workspace;
        this.model.Name = "Pickaxe";

        this.animation.AnimationId = "rbxassetid://7890842145";
        this.animation.Name = "Pick Axe";



        this.init();
    }

    init() : void {
        let handle = this.model.FindFirstChild("Handle") as MeshPart;
        handle.Touched.Connect(( part: BasePart) => {
            this.onTouched(part);
        });

        this.model.Equipped.Connect((mouse: Mouse) => {         
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
        })
        this.model.Deactivated.Connect(() => {
            anime.Stop();
        })
        this.model.Unequipped.Connect(() => {
            anime.Stop();
        });
    }
    private onUnequipped() : void {

    }


    private onTouched(part: BasePart) : void {
        console.log("Touched: " + part.Name);
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



