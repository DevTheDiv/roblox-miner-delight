// externals
import Object from "@rbxts/object-utils";
import { Server as SimpleSignals } from "@rbxts/simplesignals";
//https://www.npmjs.com/package/@rbxts/networked-signals
import { Chat, Players, Workspace } from "@rbxts/services";
import { setInterval, setTimeout, clearInterval } from "shared/timers";
import console from "shared/console";

// import * as Roomgen from "./roomgen";

// import Collectable from "./collectable";


import Mineables from "./mineables";


import Pickaxe from "./pickaxe";
let spawner : BasePart = Workspace.GetChildren().filter(c => c.Name === "Pickaxe Spawn")[0] as BasePart;
let pickaxeb = new Pickaxe();
let pos = new Vector3(spawner.Position.X, spawner.Position.Y + 3, spawner.Position.Z);
pickaxeb.setParent(spawner);
pickaxeb.setPosition(pos);
pickaxeb.setColor(Color3.fromRGB(0, 255, 235));


// // example of collectable with spawner
// setInterval(() => {
// 	let GemSpawn  : BasePart[] = Workspace.GetChildren().filter(c => c.Name === "Gem Spawn") as BasePart[];
//     let collectable : Collectable | undefined = new Collectable("Gem", GemSpawn[0]);
//     let vector = new Vector3(GemSpawn[0].Position.X , GemSpawn[0].Position.Y + 5,  GemSpawn[0].Position.Z);
//     collectable.setPostion(vector);
//     collectable.setParent(GemSpawn[0]);

// 	// this "may" clean up the class if the opbject no longer exists
//     collectable.destroy = () => {
//         collectable = undefined;
//     };
// } , 1000);



let OreSpawn  : BasePart[] = Workspace.GetDescendants().filter(c => c.Name === "Ore Spawn") as BasePart[];
OreSpawn.forEach(spawner => {
	let vector = new Vector3(spawner.Position.X , spawner.Position.Y + 5,  spawner.Position.Z);
	let min = new Mineables(vector, spawner);
});


// internals


// welcomes the player to the server
SimpleSignals.on("connected", (player : Player) => {
	console.log(player.Character);
	console.log(player.Name, "Connected To The Server");

	SimpleSignals.fire("welcome", player);
});
