import { GPU } from 'gpu.js'
const gpu = new GPU();

const PI = Math.PI
const TWO_PI = 2 * PI
const MIN_STEP_LEN = 1
const MAX_STEP = 10


const circleSDF = function (x: number, y: number, info: Circle): number {
	const dx = x - info.x
	const dy = y - info.y
	return Math.sqrt(dx * dx + dy * dy) - info.r
}

const addLight = function (l1: Light, l2: Light): Light {
	return {
		r: l1.r + l2.r,
		b: l1.b + l2.b,
		g: l1.g + l2.g,
	}
}

const divLight = function (l1: Light, n: number): Light {
	return {
		r: l1.r / n,
		g: l1.g / n,
		b: l1.b / n,
	}

}

export default class Runner {
	N: number
	width: number
	hight: number
	max_distance: number
	circleInfos: Circle[]
	calculate: any
	constructor(N: number, width: number, hight: number) {
		this.N = N
		this.width = width
		this.hight = hight
		this.max_distance = hight > width ? hight : width;
		this.circleInfos = []
		this.calculate = this.newCalculate()
	}

	newCalculate() {
		return gpu.createKernel(function () {
			function test() {
				return 0
			}
			return test()
		}, {
			constants: {
				N: this.N,
				max_distance: this.max_distance,
				PI: Math.PI,
				TWO_PI: 2 * PI,
				MIN_STEP_LEN: 1,
				MAX_STEP: 20
			},
			output: [this.width, this.hight, this.N],
		})
	}

	init(N: number, width: number, hight: number) {
		this.N = N
		this.width = width
		this.hight = hight
		this.max_distance = hight > width ? hight : width;
	}


	setCircles(circleInfos: Circle[]) {
		this.circleInfos = circleInfos
	}

	run(): number[][][] {
		const ret = []
		for (let x = 0; x < this.width; x++) {
			const line = []
			for (let y = 0; y < this.hight; y++) {
				const l = this.sample(x, y)
				line.push([l.r, l.g, l.b])
			}
			ret.push(line)
		}

		return ret
	}


	SDF(x: number, y: number): { st: number, light: Light } {
		let st = circleSDF(x, y, this.circleInfos[0])
		let light = this.circleInfos[0].light
		for (const circleInfo of this.circleInfos) {
			const dt = circleSDF(x, y, circleInfo)
			if (dt < st) {
				st = dt
				light = circleInfo.light
			}
		}
		return { st, light }
	}

	trace(x: number, y: number, dx: number, dy: number): Light {
		let d = 0
		for (let i = 0; i < MAX_STEP && d < this.max_distance; i++) {
			const { st, light } = this.SDF(x + dx * d, y + dy * d)
			if (st < MIN_STEP_LEN) {
				return light
			}

			d = d + st
		}

		return { r: 0, g: 0, b: 0 }
	}



	sample(x: number, y: number): Light {
		let sum = { r: 0, g: 0, b: 0 }
		for (let i = 0; i < this.N; i++) {
			const a = TWO_PI * (i + Math.random()) / this.N
			sum = addLight(sum, this.trace(x, y, Math.cos(a), Math.sin(a)))
		}
		return divLight(sum, this.N)
	}
}
