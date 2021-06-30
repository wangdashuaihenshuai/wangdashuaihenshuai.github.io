import { GPU } from 'gpu.js'
const gpu = new GPU();

export default class GPURunner {
	N: number
	width: number
	hight: number
	max_distance: number
	circleInfos: number[][][]
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
		return gpu.createKernel(function (circleInfos: number[][][], length: number) {
			/* @ts-ignore */
			const a = this.constants.TWO_PI * (this.thread.z / 1.00 + Math.random()) / this.constants.N
			const cosA = Math.cos(a)
			const sinA = Math.sin(a)
			const x = this.thread.x
			const y = this.thread.y
			// 	/* @ts-ignore */

			let dx = x - circleInfos[0][0][0]
			let dy = y - circleInfos[0][0][1]
			let st = Math.sqrt(dx * dx + dy * dy) - circleInfos[0][0][2]

			let distance = 0
			let lightIndex = -1
			if (st < this.constants.MIN_STEP_LEN) {
				return 0
			}

			for (let i = 0; i < this.constants.MAX_STEP && distance < this.constants.max_distance; i++) {
				// 	/* @ts-ignore */
				let ox = x + distance * cosA
				let oy = y + distance * sinA

				for (let index = 0; index < length; index++) {
					let ddx = ox - circleInfos[index][0][0]
					let ddy = oy - circleInfos[index][0][1]
					const dt = Math.sqrt(ddx * ddx + ddy * ddy) - circleInfos[index][0][2]
					if (dt < st) {
						st = dt
						lightIndex = index
					}
				}

				/* @ts-ignore */
				if (st < this.constants.MIN_STEP_LEN) {
					return lightIndex
				}

				distance = distance + st
			}

			return -1
		}, {
			constants: {
				N: this.N,
				max_distance: this.max_distance,
				PI: Math.PI,
				TWO_PI: 2 * Math.PI,
				MIN_STEP_LEN: 0.1,
				MAX_STEP: 50
			},
			output: [this.hight, this.width, this.N],
		})
	}

	init(N: number, width: number, hight: number) {
		this.N = N
		this.width = width
		this.hight = hight
		this.max_distance = hight > width ? hight : width;
	}


	setCircles(circleInfos: number[][][]) {
		this.circleInfos = circleInfos
	}

	run(): number[][][] {
		return this.calculate(this.circleInfos, this.circleInfos.length)
	}
}