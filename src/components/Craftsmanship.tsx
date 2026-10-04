import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Scissors, PenTool, Hammer, Sparkles, GitCommit, ChevronRight } from 'lucide-react';
import { CRAFT_STEPS, CraftStep } from '../data/footwearData';
import { handleImageError } from '../lib/imageUtils';

export const Craftsmanship: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep: CraftStep = CRAFT_STEPS[activeStepIndex];

  const stepIcons = [
    <Scissors className="w-4 h-4" key="1" />,
    <PenTool className="w-4 h-4" key="2" />,
    <Hammer className="w-4 h-4" key="3" />,
    <Sparkles className="w-4 h-4" key="4" />,
  ];

  return (
    <section id="craftsmanship" className="py-20 lg:py-32 relative bg-transparent overflow-hidden border-t border-b border-stone-200/50 dark:border-white/[0.08]">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#635bff]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#c69c6d]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#9747ff]" />
            <span>Figma Prototype Flow</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>Artisanal Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
            From Material To Masterpiece.
          </h2>

          <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every pair of NIBOCS shoes undergoes an uncompromising 4-stage manufacturing cycle, combining traditional Nigerian craftsmanship with contemporary footwear engineering.
          </p>
        </div>

        {/* Figma-Style Prototype Node Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CRAFT_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-[#151821] border-[#c69c6d] text-white shadow-lg shadow-[#c69c6d]/10'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isActive ? 'bg-[#c69c6d] text-neutral-950' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div>
                    <span className="font-semibold text-xs sm:text-sm block">{step.title}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Stage 0{idx + 1}</span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#c69c6d] translate-x-0.5' : 'text-neutral-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Interactive 4-Stage Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Stage Inspection Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="figma-panel rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#c69c6d] text-neutral-950 font-bold">
                    {stepIcons[activeStepIndex]}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#c69c6d] font-bold">
                      Stage {activeStep.number} of 04
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {activeStep.title} Phase
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#14ae5c] bg-[#14ae5c]/10 border border-[#14ae5c]/20 px-2 py-0.5 rounded">
                  Active Spec
                </span>
              </div>

              {/* Core Description */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-200">
                  {activeStep.description}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeStep.detail}
                </p>
              </div>

              {/* Benchmark Metric */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 text-xs text-neutral-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#c69c6d] shrink-0" />
                <span>{activeStep.metric}</span>
              </div>

              {/* Quick Navigation Footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Workshop: Sangotedo, Lagos</span>
                <span className="text-[#c69c6d]">Handcrafted Quality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage Spotlight with Figma Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl group figma-panel">
              {/* Header Tab */}
              <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c69c6d]" />
                  <span>Stage_{activeStep.number}_{activeStep.title}.view</span>
                </div>
                <span>Zoom 100% · High-Res</span>
              </div>

              <div className="aspect-[16/10] relative overflow-hidden bg-neutral-950">
                <img
                  src={activeStep.image}
                  alt={`NIBOCS Craftsmanship - ${activeStep.title}`}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />

                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Bottom detail card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 figma-panel rounded-xl flex items-center justify-between text-xs border border-white/10">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">{activeStep.title} Verification</span>
                    <span className="text-[11px] text-neutral-400">{activeStep.description}</span>
                  </div>
                  <span className="text-xs font-mono text-[#c69c6d] font-bold">100% Quality Checked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
