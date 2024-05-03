import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'

export default function Experience()
{
    const {nodes} = useGLTF("./model/portal.glb")
    const bakedTexture = useTexture("./model/baked.jpg")
    
    bakedTexture.flipY = false
    //upside down fix
    return <>

        <color args={ ["black"] } attach="background" />
       
        <OrbitControls makeDefault />

        <mesh 
         geometry={ nodes.baked.geometry }
        >
            <meshBasicMaterial map={ bakedTexture } />
        </mesh>

    </>
}