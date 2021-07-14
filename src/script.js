`use strict`

import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import StatusPanel from 'three/examples/jsm/libs/stats.module' 

// (ThreeJS) creating a new scene
const scene = new THREE.Scene()

// Creating geometry

// color palette
const colorPalette = 
{
    color1:`#8F00FF`,
    color2:`#81D8D0`,
    color3:`#7EF9FF`,
    color4:`#B65FCF`,
    color5:`#E39FF6`,
    color6:`#AF69EF`,
    color7:`#7A4988`,
    color8:`#A32CC4`,
}

//material
const boxMaterial = new THREE.MeshBasicMaterial({color: colorPalette.color1, wireframe: true})
const pyramidMaterial = new THREE.MeshBasicMaterial({color: colorPalette.color8, wireframe: true})
const material1 = new THREE.MeshBasicMaterial({color: colorPalette.color2, wireframe: true})
const material2 = new THREE.MeshBasicMaterial({color: colorPalette.color2, wireframe: true})
const material3 = new THREE.MeshBasicMaterial({color: colorPalette.color3, wireframe: true})
const matOcta1 = new THREE.MeshBasicMaterial({color: colorPalette.color4, wireframe: true})
const matOcta2 = new THREE.MeshBasicMaterial({color: colorPalette.color5, wireframe: true})
const matOcta3 = new THREE.MeshBasicMaterial({color: colorPalette.color6, wireframe: true})
const matOcta4 = new THREE.MeshBasicMaterial({color: colorPalette.color7, wireframe: true})



// BOX
const boxGeometry = new THREE.BoxGeometry(12, 12, 12)
const mesh = new THREE.Mesh(boxGeometry, boxMaterial)

mesh.position.set(0, -10, 0)
mesh.scale.set(.7, .7, 2.7) 
mesh.rotation.set(Math.PI / 2, 0, 0)
scene.add(mesh)


//cone
// pyramid
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(55, 75, 3),
    pyramidMaterial
)
scene.add(cone)


//buffer geometry
const bufferGeom = new THREE.BufferGeometry()

const vertex = {count: 12}
const vertices = new Float32Array(vertex.count * 3 * 3)

for(let i = 0; i < vertex.count * 3 * 3; i++)
{
    vertices[i] = (Math.random() - .5) * 9.5
}

const positionAttr = new THREE.BufferAttribute(vertices, 3)
positionAttr.needsUpdate = true
bufferGeom.setAttribute(`position`, positionAttr)

const meshBuffer = new THREE.Mesh(
    bufferGeom, material1
)

const meshBuffer2 = new THREE.Mesh(
    bufferGeom, material2
)

const meshBuffer3 = new THREE.Mesh(
    bufferGeom, material3
)

const bufferGroup = new THREE.Group()

bufferGroup.position.set(0,-10,0)
bufferGroup.add(meshBuffer, meshBuffer2, meshBuffer3)
scene.add(bufferGroup)
meshBuffer.position.set(0, -7, 0)
meshBuffer.rotation.x = Math.PI / 2
meshBuffer2.position.set(0, 7, 0)
meshBuffer2.rotation.z = Math.PI / 2
meshBuffer3.rotation.y = Math.PI / 2
// Group mesh
// box group
const group1 = new THREE.Group()
group1.position.set(0, -10, 0)
group1.rotation.set(0, 0, 0)
scene.add(group1)

const octahedron = new THREE.OctahedronGeometry(2, 0)
const octa1 = new THREE.Mesh(
    octahedron, matOcta1
)
const octa2 = new THREE.Mesh(
    octahedron, matOcta2
)
const octa3 = new THREE.Mesh(
    octahedron, matOcta3
)
const octa4 = new THREE.Mesh(
    octahedron, matOcta4
)
octa1.position.set(0, 0, -15)
octa2.position.set(-15, 0, 0)
octa3.position.set(15, 0, 0)
octa4.position.set(0, 0, 15)
group1.add(octa1, octa2, octa3, octa4)
group1.scale.set(1,3,1)



// AxesHelper
// a function that provide helper all axis
const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const aspectRatio = sizes.width / sizes.height

const camera1 = new THREE.PerspectiveCamera(
    75, 
    aspectRatio,
    0.1,
    1000
)

camera1.position.z = 100
scene.add(camera1)

// focusing look with LookAt function
camera1.lookAt(mesh.position)


// how to analyze transform
// console.log(mesh.position.length()) // calculate lenght from center of the scene to object
// console.log(mesh.position.distanceTo(camera1.position)) // calculate the distance from object to object


// Provide the renderer
const canvas = document.querySelector(`.webgl`) // select the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // for renderer property
})
renderer.setSize(sizes.width, sizes.height) // setting sizes
//renderer.render(scene, camera1) // renderer rendering scene with camera

// for maximum performance, please set pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// built-in three.js controls
// import from three examples
const orbitControls = new OrbitControls(camera1, canvas)
orbitControls.enableDamping = true
orbitControls.enablePan = false
orbitControls.update()



// Resizing window
// using resize js event
const resizeView = function()
{
    // update viewport aspect ratio
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera aspect ration and projection matrix
    camera1.aspect = sizes.width / sizes.height
    camera1.updateProjectionMatrix()

    // update renderer size and pixel ratio
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))    
} 
window.addEventListener(`resize`, resizeView)


