// src/pages/UserDashboard/Settings.jsx

export default function Settings() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Settings</h1>
      <p className="mb-4 text-gray-700">
        Manage your account settings, update your profile information, and configure notification preferences.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Update personal details</li>
        <li>Change email or password</li>
        <li>Configure session reminders</li>
        <li>Privacy and security settings</li>
      </ul>
    </div>
  );
}
