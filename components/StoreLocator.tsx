'use client';

import React, { useState } from 'react';
import { STORE_BRANCHES } from '@/lib/currency-data';
import { StoreBranch } from '@/lib/types';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Navigation,
  Plane,
  ExternalLink,
  Compass,
  Map as MapIcon
} from 'lucide-react';

interface StoreLocatorProps {
  onSelectBranch: (branch: StoreBranch) => void;
}

export default function StoreLocator({ onSelectBranch }: StoreLocatorProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(STORE_BRANCHES[0].id);
  const [viewTab, setViewTab] = useState<'map' | 'info'>('map');

  const selectedBranch =
    STORE_BRANCHES.find((b) => b.id === selectedBranchId) || STORE_BRANCHES[0];

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedBranch.address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div id="locations" className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Physical Counter Locations
            </span>
            <span className="text-xs text-slate-400 font-medium">• Airport & City Express Pickups</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-light text-white mt-1">
            Store Counters & Airport Kiosks
          </h2>
        </div>

        <p className="text-xs text-slate-400 max-w-sm">
          Reserve online to skip the counter queue and get guaranteed zero-fee rates with instant voucher collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Branch Cards List */}
        <div className="lg:col-span-6 space-y-3">
          {STORE_BRANCHES.map((b) => {
            const isSelected = b.id === selectedBranchId;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#16191E] border-teal-500 shadow-lg ring-1 ring-teal-500/30'
                    : 'bg-[#16191E]/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {b.isAirport ? (
                      <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                        <Plane className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{b.address}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950/80 text-teal-400 border border-teal-500/30 shrink-0">
                    Queue: {b.queueWaitTime}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-400" /> {b.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-teal-400" /> {b.phone}
                    </span>
                  </div>

                  {b.googleMapsUrl && (
                    <a
                      href={b.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 text-[11px] hover:underline"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Map</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Branch Detail & Map Box */}
        <div className="lg:col-span-6 bg-[#16191E] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-teal-500 font-bold uppercase tracking-[0.2em]">
                Selected Store Location
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">{selectedBranch.name}</h3>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-[#0F1115] border border-slate-800 shrink-0">
              <button
                onClick={() => setViewTab('map')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  viewTab === 'map'
                    ? 'bg-teal-500 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map Location</span>
              </button>
              <button
                onClick={() => setViewTab('info')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  viewTab === 'info'
                    ? 'bg-teal-500 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Counter Info</span>
              </button>
            </div>
          </div>

          {/* Map Embed or Information View */}
          {viewTab === 'map' ? (
            <div className="space-y-3">
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-800 bg-[#0F1115]">
                <iframe
                  title={`Map location for ${selectedBranch.name}`}
                  width="100%"
                  height="100%"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0 filter opacity-90 contrast-110"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-teal-300 backdrop-blur-md shadow flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>{selectedBranch.name}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0F1115] border border-slate-800 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 text-slate-300 min-w-0">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold text-slate-200 truncate">{selectedBranch.address}</span>
                </div>
                {selectedBranch.googleMapsUrl && (
                  <a
                    href={selectedBranch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-[11px] hover:bg-teal-500/30 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0F1115] border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Street & Terminal Address:</span>
                <p className="text-slate-100 font-bold">{selectedBranch.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#0F1115] border border-slate-800">
                  <span className="text-slate-400 font-semibold">Operating Hours</span>
                  <p className="text-slate-100 font-bold mt-0.5">{selectedBranch.hours}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0F1115] border border-slate-800">
                  <span className="text-slate-400 font-semibold">Direct Counter Line</span>
                  <p className="text-teal-400 font-bold font-mono mt-0.5">{selectedBranch.phone}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-slate-400 font-bold">Available Counter Services & Perks:</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedBranch.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-[#0F1115] text-[11px] text-slate-200 border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onSelectBranch(selectedBranch)}
              className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all uppercase tracking-wider"
            >
              <Navigation className="w-4 h-4" />
              <span>Select Branch For Currency Pickup</span>
            </button>

            {selectedBranch.googleMapsUrl && (
              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#0F1115] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-teal-400" />
                <span className="hidden sm:inline">Google Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
