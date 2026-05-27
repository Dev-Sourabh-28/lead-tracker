type ThemeProps = {
  portfolio: {
    title: string;
    bio: string;
  };
};

export default function MinimalTheme({ portfolio }: ThemeProps) {

  return (
    <div className="min-h-screen bg-white text-black">

      <section className="max-w-5xl mx-auto px-6 pt-24">

        <h1 className="text-6xl font-bold">
          {portfolio.title}
        </h1>

        <p className="text-gray-500 mt-6 text-xl">
          {portfolio.bio}
        </p>

      </section>

    </div>
  );
}