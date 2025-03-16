"use client";

import { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Image from 'next/image';

type ShaderType = 'shader' | 'rayTracing';

interface ShaderContent {
  title: string;
  description: string;
  features: string[];
  specs: string[];
  video: string;
}

const Home: NextPage = () => {
  const [activeShader, setActiveShader] = useState<ShaderType>('shader');

  const SHADER_CONTENT: Record<ShaderType, ShaderContent> = {
    shader: {
      title: "Momenta Shader",
      description: "Revolutionary raster-based shading technology delivering unprecedented visual fidelity",
      features: [
        "Dynamic material response system",
        "Nanoscale surface detailing",
        "Real-time photometric calculations",
        "Adaptive temporal supersampling"
      ],
      specs: [
        "16K Material Textures",
        "128-bit HDR Color Depth",
        "16x Anisotropic Filtering",
        "0.1ms Perceptual LOD Transitions"
      ],
      video: "/media/videos/Core-Shader.mp4"
    },
    rayTracing: {
      title: "Momenta Ray Tracing Shader",
      description: "Hybrid ray tracing solution with neural denoising for cinematic realism",
      features: [
        "Full-scene BVH acceleration",
        "AI-accelerated denoising",
        "Quantum-inspired path sampling",
        "Dynamic photon caching"
      ],
      specs: [
        "8 Billion Rays/sec",
        "256 Simultaneous Bounces",
        "0.5px Neural Denoise Radius",
        "Sub-millisecond Temporal Accumulation"
      ],
      video: "/media/videos/Rt-Shader.mp4"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black">
      <Head>
        <title>Momenta Render Pipeline</title>
        <meta name="description" content="Next-generation rendering technology" />
      </Head>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-12 w-full max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Momenta Render Pipeline
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Redefining real-time graphics through computational alchemy
          </p>

          {/* Laptop Image with Video */}
          <div className="relative w-full max-w-[800px] mx-auto mb-12">
            <div className="relative cover-image">
              {/* Video Container */}
              <div className="laptop-image absolute inset-0 w-full h-full flex items-center justify-center">
                <div className="w-[70%] h-[60%] mt-[5%] overflow-hidden rounded-lg">
                  {/* Only show smoke video when rayTracing is active */}
                  {activeShader === 'rayTracing' && (
                    <video
                      src="/media/videos/Smoke-Loop.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="smoke-container"
                    />
                  )}
                  <div
                    data-video="true"
                    className="mask-video"
                  >
                  <video
                    src={SHADER_CONTENT[activeShader].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="video-container"
                  />
                  <Image
                    src="/media/images/laptop.png"
                    alt="Laptop Display"
                    width={500}
                    height={500}
                    className="laptop-image"
                    priority
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shader Toggle */}
          <div className="inline-flex bg-gray-800 rounded-full p-2 mb-12">
            <button
              onClick={() => setActiveShader('shader')}
              className={`px-8 py-3 rounded-full transition-all ${
                activeShader === 'shader' 
                ? 'bg-blue-600 shadow-glow' 
                : 'bg-transparent hover:bg-gray-700'
              }`}
            >
              Core Shader
            </button>
            <button
              onClick={() => setActiveShader('rayTracing')}
              className={`px-8 py-3 rounded-full transition-all ${
                activeShader === 'rayTracing'
                ? 'bg-purple-600 shadow-glow'
                : 'bg-transparent hover:bg-gray-700'
              }`}
            >
              Ray Tracing
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-gray-100 text-center">
            {SHADER_CONTENT[activeShader].title}
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 leading-relaxed text-center">
            {SHADER_CONTENT[activeShader].description}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Key Features</h3>
              <ul className="space-y-4">
                {SHADER_CONTENT[activeShader].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Technical Specifications</h3>
              <ul className="space-y-4">
                {SHADER_CONTENT[activeShader].specs.map((spec, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;