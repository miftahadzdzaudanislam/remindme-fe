export default function Task() {
  return (
    <>
      <section id="task" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Schedule
            </h6>
            <h2 className="text-3xl font-bold mt-2 text-primary">Upcoming Task</h2>
          </div>

          <p className="text-center text-xl font-semibold mb-6">
            Selamat datang, <span className="text-primary">Mahasiswa!</span>
          </p>

          <p className="text-center text-gray-500 mb-10">
            Tidak ada tugas yang tersedia.
          </p>

          <div className="max-w-full mx-auto">
            <span className="relative text-sm font-medium text-light bg-danger px-4 py-3 rounded-4xl border border-gray-300 top-4 ms-4">
              Prioritas Tinggi
            </span>
            <div className="bg-light rounded-xl shadow p-6 border border-secondary/20 md:flex md:items-center">
              <div className="w-1/2">
                <h4 className="text-xl font-bold mt-4">Judul Tugas</h4>
                <p className="text-gray-500 mt-2 pe-6 hidden md:block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos autem amet repellat quidem neque, eius quam modi temporibus nisi nesciunt facere alias reprehenderit quaerat animi quia ducimus quod voluptas enim.</p>
              </div>

              <div className="flex md:w-1/2">
                <div className="mt-4 w-1/2">
                  <p className="text-sm text-gray-500">Mata Kuliah</p>
                  <p className="font-medium">Pemrograman Web</p>
                </div>

                <div className="mt-4 w-1/2">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-red-600 font-semibold">20 Juni 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
