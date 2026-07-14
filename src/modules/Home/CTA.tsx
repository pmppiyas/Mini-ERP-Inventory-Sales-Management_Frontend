const CTA = () => {
  return (
    <section className="mx-6 mb-20 rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground">
      <h2 className="text-4xl font-bold">
        Ready to Manage Your Business Better?
      </h2>

      <p className="mx-auto mt-4 max-w-xl opacity-90">
        Experience a simple and powerful ERP system built for modern businesses.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black">
          Try Demo
        </button>

        <button className="rounded-lg border border-white px-6 py-3 font-semibold">
          View Source Code
        </button>
      </div>
    </section>
  );
};

export default CTA;
