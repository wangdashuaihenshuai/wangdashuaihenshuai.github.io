import { trace } from 'console';
import { GPU } from 'gpu.js';
import { useEffect, useState } from 'react';
const gpu = new GPU();
const render = gpu.createKernel(function () {
	this.color(0, 0, 0, 1);
}).setOutput([1080, 960]).setGraphical(true);


function Run() {
	render();
	window.requestAnimationFrame(Run)
}

const canvas = render.canvas;

const PI = Math.PI
const TWO_PI = 2 * PI
const MIN_STEP_LEN = 0.1
const MAX_STEP = 10
const MAX_DISTANCE = 1080

const Rand = function () {
	return Math.random()
}

interface CircleInfo {
	x: number
	y: number
}

export default function Circle() {
	const [N, setN] = useState<number>(64)
	const [circleInfos, setCircleInfos] = useState<CircleInfo[]>([])

	setCircleInfos([{
		x: 540,
		y: 480,
	}])

	const sqrt =

	const circleSDF = function (x: number, y: number, cx: number, cy: number, cr: number): number {
		const dx = x - cx
		const dy = y - cy
		return Math.sqrt(dx * dx + dy * dy) - cr
	}


	const sample = function (x: number, y: number): number {
		let sum = 0
		for (let i = 0; i < N; i++) {
			const a = TWO_PI * Rand()
			sum = sum + trace(x, y, Math.cos(a), Math.sin(a))
		}
		return sum / N
	}

	const SDF = function ()

	const trace = function (x: number, y: number, dx: number, dy: number): number {
		let d = 0
		for (let i = 0; i < MAX_STEP && d < MAX_DISTANCE; i++) {
			for (const circleInfo of circleInfos) {
				const st = 
			}
		}
	}

	useEffect(() => {
		const dom = window.document.getElementById('Circle')
		if (dom) {
			dom.appendChild(canvas)!;
			Run()
		}

	}, [])

	return (
		<div id="Circle">
		</div>
	)
}