// fullscreen handler
window.addEventListener(`keydown`, function(evt)
{
    if(evt.key === `f`)
    {
        // if not fullscreen, fullscreen
        !this.document.fullscreenElement && 
        canvas.requestFullscreen()

        // if fullscreen, not fullscreen
        this.document.fullscreenElement && 
        this.document.exitFullscreen()
    }
})

//ANIMATION
// with THREE.js built-in function

// first make new clock from three js
const clock = new THREE.Clock()
const animationProperties = {
    speed1: .5, // level 1
    speed2: .5, // level 2
    speed3: .5, // level 3
    _multiplier1: 4,
    multiplier2: 5,
    multiplier3: 15,
}


//status panel (fps)
const statsPanel = new StatusPanel()
document.body.appendChild(statsPanel.dom)

const animate = () => 
{
    // next getting elapsed time from clock
    const elapsedTime = clock.getElapsedTime()

    // update object   
    const calcAnimSin = Math.sin(animationProperties.speed3 * elapsedTime * animationProperties._multiplier1) * animationProperties.multiplier2 - 8
    
    group1.rotation.y = animationProperties.speed2 * elapsedTime 
    mesh.rotation.z = animationProperties.speed3 * elapsedTime
    mesh.position.y = calcAnimSin
    cone.rotation.y = -animationProperties.speed1 * elapsedTime / 2
    
    
    bufferGroup.position.y = calcAnimSin
    vertices[Math.floor(Math.random() * (vertex.count * 3 * 3))] = (Math.random() - .5) * animationProperties.multiplier3
    positionAttr.needsUpdate = true

    // updating control
    orbitControls.update()

    camera1.lookAt(cone.position)

    //render
    statsPanel.begin()
    renderer.render(scene, camera1)
    statsPanel.end()

    window.requestAnimationFrame(animate)
}
animate()


function debugUIPanel()
{
    // DEBUG UI
    const debugUI = new dat.GUI()
    debugUI.width = 350
    debugUI.closed = true

    const animationSetting = debugUI.addFolder(`Animation Properties`)
    const colorSetting = debugUI.addFolder(`Color Properties`)
    const wireframeSetting = debugUI.addFolder(`Wireframe Properties`)

    animationSetting
    .add(animationProperties, `speed1`, 0, 3)
    .name(`Level 1 Animation Speed`)

    animationSetting
    .add(animationProperties, `speed2`, 0, 3)
    .name(`Level 2 Animation Speed`)

    animationSetting
    .add(animationProperties, `speed3`, 0, 3)
    .name(`Level 3 Animation Speed`)

    animationSetting
    .add(animationProperties, `_multiplier1`, 0, 10)
    .name(`Animation #Multiplier1`)

    animationSetting
    .add(animationProperties, `multiplier2`, 0, 10)
    .name(`Animation Multiplier2`)

    animationSetting
    .add(animationProperties, `multiplier3`, 0, 20)
    .name(`Vertex Scale Multiplier`)

    animationSetting
    .addColor(colorPalette, `color8`)
    .onChange(function(){ cone.material.color.set(colorPalette.color8)})
    .name(`Cone Color`)

    colorSetting
    .addColor(colorPalette, `color2`)
    .onChange(function(){ 
        meshBuffer.material.color.set(colorPalette.color2)
        meshBuffer2.material.color.set(colorPalette.color2)
    })
    .name(`Mesh Buffer 1 & 2 Color`)

    colorSetting
    .addColor(colorPalette, `color3`)
    .onChange(function(){ meshBuffer3.material.color.set(colorPalette.color3)})
    .name(`Mesh Buffer 3 Color`)

    colorSetting
    .addColor(colorPalette, `color4`)
    .onChange(function(){ octa1.material.color.set(colorPalette.color4)})
    .name(`Octa 1 Color`)

    colorSetting
    .addColor(colorPalette, `color5`)
    .onChange(function(){ octa2.material.color.set(colorPalette.color5)})
    .name(`Octa 2 Color`)

    colorSetting
    .addColor(colorPalette, `color6`)
    .onChange(function(){ octa3.material.color.set(colorPalette.color6)})
    .name(`Octa 3 Color`)

    colorSetting
    .addColor(colorPalette, `color7`)
    .onChange(function(){ octa4.material.color.set(colorPalette.color7)})
    .name(`Octa 4 Color`)

    colorSetting
    .addColor(colorPalette, `color1`)
    .onChange(function(){ mesh.material.color.set(colorPalette.color1)})
    .name(`Box Color`)


    wireframeSetting
    .add(boxMaterial, `wireframe`)
    .name(`Box Wireframe`)

    wireframeSetting
    .add(pyramidMaterial, `wireframe`)
    .name(`Pyramid Wireframe`)

    wireframeSetting
    .add(material1, `wireframe`)
    .name(`Buffer Geom1 Wireframe`)

    wireframeSetting
    .add(material2, `wireframe`)
    .name(`Buffer Geom2 Wireframe`)

    wireframeSetting
    .add(material3, `wireframe`)
    .name(`Buffer Geom3 Wireframe`)

    wireframeSetting
    .add(matOcta1, `wireframe`)
    .name(`Octahedron1 Wireframe`)

    wireframeSetting
    .add(matOcta2, `wireframe`)
    .name(`Octahedron2 Wireframe`)

    wireframeSetting
    .add(matOcta3, `wireframe`)
    .name(`Octahedron3 Wireframe`)

    wireframeSetting
    .add(matOcta4, `wireframe`)
    .name(`Octahedron4 Wireframe`)

}
debugUIPanel()

