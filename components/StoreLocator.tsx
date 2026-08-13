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
    <div id="locations" className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 space-y-6 shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Physical Counter Locations
            </span>
            <span className="text-xs text-slate-500 font-medium">• Glasgow Branch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Store Counters & Location
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-sm font-medium">
          Reserve online to skip the counter queue and get guaranteed zero-commission rates with instant voucher collection.
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
                    ? 'bg-emerald-50/50 border-emerald-500 shadow-md'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {b.isAirport ? (
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <Plane className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{b.address}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                    Queue: {b.queueWaitTime}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> {b.hours}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> {b.phone}
                    </span>
                  </div>

                  {b.googleMapsUrl && (
                    <a
                      href={b.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-emerald-700 hover:text-emerald-600 font-bold flex items-center gap-1 text-[11px] hover:underline"
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
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">
                Selected Store Location
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{selectedBranch.name}</h3>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shrink-0">
              <button
                onClick={() => setViewTab('map')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewTab === 'map'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map Location</span>
              </button>
              <button
                onClick={() => setViewTab('info')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewTab === 'info'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
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
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <iframe
                  title={`Map location for ${selectedBranch.name}`}
                  width="100%"
                  height="100%"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-slate-900/90 text-[10px] font-bold text-white shadow flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{selectedBranch.name}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 text-slate-700 min-w-0">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900 truncate">{selectedBranch.address}</span>
                </div>
                {selectedBranch.googleMapsUrl && (
                  <a
                    href={selectedBranch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-[11px] hover:bg-emerald-100 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold">Street Address:</span>
                <p className="text-slate-900 font-bold">{selectedBranch.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-500 font-semibold">Operating Hours</span>
                  <p className="text-slate-900 font-bold mt-0.5">{selectedBranch.hours}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-500 font-semibold">Direct Counter Line</span>
                  <p className="text-emerald-700 font-bold font-mono mt-0.5">{selectedBranch.phone}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-slate-700 font-extrabold">Available Counter Services & Perks:</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedBranch.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-white text-[11px] text-slate-700 font-semibold border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all uppercase tracking-wider cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Select Branch For Currency Pickup</span>
            </button>

            {selectedBranch.googleMapsUrl && (
              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Google Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
