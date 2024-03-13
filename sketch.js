// Unified Rupture © 2023-04-15 by Zaron Chen is licensed under CC BY-NC-SA 3.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/3.0/

import { mountFlex } from "https://cdn.jsdelivr.net/npm/p5.flex@0.1.1/src/p5.flex.min.mjs"
import { vert, frag } from "./shader.js"

mountFlex(p5)

new p5((p) => {
	const [WIDTH, HEIGHT] = [600, 600]
	const PIXEL_DENSITY = 2
	const CANVAS_SIZE = [WIDTH, HEIGHT]
	let theShader

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT, p.WEBGL)
		p.flex({ container: { padding: "20px" }, canvas: { fit: p.SCALE_DOWN } })

		p.pixelDensity(PIXEL_DENSITY)

		theShader = p.createShader(vert, frag)

		p.noStroke()
		p.imageMode(p.CENTER)
	}

	p.draw = () => {
		p.background(255)
		p.shader(theShader)
		theShader.setUniform("canvasSize", CANVAS_SIZE)
		theShader.setUniform("mouse", [p.mouseX / WIDTH, p.mouseY / HEIGHT])
		theShader.setUniform("time", p.frameCount)
		p.quad(-1, 1, 1, 1, 1, -1, -1, -1)
	}
})
