import React from 'react'

const Hero = () => {
  return (
    <section
      className="bg-gradient-to-r from-orange-500 to-orange-300 px-6 py-8 flex items-center justify-start"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="max-w-2xl">
        <h2 className="text-black-800 text-3xl font-bold mb-2">WELCOME TO</h2>
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-0 leading-tight">SMART LOYALTY<br />WEBSITE</h1>
      </div>
    </section>
  )
}

export default Hero
