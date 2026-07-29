import { FACULTY } from "@/data/faculty";

export default function NonTeachingStaffPage() {
  const staff = FACULTY.filter((f) => f.category === "non-teaching");

  return (
    <div className="relative bg-[#0a2a52] py-24 min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Gradient mesh - directional light using brand blues */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(59,130,246,0.18), transparent)," +
              "radial-gradient(ellipse 60% 40% at 90% 90%, rgba(30,58,138,0.25), transparent)," +
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(14,165,233,0.08), transparent)",
          }}
        />
        {/* Subtle noise texture - breaks up banding on large screens */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Top edge fade - soft transition from preceding section */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Bottom edge fade - soft transition to following section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,42,82,0) 0%, rgba(10,42,82,1) 100%)",
          }}
        />
        {/* Top border glow - subtle separation from previous section */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)",
          }}
        />
      </div>

      {/* Content - sits above background layers */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-10">
          <h1 className="text-3xl font-bold mb-2">Non-Teaching Staff</h1>
          <p className="text-blue-200">Administrative and support staff</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0a2a52] text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold">Sr. No.</th>
                  <th className="px-6 py-3 text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-sm font-semibold">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((member, i) => {
                  const qualification = member.fields.find(
                    (f) => f.type === "education",
                  )?.value;
                  return (
                    <tr key={member.slug} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {qualification ?? "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
