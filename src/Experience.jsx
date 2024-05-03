import { Center, OrbitControls, Sparkles, useGLTF, useTexture, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend , useFrame} from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
//vite plugin glslx is used to import glsl files as strings




const PortalMaterial = shaderMaterial(
{
    uTime: 0,
    uColorStart: new THREE.Color("cyan"),
    uColorEnd: new THREE.Color("#ffffff"),
},
portalVertexShader,
portalFragmentShader

)

extend({ PortalMaterial })
//extend is used to add custom components to the three fiber library

export default function Experience()
{
    const {nodes} = useGLTF("./model/portal.glb")
    const bakedTexture = useTexture("./model/baked.jpg")
    
    bakedTexture.flipY = false
    //upside down fix

    const portalMaterial = useRef()

    useFrame((state, delta) => { 
        portalMaterial.current.uTime += (delta * 11)
    }
    )//useFrame is used to update the shader material with time delta value to animate the portal




    return <>
       
        <color args={ ["black"] } attach="background" />
       
        <OrbitControls makeDefault />
         <Center>
            <mesh 
            geometry={ nodes.baked.geometry }
            >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh
             geometry={ nodes.poleLightA.geometry }
             position={ nodes.poleLightA.position }
             
             >
             <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh
             geometry={ nodes.poleLightB.geometry }
             position={ nodes.poleLightB.position }
             
             >
             <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
                >
                {/* <shaderMaterial
                vertexShader={ portalVertexShader }
                fragmentShader={ portalFragmentShader }
                uniforms={ { 
                    uTime: { value: 0 },
                    uTexture: { value: bakedTexture },
                    uColorStart: { value: new THREE.Color("cyan") },
                    uColorEnd: { value: new THREE.Color("#ffffff") }

                    

                } }
                
                /> */}
                <portalMaterial ref={portalMaterial} />
                {/* //custom material easier than shaderMaterial */}
            </mesh>

            <Sparkles 
            size={10}
            speed={0.5}
            scale={[4,2,4]}
            position={[0,1,0]}
            color={"yellow"}
            count={100}
            
            
            />

        </Center>

    </>
}