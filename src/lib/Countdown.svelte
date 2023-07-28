<script lang="ts">
	import { font, accent, pomodoro, shortBreak, longBreak } from "./stores";

	pomodoro.subscribe((value) => {
		return value;
	});

	shortBreak.subscribe((value) => {
		return value;
	});

	longBreak.subscribe((value) => {
		return value;
	});

	const CIRCUMFERENCE = 1067.6;
	let progress = 0;
	$: time = $pomodoro;
	$: minutes = time;
	let seconds = 0;
	let timerRunning = false;
	let timerText = "start";
	$: titleString = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} - Pomodoro`;

	function offset(percent: number) {
		const progress = CIRCUMFERENCE * ((100 - percent) / 100);
		return progress;
	}

	function setTime(timer: string) {
		switch (timer) {
			case "pomodoro":
				progress = 0;
				time = $pomodoro;
				minutes = time;
				seconds = 0;
				break;
			case "short_break":
				progress = 0;
				time = $shortBreak;
				minutes = time;
				seconds = 0;
				break;
			case "long_break":
				progress = 0;
				time = $longBreak;
				minutes = time;
				seconds = 0;
				break;
		}
	}

	function startTimer() {
		timerRunning = !timerRunning;
		const timerLengthShort = time > 5 ? false : true;
		const interval = setInterval(() => {
			if (timerRunning) {
				timerText = "pause";
				if (minutes === 0 && seconds === 0) {
					clearInterval(interval);
					minutes = time;
					timerRunning = false;
					timerText = "start";
					return;
				}

				if (seconds === 0) {
					minutes--;
					seconds = 59;
				} else {
					seconds--;
				}

				if (minutes === 0 && seconds === 0) {
					progress = 100;
				} else if (!timerLengthShort) {
					progress = Math.round(((time - (minutes + 1)) / time) * 100);
				} else {
					progress = Math.round((1 - (minutes * 60 + seconds) / (time * 60)) * 100);
				}
			} else {
				clearInterval(interval);
				timerRunning = false;
				timerText = "start";
			}
		}, 10);
	}
</script>

<svelte:head>
	<title>
		{titleString}
	</title>
</svelte:head>

<section>
	<div class="switch {$accent}">
		<div class="font">
			<input type="radio" id="pomodoro" name="timer" value="pomodoro" checked on:change="{() => setTime('pomodoro')}" />
			<label for="pomodoro" class="pomodoro">pomodoro</label>
		</div>
		<div class="font">
			<input type="radio" id="short_break" name="timer" value="short_break" on:change="{() => setTime('short_break')}" />
			<label for="short_break" class="short_break">short break</label>
		</div>
		<div class="font">
			<input type="radio" id="long_break" name="timer" value="long_break" on:change="{() => setTime('long_break')}" />
			<label for="long_break" class="long_break">long break</label>
		</div>
	</div>
	<div class="timer">
		<div class="progress">
			{#if progress !== 0}
				<svg width="400" height="400" viewBox="0 0 400 400" style="transform: rotate(-90deg)">
					<circle r="165" cx="200" cy="200" fill="transparent" stroke="transparent" stroke-width="16px"></circle>
					<circle
						class="progress-circle {$accent}"
						r="170"
						cx="200"
						cy="200"
						fill="transparent"
						stroke="#e0e0e0"
						stroke-linecap="round"
						stroke-width="16px"
						stroke-dasharray="1067.6px"
						stroke-dashoffset="{offset(progress)}"
					>
					</circle>
				</svg>
			{/if}
			<div class="text">
				<div class="time">
					{#if minutes < 10}0{/if}{minutes}:{#if seconds < 10}0{/if}{seconds}
				</div>
				<button class="pause {$font}" on:click="{startTimer}">{timerText}</button>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import "./app.scss";

	section {
		@include flex($direction: column, $gap: $gap);
	}

	.switch {
		@include size(410px, 63px);
		@include flex(space-between);
		background-color: $darkBlue;
		border-radius: 31.5px;
		padding-inline: 0.5rem;
		z-index: 1;

		@media (width < $tablet) {
			@include size(360px, 63px);
		}

		label {
			@include flex();
			@include size(120px, 48px);
			@include transition(all);
			border-radius: 50px;
			cursor: pointer;

			@media (width < $tablet) {
				@include size(100px, 48px);
			}
		}

		input[type="radio"] {
			display: none;
		}

		&.Aqua {
			input[type="radio"]:checked + label {
				background-color: $accentAqua;
				color: $white;
			}
		}

		&.Purple {
			input[type="radio"]:checked + label {
				background-color: $accentPurple;
				color: $white;
			}
		}

		&.Red {
			input[type="radio"]:checked + label {
				background-color: $accentRed;
				color: $white;
			}
		}
	}

	.timer {
		@include size(410px, 410px);
		@include flex();
		background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
		box-shadow: 50px 50px 100px 0px #121530, -50px -50px 100px 0px #272c5a;
		border-radius: 100%;
		position: relative;
		@media (width < $tablet) {
			@include size(360px, 360px);
		}

		.progress {
			@include size(360px, 360px);
			@include flex();
			background-color: $darkBlue;
			border-radius: 100%;
			position: absolute;

			@media (width < $tablet) {
				@include size(300px, 300px);
			}
		}

		.text {
			position: absolute;
			@include flex(center, center, column, 0);

			.time {
				@include h1();
				color: $white;

				@media (width < $tablet) {
					@include h1(75px);
					color: $white;
				}
			}

			.pause {
				@include h3();
				color: $white;
				cursor: pointer;
				background-color: transparent;
				border: none;
				margin-left: 1.25rem;
			}
		}
	}
</style>
