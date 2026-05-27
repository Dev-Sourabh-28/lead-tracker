type ThemeProps = {
  portfolio: {
    title: string;
    bio: string;
  };
};

export default function CyberpunkTheme({ portfolio }: ThemeProps) {

  return (
    <div className="min-h-screen bg-black text-green-400">

      <section className="max-w-5xl mx-auto px-6 pt-24">

        <h1 className="text-6xl font-bold uppercase tracking-widest">
          {portfolio.title}
        </h1>

        <p className="mt-6 text-xl text-green-300">
          {portfolio.bio}
        </p>

      </section>

    </div>
  );
}