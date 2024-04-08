import * as THREE from "three";
import { GLTFLoader } from 'three/js/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const sizes = {
  width: 800,
  height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const ambient = new THREE.AmbientLight(0xffffff, 1)
ambient.position.set(200, 300, 200)
scene.add(ambient)

const animation = function(){
  requestAnimationFrame(animation)
  mesh.rotateY(0.1)
  renderer.render(scene, camera)
}
animation()