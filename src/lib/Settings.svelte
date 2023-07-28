<script lang="ts">
	import { font, pomodoro, shortBreak, longBreak, accent } from "./stores";
	let open: boolean = false;

	function toggle() {
		open = !open;
	}

	function save() {
		localStorage.setItem("pomodoro", JSON.stringify($pomodoro));
		localStorage.setItem("shortBreak", JSON.stringify($shortBreak));
		localStorage.setItem("longBreak", JSON.stringify($longBreak));
		localStorage.setItem("font", JSON.stringify($font));
		localStorage.setItem("accent", JSON.stringify($accent));

		toggle();
	}
</script>

<dialog open="{open}">
	<div class="set-header">
		<h2>Settings</h2>
		<button on:click="{toggle}"
			><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
				><path
					class="{$accent}"
					fill="#1E213F"
					fill-rule="evenodd"
					d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
					opacity=".5"></path></svg
			></button
		>
	</div>
	<div class="set-content">
		<div class="set-time">
			<h4>Time (minutes)</h4>
			<div class="time-inputs">
				<div class="input">
					<label for="pomodoro">pomodoro</label>
					<input type="number" name="pomodoro" class="{$font}" id="pomodoro" bind:value="{$pomodoro}" />
				</div>
				<div class="input">
					<label for="short_break">short break</label>
					<input type="number" name="short_break" class="{$font}" id="short_break" bind:value="{$shortBreak}" />
				</div>
				<div class="input">
					<label for="long_break">long break</label>
					<input type="number" name="long_break" class="{$font}" id="long_break" bind:value="{$longBreak}" />
				</div>
			</div>
		</div>
	</div>
	<div class="set-font">
		<h4>font</h4>
		<div class="font-inputs">
			<div class="font">
				<input
					type="radio"
					id="sans"
					name="font"
					value="sans"
					on:change="{() => {
						font.set('sans');
					}}"
					checked="{$font === 'sans' ? true : false}"
				/>
				<label for="sans" class="sans">Aa </label>
			</div>
			<div class="font">
				<input
					type="radio"
					id="serif"
					name="font"
					value="serif"
					on:change="{() => {
						font.set('serif');
					}}"
					checked="{$font === 'serif' ? true : false}"
				/>
				<label for="serif" class="serif">Aa</label>
			</div>
			<div class="font">
				<input
					type="radio"
					id="mono"
					name="font"
					value="mono"
					on:change="{() => {
						font.set('mono');
					}}"
					checked="{$font === 'mono' ? true : false}"
				/>
				<label for="mono" class="mono">Aa</label>
			</div>
		</div>
	</div>

	<div class="set-accent">
		<h4>Accent</h4>
		<div class="colors">
			<div class="color">
				<input type="radio" id="aqua" name="aqua" value="Aqua" bind:group="{$accent}" />
				<label for="aqua" class="aqua"></label>
			</div>
			<div class="color">
				<input type="radio" id="purple" name="purple" value="Purple" bind:group="{$accent}" />
				<label for="purple" class="purple"></label>
			</div>
			<div class="color">
				<input type="radio" id="red" name="red" value="Red" bind:group="{$accent}" />
				<label for="red" class="red"></label>
			</div>
		</div>
	</div>

	<div class="set-footer">
		<button class="{$accent} {$font}" on:click="{save}">Apply</button>
	</div>
</dialog>

<button on:click="{toggle}"
	><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
		><path
			class="{$accent}"
			fill="#D7E0FF"
			d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
			opacity=".5"></path></svg
	></button
>

<style lang="scss">
	@import "./app.scss";

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;

		path {
			@include transition(all);
			stroke: none !important;
		}

		&:hover {
			path.Aqua {
				fill: $accentAqua;
				opacity: 1;
			}

			path.Purple {
				fill: $accentPurple;
				opacity: 1;
			}

			path.Red {
				fill: $accentRed;
				opacity: 1;
			}
		}
	}

	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 540px;
		border: none;
		border-radius: 25px;
		z-index: 9999;

		@media (width >= $tablet) {
			@include size($height: auto);
		}

		@media (width < $tablet) {
			@include size(calc(100vw - 20px), auto);
		}

		h4 {
			@include h4();
		}

		.set-header {
			@include flex(space-between, center);
			padding: 40px;
			border-bottom: 1px solid $border;

			h2 {
				@include h2();
			}
		}

		.set-time {
			margin-inline: 40px;
			padding-block: 28px;
			border-bottom: 1px solid $border;

			.time-inputs {
				@media (width >= $tablet) {
					padding-top: 28px;
					@include size(100%, auto);
					@include flex(space-evenly, start, row, 1rem);
				}

				@media (width < $tablet) {
					@include size(100%, auto);
					@include flex($direction: column, $gap: 28px);
				}
				.input {
					@media (width >= $tablet) {
						@include size(auto, auto);
						@include flex(start, start, column, 0.5rem);
					}

					@media (width < $tablet) {
						@include size(100%, auto);
						@include flex(space-between, center, row, 0.5rem);
					}

					label {
						@include label();
					}

					input {
						@media (width >= $tablet) {
							@include size(100%, 48px);
						}

						@media (width < $tablet) {
							@include size(50%, 48px);
						}

						padding: 1rem;
						border-radius: 10px;
						border: none;
						background-color: $gray;
						font-weight: 700;
						color: $blue;
					}
				}
			}

			@media (width >= $tablet) {
				@include flex(start, start, column);
				.time-inputs {
					padding-top: 28px;
					@include size(100%, auto);
					@include flex(space-evenly, start, row, 1rem);
				}
			}
			@media (width < $tablet) {
				@include flex($direction: column, $gap: 28px);
			}
		}

		.set-font {
			margin-inline: 40px;
			padding-block: 28px;
			border-bottom: 1px solid $border;

			.font-inputs {
				@include flex(end, center, row, 1rem);

				.font {
					label {
						@include flex();
						@include size(40px, 40px);
						@include transition(all);
						border-radius: 50px;
						background-color: $gray;
						cursor: pointer;
					}

					input[type="radio"] {
						display: none;
					}

					input[type="radio"]:checked + label {
						background-color: $blue;
						color: $white;
					}
				}
			}

			@media (width >= $tablet) {
				@include flex(space-between);
			}
			@media (width < $tablet) {
				@include flex($direction: column, $gap: 28px);
			}
		}

		.set-accent {
			margin-inline: 40px;
			padding-block: 28px;

			.colors {
				@include flex(end, center, row, 1rem);

				.color {
					label {
						@include flex();
						@include size(40px, 40px);
						@include transition(all);
						border-radius: 50px;
						background-color: $gray;
						cursor: pointer;
					}

					input[type="radio"] {
						display: none;
					}

					#aqua + label {
						background-color: $accentAqua;
					}

					#purple + label {
						background-color: $accentPurple;
					}

					#red + label {
						background-color: $accentRed;
					}

					input[type="radio"]:checked + label {
						&::after {
							content: url("../assets/checkmark.svg");
							@include flex(center, center);
							@include size(100%, 100%);
							color: $white;
						}
					}
				}
			}

			@media (width >= $tablet) {
				@include flex(space-between);
			}

			@media (width < $tablet) {
				@include flex($direction: column, $gap: 28px);
			}
		}

		.set-footer {
			@include flex();
			@include size(100%);

			button {
				@include size(100%, 53px);
				position: relative;
				top: 25px;
				max-width: 140px;
				border-radius: 26px;
				color: $white;
				@include transition(background-color);
			}
		}
	}
</style>
