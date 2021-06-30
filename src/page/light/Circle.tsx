import { GPU } from 'gpu.js';
import { useEffect, useState } from 'react';
import Runner from '../../lib/run';
import GPURunner from '../../lib/gpuRun';
const width = 100
const hight = 100

const gpu = new GPU();

/* @ts-ignore */
const render = gpu.createKernel(function (values) {
	/* @ts-ignore */
	this.color(values[this.thread.x][this.thread.y][0], values[this.thread.x][this.thread.y][1], values[this.thread.x][this.thread.y][2], 1);
}).setOutput([width, hight]).setGraphical(true);

const canvas = render.canvas;

const circleInfos: Circle[] = []

function addCircleInfos(info: Circle) {
	circleInfos.push({
		x: info.x * width,
		y: info.y * hight,
		r: info.r * hight,
		light: info.light
	})
}

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

addCircleInfos({
	x: 0.5,
	y: 0.5,
	r: 0.1,
	light: { r: 2, g: 2, b: 2 },
})

export default function Circle() {
	const [N, setN] = useState<number>(64)

	function Run() {
		render();
		window.requestAnimationFrame(Run)
	}

	useEffect(() => {
		const dom = window.document.getElementById('Circle')
		if (dom) {
			dom.appendChild(canvas)!;
			const runner = new GPURunner(N, width, hight)
			runner.setCircles(circleInfosToGPUCircle(circleInfos))
			const ret = runner.run()
			console.log(ret)
			/* @ts-ignore */
			// render(ret)
		}
	}, [])

	return (
		<div id="Circle">
		</div>
	)
}