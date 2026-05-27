type ThemeProps = {
  portfolio: {
    title: string;
    bio: string;
  };
};

export default function GlassTheme({ portfolio }: ThemeProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-200 p-10">

      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-10">

        <h1 className="text-6xl font-bold">
          {portfolio.title}
        </h1>

        <p className="mt-6 text-xl">
          {portfolio.bio}
        </p>

      </div>

    </div>
  );
}