"use client";

import { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

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
  const renderProductColumn = (activeShader: ShaderType) => {
    const isShader = activeShader === 'shader';
    const primaryColor = isShader ? 'blue' : 'purple';
    
    return (
      <div className={`w-full max-w-2xl px-4 columns`}>
        {/* Product Title */}
        <h2 className={`text-4xl font-bold mb-8 text-center ${
          activeShader === 'shader' ? 'text-blue-400' : 'text-purple-400'
        }`}>
          {SHADER_CONTENT[activeShader].title}
        </h2>
        
        {/* Laptop Image with Video */}
        <div className='showcase'>
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
        
        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button 
            className={`px-8 py-3 bg-${activeShader === 'shader' ? 'blue' : 'purple'}-600 hover:bg-${activeShader === 'shader' ? 'blue' : 'purple'}-500 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none`}
          >
            View {SHADER_CONTENT[activeShader].title}
          </button>
        </div>
      </div>
    );
  };

  return (
    <main id="app">
      <Script
        src="/js/nav.js"
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-900 to-black">
          <nav>
              <ul>
                  <li><a href="#momenta">Momenta</a></li>
                  <li><a href="#momentart">MomentaRT</a></li>
                  <li><a href="https://summitmc.xyz">Back To Summit</a></li>
              </ul>
          </nav>
          <span className="effect filter">

          </span>
          <span className="effect text">
            about
          </span>
        <Head>
          <title>Momenta Shader</title>
          <meta name="description" content="Next-generation rendering technology" />
          <script type="module" src="/js/nav.js" defer></script>
        </Head>

        <main className="container mx-auto px-4 py-16 flex flex-col items-center">
          {/* Hero Section */}
          <div className="text-center mb-12 w-full max-w-6xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Momenta Shader
            </h1>
            <h2 className="text-5xl text-gray-300 font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              From SummitMC 
            </h2>
            
            <div className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-2">
            <span>Developed by Foxtrot112</span>
              <a href="https://github.com/foxtrot112" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 icon-small" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Two Column Layout */}
          <div className="flex flex-col md:flex-row w-full justify-center gap-8 lg:gap-16">
            {renderProductColumn('shader')}
            {renderProductColumn('rayTracing')}
          </div>
        </main>
      </div>
    </main>
  );
};

export default Home;