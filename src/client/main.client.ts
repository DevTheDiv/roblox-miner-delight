// externals
import { Client as SimpleSignals } from "@rbxts/simplesignals";

// internals
import { setInterval, setTimeout, clearInterval } from "shared/timers";
import console from "shared/console";
import { Players } from "@rbxts/services";


// let the server know the client has connected
SimpleSignals.fire("connected");

SimpleSignals.on("welcome", () => {
	console.log(
		"Welcome to the server! " + 
		Players.LocalPlayer.GetFullName()
	);
});