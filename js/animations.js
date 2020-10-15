
const animin = (defineTarget) => {
    anime({
        targets: defineTarget,
        scaleY: 1.1
    })
}

let spawnSliding = (defineTarget) => {
    anime({
        targets: defineTarget,
        easing: 'easeOutExpo',
        translateX: [-300, 0],
        opacity: [0, 1],
        duration: 1000
    })
}

const animout = (defineTarget) => {
    anime({
        targets: defineTarget,
        scaleY: 1
    })
}

const rotating = (defineTarget) => {
    anime({
        targets: defineTarget,
        scaleY: 1
    })
}

export { animin, animout, spawnSliding, rotating };

