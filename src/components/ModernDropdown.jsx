// src/components/ModernDropdown.jsx
import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ArrowRight } from "lucide-react";

export default function ModernDropdown({
  label,
  options = [],
  onSelect,
  placeholder = "Explore",
  labelClassName = "",
  buttonClassName = "",
  containerClassName = "",
}) {
  const [selected, setSelected] = useState(null);
  const [openUp, setOpenUp] = useState(false);
  const btnRef = useRef(null);

  const handleChange = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  // Decide if the menu should open upward to avoid clipping
  const recalcPlacement = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedMenuHeight = Math.min(options.length * 48 + 16, 288); // ~48px/row + padding
    setOpenUp(spaceBelow < estimatedMenuHeight + 16);
  };

  useEffect(() => {
    const onResizeOrScroll = () => recalcPlacement();
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll);
    };
  }, [options.length]);

  return (
    <div className={`w-full relative z-30 ${containerClassName}`}>
      {label ? (
        <label className={`block mb-3 font-semibold text-lg text-gray-900 text-center ${labelClassName}`}>
          {label}
        </label>
      ) : null}

      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          {/* SOLID WHITE BUTTON (no glass) */}
          <Listbox.Button
            ref={btnRef}
            onClick={recalcPlacement}
            className={[
              "relative w-full cursor-pointer rounded-2xl",
              "bg-white border border-orange-200",
              "py-[14px] md:py-4 pl-5 pr-12 text-left",
              "shadow-lg outline-none transition",
              "focus:ring-2 focus:ring-orange-400 focus:border-orange-400",
              buttonClassName,
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-2 text-gray-900">
              <span className="block truncate">
                {selected || (
                  <span className="inline-flex items-center gap-2">
                    {placeholder} <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* VERY LIGHT GLASS MENU (almost white). 
              If you want it completely solid, change bg-white/99 -> bg-white and remove the backdrop-* classes. */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options
              className={[
                "absolute z-50 w-full max-h-72 overflow-auto rounded-xl focus:outline-none",
                openUp ? "bottom-[calc(100%+0.5rem)]" : "top-[calc(100%+0.5rem)]",
                // ALMOST OPAQUE + tiny blur so it's *barely* glassy
                "bg-white supports-[backdrop-filter]:backdrop-blur-[0.3px] supports-[backdrop-filter]:backdrop-saturate-110",
                "border border-orange-200/70 ring-1 ring-orange-200/40",
                "shadow-[0_20px_60px_-12px_rgba(16,24,40,0.22)]",
                "py-2",
              ].join(" ")}
            >
              {options.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-center">No options available.</div>
              ) : (
                options.map((option, idx) => (
                  <Listbox.Option
                    key={`${option}-${idx}`}
                    value={option}
                    className={({ active }) =>
                      [
                        // Center the row contents; keep equal padding on both sides
                        "relative flex items-center justify-center px-6 py-3 select-none",
                        "text-center rounded-md transition",
                        active ? "bg-orange-50 text-orange-600" : "text-gray-900",
                      ].join(" ")
                    }
                  >
                    {({ selected: isSelected }) => (
                      <>
                        {/* Text stays perfectly centered, regardless of the check icon */}
                        <span className={`block truncate leading-relaxed ${isSelected ? "font-semibold" : ""}`}>
                          {option}
                        </span>

                        {/* Check icon is absolutely positioned and does NOT shift text */}
                        {isSelected ? (
                          <span className="absolute inset-y-0 left-2 flex items-center text-orange-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
