export default function Settings() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Mentor Settings</h1>
      <p className="mb-4">Manage your account preferences, email notifications, and privacy options.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Change your password</li>
        <li>Control session reminders</li>
        <li>Enable or disable profile visibility</li>
      </ul>
    </div>
  );
}
