import { connectDB } from "@/lib/db";
import { normalizeRichHtml } from "@/lib/utils";
import { Expertise, type ExpertiseDoc } from "@/models/Expertise";

export default async function ExpertiseSection() {
  await connectDB();
  const items = await Expertise.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<ExpertiseDoc[]>();

  if (items.length === 0) return null;

  return (
    <section className="py-30 bg-black" id="expertise">
      <div className="w-full mx-auto px-5 md:px-8">
        <h2 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white mb-15">
          MY<br />EXPERTISE
        </h2>

        <div className="grid grid-cols-6 gap-4">
          {items.map((item, index) => (
            <div
              key={String(item._id)}
              className={`group min-w-0 bg-[#0a0a0a] border border-white/[0.03] rounded-xl p-5 md:p-8 flex flex-col transition-[background,border-color] duration-300 hover:bg-[#111] hover:border-white/[0.08] ${
                Number(item.span) === 3
                  ? "col-span-6 md:col-span-3"
                  : "col-span-6 md:col-span-2"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[11px] font-bold tracking-[0.1em] text-white">
                  ({index + 1})
                </span>
                <button
                  className="w-8 h-8 rounded-full bg-[#111] border border-white/5 text-white/60 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-[#222] group-hover:text-white"
                  aria-label="Learn more"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.01em] text-white mb-4 uppercase">
                {item.title}
              </h3>
              {item.desc && (
                <div
                  className="text-sm leading-[1.6] text-white/50 max-w-[90%] break-words"
                  dangerouslySetInnerHTML={{ __html: normalizeRichHtml(item.desc) }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
