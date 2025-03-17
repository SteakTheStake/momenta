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
  reflection: string;
}

const Home: NextPage = () => {
  const [activeShaderLeft, setActiveShaderLeft] = useState<ShaderType>('shader');
  const [activeShaderRight, setActiveShaderRight] = useState<ShaderType>('rayTracing');

  const SHADER_CONTENT: Record<ShaderType, ShaderContent> = {
    shader: {
      title: "Momenta",
      description: "Highly performant gameplay focused shader",
      features: [
        "Volumetric Clouds",
        "Screen space reflections",
        "Real-time Denoising",
        "Supports LabPBR Materials"
      ],
      specs: [
        "Nvidia RTX 1060 / AMD Radeon RX 580",
        "Minecraft + Iris 1.20 and above",
        "1080p Resolution"
      ],
      video: "/media/videos/Momenta.mp4",
      reflection: "/media/videos/Momenta-Mask.mp4"
    },
    rayTracing: {
      title: "MomentaRT",
      description: "Ray tracing solution with denoising for cinematic realism",
      features: [
        "Full worldspace ray tracing",
        "Denoising",
        "Ray Traced Screen space reflections",
        "Supports LabPBR materials"
      ],
      specs: [
        "Nvidia RTX 2070 / AMD Radeon RX 5700 XT",
        "Minecraft + Optifine 1.16.5 and below",
        "1080p Resolution"
      ],
      video: "/media/videos/Momentart.mp4",
      reflection: "/media/videos/Momentart-Mask.mp4"
    }
  };

  // Function to render a product column
  const renderProductColumn = (activeShader: ShaderType) => (
    <div className="w-full max-w-2xl px-4 columns">
      {/* Product Title */}
      <h2 className={`text-4xl font-bold mb-8 text-center ${
        activeShader === 'shader' ? 'text-blue-400' : 'text-purple-400'
      }`}>
        {SHADER_CONTENT[activeShader].title}
      </h2>
      
      {/* Laptop Image with Video */}
      <div className="relative w-full max-w-[500px] mx-auto mb-12">
        <div className="relative cover-image">
          {/* Video Container */}
          <div className="laptop-image absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="w-[70%] h-[60%] mt-[5%] overflow-hidden rounded-lg laptop">
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
              <video
                src={SHADER_CONTENT[activeShader].reflection}
                autoPlay
                loop
                muted
                playsInline
                className="video-container-refection"
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
      
      {/* Description */}
      <p className="text-lg text-gray-400 mb-12 leading-relaxed text-center">
        {SHADER_CONTENT[activeShader].description}
      </p>

      {/* Features and Specs */}
      <div className="space-y-8">
        <div className={`bg-gray-800/50 p-8 rounded-2xl border ${
          activeShader === 'shader' ? 'border-blue-700/50' : 'border-purple-700/50'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            activeShader === 'shader' ? 'text-blue-400' : 'text-purple-400'
          }`}>Key Features</h3>
          <ul className="space-y-4">
            {SHADER_CONTENT[activeShader].features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activeShader === 'shader' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className={`bg-gray-800/50 p-8 rounded-2xl border ${
          activeShader === 'shader' ? 'border-blue-700/50' : 'border-purple-700/50'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            activeShader === 'shader' ? 'text-blue-400' : 'text-purple-400'
          }`}>Minimum System Requirements (60fps)</h3>
          <ul className="space-y-4">
            {SHADER_CONTENT[activeShader].specs.map((spec, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activeShader === 'shader' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black">
      <Head>
        <title>Momenta Shader</title>
        <p>By <a href="https://github.com/foxtrot112">FoxTrot 112</a></p>
        <meta name="description" content="Next-generation rendering technology" />
      </Head>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-12 w-full max-w-6xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Momenta Shader
          </h1>
          <p className="text-xl text-gray-300 mb-16">
            Redefining real-time graphics through computational alchemy
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row w-full justify-center gap-8 lg:gap-16">
          {renderProductColumn('shader')}
          {renderProductColumn('rayTracing')}
        </div>
      </main>
    </div>
  );
};

export default Home;