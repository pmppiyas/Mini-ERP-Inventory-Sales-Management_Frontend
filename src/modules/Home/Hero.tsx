const Hero = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-24 text-center">
      <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Modern ERP Solution
      </span>

      <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
        Manage Your Inventory & Sales
        <span className="text-primary"> Smarter</span>
      </h1>

      <p className="max-w-2xl text-lg text-muted-foreground">
        Mini ERP helps businesses manage products, track stock, create sales,
        and control user permissions from one powerful dashboard.
      </p>

      <div className="flex gap-4">
        <button className="rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90">
          Get Started
        </button>

        <button className="rounded-lg border px-6 py-3 font-medium hover:bg-muted">
          View Demo
        </button>
      </div>

      <div className="mt-10 w-full rounded-xl border bg-card p-4 shadow-lg">
        <div className="flex h-72 items-center justify-center rounded-lg bg-muted">
          Dashboard Preview
        </div>
      </div>
    </section>
  );
};

export default Hero;
