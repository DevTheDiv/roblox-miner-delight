import { Workspace } from "@rbxts/services";
import console from "shared/console";

console.log("Roomgen!");


let Section = Workspace.WaitForChild("Section") as Model;




for(let i = 0; i < 99; i++) {
    // @ts-ignore
    let section = Section.Clone();
    section.Parent = Workspace;

    let floor = section.FindFirstChild("Floor") as BasePart;
    let { X : l, Y : w, Z : h } = floor.Size;


    // update all the parts with the new position
    section.GetDescendants().forEach((part : Instance) => {
        let p = part as BasePart;
        let { X : x, Y : y, Z : z } = p.Position;
        let pos = new Vector3(x + i*h, y - i*w, z);
        p.Parent = section;
        p.Position = pos;
    });
}

export default {}