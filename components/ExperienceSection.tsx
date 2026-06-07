import Image from "next/image";
import { connectDB } from "@/lib/db";
import { initial, normalizeRichHtml } from "@/lib/utils";
import { Experience, type ExperienceDoc } from "@/models/Experience";
import {
  splitContainer,
  splitItem,
  splitItemDate,
  splitItemDesc,
  splitItemMeta,
  splitItemRole,
  splitList,
  splitSection,
  splitTitle,
  splitTitleWrap,
} from "./_shared/splitClasses";

export default async function ExperienceSection() {
  await connectDB();
  const items = await Experience.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<ExperienceDoc[]>();

  if (items.length === 0) return null;

  return (
    <section className={splitSection} id="experience">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>EXPERIENCE</h2>
        </div>
        <div className={splitList}>
          {items.map((item) => (
            <div key={String(item._id)} className={splitItem}>
              <div className="group flex items-center gap-4 mb-4">
                <span className="w-14 h-14 rounded-xl bg-linear-to-br from-white/15 to-white/4 border border-white/15 ring-1 ring-primary/25 shadow-[0_8px_24px_-8px_rgba(74,222,128,0.4)] flex items-center justify-center shrink-0 overflow-hidden p-2 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#4ade80]/60">
                  {item.logo?.url ? (
                    <Image
                      src={item.logo.url}
                      alt={item.company}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xl font-extrabold text-[#4ade80]">
                      {initial(item.company)}
                    </span>
                  )}
                </span>
                <h3 className="text-2xl font-bold text-white uppercase">{item.company}</h3>
              </div>
              <div className={splitItemMeta}>
                <span className="flex items-center gap-2">
                  <span className={splitItemRole}>{item.role}</span>
                  {item.workMode && (
                    <span className="text-[11px] font-bold tracking-wider text-white/60 uppercase border border-white/15 rounded-full px-2 py-0.5">
                      {item.workMode}
                    </span>
                  )}
                </span>
                <span className={splitItemDate}>{item.date}</span>
              </div>
              {item.desc && (
                <div
                  className={splitItemDesc}
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
