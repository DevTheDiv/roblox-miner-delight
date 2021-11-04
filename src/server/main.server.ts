// externals
import Object from "@rbxts/object-utils";
import { Server as SimpleSignals } from "@rbxts/simplesignals";
//https://www.npmjs.com/package/@rbxts/networked-signals
import { Chat, Players, Workspace } from "@rbxts/services";
import { setInterval, setTimeout, clearInterval } from "shared/timers";


import Collectable from "./collectable";

import Pickaxe from "./pickaxe";




// example of pickaxe with spawner
setInterval(() => {
	let spawner : BasePart = Workspace.GetChildren().filter(c => c.Name === "Pickaxe Spawn")[0] as BasePart;
	let pickaxeb = new Pickaxe();
	let pos = new Vector3(spawner.Position.X, spawner.Position.Y + 3, spawner.Position.Z);
	pickaxeb.setParent(spawner);
	pickaxeb.setPosition(pos);
	pickaxeb.setColor(Color3.fromRGB(0, 255, 235));
}, 5000);

// example of collectable with spawner
setInterval(() => {
	let GemSpawn  : BasePart[] = Workspace.GetChildren().filter(c => c.Name === "Gem Spawn") as BasePart[];
    let collectable : Collectable | undefined = new Collectable("Gem", GemSpawn[0]);
    let vector = new Vector3(GemSpawn[0].Position.X , GemSpawn[0].Position.Y + 5,  GemSpawn[0].Position.Z);
    collectable.setPostion(vector);
    collectable.setParent(GemSpawn[0]);

	// this "may" clean up the class if the opbject no longer exists
    collectable.destroy = () => {
        collectable = undefined;
    };
} , 1000);




// internals
import console from "shared/console";


// welcomes the player to the server
SimpleSignals.on("connected", (player : Player) => {
	console.log(player);
	console.log(player.Name, "Connected To The Server");
	SimpleSignals.fire("welcome", player);
});
