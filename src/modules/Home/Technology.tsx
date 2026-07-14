const Technology = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">
        Built With Modern Technology
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-5">
        {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'].map(
          (tech) => (
            <div
              key={tech}
              className="rounded-xl border bg-card p-5 text-center font-medium"
            >
              {tech}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Technology;
