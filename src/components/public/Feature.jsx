import { Bell, CalendarDays, ClipboardList } from "lucide-react";

export default function Feature() {
  const feature = [
    {
      icon: ClipboardList,
      title: "Manajemen Tugas Otomatis",
      desc: "Tambahkan tugas dan tentukan deadline-nya",
    },
    {
      icon: CalendarDays,
      title: "Integrasi Jadwal Kuliah",
      desc: "Singkronisasi dengan Google Calendar atau input manual",
    },
    {
      icon: Bell,
      title: "Pengingat Via Email",
      desc: "Notifikasi langsung ke Email sebelum H-3 deadline & hari H deadline",
    },
  ];

  const statistic = [
    {
      data: "Mahasiswa Aktif",
      count: 20,
    },
    {
      data: "Jadwal Kuliah Tercatat",
      count: 20,
    },
    {
      data: "Tugas Tercatat",
      count: 20,
    },
    {
      data: "Tugas Terselesaikan",
      count: 20,
    },
  ];

  return (
    <>
      <section id="feature" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h6 className="text-sm font-bold uppercase tracking-wider text-secondary">
              Features
            </h6>
            <h2 className="text-3xl font-bold mt-2 text-primary">
              Fitur Unggulan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feature.map((f, index) => (
              <div
                key={index}
                className="group relative bg-light rounded-2xl p-8 pt-10 shadow-md me-20 mb-5 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon floating */}
                <div className="absolute -top-8 -right-20 flex w-40 h-40 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:scale-105 md:h-30 md:w-30 transition- duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                  <f.icon className="h-16 w-16" />
                </div>

                {/* Content */}
                <h4 className="font-bold text-xl text-primary">{f.title}</h4>

                <p className="text-gray-600 mt-4 w-3/4 md:w-full">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-light rounded-r-verybig py-16 mt-10 me-15 md:py-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
              {statistic.map((s, index) => (
                <div key={index} className="hover:scale-110 transition- duration-300 ease-out">
                  <h2 className="text-5xl md:text-4xl font-bold">{s.count}</h2>
                  <h4 className="mt-2 md:text-base font-medium text-light/90">
                    {s.data}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
