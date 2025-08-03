import { useState } from "react";

const CORRECT_PASSWORD = "Lylethedog1!"; // <--- Add this line!

export default function PasswordGate({ children }) {
  const [entered, setEntered] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === CORRECT_PASSWORD) {
      setEntered(true);
    } else {
      setError(true);
      setValue("");
    }
  }

  if (entered) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 w-[350px] border border-orange-100"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          MentorWise: Private Beta
        </h2>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-md border border-orange-200 focus:ring-2 focus:ring-orange-400 text-lg"
          placeholder="Enter password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
        />
        {error && (
          <div className="text-red-500 text-sm -mt-2">Wrong password. Try again.</div>
        )}
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition mt-2"
        >
          Unlock Site
        </button>
      </form>
    </div>
  );
}