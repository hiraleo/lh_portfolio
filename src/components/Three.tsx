/* eslint-disable @typescript-eslint/no-namespace */
import React, { Suspense, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { useSpring, animated as anim } from '@react-spring/three'
import { motion } from 'framer-motion'

import { vertexShader, fragmentShader } from './ImageShader'

const loader = new THREE.TextureLoader()

const state = {
  zoom: 2,
}

interface IProps {
  image1: string
  image2: string
  disp: string
  intensity: number
  hovered: boolean
}

interface SceneProps {
  url1: string
  url2: string
  dispUrl: string
  scale: number
}

function Scene({ image1, image2, disp, intensity, hovered }: IProps) {
  const aspect = 2.35
  const { zoom } = state
  const { viewport } = useThree()
  const viewportWidth = viewport.width
  const canvasWidth = viewportWidth / zoom
  const contentMaxWidth = canvasWidth * 1

  const { progress } = useSpring({ progress: hovered ? 1 : 0 })

  const { progress2 } = useSpring({
    to: { progress2: 0 },
    from: { progress2: 1 },
  })

  const { invalidate } = useThree()

  const args = useMemo(() => {
    const textureMap1 = loader.load(image1, invalidate)
    const textureMap2 = loader.load(image2, invalidate)
    const dispTexture = loader.load(disp, invalidate)

    dispTexture.wrapS = dispTexture.wrapT = THREE.RepeatWrapping
    textureMap1.magFilter = textureMap2.magFilter = THREE.LinearFilter
    textureMap1.minFilter = textureMap2.minFilter = THREE.LinearFilter

    return {
      uniforms: {
        effectFactor: { type: 'f', value: intensity },
        dispFactor: { type: 'f', value: 0 },
        dispFactor2: { type: 'f', value: 0 },
        textureMap: { type: 't', value: textureMap1 },
        textureMap2: { type: 't', value: textureMap2 },
        disp: { type: 't', value: dispTexture },
      },
      vertexShader,
      fragmentShader,
    }
  }, [image1, image2, disp, intensity, invalidate])

  return (
    <>
      <mesh scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}>
        <planeBufferGeometry attach="geometry" />
        <anim.shaderMaterial
          attach="material"
          args={[args]}
          uniforms-dispFactor-value={progress}
          uniforms-dispFactor2-value={progress2}
        />
      </mesh>
    </>
  )
}

// eslint-disable-next-line react/display-name
const ImageDisp = React.memo(({ url1, url2, dispUrl, scale }: SceneProps) => {
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '42.55%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      onTouchStart={hover}
      onTouchEnd={unhover}
      onTouchCancel={unhover}
    >
      <Canvas
        camera={{ zoom: state.zoom, position: [0, 0, 10] }}
        style={{
          position: 'absolute',
          top: '0',
        }}
      >
        <Suspense fallback={<p>Loading...</p>}></Suspense>
        <Scene
          image1={url1}
          image2={url2}
          disp={dispUrl}
          intensity={scale}
          hovered={hovered}
        />
      </Canvas>
    </motion.div>
  )
})

export default ImageDisp
