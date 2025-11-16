export default function AdminCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-2xl shadow-xl text-white font-bold ${color}`}>
      <h2 className="text-xl mb-2">{title}</h2>
      <p className="text-4xl">{value}</p>
    </div>
  );
}
