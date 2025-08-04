// src/components/ModernDropdown.jsx
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function ModernDropdown({ label, options, value, setValue }) {
  return (
    <div className="w-full relative z-30"> {/* <- z-30 so dropdowns are above other content */}
      <label className="block mb-2 font-semibold text-lg text-gray-800">{label}</label>
      <Listbox value={value} onChange={setValue}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white/95 border border-orange-200 py-3 pl-5 pr-10 text-left shadow-lg outline-none transition focus:ring-2 focus:ring-orange-400 focus:border-orange-400 font-body">
            <span className="block truncate text-gray-900">{value || "Explore ➣"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-2 max-h-56 w-full overflow-auto rounded-xl bg-white/95 py-2 shadow-xl ring-1 ring-orange-200 focus:outline-none">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 pl-10 pr-4 rounded-md transition ${
                      active ? 'bg-orange-50 text-orange-600' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-2 flex items-center text-orange-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
