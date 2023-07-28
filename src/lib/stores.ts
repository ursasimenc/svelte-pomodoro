import { writable } from "svelte/store";

const storedFont = localStorage.getItem("font");
const storedAccent = localStorage.getItem("accent");
const storedPomodoro = localStorage.getItem("pomodoro");
const storedShortBreak = localStorage.getItem("shortBreak");
const storedLongBreak = localStorage.getItem("longBreak");

export const font = storedFont == undefined ? writable("sans") : writable(JSON.parse(storedFont));
export const accent = storedAccent == undefined ? writable("Red") : writable(JSON.parse(storedAccent));
export const pomodoro = storedPomodoro == undefined ? writable(25) : writable(JSON.parse(storedPomodoro));
export const shortBreak = storedShortBreak == undefined ? writable(5) : writable(JSON.parse(storedShortBreak));
export const longBreak = storedLongBreak == undefined ? writable(15) : writable(JSON.parse(storedLongBreak));
