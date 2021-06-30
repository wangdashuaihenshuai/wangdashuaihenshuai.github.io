import { GPU } from 'gpu.js';
import { useEffect, useState } from 'react';
import { Slider, Switch } from 'antd';
import { Form, Input, Button, Radio } from 'antd';
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

let render: any = null

const initCanvas = function () {
	render = gpu.createKernel(function (circles: number[][][], lightInfos: number[][][], N: number) {
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
		.setGraphical(true)
	const dom = window.document.getElementById('GPUCircle')
	if (dom) {
		dom.innerHTML = '';
		dom.appendChild(render.canvas);
	}
}

/* @ts-ignore */

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

const circleSDF = function (x: number, y: number, info: Circle): number {
	const dx = x - info.x
	const dy = y - info.y
	return Math.sqrt(dx * dx + dy * dy) - info.r
}

const selectCircle = function (x: number, y: number): Circle | null {
	for (const circleInfo of circleInfos) {
		const r = circleSDF(x, y, circleInfo)
		console.log(circleInfo, r, x, y)
		if (r <= 0) {
			return circleInfo
		}
	}

	return null
}

addCircleInfos({
	x: 0.3,
	y: 0.3,
	r: 0.1,
	light: { r: 0, g: 2, b: 0 },
})

const frame = function (runner: GPURunner) {
	const gpuCircle = circleInfosToGPUCircle(circleInfos)
	runner.setCircles(gpuCircle)
	const lightInfo = runner.run()
	/* @ts-ignore */
	render(gpuCircle, lightInfo, runner.N)
}


export default function GPUCircle() {
	const [N, setN] = useState<number>(2)
	const runner = new GPURunner(N, width, hight)
	function Run() {
		frame(runner);
		window.requestAnimationFrame(Run)
	}

	const onNChange = function (value: number) {
		runner.setN(value)
		initCanvas()
	};

	const onClick = function (event: any) {
		const { pageX, pageY } = event
		console.log("select", selectCircle(pageX, pageY))
	}


	useEffect(() => {
		initCanvas()
		Run()
	}, [])

	return (
		<div onClick={onClick}>
			<div id="GPUCircle">
			</div>
			<div className="stop-bar">
				<Switch defaultChecked checkedChildren="启动" />
				<Slider min={1} max={20} onAfterChange={onNChange} defaultValue={N} />
			</div>
			<div className="tool-bar">
				<Form labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }} >
					<Form.Item label="半径r" required tooltip="r">
						<Slider range defaultValue={[0, 100]} />
					</Form.Item>
					<Form.Item label="R" required tooltip="R">
						<Slider range defaultValue={[0, 100]} />
					</Form.Item>
					<Form.Item label="G" required tooltip="G">
						<Slider range defaultValue={[0, 100]} />
					</Form.Item>
					<Form.Item label="B" required tooltip="B">
						<Slider range defaultValue={[0, 100]} />
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}