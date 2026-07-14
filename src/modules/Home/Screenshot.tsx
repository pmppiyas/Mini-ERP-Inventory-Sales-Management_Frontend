const Screenshot = () => {
  return (
    <section className="bg-muted/40 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold">
          See Mini ERP In Action
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {['Dashboard', 'Product Management', 'Sales Management'].map(
            (item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border bg-card"
              >
                <div className="flex h-52 items-center justify-center bg-muted">
                  Screenshot
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{item}</h3>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Screenshot;
