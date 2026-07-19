
"use client";

import Image from "next/image";
import { Ambulance, HeartPulse, ShieldCheck, Users } from "lucide-react";
import  Reveal  from "@/components/ui/reveal";
import { whoWeAreContent } from "@/data/about/who-we-are";

const icons=[HeartPulse,Ambulance,ShieldCheck,Users];

export default function WhoWeAre(){
return(
<section className="relative py-24">
<div className="mx-auto max-w-7xl px-6">
<div className="grid items-center gap-16 lg:grid-cols-2">
<Reveal><div>
<span className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">About Us</span>
<h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">{whoWeAreContent.title}</h2>
<div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-700"/>
<p className="mt-8 text-lg leading-8 text-gray-300">{whoWeAreContent.description}</p>
<div className="mt-10 grid gap-5 sm:grid-cols-2">
{whoWeAreContent.highlights.map((item,index)=>{const Icon=icons[index];return(
<Reveal key={item} delay={0.1*(index+1)}>
<div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-red-500/10">
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15"><Icon className="h-6 w-6 text-red-500 transition-transform duration-500 group-hover:scale-110"/></div>
<span className="font-medium text-white">{item}</span>
</div></Reveal>);})}
</div></div></Reveal>
<Reveal delay={0.2}>
<div className="group relative">
<div className="absolute inset-0 rounded-3xl bg-red-600/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"/>
<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
<Image src={whoWeAreContent.image} alt="XLANTIS Medical Department Team" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 50vw"/>
</div></div></Reveal>
</div></div></section>
);}
