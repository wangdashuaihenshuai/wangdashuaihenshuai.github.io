import { GPU } from 'gpu.js';
import { useEffect, useState } from 'react';
import GPURunner from '../../lib/gpuRun';
const width = window.innerWidth
const hight = window.innerHeight

const gpu = new GPU();

function circleInfosToGPUCircle(infos: Circle[]): number[][][] {
	const ret = []
	for (const info of infos) {
		ret.push(
			[
				[info.x, info.y, info.r],
				[info.light.r, info.light.g, info.light.b]
			]
		)
	}

	return ret
}

/* @ts-ignore */
const render = gpu.createKernel(function (circles: number[][][], lightInfos: number[][][], N: number) {
	/* @ts-ignore */
	let r = 0
	let g = 0
	let b = 0
	for (let index = 0; index < N; index++) {
		const lightIndex = lightInfos[index][this.thread.x][this.thread.y]
		if (lightIndex >= 0) {
			r = r + circles[lightIndex][1][0]
			g = g + circles[lightIndex][1][1]
			b = b + circles[lightIndex][1][2]
		}
	}
	this.color(r / N, g / N, b / N, 1);
}).setOutput([width, hight])
	.setGraphical(true);

const canvas = render.canvas;

const circleInfos: Circle[] = []

function addCircleInfos(info: Circle) {
	circleInfos.push({
		x: info.x * hight,
		y: info.y * width,
		r: info.r * hight,
		light: info.light
	})
}

addCircleInfos({
	x: 0.5,
	y: 0.5,
	r: 0.1,
	light: { r: 2, g: 0, b: 2 },
})

addCircleInfos({
	x: 0.3,
	y: 0.3,
	r: 0.1,
	light: { r: 0, g: 2, b: 0 },
})

export default function GPUCircle() {
	const [N, setN] = useState<number>(32)
	console.log(setN)

	// function Run() {
	// 	render();
	// 	window.requestAnimationFrame(Run)
	// }

	useEffect(() => {
		const dom = window.document.getElementById('GPUCircle')
		if (dom) {
			dom.appendChild(canvas)!;
			const runner = new GPURunner(N, width, hight)
			const gpuCircle = circleInfosToGPUCircle(circleInfos)
			runner.setCircles(gpuCircle)
			const lightInfo = runner.run()
			console.log(lightInfo, width, hight)
			/* @ts-ignore */
			render(gpuCircle, lightInfo, N)
		}
	}, [N])

	return (
		<div id="GPUCircle">
		</div>
	)
}