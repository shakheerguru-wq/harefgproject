export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-8 text-center tracking-widest">
        Noir Kids Newspaper
      </h1>

      <p className="text-lg text-yellow-300/70 max-w-xl text-center mb-10">
        Your newspaper platform is live! Use the links below to explore.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href="/login"
          className="w-full py-3 text-black bg-yellow-500 rounded-lg text-center font-semibold hover:bg-yellow-400"
        >
          Login
        </a>
        <a
          href="/signup"
          className="w-full py-3 text-yellow-500 border border-yellow-500 rounded-lg text-center font-semibold hover:bg-yellow-600 hover:text-black"
        >
          Signup
        </a>
        <a
          href="/submit-article"
          className="w-full py-3 text-black bg-yellow-500 rounded-lg text-center font-semibold hover:bg-yellow-400"
        >
          Submit Article
        </a>
        <a
          href="/admin/articles"
          className="w-full py-3 text-yellow-500 border border-yellow-500 rounded-lg text-center font-semibold hover:bg-yellow-600 hover:text-black"
        >
          Admin Articles
        </a>
      </div>
    </div>
  );
}
