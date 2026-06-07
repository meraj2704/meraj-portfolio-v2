import Image from "next/image";
import { connectDB } from "@/lib/db";
import { initial, normalizeRichHtml } from "@/lib/utils";
import { Stack, type StackDoc } from "@/models/Stack";
import {
  splitContainer,
  splitSection,
  splitTitle,
  splitTitleWrap,
  splitItemDesc,
} from "./_shared/splitClasses";

export default async function StackSection() {
  await connectDB();
  const items = await Stack.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<StackDoc[]>();

  if (items.length === 0) return null;

  return (
    <section className={splitSection} id="stack">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>FAVOURITE<br />STACK</h2>
        </div>
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={String(item._id)}
              className="group bg-[#0a0a0a] border border-white/5 rounded-xl p-5 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 transition-colors duration-300 hover:border-white/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-white/10 to-transparent border border-white/10 ring-1 ring-primary/20 shadow-[0_8px_30px_-10px_rgba(74,222,128,0.4)] flex items-center justify-center shrink-0 overflow-hidden p-3 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#4ade80]/50">
                {item.icon?.url ? (
                  <Image
                    src={item.icon.url}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-extrabold text-[#4ade80]">
                    {initial(item.title)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-bold tracking-wider text-white uppercase mt-2">
                    {item.role}
                  </span>
                  {item.percent && (
                    <span className="text-[13px] font-bold text-white">{item.percent}</span>
                  )}
                </div>
                {item.desc && (
                  <div
                    className={splitItemDesc}
                    dangerouslySetInnerHTML={{ __html: normalizeRichHtml(item.desc) }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
