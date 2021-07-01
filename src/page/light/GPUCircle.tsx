import { GPU } from 'gpu.js';
import { useEffect, useState } from 'react';
import { Slider, Switch } from 'antd';
import { Form } from 'antd';
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
		r = r / N
		if (r > 1) {
			r = 1
		}

		g = g / N
		if (g > 1) {
			g = 1
		}

		b = b / N
		if (b > 1) {
			b = 1
		}
		this.color(r, g, b, 1);
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
	x: 1,
	y: 1,
	r: 0.1,
	light: { r: 0, g: 0, b: 2 },
})

const circleSDF = function (x: number, y: number, info: Circle): number {
	const dx = x - info.x
	const dy = y - info.y
	return Math.sqrt(dx * dx + dy * dy) - info.r
}

const findCircle = function (x: number, y: number): Circle | null {
	for (const circleInfo of circleInfos) {
		const r = circleSDF(x, y, circleInfo)
		if (r <= 0) {
			return circleInfo
		}
	}

	return null
}

const number = 5
for (let index = 0; index < number; index++) {
	addCircleInfos({
		x: 0,
		y: 0,
		r: 0.1 * Math.random(),
		light: { r: 2 * Math.random(), g: 2 * Math.random(), b: 2 * Math.random() },
	})
}



const frame = function (runner: GPURunner) {
	const gpuCircle = circleInfosToGPUCircle(circleInfos)
	runner.setCircles(gpuCircle)
	const lightInfo = runner.run()
	/* @ts-ignore */
	render(gpuCircle, lightInfo, runner.N)
}

const getXYFromEvent = function (event: any): { x: number, y: number } {
	const { pageX, pageY } = event
	const x = hight - pageY
	const y = pageX
	return { x, y }
}

let state = "sleep"

let N = 2
let LastN = 2
let selectCircle: Circle | null = null
export default function GPUCircle() {
	const [openWindow, setOpenWindow] = useState<boolean>(false)
	const runner = new GPURunner(N, width, hight)
	function Run() {
		frame(runner);
		window.requestAnimationFrame(Run)
	}

	const onNChange = function (value: number) {
		N = value
		initCanvas()
		runner.setN(value)
	};

	const onClick = function (event: any) {
		const { x, y } = getXYFromEvent(event)
		selectCircle = findCircle(x, y)
	}

	const onOpenWindow = function (value: boolean) {
		setOpenWindow(value)
	}

	const onMouseDown = function (event: any) {
		const { x, y } = getXYFromEvent(event)
		const circle = findCircle(x, y)
		if (!circle) {
			return
		}

		state = "start"
		selectCircle = circle
	}

	const onMouseMove = function (event: any) {
		if (state !== "start" || selectCircle === null) {
			return
		}

		if (N !== 1) {
			LastN = N
			onNChange(1)
		}

		const { x, y } = getXYFromEvent(event)
		selectCircle.x = x
		selectCircle.y = y
	}

	const onMouseUp = function (event: any) {
		if (state === "start") {
			state = "sleep"
			console.log(LastN)
			onNChange(LastN)
		}
	}


	useEffect(() => {
		initCanvas()
		Run()
	})

	return (
		<div>
			<div id="GPUCircle" onClick={onClick} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
			</div>
			<div className="stop-bar" style={{ background: "#fff" }}>
				{selectCircle &&
					<Form.Item label="开启操作面板">
						<Switch onChange={onOpenWindow} />
					</Form.Item>
				}
				<Form.Item label="渲染质量" required tooltip="r">
					<Slider min={1} max={60} onAfterChange={onNChange} defaultValue={N} />
				</Form.Item>
			</div>
			{selectCircle && openWindow &&
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
			}
		</div>
	)
}